

const authorize = (roles = []) => {
  return (req, res, next) => {
    console.log(req.body)
    if (!roles.includes(req.body.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }
    req.body = req.body
    next();
  };
};

module.exports = authorize;
