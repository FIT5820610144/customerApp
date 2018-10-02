import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, ModalController, ModalOptions } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { CallingProvider } from '../../providers/calling/calling'
import { Storage } from '@ionic/storage';
import { } from '@agm/core';
import {Observable} from 'rxjs/Rx';
import { ListPage } from '../list/list';
import { CustomerProvider } from '../../providers/customer/customer'


declare var google: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  clat:any;
  clng:any;
  Start:any;
  End:any;
  showType = false;
  driveraccept = true;
  vehicle:any;
  distance:any;
  showstatus = false;
  call_status=1;
  dissmiss:any;
  getaccept:any;getaccept2:any;
  myModal1:any;myModal2:any;myModal3:any;
  cancelBtn = true;
  dri_taked:any;
  userList: any;
  image_base64: any;
  item:any;
  cust_ssn:any;
  vehicleList:any;vehicle_number:any;vehicle_brand:any;vehicle_color:any;driver_img:any;

  
  @ViewChild('map') mapRef: ElementRef;
  map: any;

  constructor(public navCtrl: NavController, 
              public geo: Geolocation,
              public modalCtrl: ModalController,
              public callingCtrl: CallingProvider,
              private storage: Storage,
              public custProvider : CustomerProvider,) {        
  }
  
  getVehicles(){
    this.callingCtrl.getVehicle()
    .subscribe(data =>{
      this.vehicleList = data
      this.driver_img = data[0].dri_pic;
      this.vehicle_number = data[0].veh_number;
      this.vehicle_brand = data[0].veh_brand;
      this.vehicle_color = data[0].veh_color;
     // console.log("Driver_name = "+this.dri_name)
    })
  }

  getUser(){
    this.custProvider.getUser()
    .subscribe(data =>{
      this.userList = data
      this.cust_ssn = data[0].cust_ssn;
      //console.log("Cust_ssn"+this.cust_ssn)
    })
  }

  getAccept(gacc){
    if(gacc == 'accepted'){
      this.isCalling('accepted');
      console.log("driver action = "+gacc)
    }else if(gacc == 'cancled'){
      this.isCalling('cancled');
      console.log("driver action = "+gacc)
    }
  }

  isCalling(accept){
    if(accept == null){
     // console.log("cust_name = "+this.cust_name)
      
      this.callingCtrl.toCalling(this.cust_ssn,this.Start,this.End,this.call_status).subscribe(data=>{
        
        this.getaccept = setInterval(()=>{
          this.callingCtrl.accept().subscribe(data=>{ //รับค่า accept

            this.getAccept(data[0].dri_action)  //ส่ง driver_action ไปยังฟังก์ชั่น getAceept
            console.log("driver_action = "+data[0].dri_action)
            if(data[0].dri_action == 'accepted'){
            clearInterval(this.getaccept)
            }else if(data[0].dri_action == 'cancled'){
            clearInterval(this.getaccept)
            }


          })
        },3000)

        this.getaccept2 = setInterval(()=>{
          this.callingCtrl.finished().subscribe(data=>{ //รับค่า finish
            console.log("finish = "+data[0].finished)
            if(data[0].finished == 'finished'){
              this.myModal3.present();
              clearInterval(this.getaccept2);
              this.showstatus = false;
              this.cancelBtn = false;
              //console.log("finiheddddddd")
            }
          })
        },3000)

      });
     const myModalOptions: ModalOptions = {
        enableBackdropDismiss:false,
        cssClass:"my-modal"
     }
     
     this.myModal1 =  this.modalCtrl.create('CallingPage',{},myModalOptions)
     this.myModal2 =  this.modalCtrl.create('DriveracceptedPage')
     this.myModal3 =  this.modalCtrl.create('CommentPage')

     this.myModal1.present();
    
    }else if(accept == 'accepted'){
      this.myModal1.dismiss();
      this.myModal2.present();
     
      setTimeout(() => {
        this.myModal2.dismiss();
        this.driveraccept = false
        this.showstatus = true
      }, 5000); 
    }else if(accept == 'cancled'){
      console.log("else if = "+accept)
     // this.cancelBtn = false
      this.myModal1.dismiss();
    }
    
  }

//////------Google Maps------///////
   calculateAndDisplayRoute(clat,clng) {  
        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        var firstPosition = {lat:clat,lng:clng};

            var map = new google.maps.Map(document.getElementById('map'), {
              zoom: 15,
              center: {lat: clat, lng: clng},
              zoomControl:false,
              mapTypeControl:false,
              streetViewControl: false,
              streetView:false,
              disableDefaultUI: true
            });

        var marker = new google.maps.Marker({
          position: firstPosition,
          map: map,
          icon: 'assets/imgs/maker.gif',
        });

       directionsDisplay.setMap(map);

        directionsService.route({
          origin: this.Start,
          destination: this.End,
          travelMode: 'DRIVING',
        }, function(response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
            var getDistance = response.routes[0].legs[0].distance.value
            this.distance = getDistance;
            var getKm = getDistance/1000
            var km = getKm.toFixed(0);
            var defaultFare = 5;
            
            var getFare = getKm * defaultFare;
            var fare = getFare.toFixed(0)
              document.getElementById('distance').innerHTML=km + ' KM'
              document.getElementById('fare').innerHTML=fare + ' ฿'

          } else {
            window.alert('ไม่สามารถค้นหาเส้นทางที่ท่านได้ระบุ ' + status);
          }
    }); 
  }
  //////------Google Maps------///////

  ionViewDidLoad(){
    this.geo.getCurrentPosition().then( pos => {
        this.clat = pos.coords.latitude
        this.clng = pos.coords.longitude
       this.calculateAndDisplayRoute(this.clat,this.clng);
      }).catch(err => console.log(err)); 
      this.getUser();
      this.getVehicles();
  }

  showTypefunc(){
    this.showType = true;
    console.log("distance "+this.distance)
  }
      
}