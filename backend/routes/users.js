var express = require('express');
var apiUsers = express.Router();
const userCtrl = require('../controllers/user')
const auth = require('../middlewares/auth')

/* GET users listing. */
apiUsers.get('/', auth, userCtrl.getUsers)



apiUsers.get('/:userId', auth, userCtrl.getUser) //GET user by ID


module.exports =  apiUsers
