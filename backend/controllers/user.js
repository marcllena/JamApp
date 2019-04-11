'use strict'

/*
On estan implementades totes les operacions dels usuaris. Així, aqui s'accedeix a la base de dades, i es conecta amb Node JS
Al registrar o fer login, se'ns proporciona un token que s'utilitza en les operacions registrades
*/

const mongoose = require('mongoose')
const User = require('../models/user')
const service = require('../services')

function signUp(req,res) {
    const userNew = new User({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    })

    console.log("Petició de SignUp del seguent user:"+userNew)
    //console.log(userNew._id)
    if(req.body.password==null)
        return res.status(500).send({message: `Rellena el campo password`})
    User.find({email: req.body.email}).lean().exec(function(err, user) {
        console.log(user)
        if(err){
            return res.status(500).send({message: `Error al crear el usuario: ${err}`})}
        if (!user.length){
            userNew.save((err) => {
                if(err) {
                    console.log("Error al crear usuari:"+req.body.email+". Ja existeix un usuari amb el correu")
                    return res.status(409).send({message: `Error al crear el usuario: ${err}`})
                }
        console.log("Usuari: "+req.body.email+" agregat correctament")
        res.status(200).send({token: service.createToken(userNew)})
    } )     }
        else 
            return res.status(409).send({message: `Email ya registrado`})
    })
}

function signIn(req,res) {
    console.log("Petició de SignIn del seguent user:"+req.body.email)
    User.find({email: req.body.email}, (err,user)=>{

        if(err) {
            console.log("Error en el logging")
            return res.status(404).send({message: `Error en el logging: ${err}`})
        }

        if(!user.length) {
            console.log("El usuario no existe")
            return res.status(404).send({message: `El usuario no existe`})
        }

        user[0].comparePassword((req.body.password), function(err, isMatch) {
            //if (err) throw err;
            if(isMatch) {
                console.log("Login Correcte " )
                res.status(200).send({
                    message: "Te has logeado correctamente",
                    token: service.createToken(user[0]),
                    _id: user[0]._id
                })
            } else {
                console.log("Password Incorrecte")
                return res.status(404).send({message: `Wrong password`});
            }

        });
    }).select('+password');
}

function getUser(req,res) {
    User.findById(req.params.userId, (err,user)=>{
        console.log(user);
        if(err)
            return res.status(500).send({message: `Error en el logging: ${err}`})

        res.status(200).send(user);
    });
}

function getUsers(req,res) {
    User.find( (err,users)=>{
        console.log("Peticio per obtindre tots els usuaris");
        if(err)
            return res.status(500).send({message: `Error en el logging: ${err}`})

        res.status(200).send(users);
    });
}

function refreshToken(req,res) {
    User.findById(req.user).lean().exec(function (err, user) {
        if (err)
            return res.status(500).send({message: `Error refreshing token: ${err}`})
        if (!user){
            return res.status(404).send({message: `Incorrect ID`})
        }

        console.log("Login Correcte, Token Validat")

        res.status(200).send({
            message: "Te has logeado correctamente",
            token: service.createToken(user)
        })
    })

}//200 si ok 404 si no hi user o hi ha un error (igual que al login)


module.exports={
    signUp,
    signIn,
    getUser,
    getUsers,
    refreshToken
}
