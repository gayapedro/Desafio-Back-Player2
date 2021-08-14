const jwt = require('jsonwebtoken');
const knex = require('../database/dbConnection');

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization)
    return res.status(404).json('É necessário informar token.');

  try {
    const { id } = jwt.verify(
      authorization.replace('Bearer ', ''),
      process.env.JWT_SECRET
    );

    req.userId = id;

    next();
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = requireAuth;
