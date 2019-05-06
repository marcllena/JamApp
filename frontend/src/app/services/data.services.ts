import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {

  //Clase per intercambiar parametres entre els components

  private originalParam = new BehaviorSubject("0");
  newParam= this.originalParam.asObservable()

  constructor() { }


  changeStationName(name: string) {
    this.originalParam.next(name)
  }


}
