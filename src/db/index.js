import * as mongodb from 'mongoose';
mongodb.set('debug', true);
const connection = mongodb.connect('mongodb://127.0.0.1:27017/todo', () => {
  console.log('Db connection success');
});

export default connection;
