import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pg;

//connection to supabase postgres uri
const pool = new Pool({connectionString: process.env.PG_URI});

export default {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
}