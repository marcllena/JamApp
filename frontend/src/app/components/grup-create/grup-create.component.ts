import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import { UserServices } from "../../services/user.services";
import { Group } from "../../models/group";
import { Router } from "@angular/router";

@Component({
  selector: 'app-grup-create',
  templateUrl: './grup-create.component.html',
  styleUrls: ['./grup-create.component.scss','../../res/fonts/util.css','../../res/vendor/bootstrap/css/bootstrap.min.css','../../res/fonts/font-awesome-4.7.0/css/font-awesome.min.css',
  '../../res/fonts/iconic/css/material-design-iconic-font.min.css','../../res/vendor/animate/animate.css','../../res/vendor/css-hamburgers/hamburgers.min.css', '../../res/vendor/animsition/css/animsition.min.css',
  '../../res/vendor/select2/select2.min.css','../../res/vendor/daterangepicker/daterangepicker.css']
})
export class GrupCreateComponent implements OnInit {

  createGroupForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserServices, private router: Router) { 
    this.createGroupForm = this.formBuilder.group({
      name:'',
      email:'',
      description:'',
      estils: []
    })
  }

  ngOnInit() {}

  guardar() {
    console.log("Operacio de crear un grup realitzada al backend: "+this.createGroupForm.value);
    let group = new Group(this.createGroupForm.value.name, this.createGroupForm.value.email, this.createGroupForm.value.description, this.createGroupForm.value.estils);
    let token =localStorage.getItem('token');
    this.userService.createGroup(token,group)
      .subscribe(response =>{
      console.log("Resposta del backend" + response);
      if(response.status == 200){
        //Operacio realitzada correctament
        this.router.navigateByUrl("/api/menu/home");
      }
      else{
        //Error desconegut
        console.log("Error");
      }
      },
      err=>{
        console.log("Error al backend"+err);
        if(err.status == 409){
          console.log("Error 409");
        }
        else if(err.status == 500){
          console.log("Error 500");
        }
      });
  }

}
