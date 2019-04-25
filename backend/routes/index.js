'use strict'

/*
Conte totes les rutes, requerint el controlador (productCtrl) que es on
estan implementades 
 */
const express = require('express')
const api = express.Router()

const auth = require('../middlewares/auth')
const isAdmin = require('../middlewares/admin')

const userCtrl = require('../controllers/user')

const apiUsers= require('./users')
const apiAdmin= require('./admin')
const apiMusician = require('./musician')
const apiGroup = require('./group')

api.use('/user',apiUsers);
api.use('/admin',apiAdmin);
api.use('/musician',apiMusician);
api.use('/group', apiGroup);



api.post('/signup', userCtrl.signUp)//registre, rep al body els parametres de nom, password i email i el camp userType 0 si user, 1 si music, 2 si sala, 3 si admin
api.post('/signin', userCtrl.signIn)
api.get('/checktoken', auth, userCtrl.refreshToken)// recibe el token en el header

//ARA ESTAN A apiUsers (backend/routes/users.js)
//api.get('/getuser/:userId', userCtrl.getUser)
//api.get('/getusers', userCtrl.getUsers)

//ARA s'utilitza el /signup amb l'userType adient
//api.post('/musician/signup', musicCtrl.signUp)
//api.post('/admin/signup', adminCtrl.createAdmin)

//ARA ESTAN A apiGroup (./group.js)
//api.post('/group/add', groupCtrl.createGroup)  //create a new group
//api.get('/group/search', groupCtrl.searchFiltered) //search a group
//api.post('/group/answerRequest', groupCtrl.answerRequest) //a group respond a request
//api.post('/group/deleteMember', groupCtrl.deleteMember) //delete a member from a group
//api.post('/group/edit', groupCtrl.editGroup) //edit a group

//ARA ESTA a /routes/musician.js
//api.post('/musician/requestMembership', musicCtrl.requestMembership) //a musician request to participate in a group

api.get('/a', isAdmin, userCtrl.refreshToken)

api.get('/private', auth,(req,res) => {
  res.status(200).send({message: `Tienes acceso ${req.user}`})
})

module.exports =  api
