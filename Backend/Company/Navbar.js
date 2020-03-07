const Navbar = class Navbar {
  constructor(connection, req, res) {
    this.connection = connection;
    this.req = req;
    this.res = res;
  }

  navbar() {
    if (this.req.params.id !== undefined) {
      // console.log("Inside");
      this.connection.query(
        `select name, photo
        from (SELECT companies.id, name, photo
        FROM companies
        LEFT JOIN companies_photos ON companies.id=companies_photos.id 
        where companies.id=${this.req.params.id}) as tb`,
        (err, rows) => {
          if (err) this.res.end("Can't get information");
          // console.log(rows);

          if (rows !== undefined) {
            let data = {
              name: "",
              photo: ""
            };

            rows.forEach(row => {
              data = {
                name: row.name,
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
