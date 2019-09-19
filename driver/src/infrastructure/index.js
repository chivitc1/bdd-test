/**
 * @author chinv
 * Common function depends directly on 3rd party lib: postgresql promise, nodemailer, 
 * and util functions
 */

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

const nodemailer = require("nodemailer");

const sendMail = function (mailAccount, mailMessage) {
  const mailTransporter = nodemailer.createTransport({
    host: mailAccount.host,//"smtp.gmail.com"
    secure: mailAccount.secure,//true
    port: mailAccount.port,//465,587
    auth: {
      user: mailAccount.user,
      pass: mailAccount.password
    }, tls: {
      rejectUnauthorized: false
    }
  });
  return new Promise(function (resolve, reject) {
    mailTransporter.sendMail({
      from: mailMessage.from, // sender address
      to: mailMessage.to, // list of receivers
      subject: mailMessage.subject,
      text: mailMessage.content, // plain text body
      html: mailMessage.htmlContent
    }, (error, info) => {
      if (error) {
        reject(error);
      } else {
        resolve(info.messageId);
        // console.log(info.messageId)
      }
    });
  });
}

export { dbClient, logHttpRequest, handleNoRoute, sendMail };
