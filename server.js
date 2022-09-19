const app = require('./app');
require('dotenv').config();
const { connectMongo } = require('./db/connection');
const { errorHandler } = require('./helpers/apiHelpers');

app.use(errorHandler);

connectMongo
  .then(() => {
    console.log('Database connection successful');
    app.listen(3000, function () {
      console.log('Server running. Use our API on port: 3000');
    });
  })
  .catch(err => {
    console.log(`Server not running. Error message: ${err.message}`);
    process.exit(1);
  });
