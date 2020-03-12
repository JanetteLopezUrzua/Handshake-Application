const StudentContactInfo = class StudentContactInfo {
  constructor(connection, req, res) {
    this.connection = connection;
    this.req = req;
    this.res = res;
  }

  getcontactinfo() {
    if (this.req.params.id !== undefined) {
      let data = {
        email: "",
        phonenum: "",
      };

      this.connection.query(
        `select email, phonenumber from students where id='${this.req.params.id}'`,
        (err, rows) => {
          if (err) this.res.end("Can't get information");
          // console.log(rows);
          if (rows !== undefined) {
            rows.forEach(row => {
              data = {
                email: row.email,
                phonenum: row.phonenumber,
              };
            });

            this.res.writeHead(200, {
              "Content-Type": "application/json",
            });

            // console.log(data);

            this.res.end(JSON.stringify(data));
          }
        },
      );
    }
  }


  postcontactinfo() {
    if (this.req.body.id !== undefined) {
      this.connection.query(
        `update students set email='${this.req.body.email}', phonenumber='${this.req.body.phonenum}' where id='${this.req.body.id}'`,
        (err) => {
          if (err) this.res.end("Can't update information");

          // console.log(`Changed ${result.changedRows} row(s)`);

          this.res.writeHead(200, {
            "Content-Type": "text/plain",
          });

          this.res.end("Successful Save");
        },
      );
    }
  }
};

module.exports = {
  StudentContactInfo,
};
