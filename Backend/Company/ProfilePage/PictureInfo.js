const CompanyPictureInfo = class CompanyPictureInfo {
  constructor(connection, req, res) {
    this.connection = connection;
    this.req = req;
    this.res = res;
  }

  getpictureinfo() {
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

  postpictureinfo() {
    if (this.req.body.id !== undefined) {
      this.connection.query(
        `insert into companies_photos (id, photo) values ('${this.req.body.id}', '${this.req.body.photo}') ON DUPLICATE KEY UPDATE photo='${this.req.body.photo}'`,
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
        `delete from companies_photos where id='${this.req.body.id}'`,
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
  CompanyPictureInfo
};
