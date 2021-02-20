import * as express from 'express';
import * as logger from 'morgan';
import * as cors from 'cors';
import indexRouter from '../src/routes';

const app: express.Application = express();
app.use(
    cors({
        credentials: true,
    })
);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);

export default app;
