import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { CallingRecordProvider } from '../../providers/calling-record/calling-record'
import { CustomerProvider } from '../../providers/customer/customer';
import { CallingProvider } from '../../providers/calling/calling'

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
  cr_number:any;
  total_fare:number
  dri_name:string;
  dri_tel:string;
  //i:number = -1;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public recordProvider: CallingRecordProvider,
              public custProvider: CustomerProvider,
              public LoadingCtrl: LoadingController,
              private alertCtrl: AlertController,
              public callingCtrl: CallingProvider) {
        
  }

  getDri(){
    this.callingCtrl.getDriver().subscribe(data=>{
      this.dri_name = data[0].dri_name;
      this.dri_tel = data[0].dri_tel;
      console.log("dri_name = "+data[0].dri_name)
      console.log("dri_tel = "+data[0].dri_tel)
    })
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
              
              var i = 0;
              var myfare = []
              var total_fare = 0;
             // var long = this.recordList
             for (i = 0; i < data.length; i++) {
              myfare[i] = parseInt(data[i].fare)
              total_fare = total_fare + myfare[i];
          }
          this.total_fare = total_fare;

            if(data[0].cust_record == "0"){
              this.noData = true;
              this.showData = false;
            }
          })
          loading.dismiss();
    })
  }

  //----------- function to delete and alert status when deleted ----------//
  delete(){
    this.recordProvider.deleteRecord(this.cust_ssn).subscribe(
      data =>{
        if(data.status == "success"){
          let alert = this.alertCtrl.create({
            title: 'Delete!!',
            subTitle: 'ลบข้อมูลเรียบร้อย',
            buttons: [{
              text: 'ตกลง',
              handler: data=>{
                this.navCtrl.setRoot(HistoryPage)
              }
            }]
          });
          alert.present();
        }
      }
    )
  }

  deleteOne(item){
    console.log("item = "+item);
    this.recordProvider.deleteArecoard(item).subscribe(
      data =>{
        if(data.status == "success"){
          this.navCtrl.setRoot(this.navCtrl.getActive().component);
          console.log("deleted")
        }
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryPage');
    this.getDri();
  }


  setBackButtonAction(){
    this.navCtrl.setRoot(HomePage);
  }

}
