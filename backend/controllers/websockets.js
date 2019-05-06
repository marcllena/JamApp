'use strict'

const socket = require('socket.io')
const services = require('../services')

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
    socket.on('chat1to1',function(message, dest){//send messages 1 to 1 musician
        //aqui he de fer que es comprovi que el desti estigui connectat
        //si ho esta, amb el nickname trobar l'id del usuari i trobarli el socket
            //enviarli el missatge
        //guardar els missatges a la conversa (creant una nova o sobreescribint) i la conversa a la BBDD(save o update)
        io.sockets.emit('chat1to1',message);
        console.log("Recibiendo y reenviando");
    });
});}
module.exports = websockets;