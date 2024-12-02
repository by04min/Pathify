import jwt from 'jsonwebtoken';

const authController = {};

authController.verify = (req, res, next) => {
  const token = req.headers.cookie.split('token=')[1];
  if (!token) {
    res.locals.ret = { success: false, message: 'Token is missing' };
    return next({'message': 'token not found'})
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) res.locals.ret = { success: false, message: 'Invalid token' };
    res.locals.ret = { success: true, user: decoded }
    console.log('verified user is: ', res.locals.ret.user);
  });
  return next();
}

export default authController;