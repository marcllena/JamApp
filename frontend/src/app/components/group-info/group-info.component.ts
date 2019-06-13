import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { NgForm} from '@angular/forms'
import { SettingsService } from 'src/app/services/settings.service';
import { UserServices } from 'src/app/services/user.services';
import { User } from 'src/app/models/user';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {DataService} from '../../services/data.services';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-group-info',
  templateUrl: './group-info.component.html',
  styleUrls: ['./group-info.component.scss','../../res/fonts/util.css','../../res/vendor/bootstrap/css/bootstrap.min.css','../../res/fonts/font-awesome-4.7.0/css/font-awesome.min.css',
  '../../res/fonts/iconic/css/material-design-iconic-font.min.css','../../res/vendor/animate/animate.css','../../res/vendor/css-hamburgers/hamburgers.min.css', '../../res/vendor/animsition/css/animsition.min.css',
  '../../res/vendor/select2/select2.min.css','../../res/vendor/daterangepicker/daterangepicker.css'],
})
export class GroupInfoComponent implements OnInit {
  grup: Object;
  settingsForm: FormGroup;
  constructor(private settingsService: SettingsService,private router: Router,private userServices: UserServices,private formBuilder: FormBuilder, private singleton: DataService, public toastController: ToastController) { 
    this.settingsForm = this.formBuilder.group({
      email:'',
      username:'',
      //password:'',
      edat:0,
      instrument:[],
      estils:[],
      descripcio:'',
      video:''
    })
  }

  ngOnInit() {
    
    this.singleton.newGroupDetails.subscribe(callback => this.grup = callback)
    console.log(this.grup)
  }

}
