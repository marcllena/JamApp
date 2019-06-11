import { Component, OnInit } from '@angular/core';
import {ToolbarService} from "../../../../services/toolbar.service";
import {AlertController, Platform, ToastController} from "@ionic/angular";
import {Jam} from "../../../../models/jam";
import {JamService} from "../../../../services/jam.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-jam-list',
  templateUrl: './jam-list.page.html',
  styleUrls: ['./jam-list.page.scss','../../../../res/fonts/util.css','../../../../res/vendor/bootstrap/css/bootstrap.min.css','../../../../res/fonts/font-awesome-4.7.0/css/font-awesome.min.css',
    '../../../../res/fonts/iconic/css/material-design-iconic-font.min.css','../../../../res/vendor/animate/animate.css','../../../../res/vendor/css-hamburgers/hamburgers.min.css', '../../../../res/vendor/animsition/css/animsition.min.css',
    '../../../../res/vendor/select2/select2.min.css','../../../../res/vendor/daterangepicker/daterangepicker.css'],
})
export class JamListPage implements OnInit {

  jams: Jam[];
  jamsOriginal: Jam[];
  jamsSelected=[];
  searchTerm: string = "";
  private userType: string;
  
  constructor(private jamService: JamService, private router: Router,public toastController: ToastController,
              private toolbarService: ToolbarService, public platform: Platform,private alertController: AlertController) { }
  
  

  ngOnInit() {
    this.userType=localStorage.getItem('userType');
    this.llistaJams();
  }

  llistaJams() {
    
    let token =localStorage.getItem('token');
    this.jamService.obtainJams(token)
      .subscribe(response => {
          console.log("Resposta del BackEnd"+response.body);
          if(response.status==200){
            this.jams=response.body as Jam[];
            this.jamsOriginal=this.jams;
          }
          else {
            //Error desconegut
            console.log("Error");
          }
        },
        err => {
          console.log("Error del BackEnd"+err);
          //console.log(err);
        });
  }


  filterItems() {
    var filtered= this.jams.filter(item => {
      return item.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
    });
    if(this.searchTerm=="")
      this.jams=this.jamsOriginal;
    else{
      this.jams=filtered;
    }

  }
}
