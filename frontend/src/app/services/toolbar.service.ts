import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {DataService} from "./data.services";

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {

  private userId: string;
  private userName: string;

  constructor(private router: Router,private singleton: DataService) {
    this.singleton.newUserId.subscribe(userid => this.userId = userid);
    this.singleton.newUsername.subscribe(username => this.userName = username);
  }

  profile(){
    this.router.navigateByUrl('api/settings');
  }

  logOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('_id');
    this.router.navigateByUrl('');
  }

  getUserName(): string {
    return this.userName;
  }
}
