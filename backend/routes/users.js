var express = require('express');
var apiUsers = express.Router();
const userCtrl = require('../controllers/user');
const auth = require('../middlewares/auth');
const isAdmin = require('../middlewares/admin');
const isMeOrAdmin = require('../middlewares/meOrAdmin');

// /api/user




//-----------LOCATION--------------
apiUsers.post('/location/:userId', isMeOrAdmin, userCtrl.setLocation);//Set user location latitud and longitud
apiUsers.get('/location', /*auth,*/ userCtrl.getUsersLocation);//GET all users location, retorna el vector musicians amb els musics
// i el vector rooms amb les sales



//-------------General--------------
apiUsers.get('/:userId', auth, userCtrl.getUser);//GET user by ID
apiUsers.put('/:userId', isMeOrAdmin, userCtrl.updateUser);//UPDATE user
apiUsers.delete('/', isAdmin, userCtrl.deleteUsers);// DELETE users, le llega un vector de IDs llamado IdList
apiUsers.get('/', auth, userCtrl.getUsers);//GET all users

module.exports =  apiUsers;
