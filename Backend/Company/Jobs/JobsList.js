const JobsList = class JobsList {
  constructor(connection, req, res) {
    this.connection = connection;
    this.req = req;
    this.res = res;
  }

  getjobslist() {
    // console.log(this.req.params.company_id);
    if (this.req.params.company_id !== undefined) {
      const data = {
        jobs: []
      };

      this.connection.query(
        `select * from job_postings where company_id='${this.req.params.company_id}'`,
        (err, rows) => {
          if (err) this.res.end("Can't get information");
          // console.log(rows);
          if (rows !== undefined) {
            rows.forEach(row => {
              data.jobs.push({
                job_id: row.job_id,
                company_id: row.company_id,
                title: row.title,
                deadlinemonth: row.deadlinemonth,
                deadlineday: row.deadlineday,
                deadlineyear: row.deadlineyear,
                deadlinetime: row.deadlinetime,
                deadlinedaytime: row.deadlinedaytime,
                location: row.location,
                salary: row.salary,
                salarytime: row.salarytime,
                category: row.category,
                description: row.description,
                postingdate: row.postingdate,
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
};

module.exports = {
  JobsList
};
