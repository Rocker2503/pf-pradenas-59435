import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(
      (m) => m.HomeModule
    )
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then(
      (m) => m.UsersModule
    ),
  },
  {
    path: 'courses',
    loadChildren: () => import('./courses/courses.module').then(
      (m) => m.CoursesModule
    )
  },
  {
    path: 'inscriptions',
    loadChildren: () => import('./inscriptions/inscriptions.module').then(
      (m) => m.InscriptionsModule
    )
  },
  {
    path: 'students',
    loadChildren: () => import('./students/students.module').then(
      (m) => m.StudentsModule
    )
  },
  {
    path: '**',
    redirectTo: 'home'
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
