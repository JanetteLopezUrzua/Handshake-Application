const CompanyNewEvent = class CompanyNewEvent {
  constructor(connection, req, res) {
    this.connection = connection;
    this.req = req;
    this.res = res;
  }

  postnewevent() {
    if (this.req.body.company_id !== undefined) {
      this.connection.query(
        `insert into company_events (company_id, bannerphoto, title, dayofweek, month, day, year, starttime, startdaytime, endtime, enddaytime, 
            timezone, location, eligibility, description) values ('${this.req.body.company_id}', '${this.req.body.bannerphoto}',
            '${this.req.body.title}', '${this.req.body.dayofweek}', '${this.req.body.month}', '${this.req.body.day}',
            '${this.req.body.year}', '${this.req.body.starttime}', '${this.req.body.startdaytime}', '${this.req.body.endtime}',
            '${this.req.body.enddaytime}', '${this.req.body.timezone}', '${this.req.body.location}', '${this.req.body.eligibility}',
            '${this.req.body.description}')`,
        (err) => {
          if (err) this.res.end(`Can't insert information. Error: ${err}`);
          else {
          // console.log('Last insert ID:', result.insertId);

            this.res.writeHead(200, {
              "Content-Type": "text/plain",
            });

            this.res.end("Successful Save");
          }
        },
      );
    }
  }
};

module.exports = {
  CompanyNewEvent,
};
