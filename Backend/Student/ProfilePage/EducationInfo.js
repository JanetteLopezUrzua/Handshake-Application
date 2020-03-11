const EducationInfo = class EducationInfo {
  constructor(connection, req, res) {
    this.connection = connection;
    this.req = req;
    this.res = res;
  }

  geteducationinfo() {
    if (this.req.params.id !== undefined) {
      const data = {
        schools: []
      };

      this.connection.query(
        `select schoolname, primaryschool, location, degree, major, passingmonth, passingyear, gpa from schools where id='${this.req.params.id}'`,
        (err, rows) => {
          if (err) this.res.end("Can't get information");
          // console.log(rows);

          if (rows !== undefined) {
            rows.forEach(row => {
              data.schools.push({
                schoolname: row.schoolname,
                primaryschool: row.primaryschool,
                location: row.location,
                degree: row.degree,
                major: row.major,
                passingmonth: row.passingmonth,
                passingyear: row.passingyear,
                gpa: row.gpa
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
  }

  posteducationinfonewform() {
    if (this.req.body.id !== undefined) {
      this.connection.query(
        `select schoolname, degree from schools where id='${this.req.body.id}' and schoolname='${this.req.body.schoolname}' and degree='${this.req.body.degree}'`,
        (err, rows) => {
          if (err) this.res.end("Can't get information");
          // console.log(rows);
          if (rows.length > 0 || rows === undefined) {
            this.res.writeHead(400, {
              "Content-Type": "text/plain"
            });

            this.res.end("School with same degree already exists.");
          } else {
            this.connection.query(
              `insert into schools (id, schoolname, primaryschool, location, degree, major, passingmonth, passingyear, gpa) values ('${this.req.body.id}', '${this.req.body.schoolname}', '${this.req.body.primaryschool}', '${this.req.body.location}', '${this.req.body.degree}', '${this.req.body.major}', '${this.req.body.passingmonth}', '${this.req.body.passingyear}', '${this.req.body.gpa}')`,
              (err2) => {
                if (err2) console.log(err2);

                //  console.log("Last insert ID:", result.insertId);

                this.res.writeHead(200, {
                  "Content-Type": "text/plain"
                });

                this.res.end("Successful Save");
              }
            );
          }
        }
      );
    }
  }

  posteducationinfo() {
    if (this.req.body.id !== undefined) {
      this.connection.query(
        `update schools set location='${this.req.body.location}', degree='${this.req.body.degree}', major='${this.req.body.major}', passingmonth='${this.req.body.passingmonth}', passingyear='${this.req.body.passingyear}', gpa='${this.req.body.gpa}' where id='${this.req.body.id}' and schoolname='${this.req.body.schoolname}'`,
        (err) => {
          if (err) this.res.end("Can't update information");

          // console.log(`Changed ${result.changedRows} row(s)`);

          this.res.writeHead(200, {
            "Content-Type": "text/plain"
          });

          this.res.end("Successful Save");
        }
      );
    }
  }

  deleteeducationinfo() {
    if (this.req.body.id !== undefined) {
      this.connection.query(
        `delete from schools where id='${this.req.body.id}' and schoolname='${this.req.body.schoolname}' and degree='${this.req.body.degree}'`,
        (err) => {
          if (err) this.res.end("Can't delete information");
          else {
            // console.log(`Deleted ${result.affectedRows} row(s)`);

            this.res.writeHead(200, {
              "Content-Type": "text/plain"
            });

            this.res.end("Successful Delete");
          }
        }
      );
    }
  }
};

module.exports = {
  EducationInfo
};
