const tokens = require('../utils/tokens');

/**
 * @param {*} req - request
 * @param {*} res - response
 */
async function requestNewAccessToken(req, res) {
  const refreshToken = req.body.refreshToken;

  if (!refreshToken) {
    res.status(400);
    res.json({ error: 'Wrong refresh token', code: 1003 });

    return;
  }

  const isRefreshTokenValid = await tokens.checkRefreshToken(refreshToken);

  if (!isRefreshTokenValid) {
    res.status(400);
    res.json({ error: 'Wrong refresh token', code: 1003 });

    return;
  }

  const data = req.body.id;

  if (!data) {
    res.status(400);
    res.json({ error: 'Invalid id', code: 1000 });

    return;
  }

  const accessToken = await tokens.createAccessToken(data);

  res.status(200);
  res.json({ accessToken });
}

async function requestNewTokens(req, res) {
  const data = req.body.username;

  if (!data) {
    res.status(400);
    res.json({ error: 'Invalid username', code: 1000 });

    return;
  }

  const accessToken = await tokens.createAccessToken(data);
  const refreshToken = await tokens.createRefreshToken(data);

  res.status(200);
  res.json({ accessToken, refreshToken });
}

module.exports = {
  requestNewAccessToken,
  requestNewTokens,
};
