import jwt from 'jsonwebtoken';

const authController = {};

//verify the passed in jwt token, then passing down the decoded information
authController.verify = (req, res, next) => {
  let token = '';
  if (req.headers.cookie) 
    token = req.headers.cookie.split('token=')[1];

  //handler for when cookie doesn't pass down
  if (token.length == 0) {
    res.locals.ret = { success: false, message: 'Token is missing' };
    console.log('token is: ', token);
    return next({'message': 'token not found'});
  }

  //token verification
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) 
      res.locals.ret = { success: false, message: 'Invalid token' };
    res.locals.ret = { success: true, user: decoded }
    console.log('verified user is: ', res.locals.ret.user);
  });
  return next();
}

export default authController;