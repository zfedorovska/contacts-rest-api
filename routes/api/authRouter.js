const express = require('express');
const router = express.Router();
const validation = require('../../middlewares/validation');
const { authMiddleware } = require('../../middlewares/authMiddleware');
const { validateSubscriptionField } = require('../../middlewares/validation');
const { asyncWrapper } = require('../../helpers/apiHelpers');
const {
  registrationController,
  loginController,
  logoutController,
  getCurrentUserController,
  updateSubscriptionController,
} = require('../../controllers/authController');

router.post(
  '/signup',
  validation.validateUserFields,
  asyncWrapper(registrationController)
);
router.post(
  '/login',
  validation.validateUserFields,
  asyncWrapper(loginController)
);
router.get('/logout', authMiddleware, asyncWrapper(logoutController));
router.get('/current', authMiddleware, asyncWrapper(getCurrentUserController));
router.patch(
  '/',
  authMiddleware,
  validateSubscriptionField,
  asyncWrapper(updateSubscriptionController)
);

module.exports = { authRouter: router };
