const CareerObjective = class CareerObjective {
  constructor(connection, req, res) {
    this.connection = connection;
    this.req = req;
    this.res = res;
  }

  getcareerobjective() {
    if (this.req.params.id !== undefined) {
      this.connection.query(
        `select careerobjective from career_objective where id='${this.req.params.id}'`,
        (err, rows) => {
          if (err) this.res.end("Can't get information");
          // console.log(rows);

          let data = {
            objective: ""
          };

          if (rows !== undefined) {
            rows.forEach(row => {
              data = {
                objective: row.careerobjective
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


  postcareerobjective() {
    if (this.req.body.id !== undefined) {
      this.connection.query(
        `insert into career_objective (id, careerobjective) values ('${this.req.body.id}', '${this.req.body.objective}') ON DUPLICATE KEY UPDATE careerobjective='${this.req.body.objective}'`,
        (err) => {
          if (err) this.res.end("Can't update information");

          // console.log('Last insert ID:', result.insertId);

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
  CareerObjective
};
