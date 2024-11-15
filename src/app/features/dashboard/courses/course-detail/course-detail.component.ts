import { Component, OnInit } from '@angular/core';
import { Course } from '../../../../models/course';
import { Inscription } from '../../../../models/inscription';
import { ActivatedRoute } from '@angular/router';
import { InscriptionService } from '../../../../core/services/inscription.service';
import { CoursesService } from '../../../../core/services/courses.service';
import { Student } from '../../../../models/student';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectAuthenticatedUser } from '../../../../store/auth.selectors';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.scss'
})
export class CourseDetailComponent implements OnInit{
  id?: string;
  course?: Course;
  listInscription: Inscription[] = [];

  authUser$: Observable<Student | null>;
  authUser: Student | null = null;

  displayedColumns: string[] = ["id", "name", "email", "createdAt", "actions"];

  constructor(
    private activatedRoute: ActivatedRoute, 
    private inscriptionService: InscriptionService,
    private courseService: CoursesService,
    private store: Store
  ){
    this.authUser$ = this.store.select(selectAuthenticatedUser);
    this.authUser$.subscribe({
      next: (resp) => {
        this.authUser = resp
      }
    })
    this.id = this.activatedRoute.snapshot.params['id'];
    this.loadInscriptions();
  }

  ngOnInit(): void {
    this.courseService.getCourseById(this.activatedRoute.snapshot.params['id']).subscribe({
      next: (resp) => {
        this.course = resp
      }
    })
  }

  onDelete(id: string, idCourse: string){
    if(confirm("¿Está seguro que desea eliminar la inscripción del usuario?")){
      this.inscriptionService.deleteInscriptionByCourse(id, idCourse).subscribe({
        next: (resp) => {
          this.listInscription = resp;
        }
      })
    }
  }

  loadInscriptions(){
    this.inscriptionService.getInscriptionsByCourseId(this.activatedRoute.snapshot.params['id']).subscribe({
      next: (resp) => {
        this.listInscription = resp
      }
    })
  }

}
