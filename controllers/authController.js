const {
  registration,
  registrationVerify,
  login,
  updateToken,
  getUserById,
  getUserByEmail,
  updateSubscriptionById,
  sentConfirmEmail,
} = require('../services/authService');
const { ValidationError } = require('../helpers/errors');
const gravatar = require('gravatar');

const registrationController = async (req, res) => {
  const { email, password } = req.body;
  const avatarURL = gravatar.url(email, { s: '100', r: 'x', d: 'retro' }, true);
  const user = await registration(email, password, avatarURL);
  res.status(201).json({
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const registrationVerifyController = async (req, res) => {
  const { verificationToken } = req.params;
  await registrationVerify(verificationToken);
  res.json({
    message: 'Verification successful',
  });
};

const registrationRepeatVerifyController = async (req, res) => {
  const { email } = req.body;
  const user = await getUserByEmail(email);
  if (user.verify) {
    throw new ValidationError('Verification has already been passed');
  }
  await sentConfirmEmail(email, user.verificationToken);
  res.json({
    message: 'Verification email sent',
  });
};

const loginController = async (req, res) => {
  const { email, password } = req.body;
  const user = await login(email, password);
  res.json({
    token: user.token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const logoutController = async (req, res) => {
  const { _id: userId } = req.user;
  await updateToken(userId, { token: '' });
  res.status(204).send();
};

const getCurrentUserController = async (req, res) => {
  const { _id: userId } = req.user;
  const user = await getUserById(userId);
  res.json({
    email: user.email,
    subscription: user.subscription,
  });
};

const updateSubscriptionController = async (req, res) => {
  const { _id: userId } = req.user;
  const { subscription } = req.body;
  const user = await updateSubscriptionById(userId, subscription);
  res.json({
    email: user.email,
    subscription: user.subscription,
  });
};

module.exports = {
  registrationController,
  registrationVerifyController,
  registrationRepeatVerifyController,
  loginController,
  logoutController,
  getCurrentUserController,
  updateSubscriptionController,
};
