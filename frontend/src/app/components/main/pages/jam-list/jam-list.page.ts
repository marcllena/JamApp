import { Component, OnInit } from '@angular/core';
import {ToolbarService} from "../../../../services/toolbar.service";
import {Platform} from "@ionic/angular";

@Component({
  selector: 'app-jam-list',
  templateUrl: './jam-list.page.html',
  styleUrls: ['./jam-list.page.scss','../../../../res/fonts/util.css','../../../../res/vendor/bootstrap/css/bootstrap.min.css','../../../../res/fonts/font-awesome-4.7.0/css/font-awesome.min.css',
    '../../../../res/fonts/iconic/css/material-design-iconic-font.min.css','../../../../res/vendor/animate/animate.css','../../../../res/vendor/css-hamburgers/hamburgers.min.css', '../../../../res/vendor/animsition/css/animsition.min.css',
    '../../../../res/vendor/select2/select2.min.css','../../../../res/vendor/daterangepicker/daterangepicker.css'],
})
export class JamListPage implements OnInit {

  constructor(private toolbarService: ToolbarService, public platform: Platform) { }

  ngOnInit() {
  }

}
