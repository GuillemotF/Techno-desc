module.exports = function APIError(message, status = 500, extra = null) {
  Error.captureStackTrace(this, this.constructor);
  console.error(this);
  this.name = this.constructor.name;
  this.message = message;
  this.status = status;
  this.extra = extra;
};
