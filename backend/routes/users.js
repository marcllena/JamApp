var express = require('express');
var apiUsers = express.Router();
const userCtrl = require('../controllers/user')

/* GET users listing. */
apiUsers.get('/', userCtrl.getUsers)



apiUsers.get('/:userId', userCtrl.getUser) //GET user by ID


module.exports =  apiUsers
