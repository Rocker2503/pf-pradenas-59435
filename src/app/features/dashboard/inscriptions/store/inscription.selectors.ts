import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromInscription from './inscription.reducer';

export const selectInscriptionState = createFeatureSelector<fromInscription.State>(
  fromInscription.inscriptionFeatureKey
);

export const selectInscriptions = createSelector(
  selectInscriptionState,
  (state) => state.inscriptions
);

export const selectUserOptions = createSelector(
  selectInscriptionState,
  (state) => state.userOption
);

export const selectCourseOption = createSelector(
  selectInscriptionState,
  (state) => state.courseOption
);