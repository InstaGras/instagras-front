import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: 'account-options', loadChildren: './account/account.module#AccountPageModule' },
  { path: 'account-options/update-profile', loadChildren: './account/update-profile/update-profile.module#UpdateProfilePageModule' },
  { path: 'search', loadChildren: './search/search.module#SearchPageModule' }

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: 'account-options', loadChildren: './account/account.module#AccountPageModule' },
  { path: 'account-options/update-profile', loadChildren: './account/update-profile/update-profile.module#UpdateProfilePageModule' },
  { path: 'users/:username', loadChildren: './users/users.module#UsersPageModule' }



];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
