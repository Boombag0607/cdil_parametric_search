import mysql from 'mysql';

const dbConfig = {
  host: 'localhost',
  user: 'cdiladmin',
  password: 'BHTyuu@J897fgV@',
  port: '3306',
  database: 'parametric_search_db',
};

const pool = mysql.createPool(dbConfig);

export default pool;
