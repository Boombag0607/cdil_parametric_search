import mysql from 'mysql';

const dbConfig = {
  host: 'localhost',
  user: 'cdiladmin',
  password: '***************',
  port: '3306',
  database: 'parametric_search_db',
};

const pool = mysql.createPool(dbConfig);

export default pool;
