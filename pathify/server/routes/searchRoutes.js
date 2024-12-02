import express from 'express';

import authController from '../controllers/authController.js';
import searchController from '../controllers/searchController.js';

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
const router = express.Router();

router.get('/', 
  (req, res) => {
    return res.status(200).json('in search');
  }
);

router.get('/query', 
  authController.verify,
  searchController.search,
  (req, res) => {
    return res.status(200).json(res.locals.searchData);
  }
);

export default router;