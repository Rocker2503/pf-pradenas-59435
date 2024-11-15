import { Component, OnInit } from '@angular/core';
import { Student } from '../../../models/student';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { selectStudents } from './store/student.selectors';
import { StudentActions } from './store/student.actions';
import { StudentDialogComponent } from './student-dialog/student-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { selectAuthenticatedUser } from '../../../store/auth.selectors';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent implements OnInit{
  displayedColumns: string[] = ['id', 'name', 'email', 'createdAt', 'actions'];
  students$: Observable<Student[]>;

  authUser$: Observable<Student | null>;
  authUser: Student | null = null;

  constructor(
    private store: Store,
    private matDialog: MatDialog ,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ){
    this.authUser$ = this.store.select(selectAuthenticatedUser);
    this.authUser$.subscribe({
      next: (user) => this.authUser = user
    })
    this.students$ = this.store.select(selectStudents);
  }

  ngOnInit(): void {
    this.store.dispatch(StudentActions.loadStudents());
  }

  goToDetail(id: string){
    this.router.navigate([id, 'detail'], {relativeTo: this.activatedRoute });
  }

  onDelete(id: string): void{
    if(confirm("¿Está seguro que desea eliminar a este estudiante?")){
      this.store.dispatch(StudentActions.deleteStudent({id: id}));
    }
  }

  openModal(editingStudent?: Student){
    this.matDialog.open(
      StudentDialogComponent, {
        height: '40%',
        width: '60%',
        data: { 
          editingStudent 
        },
      }).afterClosed()
      .subscribe({
        next: (result) => {
          if(result){
            if(editingStudent){
              this.store.dispatch(StudentActions.updateStudent({id: result.id, student: result}));
            }else{
              this.store.dispatch(StudentActions.createStudent({student: result}));
            }
          }
        }
      })
  }
}
