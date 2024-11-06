import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

const routes: Routes = [
  /** /dashboard/users */
  {
    path: '',
    component: UsersComponent,
  },
  {
    path: ':id/detail',
    loadChildren: () => import('./user-detail/user-detail.module').then(
      (m) => m.UserDetailModule
    )
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}