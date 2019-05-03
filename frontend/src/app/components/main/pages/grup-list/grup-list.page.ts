import { Component, OnInit } from '@angular/core';
import {ToolbarService} from "../../../../services/toolbar.service";
import { UserServices } from "../../../../services/user.services";
import {Router} from "@angular/router";
import { ModalController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-grup-list',
  templateUrl: './grup-list.page.html',
  styleUrls: ['./grup-list.page.scss']
})
export class GrupListPage implements OnInit {

  groups: Object;
  requests: Object;

  constructor(private alertController: AlertController,private toolbarService: ToolbarService, private router: Router,private userService: UserServices) { }

  ngOnInit() {
    this.getRequests();
  }

  llistaGrups(){
    console.log("Operacio de demanar grups realitzada al Backend: ");
    let token =localStorage.getItem('token');
    this.userService.obtainGroups(token)
      .subscribe(response =>{
        console.log("Resposta del backend"+response.body);
        if(response.status==200){
          this.groups = response.body['group'];
        }
        else{
          console.log("Error desconegut");
        }
      },
      err=>{
        console.log("Error del backed: "+ err);
      });
  }

  async requestMembership(group){
    const alert = await this.alertController.create({
      header: 'Unirse al grupo:',
      subHeader: group.name,
      inputs: [
        {
          name: 'message',
          type: 'text',
          placeholder: 'Mensaje'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        }, {
          text: 'Send',
          handler: data => {
            console.log("Operacio de demanar afegirse a un grup realitzada al Backend: ");
            let req = {
              idGroup: group._id,
              message: data.message
            }
            let token = localStorage.getItem('token');
            this.userService.requestMembership(token,req)
              .subscribe(response => {
                console.log("Resposta del backend "+ response)
                if(response.status == 200){
                  console.log("Solicitud enviada correctament");
                }
              },err=>{
                if(err.status == 500){
                  console.log("Error");
                  
                }
              })
          }
        }
      ]
    });

    await alert.present();
  }

  createGroup(){
    this.router.navigateByUrl("api/grupCreate");
  }

  // VEURE SOLICITUDS DELS MEUS GRUPS

  getRequests(){
    console.log("Operacio de demanar grups realitzada al Backend: ");
    let token =localStorage.getItem('token');
    this.userService.obtainMyGroups(token)
      .subscribe(response =>{
        console.log("Resposta del backend"+response.body);
        if(response.status==200){
          console.log(response.body['group'])
          this.requests = response.body['group'];
        }
        else{
          console.log("Error desconegut");
        }
      },
      err=>{
        console.log("Error del backed: "+ err);
      });
  }

}
