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
  selectedUser: User;

  constructor(private http: HttpClient) {
    this.environment = new Environment();
  }

  obtainUser(token,userId) {
    const headers = {
      'Authorization': `Bearer ${token}`,
    }
    return this.http.get(this.environment.urlUser + "user/" + userId, {headers: headers,observe: 'response'})
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
    return this.http.get(this.environment.urlUser + "group/all", {headers: headers, observe: "response"})
  }

  obtainMyGroups(token){
    const headers = {
      'Authorization': `Bearer ${token}`,
    }
    return this.http.get(this.environment.urlUser + "group/mygroups", {headers: headers, observe: "response"})
  }

  requestMembership(token,req){
    const headers = {
      'Authorization': `Bearer ${token}`,
    }
    return this.http.post(this.environment.urlUser + "musician/requestMembership",req, {headers: headers,observe: 'response'})
  }

  answerRequest(token,req){
    const headers = {
      'Authorization': `Bearer ${token}`,
    }
    return this.http.post(this.environment.urlUser + "group/answerRequest",req, {headers: headers,observe: 'response'})
  }

  createGroup(token,group){
    const headers = {
      'Authorization': `Bearer ${token}`,
    }
    return this.http.post(this.environment.urlUser + "group/", group, {headers: headers,observe: 'response'})
  }

  getUserLocation(){
      return this.http.get("http://ip-api.com/json/", {observe: 'response'})
  }

  setLocation(token,coor) {
    const headers = {
      'Authorization': `Bearer ${token}`,
    }
    return this.http.post(this.environment.urlUser + "user/location/", coor,{headers: headers,observe: 'response'})
  }

  getLocation(token,id) {
    const headers = {
      'Authorization': `Bearer ${token}`,
    }
    return this.http.get(this.environment.urlUser + "user/"+id, {headers: headers,observe: 'response'})
  }

  getLocations() {

    return this.http.get(this.environment.urlUser + "user/location",{observe: 'response'})
  }

  getLocationsFiltered(token,filter) {
    const headers = {
      'Authorization': `Bearer ${token}`,
    }
    return this.http.post(this.environment.urlUser + "user/filter", filter,{headers: headers,observe: 'response'})
  }

  updateUser(token,user){
    const headers = {
      'Authorization': `Bearer ${token}`,
    }
    return this.http.put(this.environment.urlUser + "user/",user,{headers: headers, observe: 'response'});
  }

  linkWithFacebook(token, facebook){
    const headers = {
      'Authorization': `Bearer ${token}`,
    }
    let face = {'id': facebook}
    console.log("enviant id face: "+face)
    return this.http.post(this.environment.urlUser + "user/facebook/link", face,{headers: headers,observe: 'response'})
  }

  connectFacebook(facebook){
    let face = {'id': facebook}
    console.log("registrant vida facebook: "+face)
    return this.http.post(this.environment.urlUser + "user/facebook/connect", face, {observe: 'response'})
  }

  getUserGroups(token, userId){
    const headers = {
      'Authorization': `Bearer ${token}`,
    }
    return this.http.get(this.environment.urlUser + "musician/getGroups/"+userId,{headers: headers,observe: 'response'})
  }

  getRooms(token){
    const headers = {
      'Authorization': `Bearer ${token}`,
    }
    return this.http.get(this.environment.urlUser + "room/",{headers: headers,observe: 'response'})
  }
}
