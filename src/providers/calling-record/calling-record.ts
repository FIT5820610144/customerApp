import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http , Headers , RequestOptions,Response } from '@angular/http';

/*
  Generated class for the CallingRecordProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CallingRecordProvider {

  constructor(public http: Http) {
    console.log('Hello CallingRecordProvider Provider');
  }

  getRecord(cust_ssn){
    var ssn = cust_ssn
    //var url = "https://a24f251f.ngrok.io/namaetoDB/CustApp/register.php";
    var url = "http://localhost/namaetoDB/CustApp/getCustRecord.php";
    let body = new FormData();
    body.append('cust_ssn',cust_ssn);

    var response = this.http.post(url,body).map(res=>res.json());
    return response ;
  }

  deleteRecord(cust_ssn){
    var ssn = cust_ssn
    //var url = "https://a24f251f.ngrok.io/namaetoDB/CustApp/register.php";
    var url = "http://localhost/namaetoDB/CustApp/deleteCustRecord.php";
    let body = new FormData();
    body.append('cust_ssn',cust_ssn);

    var response = this.http.post(url,body).map(res=>res.json());
    return response ;
  }


}
