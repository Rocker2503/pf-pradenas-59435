import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { CoursesComponent } from './courses/courses.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    loadChildren: () => import('./home/home.module').then(
      (m) => m.HomeModule
    )
  },
  {
    path: 'courses',
    component: CoursesComponent,
    loadChildren: () => import('./courses/courses.module').then(
      (m) => m.CoursesModule
    )
  },
  {
    path: 'users',
    component: UsersComponent,
    loadChildren: () => import('./users/users.module').then(
      (m) => m.UsersModule
    )
  },
  {
    path:'**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
