/* eslint-disable no-undef */
const chai = require("chai");
chai.use(require("chai-http"));
const { expect } = require("chai");
const app = require("../index.js");
// eslint-disable-next-line import/order
const agent = require("chai").request.agent(app);


// eslint-disable-next-line no-undef
describe("Handshake Application", () => {
  it("Get Skill", (done) => {
    agent
      .get("/student/skill/1")
      .then((res) => {
        // console.log(res.body);
        expect(res.body.skills[1]).to.equal("Python");
        done();
      })
      .catch(e => {
        done(e);
      });
  });

  it("Get email of first contact", (done) => {
    agent
      .get("/student/contactinfo/1")
      .then((res) => {
        // console.log(res.body);
        expect(res.body.email).to.equal('ronald.w@gmail.com');
        done();
      })
      .catch(e => {
        done(e);
      });
  });


  it("Get first student full name", (done) => {
    agent
      .post("/student/studentslist/all")
      .then((res) => {
        // console.log(res.body);
        expect(res.body.students[0].name).to.equal('Ronald  Weasley');
        done();
      })
      .catch(e => {
        done(e);
      });
  });

  it("Get event", (done) => {
    agent
      .get("/company/eventinfo/1")
      .then((res) => {
        // console.log(res.body);
        expect(res.body.title).to.equal('Python Development Conference');
        done();
      })
      .catch(e => {
        done(e);
      });
  });

  it("Get event", (done) => {
    agent
      .get("/company/jobs/1")
      .then((res) => {
        // console.log(res.body);
        expect(res.body.jobs[0].category).to.equal('Intern');
        done();
      })
      .catch(e => {
        done(e);
      });
  });
});
