import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

//------------- Pages ------------------//

import { ManagePage } from '../pages/manage/manage';
import { HistoryPage } from '../pages/history/history';
import { AboutPage } from '../pages/about/about';
import { LoginPage } from '../pages/login/login';
import { CustomerProvider } from '../providers/customer/customer';
import { GlobalVariableProvider } from '../providers/global-variable/global-variable';

//------------- Plugins ---------------//
import { Observable } from 'rxjs/Rx';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;
  userList: any;
  image_base64: any;
  name:String;
  surname:String;
  tel:any;
  item: any;
  interval:any
  queueInterval:any
  Interval:any;
  url:any;

  pages: Array<{title: string, component: any, icon: string}>;

  constructor(public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    private storage: Storage,
    public custProvider : CustomerProvider,
    public globalVar: GlobalVariableProvider) {

      this.storage.get('islogon').then((val) => {
        if(val == true) {
         this.refresh();
          }
        });
    
      this.url = this.globalVar.localhost
      console.log("url component = "+this.url)

    this.initializeApp();
    this.ionViewDidLoad();
    this.refresh();

    this.pages = [
      { title: 'จัดการข้อมูล', component: ManagePage, icon: "ios-contact"},
      { title: 'ประวัติการใช้งาน', component: HistoryPage ,icon: 'md-list-box'},
      { title: 'เกี่ยวกับ', component: AboutPage , icon: 'ios-help-circle'},
      { title: 'ออกจากระบบ', component: null , icon: 'md-log-out'}
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    if(page.component) {
        this.nav.setRoot(page.component);
    } else {
      this.storage.clear().then(()=>{
        this.nav.setRoot(LoginPage)
        window.location.reload();
      });
    }
}


ionViewDidLoad(){
  this.storage.get('islogon').then((val) => {
    if(val == true) {
      this.custProvider.getUser()
      .subscribe(data =>{
        this.userList = data,
        this.name = data[0].cust_name;
        this.surname = data[0].cust_surname
        this.tel = data[0].cust_tel;
         if(data[0].cust_img == null){
           this.image_base64 = 'http://'+this.url+'/namaetoDB/CustApp/noimg.png';
         }else{
           this.image_base64 = 'http://'+this.url+'/namaetoDB/CustApp/'+data[0].cust_img
         }
      })
      }
    }); 
}

//---------- function for make ea realtime database ------//
    refresh(){
    let interval:number = 1000; // 5 seconds
    let queueInterval = Observable.interval(interval).timeInterval();
    queueInterval.subscribe(() => {
      this.ionViewDidLoad();
      });
      clearInterval(interval)
    }
        
}
