import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalVariableProvider } from '../global-variable/global-variable';

/*
  Generated class for the DeletedataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DeletedataProvider {
  public url:any;
  constructor(public http: HttpClient,public globalVar: GlobalVariableProvider) {
    console.log('Hello DeletedataProvider Provider');
    this.url = this.globalVar.localhost
  }

}
