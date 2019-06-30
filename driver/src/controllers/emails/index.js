import { createInsertSql as generateInsertSql } from '../../utils';
import { initDbConn } from '../../infrastructure';

const db = initDbConn();

const createEmails = (req, res) => {
  const emails = req.body.emails;
  const createEmailSql = generateInsertSql(emails, "emails");

  db.tx(t => {
    return t.batch([
      db.none(createEmailSql)
        .then(() => {
          res.status(200)
            .json({ "message": "OK" });
        })
    ])
  })
    .catch(error => {
      console.log('ERROR:', error);
      res.status(400)
        .json({ "message": error });
    });
}

const getEmail = (req, res) => {
  const emailId = req.params.emailId;
  return db.one('SELECT * FROM emails WHERE id = $1', emailId)
    .then(email => res.json(email))
    .catch(error => res.status(500).json({"message": error}));
}
export default { createEmailThread: createEmails, getEmail };


