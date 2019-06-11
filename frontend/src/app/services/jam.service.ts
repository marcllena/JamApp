import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Environment} from "./environment";
import {Jam} from "../models/jam";

@Injectable({
  providedIn: 'root'
})
export class JamService {

  environment: Environment;
  selectedJam: Jam;

  constructor(private http: HttpClient) {
    this.environment = new Environment();
  }

  obtainJams(token) {
    const headers = {
      'Authorization': `Bearer ${token}`,
    }
    return this.http.get(this.environment.urlUser + "jam", {headers: headers,observe: 'response'})
  }

  deleteJams(token,idsList) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${token}`,'Content-Type': 'application/json' }),
      body: idsList,

    };
    return this.http.delete(this.environment.urlUser + "jam",httpOptions)
  }

  createJam(token,jam){
    const headers = {
      'Authorization': `Bearer ${token}`,
    }
    return this.http.post(this.environment.urlUser + "jam/", jam, {headers: headers,observe: 'response'})
  }


}
