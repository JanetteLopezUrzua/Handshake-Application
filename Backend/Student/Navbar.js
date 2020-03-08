const Navbar = class Navbar {
  constructor(connection, req, res) {
    this.connection = connection;
    this.req = req;
    this.res = res;
  }

  navbar() {
    console.log("NAAAVBAAAR", this.req.params.id);
    if (this.req.params.id !== undefined) {
      this.connection.query(
        `select fname, lname, photo
        from (SELECT students.id, fname, lname, photo
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
              photo: ""
            };

            rows.forEach(row => {
              data = {
                fname: row.fname,
                lname: row.lname,
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
};


module.exports = {
  Navbar
};
