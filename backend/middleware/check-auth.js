const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    // need to get the token from the users.js file
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'secret_this_should_be_longer');
    console.log('SERVER: ' + decodedToken);
    req.userData = { email: decodedToken.email, userId: decodedToken.userId };
    next();
  } catch (error) {
    res.status(401).json({
      message: 'You are not authenticated!'
    });
  }
};
