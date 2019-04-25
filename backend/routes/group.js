var express = require('express');
var apiGroup = express.Router();
const groupCtrl = require('../controllers/group');
const auth = require('../middlewares/auth');


apiGroup.post('/answerRequest', auth,  groupCtrl.answerRequest) //a group respond a request




apiGroup.delete('/', auth, groupCtrl.deleteMember) //delete a member from a group
apiGroup.put('/', auth, groupCtrl.editGroup) //edit a group
apiGroup.post('/', auth, groupCtrl.createGroup)  //create a new group with name, estils, description
apiGroup.get('/', auth, groupCtrl.searchFiltered) //search a group


module.exports =  apiGroup
