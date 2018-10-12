import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http , Headers , RequestOptions } from '@angular/http';
/*
  Generated class for the RegisterProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RegisterProvider {

  constructor(public http: Http) {

  }

  doRegister(ssn,name,surname,email,tel){
    //var url = "https://a24f251f.ngrok.io/namaetoDB/CustApp/register.php";
    var url = "http://localhost/namaetoDB/CustApp/register.php";
    let body = new FormData();
    body.append('ssn',ssn);
    body.append('name',name);
    body.append('surname',surname);
    body.append('email',email);
    body.append('tel',tel);
    

    var response = this.http.post(url,body).map(res=>res.json());
    return response ;
}

editCustomer(name,surname,email,tel){
  //var url = "https://a24f251f.ngrok.io/namaetoDB/CustApp/register.php";
  var url = "http://localhost/namaetoDB/CustApp/editCustomer.php";
  let body = new FormData();
  body.append('name',name);
  body.append('surname',surname);
  body.append('email',email);
  body.append('tel',tel);
  
  var response = this.http.post(url,body).map(res=>res.json());
  return response ;
}
}
