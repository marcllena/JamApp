import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
@Injectable({
  providedIn: 'root'
})
export class WebsocketsService {

  socket
  constructor() {}
  init(){
    this.socket = io.connect('http://localhost:3000') //S'ha de cnaviar a una variable per desplegar
    this.socket.emit("idUser",localStorage.getItem("token"))
  }
  chat1to1(message: String, dest: String ){
    this.socket.emit("chat1to1", message, dest);
  }
}
