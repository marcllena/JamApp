'use strict'

/*
On estan implementades totes les operacions d'administrador. Crear admin, registrar o borrar usuari,etc
*/

const Admin = require('../models/admin')
const mongoose = require('mongoose')
const service = require('../services')

function createAdmin (req,res){
    const admin = new Admin({
        email: req.body.email,
        displayName: req.body.displayName,
        password: req.body.password
    })
    //La funció fins no funcionara fins que estigui la classe configurada a ./models/admin - falta herencia
    Admin.find({email: req.body.email}, (err,user)=>{
        console.log(user)
        if(err){
        return res.status(500).send({message: `Error al crear el administrador: ${err}`})}
        if (!user.length){
            if(req.body.password==null)
        return res.status(500).send({message: `Rellena el campo password`})

    admin.save((err) => {
        if(err)
            return res.status(500).send({message: `Error al crear el administrador: ${err}`})
        
        res.status(200).send({token: service.createToken(admin)})
    })    
        }
        else 
            return res.status(409).send({message: `Email ya registrado`})
        
    })
    
}

module.exports = {
    createAdmin
    
}
