import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { HttpErrorResponse } from "@angular/common/http";
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {User} from "../../models/user";
import {passValidator} from "./validator";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [AuthService]
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  validation_messages: any;

  constructor(private userService: AuthService,
              private router: Router, private formBuilder: FormBuilder) {

    this.registerForm = this.formBuilder.group({
        displayName: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern(/.{3,10}$/)])),

        email: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)])),

        password: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern(/^(?=.*\d).{4,8}$/)])),

        confirmPassword: ['', passValidator]
      }
    )
  }

  ngOnInit() {
    this.validation_messages = {
      'displayName': [
        { type: 'required', message: 'Name is required'},
        { type: 'pattern', message: 'It has to be between 3 and 10 characters long'}
      ],
      'email': [
        { type: 'required', message: 'Email is required' },
        { type: 'unique', message: 'Email must be unique'} ,
        { type: 'pattern', message: 'It must be valid. Must contain a @ and only one dot in the domain. Domain between 2 and 3 characters long' }
      ],
      'password': [
        { type: 'required', message: 'Password is required' },
        { type: 'pattern', message: 'It must be valid. Must contain at least one number and must be between 4 and 8 characters' }
      ],
      'confirmPassword': [
        { type: 'required', message: 'Password is required and both must match' },
        { type: 'pattern', message: 'It must be valid. Must contain at least one number and must be between 4 and 8 characters' }
      ]
    }
  }

  register() {
    console.log(this.registerForm.value);
    let user = new User(this.registerForm.value.displayName, this.registerForm.value.email, this.registerForm.value.password, this.registerForm.value.confirmPassword);
    this.userService.signup(user)
      .subscribe(
        res => {
          console.log(res);
          let token = res['token'];
          localStorage.setItem('token', token);
          this.router.navigateByUrl("/api/product");
        },
        err => {
          this.registerForm.get("email").setErrors({unique: true});
        });
  }


}
