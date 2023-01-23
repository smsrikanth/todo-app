import express from 'express';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './src/routes/user/userRoutes.js';
import todoRoutes from './src/routes/todo/todoRoutes.js';
import postRoutes from './src/routes/posts/postRoutes.js';
import authRoutes from './src/routes/auth/index.js';

const app = express();
const port = 3000;
dotenv.config();

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cookieSession({
    name: 'user-session',
    secret: process.env.SESSION_SECRET, // should use as secret environment variable
    httpOnly: true,
  })
);
app.use(cors());
const appV1 = '/api/v1';
app.use(appV1, [
  (req, res, next) => {
    // console.log('Hello world!!');
    next();
  },
  authRoutes,
]);

app.use(`${appV1}/user`, userRoutes);
app.use(`${appV1}/todos`, todoRoutes);
app.use(`${appV1}/posts`, postRoutes);
app.use((err, req, res, next) => {
  console.log(err);
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).send(err);
});

export default app;
