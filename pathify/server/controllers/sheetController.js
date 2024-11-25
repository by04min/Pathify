import db from '../db.js';

const sheetController = {};

const sheetQuery = async (qstring, values) => {
  const result = await db.query(qstring, values);
  return result;
}

sheetController.getRows = async (req, res, next) => {
  const userId = res.locals.user.id;
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
  const { company, position, deadline, } = req.body;
  const userId = res.locals.user.id;
  const queryString = `INSERT INTO spreadsheet (company, position, deadline, status, interview, decision, userid)
                      VALUES($1, $2, $3, $4, $5, $6, $7)`;
  const values = [company, position, deadline, 'not applied', 'pending', 'not released', userId];

  sheetQuery(queryString, values)
    .then((data) => {
      console.log('add complete', data);
      res.locals.sheetAdd = data;
      return next();
    })
    .catch((err) => { return next(err); })
}


sheetController.updateItem = async (req, res, next) => {
  const { column, update, id } = req.body;
  const userId = res.locals.user.id;

  const queryString = `UPDATE spreadsheet SET $1 = $2 WHERE (userid = $3 AND id = $4)`;
  const values = [column, update, userId, id];

  sheetQuery(queryString, values)
    .then((data) => {
      console.log('update complete', data);
      res.locals.sheetUpdate = data;
      return next();
    })
    .catch((err) => { return next(err); })
}

sheetController.deleteRow = async (req, res, next) => {
  const { id } = req.body;
  const userId = res.locals.user.id;
  
  const queryString = `DELETE FROM spreadsheet WHERE (id = $1 AND userid = $2)`;

  sheetQuery(queryString, [id, userId])
    .then((data) => {
      console.log('delete complete', data);
      res.locals.sheetDelete = data;
      return next();
    })
    .catch((err) => { return next(err); })
}

export default sheetController;