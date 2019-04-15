var express = require('express');
var apiAdmin = express.Router();
const adminCtrl = require('../controllers/admin');

apiAdmin.post('/admin/signup', adminCtrl.createAdmin)


module.exports =  apiAdmin
