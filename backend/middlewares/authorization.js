const jwt = require('jsonwebtoken');

const authorize = (roles = []) => {
  return (req, res, next) => {
    if (!roles.includes(req.body.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  };
};

module.exports = authorize;
