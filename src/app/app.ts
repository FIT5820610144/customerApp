import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, AlertController, Spinner } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
//import { HomePage } from '../home/home';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { CustomerProvider } from '../providers/customer/customer';
import { Observable } from 'rxjs/Observable';
/**
 * Generated class for the ManagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-manage',
  templateUrl: 'manage.html',
})
export class AppPage {

  groups:Array<{id:number,name:string}> = [];
  userList: any;
  image_base64: any;
  imageList:any;
  base64Image:string;
  item:any;
  name:any;
  hidecurrentimg = true;
  showcurrentimg = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
  public viewController: ViewController,
  public custProvider : CustomerProvider,
  public LoadingCtrl: LoadingController,
  public alertCtrl: AlertController,
  public http: Http,
  private camera: Camera) {
    this.imageList = [];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ManagePage');
  }

  ionViewWillEnter(){
    let loading = this.LoadingCtrl.create({
      content: 'Please wait...',
      spinner : 'circles'
    });
    loading.present();
    // this.custProvider.getUser()
    // .then((data:any)=> {
    //   this.item = data.message;
    //   loading.dismiss();
    //   this.userList = data;
      
    //   console.log(data.cust_ssn)
    // });
    this.custProvider.getUser()
    .subscribe(data =>{
      this.userList = data,
      this.item = data[0].cust_img
      if(data[0].cust_img == null){
        this.image_base64 = 'http://172.18.216.13/namaetoDB/CustApp/noimg.png';
      }else{
        this.image_base64 = 'http://172.18.216.13/namaetoDB/CustApp/'+data[0].cust_img
      }
    })
      loading.dismiss();
  }



}
