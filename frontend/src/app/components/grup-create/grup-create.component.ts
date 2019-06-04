import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { UserServices } from "../../services/user.services";
import { Group } from "../../models/group";
import { Router } from "@angular/router";
import {DataService} from "../../services/data.services";

@Component({
  selector: 'app-grup-create',
  templateUrl: './grup-create.component.html',
  styleUrls: ['./grup-create.component.scss','../../res/fonts/util.css','../../res/vendor/bootstrap/css/bootstrap.min.css','../../res/fonts/font-awesome-4.7.0/css/font-awesome.min.css',
  '../../res/fonts/iconic/css/material-design-iconic-font.min.css','../../res/vendor/animate/animate.css','../../res/vendor/css-hamburgers/hamburgers.min.css', '../../res/vendor/animsition/css/animsition.min.css',
  '../../res/vendor/select2/select2.min.css','../../res/vendor/daterangepicker/daterangepicker.css']
})
export class GrupCreateComponent implements OnInit {

  createGroupForm: FormGroup;
  items = ["Regeton","Trap","Dembow"]
  validation_messages: any;

  constructor(private formBuilder: FormBuilder, private singleton: DataService,private userService: UserServices, private router: Router) {
    this.createGroupForm = this.formBuilder.group({
      name: new FormControl('',Validators.compose([
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9]{3,}$/)
      ])),
      email:'',
      description: new FormControl('',Validators.compose([
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9\s]{5,}$/)
      ])),
      estils: []

    })
  }

  ngOnInit() {
    this.validation_messages = {
      'name': [
        {type: 'required', message: 'Nombre: requerido'},
        { type: 'error', message: 'Error: Falta un nombre'} ,
        { type: 'pattern', message: 'Nombre: Debe ser un nombre valido, minimo 3 letras' }
      ],
      'description': [
        {type: 'required', message: 'Descripcion: requerida'},
        { type: 'error', message: 'Error: Falta la descripcion'} ,
        { type: 'pattern', message: 'Descripcion: Debe ser una descripcion valida, minimo 5 letras' }
      ]
    }
  }

  logsito(){
    console.log(this.createGroupForm.value.estils);
  }

  guardar() {
    console.log("Operacio de crear un grup realitzada al backend: "+this.createGroupForm.value);
    //Posem els camps al Singleton
    this.singleton.changeGroupName(this.createGroupForm.value.name);
    this.singleton.changeGroupMail( this.createGroupForm.value.email);
    this.singleton.changeGroupDescription(this.createGroupForm.value.description);
    this.singleton.changeGroupEstils(this.createGroupForm.value.estils);
    this.router.navigateByUrl('api/grupLocation');
  }

}
