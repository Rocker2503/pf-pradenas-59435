import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { generateRandomString } from '../../../../shared/utils';
import { User } from '../../../../models/user';
import { emailValidator, nameValidator } from '../../../../shared/utils/custom-validator';


interface UserDialogData{
  editingUser?: User;
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
      email: [null, [emailValidator]],
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
        id: generateRandomString(4),
        createdAt: new Date()
      });
    }

    
  }
}
