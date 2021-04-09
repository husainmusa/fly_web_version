/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : ionic 5 groceryee app
  Created : 10-Sep-2020
  This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2020-present initappz.
*/
import { Component, ViewChild, HostListener, ElementRef, ChangeDetectorRef } from '@angular/core';
import {
  Router,
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router';
import { filter } from 'rxjs/operators';
import { ToasterConfig } from 'angular2-toaster';
import { ApiService } from './services/api.service';
import { UtilService } from './services/util.service';
import { CartService } from './services/cart.service';
import { ModalDirective } from 'angular-bootstrap-md';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('cartModel') public cartModel: ModalDirective;
  title = 'Flyvip';
  direction:string;
  loggedIn:boolean;
  discountValue: any;
  languageDirection:any;
  loaded: boolean;
  deviceType = 'desktop';
  innerHeight: string;
  windowWidth: number;
  subQuantity:any;
  verticalNavType = 'expanded';
  verticalEffect = 'shrink';
  isShow: boolean;
  topPosToStartShowing = 100;
  subCart:any;
  childrenId:any = [];
  public config: ToasterConfig =
    new ToasterConfig({
      showCloseButton: true,
      tapToDismiss: true,
      timeout: 2000,
      positionClass: 'toast-bottom-right'
    });

  @HostListener('window:scroll')
  checkScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (scrollPosition >= this.topPosToStartShowing) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }
  loading = true;

  constructor(
    private router: Router,
    public api: ApiService,
    public util: UtilService,
    public cart: CartService,
    private chmod: ChangeDetectorRef,
    private titleService: Title
  ) {
    const scrollHeight = window.screen.height - 150;
    this.innerHeight = scrollHeight + 'px';
    this.windowWidth = window.innerWidth;
    this.setMenuAttributs(this.windowWidth);
    this.util.subscribeCartBtn().subscribe((data) => {
      console.log('data======subscribeCartBtn===============>',data)
      this.cartModel.show();
      this.getCart();
    });
    // this.util.subscribeCartBtn().subscribe((data) => {
    //   console.log('data======subscribeCartBtn===============>',data)
    //   this.cartModel.show();
    //   this.getCart();
    // });


    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: any) => {
      window.scrollTo(0, 0);
    });
    this.router.events.subscribe((e: RouterEvent) => {
      this.navigationInterceptor(e);
    });
    this.loaded = false;
    const uid = localStorage.getItem('uid');
    if((uid == "") || (uid  === null)){
      this.util.isLoggedIn = false;
      console.log("not logged");
    }else{
      this.util.isLoggedIn = true;
      console.log("logged");
    }
    console.log("is logged in", this.util.isLoggedIn);
    this.initializeApp();
    // this.getPayments();
  }


  ngDoCheck(){
   this.subItems();
  }
  closeCartModel(){
    this.cartModel.hide()
    this.util.CloseModel('true');
  
  }

  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.loading = true;
      this.loaded = false;
    }
    if (event instanceof NavigationEnd) {
      this.loading = false;
      this.loaded = true;
      window.scrollTo(0, 0);
      const data = this.getTitle(this.router.routerState, this.router.routerState.root);
      this.titleService.setTitle(data && data[0] ? this.util.getString(data[0]) + ' | Flyvip' :
        this.util.getString('Home') + ' | Flyvip');
    }

    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      this.loading = false;
      this.loaded = true;
    }
    if (event instanceof NavigationError) {
      this.loading = false;
      this.loaded = true;
    }
  }

  subItems(){
    this.subCart = [];
    let parent_id;
    for(let i = 0; i < this.cart.cart.length; i++){
      if(this.cart.cart[i].parent_id != "0" || this.cart.cart[i].parent_id != 0 ){
        if(typeof this.cart.cart[i].parent_id !== undefined){
          parent_id = this.cart.cart[i].parent_id.split(',');
        }else{
          parent_id = 0;
        }
        for(let j = 0; j < parent_id.length; j++ ){
          if(parent_id[j] != 0 || parent_id[j] != "0"){
            console.log("parent_id", parent_id[j], this.cart.cart[i].id);
            let temp = JSON.parse(JSON.stringify(this.cart.cart[i]));
            console.log("before",  temp.parent_id, this.cart.cart[i].id);
            temp.parent_id = parent_id[j];
            console.log("after",  temp.parent_id, this.cart.cart[i].id);
            this.subCart.push(temp);
            console.log(this.subCart);
          }
        }
      }
    }
  }

  // removeChild(parentId){
  //   console.log(this.cart.cart.length, "cartlength");
  //   const cart = this.cart.cart;
  //   const cartlength = cart.length;
  //   let parent_id;
  //   for(let i = 0; i < cartlength; i++){  
  //     console.log(this.cart.cart.length, "cartlength inside" , i);
  //     console.log("this cart", this.cart.cart[i]);
  //     if(typeof this.cart.cart[i].parent_id !== undefined){
  //       parent_id = cart[i].parent_id.split(',');
  //     }else{
  //       parent_id = 0;
  //     }
  //     console.log("parentid",parent_id, "id", this.cart.cart[i].id );
  //     for(let j = 0; j < parent_id.length; j++ ){
  //       if(parent_id[j] == parentId){
  //         this.childrenId.push(cart[i].id);
  //       }
  //     }
  //   }
  //   this.cart.removeChild(this.childrenId);
  // }
  
  getTitle(state, parent) {
    const data = [];
    if (parent && parent.snapshot.data && parent.snapshot.data.title) {
      data.push(parent.snapshot.data.title);
    }

    if (state && parent) {
      data.push(... this.getTitle(state, state.firstChild(parent)));
    }
    return data;
  }

  initializeApp() {
    this.api.get('cities').subscribe((data: any) => {
      console.log(data);
      if (data && data.status === 200 && data.data && data.data.length) {
        const cities = data.data.filter(x => x.status === '1');
        const id = localStorage.getItem('city');
        if (id && id !== null && id !== 'null') {
        } else {
          localStorage.setItem('city', cities[0].id);
          this.util.publishCity('push');
        }
        this.chmod.detectChanges();
        const lng = localStorage.getItem('language');
        console.log("language is", lng);
        if (!lng || lng === null) {
          this.api.get('users/getDefaultSettings').subscribe((data: any) => {
            console.log('----------------- app setting', data);
            if (data && data.status === 200 && data.data) {
              const manage = data.data.manage;
              const language = data.data.lang;
              const popup = data.data.popup;
              if (manage && manage.length > 0) {
                if (manage[0].app_close === 0 || manage[0].app_close === '0') {
                  this.util.appClosed = true;
                  this.util.appClosedMessage = manage[0].message;
                } else {
                  this.util.appClosed = false;
                }
              } else {
                this.util.appClosed = false;
              }
              if (language) {
                this.util.translations = language;
                localStorage.setItem('language', data.data.file);
                localStorage.setItem('language_id', data.data.langid);
                console.log("translations",this.util.translations );
                // localStorage.setItem('language_id', )
              }
              if (popup && popup.length > 0) {
                if (popup[0].shown === 1 || popup[0].shown === '1') {
                  this.util.havepopup = true;
                  this.util.popupMessage = popup[0].message;
                  this.util.publishPopup();
                } else {
                  this.util.havepopup = false;
                }
              } else {
                this.util.havepopup = false;
              }
              if (language) {
                this.util.translations = language;
                localStorage.setItem('language', data.data.file);
                const trl = this.getTitle(this.router.routerState, this.router.routerState.root);
                this.titleService.setTitle(trl && trl[0] ? this.util.getString(trl[0]) + ' | Flyvip' :
                  this.util.getString('Home') + ' | Flyvip');
              }
              if(data.data.lang_position){
                if(data.data.lang_position == "0"){
                  this.util.direction = "rtl";
                  this.util.cside = "left"
                }else{
                  this.util.direction = "ltr";
                  this.util.cside = "right"
                }
              }
              const settings = data.data.settings;
              console.log("info", settings);
              if (settings && settings.length > 0) {
                const info = settings[0];
                // this.util.direction = info.appDirection;
                // this.util.cside = info.currencySide;
                // console.log("utilside", this.util.cside);
                // if(this.util.cside == "right"){
                //   this.direction = "rtl";
                // }else{
                //   this.direction = "ltr";
                // }
                this.util.currecny = info.currencySymbol;
                this.util.logo = info.logo;
                this.util.twillo = info.twillo;
                this.util.delivery = info.delivery;

                document.documentElement.dir = this.util.direction;
              } else {
                this.util.direction = 'ltr';
                this.util.cside = 'right';
                console.log("utilside", this.util.cside);
                if(this.util.cside == "right"){
                  this.direction = "rtl";
                }else{
                  this.direction = "ltr";
                }
                this.util.currecny = '$';
                document.documentElement.dir = this.util.direction;
              }
              const general = data.data.general;
              console.log('generalllll============================>', general);
              if (general && general.length > 0) {
                const info = general[0];
                this.util.general = info;
                this.cart.minOrderPrice = parseFloat(info.min);
                this.cart.shipping = info.shipping;
                this.cart.shippingPrice = parseFloat(info.shippingPrice);
                this.cart.orderTax = parseFloat(info.tax);
                this.cart.freeShipping = parseFloat(info.free);
              }
              this.getCart();
            } else {
              this.getCart();
            }

          }, error => {
            this.loaded = true;
            console.log('default settings', error);
          });
        } else {
          const param = {
            id: localStorage.getItem('language_id')
          };
          this.api.post('users/getDefaultSettingsById', param).subscribe((data: any) => {
            console.log('----------------- app setting', data);
            if (data && data.status === 200 && data.data) {
              const manage = data.data.manage;
              const language = data.data.lang;
              const popup = data.data.popup;

              if (manage && manage.length > 0) {
                if (manage[0].app_close === 0 || manage[0].app_close === '0') {
                  this.util.appClosed = true;
                  this.util.appClosedMessage = manage[0].message;
                } else {
                  this.util.appClosed = false;
                }
              } else {
                this.util.appClosed = false;
              }
              console.log('*******************popup', popup);
              if (popup && popup.length > 0) {
                if (popup[0].shown === 1 || popup[0].shown === '1') {
                  this.util.havepopup = true;
                  this.util.popupMessage = popup[0].message;
                  console.log('publish poppupppupppp');
                  this.util.publishPopup();
                } else {
                  this.util.havepopup = false;
                }
              } else {
                this.util.havepopup = false;
              }
              if (language) {
                this.util.translations = language;
                const trl = this.getTitle(this.router.routerState, this.router.routerState.root);
                this.titleService.setTitle(trl && trl[0] ? this.util.getString(trl[0]) + ' | Flyvip' :
                  this.util.getString('Home') + ' | Flyvip');
              }
              const settings = data.data.settings;
              if (settings && settings.length > 0) {
                const info = settings[0];
                this.util.direction = info.appDirection;
                this.util.cside = info.currencySide;
                console.log("info", info);
                console.log("utilside", this.util.cside);
                // if(this.util.cside == "right"){
                //   this.direction = "rtl";
                // }else{
                //   this.direction = "ltr";
                // }
                if(data.data.lang_position == "0"){
                  this.util.direction = "rtl";
                }else{
                  this.util.direction = "ltr";
                }
                this.util.currecny = info.currencySymbol;
                this.util.logo = info.logo;
                this.util.twillo = info.twillo;
                this.util.delivery = info.delivery;
                document.documentElement.dir = this.util.direction;

              } else {
                this.util.direction = 'ltr';
                this.util.cside = 'right';
                console.log("utilside", this.util.cside);
                if(this.util.cside == "right"){
                  this.direction = "rtl";
                }else{
                  this.direction = "ltr";
                }
                this.util.currecny = '$';
                document.documentElement.dir = this.util.direction;
              }
              const general = data.data.general;
              console.log('generalllll============================>', general)
              if (general && general.length > 0) {
                const info = general[0];
                this.util.general = info;
                this.cart.minOrderPrice = parseFloat(info.min);
                this.cart.shipping = info.shipping;
                this.cart.shippingPrice = parseFloat(info.shippingPrice);
                this.cart.orderTax = parseFloat(info.tax);
                this.cart.freeShipping = parseFloat(info.free);
              }
              this.getCart();
            } else {
              this.getCart();
            }

          }, error => {
            console.log('default settings by id', error);
            this.util.appClosed = false;
            this.util.direction = 'ltr';
            this.util.cside = 'right';
            console.log("utilside", this.util.cside);
            if(this.util.cside == "right"){
              this.direction = "rtl";
            }else{
              this.direction = "ltr";
            }
            this.util.currecny = '$';
            document.documentElement.dir = this.util.direction;
            this.loaded = true;
          });
        }
      } else {
        this.util.toast('error', this.util.getString('Error'), 'No cities found');
        this.loaded = true;
      }
    }, error => {
      console.log('error', error);
      this.loaded = true;
      this.util.toast('error', this.util.getString('Error'), this.util.getString('Something went wrong'));
    });


    const uid = localStorage.getItem('uid');
    if (uid && uid !== null && uid !== 'null') {
      const param = {
        id: uid
      };
      this.api.post('users/getById', param).subscribe((data: any) => {
        console.log('user info=>', data);
        if (data && data.status === 200 && data.data && data.data.length) {
          this.util.userInfo = data.data[0];
        }
      }, error => {
        console.log(error);
      });
    }
  }

  getCart() {
    this.loaded = true;
    this.util.getKeys('cart').then((data) => {
      if (data && data !== null && data !== 'null') {
        const cart = JSON.parse(data);
        console.log('cart===>>', cart);
        this.cart.cart = cart;
        this.cart.itemId = [];
        this.cart.cart.forEach(element => {
          this.cart.itemId.push(element.id);
        });
        console.log('cartitemss ----><>>>>', this.cart.cart);
        console.log('subitem=====>>>', this.cart.itemId);
        this.cart.calcuate();
      }
    });

  }


  // addAddOn(item, parent) {

  //   console.log("item", item, parent);
  //   let id = item.id;
  //   parent.variations[0].items.forEach(element => {
  //     if(element.id == id){
  //       console.log("element id", element.id, id);
  //       element.quantity = element.quantity + 1;
  //       console.log(parent.variations[0].items);
  //       this.cart.addAddOn(id, parent, element.quantity);
  //     }
  //   });
  // }

  minusAddOn(item, parent) {
    // this.parentId = id;
    // const param = {
    //   id: this.parentId
    // };
    console.log("item", item, parent);
    let id = item.id;
    parent.variations[0].items.forEach(element => {
      if(element.id == id){
        console.log("element id", element.id, id);
        element.quantity = element.quantity - 1;
        console.log(parent.variations[0].items);
        this.cart.addAddOn(id, parent, element.quantity);
      }
    });
  }

  onResize(event) {
    this.innerHeight = event.target.innerHeight + 'px';
    /* menu responsive */
    this.windowWidth = event.target.innerWidth;
    let reSizeFlag = true;
    if (this.deviceType === 'tablet' && this.windowWidth >= 768 && this.windowWidth <= 1024) {
      reSizeFlag = false;
    } else if (this.deviceType === 'mobile' && this.windowWidth < 768) {
      reSizeFlag = false;
    }
    this.util.deviceType = this.deviceType;
    if (reSizeFlag) {
      this.setMenuAttributs(this.windowWidth);
    }
  }

  setMenuAttributs(windowWidth) {
    if (windowWidth >= 768 && windowWidth <= 1024) {
      this.deviceType = 'mobile';
      this.verticalNavType = 'offcanvas';
      this.verticalEffect = 'push';
    } else if (windowWidth < 768) {
      this.deviceType = 'mobile';
      this.verticalNavType = 'offcanvas';
      this.verticalEffect = 'overlay';
    } else {
      this.deviceType = 'desktop';
      this.verticalNavType = 'expanded';
      this.verticalEffect = 'shrink';
    }
    this.util.deviceType = this.deviceType;
  }

  openLink(link) {
    this.router.navigate([link]);
  }

  add(product, index) {
    if (this.cart.cart[index].quantiy > 0) {
      this.cart.cart[index].quantiy = this.cart.cart[index].quantiy + 1;
      this.cart.addQuantity(this.cart.cart[index].quantiy, product.id);
    }
  }

  remove(product, index) {
    if (this.cart.cart[index].quantiy === 1) {
      if(this.cart.cart[index].variations[0]){
        this.cart.cart[index].variations[0].items.forEach(element => {
          element.quantity = 0;
        });
      }
      this.cart.cart[index].quantiy = 0;
      this.cart.removeItem(product.id);
      // this.removeChild(product.id);
    } else {
      this.cart.cart[index].quantiy = this.cart.cart[index].quantiy - 1;
      this.cart.addQuantity(this.cart.cart[index].quantiy, product.id);
    }
  }

  // subAdd(id){
  //   this.subQuantity = this.getSubQuanity(id);
  //   this.subQuantity = this.subQuantity + 1;
  //   this.cart.subAddQuantity(this.subQuantity, id);
  // }

  // subRemove(id) {
  //   this.subQuantity = this.getSubQuanity(id);
  //   if (this.subQuantity === 1) {
  //     this.subQuantity = 0;
  //     this.cart.removeItem(id);
  //     this.subItems();
  //   } else {
  //     this.subQuantity = this.subQuantity - 1;
  //     this.cart.subAddQuantity(this.subQuantity, id);
  //   }
  // }



  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }



  checkout() {
    this.cartModel.hide();
    // this.router.navigate(['checkout']).then(() => {
    //   window.location.reload();
    // });
   


    console.log('======goToPayment:=========>',this.cart);
    if(this.cart.crrStoreToCart.isClosed === '1' ){
      this.util.toast('error', this.util.getString('Error'), this.util.getString("Store is closed. you can't order this time!"));
    }else{
      if (this.cart.totalPrice < this.cart.minOrderPrice) {
        let text;
        if (this.util.cside === 'left') {
          text = this.util.currecny + ' ' + this.cart.minOrderPrice;
        } else {
          text = this.cart.minOrderPrice + ' ' + this.util.currecny;
        }
        this.util.toast('error', this.util.getString('Error'), this.util.getString('Minimum order amount must be') + text + this.util.getString('or more'));

        return false;
      }
  
      this.util.isPaymentInit = true;
  
      this.router.navigate(['checkout']);
    }
  }

  // checkChild(id){
  //   this.subCart = [];
  //   let cartItems = this.cart.cart;
  //   for(let i = 0; i< cartItems.length; i++){
  //     if(cartItems[i].parent_id != 0 || cartItems[i].parent_id != '0'){
  //       let parentidArray = [];
  //       parentidArray = cartItems[i].parent_id.split(',');
  //       for(let j = 0; j < parentidArray.length; j++){
  //         if(parentidArray[j] != '0' && parentidArray[j] == id){
  //           this.subCart.push(cartItems[i]);
  //           this.cart.calcuate();
  //         }
  //       }
  //     }
  //   }
  //   if(this.subCart != ""){
  //     return this.subCart;
  //   }else{
  //     return "";
  //   }
  // }

  getSubQuanity(id) {
    const data = this.cart.cart.filter(x => x.id === id);
    console.log("getSubQuanity", data);
    let quantity = data[0].quantiy;
    return quantity;
  }


  addAddOn(item, parent) {
    let id = item.id;
    parent.variations[0].items.forEach(element => {
      if(element.id == id){
        console.log("element id", element.id, id);
        element.quantity = element.quantity + 1;
        this.cart.addAddOn(id, parent, element.quantity);
      }else{
        element.quantity = 0;
        this.cart.addAddOn(id, parent, element.quantity);
      }
    });
  }



  addSubAddOn(item, parent ,type,event,index) {
    let id = item.id;
    if(type == 'radio'){
      let id = item.id;
      this.cart.addSubAddOn(id, parent,1, index ,type);
      
    }
    if(type == 'checkbox'){
      if(event.target.checked ){
        let id = item.id;
        this.cart.addSubAddOn(id, parent,1, index,type);
      }else{
        let id = item.id;
        this.cart.addSubAddOn(id, parent,0, index,type);
      }
    }
  
  }
  

  toggle(data, value){
    data['isOpen']=value
}

/** default **/

removeAllAdones(parent){
  parent.variations[0].items.forEach(element => {
      element.quantity = 0;
      this.cart.addAddOn('none', parent.id, element.quantity);
    
  });
}


addRemoveSubAddonQty(item, parent ,type,event,index,opration) {
  let id = item.id;
  if(opration === 'add'){
    let quentity = item.quantity + 1;
    this.cart.addSubAddOn(id, parent,quentity, index,type);
  }else{
    let quentity = item.quantity - 1;
    this.cart.addSubAddOn(id, parent,quentity, index,type);
  }

}
}
