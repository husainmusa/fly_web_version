/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : ionic 5 groceryee app
  Created : 10-Sep-2020
  This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2020-present initappz.
*/
import { Injectable } from '@angular/core';
import { constants } from 'buffer';
import { UtilService } from './util.service';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cart: any[] = [];
  public itemId: any[] = [];
  public totalPrice: any = 0;
  public grandTotal: any = 0;
  public coupon: any;
  public discount: any = 0;
  public orderTax: any = 0;
  public orderPrice: any;
  public shipping: any;
  public shippingPrice: any = 0;
  public minOrderPrice: any = 0;
  public freeShipping: any = 0;
  public datetime: any;
  public deliveryAt: any;
  public deliveryAddress: any;
  public deliveryPrice: any = 0;
  public stores: any[] = [];
  public BaseShippingPrice :any = 0;
  public PerKmShippingPrice :any = 0;
  public storeDeliverLength:any = 10;
  AdminInfo: any;
  public havePayment: boolean;
  public haveStripe: boolean;
  public haveRazor: boolean;
  public haveCOD: boolean;
  public havePayPal: boolean;
  public havePayTM: boolean;
  public havePayStack: boolean;
  public haveFlutterwave: boolean;
  public maxPriceForCod: any = 0;
  public crrStoreToCart :any;
  public paytmCreds = {
    id: '',
    key: '',
    code: ''
  };

  public paytmENV: any;

  haveInstamojo: boolean;
  instamojo = {
    key: '',
    token: '',
    code: ''
  };
  instaENV: any;

  public paystack = {
    sk: '',
    pk: '',
    code: ''
  };
  public flutterwave = {
    pk: '',
    code: ''
  }
  constructor(
    public util: UtilService,
    public api: ApiService,
  ) {
    const data = localStorage.getItem('cart');
    if (data && data !== null && data !== 'null') {
      const userCart = JSON.parse(data);
      if (userCart && userCart.length > 0) {
        this.cart = userCart;
        this.itemId = [...new Set(this.cart.map(item => item.id))];
        this.calcuate();
      } else {
        this.calcuate();
      }
    } else {
      this.calcuate();
    }
    this.api.get('general/index').subscribe((data: any) => {
      if(data.status == 200){
          this.AdminInfo = data.data[0];
          this.BaseShippingPrice = parseInt(this.AdminInfo.shipping_price_for3);
          this.PerKmShippingPrice = parseInt(this.AdminInfo.shipping_price_after3);
          this.maxPriceForCod =  parseInt(this.AdminInfo.max_price_for_cod);
      }

    })

  }

  clearCart() {
    this.cart = [];
    this.itemId = [];
    this.totalPrice = 0;
    this.grandTotal = 0;
    this.coupon = undefined;
    this.discount = 0;
    this.orderPrice = 0;
    this.datetime = undefined;
    this.stores = [];
    this.deliveryAddress = null;
    this.shippingPrice = 0;
    this.deliveryPrice = 0;
    this.util.clearKeys('cart');
  }

  // addAddOn(id,  parent, quantity){
  //   console.log("parent id is", parent, id);
  //   console.log(this.cart);
  //   this.cart.forEach(element => {
  //     if (element.id == parent) {
  //       element.variations[0].items.forEach(addOnElement => {
  //         if(addOnElement.id == id){
  //           addOnElement.quantity = quantity;
  //         }
  //       });
  //     }
  //   });
  //   this.calcuate();
  // }

  addAddOn(id,  parent, quantity){
    this.cart.forEach(element => {
      if (element.id == parent) {
        element.variations[0].items.forEach(addOnElement => {
          console.log('addOnElement',addOnElement)
          if(addOnElement.id == id){
            addOnElement.quantity = element.quantiy;
          }else{
            addOnElement.quantity = 0;
          }
        });

      }
    });
    this.calcuate();
  }

  addItem(item) {

    if(this.cart.length == 0 || this.cart.length > 0){
      const found = this.cart.find(storeInfo => storeInfo.store_id  == item.store_id );
      if(found){
        this.cart.push(item);
        this.itemId.push(item.id);
        this.calcuate();
      }else{
          if(this.cart.length > 0){
            this.util.toast('error', this.util.getString('Error'), this.util.getString('You cant order from multiple stores, only the last order added to cart'));
          }
          this.clearCart();
          this.cart.push(item);
          this.itemId.push(item.id);
          this.calcuate();
      }
    }
    this.getStoreInfo(item.store_id);
  }




  // subAddItem(item,id) {
  //   console.log('item to adde', item);
  //   this.cart.push(item);
  //   this.itemId.push(id);
  //   this.calcuate();
  // }
  
  // addQuantity(quantity, id) {
  //   console.log('iddd-->>', id);
  //   console.log('quantity', quantity);
  //   this.cart.forEach(element => {
  //     if (element.id === id) {
  //       element.quantiy = quantity;
  //     }
  //   });
  //   this.calcuate();
  // }


  addQuantity(quantity, id) {
    // console.log('addQuantity:')
    this.cart.forEach(element => {
      if (element.id === id) {
        // console.log('===========>',element)
        element.quantiy = quantity;
        if(element.variations && element.variations[0] && element.variations[0].items && element.variations[0].items.length && element.variations[0].items.length > 0 ){
          element.variations[0].items.forEach(addones => {
            if(addones.quantity > 0){
              addones.quantity = quantity;
            }else{
              addones.quantity = 0;
            }
          });
        }
      }
    });
    this.calcuate();
  }








  // subAddQuantity(quantity, id) {
  //   console.log("subAddQuantitytest");
  //   console.log('iddd-->>', id);
  //   console.log('quantity', quantity);
  //   this.cart.forEach(element => {
  //     console.log("subAddQuantity", element);
  //     if (element.id === id) {
  //       element.quantiy = quantity;
  //     }
  //   });
  //   this.calcuate();
  // }

  removeItem(id) {
    console.log('remove this item from cart');
    console.log('current cart items', this.cart);
    this.cart = this.cart.filter(x => x.id !== id);
    this.itemId = this.itemId.filter(x => x !== id);

    console.log('====>>>>>>>>>', this.cart);
    console.log('items====>>>', this.itemId);
    this.calcuate();
  }

  // removeChild(childrenId){
  //   for(let i = 0; i < childrenId.length; i++){
  //     this.cart = this.cart.filter(x => x.id !== childrenId[i]);
  //     this.itemId = this.itemId.filter(x => x !== childrenId[i]);
  //     this.calcuate();
  //   }
  // }

  // subRemoveItem(id) {
  //   console.log('remove this item from cart');
  //   console.log('current cart items', this.cart);
  //   this.cart = this.cart.filter(x => x.id !== id);
  //   this.itemId = this.itemId.filter(x => x !== id);

  //   console.log('====>>>>>>>>>', this.cart);
  //   console.log('items====>>>', this.itemId);
  //   if (this.cart.length) {
  //     this.calcuate();
  //   } else {
  //     this.clearCart();
  //   }
  // }

  calcuate() {
    console.log("thisstore",this.stores.length, this.stores);
    this.discount = 0;
    console.log('cart==>', this.cart);
    console.log('couiponnnnnnneee---->>', this.coupon);
    let total = 0;
    this.cart.forEach(element => {
      if (element && element.discount === '0') {
        if (element.size === '1' || element.size === 1) {
          total = total + (parseFloat(element.original_price) * element.quantiy);
          // if (element.variations[0].items[element.variant].discount && element.variations[0].items[element.variant].discount !== 0) {
          //   total = total + (parseFloat(element.variations[0].items[element.variant].discount) * element.quantiy);
          // } else {
          //   total = total + (parseFloat(element.variations[0].items[element.variant].price) * element.quantiy);
          // }
        } else {
          total = total + (parseFloat(element.original_price) * element.quantiy);
        }
      } else {
        if (element.size === '1' || element.size === 1) {
          total = total + (parseFloat(element.sell_price) * element.quantiy);
          // if (element.variations[0].items[element.variant].discount && element.variations[0].items[element.variant].discount !== 0) {
          //   total = total + (parseFloat(element.variations[0].items[element.variant].discount) * element.quantiy);
          // } else {
          //   total = total + (parseFloat(element.variations[0].items[element.variant].price) * element.quantiy);
          // }
        } else {
          total = total + (parseFloat(element.sell_price) * element.quantiy);
        }
      }
      if(element.variations[0]){
        let addon_items = element.variations[0].items;
        addon_items.forEach(addonElement => {
          if(addonElement.price > 0 && addonElement.quantity > 0){
            // let discount_price = (addonElement.discount / 100) * addonElement.price;
            total = total + ((parseFloat(addonElement.price) ) * addonElement.quantity);
          }
        });
      }

      if(element.second_variation){
        console.log('here======>')
        for(let a=0; a < element.second_variation.length; a++){
          element.second_variation[a].sub_category= element.second_variation[a].sub_category;
            if(element.second_variation[a].sub_category){
              console.log(element.second_variation[a].sub_category,)
              element.second_variation[a].sub_category.forEach(addonElement => {
                // console.log('addonElement.price========>',addonElement.price ,)
                if(addonElement.price > 0 && addonElement.quantity > 0){
                  console.log()
                  total = total + ((parseFloat(addonElement.price)) * addonElement.quantity);      
                }
              });
          }
        }
      }


    });
    // this.cart.forEach(element => {
    //   if (element && element.discount === '0') {
    //     total = total + (parseFloat(element.original_price) * element.quantiy);
    //   } else {
    //     total = total + (parseFloat(element.sell_price) * element.quantiy);
    //   }
    // });
    console.log('total->', total);
    this.totalPrice = total;

    if (this.coupon && this.coupon.type) {
      const min = parseFloat(this.coupon.min);
      if (this.totalPrice >= min) {
        if (this.coupon && this.coupon.type === 'per') {
          console.log('per');
          function percentage(num, per) {
            return (num / 100) * per;
          }
          const totalPrice = percentage(parseFloat(this.totalPrice).toFixed(2), parseFloat(this.coupon.off));
          console.log('============>>>>>>>>>>>>>>>', totalPrice);
          this.discount = totalPrice.toFixed(2);
          this.grandTotal = (this.totalPrice - parseFloat(this.discount)) 
        } else {
          console.log('currency');
          this.discount = this.coupon.off;
          this.grandTotal = (this.totalPrice - parseFloat(this.discount)) 
        }
      } else {
        this.discount = 0;
        this.coupon = null;
      }
    } else {
      this.grandTotal = this.totalPrice;
    }
    if (this.stores && this.stores.length && this.deliveryAddress && this.deliveryAt === 'home') {
      console.log('--->>> delivery address===>>>|', this.deliveryAddress);
      this.deliveryPrice = 0;
      let totalKM = 0;
      this.stores.forEach(async (element) => {

        if(!element.delivery_range){
          element.delivery_range = 10;
        }else{
          this.storeDeliverLength = element.delivery_range;
        }
        const distance = await this.distanceInKmBetweenEarthCoordinates(this.deliveryAddress.lat, this.deliveryAddress.lng,
          element.lat, element.lng);
        console.log('distance', distance);
        totalKM = totalKM + distance;
      });
      setTimeout(() => {
        if(totalKM >=  this.storeDeliverLength){
          this.util.toast('error', this.util.getString('Error'), this.util.getString('store not provide delivery at your location'));
         // this.navCtrl.back();
        }else{
          if(totalKM > 3){
            let other = totalKM - 3;
            let normalPrice = this.BaseShippingPrice;
            let priceOfExtraKm = other * this.PerKmShippingPrice;
            this.deliveryPrice = Math.floor(normalPrice + priceOfExtraKm).toFixed(2);
            // let totalprice =  this.totalPrice - this.discount;
            
            let grandTotPrice = parseInt(this.totalPrice)  + parseInt(this.deliveryPrice)
            this.grandTotal =  Math.floor(grandTotPrice).toFixed(2);
  
         } else{
          this.deliveryPrice = this.BaseShippingPrice;
          this.grandTotal = this.totalPrice + this.deliveryPrice ;      
         }
        }


        // console.log('free', this.freeShipping);
        // console.log('totalprice', this.totalPrice);
        // if (this.freeShipping > this.totalPrice) {
        //   if (this.shipping === 'km') {
        //     const distancePricer = totalKM * this.shippingPrice;
        //     console.log('====================> KM price', distancePricer);
        //     this.deliveryPrice = Math.floor(distancePricer).toFixed(2);
        //     this.grandTotal = (this.totalPrice - parseFloat(this.discount)) + distancePricer;
        //     this.grandTotal = parseFloat(this.grandTotal).toFixed(2);
        //     console.log('grand total===>>', this.grandTotal);
        //     // console.log('deliveryeeeeeeeee', this.deliveryPrice);
        //   } else {
        //     this.deliveryPrice = this.shippingPrice;
        //     console.log('shippppppppp=-======0-00-=-=', this.shippingPrice);
        //     this.grandTotal = (this.totalPrice - parseFloat(this.discount)) + this.shippingPrice;
        //     this.grandTotal = parseFloat(this.grandTotal).toFixed(2);
        //     console.log('grand total===>>', this.grandTotal);
        //   }

        // } else {
        //   this.deliveryPrice = 0;
        //   // this.grandTotal = this.totalPrice + this.orderTax;
        //   this.grandTotal = (this.totalPrice - parseFloat(this.discount)) 
        //   this.grandTotal = parseFloat(this.grandTotal).toFixed(2);
        //   console.log('grand total===>>', this.grandTotal);
        // }
      }, 1000);
      // this.stores = [];
    } else {
      this.deliveryPrice = this.BaseShippingPrice;
      this.grandTotal = this.totalPrice + this.deliveryPrice ;
      // console.log('no store,no delivery address, no shipping price valid');
      // this.deliveryPrice = 0;
      // this.grandTotal = (this.totalPrice - parseFloat(this.discount))
      // this.grandTotal = parseFloat(this.grandTotal).toFixed(2);

    }

    console.log('=====>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>initappz calc');
    this.util.setKeys('cart', JSON.stringify(this.cart));


    this.deliveryPrice = Math.floor(this.deliveryPrice).toFixed(2)
    this.grandTotal =   Math.floor(this.grandTotal).toFixed(2)
    this.totalPrice =   Math.floor(this.totalPrice).toFixed(2)
  }
  

  checkProductInCart(id) {
    return this.itemId.includes(id);
  }

  degreesToRadians(degrees) {
    return degrees * Math.PI / 180;
  }

  distanceInKmBetweenEarthCoordinates(lat1, lon1, lat2, lon2) {
    console.log(lat1, lon1, lat2, lon2);
    const earthRadiusKm = 6371;

    const dLat = this.degreesToRadians(lat2 - lat1);
    const dLon = this.degreesToRadians(lon2 - lon1);

    lat1 = this.degreesToRadians(lat1);
    lat2 = this.degreesToRadians(lat2);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return earthRadiusKm * c;
  }
  // addAddOn(id,  parent, quantity){
  //   console.log("parent id is", parent, id);
  //   console.log(this.cart);
  //   this.cart.forEach(element => {
  //     if (element.id == parent) {

  //       element.variations[0].items.forEach(addOnElement => {
  //         if(addOnElement.id == id){
  //           addOnElement.quantity = quantity;
  //         }
  //       });
  //         console.log('hhhh===>',element)
  //       element.second_variation.forEach(element => {
  //         console.log(element)
  //         element.sub_category.forEach(elim => {
  //           if(elim.id == id){
  //             elim.quantity = quantity;
  //           }
  //         })
    
  //       });
  //     }
  //   });
  //   this.calcuate();
  // }


  // addSubAddOn(id,  parent, quantity,index,type){
  //   this.cart.forEach(element => {
  //     if (element.id == parent) {
  //         element.second_variation.forEach(element => {
  //           element.sub_category.forEach(elim => {
  //             if(elim.id == id){
  //               elim.quantity = quantity;
  //             }else{
  //               if(elim.type == 'radio' &&  elim.type == type) {
  //                 elim.quantity = 0;
  //               }
  //             }
  //           })
  //         });
  //     }
  //   });


  //   this.calcuate();
  // }


  addSubAddOn(id,  parent, quantity,index,type){
    let totalItem = this.cart.length || 0;
    totalItem = totalItem-1;

    if(totalItem<0) totalItem = 0;
    this.cart.forEach((element,i) => {      
      if (element.id == parent) {
          element.second_variation.forEach(elementVariant => {
            elementVariant.sub_category.forEach(elim => {
              // console.log('sas',elim)
              if(elim.id == id){
                elim.quantity = quantity;
              }else{
                if(elim.type == 'radio' &&  elim.type == type) {
                  elim.quantity = 0;
                }
              }
            })
          });
      }
      if(totalItem>=i){
        console.log('OVER::CART->SERVICE->addSubAddOn->element',this.cart);
        this.calcuate();
      }
      console.log(totalItem,'::CART->SERVICE->addSubAddOn->element',element,'id',id,'III',i);
    });
    if(totalItem==0) this.calcuate();
    
  }



  getStoreInfo(id){
    const parms = {
      id:id
    }
    this.api.post('stores/getByUid',parms).subscribe((data: any) => {
      if(data.status == 200){
          this.crrStoreToCart = data.data[0]
          // this.storeDeliverLength =  parseInt(this.AdminInfo.delivery_range)
      }
    })
  }

}
