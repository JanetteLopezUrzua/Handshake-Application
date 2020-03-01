const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
// const cookieParser = require("cookie-parser");
const cors = require("cors");
const CryptoJS = require("crypto-js");
const conn = require("./db");
const { connection } = conn;
app.set("view engine", "ejs");

// use cors to allow cross origin resource sharing
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// use express session to maintain session data
app.use(
  session({
    secret: "cmpe273_lab1",
    resave: false,
    saveUninitialized: false,
    duration: 60 * 60 * 1000, // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000
  })
);


app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// Allow Access Control
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});


app.post("/student/signup", (req, res) => {
  console.log("student signup");
  connection.query("select email from students", (err, rows) => {
    if (err) throw err;
    let exists = false;

    rows.forEach(row => {
      if (row.email === req.body.email) exists = true;
    });

    if (exists === true) {
      res.writeHead(400, {
        "Content-Type": "text/plain"
      });
      res.end("Email already exists.");
    } else {
      // password is encrypted
      const ciphertext = CryptoJS.AES.encrypt(
        req.body.password,
        "secret key 123"
      );
      // console.log("encrypted text", ciphertext.toString());
      // var bytes  = CryptoJS.AES.decrypt(ciphertext.toString(), 'secret key 123');
      // var plaintext = bytes.toString(CryptoJS.enc.Utf8);
      // console.log("decrypted text", plaintext);
      connection.query(
        `insert into students (name, email, password, college) values ('${req.body.name}', '${req.body.email}',
        '${ciphertext}', '${req.body.college}')`,
        (err2) => {
          if (err2) res.end("Error. Could not sign up.");
          else {
            connection.query(`select id from students where email='${req.body.email}'`, (err3, rows1) => {
              if (err3) req.session.userId = undefined;
              else {
                rows1.forEach((row) => {
                  res.cookie('id', row.id, {
                    maxAge: 30 * 60 * 1000,
                    httpOnly: false,
                    path: "/"
                  });

                  req.session.userId = row.id;
                });

                res.writeHead(200, {
                  'Content-Type': 'application/json'
                });

                // console.log(req.session.userId);

                res.end(JSON.stringify(req.session.userId));
              }
            });
          }
        }
      );
    }
  });
});

app.post("/student/signin", (req, res) => {
  console.log("student sign in");
  connection.query(`select id, email, password from students where email='${req.body.email}'`, (err, rows) => {
    if (err) throw err;

    let password = "";
    let id = "";

    if (rows.length > 0) {
      rows.forEach(row => {
        password = row.password;
        id = row.id;
      });
    }


    const bytes = CryptoJS.AES.decrypt(password.toString(), 'secret key 123');
    const plaintext = bytes.toString(CryptoJS.enc.Utf8);

    // console.log(plaintext);
    // console.log(req.body.password);
    if (plaintext === req.body.password) {
      res.cookie('id', id, {
        maxAge: 30 * 60 * 1000,
        httpOnly: false,
        path: "/"
      });

      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });

      res.end("Successful Save");
    } else {
      res.writeHead(400, {
        "Content-Type": "text/plain"
      });
      res.end("Incorrect Credentials.");
    }
  });
});


app.post("/company/signup", (req, res) => {
  console.log("company sign up");
  connection.query("select email from companies", (err, rows) => {
    if (err) throw err;
    let exists = false;

    rows.forEach(row => {
      if (row.email === req.body.email) exists = true;
    });

    if (exists === true) {
      res.writeHead(400, {
        "Content-Type": "text/plain"
      });
      res.end("Email already exists.");
    } else {
      // password is encrypted
      const ciphertext = CryptoJS.AES.encrypt(
        req.body.password,
        "secret key 123"
      );
      // console.log("encrypted text", ciphertext.toString());
      // var bytes  = CryptoJS.AES.decrypt(ciphertext.toString(), 'secret key 123');
      // var plaintext = bytes.toString(CryptoJS.enc.Utf8);
      // console.log("decrypted text", plaintext);
      connection.query(
        `insert into companies (name, email, password, location) values ('${req.body.name}', '${req.body.email}',
        '${ciphertext}', '${req.body.location}')`,
        (err2) => {
          if (err2) res.end("Error. Could not sign up.");

          connection.query(`select id from companies where email='${req.body.email}'`, (err3, rows1) => {
            if (err3) req.session.userId = undefined;

            res.cookie("cookie", "admin", {
              maxAge: 30 * 60 * 1000,
              httpOnly: false,
              path: "/"
            });

            rows1.forEach((row) => {
              req.session.userId = row.id;
            });

            res.writeHead(200, {
              'Content-Type': 'application/json'
            });

            res.end(JSON.stringify(req.session.userId));
          });
        }
      );
    }
  });
});

