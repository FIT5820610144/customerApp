import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CallingPage } from './calling';

@NgModule({
  declarations: [
    CallingPage,
  ],
  imports: [
    IonicPageModule.forChild(CallingPage),
  ],
})
export class CallingPageModule {}
