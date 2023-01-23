import { mongo } from 'mongoose';
import app from './app.js';
import dbConnection from './src/db/index.js';

const port = process.env.port || 3000;
app.listen(port, () => {
  dbConnection.connect(() => {
    console.log('DB connected');
  });
  console.log(`Example app listening on port ${port}`);
});
