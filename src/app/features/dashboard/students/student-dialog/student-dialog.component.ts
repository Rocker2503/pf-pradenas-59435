import { Component, Inject } from '@angular/core';
import { Student } from '../../../../models/student';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { emailValidator, nameValidator } from '../../../../shared/utils/custom-validator';
import { generateRandomString } from '../../../../shared/utils';

interface StudentDialogData{
  editingStudent?: Student;
}

@Component({
  selector: 'app-student-dialog',
  templateUrl: './student-dialog.component.html',
  styles: ''
})
export class StudentDialogComponent {

  studentForm: FormGroup;

  constructor(
    private matDialogRef: MatDialogRef<StudentDialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data?: StudentDialogData
  ){
    this.studentForm = this.formBuilder.group({
      firstName: [null,[nameValidator]],
      lastName: [null, [nameValidator]],
      email: [null, [emailValidator]]
    });
    this.patchFormValue();
  }

  get firstNameControl(){
    return this.studentForm.get("firstName");
  }

  get lastNameControl(){
    return this.studentForm.get("lastName");
  }
  
  get emailControl(){
    return this.studentForm.get("email");
  }

  private get isEditing(){
    return !!this.data?.editingStudent;
  }

  patchFormValue(): void{
    if(this.data?.editingStudent){
      this.studentForm.patchValue(this.data?.editingStudent);
    }
  }

  onSave(): void{
    if(this.studentForm.invalid){
      this.studentForm.markAllAsTouched();
    }else{
      if(this.isEditing){
        this.matDialogRef.close({
          ...this.studentForm.value,
          id: this.data?.editingStudent?.id,
          password: this.data?.editingStudent?.password,
          type: this.data?.editingStudent?.type,
          createdAt: this.data?.editingStudent?.createdAt,
          token: this.data?.editingStudent?.token,
        });
      }else{
        this.matDialogRef.close({
          ...this.studentForm.value,
          id: generateRandomString(4),
          type: 'user',
          createdAt: new Date(),
          token: generateRandomString(20),
          password: generateRandomString(6)
        });
      }
    }
  }

}
