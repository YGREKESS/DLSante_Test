import mysql from "mysql";

const mysqlConnection = mysql.createConnection({
  host: "localhost",
  port: "8889",
  user: "root",
  password: "root",
  database: "DL_SANTE",
  multipleStatements: true,
});

mysqlConnection.connect((err) => {
  if (!err) {
    console.log("Connected to DB.");
  } else {
    console.log(err);
    console.log("Connection to DB failed.");
  }
});

export default mysqlConnection;
