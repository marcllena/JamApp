import { Component, OnInit } from '@angular/core';
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {UserServices} from "../../services/user.services";
import {Router} from "@angular/router";
import {DataService} from '../../services/data.services'
import { User } from "../../models/user";
import { ToastController } from '@ionic/angular';

//import { App} from '@ionic/angular';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss','../../res/fonts/util.css','../../res/vendor/bootstrap/css/bootstrap.min.css','../../res/fonts/font-awesome-4.7.0/css/font-awesome.min.css',
    '../../res/fonts/iconic/css/material-design-iconic-font.min.css','../../res/vendor/animate/animate.css','../../res/vendor/css-hamburgers/hamburgers.min.css', '../../res/vendor/animsition/css/animsition.min.css',
    '../../res/vendor/select2/select2.min.css','../../res/vendor/daterangepicker/daterangepicker.css']
})
export class UserInfoComponent implements OnInit {
  //name: string;
  Id: string;
  user: Object;
  description:boolean;
  edat: boolean;
  city:boolean;
  instrument: boolean;
  grups: boolean;
  jams: boolean;
  estils: boolean;

  //desc,city,;


  constructor(private singleton: DataService, private userService: UserServices, private router: Router) {
    this.singleton.newClickedUserId.subscribe(Id => this.Id = Id)
  }

  ngOnInit() {
    if(this.Id==="0") this.router.navigateByUrl("/");
    this.description=false;
    this.edat=false;
    this.instrument=false;
    this.city=false;
    this.grups=false;
    this.jams=false;
    this.estils=false;
    this.getUser();
  }

  getUser() {
    console.log("Operació de demanar usuari realitzada al BackEnd:");
    let token =localStorage.getItem('token');
    this.userService.obtainUser(token,this.Id)
      .subscribe(response => {
          console.log("Resposta del BackEnd"+response.body);
          if(response.status==200){
            this.user=response.body;
            console.log(this.user);
            if("edat" in this.user) this.edat=true;
            if("descripcio" in this.user) this.description=true;
            if("city" in this.user) this.city=true;
            if(("instrument" in this.user)) this.instrument=false;
            if("grups" in this.user) this.grups=true;
            if("jams" in this.user) this.jams=true;
            if("estils" in this.user) this.estils=true;

            //if (this.user.descripcio){

            //}
            //this.title = this.user.username;
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
