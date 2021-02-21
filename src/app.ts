import { NextFunction, Request, Response } from 'express';
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

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(500);
    res.json({
        message: err.message,
        error: err,
    });
});

export default app;
