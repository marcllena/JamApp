export class User {
  _id: string;
  email: string;
  username: string;
  password: string;
  edat: number;
  instrument: string[];
  ubicacio:string;
  latitud: number;
  longitud: number;
  video:string;
  estils: string[];
  userType:number;
  pass: string;
  descripcio: string;


  constructor( email = '', username = '', password = '',edat=0, instrument=[], estils=[], descripcio= '', video='') {
    this.email = email;
    this.username = username;
    this.password = password;
    this.edat = edat;
    this.instrument = instrument;
    this.estils = estils;
    this.descripcio = descripcio;
    this.video = video;
  }
  
}
