import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {

  //Clase per intercambiar parametres entre els components
  private originalParam = new BehaviorSubject("0");
  private originalChatDestination = new BehaviorSubject("0");
  private originalClickedUserId = new BehaviorSubject("0");
  private originalUserId = new BehaviorSubject("0");
  private originalUsername = new BehaviorSubject("Null");

  newChatDestination = this.originalChatDestination.asObservable();
  newClickedUserId = this.originalClickedUserId.asObservable();
  newUserId = this.originalUserId.asObservable();
  newUsername = this.originalUsername.asObservable();


  constructor() { }


  changeUserId(name: string) {
    this.originalUserId.next(name);
  }

  changeUsername(name: string) {
    this.originalUsername.next(name);
  }

  changeChatDestination(name: string) {
    this.originalChatDestination.next(name);
  }

  changeClickedUserId(name: string) {
    this.originalClickedUserId.next(name);
  }


}
