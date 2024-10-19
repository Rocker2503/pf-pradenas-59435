import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { CoursesComponent } from './courses.component';
import { CoursesDialogComponent } from './courses-dialog/courses-dialog.component';


@NgModule({
  declarations: [
    CoursesComponent, 
    CoursesDialogComponent,
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    SharedModule,
  ],
  exports: [
    CoursesComponent,
  ]
})
export class CoursesModule { }
