import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: 'account-options', loadChildren: './account/account.module#AccountPageModule' },
  { path: 'account-options/update-profile', loadChildren: './account/update-profile/update-profile.module#UpdateProfilePageModule' },
  { path: 'users/:username', loadChildren: './users/users.module#UsersPageModule' },
  { path: 'followers/:username', loadChildren: './search/search.module#SearchPageModule' },
  { path: 'followed/:username', loadChildren: './search/search.module#SearchPageModule' },
  { path: 'search', loadChildren: './search/search.module#SearchPageModule' },
  { path: 'publications/publish', loadChildren: './publications/create/create.module#CreatePageModule' }




];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
