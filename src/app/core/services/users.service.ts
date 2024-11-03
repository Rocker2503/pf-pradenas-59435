import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { concatMap, Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseURL = environment.apiBaseUrl;

  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<User[]>{
    return this.httpClient.get<User[]>(`${this.baseURL}/users`);
  }

  addUser(user: User): Observable<User>{
    return this.httpClient.post<User>(`${this.baseURL}/users`, {
      ...user
    });
  }

  getUserById(id: string): Observable<User>{
    return this.httpClient.get<User>(`${this.baseURL}/users/${id}`);
  }

  deleteUserById(id: string): Observable<User[]>{
    return this.httpClient.delete<User>(`${this.baseURL}/users/${id}`).pipe(concatMap( () => this.getUsers()));
  }

  updateUser(id: string, user: User): Observable<User[]>{
    return this.httpClient.patch<User>(`${this.baseURL}/users/${id}`, user).pipe(concatMap( ()=> this.getUsers()));
  }

}
