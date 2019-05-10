import configParam from '../../../configParam';

export class Environment {

  urlUser: string = "http://"+configParam.constants().BACKEND_IP+":3000/api/";
  urlSockets: string = "http://"+configParam.constants().BACKEND_IP+":3000";
  //urlUser: string = "http://localhost:3001/api/";
}
