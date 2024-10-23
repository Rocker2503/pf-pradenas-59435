import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { UsersService } from '../../../core/services/users.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit{
  displayedColumns: string[] = ['id', 'name', 'email', 'createdAt', 'actions'];
  dataSource: User[] = [];

  constructor(private usersService: UsersService, private matDialog: MatDialog) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void{
    this.usersService.getUsers().subscribe({
      next: (users) => this.dataSource = users
    });
  }

  onDelete(id: string) {
    if (confirm('Esta seguro?')) {
      this.usersService.deleteUserById(id).subscribe({
        next: (users) => this.dataSource = users
      })
    }
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
              this.usersService.updateUser(editingUser, result).subscribe({
                next: (users) => this.dataSource = users
              })
            }else{
              this.usersService.addUser(result).subscribe({
                next: (users) => this.dataSource = users
              })
            }
          }
        },
      });
  }

}
