import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { Observable, of } from 'rxjs';

let DB_USERS: User[] = [
  {id: 'ABC1', firstName: 'Raul', lastName: 'Alvarez', email: 'auronplay@gmail.com', createdAt: new Date()},
  {id: 'ABC2', firstName: 'Ruben', lastName: 'Doblas', email: 'elrubiuswtf@gmail.com', createdAt: new Date()},
  {id: 'ABC3', firstName: 'Juan', lastName: 'Garcia', email: 'illojuan@gmail.com', createdAt: new Date()},
  {id: 'ABC4', firstName: 'Juan', lastName: 'Guarnizo', email: 'juansguarnizo@gmail.com', createdAt: new Date()},
  {id: 'ABC5', firstName: 'Ibai', lastName: 'Llanos', email: 'ibaillanos@gmail.com', createdAt: new Date()},
  {id: 'ABC6', firstName: 'Cristina', lastName: 'Lopez', email: 'cristinini@gmail.com', createdAt: new Date()},
];


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor() { }

  getUsers(): Observable<User[]>{
    return of([...DB_USERS]);
  }

  addUser(user: User): Observable<User[]>{
    DB_USERS = [
      ...DB_USERS,
      {...user}
    ];

    return of([...DB_USERS]);
  }

  deleteUserById(id: string): Observable<User[]>{
    DB_USERS = DB_USERS.filter((u) => u.id !== id);

    return of([...DB_USERS]);
  }

  updateUser(editingUser: User, result: Object): Observable<User[]>{
    DB_USERS = DB_USERS.map((user) => user.id === editingUser.id ? {...user,...result} : user ); 

    return of([...DB_USERS]);
  }

}
