import db from '../db.js';

const sheetController = {};

const sheetQuery = async (qstring, values) => {
  const result = await db.query(qstring, values);
  return result;
}

sheetController.getRows = async (req, res, next) => {
  const { userId } = req.body;
  const queryString = `SELECT * FROM spreadsheet WHERE userid = $1`;
  
  sheetQuery(queryString, [userId])
    .then((data) => {
      console.log('get complete', data);
      res.locals.sheetData = data;
      return next();
    })
    .catch((err) => { return next(err); })
}

sheetController.addRow = async (req, res, next) => {
  const { company, position, deadline, userId } = req.body;
  const queryString = `INSERT INTO spreadsheet (company, position, deadline, status, interview, decision, "userId")
                      VALUES($1, $2, $3, $4, $5, $6, $7)`;
  const values = [company, position, deadline, 'not applied', 'pending', 'not released', userId];

  sheetQuery(queryString, values)
    .then((data) => {
      console.log('add complete', data);
      res.locals.sheetInsert = data;
      return next();
    })
    .catch((err) => { return next(err); })
}


sheetController.updateItem = async (req, res, next) => {
  const { column, update, userId, id } = req.body;

  const queryString = `UPDATE spreadsheet SET $1 = $2 WHERE (userID = $3 AND id = $4)`;
  const values = [column, update, userId, id];

  sheetQuery(queryString, values)
    .then((data) => {
      console.log('update complete', data);
      res.locals.sheetUpdate = data;
      return next();
    })
    .catch((err) => { return next(err); })
}

sheetController.deleteItem = async (req, res, next) => {
  const { id } = req.body;

  const queryString = `DELETE FROM spreadsheet WHERE id = $1`;

  sheetQuery(queryString, [id])
    .then((data) => {
      console.log('delete complete', data);
      res.locals.sheetDelete = data;
      return next();
    })
    .catch((err) => { return next(err); })
}

export default sheetController;