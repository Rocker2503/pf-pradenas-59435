import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  passwordInputType: 'password' | 'text' = 'password';

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router){
    this.loginForm = formBuilder.group({
      email: [null,[Validators.required, Validators.email]],
      password:[ null, [Validators.required]]
    });
  }

  togglePasswordInputType(): void {
    if (this.passwordInputType === 'password') {
      this.passwordInputType = 'text';
    } else {
      this.passwordInputType = 'password';
    }
  }
  
  doLogin(): void{
    console.log("entra al doLogin");
    this.authService.login(this.loginForm.value).subscribe({
      next: (result) => {
        this.router.navigate(['dashboard', 'home']);
      },
      error: (err) => {
        console.log(err);
        if(err instanceof Error){
          alert(err.message);
        }
        if(err instanceof HttpErrorResponse){
          if(err.status === 0){
            alert('No se pudo conectar con el servidor');
          }
        }
      }
    })
  }

  onSubmit(): void{
      console.log("Submit");
    if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched();
    }else{
      this.doLogin();
    }
  }
}