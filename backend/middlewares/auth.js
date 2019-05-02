'use strict'

/*
On estan implementades les operacions d'autentificació.
*/

const services = require('../services')


//Si OK et posa a req.user l'Id de l'usuari
function isAuth(req,res, next){
    if(!req.headers.authorization){
        return res.status(403).send({message: `No tienes autorización`})
    }

    const token = req.headers.authorization.split(" ")[1] //Bearer + token, per aixo poso [1]
    //console.log(`auth token ${token}`)
    services.decodeToken(token)
        .then(response =>{
            req.user=response;
            next()
        })
        .catch(response=>{
            return res.status(response.status).send({message: `No tienes acceso`})

        })

}


module.exports= isAuth