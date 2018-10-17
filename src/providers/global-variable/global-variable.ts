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
  public localhost:any;
  constructor(public http: Http) {
    console.log('Hello GlobalVariableProvider Provider');
    this.localhost = '192.168.136.202';
  }

}
