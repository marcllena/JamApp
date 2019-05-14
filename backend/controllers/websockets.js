'use strict'

const socket = require('socket.io')
const services = require('../services')
const Conver = require('../models/conversation')
const Musician = require('../models/musician')
const User = require('../models/user')

var websockets = function websockets(server) {
    var io = socket(server);
io.on('connection',function(socket){
    
    socket.on('idUser', function(idUser){
        services.decodeToken(idUser).then(response =>{
            socket.idUser=response;
            User.findById(response, (err,user)=>{
                if(err){
                    console.log("error al buscar music")
                }
                else{
                    socket.nickname = user.username
                }
            })
            console.log('Conexion con el Socket: ', socket.idUser);
            socket.emit('idUser', response)
            next()
        })
        .catch(response=>{
        

        })
        
        /*var allConnectedClients = io.sockets.connected; //list os socket connected
        var send = []
        Object.keys(allConnectedClients).forEach(function(key){
            var val = allConnectedClients[key]["nickname"] + " " + allConnectedClients[key]["id"] ;
            send.push(val);
        });

        io.sockets.emit('user',send);//send to connected socket
        console.log("Enviando lista de usuarios: "+send);*/
    });
    socket.on('disconnect', function(){
            /*var allConnectedClients = io.sockets.connected; //list os socket connected
            var send = []
            Object.keys(allConnectedClients).forEach(function(key){
                var val = allConnectedClients[key]["nickname"] + " " + allConnectedClients[key]["id"] ;
                send.push(val);
            });
    
            io.sockets.emit('user',send);//send to connected socket*/
            console.log('desonexion con el Socket: ', socket.idUser)
    });
    socket.on('sendMessage',function(dest, message){//send messages 1 to 1 musician
        //aqui he de fer que es comprovi que el desti estigui connectat
        //si ho esta, amb el nickname trobar l'id del usuari i trobarli el socket
            //enviarli el missatge
        //guardar els missatges a la conversa (creant una nova o sobreescribint) i la conversa a la BBDD(save o update)
        User.findOne({username: dest}, (err,user)=>{
            if(err) {
                console.log("Error al buscar music")
            }
            
            else if(user!=null){
                var online = -1;
                console.log(Object.keys(io.sockets.connected).length)
                for(var i=0;i<Object.keys(io.sockets.connected).length;i++){
                    console.log(io.sockets.connected[Object.keys(io.sockets.connected)[i]].idUser + "///" + user._id )
                    if(user._id == io.sockets.connected[Object.keys(io.sockets.connected)[i]].idUser){
                        online = i;
                    }
                }
                if(online!=-1){
                    io.sockets.connected[Object.keys(io.sockets.connected)[online]].emit("chat1to1", message, socket.nickname)
                }
                //Falta guardar els missatges a una conversa.
                let missatge =  {from: /*String =*/ socket.idUser, message: /*String =*/ message}
                Conver.findOne({participants: {"$all" : [socket.idUser, user._id]}}, (err, conv) => {
                    if(err) {
                        console.log("Error al buscar conversa")
                    }
                    else if(conv!=null){ //conversa trobat, buscar possible conversa
                        conv.messages.push(missatge)
                        conv.save((err)=> {
                            if(err) {
                                console.log("Error al guardar conversa");
                            }
                        })
                    }
                    else {//CONV no existent
                        let newConv = new Conver();
                        newConv.participants.push(socket.idUser)
                        newConv.participants.push(user._id)
                        newConv.messages.push(missatge)
                        console.log(newConv)
                        newConv.save((err) => {
                            if(err) {
                                console.log("Error ");
                            }
                    console.log(" agregat correctament");
                } )
                    }
                   
                    
                    })
                     console.log("Recibiendo y reenviando");
            }
        })
        
    });
    socket.on('chatInit', function(dest){
        console.log("Iniciant chat" + dest)
        User.findOne({username: dest}, (err, user)=>{
            if(err) {
                    console.log("Error al buscar music")
                }
            else if(user!=null){ //usuari trobat, buscar possible conversa
                console.log(socket.idUser+"///"+ user._id)
                Conver.findOne({participants: {"$all" : [socket.idUser, user._id]}}, (err, conv) => { // POTSER NO FA BE LA BUSQUEDA, DEMA HO PROVO
                    if(err) {
                        console.log("Error al buscar conversa")
                    }
                    else if(conv!=null){ //usuari trobat, buscar possible conversa
                        socket.emit('chatInit', conv.messages) //S'envien els missatges
                    }
                    else {//CONV no existent
                        console.log("shem conversa")
                        socket.emit('chatInit', "")
                    }
                    })
            }
            else {//Usuari no trobat
            }
            })
    });
    socket.on('conversations',function(token){
        var array = []
        services.decodeToken(token).then(response =>{
            
            var destination;
            Conver.find({'participants': {$in:response}}, (err,convers)=>{ //No tinc clar si busca be, pero ja tira...
                if(err) {
                    console.log("Error al buscar")
                }
                else{
                    
                for(var i=0;i<convers.length;i++){
                    let messages = [];
                    for(let k=0;k<convers[i].messages.length;k++){
                        messages.push(convers[i].messages[k])
                     }
                    for(var j=0;j<convers[i].participants.length;j++){
                    if(convers[i].participants[j] != response){
                        
                        User.findById(convers[i].participants[j], (err, user)=>{
                            if(err) {
                                console.log("Error al buscar")
                            }
                            else{
                                destination = user.username;
                                array.push({'destination': destination, 'conversation': messages})
                                if(i == convers.length){ //no estic 100% que sigui ==, hauria de ser i<
                                    console.log(array)
                                    socket.emit('conversations', array)
                                }
                        }})
                     
            }
            }
            
             
            
            }
            //Això s'executa abans que les linies 160, etc... hauria dexecutar-se despres.
            
        }
            
            })
            
            next()
        })
        .catch(response=>{
        

        })
    });
});}
module.exports = websockets;