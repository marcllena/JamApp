var express = require('express');
var apiMusician = express.Router();
const musicianCtrl = require('../controllers/musician');
const auth = require('../middlewares/auth');

apiMusician.post('/requestMembership', auth, musicianCtrl.requestMembership) //a musician request to participate in a group
apiMusician.get('/getGroups/:userId', auth, musicianCtrl.getGroups)


module.exports =  apiMusician
