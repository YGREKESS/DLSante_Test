import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config();

const mysqlConnection = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || "8889",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_NAME || "DL_SANTE",
  multipleStatements: true,
});

mysqlConnection.connect((err) => {
  if (!err) {
    console.log("Connected to DB.");
  } else {
    console.log("Connection to DB failed.");
  }
});

export default mysqlConnection;
