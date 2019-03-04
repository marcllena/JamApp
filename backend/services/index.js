'use strict'

/*
Funcions que utilitzarem a varies parts del programa. Posem les de crear i descodificar tocken,
que utilitzen la llibreria de jwt. Utilitzem un promesa que s'utilitza al Middlewares
*/

const jwt = require('jwt-simple')
const moment = require('moment')
const config = require('../config')

function createToken(user) {
    const payload = {
        sub: user,
        iat:moment.unix(),
        exp:moment().add(14,'days').unix(),
    }

    return jwt.encode(payload,config.SECRET_TOKEN)
}

function decodeToken(token){
    const decode = new Promise((resolve,reject) => {
    try{
        const payload = jwt.decode(token, config.SECRET_TOKEN ) 

        if(payload.exp <= moment.unix()) {
            reject({
                status: 401,
                message: 'El token ha expirado'
            })
        }
    resolve(payload.sub)
    }
    catch(err)
    {
        reject({
            status: 500,
            message: 'Invalid Token'
        })
    }
    }) 
    return decode;
}
module.exports = {
    createToken, 
    decodeToken
}
