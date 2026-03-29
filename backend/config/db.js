import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",          // your MySQL username
  password: "mysql123",  // your MySQL password
  database: "jewellery_db", // your DB name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
