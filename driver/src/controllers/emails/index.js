/**
 * @author chinv
 * Handle requests related to email in database
 */

import { dbClient } from '../../infrastructure';

const getEmailById = (req, res) => {
  const emailId = req.params.emailId;
  return dbClient.one('SELECT * FROM emails WHERE id = $1', emailId)
    .then(email => res.json(email))
    .catch(error => res.status(500).json({ "message": error }));
}

function findEmailByMessageId(req, res) {
  const messageId = req.query.messageId;
  return dbClient.one('SELECT * FROM emails WHERE message_id = $1', messageId)
    .then(email => {
      console.log('Found email');
      res.status(200).json(email)
    })
    .catch(error => {
      console.log('Not found email mesageId = ' + messageId);
      res.status(404).json(error)
    })
}

export default { getEmailById, findEmailByMessageId };
