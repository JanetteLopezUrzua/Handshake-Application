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

            console.log(data);

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
      this.connection.query(`select * from RSVP where event_id='${this.req.body.event_id}' and student_id='${this.req.body.student_id}'`,
        (err4, rows4) => {
          if (err4) this.res.end("Can't get information");
          console.log("LEENGTH", rows4.length);
          if (rows4 === undefined || rows4.lenght === '0') {
            this.connection.query(`select elegibility from company_event where event_id='${this.req.body.event_id}'`,
              (err, rows) => {
                if (err) this.res.end("Can't get information");
                else {
                  this.connection.query(`select major from schools where id='${this.req.body.student_id}' and primaryschool="true"`,
                    (err2, rows2) => {
                      if (err2) this.res.end("Can't get information");

                      let eligibility = "";
                      rows.forEach(row => {
                        eligibility = row.eligibility;
                      });


                      let major = "";
                      rows2.forEach(row2 => {
                        major = row2.major;
                      });

                      if (eligibility === major || eligibility === "all") {
                        this.connection.query(`insert into RSVP values ('${this.req.body.event_id}', '${this.req.body.student_id}')`,
                          (err3) => {
                            if (err3) this.res.end("Can't insert information");
                            // console.log('Last insert ID:', result.insertId);

                            this.res.writeHead(200, {
                              "Content-Type": "text/plain"
                            });

                            this.res.end("Successful Post");
                          });
                      } else {
                        this.res.writeHead(400, {
                          "Content-Type": "text/plain"
                        });

                        this.res.end("Not Eligible For This Event");
                      }
                    });
                }
              });
          } else {
            this.res.writeHead(400, {
              "Content-Type": "text/plain"
            });

            this.res.end("Your Are Already Registered In This Event");
          }
        });
    }
  }
};

module.exports = {
  RSVP
};
