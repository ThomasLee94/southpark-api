module.exports = (req, res, next) => {
  if (res.locals.currentUser) {
    return next();
  }

  return res.status(400).json({
    err: 'not authorised to access this route',
    type: 'unauthroised',
    body: 'You are not authorised to access this route, did you sign in?'
  });
};
