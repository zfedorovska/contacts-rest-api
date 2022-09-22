const {
  registration,
  login,
  updateToken,
  getUserById,
  updateSubscriptionById,
} = require('../services/authService');

const registrationController = async (req, res) => {
  const { email, password } = req.body;
  const user = await registration(email, password);
  res.status(201).json({
    user: {
      email: user.email,
      subscription: user.subscription,
    },
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
  loginController,
  logoutController,
  getCurrentUserController,
  updateSubscriptionController,
};
