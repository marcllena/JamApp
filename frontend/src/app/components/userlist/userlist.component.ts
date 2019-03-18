import { Component, OnInit } from '@angular/core';
import { UserServices } from "../../services/user.services";
import { HttpErrorResponse } from "@angular/common/http";
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import { User } from "../../models/user";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css','../../res/fonts/util.css','../../res/vendor/bootstrap/css/bootstrap.min.css','../../res/fonts/font-awesome-4.7.0/css/font-awesome.min.css',
    '../../res/fonts/iconic/css/material-design-iconic-font.min.css','../../res/vendor/animate/animate.css','../../res/vendor/css-hamburgers/hamburgers.min.css', '../../res/vendor/animsition/css/animsition.min.css',
    '../../res/vendor/select2/select2.min.css','../../res/vendor/daterangepicker/daterangepicker.css'
  ]
})
export class UserlistComponent implements OnInit {

  users: Object;

  constructor(private userService: UserServices, private router: Router) { }

  ngOnInit() {
  }

  llistaUsers() {
    console.log("Operació de demanar usuaris realitzada al BackEnd:");
    this.userService.obtainUsers()
      .subscribe(response => {
          console.log("Resposta del BackEnd"+response.body);
          console.log("Proba"+response.body[0].email);
          if(response.status==200){
              this.users=response.body;
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
