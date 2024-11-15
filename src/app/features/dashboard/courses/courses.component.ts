import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../../core/services/courses.service';
import { Course } from '../../../models/course';
import { MatDialog } from '@angular/material/dialog';
import { CoursesDialogComponent } from './courses-dialog/courses-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Student } from '../../../models/student';
import { Store } from '@ngrx/store';
import { selectAuthenticatedUser } from '../../../store/auth.selectors';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnInit{

  isEditing = false;
  courses: Course[] = [];
  displayedColumns: string[] = ['id', 'name', 'nivel', 'createdAt', 'actions'];

  authUser$: Observable<Student | null>;
  authUser: Student | null = null;

  constructor(
    private coursesService: CoursesService, 
    private matDialog: MatDialog, 
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store
  ){
    this.authUser$ = this.store.select(selectAuthenticatedUser);
    this.authUser$.subscribe({
      next: (user) => this.authUser = user
    });
  }
  ngOnInit(): void {
    this.loadCourses();
  }

  goToDetail(id: string):void{
    this.router.navigate([id, 'detail'], {relativeTo: this.activatedRoute});
  }

  loadCourses():void{
    this.coursesService.getCourses().subscribe({
      next: (courses) => this.courses = courses
    });
  }

  onDelete(id: string): void{
    if(confirm("¿Está seguro que desea eliminar el curso?")){
      this.coursesService.deleteCourseById(id).subscribe({
        next: (courses) => this.courses = courses
      })
    }
  }

  openModal(editingCourse?: Course): void{
    this.matDialog.open(
      CoursesDialogComponent, {
        height: '40%',
        width: '60%',
        data:{
          editingCourse
        },
      }).afterClosed()
      .subscribe({
        next: (result) => {
          if(result){
            if(editingCourse){
              this.coursesService.updateCourse(editingCourse.id, result).subscribe({
                next: (courses) => this.courses = courses
              })
            }else{
              this.coursesService.addCourse(result).subscribe({
                next: (courses) => this.courses = courses
              })
            }
          }
        }
      });
  }

}
