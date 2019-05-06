import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import {DataService} from './data.services'
@Injectable({
  providedIn: 'root'
})
export class WebsocketsService {

  socket
  messages
  constructor(private singleton: DataService) {
    this.messages = new Array()
    this.socket = io.connect('http://localhost:3000') //S'ha de cnaviar a una variable per desplegar
    this.socket.on('chatInit', function(messages){
      //Imprimir missatges, guardarlos a una variable singleton.
      this.messages = messages;
    })
    this.socket.on('sendMessage', function(message){
      this.pushMessage(message);
    })
  }
  init(){
    this.socket.emit('idUser',localStorage.getItem("token"))
    
  }
  
  pushMessage(message){
    let missatge = {'from': this.socket.idUser, 'message': message}
    this.messages.push(message);
    console.log(this.messages)
  }
  getMessages(){
    return this.messages;
  }
  chatInit(dest: String ){
    this.socket.emit('chatInit', dest);
  }
  sendMessage(dest: String, message: String){
    this.socket.emit('sendMessage', dest, message);
  }
}
