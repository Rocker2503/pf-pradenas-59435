import { createFeature, createReducer, on } from '@ngrx/store';
import { AuthActions } from './auth.actions';
import { Student } from '../models/student';

export const authFeatureName = 'auth';

export interface AuthState{
  authenticatedUser: Student | null;
};

const initialState: AuthState = {
  authenticatedUser: null,
}

export const AuthReducer = createReducer(
  initialState,
  on(AuthActions.setAuthenticatedUser, (state, action) => {
    return {
      ...state,
      authenticatedUser: action.user,
    };
  }),
  on(AuthActions.unsetAuthenticatedUser, (state) => {
    return {
      ...state,
      authenticatedUser: null,
    };
  })
);

