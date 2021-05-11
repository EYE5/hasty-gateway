require('dotenv').config();

const Gateway = require('micromq/gateway');
const redis = require('redis');

const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
});

//middleware
const authCheck = require('./src/middlewares/authCheck');

//modules
const authorization = require('./src/modules/authorization');

const app = new Gateway({
  microservices: ['auth'],
  rabbit: {
    url: process.env.RABBIT_URL,
  },
});

app.enablePrometheus();

console.log(app);

app.post(['/updateTokens'], async (req, res) => {
  await authorization.requestNewTokens(req, res, client);
});

app.get(['/test'], authCheck(client), async (req, res) => {
  console.log(req);
  await res.delegate('auth');
});

console.log('App listen on port 8045');

app.listen(8045);
