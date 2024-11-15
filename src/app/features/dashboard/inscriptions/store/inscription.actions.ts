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
    'Load Users and Courses Options Success': props<{ users: Student[], courses: Course[]}>(),
    'Load Users and Courses Options Failure': props<{ error: Error}>(),

    'Create Inscription': props<{ id: string; studentId: string, courseId: string}>(),
    'Create Inscription Success': props<{ data: Inscription[]}>(),
    'Create Inscription Failure': props<{ error: Error}>(),

    'Update Inscription': props<{id: string, inscription: Inscription}>(),
    'Update Inscription Success': props<{ data: Inscription[] }>(),
    'Update Inscription Failure': props<{ error: Error}>(),

    'Delete Inscription': props<{ id: string }>(),
    'Delete Inscription Success': props<{ data: Inscription[]}>(),
    'Delete Inscription Failure': props<{error: Error}>()
  }
});
