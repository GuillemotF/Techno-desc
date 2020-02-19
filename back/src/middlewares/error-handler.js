"use strict";

// hanlde not found error
exports.handleNotFound = (req, res) => {
  res.status(404);
  res.json({
    message: "Requested resource not found"
  });
  res.end();
};

// handle errors
// eslint-disable-next-line no-unused-vars
exports.handleError = (err, req, res, _next) => {
  console.log("catched error");
  res.status(err.status || 500);
  res.json({
    message: err.message,
    extra: err.extra,
    errors: err
  });
};
