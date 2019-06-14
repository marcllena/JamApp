import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { NgForm} from '@angular/forms'
import { SettingsService } from 'src/app/services/settings.service';
import { UserServices } from 'src/app/services/user.services';
import { User } from 'src/app/models/user';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {DataService} from '../../services/data.services';
import { ToastController } from '@ionic/angular';
import { Group } from 'src/app/models/group';
@Component({
  selector: 'app-group-info',
  templateUrl: './group-info.component.html',
  styleUrls: ['./group-info.component.scss','../../res/fonts/util.css','../../res/vendor/bootstrap/css/bootstrap.min.css','../../res/fonts/font-awesome-4.7.0/css/font-awesome.min.css',
  '../../res/fonts/iconic/css/material-design-iconic-font.min.css','../../res/vendor/animate/animate.css','../../res/vendor/css-hamburgers/hamburgers.min.css', '../../res/vendor/animsition/css/animsition.min.css',
  '../../res/vendor/select2/select2.min.css','../../res/vendor/daterangepicker/daterangepicker.css'],
})
export class GroupInfoComponent implements OnInit {
  settingsForm: FormGroup;
  group
  items2 = ["Regeton","Trap","Dembow"]
  constructor(private settingsService: SettingsService,private router: Router,private userServices: UserServices,private formBuilder: FormBuilder, private singleton: DataService, public toastController: ToastController) { 
    this.settingsForm = this.formBuilder.group({
      email:'',
      username:'',
      //password:'',
      instrument:[],
      estils:[],
      description:'',
      video:''
    })
  }

  ngOnInit() {
    
    this.singleton.newGroupDetails.subscribe(callback => this.group = callback as Group)
    console.log(this.group)
    console.log(this.group.name)
  }
  async presentToastError() {
    const toast = await this.toastController.create({
      message: 'Este mail o nombre ya existe, introduce otro por favor.',
      duration: 3000
    });
    toast.present();
  }
  updateGroup(){
    console.log("Operacio de updateUser realitzada al backend"+this.settingsForm.value);
    let token=localStorage.getItem('token');
    //let user2 = new User (this.settingsForm.value.email, this.settingsForm.value.username,/*this.settingsForm.value.password,*/ this.settingsForm.value.edat, this.settingsForm.value.instrument,this.settingsForm.value.estils, this.settingsForm.value.descripcio, this.settingsForm.value.video);
    
    let group2 = {
      id: this.group._id,
      email: this.settingsForm.value.email,
      name: this.settingsForm.value.username,
      edat: this.settingsForm.value.edat,
      instrument: this.settingsForm.value.instrument,
      estils: this.settingsForm.value.estils,
      descripcio: this.settingsForm.value.descripcio,
      video: this.settingsForm.value.video
    }
    if(group2.email == ''){
      group2.email = this.group.email;
    }
    if(group2.name == ''){
      group2.name = this.group.name;
    }
    if(group2.estils == null){
      group2.estils = this.group.estils;
    }
    if(group2.descripcio == ''){
      group2.descripcio = this.group.description;
    }
    if(group2.video == ''){
      group2.video = this.group.video;
    }


    console.log(group2.estils);

    this.userServices.updateGroup(token,group2)
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
          this.presentToastError();
        }
      });
  }
}
