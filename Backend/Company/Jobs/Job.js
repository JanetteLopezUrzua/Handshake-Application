const Job = class Job {
  constructor(connection, req, res) {
    this.connection = connection;
    this.req = req;
    this.res = res;
  }

  getjobinfo() {
    //  console.log(this.req.params.job_id);
    if (this.req.params.job_id !== undefined) {
      this.connection.query(
        `select * from job_postings left join (select id, name from companies) as tb on job_postings.company_id=tb.id where 
        job_id='${this.req.params.job_id}'`,

        (err, rows) => {
          if (err) this.res.end("Can't get information");
          // console.log(rows);

          if (rows !== undefined) {
            let data = {
              title: "",
              deadlinemonth: "",
              deadlineday: "",
              deadlineyear: "",
              deadlinetime: "",
              deadlinedaytime: "",
              location: "",
              salary: "",
              salarytime: "",
              description: "",
              category: "",
              posteddate: "",
              company_name: "",

            };

            rows.forEach(row => {
              data = {
                title: row.title,
                deadlinemonth: row.deadlinemonth,
                deadlineday: row.deadlineday,
                deadlineyear: row.deadlineyear,
                deadlinetime: row.deadlinetime,
                deadlinedaytime: row.deadlinedaytime,
                location: row.location,
                salary: row.salary,
                salarytime: row.salarytime,
                description: row.description,
                category: row.category,
                posteddate: row.postingdate,
                company_name: row.name,
                company_id: row.company_id,
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

  postjobinfo() {
  //  console.log(this.req.body.salary);
    if (this.req.body.job_id !== undefined) {
      this.connection.query(
        `update job_postings set title='${this.req.body.title}', deadlinemonth='${this.req.body.deadlinemonth}', deadlineday='${this.req.body.deadlineday}',
        deadlineyear='${this.req.body.deadlineyear}', deadlinetime='${this.req.body.deadlinetime}', deadlinedaytime='${this.req.body.deadlinedaytime}',
        location='${this.req.body.location}', salary='${this.req.body.salary}', salarytime='${this.req.body.salarytime}', 
        description='${this.req.body.description}', category='${this.req.body.category}' where job_id='${this.req.body.job_id}'`,
        (err) => {
          if (err) this.res.end("Can't update information");

          // console.log('Last insert ID:', result.insertId);

          this.res.writeHead(200, {
            "Content-Type": "text/plain"
          });

          this.res.end("Successful Post");
        }
      );
    }
  }

  deletejob() {
    if (this.req.body.job_id !== undefined) {
      this.connection.query(
        `delete from job_postings where job_id='${this.req.body.job_id}'`,
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

  getcompanyid() {
    // console.log(this.req.params.job_id);
    if (this.req.params.job_id !== undefined) {
      this.connection.query(
        `select company_id from job_postings where job_id='${this.req.params.job_id}'`,
        (err, rows) => {
          if (err) this.res.end("Can't get information");
          // console.log(rows);

          if (rows !== undefined) {
            let data = {
              company_id: "",
            };

            rows.forEach(row => {
              data = {
                company_id: row.company_id,
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
};

module.exports = {
  Job
};
