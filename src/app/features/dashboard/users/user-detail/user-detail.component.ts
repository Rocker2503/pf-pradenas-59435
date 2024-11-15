import { Component, OnInit } from '@angular/core';
import { Student } from '../../../../models/student';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../../../../core/services/student.service';
import { InscriptionService } from '../../../../core/services/inscription.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent implements OnInit{
  id?: string;
  user?: Student;
  passwordInputType: 'password' | 'text' = 'password';
  
  constructor(private activatedRoute: ActivatedRoute, 
    private userService: StudentService, 
    private inscriptionService: InscriptionService
  )
    {
    this.id = this.activatedRoute.snapshot.params['id'];

  }
  ngOnInit(): void {
    this.userService.getStudentById(this.activatedRoute.snapshot.params['id']).subscribe({
      next: (user) => this.user = user
    }); 
  }

  togglePasswordInputType(){
    if (this.passwordInputType === 'password') {
      this.passwordInputType = 'text';
    } else {
      this.passwordInputType = 'password';
    }
  }
}
