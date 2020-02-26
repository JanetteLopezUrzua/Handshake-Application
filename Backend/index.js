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

app.use(bodyParser.json());

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
      console.log("encrypted text", ciphertext.toString());
      // var bytes  = CryptoJS.AES.decrypt(ciphertext.toString(), 'secret key 123');
      // var plaintext = bytes.toString(CryptoJS.enc.Utf8);
      // console.log("decrypted text", plaintext);
      connection.query(
        `insert into students (name, email, password, college) values ('${req.body.name}', '${req.body.email}',
        '${ciphertext}', '${req.body.college}')`,
        () => {
          if (err) res.end("Error. Could not sign up.");

          res.cookie("cookie", "admin", {
            maxAge: 900000,
            httpOnly: false,
            path: "/"
          });
          req.session.user = req.body;
          res.writeHead(200, {
            "Content-Type": "text/plain"
          });

          res.end("Successful Sign Up");
        }
      );
    }
  });
});


app.post("/company/signup", (req, res) => {
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
      console.log("encrypted text", ciphertext.toString());
      // var bytes  = CryptoJS.AES.decrypt(ciphertext.toString(), 'secret key 123');
      // var plaintext = bytes.toString(CryptoJS.enc.Utf8);
      // console.log("decrypted text", plaintext);
      connection.query(
        `insert into companies (name, email, password, location) values ('${req.body.name}', '${req.body.email}',
        '${ciphertext}', '${req.body.location}')`,
        () => {
          if (err) res.end("Error. Could not sign up.");

          res.cookie("cookie", "admin", {
            maxAge: 900000,
            httpOnly: false,
            path: "/"
          });
          req.session.user = req.body;
          res.writeHead(200, {
            "Content-Type": "text/plain"
          });

          res.end("Successful Sign Up");
        }
      );
    }
  });
});

// start server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");

// connection.end();
