import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InscriptionsRoutingModule } from './inscriptions-routing.module';
import { InscriptionsComponent } from './inscriptions.component';
import { EffectsModule } from '@ngrx/effects';
import { InscriptionEffects } from './store/inscription.effects';
import { StoreModule } from '@ngrx/store';
import { inscriptionFeature } from './store/inscription.reducer';
import { SharedModule } from '../../../shared/shared.module';
import { InscriptionDialogComponent } from './inscription-dialog/inscription-dialog.component';


@NgModule({
  declarations: [InscriptionsComponent, InscriptionDialogComponent],
  imports: [
    CommonModule,
    InscriptionsRoutingModule,
    SharedModule,
    StoreModule.forFeature(inscriptionFeature),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([InscriptionEffects])
  ],
  exports: [
    InscriptionsComponent
  ]
})
export class InscriptionsModule { }
