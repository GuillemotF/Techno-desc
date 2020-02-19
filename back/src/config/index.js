require("dotenv").config();

module.exports = {
  port: process.env.PORT,
  app: process.env.APP,
  env: process.env.NODE_ENV,
  secret: process.env.APP_SECRET,
  hostname: process.env.HOSTNAME,
  mongo: {
    uri: process.env.MONGOURI,
    testURI: process.env.MONGOTESTURI
  },
  imgBBKey: process.env.IMGBB_KEY
};
