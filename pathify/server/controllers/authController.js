import jwt from 'jsonwebtoken';

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
const authController = {};

authController.verify = (req, res, next) => {
  let token = '';
  console.log(req.headers);
  if (req.headers.cookie) 
    token = req.headers.cookie.split('token=')[1];

  if (token.length == 0) {
    res.locals.ret = { success: false, message: 'Token is missing' };
    console.log('token is: ', token);
    return next({'message': 'token not found'});
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      res.locals.ret = { success: false, message: 'Invalid token' };
      console.log('logged out, redirecting to login');
    }
    res.locals.ret = { success: true, user: decoded }
    console.log('verified user is: ', res.locals.ret.user);
  });
  return next();
}

export default authController;