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

  constructor(
    private singleton: DataService,
    private router: Router,
    public toastController: ToastController,
    private toolbarService: ToolbarService,
    public platform: Platform,
    private jamService: JamService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.singleton.newClickedJamId.subscribe(result => this.jamId = result);
    this.obtainJam();
  }


  localButton(){
    this.singleton.changeClickedSalaId(this.jam.local);
    this.router.navigateByUrl("/api/salaInfo");
  }

  obtainJam(){
    let token =localStorage.getItem('token');
    this.jamService.getJam(token,this.jamId)
      .subscribe(response => {
          console.log("Resposta del BackEnd"+response.body);
          if(response.status==200){
            this.jam=response.body as Jam;

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
    this.jamService.getJam(token,this.jamId)
      .subscribe(response => {
          console.log("Resposta del BackEnd"+response.body);
          if(response.status==200){
            this.jam=response.body as Jam;

            let dataIntencioString;
            let vector = this.jam.dataIntencio.split('T');
            let vectorDia = vector[0].split('-');
            let vectorHora = vector[1].split(':');
            dataIntencioString = vectorHora[0] + ':' + vectorHora[1] + ' ' + vectorDia[2] + '/' + vectorDia[1] + '/' + vectorDia[0];
            this.jam.dataIntencioString = dataIntencioString;

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


}
