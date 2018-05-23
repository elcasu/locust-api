from locust import HttpLocust, TaskSet, task
import random

class UserBehavior(TaskSet):
    @task
    def getCities(self):
        self.client.get('/api')

        response = self.client.get('/api/countries')
        countries = response.json()
        index = random.randint(0, len(countries) - 1)
        id = countries[index]['_id']

        self.client.get('/api/countries/' + id)


class WebsiteUser(HttpLocust):
    task_set = UserBehavior
    min_wait = 5000
    max_wait = 9000
    host = 'http://localhost:8085'
