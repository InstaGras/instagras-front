import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UpdateprofileComponent } from './updateprofile.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: UpdateprofileComponent }])
  ],
  declarations: [UpdateprofileComponent]
})
export class UpdateprofilePageModule {}
