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
};

module.exports = {
  RSVP
};
