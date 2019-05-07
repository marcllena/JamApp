import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import {DataService} from './data.services'
@Injectable({
  providedIn: 'root'
})
export class WebsocketsService {

  socket
  messages
  constructor(private singleton: DataService,) {
    let hola
    this.messages = new Array()
    this.socket = io.connect('http://localhost:3000') //S'ha de cnaviar a una variable per desplegar
    this.socket.on('chatInit', function(messages){
      //Imprimir missatges, guardarlos a una variable singleton.
      console.log(messages)
      this.pushIncomingMessage(messages);
    }.bind(this))
    this.socket.on('chat1to1', function(message){
      
      console.log("Rebent missatge")
      this.pushMessage(message);
    }.bind(this))
  }
  init(){
    this.socket.emit('idUser',localStorage.getItem("token"))
    
  }
  pushIncomingMessage(message){
    console.log(message.length)
    let missatge
    for(let i=0;i<message.length;i++){
      
      if(message[i].from == this.socket.idUser){
        missatge = {'from': "Myself", 'message': message[i].message}
      }
      else{
        missatge = {'from': "Candidat", 'message': message[i].message}
      }
      this.messages.push(missatge)
    }
  }
  pushMessage(message){
    let missatge = {'from': "Myself", 'message': message}
    this.messages.push(missatge);
    console.log(this.messages)
  }
  getMessages(){
    return this.messages;
  }
  chatInit(dest: String ){
    this.socket.emit('chatInit', dest);
  }
  sendMessage(dest: String, message: String){
    console.log("HEDEPASARPERAKI")
    this.socket.emit('sendMessage', dest, message);
  }
}
