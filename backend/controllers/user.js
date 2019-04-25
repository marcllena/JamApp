'use strict'

/*
On estan implementades totes les operacions dels usuaris. Així, aqui s'accedeix a la base de dades, i es conecta amb Node JS
Al registrar o fer login, se'ns proporciona un token que s'utilitza en les operacions registrades
*/

const mongoose = require('mongoose')
const User = require('../models/user')
const Musician = require('../models/musician')
const Admin = require('../models/admin')
const Room = require('../models/room')
const service = require('../services')

/*
//registre, rep al body els parametres de nom, password i email
// a més, el camp userType 0 si user, 1 si music, 2 si sala, 3 si admin
function register(req,res) {
    //if (req.body.userType == 0) signUp(req,res);
    //if (req.body.userType == 1) console.log('Solicitud de crear music');
    switch (req.body.userType){
        case 0:
            signUp(req,res);
            break;
        case 1:
            console.log('Crear music');
            res.status(200).send({message : 'Registre music'})
            break;
        default:
            console.log('default');
            break;
    }

}
*/

//registre, rep al body els parametres de nom, password i email
// a més, el camp userType 0 si user, 1 si music, 2 si sala, 3 si admin
function signUp(req,res) {
    var userNew;
    console.log(req.body);
    switch (req.body.userType){

        case 0://cas usuari
            userNew = new User({
                email: req.body.email,
                username: req.body.username,
                password: req.body.password
            })
            break;

        case 1://cas music
            userNew = new Musician({
                email: req.body.email,
                username: req.body.username,
                password: req.body.password
            })
            break;

        case 2://cas sala
            userNew = new Room({
                email: req.body.email,
                username: req.body.username,
                password: req.body.password
            })
            break;

        case 3://cas admin per crear admin s'ha de incorporar el camp pass amb un password conegut pels admins
            if ((req.body.pass)&&(req.body.pass=='password')) {
                userNew = new Admin({
                    email: req.body.email,
                    username: req.body.username,
                    password: req.body.password
                })
            }
            else
                return res.status(403).send({message: `No tienes acceso`})
            break;

        default://cas per defecte usuari
            userNew = new User({
                email: req.body.email,
                username: req.body.username,
                password: req.body.password
            })
            break;
    }

    console.log("Petició de SignUp del seguent user: "+userNew.email)
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

}//200 si ok 404 si no hi ha user o hi ha un error (igual que al login)

//le llega un vector de IDs como IdList
function deleteUsers(req,res){
    console.log('DELETE /api/user')

    User.find({ '_id': { $in: req.body.IdList}}, function(err, users){
        if(err)
            return res.status(500).send({message: `Error searching the users: ${err}`})

        if(users.length==0)
            return res.status(404).send({message: `There ase no users`});
        var notRemoved;
        for(var i=0;i<users.length;i++){
            users[i].remove(err => {
                if (err) notRemoved.push(users[i].name);
            })
        }
        if ((notRemoved==null)||(notRemoved.length===0)) return res.status(200).send({message: 'Users removed correctly'});
        else {
            var msg='';
            for(var i=0;i<notRemoved.length;i++) {
                msg=msg+notRemoved[i];
            }
            return res.status().send({message: `Error removing some users:${msg}`})
        }
    })
}

function updateUser(req,res){
    console.log('PUT /api/user/:userId')

    let userId = req.params.userId;
    let update = req.body;

    User.findByIdAndUpdate(userId,update,(err, userUpdated) => {
        if(err)
            return res.status(500).send({message: `Error updating the user: ${err}`})

        if(!userUpdated)
            return res.status(404).send({message: `User does not exist`})

        res.status(200).send({user: userUpdated})
    })
}


module.exports={
    signUp,
    signIn,
    getUser,
    getUsers,
    refreshToken,
    deleteUsers,
    updateUser
}
