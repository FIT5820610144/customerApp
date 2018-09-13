import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the LoginProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginProvider {
  tel = "";
  data:any;
  static get parameters(){
    return[
      [Http]
    ]
  }

  constructor(public http: Http) {
  }

  doLogin(tel){
    //var url = "https://0a9d74e4.ngrok.io/namaetoDB/CustApp/login2.php";
    var url = "http://localhost/namaetoDB/CustApp/login2.php";
    let body = new FormData();
    body.append('tel',tel);
    var response = this.http.post(url,body).map(res=>res.json());
    return response ;

    
}

}
