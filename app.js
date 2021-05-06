const express = require('express');
const app = express();
const router = express.Router();
const winston = require('winston');
const expressWinston = require('express-winston');

const path = __dirname + '/src/views/';
const port = 8080;

router.use(
  expressWinston.logger({
    transports: [new winston.transports.Console()],
    format: winston.format.json(),
    meta: false,
    msg: 'HTTP  ',
    expressFormat: true,
    colorize: false,
    ignoreRoute: function (req, res) {
      return false;
    },
  })
);

router.get('/', function (req, res) {
  res.sendFile(path + 'index.html');
});

app.use(express.static(path));
app.use('/', router);

app.listen(port, function () {
  console.log(`App listening on port ${port}`);
});
