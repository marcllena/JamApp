'use strict'

/*
On estan implementades totes les operacions dels usuaris. Així, aqui s'accedeix a la base de dades, i es conecta amb Node JS
Al registrar o fer login, se'ns proporciona un token que s'utilitza en les operacions registrades
*/

const mongoose = require('mongoose');
const User = require('../models/user');
const Musician = require('../models/musician');
const Admin = require('../models/admin');
const Room = require('../models/room');
const Point = require('../models/point');

const service = require('../services');
const config = require('../config');
const Cryptr = require('cryptr');
const cryptr = new Cryptr(config.SECRET_TOKEN);


//registre, rep al body els parametres de nom, password i email
// a més, el camp userType 0 si user, 1 si music, 2 si sala, 3 si admin
function signUp(req,res) {
    let userNew;
    let point;
    console.log(req.body);
    switch (req.body.userType){

        case 0://cas usuari
            userNew = new User({
                email: req.body.email,
                username: req.body.username,
                password: req.body.password
            });
            break;

        case 1://cas music
            point = new Point({
                type: "Point",
                coordinates: [null,null],
            });
            userNew = new Musician({
                email: req.body.email,
                username: req.body.username,
                password: req.body.password,
                location: point,
                latitud: null,
                longitud: null,

            });
            break;

        case 2://cas sala
            point = new Point({
                type: "Point",
                coordinates: [null,null],
            });

            userNew = new Room({
                email: req.body.email,
                username: req.body.username,
                password: req.body.password,
                location: point,
                latitud: null,
                longitud: null
            });
            break;

        case 3://cas admin per crear admin s'ha de incorporar el camp pass amb un password conegut pels admins
            if ((req.body.pass)&&(req.body.pass==='password')) {
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
            });
            break;
    }
    //console.log(userNew);
    console.log("Petició de SignUp del seguent user: "+userNew.email);
    if(req.body.password==null)
        return res.status(500).send({message: `Rellena el campo password`});
    User.find({email: req.body.email}).lean().exec(function(err, user) {
        console.log(user);
        if(err){
            return res.status(500).send({message: `Error al crear el usuario: ${err}`})}
        if (!user.length){
            userNew.save((err,newUser) => {
                if(err) {
                    console.log("Error al crear usuari:"+req.body.email+". Ja existeix un usuari amb el correu");
                    return res.status(409).send({message: `Error al crear el usuario: ${err}`})
                }
        console.log("Usuari: "+req.body.email+" agregat correctament");
                if("userType" in newUser) {
                    res.status(200).send({
                        message: "Register successfuly",
                        token: service.createToken(newUser),
                        _id: cryptr.encrypt(newUser._id),
                        username: newUser.username,
                        userType: newUser.userType,
                    });
                }
                else res.status(200).send({
                    message: "Register successfuly",
                    token: service.createToken(newUser),
                    _id: cryptr.encrypt(newUser._id),
                    username: newUser.username,
                    userType: "User",
                })
    } )     }
        else 
            return res.status(409).send({message: `Email ya registrado`})
    })
}

function signIn(req,res) {
    console.log("Petició de SignIn del seguent user:"+req.body.email);
    User.find({email: req.body.email}, (err,user)=>{

        if(err) {
            console.log("Error en el logging");
            return res.status(404).send({message: `Error en el logging: ${err}`})
        }

        if(!user.length) {
            console.log("El usuario no existe");
            return res.status(404).send({message: `El usuario no existe`})
        }

        user[0].comparePassword((req.body.password), function(err, isMatch) {
            //if (err) throw err;
            if(isMatch) {
                console.log("Login Correcte " );
                if("userType" in user[0])
                res.status(200).send({
                    message: "Te has logeado correctamente",
                    token: service.createToken(user[0]),
                    _id: cryptr.encrypt(user[0]._id),
                    username: user[0].username,
                    userType: user[0].userType,
                })
                else res.status(200).send({
                    message: "Te has logeado correctamente",
                    token: service.createToken(user[0]),
                    _id: cryptr.encrypt(user[0]._id),
                    username: user[0].username,
                    userType: "User",
                })
            } else {
                console.log("Password Incorrecte");
                return res.status(404).send({message: `Wrong password`});
            }

        });
    }).select('+password');
}

function getUser(req,res) {
    let Id;
    try {
        Id = cryptr.decrypt(req.params.userId);
    }
    catch(error) {
        return res.status(500).send({message: `Error on the ID`});
    }

    User.findById(Id, (err,user)=>{
        console.log(user);
        if(err)
            return res.status(500).send({message: `Error searching the user: ${err}`});
        res.status(200).send(user);
    });
}

function getUsers(req,res) {
    User.find( (err,users)=>{
        console.log("Peticio per obtindre tots els usuaris");
        if(err)
            return res.status(500).send({message: `Error en el logging: ${err}`});
        res.status(200).send(users);
    });
}

function refreshToken(req,res) {
    User.findById(req.user).lean().exec(function (err, user) {
        if (err)
            return res.status(500).send({message: `Error refreshing token: ${err}`});
        if (!user){
            return res.status(404).send({message: `Incorrect ID`})
        }

        console.log("Login Correcte, Token Validat");

        if("userType" in user)
            res.status(200).send({
                message: "Te has logeado correctamente",
                token: service.createToken(user),
                _id: cryptr.encrypt(user._id),
                username: user.username,
                userType: user.userType,
            });
        else res.status(200).send({
            message: "Te has logeado correctamente",
            token: service.createToken(user),
            _id: cryptr.encrypt(user._id),
            username: user.username,
            userType: "User",
        })
    })

}//200 si ok 404 si no hi ha user o hi ha un error (igual que al login)

