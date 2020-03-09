const EventsList = class EventsList {
  constructor(connection, req, res) {
    this.connection = connection;
    this.req = req;
    this.res = res;
  }

  geteventslist() {
    if (this.req.params.company_id !== undefined) {
      const data = {
        events: []
      };

      this.connection.query(
        `select * from company_events left join (select companies.id, name, photo from companies join companies_photos on 
          companies.id=companies_photos.id) as tb on company_events.company_id=tb.id where company_id='${this.req.params.company_id}'`,
        (err, rows) => {
          if (err) this.res.end("Can't get information");
          // console.log(rows);

          if (rows !== undefined) {
            rows.forEach(row => {
              data.events.push({
                event_id: row.event_id,
                company_id: row.company_id,
                bannerphoto: row.bannerphoto,
                title: row.title,
                dayofweek: row.dayofweek,
                month: row.month,
                day: row.day,
                year: row.year,
                starttime: row.starttime,
                startdaytime: row.startdaytime,
                endtime: row.endtime,
                enddaytime: row.enddaytime,
                timezone: row.timezone,
                location: row.location,
                eligibility: row.eligibility,
                description: row.description,
                name: row.name,
                photo: row.photo,
              });
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
  EventsList
};
