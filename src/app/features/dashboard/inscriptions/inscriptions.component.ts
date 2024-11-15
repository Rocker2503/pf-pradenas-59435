import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Inscription } from '../../../models/inscription';
import { Store } from '@ngrx/store';
import { selectInscriptions} from './store/inscription.selectors';
import { InscriptionActions } from './store/inscription.actions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { InscriptionDialogComponent } from './inscription-dialog/inscription-dialog.component';
import { Student } from '../../../models/student';
import { selectAuthenticatedUser } from '../../../store/auth.selectors';
import { AuthActions } from '../../../store/auth.actions';

@Component({
  selector: 'app-inscriptions',
  templateUrl: './inscriptions.component.html',
  styleUrl: './inscriptions.component.scss'
})
export class InscriptionsComponent implements OnInit{
  
  displayedColumns: string[] = ["id", "course", "nivel", "student", "actions"];
  inscriptions$: Observable<Inscription[]>;
  authUser$: Observable<Student | null>;

  authUser: Student | null = null;

  constructor(private store: Store, private formBuilder: FormBuilder, private matDialog: MatDialog){
    this.authUser$ = this.store.select(selectAuthenticatedUser);
    this.inscriptions$ = this.store.select(selectInscriptions);

    this.authUser$.subscribe({
      next: (resp) => this.authUser = resp
    });
  }

  ngOnInit(): void {
    this.store.dispatch(InscriptionActions.loadInscriptions());
  }

  onDelete(id: string): void{
    if(confirm("¿Está seguro que desea eliminar al estudiante del curso?")){
      this.store.dispatch(InscriptionActions.deleteInscription({id: id}));
    }
  }

  openModal(editingInscription?: Inscription){
    this.matDialog.open(
      InscriptionDialogComponent, {
        height: '40%',
        width: '60%',
        data: {
          editingInscription
        },
      }).afterClosed()
      .subscribe({
        next: (result) => {
          if(result){
            if(editingInscription){
              this.store.dispatch(InscriptionActions.updateInscription({id: result.id , inscription: result}));
            }else{
              this.store.dispatch(InscriptionActions.createInscription(result));
            }
          }
        }
      })
  }
  
}
