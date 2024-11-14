import { Component, Inject, OnInit } from '@angular/core';
import { Inscription } from '../../../../models/inscription';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Student } from '../../../../models/student';
import { Course } from '../../../../models/course';
import { Store } from '@ngrx/store';
import { selectCourseOption, selectUserOptions } from '../store/inscription.selectors';
import { InscriptionActions } from '../store/inscription.actions';
import { generateRandomString } from '../../../../shared/utils';

interface InscriptionDialogData{
  editingInscription?: Inscription;
}

@Component({
  selector: 'app-inscription-dialog',
  templateUrl: './inscription-dialog.component.html',
  styles: ''
})
export class InscriptionDialogComponent implements OnInit{
  inscriptionForm: FormGroup;
  userOptions$: Observable<Student[]>;
  courseOptions$: Observable<Course[]>;

  constructor(
    private matDialogRef: MatDialogRef<InscriptionDialogComponent>,
    private formBuilder: FormBuilder,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) public data?: InscriptionDialogData
  ){
    this.inscriptionForm = this.formBuilder.group({
      studentId: [null, [Validators.required]],
      courseId: [null, [Validators.required]]
    });
    this.userOptions$ = this.store.select(selectUserOptions);
    this.courseOptions$ = this.store.select(selectCourseOption);
    this.patchFormValue();
  }

  private get isEditing(){
    return !!this.data?.editingInscription;
  }

  ngOnInit(): void {
    this.store.dispatch(InscriptionActions.loadUsersAndCoursesOptions());
  }

  patchFormValue(){
    if(this.data?.editingInscription){
      this.inscriptionForm.patchValue(this.data?.editingInscription);
    }
  }

  onSave(): void{
    if(this.inscriptionForm.invalid){
      this.inscriptionForm.markAllAsTouched();
    }else{
      if(this.isEditing){
        this.matDialogRef.close({
          ...this.inscriptionForm.value,
          id: this.data?.editingInscription?.id
        })
      }else{
        this.matDialogRef.close({
          ...this.inscriptionForm.value,
          id: generateRandomString(4)
        })
      }
    }
  }

}
