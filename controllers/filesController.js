const path = require('path');
const Jimp = require('jimp');
const UPLOAD_DIR = path.resolve('./public/avatars');
const { updateAvatarById } = require('../services/authService');

const updateAvatarController = async (req, res) => {
  const { _id: userId } = req.user;
  const { originalFileName, tempPath } = req.fileInfo;
  console.log('origin' + originalFileName);
  console.log(tempPath);
  const newName = `${userId}_${originalFileName}`;
  const avatarUrl = path.join(UPLOAD_DIR, newName);
  Jimp.read(tempPath)
    .then(img => {
      return img.resize(250, 250).write(avatarUrl);
    })
    .catch(err => {
      console.error(err);
    });
  const result = await updateAvatarById(userId, avatarUrl);
  res.json({ avatarURL: result.avatarURL });
};

module.exports = {
  updateAvatarController,
};
