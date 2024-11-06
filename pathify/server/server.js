import express from 'express';
// import path from 'path';
import cors from 'cors';

import authRoutes from './routes/authRoutes.js'
const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/auth', authRoutes);

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