//le llega un vector de IDs como IdList
function deleteUsers(req,res){
    console.log('DELETE /api/user');
    let llistaId=req.body.IdList;
    for(var i=0; i<req.body.IdList.length; i++){
        try {
            llistaId[i]= cryptr.decrypt(req.body.IdList[i]);
        }
        catch(error) {
            return res.status(500).send({message: `Error on the ID`});
        }
    }
    User.find({ '_id': { $in: llistaId}}, function(err, users){
        if(err)
            return res.status(500).send({message: `Error searching the users: ${err}`});

        if(users.length==0)
            return res.status(404).send({message: `There are no users`});
        var notRemoved;
        for(var i=0;i<users.length;i++){
            users[i].remove(err => {
                if (err) notRemoved.push(users[i].name);
            })
        }
        //if (notRemoved==undefined) return res.status(200).send({message: 'Users removed correctly'});
        if ((notRemoved==undefined)||(notRemoved.length==0)) return res.status(200).send({message: 'Users removed correctly'});
        else {
            var msg='';
            for(var i=0;i<notRemoved.length;i++) {
                msg=msg+notRemoved[i];
            }
            return res.status(206).send({message: `Error removing some users:${msg}`})
        }
    })
}

function updateUser(req,res){
    console.log('PUT /api/user/:userId');

    console.log(req.body);

    let userId;
    if (req.params.userId) {
        try {
            userId = cryptr.decrypt(req.params.userId);
        }
        catch(error) {
            return res.status(500).send({message: `Error on the ID`});
        }
    }
    else userId = req.user;
    
    let update = req.body;

    Musician.findByIdAndUpdate(userId,update,{new: true}, (err, userUpdated) => {
        if(err)
            return res.status(500).send({message: `Error updating the user: ${err}`});

        if(!userUpdated)
            return res.status(404).send({message: `User does not exist`});
        res.status(200).send({user: userUpdated})
    })
}

function setLocation(req,res){
    let userId;
    if (req.params.userId) {
        try {
            userId = cryptr.decrypt(req.params.userId);
        }
        catch(error) {
            return res.status(500).send({message: `Error on the ID`});
        }
    }
    else userId = req.user;
    User.findById(userId, (err,user)=>{
        if(err)
            return res.status(500).send({message: `Error searching the user: ${err}`});
        if(user==null) return res.status(404).send({message: `User not found`});
        let point = new Point({
            type: "Point",
            coordinates: [req.body.longitud,req.body.latitud],
        });
        user.location=point;
        user.latitud=req.body.latitud;
        user.longitud=req.body.longitud;
        user.save((err,userStored) => {
            if(err)
                return res.status(500).send({message: `Error saving changes: ${err}`});
            return res.status(200).send({user: userStored});
        });
    });
}

function getUsersLocation(req,res){
    Musician.find({}, '_id username latitud longitud location', (err,musicians)=>{
        if(err)
            return res.status(500).send({message: `Error searching musicians: ${err}`});

        Room.find({}, '_id name latitud longitud location', (err,rooms)=>{
            if(err)
                return res.status(500).send({message: `Error searching rooms: ${err}`});

            res.status(200).send({
                musicians: musicians,
                rooms: rooms
            });
        });
    });
}

function filterDistance(req,res){
    let longitud,latitud,distancia;
    User.findById(req.user, (err,user)=> {
        if(user.location) {
            longitud = user.location.coordinates[0];
            latitud = user.location.coordinates[1];
        }
        else return res.status(400).send({message: "User without location"});
        distancia=req.body.distance;
        if (!req.body.musician||!req.body.room){
            req.body.musician=true;
            req.body.room=true;
        }
        if(req.body.musician==true) {
            Musician.find({location: {$geoWithin: {$centerSphere: [[longitud, latitud], distancia / 6371]}}}, '_id username latitud longitud location', (err, musicians) => {
                if (err)
                    return res.status(500).send({message: `Error searching musicians: ${err}`});
                if (req.body.room==true) {
                    Room.find({location: {$geoWithin: {$centerSphere: [[longitud, latitud], distancia / 6371]}}}, '_id name latitud longitud location', (err, rooms) => {
                        if (err)
                            return res.status(500).send({message: `Error searching rooms: ${err}`});
                            res.status(200).send({
                                musicians: musicians,
                                rooms: rooms
                            });
                    });
                }
                else{
                    res.status(200).send({
                        musicians: musicians
                    });
                }
            });
        }
        else{
            Room.find({location: {$geoWithin: {$centerSphere: [[longitud, latitud], distancia / 6371]}}}, '_id name latitud longitud location', (err, rooms) => {
                if (err)
                    return res.status(500).send({message: `Error searching rooms: ${err}`});
                res.status(200).send({
                    rooms: rooms
                });
            });
        }
    });
}


module.exports={
    signUp,
    signIn,
    getUser,
    getUsers,
    refreshToken,
    deleteUsers,
    updateUser,
    setLocation,
    getUsersLocation,
    filterDistance
};
