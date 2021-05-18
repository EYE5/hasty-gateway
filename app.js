require('dotenv').config();

const Gateway = require('micromq/gateway');

//middleware
const accessCheck = require('./src/middlewares/access-check');

//modules
const authorization = require('./src/modules/authorization');

const app = new Gateway({
  microservices: ['auth'],
  rabbit: {
    url: process.env.RABBIT_URL,
  },
});

app.post(['/updateTokens'], async (req, res) => {
  await authorization.requestNewTokens(req, res);
});

app.get(['/test'], accessCheck, async (req, res) => {
  console.log(req);
  await res.delegate('auth');
});

console.log('App listen on port 8045');

app.listen(8045);
