const StudentStudentsList = class StudentStudentsList {
  constructor(connection, req, res) {
    this.connection = connection;
    this.req = req;
    this.res = res;
  }

  postall() {
    this.connection.query(
      "select * from ((select students.id as ids, CONCAT_WS(' ', fname, lname) AS name, fname, lname, photo from students left join students_photos on students.id=students_photos.id) as tb left join (select schools.id, schoolname, degree, major, passingmonth, passingyear from schools where primaryschool='true') as tb2 on tb.ids=tb2.id)",
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
      `select * from ((select students.id as ids, CONCAT_WS(' ', fname, lname) AS name, fname, lname, photo 
    from students left join students_photos on students.id=students_photos.id) as tb 
    left join (select schools.id, schoolname, degree, major, passingmonth, passingyear 
    from schools where primaryschool='true') as tb2 on tb.ids=tb2.id) where name like '%${this.req.body.name}%'`,
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
      `select * from ((select students.id as ids, CONCAT_WS(' ', fname, lname) AS name, fname, lname, photo 
    from students left join students_photos on students.id=students_photos.id) as tb 
    left join (select schools.id, schoolname, degree, major, passingmonth, passingyear 
    from schools where primaryschool='true') as tb2 on tb.ids=tb2.id) where schoolname like '%${this.req.body.college}%'`,
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

  postmajor() {
    this.connection.query(
      `select * from ((select students.id as ids, CONCAT_WS(' ', fname, lname) AS name, fname, lname, photo 
    from students left join students_photos on students.id=students_photos.id) as tb 
    left join (select schools.id, schoolname, degree, major, passingmonth, passingyear 
    from schools where primaryschool='true') as tb2 on tb.ids=tb2.id) where major like '%${this.req.body.major}%'`,
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
      `select * from ((select students.id as ids, CONCAT_WS(' ', fname, lname) AS name, fname, lname, photo 
    from students left join students_photos on students.id=students_photos.id) as tb 
    left join (select schools.id, schoolname, degree, major, passingmonth, passingyear 
    from schools where primaryschool='true') as tb2 on tb.ids=tb2.id) where name like '%${this.req.body.name}%' and schoolname like '%${this.req.body.college}%'`,
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

  postnameandmajor() {
    this.connection.query(
      `select * from ((select students.id as ids, CONCAT_WS(' ', fname, lname) AS name, fname, lname, photo 
    from students left join students_photos on students.id=students_photos.id) as tb 
    left join (select schools.id, schoolname, degree, major, passingmonth, passingyear 
    from schools where primaryschool='true') as tb2 on tb.ids=tb2.id) where name like '%${this.req.body.name}%' and major like '%${this.req.body.major}%'`,
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

  postcollegeandmajor() {
    this.connection.query(
      `select * from ((select students.id as ids, CONCAT_WS(' ', fname, lname) AS name, fname, lname, photo 
    from students left join students_photos on students.id=students_photos.id) as tb 
    left join (select schools.id, schoolname, degree, major, passingmonth, passingyear 
    from schools where primaryschool='true') as tb2 on tb.ids=tb2.id) where schoolname like '%${this.req.body.college}%' and major like '%${this.req.body.major}%'`,
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

  postnameandcollegeandmajor() {
    this.connection.query(
      `select * from ((select students.id as ids, CONCAT_WS(' ', fname, lname) AS name, fname, lname, photo 
    from students left join students_photos on students.id=students_photos.id) as tb 
    left join (select schools.id, schoolname, degree, major, passingmonth, passingyear 
    from schools where primaryschool='true') as tb2 on tb.ids=tb2.id) where name like '%${this.req.body.name}%' and schoolname like '%${this.req.body.college}%' and major like '%${this.req.body.major}%'`,
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
  StudentStudentsList
};
