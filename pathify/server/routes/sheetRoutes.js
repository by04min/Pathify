import express from 'express';

import authController from '../controllers/authController.js';
import sheetController from '../controllers/sheetController.js';

const router = express.Router();

//get all spreadsheet rows for current user
router.get('/getRows',
  authController.verify,
  sheetController.getRows,
  (req, res) => {
    return res.status(200).json(res.locals.sheetData);
  }
);

//get all spreadsheet rows for searched user
router.post('/getOtherRows',
  authController.verify,
  sheetController.getOtherRows,
  (req, res) => {
    return res.status(200).json(res.locals.otherSheetData);
  }
);

//add new row to the spreadsheet
router.post('/addRow',
  authController.verify,
  sheetController.addRow,
  (req, res) => {
    return res.status(200).json(res.locals.sheetAdd);
  }
);

//updating/changing item on specified row
router.post('/updateItem',
  authController.verify,
  sheetController.updateItem,
  (req, res) => {
    return res.status(200).json(res.locals.sheetUpdate);
  }
);

//delete a row in the spreadsheet
router.post('/deleteRow',
  authController.verify,
  sheetController.deleteRow,
  (req, res) => {
    return res.status(200).json(res.locals.sheetDelete);
  }
);

export default router;