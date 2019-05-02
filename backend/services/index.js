'use strict'

/*
Funcions que utilitzarem a varies parts del programa. Posem les de crear i descodificar tocken,
que utilitzen la llibreria de jwt. Utilitzem un promesa que s'utilitza al Middlewares
*/

const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('../config');
const User = require('../models/user');
const service= this

function createToken(user) {
    const payload = {
        sub: user._id,
        iat:moment.unix(),
        exp:moment().add(14,'days').unix(),
    }
    //console.log(`create token payload.sub: ${payload.sub}`)
    return jwt.encode(payload,config.SECRET_TOKEN)
}

function createTokenFromID(id) {
    User.findById(id).lean().exec(function (err, user) {
        if (err)
            return res.status(404).send({message: `Id incorrecto: ${err}`})
        return createToken(user)
    })
}


function decodeToken(token){
    const decode = new Promise((resolve,reject) => {
    try{
        const payload = jwt.decode(token, config.SECRET_TOKEN )
        //console.log(`decode token payload.sub: ${payload.sub}`)
        //console.log(`payload: ${payload}`)
        if(payload.exp <= moment.unix()) {
            reject({
                status: 401,
                message: 'El token ha expirado'
            })
        }
        //console.log(`decode token payload.sub: ${payload.sub}`)
    resolve(payload.sub)
    }
    catch(err)
    {
        reject({
            status: 403,
            message: 'Invalid Token'
        })
    }
    })
    return decode;
}


module.exports = {
    createToken, 
    decodeToken,
    createTokenFromID
}