// app.get("/id", (req, res) => {
//   console.log("Getting id");

//   if (req.body.id !== undefined) {
//     res.writeHead(200, {
//       'Content-Type': 'application/json'
//     });

//     // console.log(req.session.user);

//     res.end(JSON.stringify(req.body.id));
//   } else {
//     res.writeHead(400, {
//       'Content-Type': 'application/json'
//     });

//     // console.log(req.session.user);

//     res.end(undefined);
//   }
// });

app.get("/student/personalinfo/:id", (req, res) => {
  console.log("get personal info");
  // console.log(req.params.id);
  if (req.params.id !== undefined) {
    let data = {
      name: "",
      dob: "",
      city: "",
      state: "",
      country: "",
    };

    connection.query(`select name, dob, city, state, country from students where id='${req.params.id}'`, (err, rows) => {
      if (err) res.end("Can't get information");
      // console.log(rows);
      rows.forEach((row) => {
        data = {
          name: row.name,
          dob: row.dob,
          city: row.city,
          state: row.state,
          country: row.country,
        };
      });

      res.writeHead(200, {
        'Content-Type': 'application/json'
      });

      // console.log(data);

      res.end(JSON.stringify(data));
    });
  }
});

app.post("/student/personalinfo", (req, res) => {
  console.log("post personal info");
  // console.log(req.body.id);

  if (req.body.id !== undefined) {
    connection.query(`update students set name='${req.body.name}', dob='${req.body.dob}', city='${req.body.city}', state='${req.body.state}', country='${req.body.country}' where id='${req.body.id}'`, (err, result) => {
      if (err) res.end("Can't update information");

      // console.log(`Changed ${result.changedRows} row(s)`);

      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });

      res.end("Successful Save");
    });
  }
});

app.get("/student/contactinfo/:id", (req, res) => {
  console.log("get contact info");
  // console.log(req.params.id);
  if (req.params.id !== undefined) {
    let data = {
      email: "",
      phonenum: "",
    };

    connection.query(`select email, phonenumber from students where id='${req.params.id}'`, (err, rows) => {
      if (err) res.end("Can't get information");
      // console.log(rows);
      rows.forEach((row) => {
        data = {
          email: row.email,
          phonenum: row.phonenumber,
        };
      });

      res.writeHead(200, {
        'Content-Type': 'application/json'
      });

      // console.log(data);

      res.end(JSON.stringify(data));
    });
  }
});

app.post("/student/contactinfo", (req, res) => {
  console.log("post contact info");
  // console.log(req.body.id);

  if (req.body.id !== undefined) {
    connection.query(`update students set email='${req.body.email}', phonenumber='${req.body.phonenum}' where id='${req.body.id}'`, (err, result) => {
      if (err) res.end("Can't update information");

      // console.log(`Changed ${result.changedRows} row(s)`);

      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });

      res.end("Successful Save");
    });
  }
});

app.get("/student/careerobjective/:id", (req, res) => {
  console.log("get career objective");
  // console.log(`id:${req.params.id}`);
  if (req.params.id !== undefined) {
    connection.query(`select careerobjective from career_objective where id='${req.params.id}'`, (err, rows) => {
      if (err) res.end("Can't get information");
      // console.log(rows);

      let data = {
        objective: "",
      };

      if (rows !== undefined) {
        rows.forEach((row) => {
          data = {
            objective: row.careerobjective,
          };
        });

        res.writeHead(200, {
          'Content-Type': 'application/json'
        });

        // console.log(data);

        res.end(JSON.stringify(data));
      }
    });
  }
});

