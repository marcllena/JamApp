export class Jam {

  _id: string;
  name: string;
  estils: string[];
  participantsSolistes: string[];
  participantsGrups:string[];
  dataIntencio: string;
  dataConfirmda: string;
  local: string;
  description: string;
  organitzador: string;


  constructor( dataIntencio = '', name = '', dataConfirmda = '', local="", participantsSolistes=[], participantsGrups=[], estils=[], description= '', organitzador='') {
    this.name = name;
    this.estils = estils;
    this.description = description;
    this.participantsGrups=participantsGrups;
    this.participantsSolistes=participantsSolistes;
    this.dataIntencio=dataIntencio;
    this.dataConfirmda=dataConfirmda;
    this.local=local;
    this.organitzador=organitzador

  }
  
}
