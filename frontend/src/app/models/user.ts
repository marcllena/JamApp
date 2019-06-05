export class User {
  _id: string;
  email: string;
  username: string;
  password: string;
  facebookId: string;
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


  constructor( email = '', username = '', password = '',edat=0, instrument=[], estils=[], descripcio= '', video='', facebookId = '') {
    this.email = email;
    this.facebookId = facebookId;
    this.username = username;
    this.password = password;
    this.edat = edat;
    this.instrument = instrument;
    this.estils = estils;
    this.descripcio = descripcio;
    this.video = video;
  }
  
}
