import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, throwError } from 'rxjs';
import { Student } from '../../models/student';
import { environment } from '../../../environments/environment.development';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthData } from '../../models/authdata';
import { Store } from '@ngrx/store';
import { selectAuthenticatedUser } from '../../store/auth.selectors';
import { AuthActions } from '../../store/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _authUser$ = new BehaviorSubject<null | Student>(null);
  public authUser$ = this._authUser$.asObservable();
  private baseURL = environment.apiBaseUrl;

  constructor(private router: Router, private httpClient: HttpClient, private store: Store) {
    this.authUser$ = this.store.select(selectAuthenticatedUser);
  }

  private handleAuthentication(users: Student[]): Student | null {
    if(!!users[0]){
      this.store.dispatch(AuthActions.setAuthenticatedUser({user: users[0]}));
      this._authUser$.next(users[0]);
      localStorage.setItem('token', users[0].token);
      return users[0];
    }else{
      return null;
    }
  }

  login(data: AuthData): Observable<Student> {
    return this.httpClient
      .get<Student[]>(
        `${this.baseURL}/students?email=${data.email}&password=${data.password}`
      )
      .pipe(
        map((users) => {
          const user = this.handleAuthentication(users);
          if (user) {
            return user;
          } else {
            throw new Error('Los datos son invalidos');
          }
        })
      );
  }

  verifyToken(): Observable<boolean>{
    return this.httpClient
    .get<Student[]>(
      `${this.baseURL}/students?token=${localStorage.getItem('token')}`
    )
    .pipe(
      map((users) => {
        const user = this.handleAuthentication(users);
        return !!user;
      })
    );
  }

  logout(){
    this.store.dispatch(AuthActions.unsetAuthenticatedUser());
    localStorage.removeItem('token');
    this.router.navigate(['auth', 'login']);
  }


}
