const jwt = require('jsonwebtoken');

const secret = 'secret';
const expiration = '2h';

module.exports = {
  authMiddleware: function ({ req }) {
    let user = null;
    
    let token = req.headers.authorization || req.body.token || req.query.token;

    if (token && token.startsWith('Bearer ')) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return { user };
    }
  
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      user = data;
    } catch (e) {
      console.error(`Invalid token: ${e.message}`);
    }

    return { user };
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
