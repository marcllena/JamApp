import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { User } from "../models/user";
import { Environment } from "./environment";

@Injectable({
  providedIn: 'root'
})
export class UserServices {

  environment: Environment;

  constructor(private http: HttpClient) {
    this.environment = new Environment();
  }

  obtainUsers() {
    return this.http.get(this.environment.urlUser + "getusers", {observe: 'response'})
  }

}
