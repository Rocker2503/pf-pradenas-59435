import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { nameValidator } from '../../../shared/utils/custom-validator';
import { StudentService } from '../../../core/services/student.service';
import { generateRandomString } from '../../../shared/utils';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  passwordInputType: 'password' | 'text' = 'password';
  messageCreated: string;
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: StudentService
  ){
    this.registerForm = formBuilder.group({
      firstName: [null, [Validators.required ,nameValidator]],
      lastName: [null, [Validators.required ,nameValidator]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
    this.messageCreated = "";
  }
  
  togglePasswordInputType(): void {
    if (this.passwordInputType === 'password') {
      this.passwordInputType = 'text';
    } else {
      this.passwordInputType = 'password';
    }
  }

  onSubmit(): void{
    if(this.registerForm.invalid){
      this.registerForm.markAllAsTouched();
    }else{
      this.userService.addStudent({
        ...this.registerForm.value,
        id: generateRandomString(4),
        createdAt: new Date(),
        type: "user",
        token: generateRandomString(20)
      }).subscribe({
        next: (result) => {
          this.messageCreated = "Usuario creado con éxito";
        }
      })
    }
  }

}
