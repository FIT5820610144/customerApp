import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,AlertController } from 'ionic-angular';
import { CallingProvider } from '../../providers/calling/calling'
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the DriverListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google: any;
@IonicPage()
@Component({
  selector: 'page-driver-list',
  templateUrl: 'driver-list.html',
})
export class DriverListPage {
  mydist:any
  listDriver:any
  rate:any = 0;
  globalUrl:any;
  dri_ssn:any;
  interVal:any
  dri_lat:any
  dri_lng:any;
  cust_lat:any;
  cust_lng:any;
  distaneList:any
  alldata:any
  dri_name:any
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public callService: CallingProvider,
              private storage: Storage,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController) {
                this.globalUrl =  this.callService.url 
                
                
  }

  ionViewDidLoad() {
    //this.mydist = localStorage.getItem("mydist");
  

    this.cust_lat = this.navParams.get("cust_lat");
    this.cust_lng = this.navParams.get("cust_lng");
    this.mydist = JSON.parse(localStorage.getItem("response"));
  
    
    //console.log("mydist = ",this.mydist.distance.value)

      // let i = 0;
      // for(i= 0 ;  i < this.mydist.length ; i++){
      // console.log("mydist = ",this.mydist[i])
      // //this.distaneList = this.mydist[i]
      // }

    
    //console.log("cust_lat = ",this.cust_lat)
    //console.log("cust_lng = ",this.cust_lng)
    console.log('ionViewDidLoad DriverListPage');
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present()
    this.interVal = setInterval(()=>{
      this.callService.getDriverActive().subscribe(data=>{
        this.listDriver = data
        loading.dismiss();
        //console.log(this.listDriver)
      })
    },1000)
    this.callService.getDriverActive().subscribe(data=>{
      this.dri_lat = parseFloat(data[0].dri_lat)
      this.dri_lng = parseFloat(data[0].dri_lng)
      this.dri_name = data[0].dri_name
     // console.log("dri_lat = ",this.dri_lat)
      console.log("data = ",data)
      //this.calculateAndDisplayRoute(this.cust_lat,this.cust_lng,this.dri_lat,this.dri_lng)
    })
    //this.getCalling();
    this.getDriLatLng();
  }

  toCalling(dri_ssn,dri_name){
    // this.navCtrl.push(HomePage,{
    //   dri_ssn: dri_ssn,
    //   toCalling:true
    // })
    
    // console.log("dri ssn = ",dri_ssn)
    const confirm = this.alertCtrl.create({
      title: 'เรียกรถ',
      message: 'ยืนยันการเรียกรถ '+dri_name+'!!',
      buttons: [
        {
          text: 'ยกเลิก',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'ยืนยัน',
          handler: () => {
            console.log('Agree clicked');
            this.getCalling(dri_ssn);
          }
        }
      ]
    });
    confirm.present();

   
  }

  getCalling(dri_ssn){
    // console.log("dri_ssn = ",dri_ssn)
    // console.log(this.navParams.get('cust_ssn'))
    // console.log(this.navParams.get('Start'))
    // console.log(this.navParams.get('End'))
    // console.log(this.navParams.get('call_status'))
    // console.log(this.navParams.get('distance'))
    // console.log(this.navParams.get('fare'))

    var cust_ssn = this.navParams.get('cust_ssn')
    var Start = this.navParams.get('Start')
    var End = this.navParams.get('End')
    var call_status = this.navParams.get('call_status')
    var distance = this.navParams.get('distance')

    var fare = this.navParams.get('fare')
    this.callService.toCalling(cust_ssn,Start,End,call_status,distance,fare,dri_ssn).subscribe(data=>{
      console.log(data)
      this.navCtrl.setRoot(HomePage,{
        forigin: Start,
        fdestination: End,
        fdri_ssn: dri_ssn,
      })
      this.storage.set('calling','called')
    })
  }

  getDriLatLng(){
    this.callService.getDriverActive().subscribe(data=>{
      var Lat = []
      var Lng = []
      var i = 0;
      console.log("dri_latlng ",data)
      this.getdriverDistance(data) //------ ส่ง data ไปยังฟังก์ชั่น getdriver
     for(i = 0 ; i<data.length ; i++){

       Lat[i] = parseFloat(data[i].dri_lat)
       Lng[i] = parseFloat(data[i].dri_lng)
       console.log("mylat"+[i],Lat[i])
       console.log("mylng"+[i],Lng[i])
       
     }
    })
  }

  /////------ ฟังก์ชั่นการ get ระยะทางของคนขับรถ --------------//

  getdriverDistance(latlng){  //--- รับ data มาจากฟังก์ชั่น getDriLatLng 
    
   
    //this.mydist = myrespons
    //console.log("mydist = ",this.mydist)

    var Lat = []    //--- สร้างตัวแปร Lat เป็น array เพื่อเก็บค่า latitute ของตัวเราเองที่รับมาจากฟังก์ชั่น
    var Lng = []   //--- สร้างตัวแปร Lng เป็น array เพื่อเก็ยค่า longtitute ของปลายทางที่รับมาจากฟังก์ชั่น
    var i = 0;
    var origin = [];var destination = []  //-- สร้างตัวแปร origin และ destination เพื่อเก็บค่า lnt,lng
    for(i = 0 ; i<latlng.length ; i++){ //-- วนรอบเพื่อใส่ค่าใน origin และ destination ----//

      Lat[i] = parseFloat(latlng[i].dri_lat)
      Lng[i] = parseFloat(latlng[i].dri_lng)
//console.log("mylat"+[i],Lat[i])
     // console.log("mylng"+[i],Lng[i])
        
        origin[i] = {lat:this.cust_lat, lng:this.cust_lng} //--- ให้ตัวแปร origin เก็บค่า lat,lng ซึ่งมีอยู่ค่าเดียว
        destination[i] = {lat:Lat[i], lng:Lng[i]} //--- ให้ตัวแปร destination เก็บ lat,lng ของปลายทาง ซึ่งมีหลายค่า

       // console.log("origin data"+[i]+" = ",origin[i])
        
        //console.log("destination data "+[i]+"= ",destination[i])
      
    }

    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: origin,   //--- ให้ origins เท่ากับตัวแปร origin ที่เราเก็บค่ามาจากข้างบน
        destinations: destination, //--ให้ destinations เท่ากับตัวแปร destination ที่เราเก็บค่ามาจากข้างบน
        travelMode: 'DRIVING',
      }, callback);

    function callback(response, status) {
      // See Parsing the Results for
      // the basics of a callback function.
     // console.log("response = ",response)
     // console.log("distance = ",response.rows[0].elements)
      
      
      localStorage.setItem("response",
      JSON.stringify(response.rows[0].elements))  //--- response เก็บใน localstorage เพื่อเอาไปใช้งาน
    }
}





//   calculateAndDisplayRoute(cust_lat,cust_lng,dri_lat,dri_lng) {  
//     console.log("cust_lat2 = ",cust_lat)
//     console.log("dri_lat2 = ",dri_lat)
//     var directionsService = new google.maps.DirectionsService;
//     var directionsDisplay = new google.maps.DirectionsRenderer;
//     var origin1 = new google.maps.LatLng(55.930385, -3.118425);
//     var origin2 = 'Greenwich, England';
//     var destinationA = 'Stockholm, Sweden';
//     var destinationB = new google.maps.LatLng(50.087692, 14.421150);

    
//  var service = new google.maps.DistanceMatrixService();
// service.getDistanceMatrix(
//   {
//     origins: [origin1, origin2],
//     destinations: [destinationA, destinationB],
//     travelMode: 'DRIVING',
    
//   }, callback);

// function callback(response, status) {
//   // See Parsing the Results for
//   // the basics of a callback function.
//   console.log("response = ",response)
// }
// }
  
  

}
