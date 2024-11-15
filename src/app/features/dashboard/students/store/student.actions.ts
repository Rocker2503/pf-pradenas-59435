import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Student } from '../../../../models/student';
import { Inscription } from '../../../../models/inscription';

export const StudentActions = createActionGroup({
  source: 'Student',
  events: {
    'Load Students': emptyProps(),
    'Load Students Success': props<{data: Student[]}>(),
    'Load Students Failure': props<{ error: Error }>(),
    
    'Create Student': props<{ student: Student }>(),
    'Create Student Success': props<{ data: Student[] }>(),
    'Create Student Failure': props<{ error: Error}>(),

    'Update Student': props<{ id: string, student: Student }>(),
    'Update Student Success': props<{ data: Student[]} >(),
    'Update Student Failure': props<{ error: Error }>(),
    
    'Delete Student': props<{ id: string}>(),
    'Delete Student Success': props<{ data: Student[]}>(),
    'Delete Student Failure': props<{ error: Error }>(),

    'Load Student Inscription': props<{ id: string}>(),
    'Load Student Inscription Success': props<{ data: Inscription[]}>(),
    'Load Student Inscription Failure': props<{ error: Error}>(),

    'Delete Student Inscription': props<{ id: string, idStudent: string}>(),
    'Delete Student Inscription Success': props<{ data: Inscription[] }>(),
    'Delete Student Inscription Failure': props<{ error: Error}>(),
  }
});
