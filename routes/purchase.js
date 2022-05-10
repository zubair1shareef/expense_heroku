const express = require('express');
const purchaseController = require('../controllers/purchase');
const { isAuthenticate } = require("../auth/loginVerify");

const router = express.Router();



router.get('/premiummembership',isAuthenticate,purchaseController.premiumPurchase);
router.post('/updatetransactionstatus', isAuthenticate, purchaseController.updateTransactionStatus)
router.get('/getLatestPaymentUpdate', isAuthenticate, purchaseController.getLatestUpdate)

module.exports = router;
