const express = require('express');
const router = express.Router();
router.use('/avatars', express.static('./public/avatars'));

module.exports = { filesRouter: router };
