import express from 'express';
import bodyParser from 'body-parser';
import helloRouter from './routes/hello';
import emailsRouter from './routes/emails';
import messagingRouter from './routes/messaging';

const app = express();

/**
 * Middleware handlers
 */
app.use(bodyParser.json({ limit: 1e6 }));

/**
 * Routing to routers
 */
app.all('/driver/hello', helloRouter);
app.all('/driver/emails/thread', emailsRouter);
app.all('/driver/messaging', messagingRouter);
app.all('/driver/emails/:emailId', emailsRouter);

/**
 * Unhandle routes
 */
app.use(function (req, res) {

  res.type('text/plain');
  res.status(404);
  res.send('404 - We do not serve this');
});

const port = process.env.SERVER_PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at port: ${port}`);
});
