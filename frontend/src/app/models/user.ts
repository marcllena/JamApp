export class User {
  _id: string;
  email: string;
  username: string;
  password: string;
  edat: Number;
  fotoPerfil: String;
  instrument: string[];
  ubicacio:String;
  coordenades:[Number];
  descripcio:String;
  video:String;
  estils: string[];
  userType:number;
  pass: string;


  constructor( email = '', username = '', password = '',edat=0, instrument=[], estils=[]) {
    this.email = email;
    this.username = username;
    this.password = password;
    this.edat = edat;
    this.instrument = instrument;
    this.estils = estils;
  }
  
}
