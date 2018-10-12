import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http , Headers , RequestOptions,Response } from '@angular/http';
//import { Http,Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
/*
  Generated class for the CallingProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CallingProvider {
  private _url:string = "http://localhost/namaetoDB/CustApp/accepted.php";

  constructor(public http: Http) {
    console.log('Hello CallingProvider Provider');
  }

  toCalling(cust_ssn,Start,End,call_status,distance,fare){
    //var url = "https://a24f251f.ngrok.io/namaetoDB/CustApp/callingdb.php";
    var url = "http://localhost/namaetoDB/CustApp/callingdb.php";
    let body = new FormData();
    body.append('cust_ssn',cust_ssn);
    body.append('Start',Start);
    body.append('End',End);
    body.append('distance',distance);
    body.append('fare',fare);
    body.append('call_status',call_status);
    
    var response = this.http.post(url,body).map(res=>res.json());
    return response ;

  }

  saveCallingRec(Start,End,cust_ssn,fare){
    var url = "http://localhost/namaetoDB/CustApp/custCallingRecord.php";
    let body = new FormData();
    body.append('Start',Start);
    body.append('End',End);
    body.append('fare',fare);
    body.append('cust_ssn',cust_ssn);
  
    var response = this.http.post(url,body).map(res=>res.json());
    return response ;
  }

  accept(){
    return this.http.get(this._url)
           .map((response:Response)=> response.json());
   }

   getDriver(){
    return this.http.get(this._url)
          .map((response:Response)=> response.json());
  }

  getVehicle(){
    return this.http.get(this._url)
          .map((response:Response)=> response.json());
  }
  finished(){
    return this.http.get(this._url)
          .map((response:Response)=> response.json());
  }


}
