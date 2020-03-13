const mysql = require('mysql');

const connection = mysql.createPool({
  host: 'lab1db.cukc16guifim.us-west-1.rds.amazonaws.com',
  user: 'admin',
  password: 'lab1admin',
  port: 8000,
  database: 'lab1db',
});

connection.getConnection((err) => {
  //   if (err) {
  //     console.error(`Database connection failed: ${err.stack}`);
  //     return;
  //   }

  //   console.log('Connected to database.');

  if (err) throw err;

  // connection.query('CREATE DATABASE IF NOT EXISTS lab1db;');
  // connection.query('USE lab1db;');

  /* Student Profile tables */
  connection.query('CREATE TABLE IF NOT EXISTS students(id int NOT NULL AUTO_INCREMENT, fname varchar(100), lname varchar(100), email varchar(255), password varchar(50), college varchar(255), dob varchar(25), city varchar(255), state varchar(255), country varchar(255), phonenumber varchar(255), PRIMARY KEY(id));');
  connection.query('CREATE TABLE IF NOT EXISTS career_objective(id int unique NOT NULL, careerobjective text, foreign key(id) references students(id));');
  connection.query('CREATE TABLE IF NOT EXISTS skills(id int NOT NULL, skill varchar(100), foreign key(id) references students(id));');
  connection.query('CREATE TABLE IF NOT EXISTS students_photos(id int unique NOT NULL, photo longtext, foreign key(id) references students(id));');
  connection.query('CREATE TABLE IF NOT EXISTS schools(id int NOT NULL, schoolname varchar(255), primaryschool varchar(5), location varchar(255), degree varchar(50), major varchar(255), passingmonth varchar(50), passingyear int, gpa float, foreign key(id) references students(id));');
  connection.query('CREATE TABLE IF NOT EXISTS jobs(id int NOT NULL, companyname varchar(255), title varchar(255), startdatemonth varchar(50), startdateyear int, enddatemonth varchar(50), enddateyear int, description text, foreign key(id) references students(id));');


  /* Company Profile tables */
  connection.query('CREATE TABLE IF NOT EXISTS companies(id int NOT NULL AUTO_INCREMENT, name varchar(100), email varchar(255), password varchar(50), location varchar(255), description text, phonenumber varchar(255), PRIMARY KEY(id));');
  connection.query('CREATE TABLE IF NOT EXISTS companies_photos(id int unique NOT NULL, photo longtext, foreign key(id) references companies(id));');


  /* Events tables */
  connection.query('CREATE TABLE IF NOT EXISTS company_events(event_id int NOT NULL AUTO_INCREMENT, company_id int NOT NULL, bannerphoto longtext, title varchar(255), dayofweek int, month int, day int, year int, starttime varchar(10), startdaytime varchar(2), endtime varchar(10), enddaytime varchar(2), timezone varchar(4), location varchar(255), eligibility varchar(255), description text, PRIMARY KEY(event_id));');
  connection.query('CREATE TABLE IF NOT EXISTS RSVP(event_id int NOT NULL, student_id int NOT NULL, FOREIGN KEY (event_id) REFERENCES company_events (event_id) ON DELETE CASCADE);');

  /* Jobs tables */
  connection.query('CREATE TABLE IF NOT EXISTS job_postings(job_id int NOT NULL AUTO_INCREMENT, company_id int NOT NULL, title varchar(255), deadlinemonth int, deadlineday int, deadlineyear int, deadlinetime varchar(10), deadlinedaytime varchar(2), location varchar(255), salary bigint, salarytime varchar(20), category varchar(20), description text, postingdate varchar(100), PRIMARY KEY(job_id));');
  connection.query('CREATE TABLE IF NOT EXISTS resumes(job_id int NOT NULL, student_id int NOT NULL, resume varchar(255), status varchar(100), applicationdate varchar(100), FOREIGN KEY (job_id) REFERENCES job_postings (job_id) ON DELETE CASCADE);');
});


exports.connection = connection;
