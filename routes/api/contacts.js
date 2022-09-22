const express = require('express');
const router = express.Router();
const validation = require('../../middlewares/validation');
const { authMiddleware } = require('../../middlewares/authMiddleware');
const { asyncWrapper } = require('../../helpers/apiHelpers');
const {
  getContactsController,
  getContactByIdController,
  addContactController,
  deleteContactController,
  changeContactController,
  updateFavoriteByIdController,
} = require('../../controllers/contactsController');

router.use(authMiddleware);
router.get('/', asyncWrapper(getContactsController));
router.get('/:contactId', asyncWrapper(getContactByIdController));
router.post(
  '/',
  validation.validateRequiredFields,
  validation.validateContactBody,
  asyncWrapper(addContactController)
);
router.delete('/:contactId', asyncWrapper(deleteContactController));
router.put(
  '/:contactId',
  validation.validateContactBody,
  asyncWrapper(changeContactController)
);
router.patch(
  '/:contactId/favorite',
  validation.validateFavoriteBody,
  asyncWrapper(updateFavoriteByIdController)
);

module.exports = router;
