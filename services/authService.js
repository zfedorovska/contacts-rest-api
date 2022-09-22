const { User } = require('../db/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { NotAuthorizedError } = require('../helpers/errors');

const registration = async (email, password) => {
  const user = new User({
    email,
    password,
  });
  await user.save();
  return user;
};

const login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new NotAuthorizedError('Email or password is wrong');
  }
  if (!(await bcrypt.compare(password, user.password))) {
    throw new NotAuthorizedError('Email or password is wrong');
  }
  const token = await jwt.sign(
    {
      _id: user._id,
    },
    process.env.JWT_SECRET
  );
  const updatedUser = await updateToken(user._id, { token });
  return updatedUser;
};

const updateToken = async (userId, token) => {
  return await User.findByIdAndUpdate(userId, token, { new: true });
};

const getUserById = async userId => {
  return await User.findById(userId);
};

const updateSubscriptionById = async (userId, subscription) => {
  return await User.findByIdAndUpdate(
    userId,
    { subscription },
    {
      new: true,
    }
  );
};

module.exports = {
  registration,
  login,
  updateToken,
  getUserById,
  updateSubscriptionById,
};
