import express, { Router } from 'express';

import authController from '../controllers/authController.js';
import profileController from '../controllers/profileController.js';

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
const router = express.Router();

router.post('/getProfile', 
  authController.verify,
  profileController.getProfile,
  (req, res) => {
    return res.status(200).json(res.locals.profileData);
  }
);

router.post('/searchProfile',
  authController.verify,
  profileController.searchProfile,
  (req, res) => {
    return res.status(200).json(res.locals.searchProfile);
  }
)

router.post('/editProfile',
  authController.verify,
  profileController.editProfile,
  (req, res) => {
    return res.status(200).json(res.locals.editProfile);
  }
)

export default router;