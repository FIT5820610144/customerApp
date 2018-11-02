import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, ModalController, ModalOptions,AlertController,ViewController,App,NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { CallingProvider } from '../../providers/calling/calling'
import { Storage } from '@ionic/storage';                                                                                                                                                                                                                                                                                    
import { CustomerProvider } from '../../providers/customer/customer'
import { CallNumber } from '@ionic-native/call-number';
import { ManagePage } from '../manage/manage';
import { DriverListPage } from '../driver-list/driver-list';


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
  distance:any;defaltfare:any;fare:any;vehicles:any;
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
  public cust_ssn:any;cust_img;dri_lat:any;dri_lng;
  vehicleList:any;vehicle_number:any;vehicle_brand:any;vehicle_color:any;driver_img:any;finished:any
  cust_cancle = 1;
  typeimg:any;
  noplace:any;
  _url:any;
  myAccept:any
  call:any = 'uncall'
  pickupInterval:any;
  
  @ViewChild('map') mapRef: ElementRef;
  map: any;

  constructor(public navCtrl: NavController, 
              public geo: Geolocation,
              public modalCtrl: ModalController,
              public callingCtrl: CallingProvider,
              private storage: Storage,
              public custProvider : CustomerProvider,
              private callNumber: CallNumber,
              private alertCtrl: AlertController,
              public viewCtrl:ViewController,
              private app:App,
              public params: NavParams) {   
              this._url = this.custProvider.url
              
  
  }

  // async calltoNumber():Promise<any>{
  //   try{
  //     await this.callNumber.callNumber("0612409025", true);
  //   }
  //   catch(e){
  //     console.error(e);
  //   }
  // }

  //----- get all vehicle data from database for adding to calling database when called --//
  getVehicles(){
    this.callingCtrl.accept()
    .subscribe(data =>{
      this.vehicleList = data
      this.driver_img = data[0].dri_pic;
      console.log("driver_img = ",this.driver_img)
      this.vehicle_number = data[0].veh_number;
      this.vehicle_brand = data[0].veh_brand;
      this.vehicle_color = data[0].veh_color;
      this.dri_lat = data[0].lat;
      this.dri_lng = data[0].lng;
      console.log("driver_lat = "+data[0].lat)
      console.log("driver_lng = "+data[0].lng)
    })
  }

//---- customer ssn from database for adding to calling database when called ----//
  getUser(){
    this.custProvider.getUser()
    .subscribe(data =>{
      this.userList = data
      this.cust_ssn = data[0].cust_ssn;
      this.cust_img = data[0].cust_img;
    })
  }

