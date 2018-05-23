from locust import HttpLocust, TaskSet, task

class UserBehavior(TaskSet):
    @task
    def getCountries(self):
        self.client.get('/api/countries')

    @task
    def getCities(self):
        self.client.get('/api/cities')


class WebsiteUser(HttpLocust):
    task_set = UserBehavior
    min_wait = 5000
    max_wait = 9000
    host = 'http://localhost:8085'

