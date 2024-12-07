import express from 'express';

import authController from '../controllers/authController.js';
import profileController from '../controllers/profileController.js';

const router = express.Router();

//get all user profile data
router.get('/getProfile', 
  authController.verify,
  profileController.getProfile,
  (req, res) => {
    return res.status(200).json(res.locals.profileData);
  }
);

//search for another profile
router.get('/searchProfile',
  authController.verify,
  profileController.searchProfile,
  (req, res) => {
    return res.status(200).json(res.locals.searchProfile);
  }
);

//edit specific parameters in user's profile
router.post('/editProfile',
  authController.verify,
  profileController.editProfile,
  (req, res) => {
    return res.status(200).json(res.locals.editProfile);
  }
);

//add new experience in user's profile
router.post('/addExperience',
  authController.verify,
  profileController.addExperience,
  (req, res) => {
    return res.status(200).json(res.locals.addExperience);
  }
);

export default router;