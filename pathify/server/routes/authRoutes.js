import express from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import authController from '../controllers/authController.js'

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
const router = express.Router();

//authenticate for google using passport
router.get('/oauth', 
  passport.authenticate('google', { failureRedirect: `auth/failed`, session: false }),
  (req, res) => {
    //create a jwt token to limit a 1 hour session
    const token = jwt.sign({ ...req.user, 'ts': Date.now() }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, 
      {
        httpOnly: true,
      // secure: process.env.SECURE === 'production',     // Ensure the cookie is only sent over HTTPS
        maxAge: 3600000
      }
    );
    res.redirect(`${FRONTEND_URL}/auth/callback?token=${token}`)
  }
);

//test for jwt token validity
router.get('/verify-token', 
  authController.verify,
  (req, res) => {
    console.log(res.locals.ret);
    return res.status(res.locals.ret.success ? 200 : 401).json(res.locals.ret);
});

export default router;