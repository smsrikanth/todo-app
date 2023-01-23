import * as mongodb from 'mongoose';
mongodb.set('debug', false);
const connectionUrl =
  process.env.NODE_ENV === 'test'
    ? 'mongodb://127.0.0.1:27017/todo-test'
    : 'mongodb://127.0.0.1:27017/todo';

const connect = function (cb) {
  mongodb.connect(connectionUrl, () => {
    // console.log('Db connection success', connectionUrl);
  });
};

const disConnect = function (cb) {
  mongodb.disconnect(() => {});
};

const clear = async function () {
  const temp = [];
  mongodb.modelNames().map(async (collectionName) => {
    temp.push(await mongodb.model(collectionName).deleteMany({}));
  });

  await Promise.all([...temp]);
};

const dbConnection = {
  connect,
  disConnect,
  clear,
};

export default dbConnection;
