import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Inscription } from '../../../models/inscription';
import { Store } from '@ngrx/store';
import { selectInscriptions} from './store/inscription.selectors';
import { InscriptionActions } from './store/inscription.actions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { InscriptionDialogComponent } from './inscription-dialog/inscription-dialog.component';

@Component({
  selector: 'app-inscriptions',
  templateUrl: './inscriptions.component.html',
  styleUrl: './inscriptions.component.scss'
})
export class InscriptionsComponent implements OnInit{
  inscriptions$: Observable<Inscription[]>;

  inscriptionForm: FormGroup;
  displayedColumns: string[] = ["id", "course.name", "course.nivel", "student.name", "actions"];

  constructor(private store: Store, private formBuilder: FormBuilder, private matDialog: MatDialog){
    this.inscriptionForm = this.formBuilder.group({
      courseId: [null, [Validators.required]],
      userId: [null, [Validators.required]]
    });

    this.inscriptions$ = this.store.select(selectInscriptions);
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

  ngOnInit(): void {
    this.store.dispatch(InscriptionActions.loadInscriptions());
  }
  
  
}
