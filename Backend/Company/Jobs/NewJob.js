const CompanyNewJob = class CompanyNewJob {
  constructor(connection, req, res) {
    this.connection = connection;
    this.req = req;
    this.res = res;
  }

  postnewjob() {
    // console.log(this.req.body.company_id);
    if (this.req.body.company_id !== undefined) {
      this.connection.query(
        `insert into job_postings (company_id, title, deadlinemonth, deadlineday, deadlineyear, deadlinetime, deadlinedaytime, location, 
            salary, salarytime, category, description, postingdate) values ('${this.req.body.company_id}', '${this.req.body.title}',
              '${this.req.body.deadlinemonth}', '${this.req.body.deadlineday}', '${this.req.body.deadlineyear}', '${this.req.body.deadlinetime}',
              '${this.req.body.deadlinedaytime}', '${this.req.body.location}', '${this.req.body.salary}', '${this.req.body.salarytime}',
              '${this.req.body.category}', '${this.req.body.description}', '${this.req.body.postingdate}')`,
        (err) => {
          if (err) this.res.end(`Can't insert information. Error: ${err}`);
          else {
            // console.log('Last insert ID:', result.insertId);

            this.res.writeHead(200, {
              "Content-Type": "text/plain",
            });

            this.res.end("Successful Save");
          }
        },
      );
    }
  }
};

module.exports = {
  CompanyNewJob,
};
