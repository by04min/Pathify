import db from '../db.js';

const profileController = {};

const profileQuery = async (qstring, values) => {
  const result = await db.query(qstring, values);
  return result;
}

//get profile information using data from jwt decoded token
profileController.getProfile = async (req, res, next) => {
  const { email } = res.locals.ret.user;
  const queryString = `SELECT * FROM profiles where email = $1`;
  try {
    const data = await profileQuery(queryString, [email]);
    res.locals.profileData = data.rows;
    return next();
  } catch (err) { return next(err); }
}

//search for profile information given a specific username
profileController.searchProfile = async (req, res, next) => {
  const { username } = req.query;
  const queryString = `SELECT * FROM profiles where username = $1`;
  try {
    const data = await profileQuery(queryString, [username]);
    res.locals.searchProfile = data.rows;
    return next();
  } catch (err) { return next(err); }
}

//edit user profile data
profileController.editProfile = async (req, res, next) => {
  const { username, major, industry, experiences, privacy } = req.body;
  const { email } = res.locals.ret.user;
  const queryString = `UPDATE profiles 
    SET username = $1, major = $2, industry = $3, experiences = $4, privacy = $5 WHERE email = $6`;
  const values = [username, major, industry, experiences, privacy, email];
  try {
    const data = await profileQuery(queryString, values);
    res.locals.editProfile = data;
    return next();
  } catch (err) { return next(err); }
}

//add an experience object to the user's profile
profileController.addExperience = async (req, res, next) => {
  const { expObj } = req.body;
  const { email } = res.locals.ret.user;
  const queryString = `UPDATE profiles SET experiences = array_append(experiences, $1) WHERE email = $2`;

  try {
    const data = await profileQuery(queryString, [expObj, email]);
    res.locals.addExperience = data;
    return next();
  } catch (err) { return next(err); }
}

export default profileController;