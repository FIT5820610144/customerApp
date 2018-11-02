import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http,Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { GlobalVariableProvider } from '../global-variable/global-variable';


/*
  Generated class for the CustomerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CustomerProvider {

  tel = "";
  data:any;
  url:any
  private _url:string;
//  private _Gurl:string = "https://514d472c.ngrok.io/namaetoDB/CustApp/login.php";

  constructor(public http: Http,public globalVar: GlobalVariableProvider) {
    console.log('Hello CustomerProvider Provider');
    this.url = this.globalVar.localhost
    console.log("url customer = "+this.url)
    this._url = "http://"+this.url+"/namaetoDB/CustApp/getCustomer.php";
  }
  
  getUser(){
    return this.http.get(this._url)
           .map((response:Response)=> response.json());
   }

  // getUser(tel){
  //     var url = this._url
  //     let body = new FormData();
  //     body.append('tel',tel);
  
  //     var response = this.http.post(url,body).map(res=>res.json());
  //     return response ;
  // }



    // getUser(){
    //   return new Promise((resolve,reject)=>{
    //    //this.http.get('https://4f8b9c01.ngrok.io/namaetoDB/CustApp/login.php')
    //     this.http.get('http://localhost/namaetoDB/CustApp/login.php')
    //     .map(res=> res.json())
    //     .subscribe(data => {
    //       resolve(data);
          
    //     },error => {
    //       reject(error);
    //     })
    //   });
    // }

}
