import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {DataService} from "./data.services";
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {

  private userId: string;
  private userName: string;

  constructor(private router: Router,private singleton: DataService, private alertController: AlertController) {
    this.singleton.newUserId.subscribe(userid => this.userId = userid);
    this.singleton.newUsername.subscribe(username => this.userName = username);
    this.userId=localStorage.getItem('id');
    this.userName=localStorage.getItem('username');
  }

  profile(){
    this.router.navigateByUrl('api/settings');
  }
  chat(){
    this.router.navigateByUrl('api/chats');}
  async logOut() {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: '¿Seguro que desea salir?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Cancelamos Log Out');
          }
        }, {
          text: 'OK',
          handler: () => {
            console.log('Realizamos Log Out');
            localStorage.removeItem('token');
            localStorage.removeItem('id');
            localStorage.removeItem('userType');
            localStorage.removeItem('username');
            this.router.navigateByUrl('');
          }
        }
      ]
    });
    await alert.present();
  }

  settings(){
    this.router.navigateByUrl('api/filter');
  }

  getUserName(): string {
    return this.userName;
  }
}
