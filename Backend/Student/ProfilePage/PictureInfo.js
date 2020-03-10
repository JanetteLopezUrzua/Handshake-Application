const StudentPictureInfo = class StudentPictureInfo {
  constructor(connection, req, res) {
    this.connection = connection;
    this.req = req;
    this.res = res;
  }

  getpictureinfo() {
    console.log("ddddddddddd", this.req.params.id);
    if (this.req.params.id !== undefined) {
      this.connection.query(
        `select fname, lname, college, photo
            from (SELECT students.id, fname, lname, college, photo
            FROM students
            LEFT JOIN students_photos ON students.id=students_photos.id 
            where students.id=${this.req.params.id}) as tb`,
        (err, rows) => {
          if (err) this.res.end("Can't get information");
          // console.log(rows);

          if (rows !== undefined) {
            let data = {
              fname: "",
              lname: "",
              college: "",
              photo: ""
            };

            rows.forEach(row => {
              data = {
                fname: row.fname,
                lname: row.lname,
                college: row.college,
                photo: row.photo
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

  postpictureinfo() {
    if (this.req.body.id !== undefined) {
      this.connection.query(
        `insert into students_photos (id, photo) values ('${this.req.body.id}', '${this.req.body.photo}') ON DUPLICATE KEY UPDATE photo='${this.req.body.photo}'`,
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


  deletepictureinfo() {
    if (this.req.body.id !== undefined) {
      this.connection.query(
        `delete from students_photos where id='${this.req.body.id}'`,
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
  StudentPictureInfo
};
