const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
// const cookieParser = require("cookie-parser");
const cors = require("cors");
const conn = require("./db");
const { connection } = conn;

const StudentSignin = require("./Student/Signin");
const StudentSignup = require("./Student/Signup");
const StudentNavbar = require("./Student/Navbar");
const StudentPersonalInfo = require("./Student/ProfilePage/PersonalInfo");
const StudentContactInfo = require("./Student/ProfilePage/ContactInfo");
const CareerObjective = require("./Student/ProfilePage/CareerObjective");
const Skills = require("./Student/ProfilePage/Skills");
const StudentPictureInfo = require("./Student/ProfilePage/PictureInfo");
const EducationInfo = require("./Student/ProfilePage/EducationInfo");
const WorkInfo = require("./Student/ProfilePage/WorkInfo");
const CompanySignup = require("./Company/Signup");
const CompanySignin = require("./Company/Signin");
const CompanyNavbar = require("./Company/Navbar");
const CompanyPictureInfo = require("./Company/ProfilePage/PictureInfo");
const CompanyPersonalInfo = require("./Company/ProfilePage/PersonalInfo");
const CompanyContactInfo = require("./Company/ProfilePage/ContactInfo");
const StudentStudentsList = require("./Student/StudentsList/StudentsList");
const CompanyStudentsList = require("./Company/StudentsList/StudentsList");
const CompanyNewEvent = require("./Company/Events/NewEvent");
const EventsList = require("./Company/Events/EventsList");

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

