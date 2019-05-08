const kue = require('kue')
const express = require('express')
const ui = require('kue-ui')
const app = express()
const port = process.env.PORT || 7000
const getRedisConfig = require('./lib/getRedisConfig')
const Redis = require('ioredis')
console.log(getRedisConfig())

// connect kue to appropriate redis, or omit for default localhost
kue.createQueue({
  redis: {
    createClientFactory: () => {
      return new Redis(getRedisConfig())
    }
  }
})

ui.setup({
  apiURL: '/api', // IMPORTANT: specify the api url
  baseURL: '/', // IMPORTANT: specify the base url
  updateInterval: 5000 // Optional: Fetches new data every 5000 ms
})

// Mount kue JSON api
app.use('/api', kue.app)
// Mount UI
app.use('/', ui.app)

app.listen(port, (err, data) => {
  if (err) {
    console.log('error', err)
  }
  console.log('listening on port', port)
})
