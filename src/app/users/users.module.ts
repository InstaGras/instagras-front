import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UsersPage } from './users.page';
import { MoreComponent } from './more/more.component';
import { DomElementSchemaRegistry } from '@angular/compiler';

const routes: Routes = [
  {
    path: '',
    component: UsersPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    UsersPage,
    MoreComponent
  ],
  entryComponents: [
    MoreComponent
  ]
})
export class UsersPageModule {}
