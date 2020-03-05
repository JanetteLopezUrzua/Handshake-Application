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

  /* Student Profile tables */
  connection.query('CREATE TABLE IF NOT EXISTS students(id int NOT NULL AUTO_INCREMENT, fname varchar(100), lname varchar(100), email varchar(255), password varchar(50), college varchar(255), dob varchar(25), city varchar(255), state varchar(255), country varchar(255), phonenumber varchar(255), PRIMARY KEY(id));');
  connection.query('CREATE TABLE IF NOT EXISTS career_objective(id int unique NOT NULL, careerobjective text, foreign key(id) references students(id));');
  connection.query('CREATE TABLE IF NOT EXISTS skills(id int NOT NULL, skill varchar(100), foreign key(id) references students(id));');
  connection.query('CREATE TABLE IF NOT EXISTS students_photos(id int unique NOT NULL, photo longblob, foreign key(id) references students(id));');
  connection.query('CREATE TABLE IF NOT EXISTS schools(id int NOT NULL, schoolname varchar(255), location varchar(255), degree varchar(50), major varchar(255), passingmonth varchar(50), passingyear int, gpa float, foreign key(id) references students(id));');
  connection.query('CREATE TABLE IF NOT EXISTS jobs(id int NOT NULL, companyname varchar(255), title varchar(255), startdatemonth varchar(50), startdateyear int, enddatemonth varchar(50), enddateyear int, description text, foreign key(id) references students(id));');


  /* Company Profile tables */
  connection.query('CREATE TABLE IF NOT EXISTS companies(id int NOT NULL AUTO_INCREMENT, name varchar(100), email varchar(255), password varchar(50), location varchar(255), description text, phonenumber varchar(255), PRIMARY KEY(id));');
  connection.query('CREATE TABLE IF NOT EXISTS companies_photos(id int unique NOT NULL, photo longblob, foreign key(id) references companies(id));');
});

exports.connection = connection;
