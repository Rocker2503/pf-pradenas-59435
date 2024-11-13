import { Component, OnInit } from '@angular/core';
import { Student } from '../../../models/student';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { StudentService } from '../../../core/services/student.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit{
  displayedColumns: string[] = ['id', 'name', 'email', 'createdAt', 'actions'];
  dataSource: Student[] = [];

  constructor(private usersService: StudentService, private matDialog: MatDialog, private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  goToDetail(id: string){
    this.router.navigate([id, 'detail'] , { relativeTo: this.activatedRoute});
  }

  loadStudents(): void{
    this.usersService.getStudents().subscribe({
      next: (users) => this.dataSource = users
    });
  }

  onDelete(id: string) {
    if (confirm('¿Esta seguro de eliminar a este alumno?')) {
      this.usersService.deleteStudentById(id).subscribe({
        next: (users) => this.dataSource = users
      })
    }
  }

  updateStudent(id: string, user: Student): void{
    this.usersService.updateStudent(id, user).subscribe({
      next: 
      (users) => {
        this.dataSource = users;
      }
    })
  }

  openModal(editingUser?: Student): void {
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
              this.updateStudent(editingUser.id, result);
            }else{
              this.usersService.addStudent(result).subscribe({
                next: () => this.loadStudents()
              })
            }
          }
        },
      });
  }

}