app.post("/student/careerobjective", (req, res) => {
  console.log("post career objective");
  // console.log(req.body.id);

  if (req.body.id !== undefined) {
    connection.query(`insert into career_objective (id, careerobjective) values ('${req.body.id}', '${req.body.objective}') ON DUPLICATE KEY UPDATE careerobjective='${req.body.objective}'`, (err, result) => {
      if (err) res.end("Can't update information");

      // console.log('Last insert ID:', result.insertId);

      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });

      res.end("Successful Save");
    });
  }
});

app.get("/student/skill/:id", (req, res) => {
  console.log("get skill");
  // console.log(req.params.id);
  if (req.params.id !== undefined) {
    const data = {
      skills: [],
    };

    connection.query(`select skill from skills where id='${req.params.id}'`, (err, rows) => {
      if (err) res.end("Can't get information");
      // console.log(rows);

      if (rows !== undefined) {
        rows.forEach((row) => {
          data.skills.push(row.skill);
        });

        res.writeHead(200, {
          'Content-Type': 'application/json'
        });

        // console.log(data);

        res.end(JSON.stringify(data));
      }
    });
  }
});

app.post("/student/skill", (req, res) => {
  console.log("post skill");
  if (req.body.id !== undefined) {
    connection.query(`select skill from skills where id='${req.body.id}' and skill='${req.body.skill}'`, (err, rows) => {
      if (err) res.end("Can't get information");
      console.log(rows);
      if (rows.length > 0 || rows === undefined) {
        res.writeHead(400, {
          'Content-Type': 'text/plain'
        });

        res.end("Skill is already added.");
      } else {
        connection.query(`insert into skills (id, skill) values ('${req.body.id}', '${req.body.skill}')`, (err2, result) => {
          if (err2) res.end("Can't insert information");

          console.log('Last insert ID:', result.insertId);

          res.writeHead(200, {
            'Content-Type': 'text/plain'
          });

          res.end("Successful Save");
        });
      }
    });
  }
});

app.delete("/student/skill/delete", (req, res) => {
  console.log("delete skill");
  console.log(req.body.id);
  console.log(req.body.skill);

  if (req.body.id !== undefined) {
    connection.query(`delete from skills where id='${req.body.id}' and skill='${req.body.skill}'`, (err, result) => {
      if (err) res.end("Can't delete information");

      console.log(`Deleted ${result.affectedRows} row(s)`);

      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });

      res.end("Successful Delete");
    });
  }
});

app.get("/student/pictureinfo/:id", (req, res) => {
  console.log("get picture info");
  // console.log(req.params.id);
  if (req.params.id !== undefined) {
    let data = {
      name: "",
      college: "",
      photo: "",
    };

    connection.query(`select name, college from students where id='${req.params.id}'`, (err, rows) => {
      if (err) res.end("Can't get information");
      // console.log(rows);
      rows.forEach((row) => {
        data = {
          name: row.name,
          college: row.college,
        };
      });
    });

    connection.query(`select photo students_photos where id='${req.params.id}'`, (err, rows) => {
      if (err) res.end("Can't get information");

      if (rows !== undefined) {
        rows.forEach((row) => {
          data = {
            photo: row.photo,
          };
        });
      }
    });

    res.writeHead(200, {
      'Content-Type': 'application/json'
    });

    // console.log(data);

    res.end(JSON.stringify(data));
  }
});

app.post("/student/pictureinfo", (req, res) => {
  console.log("post picture ");
  // console.log(req.body.id);

  if (req.body.id !== undefined) {
    connection.query(`insert into students_photos (id, photo) values ('${req.body.id}', '${req.body.photo}') ON DUPLICATE KEY UPDATE photo='${req.body.photo}'`, (err, result) => {
      if (err) res.end("Can't update information");

      // console.log('Last insert ID:', result.insertId);

      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });

      res.end("Successful Post");
    });
  }
});

app.delete("/student/pictureinfo/delete", (req, res) => {
  console.log("delete picture");

  if (req.body.id !== undefined) {
    connection.query(`delete from students_photos where id='${req.body.id}'`, (err, result) => {
      if (err) res.end("Can't delete information");

      console.log(`Deleted ${result.affectedRows} row(s)`);

      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });

      res.end("Successful Delete");
    });
  }
});

// start server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");

// connection.end();
