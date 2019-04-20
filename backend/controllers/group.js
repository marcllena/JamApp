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
    Musician.find({email: req.body.email}, (err,user)=>{ //canviar User per Musician!!!!

        if(err) {
            return res.status(500).send({message: `Error en trobar usuari: ${err}`})
        }

        if(!user.length) {
            console.log("El usuario no existe")
            return res.status(404).send({message: `El usuario no existe`})
        }
        else
        {
            Group.findOne({email: req.body.email}, (err, group)=>{
        if(group==null){
            const newGroup = new Group({
                name: req.body.name,
                email: user[0].email, // El grup adopta el correu del creador fins que ell no n'espeficiqui un altre.
                description: req.body.description
            });
            newGroup.integrants.push(user[0]);
            for(var i=0; i<req.body.styles.length;i++){
            newGroup.estils.push(req.body.styles[i])
            }
            newGroup.save((err) => {
                if(err) {
                    console.log("Error al crear grup:"+req.body.name)
                    return res.status(500).send({message: `Error al crear el grup: ${err}`})
                }
                else { 
                    user[0].grups.push(newGroup);
                    user[0].save((err)=>{
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
    Group.findById(req.body.id, (err, group)=>{
        console.log(group)
if(group==null){
    return res.status(404).send({message: `Grup no trobat`})
}
else {
    //Buscar la request del usuari
    var trobat=-1;
    for(var i=0; i<group.solicituds.length;i++){
        if(group.solicituds[i].id.equals(req.body.id)){
            trobat = i;
            break
        }
    }
    if(trobat!=-1){
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
        if(req.body.decisio == false){
            group.solicituds.splice(trobat,1);
                group.save((err) => {
                    if(err) {
                        console.log("Error al guardar grup:"+req.body.name)
                        return res.status(500).send({message: `Error al guardar el grup: ${err}`})
                    }
                    else { 
                        return res.status(200).send({message: 'Usuari rebutjat'})
                    }
                })
        }
    }
    else{
        return res.status(404).send({message: `Request no trobada`})
    }
}
})
}
function deleteMember(req,res) {
    Group.findById(req.body.idGrup, (err, group)=>{
        console.log(group)
if(group==null){
    return res.status(404).send({message: `Grup no trobat`})
}
else {
    var trobat=-1;
    for(var i=0; i<group.integrants.length;i++){
        if(group.integrants[i].equals(req.body.id)){
            trobat = i;
            break
        }
    }
    if(trobat!=-1){
        group.integrants.splice(trobat,1)
        Musician.findById(req.body.id, (err, user)=>{
        if(err) {
                console.log("Error al buscar music")
                return res.status(500).send({message: `Error al buscar user: ${err}`})
            }
        if(user!=null){
            var trobat=-1;
        for(var i=0; i<user.grups.length;i++){
            if(user.grups[i]=== (req.body.idGrup)){
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
    Group.findById(req.body.id, (err, group)=>{
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

module.exports={
    createGroup,
    answerRequest,
    editGroup,
    deleteMember
}