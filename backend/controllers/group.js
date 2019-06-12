'use strict'
/*
On estan implementades totes les operacions dels musics.
*/

const mongoose = require('mongoose')
const Musician = require('../models/musician')
const User = require('../models/user')
const service = require('../services')
const Group = require('../models/group')



function createGroup(req, res) {
    //Musician.find({email: req.body.email}, (err,user)=>{ //canviar User per Musician!!!!
    console.log("creando grupo");
    let userId;
    if (req.params.userId) userId = cryptr.decrypt(req.params.userId);
    else userId = req.user;
    User.findById( userId, (err,user)=>{
        console.log("usuario encontrado");
        if(err) {
            return res.status(500).send({message: `Error en trobar usuari: ${err}`})
        }

        if(user==null) {
            console.log("El usuario no existe");
            return res.status(404).send({message: `El usuario no existe`})
        }
        else
        {
            if (user.userType!=='Musician') return res.status(403).send({message: 'Only a musician can create a group'});
            //if (req.body.email==null)
            Group.findOne({email: req.body.email}, (err, group)=>{
        if(group==null){
            if (!req.body.name) return res.status(400).send({message: 'Name field must be specified'});
            let newGroup;
            if (req.body.email&&req.body.description)
            newGroup = new Group({
                name: req.body.name,
                email: req.body.email, // El grup adopta el correu del creador fins que ell no n'espeficiqui un altre.
                description: req.body.description,
                latitud: req.body.latitud,
                longitud: req.body.longitud,
            });
            else{
                if (req.body.email)
                    newGroup = new Group({
                        name: req.body.name,
                        email: req.body.email,
                        description: "",
                        latitud: req.body.latitud,
                        longitud: req.body.longitud,
                    });
                else
                    newGroup = new Group({
                        name: req.body.name,
                        email: "",//null,
                        description: req.body.description,
                        latitud: req.body.latitud,
                        longitud: req.body.longitud,
                    });
            }

            //newGroup.integrants.push(user[0]);
            /*for(var i=0; i<req.body.styles.length;i++){
            newGroup.estils.push(req.body.styles[i])
            }*/
            if (req.body.estils) {
                for (var i = 0; i < req.body.estils.length; i++) {
                    newGroup.estils.push(req.body.estils[i])
                }
            }
            console.log(newGroup);
            newGroup.integrants.push(user);
            newGroup.save((err) => {
                
                if(err) {
                    console.log("Error al crear grup:"+req.body.name)
                    return res.status(500).send({message: `Error al crear el grup: ${err}`})
                }
                else { 
                    user.grups.push(newGroup);
                    user.save((err)=>{
                        if(err) {
                            console.log("Error al actualitzar usuari amb nou grup:")
                            return res.status(500).send({message: `Error al actualitzar el usuario: ${err}`})
                            }
                        else{
                        console.log("Grup creat correctament:")
                            return res.status(200).send({message: `Grup creat correctament`})
                        }
                        })
                }
            })
           
            
        }
        else{
            console.log("Email repetit")
                return res.status(409).send({message: `Correu repetit!`})
        }

        })
        }
    })
}

function answerRequest(req, res) {
    let idGrup;

    try {
        idGrup = cryptr.decrypt(req.body.idGrup);
    }
    catch(error) {
        return res.status(500).send({message: `Error on the ID`});
    }
    Group.findById(idGrup, (err, group)=>{
        console.log(group)
    if(group==null){
        return res.status(404).send({message: `Grup no trobat`})
    }
    else {
        //Buscar la request del usuari
        var trobat=-1;
        let userId;
        try {
            userId = cryptr.decrypt(req.body.id);
        }
        catch(error) {
            return res.status(500).send({message: `Error on the ID`});
        }

        for(var i=0; i<group.solicituds.length;i++){
            if(group.solicituds[i].id.toString() == userId){
                trobat = i;
                break
            }
        }
        if(trobat!=-1){
            console.log(req.body.decisio)
            if(req.body.decisio == true){
                group.integrants.push(group.solicituds[trobat].id)
                group.solicituds.splice(trobat,1);
                    group.save((err) => {
                        if(err) {
                            console.log("Error al guardar grup:"+req.body.name)
                            return res.status(500).send({message: `Error al guardar el grup: ${err}`})
                        }
                        else { 
                            return res.status(200).send({message: 'Usuari acceptat'})
                        }
                    })
            }
            else if(req.body.decisio == false){
                group.solicituds.splice(trobat,1);
                    group.save((err) => {
                        if(err) {
                            console.log("Error al guardar grup:")
                            return res.status(500).send({message: `Error al guardar el grup: ${err}`})
                        }
                        else { 
                            return res.status(200).send({message: 'Usuari rebutjat'})
                        }
                    })
            }
            else{return res.status(404).send({message: `Falta decisio!`})}
        }
        else{
            return res.status(404).send({message: `No tobada`})
        }
    }
})
}

