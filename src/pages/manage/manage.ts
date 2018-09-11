import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, AlertController, Spinner } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { HomePage } from '../home/home';
import { ListPage } from '../list/list';
import { Http, Headers, RequestOptions } from '@angular/http';


import { CustomerProvider } from '../../providers/customer/customer';
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
export class ManagePage {

  groups:Array<{id:number,name:string}> = [];
  userList: any;
  image_base64: any;
  imageList:any;
  base64Image:string;
  item:any;


 // test: Array<{id:number,name:string}> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, 
  public viewController: ViewController,
  public custProvider : CustomerProvider,
  public LoadingCtrl: LoadingController,
  public alertCtrl: AlertController,
  public http: Http,
  private camera: Camera) {

    this.image_base64 = 'assets/imgs/profile.jpg';
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
    this.custProvider.getUser()
    .then((data:any)=> {
      loading.dismiss();
      this.userList = data;
    });
  }

  setBackButtonAction(){
    this.navCtrl.setRoot(HomePage);
  }

 openGallary(){
  let loading = this.LoadingCtrl.create({
    content: 'Please wait...',
    spinner : 'circles'
  });
  const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
  }
  
  this.camera.getPicture(options).then((imageData) => {
   // imageData is either a base64 encoded string or a file URI
   // If it's base64 (DATA_URL):
   this.base64Image = 'data:image/jpeg;base64,' + imageData;
   this.image_base64 = this.base64Image;
   loading.dismiss();
  }, (err) => {
   // Handle error
  });
}
  
uploadImg(){
  let loading = this.LoadingCtrl.create({
    content: 'Please wait...',
    spinner : 'circles'
  });
  loading.present();
  let url = 'https://0a9d74e4.ngrok.io/namaetoDB/CustApp/uploadimg.php';
  let postData = new FormData();
  postData.append('file', this.base64Image);
  let data:Observable<any> = this.http.post(url, postData);
  data.subscribe((result) => {
    loading.dismiss();
    alert(result);

   
  })


}

}
