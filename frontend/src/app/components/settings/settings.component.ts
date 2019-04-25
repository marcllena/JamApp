import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { NgForm} from '@angular/forms'
import { SettingsService } from 'src/app/services/settings.service';
import { User } from 'src/app/models/user';

declare var M: any;

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private settingsService: SettingsService,private router: Router) { }

  ngOnInit() {
  }

  addUser(form: NgForm){
    if(form.value._id){

    }
  }

  getUsers(){ //Aquesta funcio ja no fa falta, es fa al component userlist
    this.settingsService.getUsers()
    .subscribe(res =>{
      this.settingsService.users = res as User[];
      console.log(res);
    })
  }

  editUser(user: User){
    this.settingsService.selectedUser = user;
  }

  resetForm(form?: NgForm){
    if(form){
      form.reset();
      this.settingsService.selectedUser = new User();
    }
  }

  goBack() {
    localStorage.removeItem('token');
    localStorage.removeItem('_id');
    this.router.navigateByUrl('');
  }

}
