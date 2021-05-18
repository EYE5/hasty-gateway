const { promisify } = require('util');
const redisClient = require('./redis-client');

async function get(key) {
  const getAsync = promisify(redisClient.get).bind(redisClient);

  return getAsync(key);
}

function select(database) {
  redisClient.select(database);
}

async function set(key, value) {
  const set = promisify(redisClient.get).bind(redisClient);

  await set(key, value);
}

module.exports = {
  get,
  select,
  set,
};
