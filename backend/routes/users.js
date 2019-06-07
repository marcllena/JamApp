var express = require('express');
var apiUsers = express.Router();
const userCtrl = require('../controllers/user');
const auth = require('../middlewares/auth');
const isAdmin = require('../middlewares/admin');
const isMeOrAdmin = require('../middlewares/meOrAdmin');

// /api/user




//-----------LOCATION--------------
apiUsers.post('/location/:userId', isMeOrAdmin, userCtrl.setLocation);//Set user location latitud and longitud
apiUsers.post('/location', auth, userCtrl.setLocation);//Set user location latitud and longitud without path param
apiUsers.get('/location', /*auth,*/ userCtrl.getUsersLocation);//GET all users location, retorna el vector musicians amb els musics
apiUsers.post('/filter', /*auth,*/userCtrl.filterDistance);//filtra la llista d'usuari segons la posicio de l'usuari que troba amb el token i el camp distance al body
// i el vector rooms amb les sales



//-------------General--------------
apiUsers.get('/:userId', auth, userCtrl.getUser);//GET user by ID
apiUsers.put('/:userId', isMeOrAdmin, userCtrl.updateUser);//UPDATE user
apiUsers.put('/',auth,userCtrl.updateUser); //UPDATE user without path param
apiUsers.delete('/', isAdmin, userCtrl.deleteUsers);// DELETE users, le llega un vector de IDs llamado IdList
apiUsers.get('/', auth, userCtrl.getUsers);//GET all users
apiUsers.post('/facebook/link', auth, userCtrl.linkFacebookId);
apiUsers.post('/facebook/connect', userCtrl.connectFacebook )

module.exports =  apiUsers;
