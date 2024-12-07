import db from '../db.js';

const sheetController = {};

const sheetQuery = async (qstring, values) => {
  const result = await db.query(qstring, values);
  return result;
}

//get all rows in spreadsheet that matches the user's id
sheetController.getRows = async (req, res, next) => {
  const userId = res.locals.ret.user.id;
  const queryString = `SELECT * FROM spreadsheet WHERE userid = $1`;
  try {
    const data = await sheetQuery(queryString, [userId]); 
    res.locals.sheetData = data.rows;
    return next();
  } catch (err) { return next(err); }
}

//get all rows from a specific user email
sheetController.getOtherRows = async (req, res, next) => {
  const { email } = req.body;
  const queryString = `SELECT * FROM spreadsheet s JOIN "userTable" u ON s.userid = u.id WHERE u.email = $1`;
  try {
    const data = await sheetQuery(queryString, [email]);
    res.locals.otherSheetData = data.rows;
    return next();
  } catch (err) { return next(err); }
}

//add a new spreadsheet row associated with user's id
sheetController.addRow = async (req, res, next) => {
  const { company, position, deadline, } = req.body;
  const userId = res.locals.ret.user.id;
  const queryString = `INSERT INTO spreadsheet (company, position, deadline, userid)
                      VALUES($1, $2, $3, $4)`;
  const values = [company, position, deadline, userId];

  try {
    const data = await sheetQuery(queryString, values);  
    res.locals.sheetAdd = data;
    return next();
  } catch (err) { return next(err); }
}

//change an item in a specific spreadsheet row
sheetController.updateItem = async (req, res, next) => {
  const { column, update, id } = req.body;
  const userId = res.locals.ret.user.id;
  const queryString = `UPDATE spreadsheet SET ${column} = $1 WHERE (id = $2 AND userid = $3)`;
  const values = [update, id, userId];
  
  try {
    const data = await sheetQuery(queryString, values); 
    res.locals.sheetUpdate = data;
    return next();
  } catch (err) { return next(err); }
}

//delete a row on the spreadsheet
sheetController.deleteRow = async (req, res, next) => {
  const { id } = req.body;
  const userId = res.locals.ret.user.id;
  
  const queryString = `DELETE FROM spreadsheet WHERE (id = $1 AND userid = $2)`;

  try {
    const data = await sheetQuery(queryString, [id, userId]);  
    res.locals.sheetDelete = data;
    return next();
  } catch (err) { return next(err); }
}

export default sheetController;