var express = require('express');
var apiUsers = express.Router();
const userCtrl = require('../controllers/user');
const auth = require('../middlewares/auth');
const isAdmin = require('../middlewares/admin');
const isMeOrAdmin = require('../middlewares/meOrAdmin');

// /api/user


apiUsers.get('/:userId', auth, userCtrl.getUser);//GET user by ID
apiUsers.put('/:userId', isMeOrAdmin, userCtrl.updateUser);//UPDATE user
apiUsers.post('/location/:userId', isMeOrAdmin, userCtrl.setLocation);//Set user location latitud and longitud



apiUsers.delete('/',/* auth,*/ isAdmin, userCtrl.deleteUsers);// DELETE users, le llega un vector de IDs llamado IdList
/* GET users listing. */
apiUsers.get('/', auth, userCtrl.getUsers);//GET all users

module.exports =  apiUsers;
