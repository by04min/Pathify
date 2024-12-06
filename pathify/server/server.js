import express from 'express';
// import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';

import passport from './middleware/passport.js';
import authRoutes from './routes/authRoutes.js';
import sheetRoutes from './routes/sheetRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import searchRoutes from './routes/searchRoutes.js';

const app = express();
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173/';
const port = 8080;
dotenv.config();

app.use(cors({ methods: ["GET", "POST", "PUT", "DELETE"], origin: FRONTEND_URL, credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));

app.use(cookieSession({ name: "session", keys: ["pathify"], maxAge: 24* 60 * 60 * 100 }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({extended: true}));

app.use('/auth', authRoutes);
app.use('/sheets', sheetRoutes);
app.use('/profile', profileRoutes);
app.use('/search', searchRoutes);

app.use((req, res) =>
  res.status(404).send("This is not the page you're looking for...")
);
  

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
});
export default app;