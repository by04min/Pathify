import db from '../db.js';

const searchController = {};

const searchQuery = async (qstring, values) => {
  const result = await db.query(qstring, values);
  return result;
}

//search for profiles who's major or industry match the search
searchController.search = async (req, res, next) => {
  const { column, search } = req.query;

  const queryString = `SELECT * FROM profiles WHERE ${column} ILIKE $1`;
  const substringSearch = `%${search}%`;

  try {
    const data = await searchQuery(queryString, [substringSearch]);
    res.locals.searchData = data.rows;
    return next();
  } catch (err) { return next(err); }
}

export default searchController;