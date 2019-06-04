'use strict'

/*
Conte totes les rutes, requerint el controlador (productCtrl) que es on
estan implementades 
 */
const express = require('express');
const api = express.Router();

const auth = require('../middlewares/auth');
const isAdmin = require('../middlewares/admin');

const userCtrl = require('../controllers/user');

const apiUsers= require('./users');
const apiAdmin= require('./admin');
const apiMusician = require('./musician');
const apiGroup = require('./group');
const apiJam = require('./jam');


api.use('/user',apiUsers);
api.use('/admin',apiAdmin);
api.use('/musician',apiMusician);
api.use('/group', apiGroup);
api.use('/jam', apiJam);


api.post('/signup', userCtrl.signUp);//registre, rep al body els parametres de nom, password i email i el camp userType 0 si user, 1 si music, 2 si sala, 3 si admin
api.post('/signin', userCtrl.signIn);
api.get('/checktoken', auth, userCtrl.refreshToken);// recibe el token en el header

module.exports =  api;
