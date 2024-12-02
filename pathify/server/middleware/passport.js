import passport from 'passport';
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
    const username = profile.displayName;

    try {
      const userList = await pool.query('SELECT * FROM "userTable" WHERE email = $1', [email]);
      
      let user;
      if (userList.rows.length == 0) {
        const newUser = await pool.query('INSERT INTO "userTable" ("googleId", email, username) VALUES ($1, $2, $3) RETURNING *', [`${googleId}`, email, username]);
        const newProfile = await pool.query('INSERT INTO profile (email, privacy, username) VALUES ($1, $2, $3) RETURNING *', [email, {email: false, list: false}, username])
        console.log('new profile is: ', newProfile);
        user = newUser.rows[0];
      } else { user = userList.rows[0]; }
      console.log('user is : ', user);
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