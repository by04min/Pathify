import express from 'express';

import authController from '../controllers/authController.js';
import sheetController from '../controllers/sheetController.js';

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
const router = express.Router();

router.get('/getRows',
  authController.verify,
  sheetController.getRows,
  (req, res) => {
    return res.status(200).json(res.locals.sheetData);
  }
);

router.post('/addRow',
  authController.verify,
  sheetController.addRow,
  (req, res) => {
    return res.status(200).json(res.locals.sheetAdd);
  }
);

router.post('/updateItem',
  authController.verify,
  sheetController.updateItem,
  (req, res) => {
    return res.status(200).json(res.locals.sheetUpdate);
  }
);

router.post('/deleteRow',
  authController.verify,
  sheetController.deleteRow,
  (req, res) => {
    return res.status(200).json(res.locals.sheetDelete);
  }
);

export default router;