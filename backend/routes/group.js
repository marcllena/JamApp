var express = require('express');
var apiGroup = express.Router();
const groupCtrl = require('../controllers/group');


api.post('/answerRequest', groupCtrl.answerRequest) //a group respond a request




api.delete('/', groupCtrl.deleteMember) //delete a member from a group
api.put('/', groupCtrl.editGroup) //edit a group
api.post('/', groupCtrl.createGroup)  //create a new group
api.get('/', groupCtrl.searchFiltered) //search a group


module.exports =  apiGroup
