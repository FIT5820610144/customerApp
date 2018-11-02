//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { GlobalVariableProvider } from '../global-variable/global-variable';

/*
  Generated class for the CallingRecordProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CallingRecordProvider {
  public url:any;
  constructor(public http: Http,public globalVar: GlobalVariableProvider) {
    console.log('Hello CallingRecordProvider Provider');
    this.url = this.globalVar.localhost
  }

  getRecord(cust_ssn){
    var ssn = cust_ssn
    //var url = "https://a24f251f.ngrok.io/namaetoDB/CustApp/register.php";
    var url = "http://"+this.url+"/namaetoDB/CustApp/getCustRecord.php";
    let body = new FormData();
    body.append('cust_ssn',cust_ssn);

    var response = this.http.post(url,body).map(res=>res.json());
    return response ;
  }

  deleteRecord(cust_ssn){
    var ssn = cust_ssn
    //var url = "https://a24f251f.ngrok.io/namaetoDB/CustApp/register.php";
    var url = "http://"+this.url+"/namaetoDB/CustApp/deleteCustRecord.php";
    let body = new FormData();
    body.append('cust_ssn',cust_ssn);

    var response = this.http.post(url,body).map(res=>res.json());
    return response ;
  }

  deleteArecoard(cr_number){
    //var ssn = cust_ssn
    //var url = "https://a24f251f.ngrok.io/namaetoDB/CustApp/register.php";
    var url = "http://"+this.url+"/namaetoDB/CustApp/deleteCustRecord.php";
    let body = new FormData();
    body.append('cr_number',cr_number);

    var response = this.http.post(url,body).map(res=>res.json());
    return response ;
  }


}
