import express from 'express';

import passport from 'passport';
import pool from '../db.js';
import authController from '../controllers/authController.js'

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
const router = express.Router();

router.get('/test',
  (req, res) => {
    const email = 'jonthansi@g.ucla.edu'
    const googleId = '114989829232332757742'
    const newUser = pool.query('INSERT INTO "userTable" ("googleId", email) VALUES ($1, $2) RETURNING *', [googleId, email]);
    
    res.status(200).json(newUser)
  }
)

router.get('/oauth', 
  passport.authenticate('google', { failureRedirect: `auth/failed`, session: false }),
  (req, res) => {
    const { token ,user } = req.user;
    res.redirect(`${FRONTEND_URL}/profile`)
  }
)

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect(`${FRONTEND_URL}/login`);
});

router.get('/success', (req, res) => { 
  if (req.user) 
    res.status(200).json({
      success: true, 
      message: 'login successful',
      user: req.user,
      cookies: req.cookies
    }) 
});
router.get('/failed', (req, res) => { res.status(401).json({success: false, message: 'login failed'}) });

router.post('/login', authController.login);
router.post('/signup', authController.signup);

export default router;