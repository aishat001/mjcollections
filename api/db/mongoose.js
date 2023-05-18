const mongoose = require('mongoose');


// mongoose.connect(process.env.MONGODB_URL, {
// useNewUrlParser: true,
// })

exports.connect = () => {
    // Connecting to the database
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Successfully connected to database");
      })
      .catch((error) => {
        console.log("database connection failed. exiting now...");
        console.error(error);
        process.exit(1);
      });
  };