import { Component, OnInit } from '@angular/core';
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {UserServices} from "../../services/user.services";
import {Router} from "@angular/router";
import {DataService} from '../../services/data.services'
import { ElementRef } from '@angular/core';
import { User } from "../../models/user";
import {Platform, ToastController} from '@ionic/angular';

@Component({
  selector: 'app-sala-info',
  templateUrl: './sala-info.component.html',
  styleUrls: ['./sala-info.component.scss','../../res/fonts/util.css','../../res/vendor/bootstrap/css/bootstrap.min.css','../../res/fonts/font-awesome-4.7.0/css/font-awesome.min.css',
  '../../res/fonts/iconic/css/material-design-iconic-font.min.css','../../res/vendor/animate/animate.css','../../res/vendor/css-hamburgers/hamburgers.min.css', '../../res/vendor/animsition/css/animsition.min.css',
  '../../res/vendor/select2/select2.min.css','../../res/vendor/daterangepicker/daterangepicker.css']
})
export class SalaInfoComponent implements OnInit {

  Id: string;
  user: Object;
  groups: Object;
  description:boolean;
  edat: boolean;
  city:boolean;
  instrument: boolean;
  grups: boolean;
  jams: boolean;
  estils: boolean;
  constructor(private singleton: DataService, private userService: UserServices, private router: Router, public platform: Platform) { 
    this.singleton.newClickedSalaId.subscribe(Id => this.Id = Id)
  }

  ngOnInit() {
    //if(this.Id==="0") this.router.navigateByUrl("/");
    this.getRoom();
    console.log("checkpoint")
  }
  chatButton(name) {
    this.singleton.changeChatDestination(name)
    this.router.navigateByUrl("/api/chat1to1")
  
}
  getRoom(){
    console.log("Operació de demanar usuari realitzada al BackEnd:");
    let token =localStorage.getItem('token');
    this.userService.obtainUser(token,this.Id)
      .subscribe(response => {
          console.log("Resposta del BackEnd"+response.body);
          if(response.status==200){
            this.user=response.body;
            console.log(this.user);
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
