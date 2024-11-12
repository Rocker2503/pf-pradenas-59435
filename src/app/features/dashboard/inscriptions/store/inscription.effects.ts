import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, map } from 'rxjs/operators';
import { Observable, EMPTY, of, forkJoin } from 'rxjs';
import { InscriptionActions } from './inscription.actions';
import { InscriptionService } from '../../../../core/services/inscription.service';
import { Action } from '@ngrx/store';
import { UsersService } from '../../../../core/services/users.service';
import { CoursesService } from '../../../../core/services/courses.service';

@Injectable()
export class InscriptionEffects {

  loadInscriptions$: Actions<Action<string>>;
  loadUserAndCourseOptions$: Actions<Action<string>>;

  constructor(
    private actions$: Actions,
    private inscriptionService: InscriptionService,
    private userService: UsersService,
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
            this.userService.getUsers()
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
  }

  
}
