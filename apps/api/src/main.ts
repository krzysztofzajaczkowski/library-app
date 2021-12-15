/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';
import config from './app/config'
import { bookRoutes } from './app/routes/books';
import * as fs from "fs";
import * as swaggerUi from 'swagger-ui-express'
// const app = express();

// app.get('/api', (req, res) => {
//   res.send({ message: 'Welcome to api!' });
// });

// const port = process.env.port || 3333;
// const server = app.listen(port, () => {
//   console.log(`Listening at http://localhost:${port}/api`);
// });
// server.on('error', console.error);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const swaggerFile: any = `${process.cwd()}${config.swaggerConfigPath}`;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const swaggerData: any = fs.readFileSync(swaggerFile, 'utf8');
const swaggerDocument = JSON.parse(swaggerData);

const app = express();
app.use(express.json());
app.use(bookRoutes);

app.use('/api/docs', swaggerUi.serve,swaggerUi.setup(swaggerDocument));

app.listen(config.port, () => console.log(`Server app listening at http://localhost:${config.port}`))
