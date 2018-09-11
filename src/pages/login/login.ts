import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { AlertController } from 'ionic-angular';

import { LoginProvider } from '../../providers/login/login';
import { CustomerProvider } from '../../providers/customer/customer';
import { HomePage } from '../home/home';
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
    private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  register(){
    this.navCtrl.push(RegisterPage);
  }

  login(){
    
  }
  doLogin(event,tel){
    this.custCtrl.getdata(tel);
    this.loginCtrl.doLogin(tel).subscribe(
      data =>{
        this.item = data.message;
        if(data.status == "success"){
          let alert = this.alertCtrl.create({
            title: 'Login',
            subTitle: 'เข้าสู่ระบบสำเร็จ',
            buttons: [{
              text: 'ตกลง',
              handler: data=>{
                this.navCtrl.setRoot(HomePage);
              }
            }]
          });
          alert.present();

        }else {
          let alert = this.alertCtrl.create({
            title: 'login',
            subTitle: 'ไม่สามารถเข้าสู่ระบบได้',
            buttons: [{
              text: 'ตกลง',
              handler: data=>{
                  this.navCtrl.setRoot(LoginPage);
              }
            }]
          }); alert.present();
        }
      }
    )
  }
}
