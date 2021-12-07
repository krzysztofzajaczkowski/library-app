import express, { json } from 'express';
import config from './v4/config'
import { bookRoutes } from './v4/routes/books';
import * as fs from "fs";
import swaggerUi from 'swagger-ui-express'


let swaggerFile: any = `${process.cwd()}${config.swaggerConfigPath}`;
let swaggerData: any = fs.readFileSync(swaggerFile, 'utf8');
let swaggerDocument = JSON.parse(swaggerData);

const app = express();
app.use(json());
app.use(bookRoutes);

app.use('/api/docs', swaggerUi.serve,swaggerUi.setup(swaggerDocument));

app.listen(config.port, () => console.log(`Server app listening at http://localhost:${config.port}`))