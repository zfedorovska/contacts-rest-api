const { User } = require('../db/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sgMail = require('@sendgrid/mail');
const uuid = require('uuid');
const { NotAuthorizedError, NotFoundError } = require('../helpers/errors');

const registration = async (email, password, avatarURL) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const code = uuid.v4();
  const user = new User({
    email,
    password,
    avatarURL,
    verificationToken: code,
  });
  await user.save();
  await sentConfirmEmail(email, code);
  return user;
};

const sentConfirmEmail = async (email, code) => {
  const msg = {
    to: email,
    from: 'zfedorovska@gmail.com',
    subject: 'Thank you for registration!',
    text: `Please, confirm your email address http://localhost:3000/api/users/verify/${code}`,
    html: `Please, <a href="http://localhost:3000/api/users/verify/${code}">confirm</a> your email address`,
  };
  await sgMail.send(msg);
};

const registrationVerify = async verificationToken => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw new NotFoundError('User not found');
  }
  user.verify = true;
  user.verificationToken = 'null';
  await user.save();
  const msg = {
    to: user.email,
    from: 'zfedorovska@gmail.com',
    subject: 'Thank you for registration!',
    text: 'Your email is confirmed',
    html: 'Your email is confirmed',
  };
  await sgMail.send(msg);
};

const login = async (email, password) => {
  const user = await User.findOne({ email, verify: true });
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

const getUserByEmail = async email => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new NotFoundError(`User with ${email} email not found`);
  }
  return user;
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

const updateAvatarById = (userId, avatarUrl) => {
  return User.findByIdAndUpdate(
    userId,
    { avatarURL: avatarUrl },
    { new: true }
  );
};

module.exports = {
  registration,
  registrationVerify,
  login,
  updateToken,
  getUserById,
  getUserByEmail,
  updateSubscriptionById,
  updateAvatarById,
  sentConfirmEmail,
};
