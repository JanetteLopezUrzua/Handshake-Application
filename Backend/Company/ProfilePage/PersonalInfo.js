const CompanyPersonalInfo = class CompanyPersonalInfo {
  constructor(connection, req, res) {
    this.connection = connection;
    this.req = req;
    this.res = res;
  }

  getpersonalinfo() {
    if (this.req.params.id !== undefined) {
      let data = {
        name: "",
        location: "",
        description: ""
      };

      this.connection.query(
        `select name, location, description from companies where id='${this.req.params.id}'`,
        (err, rows) => {
          if (err) this.res.end("Can't get information");
          // console.log(rows);
          if (rows !== undefined) {
            rows.forEach(row => {
              data = {
                name: row.name,
                location: row.location,
                description: row.description
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
        `update companies set name='${this.req.body.name}', location='${this.req.body.location}', description='${this.req.body.description}' where id='${this.req.body.id}'`,
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
  CompanyPersonalInfo
};
