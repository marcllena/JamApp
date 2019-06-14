import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { NgForm} from '@angular/forms'
import { SettingsService } from 'src/app/services/settings.service';
import { UserServices } from 'src/app/services/user.services';
import { User } from 'src/app/models/user';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {DataService} from '../../services/data.services';
import { ToastController } from '@ionic/angular';
import { Jam } from 'src/app/models/jam';
import {JamService} from '../../services/jam.service'
import { Room } from 'src/app/models/room';

@Component({
  selector: 'app-jam-edit',
  templateUrl: './jam-edit.component.html',
  styleUrls: ['./jam-edit.component.scss','../../res/fonts/util.css','../../res/vendor/bootstrap/css/bootstrap.min.css','../../res/fonts/font-awesome-4.7.0/css/font-awesome.min.css',
  '../../res/fonts/iconic/css/material-design-iconic-font.min.css','../../res/vendor/animate/animate.css','../../res/vendor/css-hamburgers/hamburgers.min.css', '../../res/vendor/animsition/css/animsition.min.css',
  '../../res/vendor/select2/select2.min.css','../../res/vendor/daterangepicker/daterangepicker.css'],
})
export class JamEditComponent implements OnInit {
  settingsForm: FormGroup;
  jam
  rooms: Room[];
  selectOptions = {
    header: 'Locals',
  };
  constructor(private settingsService: SettingsService,private router: Router,private userService: UserServices,private jamService: JamService, private formBuilder: FormBuilder, private singleton: DataService, public toastController: ToastController) { 
    this.settingsForm = this.formBuilder.group({
      name:'',
      local:[],
      dataIntencio:'',
      fecha:'',
    })
  }

  ngOnInit() {
    let token =localStorage.getItem('token');
    this.singleton.newJamDetails.subscribe(callback => this.jam = callback as Jam)
    this.userService.getRooms(token).subscribe(response=>{
      if (response.status==200){
        this.rooms=response.body as Room[];
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
    console.log(this.jam)
    console.log(this.jam.name)
  }
  async presentToastError() {
    const toast = await this.toastController.create({
      message: 'Este mail o nombre ya existe, introduce otro por favor.',
      duration: 3000
    });
    toast.present();
  }
  updateJam(){
    console.log("Operacio de updateUser realitzada al backend"+this.settingsForm.value);
    let token=localStorage.getItem('token');
    //let user2 = new User (this.settingsForm.value.email, this.settingsForm.value.username,/*this.settingsForm.value.password,*/ this.settingsForm.value.edat, this.settingsForm.value.instrument,this.settingsForm.value.estils, this.settingsForm.value.descripcio, this.settingsForm.value.video);
    
    let jam = new Jam(this.settingsForm.value.name, this.settingsForm.value.local, this.settingsForm.value.fecha/*this.createJamForm.value.dataIntenci*/);

    jam._id = this.jam._id;
    if(jam.name == ''){
      jam.name = this.jam.name;
    }
    if(jam.estils == null){
      jam.estils = this.jam.estils;
    }
    if(jam.local == ''){
      jam.local = this.jam.description;
    }
    if(jam.organitzador == ''){
        jam.organitzador = this.jam.organitzador;
    }


    this.jamService.editJam(token,jam)
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
