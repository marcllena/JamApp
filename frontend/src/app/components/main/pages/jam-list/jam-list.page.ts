import { Component, OnInit } from '@angular/core';
import {ToolbarService} from "../../../../services/toolbar.service";
import {AlertController, Platform, ToastController} from "@ionic/angular";
import {Jam} from "../../../../models/jam";
import {JamService} from "../../../../services/jam.service";
import {Router} from "@angular/router";
import {HttpResponse} from "@angular/common/http";
import {DataService} from "../../../../services/data.services";

@Component({
  selector: 'app-jam-list',
  templateUrl: './jam-list.page.html',
  styleUrls: ['./jam-list.page.scss','../../../../res/fonts/util.css','../../../../res/vendor/bootstrap/css/bootstrap.min.css','../../../../res/fonts/font-awesome-4.7.0/css/font-awesome.min.css',
    '../../../../res/fonts/iconic/css/material-design-iconic-font.min.css','../../../../res/vendor/animate/animate.css','../../../../res/vendor/css-hamburgers/hamburgers.min.css', '../../../../res/vendor/animsition/css/animsition.min.css',
    '../../../../res/vendor/select2/select2.min.css','../../../../res/vendor/daterangepicker/daterangepicker.css'],
})
export class JamListPage implements OnInit {

  jams: Jam[];
  booleanData: boolean;
  jamsOriginal: Jam[];
  jamsSelected=[];
  searchTerm: string = "";
  private userType: string;
  myJamsList: Jam[];
  
  constructor(private jamService: JamService, private singleton: DataService, private router: Router,public toastController: ToastController,
              private toolbarService: ToolbarService, public platform: Platform,private alertController: AlertController) { }
  
  

  ngOnInit() {
    this.userType=localStorage.getItem('userType');
    this.llistaJams();
    this.myJams();
  }

  createJam(){
    this.router.navigateByUrl("api/jamCreate");
  }

  llistaJams() {
    
    let token =localStorage.getItem('token');
    this.jamService.obtainJams(token)
      .subscribe(response => {
          console.log("Resposta del BackEnd"+response.body);
          if(response.status==200){
            this.jams=response.body as Jam[];

            for(let i=0;i<this.jams.length;i++){
              if(this.jams[i].dataIntencio!=null) {
                let dataIntencioString;
                let vector = this.jams[i].dataIntencio.split('T');
                let vectorDia = vector[0].split('-');
                let vectorHora = vector[1].split(':');
                dataIntencioString = vectorHora[0] + ':' + vectorHora[1] + ' ' + vectorDia[2] + '/' + vectorDia[1] + '/' + vectorDia[0];
                this.jams[i].dataIntencioString = dataIntencioString;
              }
            }

            this.booleanData=true;


            /*this.jams.forEach(function(jam,i){
              let dataIntencioString;
              let vector=jam.dataIntencio.split('T');
              let vectorDia=vector[0].split('-');
              let vectorHora=vector[1].split(':');
              dataIntencioString= vectorHora[0]+':'+vectorHora[1] + ' ' + vectorDia[2] +'/'+ vectorDia[1] +'/'+ vectorDia[0];
              this.jams[i].dataIntencioString=dataIntencioString;
            });
*/
            console.log(this.jams.length+ " jams");
            this.jamsOriginal=this.jams;
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

  myJams(){
    let token =localStorage.getItem('token');
    this.jamService.getJamsbyOwner(token)
      .subscribe(response => {
          if(response.status==200){
            this.myJamsList=response.body as Jam[];
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

  editarJam(jamId){}

  async eliminarJam(jamId) {
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
            console.log(jamId);
            let token = localStorage.getItem('token');
            this.jamService.deleteJams(token, {IdList: jamId})
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
                  this.llistaJams();
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
                  this.llistaJams();
                });
          }
        }
      ]
    });

    await alert.present();
  }

  async eliminarVariasJams() {
    if(this.jamsSelected.length>0) {
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
              this.jamService.deleteJams(token, {IdList: this.jamsSelected})
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
                    this.llistaJams();
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
                    this.llistaJams();
                  });
            }
          }
        ]
      });
      await alert.present();
    }
  }

  selectJam(jamId){
    var trobat=false;

    for (let i = 0; i < this.jamsSelected.length&&trobat==false; i++) {
      if(this.jamsSelected[i]==jamId)
      {
        trobat=true;
        this.jamsSelected.splice(i,1);
        //console.log("Usuari deseleccionat")

      }
    }
    if(trobat==false)
    {
      this.jamsSelected.push(jamId);
      //console.log("Usuari seleccionat")
    }
  }

  filterItems() {
    var filtered= this.jams.filter(item => {
      return item.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
    });
    if(this.searchTerm=="")
      this.jams=this.jamsOriginal;
    else{
      this.jams=filtered;
    }

  }

  infoJam(JamId){
    this.singleton.changeClickedJamId(JamId);
    this.router.navigateByUrl("api/jamInfo");
  }
}
