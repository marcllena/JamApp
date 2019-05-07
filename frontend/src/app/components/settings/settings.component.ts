import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { NgForm} from '@angular/forms'
import { SettingsService } from 'src/app/services/settings.service';
import { UserServices } from 'src/app/services/user.services';
import { User } from 'src/app/models/user';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

declare var M: any;

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css','../../res/fonts/util.css','../../res/vendor/bootstrap/css/bootstrap.min.css','../../res/fonts/font-awesome-4.7.0/css/font-awesome.min.css',
  '../../res/fonts/iconic/css/material-design-iconic-font.min.css','../../res/vendor/animate/animate.css','../../res/vendor/css-hamburgers/hamburgers.min.css', '../../res/vendor/animsition/css/animsition.min.css',
  '../../res/vendor/select2/select2.min.css','../../res/vendor/daterangepicker/daterangepicker.css']
})
export class SettingsComponent implements OnInit {

  settingsForm: FormGroup;
  items1 = ["guitarra","piano","ukelele","triangle","pito","maraques","harmonica"]
  items2 = ["Regeton","Trap","Dembow"]

  constructor(private settingsService: SettingsService,private router: Router,private userServices: UserServices,private formBuilder: FormBuilder) {
    this.settingsForm = this.formBuilder.group({
      username:'',
      edat:0,
      instrument:[],
      estils:[]
    })
  }

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

  updateUser(user){
    this.userServices.updateUser = user;
  }

  logsito(){
    console.log(this.settingsForm.value.instrument);
  }

  logsito2(){
    console.log(this.settingsForm.value.estils);
  }

}
