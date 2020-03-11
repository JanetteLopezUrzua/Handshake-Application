const StudentsJobsList = class StudentsJobsList {
  constructor(connection, req, res) {
    this.connection = connection;
    this.req = req;
    this.res = res;
  }

  getalljobs() {
    // console.log(this.req.params.company_id);
    const data = {
      jobs: []
    };

    this.connection.query(
      `select * from job_postings left join (select companies.id, companies.name, photo from companies left join 
        companies_photos on companies.id = companies_photos.id) as tb on tb.id=job_postings.company_id`,
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
              company_name: row.name,
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

  getnameortitlejobs() {
    // console.log(this.req.params.company_id);
    const data = {
      jobs: []
    };

    this.connection.query(
      `select * from job_postings left join (select companies.id, companies.name, photo from companies left join 
        companies_photos on companies.id = companies_photos.id) as tb on tb.id=job_postings.company_id where name 
        like '%${this.req.body.nameortitle}%' or title like '%${this.req.body.nameortitle}%'`,
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
              company_name: row.name,
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

  getlocationjobs() {
    // console.log(this.req.params.company_id);
    const data = {
      jobs: []
    };

    this.connection.query(
      `select * from job_postings left join (select companies.id, companies.name, photo from companies left join 
        companies_photos on companies.id = companies_photos.id) as tb on tb.id=job_postings.company_id where location 
        like '%${this.req.body.location}%'`,
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
              company_name: row.name,
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

  getfulltimejobs() {
    // console.log(this.req.params.company_id);
    const data = {
      jobs: []
    };

    this.connection.query(
      `select * from job_postings left join (select companies.id, companies.name, photo from companies left join 
        companies_photos on companies.id = companies_photos.id) as tb on tb.id=job_postings.company_id where 
        category='Full-Time'`,
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
              company_name: row.name,
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

  getparttimejobs() {
    // console.log(this.req.params.company_id);
    const data = {
      jobs: []
    };

    this.connection.query(
      `select * from job_postings left join (select companies.id, companies.name, photo from companies left join 
        companies_photos on companies.id = companies_photos.id) as tb on tb.id=job_postings.company_id where 
        category='Part-Time'`,
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
              company_name: row.name,
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

  getinternshipsjobs() {
    // console.log(this.req.params.company_id);
    const data = {
      jobs: []
    };

    this.connection.query(
      `select * from job_postings left join (select companies.id, companies.name, photo from companies left join 
        companies_photos on companies.id = companies_photos.id) as tb on tb.id=job_postings.company_id where 
        category='Intern'`,
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
              company_name: row.name,
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

  getoncampusjobs() {
    // console.log(this.req.params.company_id);
    const data = {
      jobs: []
    };

    this.connection.query(
      `select * from job_postings left join (select companies.id, companies.name, photo from companies left join 
        companies_photos on companies.id = companies_photos.id) as tb on tb.id=job_postings.company_id where 
        category='On-Campus'`,
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
              company_name: row.name,
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


  getlfulltimejobs() {
  // console.log(this.req.params.company_id);
    const data = {
      jobs: []
    };

    this.connection.query(
      `select * from job_postings left join (select companies.id, companies.name, photo from companies left join 
      companies_photos on companies.id = companies_photos.id) as tb on tb.id=job_postings.company_id where 
      category='Full-Time' and location like '%${this.req.body.location}%'`,
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
              company_name: row.name,
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

  getlparttimejobs() {
  // console.log(this.req.params.company_id);
    const data = {
      jobs: []
    };

    this.connection.query(
      `select * from job_postings left join (select companies.id, companies.name, photo from companies left join 
      companies_photos on companies.id = companies_photos.id) as tb on tb.id=job_postings.company_id where 
      category='Part-Time' and location like '%${this.req.body.location}%'`,
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
              company_name: row.name,
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

  getlinternshipsjobs() {
  // console.log(this.req.params.company_id);
    const data = {
      jobs: []
    };

    this.connection.query(
      `select * from job_postings left join (select companies.id, companies.name, photo from companies left join 
      companies_photos on companies.id = companies_photos.id) as tb on tb.id=job_postings.company_id where 
      category='Intern' and location like '%${this.req.body.location}%'`,
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
              company_name: row.name,
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

  getloncampusjobs() {
  // console.log(this.req.params.company_id);
    const data = {
      jobs: []
    };

    this.connection.query(
      `select * from job_postings left join (select companies.id, companies.name, photo from companies left join 
      companies_photos on companies.id = companies_photos.id) as tb on tb.id=job_postings.company_id where 
      category='On-Campus' and location like '%${this.req.body.location}%'`,
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
              company_name: row.name,
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


  getntfulltimejobs() {
    // console.log(this.req.params.company_id);
    const data = {
      jobs: []
    };

    this.connection.query(
      `select * from job_postings left join (select companies.id, companies.name, photo from companies left join 
        companies_photos on companies.id = companies_photos.id) as tb on tb.id=job_postings.company_id where 
        category='Full-Time' and (name like '%${this.req.body.nameortitle}%' or title like '%${this.req.body.nameortitle}%')`,
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
              company_name: row.name,
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

  getntparttimejobs() {
    // console.log(this.req.params.company_id);
    const data = {
      jobs: []
    };

    this.connection.query(
      `select * from job_postings left join (select companies.id, companies.name, photo from companies left join 
        companies_photos on companies.id = companies_photos.id) as tb on tb.id=job_postings.company_id where 
        category='Part-Time' and (name like '%${this.req.body.nameortitle}%' or title like '%${this.req.body.nameortitle}%')`,
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
              company_name: row.name,
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

  getntinternshipsjobs() {
    // console.log(this.req.params.company_id);
    const data = {
      jobs: []
    };

    this.connection.query(
      `select * from job_postings left join (select companies.id, companies.name, photo from companies left join 
        companies_photos on companies.id = companies_photos.id) as tb on tb.id=job_postings.company_id where 
        category='Intern' and (name like '%${this.req.body.nameortitle}%' or title like '%${this.req.body.nameortitle}%')`,
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
              company_name: row.name,
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

  getntoncampusjobs() {
    // console.log(this.req.params.company_id);
    const data = {
      jobs: []
    };

    this.connection.query(
      `select * from job_postings left join (select companies.id, companies.name, photo from companies left join 
        companies_photos on companies.id = companies_photos.id) as tb on tb.id=job_postings.company_id where 
        category='On-Campus' and (name like '%${this.req.body.nameortitle}%' or title like '%${this.req.body.nameortitle}%')`,
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
              company_name: row.name,
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


  getlntfulltimejobs() {
    // console.log(this.req.params.company_id);
    const data = {
      jobs: []
    };

    this.connection.query(
      `select * from job_postings left join (select companies.id, companies.name, photo from companies left join 
        companies_photos on companies.id = companies_photos.id) as tb on tb.id=job_postings.company_id where 
        category='Full-Time' and location like '%${this.req.body.location}%' and (name like '%${this.req.body.nameortitle}%' or title like '%${this.req.body.nameortitle}%')`,
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
              company_name: row.name,
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

  getlntparttimejobs() {
    // console.log(this.req.params.company_id);
    const data = {
      jobs: []
    };

    this.connection.query(
      `select * from job_postings left join (select companies.id, companies.name, photo from companies left join 
        companies_photos on companies.id = companies_photos.id) as tb on tb.id=job_postings.company_id where 
        category='Part-Time' and location like '%${this.req.body.location}%' and (name like '%${this.req.body.nameortitle}%' or title like '%${this.req.body.nameortitle}%')`,
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
              company_name: row.name,
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

  getlntinternshipsjobs() {
    // console.log(this.req.params.company_id);
    const data = {
      jobs: []
    };

    this.connection.query(
      `select * from job_postings left join (select companies.id, companies.name, photo from companies left join 
        companies_photos on companies.id = companies_photos.id) as tb on tb.id=job_postings.company_id where 
        category='Intern' and location like '%${this.req.body.location}%' and name like '%${this.req.body.nameortitle}%' or title like '%${this.req.body.nameortitle}%')`,
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
              company_name: row.name,
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

  getlntoncampusjobs() {
    // console.log(this.req.params.company_id);
    const data = {
      jobs: []
    };

    this.connection.query(
      `select * from job_postings left join (select companies.id, companies.name, photo from companies left join 
        companies_photos on companies.id = companies_photos.id) as tb on tb.id=job_postings.company_id where 
        category='On-Campus' and location like '%${this.req.body.location}%' and (name like '%${this.req.body.nameortitle}%' or title like '%${this.req.body.nameortitle}%')`,
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
              company_name: row.name,
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
  StudentsJobsList
};
