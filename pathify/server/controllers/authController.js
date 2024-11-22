import jwt from 'jsonwebtoken';

const authController = {};

authController.verify = (req, res, next) => {
  const { token } = req.body;
  if (!token) res.locals.ret = { success: false, message: 'Token is missing' };

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) res.locals.ret = { success: false, message: 'Invalid token' };
    
    res.locals.ret = { success: true, user: decoded }
  });

  return next();
}

authController.signup = async (req, res, next) => {

}

export default authController;