import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {

  //Clase per intercambiar parametres entre els components

  private originalParam = new BehaviorSubject("0");
  private originalChatDestination = new BehaviorSubject("0");
  private originalClickedUserId = new BehaviorSubject("0");
  newParam= this.originalParam.asObservable();
  newChatDestination = this.originalChatDestination.asObservable();
  newClickedUserId = this.originalClickedUserId.asObservable();

  constructor() { }



  changeStationName(name: string) {
    this.originalParam.next(name)
  }

  changeChatDestination(name: string) {
    this.originalChatDestination.next(name);
  }

  changeClickedUserId(name: string) {
    this.originalClickedUserId.next(name);
  }


}
