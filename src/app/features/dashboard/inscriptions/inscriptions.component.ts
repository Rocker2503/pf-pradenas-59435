import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Inscription } from '../../../models/inscription';
import { Student } from '../../../models/student';
import { Course } from '../../../models/course';
import { Store } from '@ngrx/store';
import { selectCourseOption, selectInscriptions, selectUserOptions } from './store/inscription.selectors';
import { InscriptionActions } from './store/inscription.actions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-inscriptions',
  templateUrl: './inscriptions.component.html',
  styleUrl: './inscriptions.component.scss'
})
export class InscriptionsComponent implements OnInit{
  inscriptions$: Observable<Inscription[]>;
  userOptions$: Observable<Student[]>;
  coursesOptions$: Observable<Course[]>;

  inscriptionForm: FormGroup;
  displayedColumns: string[] = ["id", "course.name", "course.nivel", "student.name", "actions"];

  constructor(private store: Store, private formBuilder: FormBuilder){
    this.inscriptionForm = this.formBuilder.group({
      courseId: [null, [Validators.required]],
      userId: [null, [Validators.required]]
    });

    this.inscriptions$ = this.store.select(selectInscriptions);
    this.userOptions$ = this.store.select(selectUserOptions);
    this.coursesOptions$ = this.store.select(selectCourseOption);
  }

  ngOnInit(): void {
    this.store.dispatch(InscriptionActions.loadInscriptions());
    this.store.dispatch(InscriptionActions.loadUsersAndCoursesOptions());
  }

  onSubmit(): void{

  }

}
