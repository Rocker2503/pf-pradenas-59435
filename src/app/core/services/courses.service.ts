import { Injectable } from '@angular/core';
import { Course } from '../../models/course';
import { generateRandomString } from '../../shared/utils';
import { concatMap, map, Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private baseURL = environment.apiBaseUrl;

  constructor(private httpClient: HttpClient) { }

  getCourses(): Observable<Course[]>{
    return this.httpClient.get<Course[]>(`${this.baseURL}/courses`);
  }

  addCourse(course: Course): Observable<Course[]>{
    return this.httpClient.post<Course>(`${this.baseURL}/courses`, {...course}).pipe(concatMap( ()=> this.getCourses()));
  }

  deleteCourseById(id: string): Observable<Course[]>{
    return this.httpClient.delete<Course>(`${this.baseURL}/courses/${id}`).pipe(concatMap(() => this.getCourses()));
  }

  updateCourse(id: string, course: Course): Observable<Course[]>{
    return this.httpClient.patch<Course>(`${this.baseURL}/courses/${id}`, course).pipe(concatMap( ()=> this.getCourses()));
  }

  getCourseById(id: string): Observable<Course>{
    return this.httpClient.get<Course>(`${this.baseURL}/courses/${id}`);
  }

}
