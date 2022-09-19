const { ValidationError, WrongParametersError } = require('./errors');
const asyncWrapper = controller => {
  return (req, res, next) => {
    controller(req, res).catch(next);
  };
};

const errorHandler = (error, req, res, next) => {
  if (
    error instanceof ValidationError ||
    error instanceof WrongParametersError
  ) {
    return res.status(error.status).json({ message: error.message });
  }
  if (error.message.includes('Cast to ObjectId failed')) {
    res.status(404).json({ message: 'Not Found' });
  }

  res.status(500).json({ message: error.message });
};

module.exports = {
  asyncWrapper,
  errorHandler,
};
