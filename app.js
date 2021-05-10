const Gateway = require('micromq/gateway');

const app = new Gateway({
  microservices: ['auth'],
  rabbit: {
    url: 'amqp://hasty:superhardpassword@rabbitmq:5672',
  },
});

// создаем два эндпоинта /friends & /status на метод GET
app.get(['/login'], async (req, res) => {
  // делегируем запрос в микросервис users
  await res.delegate('users');
});

app.listen(8080);
