import { createFeature, createReducer, on } from '@ngrx/store';
import { InscriptionActions } from './inscription.actions';
import { Inscription } from '../../../../models/inscription';
import { User } from '../../../../models/user';
import { Course } from '../../../../models/course';

export const inscriptionFeatureKey = 'inscription';

export interface State {
  inscriptions: Inscription[];
  loadInscriptionError: Error | null;
  userOption: User[],
  courseOption: Course[]
}

export const initialState: State = {
  inscriptions: [],
  userOption: [],
  courseOption: [],
  loadInscriptionError: null,
};

export const reducer = createReducer( 
  initialState,
  on(InscriptionActions.loadInscriptions, (state) => {
    return {
      ...state
    }
  }),
  on(InscriptionActions.loadInscriptionsSuccess, (state, action) => {
    return {
      ...state,
      inscriptions: action.data,
      loadInscriptionError: null,
    }
  }),
  on(InscriptionActions.loadInscriptionFailure, (state, action) => {
    return {
      ...state,
      ...initialState,
      loadInscriptionError: action.error
    }
  }),
  on(InscriptionActions.loadUsersAndCoursesOptions, (state) => {
    return {
      ...state
    };
  }),
  on(InscriptionActions.loadUsersAndCoursesOptionsSuccess, (state, action) => {
    return {
      ...state,
      loadInscriptionError: null,
      userOption: action.users,
      courseOption: action.courses
    };
  }),
  on(InscriptionActions.loadUsersAndCoursesOptionsFailure, (state, action) => {
    return {
      ...state,
      loadInscriptionError: action.error,
    }
  })
);

export const inscriptionFeature = createFeature({
  name: inscriptionFeatureKey,
  reducer,
});
