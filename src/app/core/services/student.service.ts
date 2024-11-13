import { Injectable } from '@angular/core';
import { Student } from '../../models/student';
import { concatMap, Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private baseURL = environment.apiBaseUrl;

  constructor(private httpClient: HttpClient) { }

  getStudents(): Observable<Student[]>{
    return this.httpClient.get<Student[]>(`${this.baseURL}/students`);
  }

  addStudent(user: Student): Observable<Student>{
    return this.httpClient.post<Student>(`${this.baseURL}/students`, {
      ...user
    });
  }

  getStudentById(id: string): Observable<Student>{
    return this.httpClient.get<Student>(`${this.baseURL}/students/${id}`);
  }

  deleteStudentById(id: string): Observable<Student[]>{
    return this.httpClient.delete<Student>(`${this.baseURL}/students/${id}`).pipe(concatMap( () => this.getStudents()));
  }

  updateStudent(id: string, user: Student): Observable<Student[]>{
    return this.httpClient.patch<Student>(`${this.baseURL}/students/${id}`, user).pipe(concatMap( ()=> this.getStudents()));
  }

}
