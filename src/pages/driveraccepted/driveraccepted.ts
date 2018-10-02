import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CallingProvider } from '../../providers/calling/calling'

/**
 * Generated class for the DriveracceptedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-driveraccepted',
  templateUrl: 'driveraccepted.html',
})
export class DriveracceptedPage {

  driverList:any;driver_name:any;driver_surname:any;driver_img:any;
  vehicleList:any;vehicle_number:any;vehicle_brand:any;vehicle_color:any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public callingProvider : CallingProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DriveracceptedPage');
    this.getDrivers();
    this.getVehicles();
  }

  getDrivers(){
    this.callingProvider.getDriver()
    .subscribe(data =>{
      this.driverList = data
      this.driver_name = data[0].dri_name;
      this.driver_surname = data[0].dri_surname;
      this.driver_img = data[0].dri_pic;
      console.log("Driver_name = "+this.driver_img)
    })
  }

  getVehicles(){
    this.callingProvider.getVehicle()
    .subscribe(data =>{
      this.vehicleList = data
      this.vehicle_number = data[0].veh_number;
      this.vehicle_brand = data[0].veh_brand;
      this.vehicle_color = data[0].veh_color;
     // console.log("Driver_name = "+this.dri_name)
    })
  }


}
