import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,ViewController,App} from 'ionic-angular';
import { CustomerProvider } from '../../providers/customer/customer';
import { RegisterProvider } from '../../providers/register/register';
import { ManagePage } from '../manage/manage';

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
    public alertCtrl: AlertController,
    public viewCtrl:ViewController,
    private app:App) {
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditCustomerPage');
    this.getUsers();
  }

  //------------- get all customer data from database for edit -----//
    getUsers(){
      this.custProvider.getUser()
      .subscribe(data =>{
        this.userList = data
        this.cust_name = data[0].cust_name
        this.cust_surname = data[0].cust_surname
        this.cust_email = data[0].cust_email
        this.cust_tel = data[0].cust_tel
      })
    }

    //------ function for update when click edit button ------//
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
                    this.viewCtrl.dismiss().then(() => {
                      this.app.getRootNav().setRoot(ManagePage);
                  });
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
