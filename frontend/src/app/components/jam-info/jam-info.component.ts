import { Component, OnInit } from '@angular/core';
import {DataService} from "../../services/data.services";
import {Router} from "@angular/router";
import {AlertController, Platform, ToastController} from "@ionic/angular";
import {ToolbarService} from "../../services/toolbar.service";
import {UserServices} from "../../services/user.services";
import {JamService} from "../../services/jam.service";
import {Jam} from "../../models/jam";
import {User} from "../../models/user";
import {Group} from "../../models/group";
import {HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-jam-info',
  templateUrl: './jam-info.component.html',
  styleUrls: ['./jam-info.component.scss','../../res/fonts/util.css','../../res/vendor/bootstrap/css/bootstrap.min.css','../../res/fonts/font-awesome-4.7.0/css/font-awesome.min.css',
    '../../res/fonts/iconic/css/material-design-iconic-font.min.css','../../res/vendor/animate/animate.css','../../res/vendor/css-hamburgers/hamburgers.min.css', '../../res/vendor/animsition/css/animsition.min.css',
    '../../res/vendor/select2/select2.min.css','../../res/vendor/daterangepicker/daterangepicker.css'],
})

export class JamInfoComponent implements OnInit {

  jamId: string;
  jam: Jam;
  participantsSolistes: User[];
  participantsGrups: Group[];
  boolJam=false;
  userId: string;

  constructor(
    private singleton: DataService,
    private router: Router,
    public toastController: ToastController,
    private toolbarService: ToolbarService,
    public platform: Platform,
    private jamService: JamService,
    private alertController: AlertController
  ) { 
    this.userId=localStorage.getItem('id');
  }

  ngOnInit() {
    this.singleton.newClickedJamId.subscribe(result => this.jamId = result);
    if(this.jamId=="0"){
      this.router.navigateByUrl("/api/menu/home")
    }
    this.obtainJam();
  }

  unirseButton(jamId){
    let token =localStorage.getItem('token');
    console.log("El id del usuari es: "+this.userId);
    console.log("El id de la jam es: "+ jamId);
    this.jamService.addUser(token,jamId,this.userId)
    .subscribe(
      async response => {
        var result = response as HttpResponse<JSON>;
        if(result.status == 200){
          const toast = await this.toastController.create({
            message: "Usuarios Añadido a la jam Correctamente",
            duration: 2000,
            position: 'bottom',
          });
          toast.present();
        }
      },
      async err => {
        var result = err as HttpResponse<JSON>;
        if (result.status == 400) {
          const toast = await this.toastController.create({
            message: "El usuario o la jam no existen",
            duration: 2000,
            position: 'bottom',
          });
          toast.present();
        }
        else if(result.status == 500){
          const toast = await this.toastController.create({
            message: "Error de busqueda, id o actualizacion",
            duration: 2000,
            position: 'bottom',
          });
          toast.present();
        }
      }
    )
  }

  localButton(){
    this.singleton.changeClickedSalaId(this.jam.local);
    this.router.navigateByUrl("/api/salaInfo");
  }

  obtainJam(){
    let token =localStorage.getItem('token');
    this.jamService.getJam(token,this.jamId)
      .subscribe(response => {
          console.log("Resposta del BackEnd 1: "+response.body);
          if(response.status==200){
            this.jam=response.body as Jam;


            let dataIntencioString;
            let vector = this.jam.dataIntencio.split('T');
            let vectorDia = vector[0].split('-');
            let vectorHora = vector[1].split(':');
            dataIntencioString = vectorHora[0] + ':' + vectorHora[1] + ' ' + vectorDia[2] + '/' + vectorDia[1] + '/' + vectorDia[0];
            this.jam.dataIntencioString = dataIntencioString;
            console.log(this.jam.name);
            console.log(this.jam.description);
            console.log(this.jam.dataIntencioString);
            console.log(this.jam.localName);
            this.boolJam=true;

            this.getParticipants();

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

  getParticipants(){
    let token =localStorage.getItem('token');
    this.jamService.getParticipants(token,this.jamId)
      .subscribe(response => {
          console.log("Resposta del BackEnd"+response.body);
          if(response.status==200){
            var result:any;
            result=response.body;
            this.participantsGrups=result.users;
            this.participantsGrups=result.groups;


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
