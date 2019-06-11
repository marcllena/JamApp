import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-jam-create',
  templateUrl: './jam-create.component.html',
  styleUrls: ['./jam-create.component.scss','../../res/fonts/util.css','../../res/vendor/bootstrap/css/bootstrap.min.css','../../res/fonts/font-awesome-4.7.0/css/font-awesome.min.css',
  '../../res/fonts/iconic/css/material-design-iconic-font.min.css','../../res/vendor/animate/animate.css','../../res/vendor/css-hamburgers/hamburgers.min.css', '../../res/vendor/animsition/css/animsition.min.css',
  '../../res/vendor/select2/select2.min.css','../../res/vendor/daterangepicker/daterangepicker.css'],
})
export class JamCreateComponent implements OnInit {

  createJamForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.createJamForm = this.formBuilder.group({

    })
   }

  ngOnInit() {}

}
