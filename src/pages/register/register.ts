import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AlertController } from 'ionic-angular';
import { FormControl, Validators } from '@angular/forms';
import { RegisterProvider } from '../../providers/register/register';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  ssn = "";
  name = "";
  item :any;
  ssns:any;


  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public registCtrl : RegisterProvider,
    public alertCtrl: AlertController 
    ) {
    this.ssns = new FormControl('', Validators.required)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  login(){
    this.navCtrl.push(LoginPage);
  }
  register(event,ssn,name,surname,email,tel){
    this.registCtrl.doRegister(ssn,name,surname,email,tel).subscribe(
      data =>{
        this.item = data.message;
        if(data.status == "success"){
          let alert = this.alertCtrl.create({
            title: 'ลงทะเบียน',
            subTitle: 'ลงทะเบียนเรียบร้อยแล้ว กรุณาเข้าสู่ระบบ',
            buttons: [{
              text: 'ตกลง',
              handler: data=>{
                this.navCtrl.setRoot(LoginPage);
              }
            }]
          });
          alert.present();

        }else {
          let alert = this.alertCtrl.create({
            title: 'ลงทะเบียน',
            subTitle: 'ไม่สามารถลงทะเบียนได้',
            buttons: [{
              text: 'ตกลง',
              handler: data=>{
                  this.navCtrl.setRoot(RegisterPage);
              }
            }]
          }); 
          alert.present();
        }
      }
    )
    
  }

}
