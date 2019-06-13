import {Jam} from "./jam";

export class Room {
  _id: string;
  email: string;
  username: string;
  password: string;
  facebookId: string;
  edat: number;
  location:string;
  latitud: number;
  longitud: number;
  userType:string;
  pass: string;
  descripcio: string;
  city: string;
  jams: Jam[];


  constructor( email = '', username = '', jams=[], city="", password = '',edat=0, descripcio= '', facebookId = '') {
    this.email = email;
    this.facebookId = facebookId;
    this.username = username;
    this.password = password;
    this.edat = edat;
    this.descripcio = descripcio;
    this.jams=jams;
    this.city=city;

  }
  
}
