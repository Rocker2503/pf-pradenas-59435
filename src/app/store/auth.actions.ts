import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../models/user';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'Set Authenticated User': props<{user: User}>(),
    'Unset Authenticated User': emptyProps(),
  }
});
