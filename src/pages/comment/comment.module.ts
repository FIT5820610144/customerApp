import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommentPage } from './comment';
import { Ionic2RatingModule } from 'ionic2-rating';

@NgModule({
  declarations: [
    CommentPage,
  ],
  imports: [
    IonicPageModule.forChild(CommentPage),
    Ionic2RatingModule
  ],
})
export class CommentPageModule {}
