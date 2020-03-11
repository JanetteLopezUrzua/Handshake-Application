const RSVP = class RSVP {
  constructor(connection, req, res) {
    this.connection = connection;
    this.req = req;
    this.res = res;
  }

  getRSVP() {
    if (this.req.params.event_id !== undefined) {
      this.connection.query(
        `select student_id, fname, lname, photo from 
        (select * from (select student_id from RSVP where event_id='${this.req.params.event_id}') as tb left join students on students.id=tb.student_id) as tb2 
        left join students_photos on students_photos.id=tb2.student_id`,
        (err, rows) => {
          if (err) this.res.end("Can't get information");
          // console.log(rows);

          const data = {
            students: [],
          };

          if (rows !== undefined) {
            rows.forEach(row => {
              data.students.push({
                student_id: row.student_id,
                fname: row.fname,
                lname: row.lname,
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
  }

  getstudentRSVPEvents() {
    const data = {
      events: []
    };

    this.connection.query(
      `select * from (select * from RSVP where student_id=${this.req.params.student_id}) as tb3 join (select * from company_events left join (select companies.id, name, photo from companies left join companies_photos on 
        companies.id=companies_photos.id) as tb on company_events.company_id=tb.id) as tb4 on tb3.event_id=tb4.event_id order by year asc, month asc, day asc`,
      (err, rows) => {
        if (err) this.res.end("Can't get information");
        // console.log(rows);

        if (rows !== undefined) {
          rows.forEach(row => {
            data.events.push({
              event_id: row.event_id,
              company_id: row.company_id,
              bannerphoto: row.bannerphoto,
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
              description: row.description,
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

  postRSVP() {
    if (this.req.body.event_id !== undefined) {
      this.connection.query(`insert into RSVP (event_id, student_id) select '${this.req.body.event_id}', '${this.req.body.student_id}' where 
      '${this.req.body.event_id}' in (select event_id from company_events join (select * from (select students.id, major from students join 
        schools where students.id=schools.id and primaryschool="true") as tb where tb.id='${this.req.body.student_id}') as tb2 where
         eligibility=major or eligibility="all" or major="") and not exists (select event_id, student_id from RSVP where 
          event_id='${this.req.body.event_id}' and student_id='${this.req.body.student_id}')`,
      (err, result) => {
        if (err) this.res.end("Can't get information");
        // console.log('Last insert ID:', result.insertId);
        // console.log('Afected Rows:', result.affectedRows);

        if (result.affectedRows > 0) {
          this.res.writeHead(200, {
            "Content-Type": "text/plain"
          });

          this.res.end("Successful Post");
        } else {
          this.res.writeHead(400, {
            "Content-Type": "text/plain"
          });

          this.res.end("Not Eligible For This Event");
        }
      });
    }
  }

  deleteRSVP() {
    if (this.req.body.event_id !== undefined) {
      this.connection.query(
        `delete from RSVP where event_id='${this.req.body.event_id}' && student_id='${this.req.body.student_id}'`,
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
  RSVP
};
