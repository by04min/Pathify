import db from '../db.js';

const profileController = {};

const profileQuery = async (qstring, values) => {
  const result = await db.query(qstring, values);
  return result;
}

profileController.getProfile = async (req, res, next) => {
  const email = res.locals.ret.user.email;
  console.log(email);
  const queryString = `SELECT * FROM profiles where email = $1`;
  try {
    const data = await profileQuery(queryString, [email]);    
    console.log('get complete', data.rows);
    res.locals.profileData = data.rows;
    return next();
  } catch (err) { return next(err); }
}

profileController.searchProfile = async (req, res, next) => {
  const { username } = req.query;
  console.log(username);
  const queryString = `SELECT * FROM profiles where username = $1`;
  try {
    const data = await profileQuery(queryString, [username]);    
    console.log('search others complete', data.rows);
    res.locals.searchProfile = data.rows;
    return next();
  } catch (err) { return next(err); }
}

profileController.editProfile = async (req, res, next) => {
  const { username, major, industry, experiences } = req.body;
  const email = res.locals.ret.user.email;
  console.log('username: ', username, 'major: ', major, 'industry: ', industry, 'experiences: ', experiences);
  const queryString = `UPDATE profiles 
    SET username = $1, major = $2, industry = $3, experiences = $4 WHERE email = $5`;
  const values = [username, major, industry, experiences, email];
  try {
    const data = await profileQuery(queryString, values);
    res.locals.editProfile = data;
    return next();
  } catch (err) { return next(err); }
}

profileController.addExperience = async (req, res, next) => {
  const { expObj } = req.body;
  console.log(expObj);
  const email = res.locals.ret.user.email;
  const queryString = `UPDATE profiles SET experiences = array_append(experiences, $1) WHERE email = $2`;

  try {
    const data = await profileQuery(queryString, [expObj, email]);
    res.locals.addExperience = data;
    return next();
  } catch (err) { return next(err); }
}

export default profileController;