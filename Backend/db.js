const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'lab1db.cukc16guifim.us-west-1.rds.amazonaws.com',
  user: 'admin',
  password: 'lab1admin',
  port: 8000,
});

connection.connect((err) => {
  //   if (err) {
  //     console.error(`Database connection failed: ${err.stack}`);
  //     return;
  //   }

  //   console.log('Connected to database.');

  if (err) throw err;

  connection.query('CREATE DATABASE IF NOT EXISTS lab1db;');
  connection.query('USE lab1db;');
  connection.query('CREATE TABLE IF NOT EXISTS students(id int NOT NULL AUTO_INCREMENT, name varchar(100), email varchar(255), password varchar(50), college varchar(255), PRIMARY KEY(id));');
});

exports.connection = connection;