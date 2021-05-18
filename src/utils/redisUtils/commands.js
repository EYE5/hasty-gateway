const { promisify } = require('util');
const redisClient = require('./redisClient');

async function set(key) {
  const getAsync = promisify(redisClient.get).bind(redisClient);

  return getAsync(key);
}

function select(database) {
  redisClient.select(database);
}

function set(key, value) {
  const set = promisify(redisClient.get).bind(redisClient);

  set(key, value);
}

module.exports = {
  get,
  select,
  set,
};
