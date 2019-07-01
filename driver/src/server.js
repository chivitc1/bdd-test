import express from 'express';
import bodyParser from 'body-parser';
import helloRouter from './routes/hello';
import emailsRouter from './routes/emails';
import messagingRouter from './routes/messaging';
import dbSeedRouter from './routes/db';
import { logHttpRequest, handleNoRoute } from './infrastructure';

const app = express();

/**
 * Middleware handlers
 */
app.use(bodyParser.json({ limit: 1e6 }));
app.use(logHttpRequest);

/**
 * Routing to routers
 */
app.all('/driver/hello', helloRouter);
app.all('/driver/messaging', messagingRouter);
app.all('/driver/emails/:emailId', emailsRouter);
app.all('/driver/db/seed', dbSeedRouter);

app.use(handleNoRoute);

const port = process.env.SERVER_PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at port: ${port}`);
});
