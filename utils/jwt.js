const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

// Генерация токена
const signToken = (_id) => {
  try {
    const token = jwt.sign(
      { _id },
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
    );
    return token;
  } catch (err) {
    return false;
  }
};

module.exports = {
  signToken,
};
