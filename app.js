const express = require('express');
const app = express();
const router = express.Router();
const winston = require('winston');
const expressWinston = require('express-winston');
const Gateway = require('micromq/gateway');

const app = new Gateway({
  microservices: ['auth'],
});

// создаем два эндпоинта /friends & /status на метод GET
app.get(['/login'], async (req, res) => {
  // делегируем запрос в микросервис users
  await res.delegate('users');
});

app.listen(8080);
