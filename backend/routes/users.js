var express = require('express');
var apiUsers = express.Router();
const userCtrl = require('../controllers/user')
const auth = require('../middlewares/auth')

// /api/user


apiUsers.get('/:userId', auth, userCtrl.getUser);//GET user by ID



apiUsers.delete('/', userCtrl.deleteUsers);
/* GET users listing. */
apiUsers.get('/', auth, userCtrl.getUsers);

module.exports =  apiUsers
