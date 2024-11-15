import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseDetailRoutingModule } from './course-detail-routing.module';
import { CourseDetailComponent } from './course-detail.component';
import { SharedModule } from '../../../../shared/shared.module';


@NgModule({
  declarations: [
    CourseDetailComponent
  ],
  imports: [
    CommonModule,
    CourseDetailRoutingModule,
    SharedModule
  ]
})
export class CourseDetailModule { }
