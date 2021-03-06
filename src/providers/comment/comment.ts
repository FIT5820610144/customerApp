import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import 'rxjs/add/operator/map';
import { GlobalVariableProvider } from '../global-variable/global-variable';

/*
  Generated class for the CommentProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CommentProvider {
  public url:any;
  constructor(public http: Http,public globalVar: GlobalVariableProvider) {
    this.url = this.globalVar.localhost
    console.log('Hello CommentProvider Provider');
  }

  toComment(rate,commentdetail,cust_ssn,dri_ssn){
    //var url = "https://a24f251f.ngrok.io/namaetoDB/CustApp/register.php";
    var url = "http://"+this.url+"/namaetoDB/CustApp/commentApi.php";
    let body = new FormData();
    body.append('rate',rate);
    body.append('commentdetail',commentdetail);
    body.append('cust_ssn',cust_ssn);
    body.append('dri_ssn',dri_ssn);
    
  
    var response = this.http.post(url,body).map(res=>res.json());
    return response ;
  }

}
