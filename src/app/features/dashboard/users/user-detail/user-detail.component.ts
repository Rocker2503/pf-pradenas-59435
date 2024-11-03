import { Component, OnInit } from '@angular/core';
import { User } from '../../../../models/user';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../../../core/services/users.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent implements OnInit{
  id?: string;
  user?: User;

  constructor(private activatedRoute: ActivatedRoute, private userService: UsersService){
    this.id = this.activatedRoute.snapshot.params['id'];
  }
  ngOnInit(): void {
    this.userService.getUserById(this.activatedRoute.snapshot.params['id']).subscribe({
      next: (user) => this.user = user
    })
  }
}
