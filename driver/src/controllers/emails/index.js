import { createInsertSql} from '../../utils';

const pgp = require('pg-promise')();
var emails = require('./emails.json');
const connection = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
}
const db = pgp(connection);


const createEmailSql = createInsertSql(emails, "emails");
console.log(createEmailSql);

const createEmailThread = (req, res) => {
  db.tx(t => {
    return t.batch([
      db.none(createEmailSql)
        .then(() => {
          console.log("Email seeded");
          res.status(200)
            .json({ "message": "Email seeded" });
        })
    ])
  })
    .catch(error => {
      console.log('ERROR:', error);
      res.status(400)
        .json({ "message": "error" });
    });
}

export default { createEmailThread };