app.use(bodyParser.json({ limit: "10mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

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

/* ***************** STUDENT APIS ****************************** */

app.post("/student/signup", (req, res) => {
  console.log("student signup");
  const info = new StudentSignup.StudentSignup(connection, req, res);
  info.signup();
});

app.post("/student/signin", (req, res) => {
  console.log("student sign in");
  const info = new StudentSignin.StudentSignin(connection, req, res);
  info.signin();
});

app.get("/student/navbar/:id", (req, res) => {
  console.log("get navbar info");
  // console.log(req.params.id);
  const info = new StudentNavbar.Navbar(connection, req, res);
  info.navbar();
});

app.get("/student/personalinfo/:id", (req, res) => {
  console.log("get personal info");
  // console.log(req.params.id);
  const info = new StudentPersonalInfo.StudentPersonalInfo(
    connection,
    req,
    res
  );
  info.getpersonalinfo();
});

app.post("/student/personalinfo", (req, res) => {
  console.log("post personal info");
  // console.log(req.body.id);
  const info = new StudentPersonalInfo.StudentPersonalInfo(
    connection,
    req,
    res
  );
  info.postpersonalinfo();
});

app.get("/student/contactinfo/:id", (req, res) => {
  console.log("get contact info");
  // console.log(req.params.id);
  const info = new StudentContactInfo.StudentContactInfo(connection, req, res);
  info.getcontactinfo();
});

app.post("/student/contactinfo", (req, res) => {
  console.log("post contact info");
  // console.log(req.body.id);
  const info = new StudentContactInfo.StudentContactInfo(connection, req, res);
  info.postcontactinfo();
});

app.get("/student/careerobjective/:id", (req, res) => {
  console.log("get career objective");
  // console.log(`id:${req.params.id}`);
  const info = new CareerObjective.CareerObjective(connection, req, res);
  info.getcareerobjective();
});

app.post("/student/careerobjective", (req, res) => {
  console.log("post career objective");
  // console.log(req.body.id);
  const info = new CareerObjective.CareerObjective(connection, req, res);
  info.postcareerobjective();
});

app.get("/student/skill/:id", (req, res) => {
  console.log("get skill");
  // console.log(req.params.id);
  const info = new Skills.Skills(connection, req, res);
  info.getskills();
});

app.post("/student/skill", (req, res) => {
  console.log("post skill");
  const info = new Skills.Skills(connection, req, res);
  info.postskills();
});

app.delete("/student/skill/delete", (req, res) => {
  console.log("delete skill");
  // console.log(req.body.id);
  // console.log(req.body.skill);
  const info = new Skills.Skills(connection, req, res);
  info.deleteskills();
});

app.get("/student/pictureinfo/:id", (req, res) => {
  console.log("get picture info");
  // console.log(req.params.id);
  const info = new StudentPictureInfo.StudentPictureInfo(connection, req, res);
  info.getpictureinfo();
});

app.post("/student/pictureinfo", (req, res) => {
  console.log("post picture ");
  // console.log(req.body.id);
  const info = new StudentPictureInfo.StudentPictureInfo(connection, req, res);
  info.postpictureinfo();
});

app.delete("/student/pictureinfo/delete", (req, res) => {
  console.log("delete picture");
  const info = new StudentPictureInfo.StudentPictureInfo(connection, req, res);
  info.deletepictureinfo();
});

app.get("/student/educationinfo/:id", (req, res) => {
  console.log("get education info");
  // console.log(req.params.id);
  const info = new EducationInfo.EducationInfo(connection, req, res);
  info.geteducationinfo();
});

app.post("/student/educationinfo/newform", (req, res) => {
  console.log("post education info - new form");
  // console.log(req.body.location);
  const info = new EducationInfo.EducationInfo(connection, req, res);
  info.posteducationinfonewform();
});

app.post("/student/educationinfo", (req, res) => {
  console.log("post education info");
  // console.log(req.body.location);
  const info = new EducationInfo.EducationInfo(connection, req, res);
  info.posteducationinfo();
});

app.delete("/student/educationinfo/delete", (req, res) => {
  console.log("delete education info");
  // console.log(req.body.id);
  // console.log(req.body.schoolname);
  const info = new EducationInfo.EducationInfo(connection, req, res);
  info.deleteeducationinfo();
});

app.get("/student/workinfo/:id", (req, res) => {
  console.log("get work info");
  // console.log(req.params.id);
  const info = new WorkInfo.WorkInfo(connection, req, res);
  info.getworkinfo();
});

app.post("/student/workinfo/newform", (req, res) => {
  console.log("post work info - new form");
  // console.log(req.body.location);
  const info = new WorkInfo.WorkInfo(connection, req, res);
  info.postworkinfonewform();
});

app.post("/student/workinfo", (req, res) => {
  console.log("post work info");
  // console.log(req.body.location);
  const info = new WorkInfo.WorkInfo(connection, req, res);
  info.postworkinfo();
});

app.delete("/student/workinfo/delete", (req, res) => {
  console.log("delete work info");
  // console.log(req.body.id);
  // console.log(req.body.schoolname);
  const info = new WorkInfo.WorkInfo(connection, req, res);
  info.deleteworkinfo();
});

/** ************ COMPANY APIS ********************* */

app.post("/company/signup", (req, res) => {
  console.log("company signup");
  const info = new CompanySignup.CompanySignup(connection, req, res);
  info.signup();
});

app.post("/company/signin", (req, res) => {
  console.log("company sign in");
  const info = new CompanySignin.CompanySignin(connection, req, res);
  info.signin();
});

app.get("/company/navbar/:id", (req, res) => {
  console.log("get company navbar info");
  // console.log(req.params.id);
  const info = new CompanyNavbar.Navbar(connection, req, res);
  info.navbar();
});

app.get("/company/pictureinfo/:id", (req, res) => {
  console.log("get picture info - company");
  // console.log(req.params.id);
  const info = new CompanyPictureInfo.CompanyPictureInfo(connection, req, res);
  info.getpictureinfo();
});

app.post("/company/pictureinfo", (req, res) => {
  console.log("post picture - company ");
  // console.log(req.body.id);
  const info = new CompanyPictureInfo.CompanyPictureInfo(connection, req, res);
  info.postpictureinfo();
});

app.delete("/company/pictureinfo/delete", (req, res) => {
  console.log("delete picture");
  const info = new CompanyPictureInfo.CompanyPictureInfo(connection, req, res);
  info.deletepictureinfo();
});

app.get("/company/personalinfo/:id", (req, res) => {
  console.log("get personal info - company");
  // console.log(req.params.id);
  const info = new CompanyPersonalInfo.CompanyPersonalInfo(
    connection,
    req,
    res
  );
  info.getpersonalinfo();
});

app.post("/company/personalinfo", (req, res) => {
  console.log("post personal info - company");
  // console.log(req.body.id);
  const info = new CompanyPersonalInfo.CompanyPersonalInfo(
    connection,
    req,
    res
  );
  info.postpersonalinfo();
});

app.post("/company/personalinfoname", (req, res) => {
  console.log("post personal info - company");
  // console.log(req.body.id);
  const info = new CompanyPersonalInfo.CompanyPersonalInfo(
    connection,
    req,
    res
  );
  info.postname();
});

app.get("/company/contactinfo/:id", (req, res) => {
  console.log("get contact info - company");
  // console.log(req.params.id);
  const info = new CompanyContactInfo.CompanyContactInfo(connection, req, res);
  info.getcontactinfo();
});

app.post("/company/contactinfo", (req, res) => {
  console.log("post contact info - company");
  // console.log(req.body.id);
  const info = new CompanyContactInfo.CompanyContactInfo(connection, req, res);
  info.postcontactinfo();
});

/** ******** Student - STUDENTS LIST ************ */
app.post("/student/studentslist/all", (req, res) => {
  console.log("get all students");
  // console.log(req.params.id);
  const info = new StudentStudentsList.StudentStudentsList(
    connection,
    req,
    res
  );
  info.postall();
});

app.post("/student/studentslist/name", (req, res) => {
  console.log("get students by name");
  // console.log(req.params.id);
  const info = new StudentStudentsList.StudentStudentsList(
    connection,
    req,
    res
  );
  info.postname();
});

app.post("/student/studentslist/college", (req, res) => {
  console.log("get students by name");
  // console.log(req.params.id);
  const info = new StudentStudentsList.StudentStudentsList(
    connection,
    req,
    res
  );
  info.postcollege();
});

app.post("/student/studentslist/major", (req, res) => {
  console.log("get students by name");
  // console.log(req.params.id);
  const info = new StudentStudentsList.StudentStudentsList(
    connection,
    req,
    res
  );
  info.postmajor();
});

app.post("/student/studentslist/nameandcollege", (req, res) => {
  console.log("get students by name");
  // console.log(req.params.id);
  const info = new StudentStudentsList.StudentStudentsList(
    connection,
    req,
    res
  );
  info.postnameandcollege();
});

app.post("/student/studentslist/nameandmajor", (req, res) => {
  console.log("get students by name");
  // console.log(req.params.id);
  const info = new StudentStudentsList.StudentStudentsList(
    connection,
    req,
    res
  );
  info.postnameandmajor();
});

app.post("/student/studentslist/collegeandmajor", (req, res) => {
  console.log("get students by name");
  // console.log(req.params.id);
  const info = new StudentStudentsList.StudentStudentsList(
    connection,
    req,
    res
  );
  info.postcollegeandmajor();
});

app.post("/student/studentslist/nameandcollegeandmajor", (req, res) => {
  console.log("get students by name");
  // console.log(req.params.id);
  const info = new StudentStudentsList.StudentStudentsList(
    connection,
    req,
    res
  );
  info.postnameandcollegeandmajor();
});


/** ******** Company - STUDENTS LIST ************ */

app.post("/company/studentslist/all", (req, res) => {
  console.log("get all students - company");
  // console.log(req.params.id);
  const info = new CompanyStudentsList.CompanyStudentsList(
    connection,
    req,
    res
  );
  info.postall();
});

app.post("/company/studentslist/name", (req, res) => {
  console.log("get students by name - company");
  // console.log(req.params.id);
  const info = new CompanyStudentsList.CompanyStudentsList(
    connection,
    req,
    res
  );
  info.postname();
});

app.post("/company/studentslist/college", (req, res) => {
  console.log("get students by college - company");
  // console.log(req.params.id);
  const info = new CompanyStudentsList.CompanyStudentsList(
    connection,
    req,
    res
  );
  info.postcollege();
});

app.post("/company/studentslist/skill", (req, res) => {
  console.log("get students by skill - company");
  // console.log(req.params.id);
  const info = new CompanyStudentsList.CompanyStudentsList(
    connection,
    req,
    res
  );
  info.postskill();
});

app.post("/company/studentslist/nameandcollege", (req, res) => {
  console.log("get students by name and college - company");
  // console.log(req.params.id);
  const info = new CompanyStudentsList.CompanyStudentsList(
    connection,
    req,
    res
  );
  info.postnameandcollege();
});

app.post("/company/studentslist/nameandskill", (req, res) => {
  console.log("get students by name and skill - company");
  // console.log(req.params.id);
  const info = new CompanyStudentsList.CompanyStudentsList(
    connection,
    req,
    res
  );
  info.postnameandskill();
});

app.post("/company/studentslist/collegeandskill", (req, res) => {
  console.log("get students by college and skill - company");
  // console.log(req.params.id);
  const info = new CompanyStudentsList.CompanyStudentsList(
    connection,
    req,
    res
  );
  info.postcollegeandskill();
});

app.post("/company/studentslist/nameandcollegeandskill", (req, res) => {
  console.log("get students by name and college and skill - company");
  // console.log(req.params.id);
  const info = new CompanyStudentsList.CompanyStudentsList(
    connection,
    req,
    res
  );
  info.postnameandcollegeandskill();
});

/* *********Company Events ***************** */
app.post("/company/newevent", (req, res) => {
  console.log("post new event - company");
  const info = new CompanyNewEvent.CompanyNewEvent(connection, req, res);
  info.postnewevent();
});

app.get("/company/events/:company_id", (req, res) => {
  console.log("get events info");
  // console.log(req.params.id);
  const info = new EventsList.EventsList(connection, req, res);
  info.geteventslist();
});

// start server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");

// connection.end();
