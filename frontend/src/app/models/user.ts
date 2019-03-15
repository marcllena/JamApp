export class User {
  email: string;
  username: string;
  password: string;

  constructor(email = '', username = '', password = ''){
    this.email = email;
    this.username = username;
    this.password = password;
  }
}
