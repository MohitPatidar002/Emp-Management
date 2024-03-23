const express = require('express');
const router = express.Router();

const {userDetail, getAllUser} = require('../Controllers/user.controller.js');
const { auth } = require('../middlewares/auth.middleware.js');

router.get('/userDetail', auth, userDetail)
router.get('/getAllUser', getAllUser)

module.exports = router;