function deleteMember(req,res) {
    let idGrup;

    try {
        idGrup = cryptr.decrypt(req.body.idGrup);
    }
    catch(error) {
        return res.status(500).send({message: `Error on the ID`});
    }

    Group.findById(idGrup, (err, group)=>{
        console.log(group)
if(group==null){
    return res.status(404).send({message: `Grup no trobat`})
}
else {
    var trobat=-1;
    let musicId;

    try {
        musicId = cryptr.decrypt(req.body.id);
    }
    catch(error) {
        return res.status(500).send({message: `Error on the ID`});
    }
    for(var i=0; i<group.integrants.length;i++){
        if(group.integrants[i].equals(musicId)){
            trobat = i;
            break
        }
    }
    if(trobat!=-1){

        group.integrants.splice(trobat,1)
        Musician.findById(musicId, (err, user)=>{
        if(err) {
                console.log("Error al buscar music")
                return res.status(500).send({message: `Error al buscar user: ${err}`})
            }
        if(user!=null){
            var trobat=-1;
        for(var i=0; i<user.grups.length;i++){
            if(user.grups[i]=== (idGrup)){
            trobat = i;
            break
            }
         }
         if(trobat!=1){
            user.grups.splice(trobat,1)
            user.save((err) => {
                if(err) {
                    console.log("Error al guardar usuari:"+req.body.name)
                    return res.status(500).send({message: `Error al guardar el usuari: ${err}`})
                }
                else { 
                   group.save((err) => {
                    if(err) {
                        console.log("Error al guardar grup:"+req.body.name)
                        return res.status(500).send({message: `Error al guardar el grup: ${err}`})
                    }
                    else { 
                        return res.status(200).send({message: 'Usuari eliminat del grup'})
                    }
                }) 
                }
            })
            
         }
         else{
             return res.status(404).send({message: 'Grup no trobat a la llista del usuari'})
         }
        }
    })
    }
    else{
        return res.status(404).send({message: 'Music no trobat a la llista del grup'})
    }
}
})
}

function editGroup(req,res){
    let idGrup;
    try {
        idGrup = cryptr.decrypt(req.body.id);
    }
    catch(error) {
        return res.status(500).send({message: `Error on the ID`});
    }

    Group.findById(idGrup, (err, group)=>{
        console.log(group)
if(group==null){
    return res.status(404).send({message: `Grup no trobat`})
}
else {
    if(req.body.name!=null){
        group.name=req.body.name
    }
    if(req.body.fotoGrup!=null){
        group.fotoGrup = req.body.fotoGrup
    }
    if(req.body.ubicacio!=null){
        group.ubicacio=req.body.ubicacio
    }
    if(req.body.description!=null){
        group.description=req.body.description
    }
    if(req.body.video!=null){
        group.video=req.body.video
    }
    if(req.body.estils.length!=0){
        group.estils = req.body.estils
    }
    group.save((err) => {
        if(err) {
            console.log("Error al guardar grup:"+req.body.name)
            return res.status(500).send({message: `Error al guardar el grup: ${err}`})
        }
        else { 
            return res.status(200).send({message: 'Grup editat correctament'})
        }
    }) 
}
})
}

function searchFiltered(req, res) {
    Group.find({}, (err,group)=>{
        if(req.body.estils!=null){
            //Aqui shan dimplementar filtres.
        }
        return res.status(200).send({message: 'Resultat de la cerca', group})
    })
}

function searchGroup(req,res) /*no esta el try and catch*/{
    Group.find({}, (err,groups)=>{
        let selectedGroups = [];
        let userId;
        if (req.params.userId) userId = cryptr.decrypt(req.params.userId);
        else userId = req.user;
        groups.forEach(group => {
            group.integrants.forEach(id =>{
                if(id == userId){
                    selectedGroups.push(group);
                }
            })
        });
        return res.status(200).send({message: 'Resultat de la cerca', selectedGroups})
    })
}


module.exports={
    createGroup,
    answerRequest,
    editGroup,
    deleteMember,
    searchFiltered,
    searchGroup
}
