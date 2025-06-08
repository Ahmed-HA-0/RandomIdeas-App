const mongoos = require('mongoose');

const conncetDB = async () => {
  await mongoos.connect(process.env.MONGO_URI);
};

mongoos.set('strictQuery', true);

module.exports = conncetDB;
