
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import usersRouter from './routes/users';
import tagRouter from './routes/tag';
import musicRouter from './routes/music';
import articleRouter from './routes/article';
import categoryRouter from './routes/category';

import uploadRouter from './routes/upload';

import swaggerUi from 'swagger-ui-express';
import cors from 'cors';

import './dao/db';
import { responseErrorCallback } from './utils';

const app = express();

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(require('../swagger.json')));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors({
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200
}));
app.use('/user', usersRouter);
app.use('/tag', tagRouter);
app.use('/music', musicRouter);
app.use('/category', categoryRouter);
app.use('/article', articleRouter);

app.use('/upload', uploadRouter);

app.use(responseErrorCallback);

export default app
