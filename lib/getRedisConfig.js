const nconf = require('nconf')

nconf
  .env({
    separator: '__',
    lowerCase: false
  })
  .file({ file: 'config.json', search: true, dir: '../' })

const { sentinels: { sentinelHosts, master, namespace } } = nconf.get('rediscluster');

function getRedisConfig () {
  var sentinels = {};
  var arr = [];

  if (Array.isArray(sentinelHosts)) {
    sentinels = sentinelHosts.map(sentinelHost => {
      return {
        host: sentinelHost.host,
        port: 26379
      };
    });
  } else {
    arr.push(sentinelHosts);
    sentinels = arr.map(sentinelHost => {
      return {
        host: sentinelHost.host,
        port: 26379
      };
    });
  }

  return {
    sentinels,
    name: master,
    namespace
  };
}

module.exports = getRedisConfig;