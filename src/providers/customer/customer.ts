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
      this.http.get('https://0a9d74e4.ngrok.io/namaetoDB/CustApp/login.php')
       //this.http.get('http://localhost/namaetoDB/CustApp/login.php')
       .map(res=> res.json())
       .subscribe(data => {
         resolve(data);
       },error => {
         reject(error);
       })
     });
   }

   getdata(tel){
    var url = "https://localhost/namaetoDB/CustApp/login2.php";
    let body = new FormData();
    body.append('tel',tel);

    this.data = this.http.post(url,body)
    this.data.subscribe( data => {
      console.log(data);
    }) 
   }
}
