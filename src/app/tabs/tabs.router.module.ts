import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AuthGuardService as AuthGuard } from '../auth/keycloak.authguard';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'dashboard',
        children: [
          {
            path: '',
            canActivate: [AuthGuard],
            loadChildren: () =>
              import('../dashboard/dashboard.module').then(m => m.DashboardPageModule)
          }
        ]
      },
      {
        path: 'publication',
        children: [
          {
            path: '',
            canActivate: [AuthGuard],
            loadChildren: () =>
              import('../publication/publication.module').then(m => m.PublicationPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/profile',
        pathMatch: 'full',
        canActivate: [AuthGuard]
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            canActivate: [AuthGuard],
            loadChildren: () =>
              import('../profile/profile.module').then(m => m.ProfilePageModule)
          },
          {
            path: 'updateprofile',
            canActivate: [AuthGuard],
            loadChildren: () =>
              import('../profile/updateprofile/updateprofile.module').then(m => m.UpdateprofilePageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/dashboard',
        pathMatch: 'full',
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/dashboard',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
