import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
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
  obtainUsers(token) {
    const headers = {
      'Authorization': `Bearer ${token}`,
    }
    return this.http.get(this.environment.urlUser + "user", {headers: headers,observe: 'response'})
  }
  deleteUsers(token,idsList) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${token}`,'Content-Type': 'application/json' }),
      body: idsList,

    };
    return this.http.delete(this.environment.urlUser + "user",httpOptions)
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
  getUserLocation(){
      return this.http.get("http://ip-api.com/json/", {observe: 'response'})
    }
}
