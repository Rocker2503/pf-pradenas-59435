import { Component, OnInit } from '@angular/core';
import { Student } from '../../../../models/student';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../../../../core/services/student.service';
import { Inscription } from '../../../../models/inscription';
import { InscriptionService } from '../../../../core/services/inscription.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent implements OnInit{
  id?: string;
  user?: Student;
  listInscription: Inscription[] = [];
  dataSource = [];

  displayedColumns: string[] = ["id", "name", "nivel"];

  constructor(private activatedRoute: ActivatedRoute, 
    private userService: StudentService, 
    private inscriptionService: InscriptionService)
    {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.loadInscriptions();

  }
  ngOnInit(): void {
    this.userService.getStudentById(this.activatedRoute.snapshot.params['id']).subscribe({
      next: (user) => this.user = user
    }); 
  }

  loadInscriptions(){
    console.log(this.activatedRoute.snapshot.params['id']);
    this.inscriptionService.getInscriptionsByUserId(this.activatedRoute.snapshot.params['id']).subscribe({
      next: (inscriptions) => {
        this.listInscription = inscriptions       
      }
    })
  }

  
}
