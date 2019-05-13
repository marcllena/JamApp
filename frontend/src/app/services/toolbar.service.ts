import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {DataService} from "./data.services";

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {

  private userId: string;
  private userName: string;

  constructor(private router: Router,private singleton: DataService) {
    this.userId = localStorage.getItem('id');
    this.userName=localStorage.getItem('username');
    console.log(this.userName);
  }

  profile(){
    this.router.navigateByUrl('api/settings');
  }

  async logOut() {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: '¿Seguro que desea salir?.',
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
            localStorage.removeItem('_id');
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
