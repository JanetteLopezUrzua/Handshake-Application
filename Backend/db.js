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
  connection.query('CREATE TABLE IF NOT EXISTS students(id int NOT NULL AUTO_INCREMENT, name varchar(100), email varchar(255), password varchar(50), college varchar(255), dob varchar(25), city varchar(255), state varchar(255), country varchar(255), phonenumber varchar(255), PRIMARY KEY(id));');
  connection.query('CREATE TABLE IF NOT EXISTS career_objective(id int unique NOT NULL, careerobjective text, foreign key(id) references students(id));');
  connection.query('CREATE TABLE IF NOT EXISTS skills(id int NOT NULL, skill varchar(100), foreign key(id) references students(id));');
  connection.query('CREATE TABLE IF NOT EXISTS companies(id int NOT NULL AUTO_INCREMENT, name varchar(100), email varchar(255), password varchar(50), location varchar(255), PRIMARY KEY(id));');
});

exports.connection = connection;
