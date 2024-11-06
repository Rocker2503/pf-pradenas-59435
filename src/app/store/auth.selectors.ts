import { createFeatureSelector, createSelector } from '@ngrx/store';
import { authFeatureName, AuthState } from './auth.reducer';

export const selectAuthState =
  createFeatureSelector<AuthState>(authFeatureName);

export const selectAuthenticatedUser = createSelector(
  selectAuthState,
  (state) => state.authenticatedUser
);
