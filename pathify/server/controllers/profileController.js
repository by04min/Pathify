import db from '../db.js';

const profileController = {};

const profileQuery = async (qstring, values) => {
  const result = await db.query(qstring, values);
  return result;
}

profileController.getProfile = async (req, res, next) => {
  const userId = res.locals.ret.uesr.id;
  const queryString = `SELECT * FROM profile where userid = $1`;
  try {
    const data = await profileQuery(queryString, [userId]);    
    console.log('get complete', data.rows);
    res.locals.profileData = data.rows;
    return next();
  } catch (err) { return next(err); }
}

profileController.editProfile = async (req, res, next) => {
  const { column, update } = req.body;
  const userId = res.locals.ret.user.id;
  const queryString = `UPDATE profile SET ${column} = $1 WHERE userid = $2`;
  
  try {
    const data = await profileQuery(queryString, [update, userId]);
    res.locals.profileEdit = data;
    return next();
  } catch (err) { return next(err); }
}

profileController.addExperience = async (req, res, next) => {
  // const { company, title, start, end, role_description, reflection } = req.body;
  const { expObj } = req.body;
  const userId = res.locals.ret.user.id;
  const queryString = `UPDATE profile SET experiences = json_array_append(experiences, $1}) WHERE userid = $2`;

  try {
    const data = await profileQuery(queryString, [expObj, userId]);
    res.locals.addExp = data;
    return next();
  } catch (err) { return next(err); }
}

profileController.editExperience = async (req, res, next) => {
  const { expObj, index } = req.body;
  const userId = res.locals.ret.user.id;
  const queryString = `UPDATE profile SET experiences = json_set(experiences, $1, $2) WHERE userid = $3`;
  const values = [`{${index}}`, expObj, userId];

  try {
    const data = await profileQuery(queryString, values);
    res.locals.editExp = data;
    return next();
  } catch (err) { return next(err); }
}

profileController.removeExperience = async (req, res, next) => {
  const { index } = req.body;
  const userId = res.locals.ret.user.id;
  const queryString = `UPDATE profile SET experiences = experiences - $1 WHERE userid = $2`;
  const values = [index, userId];

  try {
    const data = await profileQuery(queryString, values);
    res.locals.removeExp = data;
    return next();
  } catch (err) { return next(err); }
}

export default profileController;