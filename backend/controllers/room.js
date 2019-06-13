'use strict'
/*
On estan implementades totes les operacions dels musics.
*/

const mongoose = require('mongoose')
const Room = require('../models/room')
const User = require('../models/user')
const service = require('../services')
const Group = require('../models/group')

const config = require('../config');
const Cryptr = require('cryptr');
const cryptr = new Cryptr(config.SECRET_TOKEN);2

function getRooms(req, res){
    console.log("GET /room");

    Room.find().collation({locale:'es',strength: 2}).sort({username:1})
        .then( (users) =>{

            if(users.length==0) return res.status(404).send({message: `User not found`});

            console.log(users);

            res.status(200).send(users);
    },(err)=>{
            return res.status(500).send({message: `Error searching the user: ${err}`});
        });
    /*
    User.find({userType: 'Room'},null,{ username: { $toLower: "$username" } }, (err,user)=>{
        if(err)
            return res.status(500).send({message: `Error searching the user: ${err}`});

        if(user==null) return res.status(404).send({message: `User not found`});

        console.log(user);

        res.status(200).send(user);
    })
    */
}



/*A la petició hi espero nom de l'usuari que vol crear el grup, nom del grup,
 estil/s que toquin i descripció,
la resta es farà en un altre mètode que sigui per editar el grup*/



module.exports={
    getRooms
}