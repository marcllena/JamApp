'use strict'
/*
On estan implementades totes les operacions dels musics.
*/

const mongoose = require('mongoose')
const Musician = require('../models/musician')
const User = require('../models/user')
const service = require('../services')
const Group = require('../models/group')

function signUp(req,res) {
    const musician = new Musician({
        email: req.body.email,
        displayName: req.body.displayName,
        instrument: req.instrument
    })

    musician.save((err) => {
        if(err)
            return res.status(500).send({message: `Error al crear el usuario: ${err}`})


        res.status(200).send({token: service.createToken(user)})
    })
}

/*A la petició hi espero nom de l'usuari que vol crear el grup, nom del grup,
 estil/s que toquin i descripció,
la resta es farà en un altre mètode que sigui per editar el grup*/
function createGroup(req, res) {
    User.find({email: req.body.email}, (err,user)=>{ //canviar User per Musician!!!!

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
                console.log(group)
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
                    //user[0].grups.push(newGroup);
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

module.exports={
    signUp,
    createGroup/*,
    signIn*/
}