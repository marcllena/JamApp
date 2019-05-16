import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter-form',
  templateUrl: './filter-form.component.html',
  styleUrls: ['./filter-form.component.scss','../../res/fonts/util.css','../../res/vendor/bootstrap/css/bootstrap.min.css','../../res/fonts/font-awesome-4.7.0/css/font-awesome.min.css',
    '../../res/fonts/iconic/css/material-design-iconic-font.min.css','../../res/vendor/animate/animate.css','../../res/vendor/css-hamburgers/hamburgers.min.css', '../../res/vendor/animsition/css/animsition.min.css',
    '../../res/vendor/select2/select2.min.css','../../res/vendor/daterangepicker/daterangepicker.css']
})
export class FilterFormComponent implements OnInit {

  musics: boolean;
  salas:boolean;

  constructor() { }

  ngOnInit() {}

  checkMusics(){
    if(this.musics){
      this.musics=false;
    }
    else {
      this.musics = true;
    }
  }
  checkSalas(){
    if(this.salas){
      this.salas=false;
    }
    else{
      this.salas=true;
    }
  }

  exportFilters(){

    //Guardem les dades al Singleton
    //Fem routerLink per anar cap a mapa

  }

}
