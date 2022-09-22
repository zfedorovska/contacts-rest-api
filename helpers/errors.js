class ContactsRestApiError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class ValidationError extends ContactsRestApiError {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class EmailDuplicateError extends ContactsRestApiError {
  constructor(message) {
    super('Email in use');
    this.status = 409;
  }
}

class NotFoundError extends ContactsRestApiError {
  constructor(message) {
    super('Not found');
    this.status = 404;
  }
}

class NotAuthorizedError extends ContactsRestApiError {
  constructor(message) {
    super(message);
    this.status = 401;
  }
}

module.exports = {
  ContactsRestApiError,
  ValidationError,
  NotFoundError,
  EmailDuplicateError,
  NotAuthorizedError,
};
