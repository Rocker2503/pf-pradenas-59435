import { Component, OnInit } from '@angular/core';
import { User } from '../../../../models/user';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../../../core/services/users.service';
import { Inscription } from '../../../../models/inscription';
import { InscriptionService } from '../../../../core/services/inscription.service';
import { Course } from '../../../../models/course';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent implements OnInit{
  id?: string;
  user?: User;
  listInscription: Inscription[] = [];
  dataSource = [];

  displayedColumns: string[] = ["id", "name", "nivel"];

  constructor(private activatedRoute: ActivatedRoute, 
    private userService: UsersService, 
    private inscriptionService: InscriptionService)
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
    this.inscriptionService.getInscriptionsByUserId(this.activatedRoute.snapshot.params['id']).subscribe({
      next: (inscriptions) => {
        this.listInscription = inscriptions       
      }
    })
  }

  
}
