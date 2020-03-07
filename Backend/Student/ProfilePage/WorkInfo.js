const WorkInfo = class WorkInfo {
  constructor(connection, req, res) {
    this.connection = connection;
    this.req = req;
    this.res = res;
  }

  getworkinfo() {
    if (this.req.params.id !== undefined) {
      const data = {
        jobs: []
      };

      this.connection.query(
        `select companyname, title, startdatemonth, startdateyear, enddatemonth, enddateyear, description from jobs where id='${this.req.params.id}'`,
        (err, rows) => {
          if (err) this.res.end("Can't get information");
          console.log(rows);

          if (rows !== undefined) {
            rows.forEach(row => {
              data.jobs.push({
                companyname: row.companyname,
                title: row.title,
                startdatemonth: row.startdatemonth,
                startdateyear: row.startdateyear,
                enddatemonth: row.enddatemonth,
                enddateyear: row.enddateyear,
                description: row.description
              });
            });

            this.res.writeHead(200, {
              "Content-Type": "application/json"
            });

            console.log(data);

            this.res.end(JSON.stringify(data));
          }
        }
      );
    }
  }

  postworkinfonewform() {
    if (this.req.body.id !== undefined) {
      this.connection.query(
        `select companyname from jobs where id='${this.req.body.id}' and companyname='${this.req.body.companyname}' and title='${this.req.body.title}'`,
        (err, rows) => {
          if (err) this.res.end("Can't get information");
          console.log(rows);
          if (rows.length > 0 || rows === undefined) {
            this.res.writeHead(400, {
              "Content-Type": "text/plain"
            });

            this.res.end("Company with that job title already exists.");
          } else {
            this.connection.query(
              `insert into jobs (id, companyname, title, startdatemonth, startdateyear, enddatemonth, enddateyear, description) values ('${this.req.body.id}', '${this.req.body.companyname}', '${this.req.body.title}', '${this.req.body.startdatemonth}', '${this.req.body.startdateyear}', '${this.req.body.enddatemonth}', '${this.req.body.enddateyear}', '${this.req.body.description}')`,
              (err2, result) => {
                if (err2) console.log(err2);

                console.log("Last insert ID:", result.insertId);

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

  postworkinfo() {
    if (this.req.body.id !== undefined) {
      this.connection.query(
        `update jobs set enddatemonth='${this.req.body.enddatemonth}', enddateyear='${this.req.body.enddateyear}', description='${this.req.body.description}' where id='${this.req.body.id}' and companyname='${this.req.body.companyname}'`,
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

  deleteworkinfo() {
    if (this.req.body.id !== undefined) {
      this.connection.query(
        `delete from jobs where id='${this.req.body.id}' and companyname='${this.req.body.companyname}' and title='${this.req.body.title}'`,
        (err) => {
          if (err) this.res.end("Can't delete information");

          // console.log(`Deleted ${result.affectedRows} row(s)`);

          this.res.writeHead(200, {
            "Content-Type": "text/plain"
          });

          this.res.end("Successful Delete");
        }
      );
    }
  }
};

module.exports = {
  WorkInfo
};
