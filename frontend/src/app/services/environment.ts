import configParam from '../../../configParam';

export class Environment {

  urlUser: string = "http://"+configParam.constants().BACKEND_IP+":3001/api/";
  //urlUser: string = "http://localhost:3001/api/";
}
