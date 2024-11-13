import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Inscription } from '../../../../models/inscription';
import { Student } from '../../../../models/student';
import { Course } from '../../../../models/course';

export const InscriptionActions = createActionGroup({
  source: 'Inscription',
  events: {
    'Load Inscriptions': emptyProps(),
    'Load Inscriptions Success': props<{ data: Inscription[] }>(),
    'Load Inscription Failure': props<{ error: Error} >(),

    'Load Users and Courses Options': emptyProps(),
    'Load Users and Courses Options Success': props<{
        users: Student[],
        courses: Course[]
    }>(),
    'Load Users and Courses Options Failure': props<{ error: Error}>(),
  }
});
