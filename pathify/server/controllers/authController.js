import jwt from 'jsonwebtoken';

const authController = {};

authController.verify = (req, res, next) => {
  console.log('cookies: ', req.headers)
  const token = req.headers.cookie.split('token=')[1];
  console.log(token);
  if (!token) {
    res.locals.ret = { success: false, message: 'Token is missing' };
    return next({'message': 'token not found'})
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) res.locals.ret = { success: false, message: 'Invalid token' };
    res.locals.ret = { success: true, user: decoded }
  });
  console.log('hello');
  return next();
}

authController.signup = async (req, res, next) => {

}

export default authController;