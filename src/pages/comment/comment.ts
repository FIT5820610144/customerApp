import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,ViewController,App  } from 'ionic-angular';
import { Ionic2RatingModule } from 'ionic2-rating';
import { CommentProvider } from '../../providers/comment/comment';
import { CallingProvider } from '../../providers/calling/calling'
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';

/**
 * Generated class for the CommentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html',
})
export class CommentPage {

  rate : any = 0;
  cust_ssn:any;dri_ssn:any;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public commentCtrl: CommentProvider,
     public callingCtrl: CallingProvider,
     public alertCtrl: AlertController,
     public viewCtrl:ViewController,
     private app:App) {
  }
  
  onModelChange(event){
    this.rate = event;
    console.log(event);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentPage');
    this.getUser();
  }

  toComment(event,rate,commentdetail,){
    this.commentCtrl.toComment(rate,commentdetail,this.cust_ssn,this.dri_ssn)
    .subscribe(data=>{
      if(data.status == "success"){
        let alert = this.alertCtrl.create({
          title: 'comment',
          subTitle: 'ขอบคุณที่แสดงความคิดเห็น!!',
          buttons: [{
            text: 'ตกลง',
            handler: data=>{
              this.viewCtrl.dismiss().then(() => {
                this.app.getRootNav().setRoot(HomePage);
            });
            }
          }]
        });
        alert.present();

      }
    })
  }

  getUser(){
    this.callingCtrl.accept().subscribe(data=>{
      this.cust_ssn = data[0].cust_ssn;
      console.log("cust_ssn = "+this.cust_ssn);
      this.dri_ssn = data[0].dri_ssn;
    })
  }
  cancleComment(){
    this.viewCtrl.dismiss().then(() => {
      this.app.getRootNav().setRoot(HomePage);
  });
  }


}
