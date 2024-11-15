import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { catchError, concatMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { StudentActions } from './student.actions';
import { StudentService } from '../../../../core/services/student.service';
import { InscriptionService } from '../../../../core/services/inscription.service';

@Injectable()
export class StudentEffects {

  loadStudents$: Actions<Action<string>>;
  createStudent$: Actions<Action<string>>;
  updateStudent$: Actions<Action<string>>;
  deleteStudent$: Actions<Action<string>>;

  loadInscription$: Actions<Action<string>>;
  deleteInscription$: Actions<Action<string>>;

  constructor(
    private actions$: Actions,
    private studentService: StudentService,
    private inscriptionService: InscriptionService
  ){

    this.loadStudents$ = createEffect( () => {
      return this.actions$.pipe(
        ofType(StudentActions.loadStudents),
        concatMap( () => 
          this.studentService.getUserStudents().pipe(
            map( (resp) => StudentActions.loadStudentsSuccess({data: resp})),
            catchError((err) => of(StudentActions.loadStudentsFailure(err)))
          )
        )
      )
    });

    this.createStudent$ = createEffect( () => {
      return this.actions$.pipe(
        ofType(StudentActions.createStudent),
        concatMap( (action) => 
          this.studentService.addStudent(action.student)
          .pipe(
            map ( (resp) => StudentActions.createStudentSuccess({data: resp})),
            catchError( (error) => of(StudentActions.createStudentFailure({error})))
          )
        )
      )
    });

    this.updateStudent$ = createEffect( () => {
      return this.actions$.pipe(
        ofType(StudentActions.updateStudent),
        concatMap( (action) => 
          this.studentService.updateStudent(action.id,action.student)
          .pipe(
            map( (resp) => StudentActions.updateStudentSuccess({data: resp})),
            catchError( (error) => of(StudentActions.updateStudentFailure({error})))
          )
        )
      )
    });

    this.deleteStudent$ = createEffect( () => {
      return this.actions$.pipe(
        ofType(StudentActions.deleteStudent),
        concatMap( (action) => 
          this.studentService.deleteStudentById(action.id)
          .pipe(
            map( (resp) => StudentActions.deleteStudentSuccess({data: resp})),
            catchError( (error) => of(StudentActions.deleteStudentFailure({error})))
          )
        )
      )
    });

    this.loadInscription$ = createEffect( () => {
      return this.actions$.pipe(
        ofType(StudentActions.loadStudentInscription),
        concatMap ( (action) => 
          this.inscriptionService.getInscriptionsByUserId(action.id)
          .pipe(
            map ( (resp) => StudentActions.loadStudentInscriptionSuccess({data: resp})),
            catchError( (error) => of(StudentActions.loadStudentInscriptionFailure({error})))
          )
        )
      )
    });

    this.deleteInscription$ = createEffect( () => {
      return this.actions$.pipe(
        ofType(StudentActions.deleteStudentInscription),
        concatMap ( (action) => 
          this.inscriptionService.deleteInscriptionByUser(action.id, action.idStudent)
          .pipe(
            map( (resp) => StudentActions.deleteStudentInscriptionSuccess( {data: resp})),
            catchError( (error) => of(StudentActions.deleteStudentInscriptionFailure({error})))
          )
        )
      )
    });

  }


}
