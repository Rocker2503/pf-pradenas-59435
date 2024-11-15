import { createFeature, createReducer, on } from '@ngrx/store';
import { InscriptionActions } from './inscription.actions';
import { Inscription } from '../../../../models/inscription';
import { Student } from '../../../../models/student';
import { Course } from '../../../../models/course';

export const inscriptionFeatureKey = 'inscription';

export interface State {
  inscriptions: Inscription[];
  loadInscriptionError: Error | null;
  userOption: Student[],
  courseOption: Course[],
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
  }),
  on(InscriptionActions.createInscription, (state) => {
    return {
      ...state,
    }
  }),
  on(InscriptionActions.createInscriptionSuccess, (state, action) => {
    return {
      ...state,
      inscriptions: action.data,
      loadInscriptionError: null
    }
  }),
  on(InscriptionActions.createInscriptionFailure, (state, action) => {
    return {
      ...state,
      loadInscriptionError: action.error
    }
  }),
  on(InscriptionActions.updateInscription, (state) => {
    return{
      ...state,
    }
  }),
  on(InscriptionActions.updateInscriptionSuccess, (state, action) => {
    return{
      ...state,
      inscriptions: action.data,
      loadInscriptionError: null
    }
  }),
  on(InscriptionActions.updateInscriptionFailure, (state,action) => {
    return{
      ...state,
      loadInscriptionError: action.error
    }
  }),
  on(InscriptionActions.deleteInscription, (state) => {
    return{
      ...state,
    }
  }),
  on(InscriptionActions.deleteInscriptionSuccess, (state, action) => {
    return {
      ...state,
      inscriptions: action.data,
      loadInscriptionError: null
    }
  }),
  on(InscriptionActions.deleteInscriptionFailure, (state, action) => {
    return{
      ...state,
      loadInscriptionError: action.error
    }
  })
);

export const inscriptionFeature = createFeature({
  name: inscriptionFeatureKey,
  reducer,
});

