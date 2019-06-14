var express = require('express');
var apiJam = express.Router();
const jamCtrl = require('../controllers/jam');
const auth = require('../middlewares/auth');
const isAdmin = require('../middlewares/admin');


//apiJam.post('/answerRequest', auth,  jamCtrl.answerRequest);//a jam respond a request




apiJam.delete('/:idJam/:idMember', auth, jamCtrl.removeMember); //delete a member from a jam
apiJam.get('/:idJam/:idMemeber', auth, jamCtrl.addMember);//add a member to a jam
//apiJam.get('/myjams', auth, jamCtrl.searchJam); //search a jam mine

apiJam.get('/byOwner', auth, jamCtrl.getJamsfromOwner);//get an specific jam

apiJam.get('/participants/:idJam',auth,jamCtrl.getParticipants);



apiJam.get('/:idJam', auth, jamCtrl.getJam);//get an specific jam



apiJam.delete('/', auth, jamCtrl.deleteJam); //delete a jam
apiJam.put('/', auth, jamCtrl.updateJam); //edit a jam
apiJam.post('/', auth, jamCtrl.saveJam);  //create a new jam with name, estils, description
apiJam.get('/', auth, jamCtrl.getJams); //search a all jams


module.exports =  apiJam;