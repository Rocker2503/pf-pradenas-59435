import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { UsersService } from '../../../core/services/users.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit{
  displayedColumns: string[] = ['id', 'name', 'email', 'createdAt', 'actions'];
  dataSource: User[] = [];

  constructor(private usersService: UsersService, private matDialog: MatDialog, private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  goToDetail(id: string){
    this.router.navigate([id, 'detail'] , { relativeTo: this.activatedRoute});
  }

  loadUsers(): void{
    this.usersService.getUsers().subscribe({
      next: (users) => this.dataSource = users
    });
  }

  onDelete(id: string) {
    if (confirm('¿Esta seguro de eliminar a este alumno?')) {
      this.usersService.deleteUserById(id).subscribe({
        next: (users) => this.dataSource = users
      })
    }
  }

  updateUser(id: string, user: User): void{
    this.usersService.updateUser(id, user).subscribe({
      next: 
      (users) => {
        this.dataSource = users;
      }
    })
  }

  openModal(editingUser?: User): void {
    this.matDialog
      .open(UserDialogComponent, {
        height: '40%',
        width: '60%',
        data:{
          editingUser
        },
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (result) {
            if(editingUser){
              this.updateUser(editingUser.id, result);
            }else{
              this.usersService.addUser(result).subscribe({
                next: () => this.loadUsers()
              })
            }
          }
        },
      });
  }

}
