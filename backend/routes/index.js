'use strict'

/*
Conte totes les rutes, requerin al controlador (productCtrl) que es on 
estan implementades 
 */
const express = require('express')
const api = express.Router()
const auth = require('../middlewares/auth')
const productCtrl = require('../controllers/product')
const userCtrl = require('../controllers/user')
const musicianCtrl = require('../controllers/musician')

api.get('/product', productCtrl.getProducts)
api.get('/product/:productId', productCtrl.getProduct)
api.post('/product', productCtrl.saveProduct)
api.put('/product/:productId', productCtrl.updateProduct)
api.delete('/product/:productId', productCtrl.deleteProduct)

//CRUD User PATHS
api.post('/signup', userCtrl.signUp)/*(req,res) =>{

  userCtrl.signUp

}*/
api.post('/signin', userCtrl.signIn)

api.post('/musician/signup',musicianCtrl.signUp)

api.get('/private', auth,(req,res) => {
  res.status(200).send({message: "Tienes acceso"})
})

module.exports =  api
