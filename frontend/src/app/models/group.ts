import {User } from './user';

export class Group {
    _id: string;
    name: string;
    email: string;
    fotoGrup: string;
    integrants: User[];
    solicituds: User[];
    ubicacio: string;
    description: string;
    video: string;
    estils: [string];

    constructor(name = '', email='',description='') {
        this.name = name;
        this.email = email;
        this.description = description;
    }
}
