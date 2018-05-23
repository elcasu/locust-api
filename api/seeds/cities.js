require('dotenv').config()
const mongoose = require('mongoose')
const faker = require('faker')
const City = require('../app/models/city')

mongoose.Promise = global.Promise
mongoose.connect(process.env.DATABASE, { useMongoClient: true })

async function create() {
  for(let i = 0; i < 20; i++) {
    const c = new City({
      name: faker.address.city()
    })
    await c.save()
  }
}

create()