//---- get accept status and send status to isCalling function ----//
  getAccept(gacc){
    if(gacc == 'accepted'){
      this.isCalling('accepted');
      this.myAccept = gacc
      console.log("driver action = "+gacc)
    }else if(gacc == 'cancled'){
      this.isCalling('cancled');
      console.log("driver action = "+gacc)
    }
  }
  toCalling(){
    this.navCtrl.push(DriverListPage,{
      cust_ssn: this.cust_ssn,
       Start: this.Start,
       End:this.End,
       call_status:this.call_status,
       distance:this.distance,
       fare:this.fare,
       cust_lat: this.clat,
       cust_lng:this.clng
    })
  }

  //------ calling function ---//
  isCalling(accept){
    // ----- ถ้าไม่อัพโหลดรูปไม่สามรถทำการเรียกรถได้ ----//
      // if(this.cust_img == null){
      //   let alert = this.alertCtrl.create({
      //     title: 'Warning!!',
      //     subTitle: 'คุณไม่สามารถเรียกรถได้ กรุณาอัพโหลดรูปภาพเพื่อยืนยันตัวตน',
      //     buttons: [{
      //       text: 'ตกลง',
      //       handler: data=>{
      //         this.navCtrl.setRoot(ManagePage);
      //       }
      //     }]
      //   });
      //   alert.present();
      // }
      
      //this.checkNullimg();
     if(accept == null){
      // this.callingCtrl.toCalling(this.cust_ssn,this.Start,this.End,this.call_status,this.distance,this.fare).subscribe(data=>{
        this.storage.remove("calling")
      
        let acceptInterVal = setInterval(()=>{
          this.callingCtrl.accept().subscribe(data=>{ //รับค่า accept
            this.getAccept(data[0].dri_action)  //ส่ง driver_action ไปยังฟังก์ชั่น getAceept
            if(data[0].dri_action == 'accepted'){
              this.getVehicles();
              clearInterval(acceptInterVal)
            }else if(data[0].dri_action == 'cancled'){
            clearInterval(acceptInterVal)
            }
          })
        },3000)

          let finishInterVal = setInterval(()=>{
          this.callingCtrl.finished().subscribe(data=>{ //รับค่า finish
            console.log("pick up = ",data[0].pickup)
            this.finished = data[0].finished;
            if(data[0].finished == 'finished'){
              if(data[0].cust_cancle == 1){
                clearInterval(finishInterVal)
              }else{
              this.saveCallingRecord();
              this.myModal3.present();
              clearInterval(finishInterVal);
              this.showstatus = false;
              this.cancelBtn = false;
            }
            }
          })
        },3000)

        this.pickupInterval = setInterval(()=>{
          this.callingCtrl.accept().subscribe(data=>{
            if(data[0].pickup == '1'){
              console.log("picked up");
              const confirm = this.alertCtrl.create({
                title: 'Pick UP!!',
                message: 'คนขับรถได้รับคุณแล้ว??',
                buttons: [
                  {
                    text: 'ไม่ใช่',
                    handler: () => {
                     // console.log('Disagree clicked');
                    }
                  },
                  {
                    text: 'ใช่',
                    handler: () => {
                      this.cancelBtn = false
                    }
                  }
                ]
              });
              confirm.present();
              clearInterval(this.pickupInterval)
          }
          }); 
        },3000)
      
      // });
     const myModalOptions: ModalOptions = {
        enableBackdropDismiss:false,
        cssClass:"my-modal"
     }
     
     this.myModal1 =  this.modalCtrl.create('CallingPage',{
       
     })
     this.myModal2 =  this.modalCtrl.create('DriveracceptedPage')
     this.myModal3 =  this.modalCtrl.create('CommentPage')
     this.myModal1.present();
     //this.navCtrl.push(DriverListPage)

    
    }else if(accept == 'accepted'){
      this.myModal1.dismiss();
      this.myModal2.present();
     
      setTimeout(() => {
        this.myModal2.dismiss();
        this.driveraccept = false
        this.showstatus = true
      }, 5000); 
    }else if(accept == 'cancled'){
      this.myModal1.dismiss();
    }  
  }

  //---- บันทึกข้อมูลการเรียกรถเมื่อการเรียกรถเสร็จสิ้น -----//
  saveCallingRecord(){

    var forigin =  this.params.get("forigin");
    var fdestination = this.params.get("fdestination");
    var fdri_ssn = this.params.get("fdri_ssn");
    console.log("forigin = ",forigin)
    console.log("fdestination = ",fdestination)
    console.log("fdri_ssn = ",fdri_ssn)

      this.callingCtrl.saveCallingRec(forigin,fdestination,this.cust_ssn,this.fare,fdri_ssn).subscribe(data=>{
      })
  }

//////------Google Maps------///////

