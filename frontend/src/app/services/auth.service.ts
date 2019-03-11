import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { User } from "../models/user";
import { Environment } from "./environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  environment: Environment;
  selectedUser: User;

  constructor(private http: HttpClient) {
    this.selectedUser = new User();
    this.environment = new Environment();
  }

  signup(user: User) {
    return this.http.post(this.environment.urlUser + "signup", user)
  }

  signin(user: User)  {
    return this.http.post(this.environment.urlUser + "signin", user)
  }
}
