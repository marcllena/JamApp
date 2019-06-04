import {User } from './user';

export class Group {
    _id: string;
    name: string;
    email: string;
    fotoGrup: string;
    integrants: User[];
    solicituds: User[];
    latitud: number;
    longitud: number;
    description: string;
    video: string;
    estils: string[];

    constructor(name = '', email='',description='', latitud,longitud,estils=[]) {
        this.name = name;
        this.email = email;
        this.description = description;
        this.estils = estils;
        this.latitud=latitud;
        this.longitud=longitud;
    }
}