getCurrentPlace(clat,clng){
  let geocoder = new google.maps.Geocoder;
  let latlng = {lat: clat, lng: clng};
  geocoder.geocode({'location': latlng}, (results, status) => {
     console.log(results[1].address_components[0].short_name); // read data from here
    this.Start = results[1].address_components[0].short_name;
     console.log(status);
  });
}  

   calculateAndDisplayRoute(clat,clng) {  
        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        var firstPosition = {lat:clat,lng:clng};

        
          let getDistanceInterVal = setInterval(()=>{
          var distance = localStorage.getItem("km");
          this.distance = distance;
         },100)

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
          icon: 'assets/imgs/pin.png',
        });
        
     
       directionsDisplay.setMap(map);
        directionsService.route({
          origin: this.Start,
          destination: this.End,
          travelMode: 'DRIVING',
        }, function (response, status){
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
            var getDistance = response.routes[0].legs[0].distance.value
            
            this.distance = getDistance;
            var getKm = getDistance/1000
            var km = getKm.toFixed(0);
            localStorage.setItem("km", km);
            localStorage.setItem("place", "place");
          } else {
           // window.alert('ไม่สามารถค้นหาเส้นทางที่ท่านได้ระบุ ' + status);
            localStorage.setItem("place", "noplace");
          }
    });
  }
  noplaceChek(){
    
      let noplaceCheckITV = setInterval(()=>{
      this.noplace = localStorage.getItem("place");
      if(this.noplace == "noplace"){
        let alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: 'ไม่พบสถานที่ที่ท่านระบุ กรุณาระบุชื่อสถานที่ให้ถูกต้อง',
          buttons: [{
            text: 'ตกลง',
            handler: data=>{
              this.viewCtrl.dismiss().then(() => {
                this.app.getRootNav().setRoot(HomePage);
            });
            }
          }]
        });
        alert.present();
      }else{
        this.showType = true;
      }
      clearInterval(noplaceCheckITV);
     },100)
    
  }
  ///----- รับ event ประเภทรถจากหน้า html เพื่อคำนวณค่าโดยสาร----//
  vehicleChange($event){
    this.vehicles = $event
  }
  calculateFare(){
    let callculateITV = setInterval(()=>{
      var dist = this.distance
      var dFare = 5
      if(this.vehicles == 1){
        dFare = 10;
        
      }
      var getFare = dist * dFare;
      var fare = getFare.toFixed(0)
      this.fare = fare;
     },100)
    
  }

  typeimgChng(){
  
      let typeimgITV = setInterval(()=>{
      this.typeimg = 'moto.png';
      if(this.vehicles == 1){
        this.typeimg = 'tuktuk.png';
      }
     },100)
  }
  

  ionViewDidEnter(){
    this.geo.getCurrentPosition().then( pos => {
        this.clat = pos.coords.latitude
        this.clng = pos.coords.longitude
        var fare = 0
        this.calculateAndDisplayRoute(this.clat,this.clng);
        this.getCurrentPlace(this.clat,this.clng)
      }).catch(err => console.log(err)); 
      this.getUser();
      this.calculateFare();
      this.typeimgChng();
      console.log("calling = ",this.params.get('calling'))
      this.storage.get('calling').then(val=>{
        if(val == 'called'){
          this.isCalling(null)
        }
      })

      this.driverPickup();
      
  }

  showTypefunc(){
    //this.showType = true;
    this.calculateFare();
    this.typeimgChng();
    this.noplaceChek()
  }

  cancleCalling(){
    const confirm = this.alertCtrl.create({
      title: 'Cancle!!',
      message: 'ยืนยันการยกเลิก',
      buttons: [
        {
          text: 'ยกเลิก',
          handler: () => {
           // console.log('Disagree clicked');
          }
        },
        {
          text: 'ยืนยัน',
          handler: () => {
    this.callingCtrl.custCancle(this.cust_cancle).subscribe(data =>{
      if(data.status == "success"){
        let alert = this.alertCtrl.create({
          title: 'cancle',
          subTitle: 'ยกเลิกสำเร็จ',
          buttons: [{
            text: 'ตกลง',
            handler: data=>{
              this.navCtrl.setRoot(HomePage);
            }
          }]
        });
        alert.present();
      }
    }
  )
          }
        }
      ]
    });
    confirm.present();
    
  }
  
  driverPickup(){
    this.callingCtrl.accept().subscribe(data=>{
      //console.log("dri_pickup = ",data)
    })
  }

      
}
