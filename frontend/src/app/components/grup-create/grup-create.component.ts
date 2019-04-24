import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-grup-create',
  templateUrl: './grup-create.component.html',
  styleUrls: ['./grup-create.component.scss','../../res/fonts/util.css','../../res/vendor/bootstrap/css/bootstrap.min.css','../../res/fonts/font-awesome-4.7.0/css/font-awesome.min.css',
  '../../res/fonts/iconic/css/material-design-iconic-font.min.css','../../res/vendor/animate/animate.css','../../res/vendor/css-hamburgers/hamburgers.min.css', '../../res/vendor/animsition/css/animsition.min.css',
  '../../res/vendor/select2/select2.min.css','../../res/vendor/daterangepicker/daterangepicker.css']
})
export class GrupCreateComponent implements OnInit {

  createGroupForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { 
    this.createGroupForm = this.formBuilder.group({
      name:'',
      email:'',
      description:''
    })
  }

  ngOnInit() {}

  guardar() {}

}
