const StudentApplications = class StudentApplications {
  constructor(connection, req, res) {
    this.connection = connection;
    this.req = req;
    this.res = res;
  }

  getallapplications() {
    const data = {
      applications: []
    };

    this.connection.query(
      `select * from (select job_id, company_id, title, deadlinemonth, deadlineday, deadlineyear, name, photo  from (select companies.id, name, photo 
        from companies left join companies_photos on companies.id=companies_photos.id) as tb left join job_postings 
        on tb.id=job_postings.company_id) as tb2 left join resumes on tb2.job_id=resumes.job_id where student_id='${this.req.body.student_id}'`,
      (err, rows) => {
        if (err) this.res.end("Can't get information");
        // console.log(rows);

        if (rows !== undefined) {
          rows.forEach(row => {
            data.applications.push({
              job_id: row.job_id,
              company_id: row.company_id,
              title: row.title,
              deadlinemonth: row.deadlinemonth,
              deadlineday: row.deadlineday,
              deadlineyear: row.deadlineyear,
              status: row.status,
              applicationdate: row.applicationdate,
              name: row.name,
              photo: row.photo,
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


  getpendingapplications() {
    const data = {
      applications: []
    };

    this.connection.query(
      `select * from (select job_id, company_id, title, deadlinemonth, deadlineday, deadlineyear, name, photo  from (select companies.id, name, photo 
        from companies left join companies_photos on companies.id=companies_photos.id) as tb left join job_postings 
        on tb.id=job_postings.company_id) as tb2 left join resumes on tb2.job_id=resumes.job_id 
        where student_id='${this.req.body.student_id}' and status="Pending"`,
      (err, rows) => {
        if (err) this.res.end("Can't get information");
        // console.log(rows);

        if (rows !== undefined) {
          rows.forEach(row => {
            data.applications.push({
              job_id: row.job_id,
              company_id: row.company_id,
              title: row.title,
              deadlinemonth: row.deadlinemonth,
              deadlineday: row.deadlineday,
              deadlineyear: row.deadlineyear,
              status: row.status,
              applicationdate: row.applicationdate,
              name: row.name,
              photo: row.photo,
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

  getreviewedapplications() {
    const data = {
      applications: []
    };

    this.connection.query(
      `select * from (select job_id, company_id, title, deadlinemonth, deadlineday, deadlineyear, name, photo  from (select companies.id, name, photo 
        from companies left join companies_photos on companies.id=companies_photos.id) as tb left join job_postings 
        on tb.id=job_postings.company_id) as tb2 left join resumes on tb2.job_id=resumes.job_id 
        where student_id='${this.req.body.student_id}' and status="Reviewed"`,
      (err, rows) => {
        if (err) this.res.end("Can't get information");
        // console.log(rows);

        if (rows !== undefined) {
          rows.forEach(row => {
            data.applications.push({
              job_id: row.job_id,
              company_id: row.company_id,
              title: row.title,
              deadlinemonth: row.deadlinemonth,
              deadlineday: row.deadlineday,
              deadlineyear: row.deadlineyear,
              status: row.status,
              applicationdate: row.applicationdate,
              name: row.name,
              photo: row.photo,
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

  getdeclinedapplications() {
    const data = {
      applications: []
    };

    this.connection.query(
      `select * from (select job_id, company_id, title, deadlinemonth, deadlineday, deadlineyear, name, photo  from (select companies.id, name, photo 
        from companies left join companies_photos on companies.id=companies_photos.id) as tb left join job_postings 
        on tb.id=job_postings.company_id) as tb2 left join resumes on tb2.job_id=resumes.job_id 
        where student_id='${this.req.body.student_id}' and status="Declined"`,
      (err, rows) => {
        if (err) this.res.end("Can't get information");
        // console.log(rows);

        if (rows !== undefined) {
          rows.forEach(row => {
            data.applications.push({
              job_id: row.job_id,
              company_id: row.company_id,
              title: row.title,
              deadlinemonth: row.deadlinemonth,
              deadlineday: row.deadlineday,
              deadlineyear: row.deadlineyear,
              status: row.status,
              applicationdate: row.applicationdate,
              name: row.name,
              photo: row.photo,
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
};

module.exports = {
  StudentApplications
};
