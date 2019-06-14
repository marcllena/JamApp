import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { Router } from "@angular/router";
import { Jam } from "../../models/jam";
import { JamService } from "../../services/jam.service";
import {Platform, ToastController} from "@ionic/angular";
import {Room} from "../../models/room";
import {UserServices} from "../../services/user.services";

@Component({
  selector: 'app-jam-create',
  templateUrl: './jam-create.component.html',
  styleUrls: ['./jam-create.component.scss','../../res/fonts/util.css','../../res/vendor/bootstrap/css/bootstrap.min.css','../../res/fonts/font-awesome-4.7.0/css/font-awesome.min.css',
  '../../res/fonts/iconic/css/material-design-iconic-font.min.css','../../res/vendor/animate/animate.css','../../res/vendor/css-hamburgers/hamburgers.min.css', '../../res/vendor/animsition/css/animsition.min.css',
  '../../res/vendor/select2/select2.min.css','../../res/vendor/daterangepicker/daterangepicker.css'],
})
export class JamCreateComponent implements OnInit {

  createJamForm: FormGroup;
  rooms: Room[];
  selectOptions = {
    header: 'Locals',
  };

  constructor(private formBuilder: FormBuilder, private router: Router, private jamService: JamService, private userService: UserServices, public toastController: ToastController) {
    this.createJamForm = this.formBuilder.group({
      name:'',
      local:[],
      dataIntencio:'',
      fecha:'',
    })
   }

  ngOnInit() {
    let token =localStorage.getItem('token');
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
  }

  guardar() {
    console.log("Operacio de crear un grup realitzada al backend: ");
    let jam = new Jam(this.createJamForm.value.name, this.createJamForm.value.local, this.createJamForm.value.fecha/*this.createJamForm.value.dataIntenci*/);
    let token =localStorage.getItem('token');

    this.jamService.createJam(token,jam)
      .subscribe(async response =>{
        console.log("Resposta del backend" + response);
        if(response.status == 200){
          const toast = await this.toastController.create({
            message: "Jam Correctamente Creada",
            duration: 3000,
            position: 'bottom',
          });
          toast.present();
          this.router.navigateByUrl("/api/menu/home");
        } else {
          console.log("Error");
        } 
      },
      err=>{
        console.log("Error al backend"+err);
         if(err.status == 500){
          console.log("Error 500");
        }
      });
  }

}
