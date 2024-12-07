import express from 'express';

import authController from '../controllers/authController.js';
import searchController from '../controllers/searchController.js';

const router = express.Router();

//search for profile using a substring of industry or major
router.get('/query', 
  authController.verify,
  searchController.search,
  (req, res) => {
    return res.status(200).json(res.locals.searchData);
  }
);

export default router;