import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {Group} from '../models/group'
import { Jam } from '../models/jam';
@Injectable()
export class DataService {

  //Clase per intercambiar parametres entre els components
  private originalParam = new BehaviorSubject("0");
  private originalChatDestination = new BehaviorSubject("0");
  private originalClickedUserId = new BehaviorSubject("0");
  private originalClickedSalaId = new BehaviorSubject("0");
  private originalUserId = new BehaviorSubject("0");
  private originalUsername = new BehaviorSubject("");
  private originalMusicsFilter = new BehaviorSubject(true);
  private originalSalesFilter = new BehaviorSubject(true);
  private originalDistanciaBooleanFilter = new BehaviorSubject(false);
  private originalDistanciaValueFilter= new BehaviorSubject(0);
  private originalGroupName = new BehaviorSubject("Null");
  private originalGroupMail = new BehaviorSubject("Null");
  private originalGroupDescription = new BehaviorSubject("Null");
  private originalGroupEstils = new BehaviorSubject("Null");
  private originalFacebookId = new BehaviorSubject(false);
  private originalGroupDetails = new BehaviorSubject(new Group('', '','', 0,0,[]));
  private originalClickedJamId = new BehaviorSubject("0");
  private originalJamDetails = new BehaviorSubject(new Jam());

  newChatDestination = this.originalChatDestination.asObservable();
  newClickedUserId = this.originalClickedUserId.asObservable();
  newUserId = this.originalUserId.asObservable();
  newUsername = this.originalUsername.asObservable();
  newMusicsFilter= this.originalMusicsFilter.asObservable();
  newSalesFilter= this.originalSalesFilter.asObservable();
  newDistanciaBooleanFilter= this.originalDistanciaBooleanFilter.asObservable();
  newDistanciaValueFilter= this.originalDistanciaValueFilter.asObservable();
  newGroupName=this.originalGroupName.asObservable();
  newGroupMail=this.originalGroupMail.asObservable();
  newGroupDescription=this.originalGroupDescription.asObservable();
  newGroupEstils=this.originalGroupEstils.asObservable();
  newFacebookId=this.originalFacebookId.asObservable();
  newClickedSalaId = this.originalClickedSalaId.asObservable();
  newGroupDetails = this.originalGroupDetails.asObservable();
  newClickedJamId = this.originalClickedJamId.asObservable();
  newJamDetails = this.originalJamDetails.asObservable();

  constructor() { }

  changeGroupDetails(group){
    this.originalGroupDetails.next(group)
  }
  changeJamDetails(jam){
    this.originalJamDetails.next(jam)
  }
  changeClickedSalaId(name: string){
    this.originalClickedSalaId.next(name)
  }
  changeFacebookId(id: any) {
    this.originalFacebookId.next(id);
  }
  changeUserId(name: string) {
    this.originalUserId.next(name);
  }

  changeClickedJamId(id: any) {
    this.originalClickedJamId.next(id);
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
  changeGroupName(value: string){
    this.originalGroupName.next(value)
  }
  changeGroupMail(value: string){
    this.originalGroupMail.next(value)
  }
  changeGroupDescription(value: string){
    this.originalGroupDescription.next(value)
  }
  changeGroupEstils(value: string){
    this.originalGroupEstils.next(value)
  }

  getMusicsFilter(){
    return this.originalMusicsFilter;
  }


}
