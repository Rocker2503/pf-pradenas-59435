import { Component, OnInit} from '@angular/core';
import { Student } from '../../../../models/student';
import { Inscription } from '../../../../models/inscription';
import { ActivatedRoute } from '@angular/router';
import { InscriptionService } from '../../../../core/services/inscription.service';
import { StudentService } from '../../../../core/services/student.service';
import { Store } from '@ngrx/store';
import { concatMap, Observable } from 'rxjs';
import { selectAuthenticatedUser } from '../../../../store/auth.selectors';
import { InscriptionActions } from '../../inscriptions/store/inscription.actions';
import { StudentActions } from '../store/student.actions';
import { selectInscriptions } from '../store/student.selectors';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrl: './student-detail.component.scss'
})
export class StudentDetailComponent implements OnInit{
  
  id?: string;
  student?: Student;
  listInscription: Observable<Inscription[]>;
  displayedColumns: string[] = ["id", "curso", "nivel", "alumno", "actions"];

  authUser$: Observable<Student | null>; 
  authUser: Student | null = null;

  constructor(
    private activatedRoute: ActivatedRoute, 
    private inscriptionService: InscriptionService,
    private studentService: StudentService,
    private store: Store
  ){
    this.listInscription = this.store.select(selectInscriptions);
    this.authUser$ = this.store.select(selectAuthenticatedUser);
    this.id = this.activatedRoute.snapshot.params['id'];
    
    this.authUser$.subscribe({
      next: (resp) => {
        this.authUser = resp;
      }
    })
  }
  ngOnInit(): void {
    this.store.dispatch(StudentActions.loadStudentInscription({id: this.activatedRoute.snapshot.params['id']}))
    this.studentService.getStudentById(this.activatedRoute.snapshot.params['id'])
    .subscribe({
      next: (student) => {
        this.student = student;
      }
    });
  }

  onDelete(id: string, idStudent: string){
    if(confirm("¿Está seguro que desea eliminar su inscripción?")){
      this.store.dispatch(StudentActions.deleteStudentInscription({id: id, idStudent: idStudent}));
    }
  }


}
