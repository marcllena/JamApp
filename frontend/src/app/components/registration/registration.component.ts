import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { HttpErrorResponse } from "@angular/common/http";
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {User} from "../../models/user";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css','./res/fonts/util.css','./res/vendor/bootstrap/css/bootstrap.min.css','./res/fonts/font-awesome-4.7.0/css/font-awesome.min.css',
    './res/fonts/iconic/css/material-design-iconic-font.min.css','./res/vendor/animate/animate.css','./res/vendor/css-hamburgers/hamburgers.min.css', './res/vendor/animsition/css/animsition.min.css',
    './res/vendor/select2/select2.min.css','res/vendor/daterangepicker/daterangepicker.css'
  ]
})
export class RegistrationComponent implements OnInit {

  constructor(private userService: AuthService,
              private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
      document.body.classList.add('bg-img');
    }

}
