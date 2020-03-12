const Event = class Event {
  constructor(connection, req, res) {
    this.connection = connection;
    this.req = req;
    this.res = res;
  }

  geteventbannerphoto() {
    // console.log(this.req.params.event_id);
    if (this.req.params.event_id !== undefined) {
      this.connection.query(
        `select company_id, bannerphoto from company_events where event_id='${this.req.params.event_id}'`,
        (err, rows) => {
          if (err) this.res.end("Can't get information");
          // console.log(rows);

          if (rows !== undefined) {
            let data = {
              photo: "",
              company_id: "",
            };

            rows.forEach(row => {
              data = {
                photo: row.bannerphoto,
                company_id: row.company_id,
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

  posteventbannerphoto() {
    if (this.req.body.event_id !== undefined) {
      this.connection.query(
        `update company_events set bannerphoto='${this.req.body.photo}' where event_id='${this.req.body.event_id}'`,
        (err) => {
          if (err) this.res.end("Can't update information");

          // console.log('Last insert ID:', result.insertId);

          this.res.writeHead(200, {
            "Content-Type": "text/plain",
          });

          this.res.end("Successful Post");
        },
      );
    }
  }

  deleteeventbannerphoto() {
    if (this.req.body.event_id !== undefined) {
      this.connection.query(
        `update company_events set bannerphoto="" where event_id='${this.req.body.event_id}'`,
        (err) => {
          if (err) this.res.end("Can't delete information");

          // console.log(`Deleted ${result.affectedRows} row(s)`);

          this.res.writeHead(200, {
            "Content-Type": "text/plain",
          });

          this.res.end("Successful Delete");
        },
      );
    }
  }

  geteventinfo() {
    //  console.log(this.req.params.event_id);
    if (this.req.params.event_id !== undefined) {
      this.connection.query(
        `select * from company_events left join (select companies.id, name, photo from companies left join companies_photos on 
          companies.id=companies_photos.id) as tb on company_events.company_id=tb.id where event_id='${this.req.params.event_id}'`,

        (err, rows) => {
          if (err) this.res.end("Can't get information");
          // console.log(rows);

          if (rows !== undefined) {
            let data = {
              title: "",
              dayofweek: "",
              month: "",
              day: "",
              year: "",
              starttime: "",
              startdaytime: "",
              endtime: "",
              enddaytime: "",
              timezone: "",
              location: "",
              eligibility: "",
              name: "",
              photo: "",
              company_id: "",
            };

            rows.forEach(row => {
              data = {
                title: row.title,
                dayofweek: row.dayofweek,
                month: row.month,
                day: row.day,
                year: row.year,
                starttime: row.starttime,
                startdaytime: row.startdaytime,
                endtime: row.endtime,
                enddaytime: row.enddaytime,
                timezone: row.timezone,
                location: row.location,
                eligibility: row.eligibility,
                name: row.name,
                photo: row.photo,
                company_id: row.company_id,
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

  posteventinfo() {
    if (this.req.body.event_id !== undefined) {
      this.connection.query(
        `update company_events set title='${this.req.body.title}', dayofweek='${this.req.body.dayofweek}', month='${this.req.body.month}', 
        day='${this.req.body.day}', year='${this.req.body.year}', starttime='${this.req.body.starttime}', startdaytime='${this.req.body.startdaytime}',
         endtime='${this.req.body.endtime}', enddaytime='${this.req.body.enddaytime}', timezone='${this.req.body.timezone}', location='${this.req.body.location}',
        eligibility='${this.req.body.eligibility}' where event_id='${this.req.body.event_id}'`,
        (err) => {
          if (err) this.res.end("Can't update information");

          // console.log('Last insert ID:', result.insertId);

          this.res.writeHead(200, {
            "Content-Type": "text/plain",
          });

          this.res.end("Successful Post");
        },
      );
    }
  }

  geteventdescription() {
    if (this.req.params.event_id !== undefined) {
      this.connection.query(
        `select description, company_id from company_events where event_id='${this.req.params.event_id}'`,
        (err, rows) => {
          if (err) this.res.end("Can't get information");
          // console.log(rows);

          if (rows !== undefined) {
            let data = {
              description: "",
              company_id: "",
            };

            rows.forEach(row => {
              data = {
                description: row.description,
                company_id: row.company_id,
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

  posteventdescription() {
    if (this.req.body.event_id !== undefined) {
      this.connection.query(
        `update company_events set description='${this.req.body.description}' where event_id='${this.req.body.event_id}'`,
        (err) => {
          if (err) this.res.end("Can't update information");

          // console.log('Last insert ID:', result.insertId);

          this.res.writeHead(200, {
            "Content-Type": "text/plain",
          });

          this.res.end("Successful Post");
        },
      );
    }
  }

  deleteevent() {
    if (this.req.body.event_id !== undefined) {
      this.connection.query(
        `delete from company_events where event_id='${this.req.body.event_id}'`,
        (err) => {
          if (err) this.res.end("Can't delete information");

          // console.log(`Deleted ${result.affectedRows} row(s)`);

          this.res.writeHead(200, {
            "Content-Type": "text/plain",
          });

          this.res.end("Successful Delete");
        },
      );
    }
  }

  getcompanyid() {
    // console.log(this.req.params.event_id);
    if (this.req.params.event_id !== undefined) {
      this.connection.query(
        `select company_id from company_events where event_id='${this.req.params.event_id}'`,
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
              "Content-Type": "application/json",
            });

            // console.log(data);

            this.res.end(JSON.stringify(data));
          }
        },
      );
    }
  }
};

module.exports = {
  Event,
};
