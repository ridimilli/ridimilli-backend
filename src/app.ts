import * as express from 'express';
import * as logger from 'morgan';
import indexRouter from '../src/routes';

const app: express.Application = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', indexRouter);

export default app;
