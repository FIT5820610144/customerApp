import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App,ToastController  } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { AlertController } from 'ionic-angular';

import { LoginProvider } from '../../providers/login/login';
import { CustomerProvider } from '../../providers/customer/customer';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  tel = "";
  item :any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public loginCtrl: LoginProvider,
    public custCtrl: CustomerProvider,
    private alertCtrl: AlertController,
    private storage: Storage,
    private appCtrl:App,
    public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
     this.storage.get('islogon').then((val) => {
        if(val == true) {
         this.navCtrl.setRoot(HomePage)
          }
        });
  }
  register(){
    this.navCtrl.push(RegisterPage);
  }

  login(){
    
  }
  doLogin(event,tel){
    //this.custCtrl.getdata(tel);
     
    //console.log( this.storage.set('islogon',true))
   // this.appCtrl.getRootNav().setRoot(HomePage);
    this.loginCtrl.doLogin(tel).subscribe(
      data =>{
        //.item = data.message;
        console.log(data.status)
        if(data.status == "success"){
          this.storage.set('islogon',true);
          this.storage.set('getTel',tel)
          // let alert = this.alertCtrl.create({
          //   title: 'Login',
          //   subTitle: 'เข้าสู่ระบบสำเร็จ',
          //   buttons: [{
          //     text: 'ตกลง',
          //     handler: data=>{
          //       this.navCtrl.setRoot(HomePage);
          //     }
          //   }]
          // });
          // alert.present();

          const toast = this.toastCtrl.create({
            message: 'เข้าสู่ระบบสำเร็จ',
            duration: 3000,
            position: 'top',
            cssClass: 'toast-success'
          });
          toast.present();
          toast.onDidDismiss(() => {
            this.navCtrl.setRoot(HomePage);
          });
          //window.location.reload();

        }else {
          const toast = this.toastCtrl.create({
            message: 'เข้าสู่ระบบไม่สำเร็จ',
            duration: 3000,
            position: 'top',
            cssClass: 'toast-fail'
          });
          toast.present();
          toast.onDidDismiss(() => {
           this.navCtrl.setRoot(LoginPage);
          });
        }
      }
    )
  }
}
