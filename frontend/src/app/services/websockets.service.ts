import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import {DataService} from './data.services'
@Injectable({
  providedIn: 'root'
})
export class WebsocketsService {

  socket
  messages = new Array()
  constructor(private singleton: DataService,) {
    this.socket = io.connect('http://localhost:3000') //S'ha de cnaviar a una variable per desplegar
    this.socket.on('chatInit', function(missages){
      console.log(missages)
      //Imprimir missatges, guardarlos a una variable singleton.
      this.messages = new Array()

      this.netejaMessages()

      this.pushIncomingMessage(missages);

    }.bind(this))
    this.socket.on('chat1to1', function(message){
      
      console.log("Rebent missatge")
      let fletxa = new Array();
      fletxa.push(message)
      this.pushIncomingMessage(fletxa);
    }.bind(this))
    this.socket.on('idUser', function(idUser){
        this.socket.idUser = idUser;
    }.bind(this))
  }
  init(){
    this.socket.emit('idUser',localStorage.getItem("token"))
    
  }
  netejaMessages(){
    this.messages = new Array()
  }
  pushIncomingMessage(message){

    let missatge
    for(let i=0;i<message.length;i++){
      if(message[i].from == this.socket.idUser){
        console.log("son iguals")
        missatge = {'from': "Myself", 'message': message[i].message}
      }
      else{
        if(typeof message[i].message == "undefined"){
          missatge = {'from': "Candidat", 'message': message[i]}
        }
        else{
        missatge = {'from': "Candidat", 'message': message[i].message}
        console.log("son diff")}
      }

      this.messages.push(missatge)
    }

  }
  pushMessage(message){
    let missatge = {'from': "Myself", 'message': message}
    this.messages.push(missatge);

  }
  getMessages(){
    return this.messages;
  }
  chatInit(dest: String){
    this.socket.emit('chatInit', dest);
  }
  sendMessage(dest: String, message: String){
    this.socket.emit('sendMessage', dest, message);
  }
}
