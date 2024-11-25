import express from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import authController from '../controllers/authController.js'

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
const router = express.Router();

router.get('/oauth', 
  passport.authenticate('google', { failureRedirect: `auth/failed`, session: false }),
  (req, res) => {
    
    console.log('hello');
    const token = jwt.sign({ ...req.user, 'ts': Date.now() }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, 
      // {
      // httpOnly: true,   // Prevents JavaScript access to the cookie
      // secure: process.env.SECURE === 'production',     // Ensure the cookie is only sent over HTTPS
      // sameSite: 'None', // Prevents the cookie from being sent in cross-site requests
      // maxAge: 3600000   // Optional: sets the cookie expiration time
      // }
    );
    res.redirect(`${FRONTEND_URL}/auth/callback?token=${token}`)
  }
)

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect(`${FRONTEND_URL}/login`);
});

router.get('/verify-token', 
  authController.verify,
  (req, res) => {
    console.log(res.locals.ret)
    return res.status(res.locals.ret.success ? 200 : 401).json(res.locals.ret);
});

router.get('/success', (req, res) => { 
  if (req.user) 
    res.status(200).json({
      success: true, 
      message: 'login successful',
      user: req.user,
      cookies: req.cookies
    });
});

router.get('/failed', (req, res) => { res.status(401).json({success: false, message: 'login failed'}) });

export default router;