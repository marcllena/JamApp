'use strict'

const socket = require('socket.io')
const services = require('../services')
const Conversacion = require('../models/conversation')
const Musician = require('../models/musician')
var websockets = function websockets(server) {
    var io = socket(server);
io.on('connection',function(socket){
    
    socket.on('idUser', function(idUser){
        services.decodeToken(idUser).then(response =>{
            socket.idUser=response;
            //console.log('Conexion con el Socket: ', socket.idUser)
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
    });
    socket.on('sendMessage',function(dest, message){//send messages 1 to 1 musician
        //aqui he de fer que es comprovi que el desti estigui connectat
        //si ho esta, amb el nickname trobar l'id del usuari i trobarli el socket
            //enviarli el missatge
        //guardar els missatges a la conversa (creant una nova o sobreescribint) i la conversa a la BBDD(save o update)
        Musician.findOne({username: dest}, (err,user)=>{
            if(err) {
                console.log("Error al buscar music")
            }
            
            else if(user!=null){
                var online = -1;
                for(var i=0;i<io.sockets.connected;i++){
                    if(user._id == io.sockets.connected[i].idUser){
                        online = i;
                    }
                }
                if(online!=-1){
                    io.sockets.connected[online].emit("sendMessage", message)
                }
                //Falta guardar els missatges a una conversa.
                missatge =  {from: String = socket.idUser, message: String = message}
                Conversacion.findOne({participants: {"$all" : [socket.idUser, user._id]}}, (err, conv) => {
                    if(err) {
                        console.log("Error al buscar conversa")
                    }
                    else if(conv!=null){ //conversa trobat, buscar possible conversa
                        conv.messages.push(missatge)
                    }
                    else {//CONV no existent
                        newConv = new Conversacion({
                            participants: [],
                            messages: [],
                        })
                        newConv.participants.push(socket.idUser)
                        newConv.participants.push(user._id)
                        newConv.messages.push(missatge)
                    }
                    //Guardar conversa
                    newConv.save((err=> {
                        if(err) {
                            console.log("Error al guardar conversa");
                        }
                    }))
                    })
            }
        })
        io.sockets.emit('chat1to1',message);
        console.log("Recibiendo y reenviando");
    });
    socket.on('chatInit', function(dest){
        console.log("Iniciant chat")
        Musician.findOne({username: dest}, (err, user)=>{
            if(err) {
                    console.log("Error al buscar music")
                }
            else if(user!=null){ //usuari trobat, buscar possible conversa
                Conversacion.findOne({participants: {"$all" : [socket.idUser, user._id]}}, (err, conv) => {
                    if(err) {
                        console.log("Error al buscar conversa")
                    }
                    else if(conv!=null){ //usuari trobat, buscar possible conversa
                        io.sockets.emit('chatInit', conv.messages) //S'envien els missatges
                    }
                    else {//CONV no existent
                    }
                    })
            }
            else {//Usuari no trobat
            }
            })
    });
});}
module.exports = websockets;