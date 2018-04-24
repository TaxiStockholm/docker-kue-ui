const kue = require('kue')
const port = process.env.PORT || 5000

kue.createQueue({
  prefix: process.env.KUE_PREFIX,
  redis: process.env.REDIS_URL || 'redis://redis:6379'
})

console.log(`kue running on port ${port}`)
kue.app.listen(port)
