import db from '../db.js';

const profileController = {};

const profileQuery = async (qstring, values) => {
  const result = await db.query(qstring, values);
  return result;
}

profileController.getProfile = async (req, res, next) => {
  const userId = res.locals.ret.user.id;
  const queryString = `SELECT * FROM profile where userid = $1`;
  try {
    const data = await profileQuery(queryString, [userId]);    
    console.log('get complete', data.rows);
    res.locals.profileData = data.rows;
    return next();
  } catch (err) { return next(err); }
}

profileController.searchProfile = async (req, res, next) => {
  const { username } = req.body;
  const queryString = `SELECT * FROM profile where username = $1`;
  try {
    const data = await profileQuery(queryString, [username]);    
    console.log('search others complete', data.rows);
    res.locals.searchProfile = data.rows;
    return next();
  } catch (err) { return next(err); }
}

profileController.editProfile = async (req, res, next) => {
  const { username, major, industry, expObj, privacy } = req.body;
  const email = res.locals.ret.user.email;
  const queryString = `UPDATE profile 
    SET username = $1, major = $2, industry = $3, experiences = $4, privacy = $5 WHERE email = ${email}`;
  const values = [username, major, industry, expObj, privacy];
  try {
    const data = await profileQuery(queryString, values);
    res.locals.profileEdit = data;
    return next();
  } catch (err) { return next(err); }
}

// profileController.addExperience = async (req, res, next) => {
//   // const { company, title, start, end, role_description, reflection } = req.body;
//   const { expObj } = req.body;
//   const userId = res.locals.ret.user.id;
//   const queryString = `UPDATE profile SET experiences = json_array_append(experiences, $1}) WHERE userid = $2`;

//   try {
//     const data = await profileQuery(queryString, [expObj, userId]);
//     res.locals.addExp = data;
//     return next();
//   } catch (err) { return next(err); }
// }

export default profileController;