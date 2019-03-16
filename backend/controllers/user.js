'use strict'

/*
On estan implementades totes les operacions dels usuaris. Així, aqui s'accedeix a la base de dades, i es conecta amb Node JS
Al registrar o fer login, se'ns proporciona un token que s'utilitza en les operacions registrades
*/

const mongoose = require('mongoose')
const User = require('../models/user')
const service = require('../services')

function signUp(req,res) {
    const user = new User({
        email: req.body.email,
        displayName: req.body.displayName
    })

    console.log("Petició de SignUp del seguent correu:"+req.body.email)

    if(req.body.password==null)
        return res.status(500).send({message: `Rellena el campo password`})

    user.save((err) => {
        if(err) {
            console.log("Error al crear usuari:"+req.body.email+". Ja existeix un usuari amb el correu")
            return res.status(500).send({message: `Error al crear el usuario: ${err}`})

        }

        console.log("Usuari: "+req.body.email+" agregat correctament")
        res.status(200).send({token: service.createToken(user)})
    })
}
function signIn(req,res) {
    User.find({email: req.body.mail, password: req.body.password}, (err,user)=>{
        if(err)
            return res.status(500).send({message: `Error en el logging: ${err}`})

        if(!user)
            return res.status(404).send({message: `El usuario no existe`})

        req.user=user
        res.status(200).send({
            message: "Te has logeado correctamente",
            token: service.createToken(user)
        })

    })

}

module.exports={
    signUp,
    signIn
}
