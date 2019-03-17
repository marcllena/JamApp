import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {HttpClientModule} from '@angular/common/http';
import { User } from "../models/User";
import { Environment } from "./environment";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  environment: Environment;
  selectedUser: User;

  constructor(private http: HttpClient) {
    this.selectedUser = new User();
    this.environment = new Environment();
  }
}
