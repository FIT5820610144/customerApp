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
    //var url = "https://4f8b9c01.ngrok.io/namaetoDB/CustApp/register.php";
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

  /*(ssn:string,name:string){
    return new Promise((resolve,reject)=>{
      let headers = new Headers({'Content-Type':'application/json'});
      let options = new RequestOptions({headers:headers});
      let body = {ssn:ssn,name:name};
      this.http.post('http://localhost/namaetoDB/CustApp/register.php',body,options)
      .map(res=>res.json())
      .subscribe(data=>{
        resolve(data);
      },error => {
        reject(error)
      })
    })
  }*/
}
