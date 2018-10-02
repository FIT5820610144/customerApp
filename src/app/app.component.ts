import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { ManagePage } from '../pages/manage/manage';
import { HistoryPage } from '../pages/history/history';
import { AboutPage } from '../pages/about/about';
import { MainPage } from '../pages/main/main';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { CustomerProvider } from '../providers/customer/customer';
import { Observable } from 'rxjs/Rx';
import { CommentPage } from '../pages/comment/comment';

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
  item: any;
  interval:any
  queueInterval:any
  Interval:any;

  pages: Array<{title: string, component: any, icon: string}>;

  constructor(public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    private storage: Storage,
    public custProvider : CustomerProvider) {
    this.initializeApp();
    this.ionViewDidLoad();
    this.refresh();
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'จัดการข้อมูล', component: ManagePage, icon: "home"},
      { title: 'ประวัติการใช้งาน', component: HistoryPage ,icon: 'home'},
      { title: 'เกี่ยวกับ', component: AboutPage , icon: 'home'},
      { title: 'ออกจากระบบ', component: null , icon: 'home'}
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

  
    this.custProvider.getUser()
     .subscribe(data =>{
       this.userList = data,
       this.name = data[0].cust_name;
       this.surname = data[0].cust_surname
        if(data[0].cust_img == null){
          this.image_base64 = 'http://localhost/namaetoDB/CustApp/noimg.png';
        }else{
          this.image_base64 = 'http://localhost/namaetoDB/CustApp/'+data[0].cust_img
        }
     })
  

 
}
    refresh(){
      console.log("refreshing")
      let interval:number = 1000; // 5 seconds
    let queueInterval = Observable.interval(interval).timeInterval();
    queueInterval.subscribe(() => {
      this.ionViewDidLoad();
      });
      clearInterval(interval)
    }
        
}
