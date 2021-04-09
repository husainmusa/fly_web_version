/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : ionic 5 groceryee app
  Created : 10-Sep-2020
  This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2020-present initappz.
*/
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { UtilService } from 'src/app/services/util.service';
import { Location } from '@angular/common';
import * as moment from 'moment';
@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  id: any;
  loaded: boolean;
  orderDetail: any[] = [];
  orders: any[] = [];
  payMethod: any;
  status: any[] = [];
  datetime: any;
  orderAt: any;
  address: any;
  userInfo: any;
  driverInfo: any[] = [];
  acceptedDriverInfo: any[] = [];
  changeStatusOrder: any;
  userLat: any;
  userLng: any;
  driverId: any;
  cashPaid: any;
  stores: any[] = [];
  OrderCreationTime: any;
  canCancle: boolean;
  buttonVisible= false;
  isDelivered: boolean;
  lastSecond:number = 0;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public api: ApiService,
    public util: UtilService,
    private navCtrl: Location
  ) {
    this.route.queryParams.subscribe((data) => {
      console.log(data);
      if (data && data.id) {
        this.id = data.id;
        this.loaded = false;
        this.getOrder();
      } else {
        this.navCtrl.back();
      }
    });
  }

  getOrder() {
    const param = {
      id: this.id
    };
    this.api.post('orders/getById', param).subscribe((data: any) => {
      console.log(data);
      this.loaded = true;
      if (data && data.status === 200 && data.data.length > 0) {
        const info = data.data[0];
        this.OrderCreationTime = info.date_time
        console.log(info);
        this.getTimer();
        this.orderDetail = JSON.parse(info.notes);
        const order = JSON.parse(info.orders);
        console.log('order=====>>', order);
        const finalOrder = [];
        const ids = [...new Set(order.map(item => item.store_id))];
        ids.forEach(element => {
          const param = {
            id: element,
            order: []
          };
          finalOrder.push(param);
        });

        ids.forEach((element, index) => {
          order.forEach(cart => {
            if (cart.variations && cart.variations !== '' && typeof cart.variations === 'string') {
              cart.variations = JSON.parse(cart.variations);
              console.log(cart['variant']);
              if (cart["variant"] === undefined) {
                cart['variant'] = 0;
              }
            }
            if (cart.store_id === element) {
              finalOrder[index].order.push(cart);
            }
          });
        });
        console.log('final order', finalOrder);
        this.orders = finalOrder;
        this.status = JSON.parse(info.status);
        console.log('order status--------------------', this.status);

        const status = this.status.filter(x => x.status === 'created');
        if (status.length === this.status.length) {
          this.canCancle = true;
        } else {
          this.canCancle = false;
        }

        const delivered = this.status.filter(x => x.status === 'delivered');
        if (delivered.length === this.status.length) {
          this.isDelivered = true;
        } else {
          this.isDelivered = false;
        }

        if(info.paid_method == "online"){
          this.cashPaid = "Paid";
        }else{
          if(info.paid_method == "cod" && this.isDelivered){
              this.cashPaid = "Paid";
          }else if(info.paid_method == "cod" && !this.isDelivered){
              this.cashPaid = "Pending";
          }
        }
        // if()
        this.datetime = moment(info.date_time).format('dddd, MMMM Do YYYY');
        this.payMethod = info.paid_method === 'cod' ? 'COD' : 'Easy Card';
        this.orderAt = info.order_to;
        this.driverId = info.driver_id;
        // if (this.driverId && this.driverId !== '') {
        //   const userinfo = {
        //     id: this.driverId
        //   };
        //   this.api.post('drivers/getDriversData', userinfo).subscribe((data: any) => {
        //     console.log('driverid>', data, this.id);
        //     if (data && data.status === 200 && data.data && data.data.length) {
        //       data.data.forEach(async (element) => {
        //         const orderParam = {
        //           id: this.id
        //         };
        //         this.api.post('acceptedorders/getByOrderId', orderParam).subscribe((accepteddata: any) => {
        //           console.log("data", accepteddata);
        //           if (accepteddata && accepteddata.status === 200 && accepteddata.data.length > 0) {
        //             accepteddata.data.forEach(async (acceptedElement) => {
        //               if(acceptedElement.driver_id == element.id){
        //                 console.log("yes");
        //                 this.driverInfo = element;
        //                 console.log("driver info", this.driverInfo);
        //               }
        //             });
        //           }
        //         });
        //       });
        //       // this.driverInfo = data.data;
        //       // console.log(this.driverInfo);
        //     }
        //   }, error => {
        //     console.log(error);
        //   });
        // }

        if (this.driverId && this.driverId !== '') {
          const userinfo = {
            id: this.driverId
          };
          this.api.post('drivers/getDriversData', userinfo).subscribe((data: any) => {
            console.log('driverid>', data);
            if (data && data.status === 200 && data.data && data.data.length) {
              // this.driverInfo = data.data;
              data.data.forEach(async (element) => {
                const orderParam = {
                  id: this.id
                };
                this.api.post('acceptedorders/getByOrderId', orderParam).subscribe((accepteddata: any) => {
                  if (accepteddata && accepteddata.status === 200 && accepteddata.data.length > 0) {
                    accepteddata.data.forEach(async (acceptedElement) => {
                      if(acceptedElement.driver_id == element.id){
                        this.acceptedDriverInfo.push(element);
                        console.log("yes", element.first_name);
                        console.log("yes",this.acceptedDriverInfo);
                      }
                    });
                  }
                });
              });
            }
          }, error => {
            console.log(error);
          });
        }

        const stores = {
          id: info.store_id
        };
        this.api.post('stores/getStoresData', stores).subscribe((data: any) => {
          console.log('store=-============>>', data);
          console.log('store=-============>>', data);
          if (data && data.status === 200 && data.data.length) {
            this.stores = data.data;

          } else {
            // this.util.showToast('No Stores Found', 'danger', 'bottom');
            this.util.toast('error', this.util.getString('Error'), this.util.getString('No Stores Found'));
            this.back();
          }
        }, error => {
          console.log('error', error);
          this.util.toast('error', this.util.getString('Error'), this.util.getString('Something went wrong'));
        });
        if (this.orderAt === 'home') {
          const address = JSON.parse(info.address);
          console.log('---address', address);
          if (address && address.address) {
            this.userLat = address.lat;
            this.userLng = address.lng;
            this.address = address.landmark + ' ' + address.house + ' ' + address.address + ' ' + address.pincode;
            // this.getDrivers();
          }
        }
      } else {
        this.util.toast('error', this.util.getString('Error'), this.util.getString('Something went wrong'));
      }
    }, error => {
      console.log(error);
      this.loaded = true;
      this.util.toast('error', this.util.getString('Error'), this.util.getString('Something went wrong'));
    });
  }

  ngOnInit(): void {
  }


  getDrivers() {
    const param = {
      id: this.driverId
    };
    this.api.post('drivers/getById', param).subscribe((data: any) => {
      console.log(data);
    }, error => {
      console.log(error);
    });
  }

  getStoreName(id) {
    const item = this.stores.filter(x => x.uid === id);
    if (item && item.length) {
      return item[0].name;
    }
    return this.util.getString('Store');
  }

  getOrderStatus(id) {
    const item = this.status.filter(x => x.id === id);
    if (item && item.length) {
      return this.util.getString(item[0].status); 
    }
    return  this.util.getString('Created');
  }

  goToTracker() {
    this.router.navigate(['/tracker']);
  }

  back() {
    this.navCtrl.back();
  }

  contanct(item) {
    console.log(item);
  }

  contanctDriver(item) {
    console.log(item);
  }

  changeStatus() {
    console.log('changeStatus status');

    const newOrderNotes = {
      status: 1,
      value: this.util.getString('Order ') + this.util.getString('cancelled by you'),
      default:"Order cancelled by you",
      user:'',
      time: moment().format('lll'),
    };
    this.orderDetail.push(newOrderNotes);

    this.status.forEach(element => {
      if (element.status === 'created') {
        element.status = 'cancelled';
      }
    });

    const param = {
      id: this.id,
      notes: JSON.stringify(this.orderDetail),
      status: JSON.stringify(this.status),
    };
    console.log('---->', this.status)
    this.api.post('orders/editList', param).subscribe((data: any) => {
      console.log('order', data);
      if (this.orderAt === 'home' && this.driverId !== '0') {
        this.updateDriver(this.driverId, 'active');
      }
      if (data && data.status === 200) {
        this.sendNotification('cancelled');
        this.back();
      } else {
        this.util.toast('Error','',this.util.getString('Something went wrong'));
      }
    }, error => {
      console.log(error);
      this.util.toast('Error','',this.util.getString('Something went wrong'));
    });

  }


  sendNotification(value) {
    if (this.userInfo && this.userInfo.fcm_token) {
      this.api.sendNotification(this.util.getString('Your order #') + this.id + ' ' + value, this.util.getString('Order')
        + ' ' + value, this.userInfo.fcm_token)
        .subscribe((data: any) => {
          console.log('onesignal', data);
        }, error => {
          console.log('onesignal error', error);
        });
    }
  }

  updateDriver(uid, value) {
    const param = {
      id: uid,
      current: value
    };
    console.log('param', param);
    this.api.post('drivers/edit_profile', param).subscribe((data: any) => {
      console.log(data);
    }, error => {
      console.log(error);
    });
  }




  getTimer(){
    this.buttonVisible = false;

    if(this.OrderCreationTime){
      let oderCreationTime = new Date(this.OrderCreationTime).getTime();
      let currentTime = new Date().getTime();
      let diffrenceTime = currentTime - oderCreationTime;
      let totalSecondsFromCreation =  diffrenceTime/1000;
      
      
      if(totalSecondsFromCreation < 30){        
        this.lastSecond = Math.round(30 - (totalSecondsFromCreation || 0));
        const timer = ()=>{   
          if(this.lastSecond<=0) {
            this.buttonVisible = false;
          }else{
            this.lastSecond = Math.round(this.lastSecond - 1)
            setTimeout(()=>{timer();},1000);
            this.buttonVisible = true;
          }
        }
        timer();

      }
    }
  }
}
