'use strict'

const socket = require('socket.io')
const services = require('../services')

var websockets = function websockets(server) {
    console.log("websockets")
    var io = socket(server);
io.on('connection',function(socket){
    
    socket.on('idUser', function(idUser){
        services.decodeToken(idUser).then(response =>{
            socket.idUser=response;
            console.log('Conexion con el Socket: ', socket.idUser)
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
        console.log('Usuario desconectado: '+socket.idUser);
            /*var allConnectedClients = io.sockets.connected; //list os socket connected
            var send = []
            Object.keys(allConnectedClients).forEach(function(key){
                var val = allConnectedClients[key]["nickname"] + " " + allConnectedClients[key]["id"] ;
                send.push(val);
            });
    
            io.sockets.emit('user',send);//send to connected socket*/
    });
    socket.on('chat',function(message, name, type, dest){//send messages
        io.sockets.emit('chat',message, name,  type, dest);
        console.log("Recibiendo y reenviando");
    });
});}
module.exports = websockets;