import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginProvider {
  tel = "";
  data:any;
  _url:any;
  // static get parameters(){
  //   return[
  //     [Http]
  //   ]
  // }
  constructor(public http: Http) {
    this._url = "http://localhost/namaetoDB/CustApp/login.php";
  }

  doLogin(tel){
    var url = this._url
    let body = new FormData();
    body.append('tel',tel);
    var response = this.http.post(url,body).map(res=>res.json());
    return response ;
}

}
