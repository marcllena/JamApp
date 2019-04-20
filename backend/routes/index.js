'use strict'

/*
Conte totes les rutes, requerin al controlador (productCtrl) que es on 
estan implementades 
 */
const express = require('express')
const api = express.Router()

const auth = require('../middlewares/auth')
const isAdmin = require('../middlewares/admin')

const userCtrl = require('../controllers/user')
const adminCtrl = require('../controllers/admin')
const groupCtrl = require('../controllers/group')
const musicCtrl = require('../controllers/musician')

const apiUsers= require('./users')
const apiAdmin= require('./admin')

api.use('/user',apiUsers)
api.use('/admin',apiAdmin)



//ARA ESTAN A apiUsers (backend/routes/users.js)
//api.get('/getuser/:userId', userCtrl.getUser)
//api.get('/getusers', userCtrl.getUsers)

api.post('/signup', userCtrl.signUp)//registre, rep al body els parametres de nom, password i email i el camp userType 0 si user, 1 si music, 2 si sala, 3 si admin
api.post('/signin', userCtrl.signIn)

api.get('/checktoken', auth, userCtrl.refreshToken)// recibe el token en el header
api.post('/musician/signup', musicCtrl.signUp)
api.post('/admin/signup', adminCtrl.createAdmin)
api.get('/a', isAdmin, userCtrl.refreshToken)
api.post('/musician/groups/add', groupCtrl.createGroup)
api.get('/group/search', groupCtrl.searchFiltered)
api.post('/group/answerRequest', groupCtrl.answerRequest)
api.post('/group/deleteMember', groupCtrl.deleteMember)
api.post('/group/edit', groupCtrl.editGroup)
api.post('/musician/requestMembership', musicCtrl.requestMembership)
api.get('/private', auth,(req,res) => {
  res.status(200).send({message: `Tienes acceso ${req.user}`})
})

module.exports =  api
