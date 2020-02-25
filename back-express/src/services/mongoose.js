"use strict";

const config = require("../config");
const mongoose = require("mongoose");

mongoose.connection.on("connected", () => {
  console.log("MongoDB is connected");
});

mongoose.connection.on("error", err => {
  console.log(`Could not connect to MongoDB because of ${err}`);
  process.exit(1);
});

if (config.env === "dev") {
  mongoose.set("debug", true);
}

exports.connect = () => {
  var mongoURI = config.mongo.uri;

  mongoose.connect(mongoURI, {
    keepAlive: 1,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });

  mongoose.set("useCreateIndex", true);

  return mongoose.connection;
};
