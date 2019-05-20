import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { NgForm} from '@angular/forms'
import { SettingsService } from 'src/app/services/settings.service';
import { UserServices } from 'src/app/services/user.services';
import { User } from 'src/app/models/user';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {DataService} from '../../services/data.services';

declare var M: any;

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css','../../res/fonts/util.css','../../res/vendor/bootstrap/css/bootstrap.min.css','../../res/fonts/font-awesome-4.7.0/css/font-awesome.min.css',
  '../../res/fonts/iconic/css/material-design-iconic-font.min.css','../../res/vendor/animate/animate.css','../../res/vendor/css-hamburgers/hamburgers.min.css', '../../res/vendor/animsition/css/animsition.min.css',
  '../../res/vendor/select2/select2.min.css','../../res/vendor/daterangepicker/daterangepicker.css']
})
export class SettingsComponent implements OnInit {

  Id: String;
  user: Object;

  settingsForm: FormGroup;
  items1 = ["guitarra","piano","ukelele","triangle","pito","maraques","harmonica"]
  items2 = ["Regeton","Trap","Dembow"]

  constructor(private settingsService: SettingsService,private router: Router,private userServices: UserServices,private formBuilder: FormBuilder, private singleton: DataService) {
    //this.singleton.newClickedUserId.subscribe(Id => this.Id = Id)
    this.Id=localStorage.getItem('id');
    this.settingsForm = this.formBuilder.group({
      username:'',
      edat:0,
      instrument:[],
      estils:[],
      descripcio:'',
      video:''
    })
  }

  ngOnInit() {
    //if(this.Id==="0") this.router.navigateByUrl("/");
    this.getUser()
    console.log(this.Id);
    //console.log(this.user);
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
    this.router.navigateByUrl('');
  }

  updateUser(){
    console.log("Operacio de updateUser realitzada al backend"+this.settingsForm.value);
    let token=localStorage.getItem('token');
    let user = new User (this.settingsForm.value.username, this.settingsForm.value.edat, this.settingsForm.value.instrument,this.settingsForm.value.estils);
    this.userServices.updateUser(token,user)
      .subscribe(response =>{
        if(response.status == 200){
          this.router.navigateByUrl("api/menu/home");
        }
        else {
          console.log("Error");
        }
      },
      err=>{
        console.log("Error al backend"+err);
        if(err.status == 409){
          console.log("Error 409");
        }
        else if(err.status == 500){
          console.log("Error 500");
        }
      });
  }

  logsito(){
    console.log(this.settingsForm.value.instrument);
  }

  logsito2(){
    console.log(this.settingsForm.value.estils);
  }

  getUser() {
    console.log("Operació de demanar usuari realitzada al BackEnd:");
    let token =localStorage.getItem('token');
    this.userServices.obtainUser(token,this.Id)
      .subscribe(response => {
          console.log("Resposta del BackEnd"+response.body);
          if(response.status==200){
            this.user=response.body;
            console.log(this.user);
            //if (this.user.descripcio){

            //}
            //this.title = this.user.username;
          }
          else {
            //Error desconegut
            console.log("Error");
          }
        },
        err => {
          console.log("Error del BackEnd"+err);
          //console.log(err);
        });
  }

}
