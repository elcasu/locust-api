from locust import HttpLocust, TaskSet, task
import random
import os

class UserBehavior(TaskSet):
    def authenticate(self):
        response = self.client.post('/api/users/authenticate', json = {
            "email": 'admin@example.com',
            "password": '123qweasd'
        })
        # self.access_token = response.json()["token"]
        return response.json()["token"]
        
    def on_start(self):
        self.accessToken = self.authenticate()

    # ---------- tasks ----------
    @task
    def getProductList(self):
        # first, request an unauthenticated endpoint
        self.client.get('/api/')

        # get list of products (authenticated EP)
        response = self.client.get('/api/products', headers = {
            "x-access-token": self.accessToken
        })
        products = response.json()
        pIndex = random.randint(0, len(products) - 1)
        pId = products[pIndex]['_id']

        # request a product (authenticated EP)
        self.client.get('/api/products/' + pId + '?lk=1', headers = {
            "x-access-token": self.accessToken
        })


class WebsiteUser(HttpLocust):
    task_set = UserBehavior
    min_wait = 5000
    max_wait = 9000
    host = 'http://localhost:8085'

