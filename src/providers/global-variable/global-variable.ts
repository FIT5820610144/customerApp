import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http'

/*
  Generated class for the GlobalVariableProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GlobalVariableProvider {
  localhost:any;
  constructor(public http: Http) {
    console.log('Hello GlobalVariableProvider Provider');
  }

  // getIP(){
  //   this.localhost = 'localhost'
  //   console.log("IP = "+this.localhost)
  //   return this.localhost
  // }

}
