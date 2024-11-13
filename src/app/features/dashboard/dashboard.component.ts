import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { map, Observable } from 'rxjs';
import { Student } from '../../models/student';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent{
  showFiller = false;

  authUser$: Observable<Student | null>;
  type: string | undefined;

  constructor(private router: Router, private authService: AuthService){
    this.type = "";
    this.authUser$ = this.authService.authUser$;
    this.authUser$.subscribe( (resp) => this.type = resp?.type);
  }

  logout(): void{
    localStorage.removeItem('token');
    this.router.navigate(['auth', 'login']);
  }
}
