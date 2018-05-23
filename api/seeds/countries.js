require('dotenv').config()
const mongoose = require('mongoose')
const faker = require('faker')
const Country = require('../app/models/country')

mongoose.Promise = global.Promise
mongoose.connect(process.env.DATABASE, { useMongoClient: true })

async function create() {
  for(let i = 0; i < 20; i++) {
    const c = new Country({
      name: faker.address.country()
    })
    await c.save()
  }
}

create()
