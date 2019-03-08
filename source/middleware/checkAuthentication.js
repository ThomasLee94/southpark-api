const jwt = require('jsonwebtoken');

module.exports = function checkAuthentication(req, res, next) {
  console.log('Checking authentication');
  if (typeof req.cookies.nToken === 'undefined' || req.cookies.nToken === null) {
    req.user = null;
    console.log('HIT NO USER');
  } else {
    console.log(req.cookies);
    let token = req.cookies.nToken;
    let decodedToken = jwt.decode(token, { complete: true }) || {};
    req.user = decodedToken.payload;
    res.locals.currentUser = decodedToken.payload;
    console.log(req.user); 
  }
  next();
};