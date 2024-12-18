import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map } from 'rxjs/operators';
import { of, forkJoin } from 'rxjs';
import { InscriptionActions } from './inscription.actions';
import { InscriptionService } from '../../../../core/services/inscription.service';
import { Action } from '@ngrx/store';
import { StudentService } from '../../../../core/services/student.service';
import { CoursesService } from '../../../../core/services/courses.service';

@Injectable()
export class InscriptionEffects {

  loadInscriptions$: Actions<Action<string>>;
  loadUserAndCourseOptions$: Actions<Action<string>>;

  createInscription$: Actions<Action<string>>;
  updateInscription$: Actions<Action<string>>;
  deleteInscription$: Actions<Action<string>>;

  constructor(
    private actions$: Actions,
    private inscriptionService: InscriptionService,
    private userService: StudentService,
    private courseService: CoursesService
  ){
    this.loadInscriptions$ = createEffect( () => {
      return this.actions$.pipe(
        ofType(InscriptionActions.loadInscriptions),
        concatMap( () => 
          this.inscriptionService.getAllInscriptions().pipe(
            map((resp) => InscriptionActions.loadInscriptionsSuccess({data: resp})),
            catchError((err) => of(InscriptionActions.loadInscriptionFailure(err)))
          )
        )
      )
    });

    this.loadUserAndCourseOptions$ = createEffect( () => {
      return this.actions$.pipe(
        ofType(InscriptionActions.loadUsersAndCoursesOptions),
        concatMap( () => 
          forkJoin([
            this.courseService.getCourses(),
            this.userService.getUserStudents()
          ]).pipe(
            map((res) => 
              InscriptionActions.loadUsersAndCoursesOptionsSuccess({
                courses: res[0],
                users: res[1]
              })
            ),
            catchError((err) => of(InscriptionActions.loadUsersAndCoursesOptionsFailure(err)))
          )
        )
      )
    });
    
    this.createInscription$ = createEffect( () => {
      return this.actions$.pipe(
        ofType(InscriptionActions.createInscription),
        concatMap ((action) => 
          this.inscriptionService
            .createInscription({
              id: action.id,
              studentId: action.studentId,
              courseId: action.courseId
            })
            .pipe(
              map( (data) => InscriptionActions.createInscriptionSuccess({data})),
              catchError( (error) => 
                of(InscriptionActions.createInscriptionFailure({ error }))
              )
            )
        )
      );
    });

    this.updateInscription$ = createEffect( () => {
      return this.actions$.pipe(
        ofType(InscriptionActions.updateInscription),
        concatMap( (action) => 
          this.inscriptionService.updateInscription(action.id, action.inscription)
          .pipe(
            map( (data) => InscriptionActions.updateInscriptionSuccess({data})),
            catchError( (error) => 
              of(InscriptionActions.updateInscriptionFailure({error}))
            )
          )
        )
      );
    });

    this.deleteInscription$ = createEffect( () => {
      return this.actions$.pipe(
        ofType(InscriptionActions.deleteInscription),
        concatMap( (action) => 
          this.inscriptionService.deleteInscription(action.id)
          .pipe(
            map( (data) => InscriptionActions.deleteInscriptionSuccess({data})),
            catchError( (error) => 
              of(InscriptionActions.updateInscriptionFailure({error}))
            )
          )
        )
      );
    });

  }

}
