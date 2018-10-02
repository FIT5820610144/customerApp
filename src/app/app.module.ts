import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { Geolocation } from '@ionic-native/geolocation';
import { AgmCoreModule } from '@agm/core';
import { IonicStorageModule } from '@ionic/storage';

//---------pages--------

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { ManagePage } from '../pages/manage/manage';
import { HistoryPage } from '../pages/history/history';
import { AboutPage } from '../pages/about/about';
import { MainPage } from '../pages/main/main';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { EditCustomerPage } from '../pages/edit-customer/edit-customer'
//import { DriveracceptedPage } from '../pages/driveraccepted/driveraccepted';
//import { CommentPage } from '../pages/comment/comment';
//------pages----------
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CustomerProvider } from '../providers/customer/customer';
import { RegisterProvider } from '../providers/register/register';
import { LoginProvider } from '../providers/login/login';
import { CallingProvider } from '../providers/calling/calling';
import { CommentProvider } from '../providers/comment/comment';
//import { Ionic2RatingModule } from 'ionic2-rating';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ManagePage,
    HistoryPage,
    AboutPage,
    MainPage,
    LoginPage,
    RegisterPage,
    ListPage,
    //CommentPage
    //EditCustomerPage,
   // DriveracceptedPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    //Ionic2RatingModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyBWSUebxgKZO0lx_cm7J8kkZT08NyA8hkk",
      libraries: ["places"]
  })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    ManagePage,
    HistoryPage,
    MainPage,
    LoginPage,
    RegisterPage,
    AboutPage,
    //CommentPage
   // EditCustomerPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CustomerProvider,
    RegisterProvider,
    LoginProvider,
    Camera,
    ImagePicker,
    Geolocation,
    CallingProvider,
    CommentProvider
  ]
})
export class AppModule {}
