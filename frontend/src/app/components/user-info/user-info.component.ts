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
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  //name: string;
  Id: string;
  user: Object;
  //desc,city,;


  constructor(private singleton: DataService, private userService: UserServices, private router: Router) {
    this.singleton.newClickedUserId.subscribe(Id => this.Id = Id)
  }

  ngOnInit() {
    if(this.Id==="0") this.router.navigateByUrl("/");
    this.getUser()
  }

  getUser() {
    console.log("Operació de demanar usuari realitzada al BackEnd:");
    let token =localStorage.getItem('token');
    this.userService.obtainUser(token,this.Id)
      .subscribe(response => {
          console.log("Resposta del BackEnd"+response.body);
          if(response.status==200){
            this.user=response.body;
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
