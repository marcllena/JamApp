'use strict'

/*
Conte totes les rutes, requerin al controlador (productCtrl) que es on 
estan implementades 
 */
const express = require('express')
const api = express.Router()
const auth = require('../middlewares/auth')
const isAdmin = require('../middlewares/admin')
const productCtrl = require('../controllers/product')
const userCtrl = require('../controllers/user')
const adminCtrl = require('../controllers/admin')
const groupCtrl = require('../controllers/group')
const musicCtrl = require('../controllers/musician')

api.get('/product', productCtrl.getProducts)
api.get('/getuser/:userId', userCtrl.getUser)
api.get('/getusers', userCtrl.getUsers)
api.get('/product/:productId', productCtrl.getProduct)
api.post('/product', productCtrl.saveProduct)
api.put('/product/:productId', productCtrl.updateProduct)
api.delete('/product/:productId', productCtrl.deleteProduct)
api.post('/signup', userCtrl.signUp)
api.post('/signin', userCtrl.signIn)
api.get('/checktoken', auth, userCtrl.refreshToken)// recibe el token en el header
api.post('/musician/signup', musicCtrl.signUp)
api.post('/admin/signup', adminCtrl.createAdmin)
api.get('/a', isAdmin, userCtrl.refreshToken)
api.post('/musician/groups/add', groupCtrl.createGroup)
api.post('/group/answerRequest', groupCtrl.answerRequest)
api.post('/group/deleteMember', groupCtrl.deleteMember)
api.post('/group/edit', groupCtrl.editGroup)
api.get('/private', auth,(req,res) => {
  res.status(200).send({message: `Tienes acceso ${req.user}`})
})

module.exports =  api
