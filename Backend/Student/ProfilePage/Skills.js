const CareerObjective = class CareerObjective {
  constructor(connection, req, res) {
    this.connection = connection;
    this.req = req;
    this.res = res;
  }

  getskill() {
    if (this.req.params.id !== undefined) {
      const data = {
        skills: []
      };

      this.connection.query(
        `select skill from skills where id='${this.req.params.id}'`,
        (err, rows) => {
          if (err) this.res.end("Can't get information");
          // console.log(rows);

          if (rows !== undefined) {
            rows.forEach(row => {
              data.skills.push(row.skill);
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

  postskill() {
    if (this.req.body.id !== undefined) {
      this.connection.query(
        `select skill from skills where id='${this.req.body.id}' and skill='${this.req.body.skill}'`,
        (err, rows) => {
          if (err) this.res.end("Can't get information");
          console.log(rows);
          if (rows.length > 0 || rows === undefined) {
            this.res.writeHead(400, {
              "Content-Type": "text/plain"
            });

            this.res.end("Skill is already added.");
          } else {
            this.connection.query(
              `insert into skills (id, skill) values ('${this.req.body.id}', '${this.req.body.skill}')`,
              (err2, result) => {
                if (err2) this.res.end("Can't insert information");

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

  deleteskill() {
    if (this.req.body.id !== undefined) {
      this.connection.query(
        `delete from skills where id='${this.req.body.id}' and skill='${this.req.body.skill}'`,
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
  CareerObjective
};
