var express = require('express');
var apiUsers = express.Router();
const userCtrl = require('../controllers/user')
const auth = require('../middlewares/auth')

// /api/user


apiUsers.get('/:userId', auth, userCtrl.getUser);//GET user by ID
apiUsers.put('/:userId', auth, userCtrl.updateUser);



apiUsers.delete('/', auth, userCtrl.deleteUsers);// DELETE users, le llega un vector de IDs llamado IdList
/* GET users listing. */
apiUsers.get('/', auth, userCtrl.getUsers);

module.exports =  apiUsers
