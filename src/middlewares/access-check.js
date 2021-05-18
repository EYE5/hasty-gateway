const tokens = require('../utils/tokens');

async function accessCheck(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    res.status(400);
    res.json({ text: 'Invalid token', code: 1002 });

    return;
  }

  const isAccessTokenValid = await tokens.checkAccessToken(token);

  if (isAccessTokenValid) {
    next();
  } else {
    res.status(400);
    res.json({ text: 'Access token expired', error: 1002 });

    return;
  }
}

module.exports = accessCheck;
