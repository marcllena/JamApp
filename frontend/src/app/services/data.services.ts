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
  private originalMusicsFilter = new BehaviorSubject(true);
  private originalSalesFilter = new BehaviorSubject(true);
  private originalDistanciaBooleanFilter = new BehaviorSubject(false);
  private originalDistanciaValueFilter= new BehaviorSubject(0);


  newChatDestination = this.originalChatDestination.asObservable();
  newClickedUserId = this.originalClickedUserId.asObservable();
  newUserId = this.originalUserId.asObservable();
  newUsername = this.originalUsername.asObservable();
  newMusicsFilter= this.originalMusicsFilter.asObservable();
  newSalesFilter= this.originalSalesFilter.asObservable();
  newDistanciaBooleanFilter= this.originalDistanciaBooleanFilter.asObservable();
  newDistanciaValueFilter= this.originalDistanciaValueFilter.asObservable();


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
  changeMusicsFilter(value: boolean){
    this.originalMusicsFilter.next(value)
  }
  changeSalesFilter(value: boolean){
    this.originalSalesFilter.next(value)
  }
  changeDistanciaBooleanFilter(value: boolean){
    this.originalDistanciaBooleanFilter.next(value)
  }
  changeDistanciaValueFilter(value: number){
    this.originalDistanciaValueFilter.next(value)
  }
  getMusicsFilter(){
    return this.originalMusicsFilter;
  }


}
