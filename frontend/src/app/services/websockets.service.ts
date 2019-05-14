import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import {DataService} from './data.services'
import {Environment} from "./environment";
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class WebsocketsService {

  environment: Environment;

  socket
  messages = new Array()
  destination
  private originalChats = new BehaviorSubject([]);
  newChats = this.originalChats.asObservable();
  constructor(private singleton: DataService,) {
    this.singleton.newChatDestination.subscribe(destination => this.destination = destination)
    this.socket = io.connect('http://localhost:3000') //S'ha de cnaviar a una variable per desplegar
    this.socket.on('chatInit', function(missages){
      console.log(missages)
      //Imprimir missatges, guardarlos a una variable singleton.
      this.messages = new Array()

      this.netejaMessages()

      this.pushIncomingMessage(missages);

    }.bind(this))
    this.socket.on('chat1to1', function(message, origin){
      
      console.log("Rebent missatge")
      let fletxa = new Array();
      fletxa.push(message)
      console.log(message, origin, this.destination)
      this.pushIncomingMessage(fletxa, origin);
    }.bind(this))
    this.socket.on('idUser', function(idUser){
        this.socket.idUser = idUser;
    }.bind(this))
    this.socket.on('conversations', function(array){
      this.originalChats.next(array);
      console.log("Resultat dels xats: "+JSON.stringify(array))
    }.bind(this))
  }
  init(){
    this.socket.emit('idUser',localStorage.getItem("token"))
    
  }
  netejaMessages(){
    this.messages = new Array()
  }
  pushIncomingMessage(message, origin){
      //Falta distingir qui envia el missatge, perque si no es qui toca, safageix igual º
    let missatge
    for(let i=0;i<message.length;i++){
      if(message[i].from == this.socket.idUser){
        console.log("son iguals")
        missatge = {'from': "jo", 'message': message[i].message}
        this.messages.push(missatge)
      }
      else{
        if(typeof message[i].message == "undefined" && origin == this.destination){
          missatge = {'from': this.destination, 'message': message[i]}
          this.messages.push(missatge)
        }
        else if(typeof message[i].message != "undefined"){
        missatge = {'from': this.destination, 'message': message[i].message}
        this.messages.push(missatge)}
      }

      
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
    console.log(dest)
  }
  sendMessage(dest: String, message: String){
    this.socket.emit('sendMessage', dest, message);
  }
  conversations(){
    console.log("enviant request de chats")
    this.socket.emit('conversations', localStorage.getItem("token"));
  }
}
