import { Injectable } from '@angular/core';
import { Course } from '../../models/course';
import { generateRandomString } from '../../shared/utils';
import { map, Observable, of } from 'rxjs';


let DB_COURSES: Course[] = [
  {
    id: generateRandomString(5),
    name: 'Angular',
    createdAt: new Date()
  },
  {
    id: generateRandomString(5),
    name: 'React',
    createdAt: new Date()
  },
  {
    id: generateRandomString(5),
    name: 'QA',
    createdAt: new Date()
  }
];

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor() { }

  getCourses(): Observable<Course[]>{
    return of([...DB_COURSES]);
  }

  addCourse(course: Course): Observable<Course[]>{
    DB_COURSES = [
      ...DB_COURSES,
      {...course}
    ];

    return of([...DB_COURSES]);
  }

  deleteCourseById(id: string): Observable<Course[]>{
    DB_COURSES = DB_COURSES.filter((c) => c.id !== id );

    return of([...DB_COURSES]);
  }

  updateCourse(editingCourse: Course, result: Object): Observable<Course[]>{
    DB_COURSES = DB_COURSES.map((course) => course.id === editingCourse.id ? {...course, ...result} : course );

    return of([...DB_COURSES]);
  }

  getCourseById(id: string): Observable<Course | undefined>{
    return this.getCourses().pipe( map((courses) => courses.find((c) => c.id === id)));
  }

}
