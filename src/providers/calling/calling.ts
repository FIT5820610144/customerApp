import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalVariableProvider } from '../global-variable/global-variable';
import 'rxjs/add/operator/map';
import { Http , Headers , RequestOptions,Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';


@Injectable()
export class CallingProvider {
  public url:AnalyserNode;
  private _url:string;
  

  constructor(public http: Http,public globalVar: GlobalVariableProvider) {
    console.log('Hello CallingProvider Provider');
    this.url = this.globalVar.localhost
    this._url = "http://"+this.url+"/namaetoDB/CustApp/accepted.php";
  }

  toCalling(cust_ssn,Start,End,call_status,distance,fare,dri_ssn){
   
    var url = "http://"+this.url+"/namaetoDB/CustApp/callingdb.php";
    let body = new FormData();
    body.append('cust_ssn',cust_ssn);
    body.append('Start',Start);
    body.append('End',End);
    body.append('distance',distance);
    body.append('fare',fare);
    body.append('call_status',call_status);
    body.append('dri_ssn',dri_ssn);
    
    var response = this.http.post(url,body).map(res=>res.json());
    return response ;

  }

  saveCallingRec(Start,End,cust_ssn,fare,dri_ssn){
    var url = "http://"+this.url+"/namaetoDB/CustApp/custCallingRecord.php";
    let body = new FormData();
    body.append('Start',Start);
    body.append('End',End);
    body.append('fare',fare);
    body.append('cust_ssn',cust_ssn);
    body.append('dri_ssn',dri_ssn);
  
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

  custCancle(cust_cancle){
    var url = "http://"+this.url+"/namaetoDB/CustApp/callingCancleApi.php";
    let body = new FormData();
    body.append('cust_cancle',cust_cancle);
  
    var response = this.http.post(url,body).map(res=>res.json());
    return response ;
  }

  getDriverActive(){
    return this.http.get("http://"+this.url+"/namaetoDB/CustApp/getDriverActive.php")
    .map((response:Response)=> response.json());
  }


}
