import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import { CustomerProvider } from '../../providers/customer/customer';
import { RegisterProvider } from '../../providers/register/register';
import { ManagePage } from '../manage/manage';


/**
 * Generated class for the EditCustomerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-customer',
  templateUrl: 'edit-customer.html',
})
export class EditCustomerPage {

  userList:any;
  cust_name:String;cust_surname:String;cust_email:String;cust_tel:String

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public custProvider : CustomerProvider,
    public registCtrl : RegisterProvider,
    public alertCtrl: AlertController,) {
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditCustomerPage');
    this.getUsers();
  }

    getUsers(){
      this.custProvider.getUser()
      .subscribe(data =>{
        this.userList = data
        this.cust_name = data[0].cust_name
        this.cust_surname = data[0].cust_surname
        this.cust_email = data[0].cust_email
        this.cust_tel = data[0].cust_tel
        console.log("Got Users = " + data[0].cust_name);
      })
    }

      edit(event,name,surname,email,tel){
        console.log("name for html = " + name)
          
        this.registCtrl.editCustomer(name,surname,email,tel).subscribe(
          data =>{
            if(data.status == "success"){
              let alert = this.alertCtrl.create({
                title: 'แก้ไขข้อมูล',
                subTitle: 'แก้ไขข้อมูลเรียบร้อยแล้ว',
                buttons: [{
                  text: 'ตกลง',
                  handler: data=>{
                    this.navCtrl.pop()
                    //this.navParams.get("edited");
                    //window.location.reload();
                  }
                }]
              });
              alert.present();

            }
            }
        )
        
      }

  cancleEdit(){
    this.navCtrl.pop();

  }

}
