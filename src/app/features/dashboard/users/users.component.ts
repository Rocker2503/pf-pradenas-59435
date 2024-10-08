import { Component } from '@angular/core';
import { User } from '../../../models/user';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { MatDialog } from '@angular/material/dialog';

const ELEMENT_DATA: User[] = [
  {id: 'ABC1', firstName: 'Raul', lastName: 'Alvarez', email: 'auronplay@gmail.com', createdAt: new Date()},
  {id: 'ABC2', firstName: 'Ruben', lastName: 'Doblas', email: 'elrubiuswtf@gmail.com', createdAt: new Date()},
  {id: 'ABC2', firstName: 'Juan', lastName: 'Garcia', email: 'illojuan@gmail.com', createdAt: new Date()},
  {id: 'ABC3', firstName: 'Juan', lastName: 'Guarnizo', email: 'juansguarnizo@gmail.com', createdAt: new Date()},
  {id: 'ABC4', firstName: 'Ibai', lastName: 'Llanos', email: 'ibaillanos@gmail.com', createdAt: new Date()},
  {id: 'ABC5', firstName: 'Cristina', lastName: 'Lopez', email: 'cristinini@gmail.com', createdAt: new Date()},
];

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  displayedColumns: string[] = ['id', 'name', 'email', 'createdAt', 'actions'];
  dataSource = ELEMENT_DATA;

  constructor(private matDialog: MatDialog) {}

  onDelete(id: string) {
    if (confirm('Esta seguro?')) {
      this.dataSource = this.dataSource.filter((user) => user.id !== id);
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
          console.log('RECIBIMOS: ', result);

          if (!!result) {

            if(editingUser){
              this.dataSource = this.dataSource.map((user) => user.id === editingUser.id ? {...user, ...result} : user);

            }else{

              this.dataSource = [
                ...this.dataSource,
                {...result}
              ];
            }
          }
        },
      });
  }

}
