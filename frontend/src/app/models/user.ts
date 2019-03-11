export class User {
  email: string;
  displayName: string;
  avatar: string;
  password: string;

  constructor(email = '', displayName = '', avatar = '', password = ''){
    this.email = email;
    this.displayName = displayName;
    this.avatar = avatar;
    this.password = password;
  }
}
