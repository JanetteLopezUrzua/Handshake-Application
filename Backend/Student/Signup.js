const CryptoJS = require("crypto-js");

const StudentSignup = class StudentSignup {
  constructor(connection, req, res) {
    this.connection = connection;
    this.req = req;
    this.res = res;
  }

  signup() {
    this.connection.query("select email from students", (err, rows) => {
      if (err) throw err;
      let exists = false;

      rows.forEach(row => {
        if (row.email === this.req.body.email) exists = true;
      });

      if (exists === true) {
        this.res.writeHead(400, {
          "Content-Type": "text/plain"
        });
        this.res.end("Email already exists.");
      } else {
        // password is encrypted
        const ciphertext = CryptoJS.AES.encrypt(
          this.req.body.password,
          "secret key 123"
        );
          // console.log("encrypted text", ciphertext.toString());
          // var bytes  = CryptoJS.AES.decrypt(ciphertext.toString(), 'secret key 123');
          // var plaintext = bytes.toString(CryptoJS.enc.Utf8);
          // console.log("decrypted text", plaintext);
        this.connection.query(
          `insert into students (fname, lname, email, password, college) values ('${this.req.body.fname}', '${this.req.body.lname}', '${this.req.body.email}',
            '${ciphertext}', '${this.req.body.college}')`,
          err2 => {
            if (err2) this.res.end("Error. Could not sign up.");
            else {
              this.connection.query(
                `select id from students where email='${this.req.body.email}'`,
                (err3, rows1) => {
                  if (err3) this.req.session.userId = undefined;
                  else {
                    rows1.forEach(row => {
                      this.res.cookie("id", row.id, {
                        maxAge: 30 * 60 * 1000,
                        httpOnly: false,
                        path: "/"
                      });

                      this.res.cookie("user", "student", {
                        maxAge: 30 * 60 * 1000,
                        httpOnly: false,
                        path: "/"
                      });

                      this.req.session.userId = row.id;
                    });

                    this.res.writeHead(200, {
                      "Content-Type": "application/json"
                    });

                    // console.log(req.session.userId);

                    this.res.end(JSON.stringify(this.req.session.userId));
                  }
                }
              );
            }
          }
        );
      }
    });
  }
};


module.exports = {
  StudentSignup
};
