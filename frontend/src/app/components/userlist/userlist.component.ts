import { Component, OnInit } from '@angular/core';
import { UserServices } from "../../services/user.services";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import { User } from "../../models/user";
import {AuthService} from "../../services/auth.service";
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css','../../res/fonts/util.css','../../res/vendor/bootstrap/css/bootstrap.min.css','../../res/fonts/font-awesome-4.7.0/css/font-awesome.min.css',
    '../../res/fonts/iconic/css/material-design-iconic-font.min.css','../../res/vendor/animate/animate.css','../../res/vendor/css-hamburgers/hamburgers.min.css', '../../res/vendor/animsition/css/animsition.min.css',
    '../../res/vendor/select2/select2.min.css','../../res/vendor/daterangepicker/daterangepicker.css'
  ]
})
export class UserlistComponent implements OnInit {

  users: Object;
  usersSelected=[];

  constructor(private userService: UserServices, private router: Router,public toastController: ToastController) { }

  ngOnInit() {
  }

  llistaUsers() {
    console.log("Operació de demanar usuaris realitzada al BackEnd:");
    let token =localStorage.getItem('token');
    this.userService.obtainUsers(token)
      .subscribe(response => {
          console.log("Resposta del BackEnd"+response.body);
          if(response.status==200){
              this.users=response.body;
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

  editarUser(userId){}

  eliminarUser(userId){
    console.log(userId)
    let token =localStorage.getItem('token');
    this.userService.deleteUsers(token,{IdList:userId})
      .subscribe(
        async response => {
          var result = response as HttpResponse<JSON>;
          if(result.status==200) {
            const toast = await this.toastController.create({
              message: "Usuario Eliminado Correctamente",
              duration: 2000,
              position: 'bottom',
            });
            toast.present();
          }
          this.llistaUsers();
        },
        async err => {
          var result = err as HttpResponse<JSON>;
          if(result.status==403) {
            const toast = await this.toastController.create({
              message: "Debes estar logeado como administrador para eliminar usuarios",
              duration: 2000,
              position: 'bottom',
            });
            toast.present();
          }
          this.llistaUsers();
        });
  }

  selectUser(userId){
    var trobat=false;

    for (let i = 0; i < this.usersSelected.length&&trobat==false; i++) {
      if(this.usersSelected[i]==userId)
      {
        trobat=true;
        this.usersSelected.splice(i,1);
        console.log("Usuari deseleccionat")

      }
    }
    if(trobat==false)
    {
      this.usersSelected.push(userId);
      console.log("Usuari seleccionat")
    }
  }
  eliminarVariosUsers(){

    let token =localStorage.getItem('token');
    this.userService.deleteUsers(token,{IdList:this.usersSelected})
      .subscribe(
        async response => {
          var result = response as HttpResponse<JSON>;
          if(result.status==200) {
            const toast = await this.toastController.create({
              message: "Usuarios Eliminados Correctamente",
              duration: 2000,
              position: 'bottom',
            });
            toast.present();
          }
          this.llistaUsers();
        },
        async err => {
          var result = err as HttpResponse<JSON>;
          if(result.status==403) {
            const toast = await this.toastController.create({
              message: "Debes estar logeado como administrador para eliminar usuarios",
              duration: 2000,
              position: 'bottom',
            });
            toast.present();
          }
          this.llistaUsers();
        });
  }
}
