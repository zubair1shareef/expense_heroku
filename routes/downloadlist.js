
const express = require('express');

const downloadlistController = require('../controllers/downloadlist');
const { isAuthenticate } = require("../auth/loginVerify");
const router = express.Router();


router.get('/downloadlist',isAuthenticate,downloadlistController.getDownloadList)

module.exports=router