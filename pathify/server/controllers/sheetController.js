import db from '../db.js';

const sheetController = {};

const sheetQuery = async (qstring, values) => {
  const result = await db.query(qstring, values);
  return result;
}

sheetController.getRows = async (req, res, next) => {
  const userId = res.locals.ret.user.id;
  const queryString = `SELECT * FROM spreadsheet WHERE userid = $1`;
  try {
    const data = await sheetQuery(queryString, [userId]);    
    console.log('get complete', data.rows);
    res.locals.sheetData = data.rows;
    return next();
  } catch (err) { return next(err); }
}

sheetController.addRow = async (req, res, next) => {
  const { company, position, deadline, } = req.body;
  const userId = res.locals.ret.user.id;
  const queryString = `INSERT INTO spreadsheet (company, position, deadline, userid)
                      VALUES($1, $2, $3, $4)`;
  const values = [company, position, deadline, userId];

  try {
    const data = await sheetQuery(queryString, values);  
    console.log('add complete', data);
    res.locals.sheetAdd = data;
    return next();
  } catch (err) { return next(err); }
}

sheetController.updateItem = async (req, res, next) => {
  const { column, update, id } = req.body;
  console.log('local user is: ', res.locals.ret.user.id);
  const userId = res.locals.ret.user.id;
  console.log(column, update, id, userId);
  const queryString = `UPDATE spreadsheet SET ${column} = $1 WHERE (id = $2 AND userid = $3)`;
  const values = [update, id, userId];
  
  try {
    const data = await sheetQuery(queryString, values);  
    console.log('update complete', data);
    res.locals.sheetUpdate = data;
    return next();
  } catch (err) { return next(err); }
}

sheetController.deleteRow = async (req, res, next) => {
  const { id } = req.body;
  const userId = res.locals.ret.user.id;
  
  const queryString = `DELETE FROM spreadsheet WHERE (id = $1 AND userid = $2)`;

  try {
    const data = await sheetQuery(queryString, [id, userId]);  
    console.log('delete complete', data);
    res.locals.sheetDelete = data;
    return next();
  } catch (err) { return next(err); }
}

export default sheetController;