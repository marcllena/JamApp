import { Component, OnInit } from '@angular/core';
import {DataService} from "../../services/data.services";
import {Router} from "@angular/router";
import {AlertController, Platform, ToastController} from "@ionic/angular";
import {ToolbarService} from "../../services/toolbar.service";

@Component({
  selector: 'app-jam-info',
  templateUrl: './jam-info.component.html',
  styleUrls: ['./jam-info.component.scss','../../res/fonts/util.css','../../res/vendor/bootstrap/css/bootstrap.min.css','../../res/fonts/font-awesome-4.7.0/css/font-awesome.min.css',
    '../../res/fonts/iconic/css/material-design-iconic-font.min.css','../../res/vendor/animate/animate.css','../../res/vendor/css-hamburgers/hamburgers.min.css', '../../res/vendor/animsition/css/animsition.min.css',
    '../../res/vendor/select2/select2.min.css','../../res/vendor/daterangepicker/daterangepicker.css'],
})

export class JamInfoComponent implements OnInit {

  jamId: string;

  constructor(
    private singleton: DataService,
    private router: Router,
    public toastController: ToastController,
    private toolbarService: ToolbarService,
    public platform: Platform,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.singleton.newClickedJamId.subscribe(result => this.jamId = result);

  }

}
