import { createFeature, createReducer, on } from '@ngrx/store';
import { StudentActions } from './student.actions';
import { Student } from '../../../../models/student';
import { Inscription } from '../../../../models/inscription';

export const studentFeatureKey = 'student';

export interface State {
  students: Student[],
  inscriptions: Inscription[],
  loadStudentError: Error | null,
}

export const initialState: State = {
  students: [],
  inscriptions: [],
  loadStudentError: null,
};

export const reducer = createReducer(
  initialState,
  on(StudentActions.loadStudents, (state) => { 
    return{
      ...state
    }
  }),
  on(StudentActions.loadStudentsSuccess, (state, action) => {
    return{
      ...state,
      students: action.data,
      loadStudentError: null
    }
  }),
  on(StudentActions.loadStudentsFailure, (state,action) => {
    return{
      ...state,
      loadStudentError: null
    }
  }),
  on(StudentActions.createStudent, (state) => {
    return{
      ...state
    }
  }),
  on(StudentActions.createStudentSuccess, (state,action) => {
    return{
      ...state,
      students: action.data,
      loadStudentError: null
    }
  }),
  on(StudentActions.createStudentFailure, (state,action) => {
    return{
      ...state,
      loadStudentError: action.error
    }
  }),
  on(StudentActions.updateStudent, (state) => {
    return{
      ...state,
    }
  }),
  on(StudentActions.updateStudentSuccess, (state,action) => {
    return{
      ...state,
      students: action.data,
      loadStudentError: null
    }
  }),
  on(StudentActions.updateStudentFailure, (state,action) => {
    return{
      ...state,
      loadStudentError: action.error
    }
  }),
  on(StudentActions.deleteStudent, (state) => {
    return{
      ...state
    }
  }),
  on(StudentActions.deleteStudentSuccess, (state, action) => {
    return{
      ...state,
      students: action.data,
      loadStudentError: null
    }
  }),
  on(StudentActions.deleteStudentFailure, (state, action) => {
    return{
      ...state,
      loadStudentError: action.error
    }
  }),
  on(StudentActions.loadStudentInscription, (state) => {
    return{
      ...state,
    }
  }),
  on(StudentActions.loadStudentInscriptionSuccess, (state, action) => {
    return{
      ...state,
      inscriptions: action.data
    }
  }),
  on(StudentActions.loadStudentInscriptionFailure, (state, action) => {
    return{
      ...state,
      loadStudentError: action.error
    }
  }),
  on(StudentActions.deleteStudentInscription, (state) => {
    return{
      ...state,
    }
  }),
  on(StudentActions.deleteStudentInscriptionSuccess, (state, action) => {
    return{
      ...state,
      inscriptions: action.data
    }
  }),
  on(StudentActions.deleteStudentInscriptionFailure, (state, action) => {
    return{
      ...state,
      loadStudentError: action.error
    }
  })
);

export const studentFeature = createFeature({
  name: studentFeatureKey,
  reducer,
});

