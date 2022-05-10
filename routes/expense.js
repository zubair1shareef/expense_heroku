const User = require("../models/user");
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');
const saltRounds = 10;
const express = require('express');


const expenseController = require('../controllers/expense');
const { isAuthenticate } = require("../auth/loginVerify");

const router = express.Router();
router.post('/addexpense',isAuthenticate,expenseController.addExpense)
router.get('/getexpense',isAuthenticate,expenseController.getExpense)
router.get('/getallexpense',expenseController.getAllExpense)
router.get('/getexpensebyid/:userId',expenseController.getExpenseById)
router.get('/thismonthexpense',isAuthenticate,expenseController.thisMonthExpense)
router.get('/downloadexpense',isAuthenticate,expenseController.downloadExpense)


module.exports = router;

