import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-grup-create',
  templateUrl: './grup-create.component.html',
  styleUrls: ['./grup-create.component.scss'],
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
