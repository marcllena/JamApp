var express = require('express');
var apiRoom = express.Router();
const roomCtrl = require('../controllers/room');
const auth = require('../middlewares/auth');
const isAdmin = require('../middlewares/admin');









//apiRoom.get('/:idRoom', auth, roomCtrl.getRoom);//get an specific room



apiRoom.get('/', auth, roomCtrl.getRooms); //search a all rooms sorted alphabetically


module.exports =  apiRoom;