const jwt = require('jsonwebtoken');
const { NotAuthorizedError } = require('../helpers/errors');
const authMiddleware = (req, res, next) => {
  const [tokenType, token] = req.headers.authorization.split(' ');
  if ((tokenType !== 'Bearer') | !token) {
    next(new NotAuthorizedError('Not authorized'));
  }
  try {
    const user = jwt.decode(token, process.env.JWT_SECRET);
    if (!user) {
      next(new NotAuthorizedError('Not authorized'));
    }
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    next(new NotAuthorizedError('Invalid token'));
  }
};

module.exports = {
  authMiddleware,
};
