'use strict'
/*
On estan implementades totes les operacions dels musics.
*/

const mongoose = require('mongoose')
const Musician = require('../models/musician')
const service = require('../services')

function signUp(req,res) {
    const musician = new Musician({
        email: req.body.email,
        displayName: req.body.displayName,
        instrument: req.instrument
    })

    musician.save((err) => {
        if(err)
            return res.status(500).send({message: `Error al crear el usuario: ${err}`})


        res.status(200).send({token: service.createToken(user)})
    })
}

module.exports={
    signUp/*,
    signIn*/
}