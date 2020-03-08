const CompanyStudentsList = class CompanyStudentsList {
  constructor(connection, req, res) {
    this.connection = connection;
    this.req = req;
    this.res = res;
  }

  postall() {
    this.connection.query(
      `select * from ((select students.id as ids, CONCAT_WS(' ', fname, lname) AS name, fname, lname, photo from students 
      left join students_photos on students.id=students_photos.id) as tb 
      left join (select schools.id, schoolname, degree, major, passingmonth, passingyear from schools where primaryschool='true') as tb2 
      on tb.ids=tb2.id) left join (SELECT id, GROUP_CONCAT(skill) as skill FROM skills GROUP BY id) as tb3 on tb.ids=tb3.id`,
      (err, rows) => {
        if (err) this.res.end("Can't get information");

        if (rows !== undefined) {
          const data = {
            students: []
          };

          rows.forEach(row => {
            data.students.push({
              id: row.ids,
              name: row.name,
              fname: row.fname,
              lname: row.lname,
              college: row.schoolname,
              degree: row.degree,
              passingmonth: row.passingmonth,
              passingyear: row.passingyear,
              major: row.major,
              skillset: row.skill,
              photo: row.photo
            });
          });

          this.res.writeHead(200, {
            "Content-Type": "application/json"
          });

          // console.log(data);

          this.res.end(JSON.stringify(data));
        }
      }
    );
  }

  postname() {
    this.connection.query(
      `select * from ((select students.id as ids, CONCAT_WS(' ', fname, lname) AS name, fname, lname, photo from students 
      left join students_photos on students.id=students_photos.id) as tb 
      left join (select schools.id, schoolname, degree, major, passingmonth, passingyear from schools where primaryschool='true') as tb2 
      on tb.ids=tb2.id) left join (SELECT id, GROUP_CONCAT(skill) as skill FROM skills GROUP BY id) as tb3 on tb.ids=tb3.id 
      where name like '%${this.req.body.name}%'`,
      (err, rows) => {
        if (err) this.res.end("Can't get information");

        if (rows !== undefined) {
          const data = {
            students: []
          };

          rows.forEach(row => {
            data.students.push({
              id: row.ids,
              name: row.name,
              fname: row.fname,
              lname: row.lname,
              college: row.schoolname,
              degree: row.degree,
              passingmonth: row.passingmonth,
              passingyear: row.passingyear,
              major: row.major,
              skillset: row.skill,
              photo: row.photo
            });
          });

          this.res.writeHead(200, {
            "Content-Type": "application/json"
          });

          // console.log(data);

          this.res.end(JSON.stringify(data));
        }
      }
    );
  }

  postcollege() {
    this.connection.query(
      `select * from ((select students.id as ids, CONCAT_WS(' ', fname, lname) AS name, fname, lname, photo from students 
        left join students_photos on students.id=students_photos.id) as tb 
        left join (select schools.id, schoolname, degree, major, passingmonth, passingyear from schools where primaryschool='true') as tb2 
        on tb.ids=tb2.id) left join (SELECT id, GROUP_CONCAT(skill) as skill FROM skills GROUP BY id) as tb3 on tb.ids=tb3.id 
        where college like '%${this.req.body.college}%'`,
      (err, rows) => {
        if (err) this.res.end("Can't get information");

        if (rows !== undefined) {
          const data = {
            students: []
          };

          rows.forEach(row => {
            data.students.push({
              id: row.ids,
              name: row.name,
              fname: row.fname,
              lname: row.lname,
              college: row.schoolname,
              degree: row.degree,
              passingmonth: row.passingmonth,
              passingyear: row.passingyear,
              major: row.major,
              skillset: row.skill,
              photo: row.photo
            });
          });

          this.res.writeHead(200, {
            "Content-Type": "application/json"
          });

          // console.log(data);

          this.res.end(JSON.stringify(data));
        }
      }
    );
  }

  postskill() {
    this.connection.query(
      `select * from ((select students.id as ids, CONCAT_WS(' ', fname, lname) AS name, fname, lname, photo from students 
        left join students_photos on students.id=students_photos.id) as tb 
        left join (select schools.id, schoolname, degree, major, passingmonth, passingyear from schools where primaryschool='true') as tb2 
        on tb.ids=tb2.id) left join (SELECT id, GROUP_CONCAT(skill) as skill FROM skills GROUP BY id) as tb3 on tb.ids=tb3.id 
        where skill like '%${this.req.body.skill}%'`,
      (err, rows) => {
        if (err) this.res.end("Can't get information");

        if (rows !== undefined) {
          const data = {
            students: []
          };

          rows.forEach(row => {
            data.students.push({
              id: row.ids,
              name: row.name,
              fname: row.fname,
              lname: row.lname,
              college: row.schoolname,
              degree: row.degree,
              passingmonth: row.passingmonth,
              passingyear: row.passingyear,
              major: row.major,
              skillset: row.skill,
              photo: row.photo
            });
          });

          this.res.writeHead(200, {
            "Content-Type": "application/json"
          });

          // console.log(data);

          this.res.end(JSON.stringify(data));
        }
      }
    );
  }

  postnameandcollege() {
    this.connection.query(
      `select * from ((select students.id as ids, CONCAT_WS(' ', fname, lname) AS name, fname, lname, photo from students 
        left join students_photos on students.id=students_photos.id) as tb 
        left join (select schools.id, schoolname, degree, major, passingmonth, passingyear from schools where primaryschool='true') as tb2 
        on tb.ids=tb2.id) left join (SELECT id, GROUP_CONCAT(skill) as skill FROM skills GROUP BY id) as tb3 on tb.ids=tb3.id 
        where name like '%${this.req.body.name}%' and schoolname like '%${this.req.body.college}%'`,
      (err, rows) => {
        if (err) this.res.end("Can't get information");

        if (rows !== undefined) {
          const data = {
            students: []
          };

          rows.forEach(row => {
            data.students.push({
              id: row.ids,
              name: row.name,
              fname: row.fname,
              lname: row.lname,
              college: row.schoolname,
              degree: row.degree,
              passingmonth: row.passingmonth,
              passingyear: row.passingyear,
              major: row.major,
              skillset: row.skill,
              photo: row.photo
            });
          });

          this.res.writeHead(200, {
            "Content-Type": "application/json"
          });

          // console.log(data);

          this.res.end(JSON.stringify(data));
        }
      }
    );
  }

  postnameandskill() {
    this.connection.query(
      `select * from ((select students.id as ids, CONCAT_WS(' ', fname, lname) AS name, fname, lname, photo from students 
        left join students_photos on students.id=students_photos.id) as tb 
        left join (select schools.id, schoolname, degree, major, passingmonth, passingyear from schools where primaryschool='true') as tb2 
        on tb.ids=tb2.id) left join (SELECT id, GROUP_CONCAT(skill) as skill FROM skills GROUP BY id) as tb3 on tb.ids=tb3.id 
        where name like '%${this.req.body.name}%' and skill like '%${this.req.body.skill}%'`,
      (err, rows) => {
        if (err) this.res.end("Can't get information");

        if (rows !== undefined) {
          const data = {
            students: []
          };

          rows.forEach(row => {
            data.students.push({
              id: row.ids,
              name: row.name,
              fname: row.fname,
              lname: row.lname,
              college: row.schoolname,
              degree: row.degree,
              passingmonth: row.passingmonth,
              passingyear: row.passingyear,
              major: row.major,
              skillset: row.skill,
              photo: row.photo
            });
          });

          this.res.writeHead(200, {
            "Content-Type": "application/json"
          });

          // console.log(data);

          this.res.end(JSON.stringify(data));
        }
      }
    );
  }

  postcollegeandskill() {
    this.connection.query(
      `select * from ((select students.id as ids, CONCAT_WS(' ', fname, lname) AS name, fname, lname, photo from students 
        left join students_photos on students.id=students_photos.id) as tb 
        left join (select schools.id, schoolname, degree, major, passingmonth, passingyear from schools where primaryschool='true') as tb2 
        on tb.ids=tb2.id) left join (SELECT id, GROUP_CONCAT(skill) as skill FROM skills GROUP BY id) as tb3 on tb.ids=tb3.id 
        where schoolname like '%${this.req.body.college}%' and skill like '%${this.req.body.skill}%'`,
      (err, rows) => {
        if (err) this.res.end("Can't get information");

        if (rows !== undefined) {
          const data = {
            students: []
          };

          rows.forEach(row => {
            data.students.push({
              id: row.ids,
              name: row.name,
              fname: row.fname,
              lname: row.lname,
              college: row.schoolname,
              degree: row.degree,
              passingmonth: row.passingmonth,
              passingyear: row.passingyear,
              major: row.major,
              skillset: row.skill,
              photo: row.photo
            });
          });

          this.res.writeHead(200, {
            "Content-Type": "application/json"
          });

          // console.log(data);

          this.res.end(JSON.stringify(data));
        }
      }
    );
  }

  postnameandcollegeandskill() {
    this.connection.query(
      `select * from ((select students.id as ids, CONCAT_WS(' ', fname, lname) AS name, fname, lname, photo from students 
        left join students_photos on students.id=students_photos.id) as tb 
        left join (select schools.id, schoolname, degree, major, passingmonth, passingyear from schools where primaryschool='true') as tb2 
        on tb.ids=tb2.id) left join (SELECT id, GROUP_CONCAT(skill) as skill FROM skills GROUP BY id) as tb3 on tb.ids=tb3.id 
        where name like '%${this.req.body.name}%' and skill like '%${this.req.body.skill}%' and schoolname like '%${this.req.body.college}%'`,
      (err, rows) => {
        if (err) this.res.end("Can't get information");

        if (rows !== undefined) {
          const data = {
            students: []
          };

          rows.forEach(row => {
            data.students.push({
              id: row.ids,
              name: row.name,
              fname: row.fname,
              lname: row.lname,
              college: row.schoolname,
              degree: row.degree,
              passingmonth: row.passingmonth,
              passingyear: row.passingyear,
              major: row.major,
              skillset: row.skill,
              photo: row.photo
            });
          });

          this.res.writeHead(200, {
            "Content-Type": "application/json"
          });

          // console.log(data);

          this.res.end(JSON.stringify(data));
        }
      }
    );
  }
};

module.exports = {
  CompanyStudentsList
};
