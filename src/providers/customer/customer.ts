import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


/*
  Generated class for the CustomerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CustomerProvider {

  tel = "";
  data:any;

  constructor(public http: Http) {
    console.log('Hello CustomerProvider Provider');
  }

   getUser(){
     return new Promise((resolve,reject)=>{
      //this.http.get('https://4f8b9c01.ngrok.io/namaetoDB/CustApp/login.php')
       this.http.get('http://localhost/namaetoDB/CustApp/login.php')
       .map(res=> res.json())
       .subscribe(data => {
         resolve(data);
       },error => {
         reject(error);
       })
     });
   }
}
