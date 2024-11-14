import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { generateRandomString } from '../../../../shared/utils';
import { Student } from '../../../../models/student';
import { nameValidator } from '../../../../shared/utils/custom-validator';


interface UserDialogData{
  editingUser?: Student;
}

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styles: ``,
})
export class UserDialogComponent {
  userForm: FormGroup;

  constructor(
    private matDialogRef: MatDialogRef<UserDialogComponent>, 
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data?: UserDialogData
  ) {

    this.userForm = this.formBuilder.group({
      firstName:[null, [nameValidator]],
      lastName: [null, [nameValidator]],
      email: [null, [Validators.email]],
    });
    this.patchFormValue();
  }

  get firstNameControl(){
    return this.userForm.get('firstName');
  }
  
  get lastNameControl(){
    return this.userForm.get('lastName');
  }

  get emailControl(){
    return this.userForm.get('email');
  }

  private get isEditing() {
    return !!this.data?.editingUser;
  }

  patchFormValue(){
    if(this.data?.editingUser){
      this.userForm.patchValue(this.data?.editingUser);
    }
  }

  onSave(): void {
    if(this.userForm.invalid){
      this.userForm.markAllAsTouched();
    }else{
      this.matDialogRef.close({
        ...this.userForm.value,
        id: this.isEditing ? this.data!.editingUser!.id : generateRandomString(4),
        password: generateRandomString(6),
        createdAt: this.isEditing ? this.data!.editingUser!.createdAt : new Date(),
        type: "user",
        token: generateRandomString(20)
      });
    }

    
  }
}
