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

app.post(['/api/updateTokens'], async (req, res) => {
  await authorization.requestNewTokens(req, res);
});

app.get(['/api/test'], accessCheck, async (req, res) => {
  console.log(req);
  res.json({ status: 'ok' });
});

console.log('App listen on port 8045');

app.listen(8045);
