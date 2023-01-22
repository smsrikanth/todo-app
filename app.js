import express from 'express';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import dotenv from 'dotenv';
import cors from 'cors';
import dbConnection from './src/db/index.js';
import userRoutes from './src/routes/user/userRoutes.js';
import todoRoutes from './src/routes/todo/todoRoutes.js';
import postRoutes from './src/routes/posts/postRoutes.js';
import authRoutes from './src/routes/auth/index.js';

const app = express();
const port = 3000;
dotenv.config();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cookieSession({
    name: 'user-session',
    secret: 'test', // should use as secret environment variable
    httpOnly: true,
  })
);

app.use('/', [
  (req, res, next) => {
    console.log('Hello world!!');
    next();
  },
  authRoutes,
]);
app.use('/user', userRoutes);
app.use('/todos', todoRoutes);
app.use('/posts', postRoutes);
app.use((err, req, res, next) => {
  console.log(err);
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).send(err);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  console.log('dbConnection', dbConnection);
});

export default app;
