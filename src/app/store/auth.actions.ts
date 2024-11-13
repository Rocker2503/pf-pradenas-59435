import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store';
import { Student } from '../models/student';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'Set Authenticated User': props<{user: Student}>(),
    'Unset Authenticated User': emptyProps(),
  }
});
