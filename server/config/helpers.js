module.exports = {
  // Error logging & handling
  errorLogger: function(error, req, res, next) {
    console.error(error.status, error.message);
    next(error);
  },
  errorHandler: function(error, req, res, next) {
    res.status(error.status).send({ status: error.status, message: error.message });
  }
};
