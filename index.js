const kue = require('kue')
const port = process.env.PORT || 5000

const REDIS_URL = 'redis://redis:6379';
const KUE_PREFIX = process.env.KUE_PREFIX;

if (process.env.REDIS_URL) {
  REDIS_URL = process.env.REDIS_URL;
} else if (process.env.REDIS_HOST) {
  REDIS_URL = ['redis://', process.env.REDIS_HOST, process.env.REDIS_PORT || '6379'].join('');
}

console.log(`Kue connecting to ${REDIS_URL} with prefix ${KUE_PREFIX}`)

kue.createQueue({
  prefix: KUE_PREFIX,
  redis: REDIS_URL
})

console.log(`kue running on port ${port}`)
kue.app.listen(port)
