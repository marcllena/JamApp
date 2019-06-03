import { Component, OnInit } from '@angular/core';
import {UserServices} from "../../../../services/user.services";
import {Router} from "@angular/router";
import {AlertController, ToastController} from "@ionic/angular";
import {HttpResponse} from "@angular/common/http";
import {ToolbarService} from "../../../../services/toolbar.service";
import {User} from "../../../../models/user";

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.page.html',
  styleUrls: ['./userlist.page.scss','../../../../res/fonts/util.css','../../../../res/vendor/bootstrap/css/bootstrap.min.css','../../../../res/fonts/font-awesome-4.7.0/css/font-awesome.min.css',
    '../../../../res/fonts/iconic/css/material-design-iconic-font.min.css','../../../../res/vendor/animate/animate.css','../../../../res/vendor/css-hamburgers/hamburgers.min.css', '../../../../res/vendor/animsition/css/animsition.min.css',
    '../../../../res/vendor/select2/select2.min.css','../../../../res/vendor/daterangepicker/daterangepicker.css']
})
export class UserlistPage implements OnInit {

  users: User[];
  usersOriginal: User[];
  usersSelected=[];
  searchTerm: string = "";


  constructor(private userService: UserServices, private router: Router,public toastController: ToastController,
              private toolbarService: ToolbarService, private alertController: AlertController) { }

  ngOnInit() {
    this.llistaUsers();
  }

  llistaUsers() {
    console.log("Operació de demanar usuaris realitzada al BackEnd:");
    let token =localStorage.getItem('token');
    this.userService.obtainUsers(token)
      .subscribe(response => {
          console.log("Resposta del BackEnd"+response.body);
          if(response.status==200){
            this.users=response.body as User[];
            this.usersOriginal=this.users;
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

  async eliminarUser(userId) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: '¿Seguro que desea eliminar al usuario?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
          }
        }, {
          text: 'Si',
          handler: () => {
            console.log(userId);
            let token = localStorage.getItem('token');
            this.userService.deleteUsers(token, {IdList: userId})
              .subscribe(
                async response => {
                  var result = response as HttpResponse<JSON>;
                  if (result.status == 200) {
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
                  if (result.status == 403) {
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
      ]
    });
    await alert.present();
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
  async eliminarVariosUsers() {
    if(this.usersSelected.length>0) {
      const alert = await this.alertController.create({
        header: 'Alerta',
        message: '¿Seguro que desea eliminar a varios usuarios?',
        buttons: [
          {
            text: 'Cancelar',
            handler: () => {
            }
          }, {
            text: 'Si',
            handler: () => {
              let token = localStorage.getItem('token');
              this.userService.deleteUsers(token, {IdList: this.usersSelected})
                .subscribe(
                  async response => {
                    var result = response as HttpResponse<JSON>;
                    if (result.status == 200) {
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
                    if (result.status == 403) {
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
        ]
      });
      await alert.present();
    }
  }
  filterItems() {
    var filtered= this.users.filter(item => {
      return item.username.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
    });
    if(this.searchTerm=="")
      this.users=this.usersOriginal;
    else{
      this.users=filtered;
    }

  }

}
