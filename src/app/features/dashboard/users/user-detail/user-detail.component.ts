import { Component, OnInit } from '@angular/core';
import { User } from '../../../../models/user';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../../../core/services/users.service';
import { Inscription } from '../../../../models/inscription';
import { InscriptionService } from '../../../../core/services/inscription.service';
import { Course } from '../../../../models/course';
import { CoursesService } from '../../../../core/services/courses.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent implements OnInit{
  id?: string;
  user?: User;
  listInscription: Inscription[] = [];
  listCourses: Course[] = [];
  dataSource = [];

  displayedColumns: string[] = ["id", "name", "nivel"];

  constructor(private activatedRoute: ActivatedRoute, 
    private userService: UsersService, 
    private inscriptionService: InscriptionService,
    private coursesService: CoursesService)
    {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.loadInscriptions();

  }
  ngOnInit(): void {
    this.userService.getUserById(this.activatedRoute.snapshot.params['id']).subscribe({
      next: (user) => this.user = user
    }); 
  }

  loadInscriptions(){
    this.inscriptionService.getInscriptions(this.activatedRoute.snapshot.params['id']).subscribe({
      next: (inscriptions) => {
        this.listInscription = inscriptions;
        for(let i = 0; i < this.listInscription.length; i++){
          this.coursesService.getCourseById(this.listInscription[i].idCourse).subscribe({
            next: (course) => {
              this.listCourses = [...this.listCourses, {
                id: course.id,
                name: course.name,
                nivel: course.nivel,
                createdAt: course.createdAt 
              }
            ];
            }
          })
        }
      }
    }); 
  }

  
}
