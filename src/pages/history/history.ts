import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { CallingRecordProvider } from '../../providers/calling-record/calling-record'
import { CustomerProvider } from '../../providers/customer/customer';

/**
 * Generated class for the HistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {
  recordList:any
  cust_ssn:any;
  noData = false
  showData = true

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public recordProvider: CallingRecordProvider,
              public custProvider: CustomerProvider,
              public LoadingCtrl: LoadingController,
              private alertCtrl: AlertController,) {
  }

  ionViewWillEnter(){
    let loading = this.LoadingCtrl.create({
      content: 'Please wait...',
      spinner : 'circles'
    });
    loading.present();

    this.custProvider.getUser()
    .subscribe(data =>{
      this.cust_ssn = data[0].cust_ssn
            this.recordProvider.getRecord(this.cust_ssn).subscribe(data=>{
            this.recordList = data
            if(data[0].cust_record == "0"){
              this.noData = true;
              this.showData = false;
            }
          })
          loading.dismiss();
    })
  }

  delete(){

    this.recordProvider.deleteRecord(this.cust_ssn).subscribe(
      data =>{
        //.item = data.message;
        console.log(data.status)
        if(data.status == "success"){
          let alert = this.alertCtrl.create({
            title: 'Delete!!',
            subTitle: 'ลบข้อมูลเรียบร้อย',
            buttons: [{
              text: 'ตกลง',
              handler: data=>{
                this.navCtrl.pop()
              }
            }]
          });
          alert.present();
        }
      }
    )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryPage');
    console.log("record = "+this.recordList)
  }


  setBackButtonAction(){
    //this.navCtrl.setRoot(HomePage);
    this.navCtrl.setRoot(HomePage);
  }
}
