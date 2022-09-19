class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super('Not found');
    this.status = 404;
  }
}

module.exports = { ValidationError, NotFoundError };
