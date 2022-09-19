const mongoose = require('mongoose');

const connectMongo = mongoose.connect(process.env.MONGO_URL, {
  promiseLibrary: global.Promise,
  useUnifiedTopology: true,
});

module.exports = { connectMongo };
