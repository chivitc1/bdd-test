import { dbClient } from '../../infrastructure';

const getEmailById = (req, res) => {
  const emailId = req.params.emailId;
  return dbClient.one('SELECT * FROM emails WHERE id = $1', emailId)
    .then(email => res.json(email))
    .catch(error => res.status(500).json({"message": error}));
}
export default { getEmailById };


