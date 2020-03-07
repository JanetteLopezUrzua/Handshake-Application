const StudentPersonalInfo = class StudentPersonalInfo {
  constructor(connection, req, res) {
    this.connection = connection;
    this.req = req;
    this.res = res;
  }

  getpersonalinfo() {
    if (this.req.params.id !== undefined) {
      let data = {
        fname: "",
        lname: "",
        dob: "",
        city: "",
        state: "",
        country: "",
        college: ""
      };

      this.connection.query(
        `select fname, lname, college, dob, city, state, country from students where id='${this.req.params.id}'`,
        (err, rows) => {
          if (err) this.res.end("Can't get information");
          // console.log(rows);
          if (rows !== undefined) {
            rows.forEach(row => {
              data = {
                fname: row.fname,
                lname: row.lname,
                dob: row.dob,
                city: row.city,
                state: row.state,
                country: row.country,
                college: row.college
              };
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


  postpersonalinfo() {
    if (this.req.body.id !== undefined) {
      this.connection.query(
        `update students set fname='${this.req.body.fname}', lname='${this.req.body.lname}', college='${this.req.body.college}', dob='${this.req.body.dob}', city='${this.req.body.city}', state='${this.req.body.state}', country='${this.req.body.country}' where id='${this.req.body.id}'`,
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
};

module.exports = {
  StudentPersonalInfo
};
