const nconf = require('nconf')

nconf
  .env({
    separator: '__',
    lowerCase: true
  })
  .file({ file: 'config.json', search: true, dir: '../' })

nconf.defaults({
  redis: {
    sentinels: 'localhost1',
    host: 'localhost',
    master: 'mymaster'
  }
})

const { host, sentinels, master } = nconf.get('redis')

function getRedisConfig() {
  if (!sentinels) {
    return { host }
  }

  const sentinelHostsArray = Array.isArray(sentinels)
    ? sentinels
    : sentinels.split(',')

  const sentinelsArray = sentinelHostsArray.map(sentinelHost => {
    return {
      host: sentinelHost,
      port: 26379
    }
  })

  return { sentinels: sentinelsArray, name: master }
}

module.exports = getRedisConfig
