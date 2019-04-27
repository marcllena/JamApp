import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { User } from "../models/user";
import { Environment } from "./environment";
import { Group } from "../models/group";

@Injectable({
  providedIn: 'root'
})
export class UserServices {

  environment: Environment;

  constructor(private http: HttpClient) {
    this.environment = new Environment();
  }
  obtainUsers() {
    return this.http.get(this.environment.urlUser + "user", {observe: 'response'})
  }

  obtainGroups(token){
    const headers = {
      'Authorization': `Bearer ${token}`,
    }
    return this.http.get(this.environment.urlUser + "group", {headers: headers, observe: "response"})
  }

  requestMemberShip(){
    return this.http.post(this.environment.urlUser + "musician/requestMembership", {observe: 'response'})
  }

  createGroup(group: Group){
    return this.http.post(this.environment.urlUser + "musician/groups/add", group, {observe: 'response'})
  }
}
