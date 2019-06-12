import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { NgForm} from '@angular/forms'
import { SettingsService } from 'src/app/services/settings.service';
import { UserServices } from 'src/app/services/user.services';
import { User } from 'src/app/models/user';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {DataService} from '../../services/data.services';
import { ToastController } from '@ionic/angular';

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
  user: User;

  settingsForm: FormGroup;
  items1 = ['Guitarra','Piano','Pito','Triangle','Bateria','Violi','Veu','Teclat','Cello','Flauta','Ukelele','Maraques','Harmonica']
  items2 = ["Regeton","Trap","Dembow"]

  constructor(private settingsService: SettingsService,private router: Router,private userServices: UserServices,private formBuilder: FormBuilder, private singleton: DataService, public toastController: ToastController) {
    //this.singleton.newClickedUserId.subscribe(Id => this.Id = Id)
    this.Id=localStorage.getItem('id');
    this.settingsForm = this.formBuilder.group({
      email:'',
      username:'',
      //password:'',
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

  async presentToastError() {
    const toast = await this.toastController.create({
      message: 'Este mail o nombre ya existe, introduce otro por favor.',
      duration: 3000
    });
    toast.present();
  }

  updateUser(){
    console.log("Operacio de updateUser realitzada al backend"+this.settingsForm.value);
    let token=localStorage.getItem('token');
    //let user2 = new User (this.settingsForm.value.email, this.settingsForm.value.username,/*this.settingsForm.value.password,*/ this.settingsForm.value.edat, this.settingsForm.value.instrument,this.settingsForm.value.estils, this.settingsForm.value.descripcio, this.settingsForm.value.video);
    
    let user2 = {
      email: this.settingsForm.value.email,
      username: this.settingsForm.value.username,
      edat: this.settingsForm.value.edat,
      instrument: this.settingsForm.value.instrument,
      estils: this.settingsForm.value.estils,
      descripcio: this.settingsForm.value.descripcio,
      video: this.settingsForm.value.video
    }
    if(user2.email == ''){
      user2.email = this.user.email;
    }
    if(user2.username == ''){
      user2.username = this.user.username;
    }
    if(user2.edat == 0){
      user2.edat = this.user.edat;
    }
    if(user2.instrument == null){
      user2.instrument = this.user.instrument;
    }
    if(user2.estils == null){
      user2.estils = this.user.estils;
    }
    if(user2.descripcio == ''){
      user2.descripcio = this.user.descripcio;
    }
    if(user2.video == ''){
      user2.video = this.user.video;
    }

    this.userServices.updateUser(token,user2)
      .subscribe(response =>{
        if(response.status == 200){
          localStorage.setItem('username',response.body['username']);
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
          this.presentToastError();
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
            this.user=response.body as User;
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
