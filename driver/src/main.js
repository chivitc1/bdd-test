import express from 'express';
import bodyParser from 'body-parser';
import helloRouter from './routes/hello';
import { logHttpRequest, handleNoRoute } from './lib';

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

app.use(handleNoRoute);

const port = process.env.SERVER_PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at port: ${port}`);
});
