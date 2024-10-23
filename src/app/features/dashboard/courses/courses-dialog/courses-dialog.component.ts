import { Component, Inject } from '@angular/core';
import { Course } from '../../../../models/course';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { nameValidator } from '../../../../shared/utils/custom-validator';
import { generateRandomString } from '../../../../shared/utils';

interface CourseDialogData{
  editingCourse?: Course;
}

@Component({
  selector: 'app-courses-dialog',
  templateUrl: './courses-dialog.component.html',
  styleUrl: './courses-dialog.component.scss'
})
export class CoursesDialogComponent {
  coursesForm: FormGroup;

  constructor(
    private matDialogRef: MatDialogRef<CoursesDialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data?: CourseDialogData,
  ){
    this.coursesForm = this.formBuilder.group({
      name: [null, [nameValidator]],
    });
    this.patchFormValue();
  }

  get nameControl(){
    return this.coursesForm.get('name');
  }

  patchFormValue(){
    if(this.data?.editingCourse){
      this.coursesForm.patchValue(this.data?.editingCourse);
    }
  }

  onSave(): void{
    if(this.coursesForm.invalid){
      this.coursesForm.markAllAsTouched();
    }else{
      this.matDialogRef.close({
        ...this.coursesForm.value,
        id: generateRandomString(5),
        createdAt: new Date()
      });
    }
  }

}
