const express = require('express');
const router = express.Router();
const multer = require('multer');
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
const { updateAvatarController } = require('../../controllers/filesController');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const FILE_DIR = path.resolve('./tmp');

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

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, FILE_DIR);
  },
  filename: (req, file, cb) => {
    const [, extension] = file.originalname.split('.');
    const uniqueFileName = `${uuidv4()}.${extension}`;
    cb(null, uniqueFileName);
    const tempPath = path.join(FILE_DIR, uniqueFileName);
    const fileInfo = { originalFileName: file.originalname, tempPath };
    req.fileInfo = fileInfo;
  },
});
const uploadMiddleware = multer({ storage });
router.patch(
  '/avatars',
  authMiddleware,
  uploadMiddleware.single('avatar'),
  asyncWrapper(updateAvatarController)
);

module.exports = { authRouter: router };
