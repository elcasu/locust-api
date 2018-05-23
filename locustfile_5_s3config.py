from locust import HttpLocust, TaskSet, task, events
import random
import os
import urllib2
import json

hostUrl = None
task = None

def loadS3Config():
    global hostUrl
    global task

    config = urllib2.urlopen("https://s3.amazonaws.com/techhouse-locust-config/config.json").read()

    configJson = json.loads(config)
    hostUrl = configJson['host']
    task = configJson['task']

# Loads the S3 config before instantiating users
events.locust_start_hatching += loadS3Config

def getMain(locust):
    locust.client.get(hostUrl + '/api/')

def getProductList(locust):
    response = locust.client.get(hostUrl + '/api/products')
    return response.json()

def getProduct(locust, id):
    locust.client.get(hostUrl + '/api/products/' + id)

def getCountries(locust):
    locust.client.get(hostUrl + '/api/countries')

def getCities(locust):
    locust.client.get(hostUrl + '/api/cities')

def userFlow(locust):
    # get main public info
    getMain(locust)

    # get list of products (authenticated EP)
    products = getProductList(locust)

    if products:
        pIndex = random.randint(0, len(products) - 1)
        pId = products[pIndex]['_id']

        # request a product (authenticated EP)
        getProduct(locust, pId)

allTasksList = [
    getMain,
    getProductList,
    getCountries,
    getCities
]

class MainTaskSet(TaskSet):
    def on_start(self):
        response = self.client.post(hostUrl + '/api/users/authenticate', json = {
            "email": 'admin@example.com',
            "password": '123qweasd'
        })
        self.client.headers['x-access-token'] = response.json()["token"]

        if task == "all":
            self.tasks = allTasksList
        else:
            if task:
                self.tasks = [ eval(task) ]


class Main(HttpLocust):
    task_set = MainTaskSet

    min_wait = 5000
    max_wait = 9000
    # host is fetched from config and set in every call because otherwise we have to restart Locust to change it
    host = ""
