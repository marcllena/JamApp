import { Injectable } from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {

  constructor(private router: Router) { }

  profile(){
    this.router.navigateByUrl('api/settings');
  }

  logOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('_id');
    this.router.navigateByUrl('');
  }
}
