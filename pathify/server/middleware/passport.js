import passport from 'passport';
import jwt from 'jsonwebtoken';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

import pool from '../db.js';

passport.use( new GoogleStrategy(
  {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: '/auth/oauth',
    scope: ['openid', 'profile', 'email', 'https://www.googleapis.com/auth/spreadsheets']
  },
  async (accessToken, refreshToken, profile, done) => {
    const googleId = profile.id;
    const email = profile.emails[0].value;

    console.log('id ', googleId, ' email ', email);

    try {
      console.log('trying', googleId, email)
      const userList = await pool.query('SELECT * FROM "userTable" WHERE email = $1', [email]);
      console.log(userList.rows)
      let user;
      if (userList.rows.length == 0) {
        const newUser = await pool.query('INSERT INTO "userTable" ("googleId", email) VALUES ($1, $2) RETURNING *', [`${googleId}`, email]);
        user = newUser.rows[0];
      } else { user = userList.rows[0]; }

      // const token = jwt.sign({user_id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

      return done(null, user);
    } catch (err) { return done(err); }
  }
));

passport.serializeUser((user, done) => {
  done(null, user)
});

passport.deserializeUser((user, done) => {
  done(null, user)
});
export default passport;