'use strict'

/*
On estan implementades les operacions d'autentificació.
*/

const services = require('../services')

function isAuth(req,res, next){
    if(!req.headers.authorization){
        return res.status(403).send({message: `No tienes autorización`})
    }

    const token = req.headers.authorization.split(" ")[0]
    services.decodeToken(token)
        .then(response =>{
            req.user=response
            next()
        })
        .catch(response=>{
            res.status(response.status)
        })

}


module.exports= isAuth