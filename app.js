require('dotenv').config();
const cors = require('cors');

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
  requests: { timeout: 3000 },
});

app.use(cors());

app.post(['/api/refresh'], async (req, res) => {
  await authorization.requestNewAccessToken(req, res);
});

app.post(['/api/register'], async (req, res) => {
  console.log('reg');
  await res.delegate('auth');
});

app.post(['/api/login'], async (req, res) => {
  console.log('login');
  await res.delegate('auth');
});

app.get(['/api/get_user'], accessCheck, async (req, res) => {
  await res.delegate('auth');
});

app.get(['/api/get_friends'], accessCheck, async (req, res) => {
  await res.delegate('auth');
});

app.get(['/api/get_status'], accessCheck, async (req, res) => {
  await res.delegate('auth');
});

app.get(['/api/refresh_status'], accessCheck, async (req, res) => {
  await res.delegate('auth');
});

app.get(['/api/get_chats'], accessCheck, async (req, res) => {
  await res.delegate('auth');
});

app.post(['/api/create_chat'], accessCheck, async (req, res) => {
  await res.delegate('auth');
});

app.get(['/api/get_chat_users'], accessCheck, async (req, res) => {
  await res.delegate('auth');
});

console.log('App listen on port 8045');

app.listen(8045);
