var express = require('express');
var apiMusician = express.Router();
const musicianCtrl = require('../controllers/musician');

apiMusician.post('/requestMembership', musicianCtrl.requestMembership) //a musician request to participate in a group


module.exports =  apiMusician
