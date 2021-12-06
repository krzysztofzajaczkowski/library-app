import express, { json } from 'express';
import config from './v4/config'
import { bookRoutes } from './v4/routes/books';

const app = express();
app.use(json());
app.use(bookRoutes);

app.listen(config.port, () => console.log(`Server app listening at http://localhost:${config.port}`))