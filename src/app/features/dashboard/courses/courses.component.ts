import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../../core/services/courses.service';
import { Course } from '../../../models/course';
import { MatDialog } from '@angular/material/dialog';
import { CoursesDialogComponent } from './courses-dialog/courses-dialog.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnInit{

  isEditing = false;
  courses: Course[] = [];
  displayedColumns: string[] = ['id', 'name', 'nivel', 'createdAt', 'actions'];

  constructor(private coursesService: CoursesService, private matDialog: MatDialog){}

  ngOnInit(): void {
    this.loadCourses();
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
    console.log(editingCourse);
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
