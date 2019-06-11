import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
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

}
