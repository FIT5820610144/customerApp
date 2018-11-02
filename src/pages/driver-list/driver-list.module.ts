import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DriverListPage } from './driver-list';
import { Ionic2RatingModule } from 'ionic2-rating';

@NgModule({
  declarations: [
    DriverListPage,
  ],
  imports: [
    IonicPageModule.forChild(DriverListPage),
    Ionic2RatingModule
  ],
  
})
export class DriverListPageModule {}
