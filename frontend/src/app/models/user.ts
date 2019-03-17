export class User {
  _id: string;
  email: string;
  username: string;
  password: string;
  edat: Number;
  fotoPerfil: String;
  instrument:[String];
  ubicacio:String;
  coordenades:[Number];
  descripcio:String;
  video:String;
  estils:[String];

  constructor(email = '', username = '', password = '') {
    this.email = email;
    this.username = username;
    this.password = password;
  }
  
}
