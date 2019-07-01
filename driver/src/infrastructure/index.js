import { prettyJson } from '../utils';

const pgp = require('pg-promise')();
const connection = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
};
const dbClient = pgp(connection);

const logHttpRequest = (req, res, next) => {
  console.log("------------------------------")
  console.log(`${new Date().toISOString()}, ${req.method} : ${req.url}`);
  if (req.method == 'POST' || req.method == 'PUT')
    console.log(prettyJson(req.body));
  console.log("------------------------------")
  next();
}

const handleNoRoute = (req, res) => {
  res.type('text/plain')
    .status(404)
    .send('404 - We do not serve this');
}

export { dbClient, logHttpRequest, handleNoRoute };
