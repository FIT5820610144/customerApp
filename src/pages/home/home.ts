import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { } from '@agm/core';
//import {} from "@types/googlemaps";

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
  vehicle:any;
  distance:any;
  
  @ViewChild('map') mapRef: ElementRef;
  map: any;

  constructor(public navCtrl: NavController, public geo: Geolocation) {
    console.log(this.distance)
  }


   calculateAndDisplayRoute(clat,clng) {  
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var firstPosition = {lat:clat,lng:clng};
    var distanced = this.distance
    console.log(distanced)
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
      title: 'Hello World!'
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
        var getKm = getDistance/1000
        var km = getKm.toFixed(0);
        var defaultFare = 5;
        //distanced = km
        
        var getFare = getKm * defaultFare;
        var fare = getFare.toFixed(0)
          document.getElementById('distance').innerHTML=km + ' KM'
          document.getElementById('fare').innerHTML=fare + ' ฿'
       // 
       // console.log(response.routes[0].legs[0].distance.text)
       // console.log(response.routes[0].legs[0].duration.text)
      } else {
        window.alert('ไม่สามารถค้นหาเส้นทางที่ท่านได้ระบุ ' + status);
      }
    }); 
  }

  ionViewDidLoad(){
    this.geo.getCurrentPosition().then( pos => {
        this.clat = pos.coords.latitude
        this.clng = pos.coords.longitude
       this.calculateAndDisplayRoute(this.clat,this.clng);
      }).catch(err => console.log(err)); 
   //this.calculateAndDisplayRoute();
  }

  showTypefunc(){
    this.showType = true;
  }

  getDistance(){

  }
      
}