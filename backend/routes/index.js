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

const apiUsers= require('./users')
const apiAdmin= require('./admin')

api.use('/user',apiUsers)
api.use('/admin',apiAdmin)


//ARA ESTAN A apiUsers (backend/routes/users.js)
//api.get('/getuser/:userId', userCtrl.getUser)
//api.get('/getusers', userCtrl.getUsers)

api.post('/signup', userCtrl.signUp)
api.post('/signin', userCtrl.signIn)

api.get('/checktoken', auth, userCtrl.refreshToken)// recibe el token en el header

api.get('/a', isAdmin, userCtrl.refreshToken)

api.get('/private', auth,(req,res) => {
  res.status(200).send({message: `Tienes acceso ${req.user}`})
})

module.exports =  api
