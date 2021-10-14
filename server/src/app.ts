
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import usersRouter from './routes/users';
import tagRouter from './routes/tag';

import swaggerUi from 'swagger-ui-express';

import './dao/db';
import { responseErrorCallback } from './utils';

const app = express();

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(require('../swagger.json')));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/user', usersRouter);
app.use('/tag', tagRouter);

app.use(responseErrorCallback);

export default app
