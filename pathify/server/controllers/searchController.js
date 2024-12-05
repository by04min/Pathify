import db from '../db.js';

const searchController = {};

const searchQuery = async (qstring, values) => {
  const result = await db.query(qstring, values);
  return result;
}

searchController.search = async (req, res, next) => {
  const username = res.locals.ret.user.username;
  const { column, search } = req.query;
  console.log(column, search ,username);
  const queryString = `SELECT * FROM profiles WHERE ${column} = $1`;
  try {
    const data = await searchQuery(queryString, [search]);
    console.log(data.rows);
    res.locals.searchData = data.rows;
    return next();
  } catch (err) { return next(err); }
}

export default searchController;