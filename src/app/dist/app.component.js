"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppComponent = void 0;
/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : ionic 5 groceryee app
  Created : 10-Sep-2020
  This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2020-present initappz.
*/
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var operators_1 = require("rxjs/operators");
var angular2_toaster_1 = require("angular2-toaster");
var AppComponent = /** @class */ (function () {
    function AppComponent(router, api, util, cart, chmod, titleService) {
        var _this = this;
        this.router = router;
        this.api = api;
        this.util = util;
        this.cart = cart;
        this.chmod = chmod;
        this.titleService = titleService;
        this.title = 'Flyvip';
        this.deviceType = 'desktop';
        this.verticalNavType = 'expanded';
        this.verticalEffect = 'shrink';
        this.topPosToStartShowing = 100;
        this.childrenId = [];
        this.config = new angular2_toaster_1.ToasterConfig({
            showCloseButton: true,
            tapToDismiss: true,
            timeout: 2000,
            positionClass: 'toast-bottom-right'
        });
        this.loading = true;
        var scrollHeight = window.screen.height - 150;
        this.innerHeight = scrollHeight + 'px';
        this.windowWidth = window.innerWidth;
        this.setMenuAttributs(this.windowWidth);
        this.util.subscribeCartBtn().subscribe(function (data) {
            _this.cartModel.show();
        });
        this.router.events.pipe(operators_1.filter(function (event) { return event instanceof router_1.NavigationEnd; })).subscribe(function (event) {
            window.scrollTo(0, 0);
        });
        this.router.events.subscribe(function (e) {
            _this.navigationInterceptor(e);
        });
        this.loaded = false;
        var uid = localStorage.getItem('uid');
        if ((uid == "") || (uid === null)) {
            this.util.isLoggedIn = false;
            console.log("not logged");
        }
        else {
            this.util.isLoggedIn = true;
            console.log("logged");
        }
        console.log("is logged in", this.util.isLoggedIn);
        this.initializeApp();
        // this.getPayments();
    }
    AppComponent.prototype.checkScroll = function () {
        var scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        if (scrollPosition >= this.topPosToStartShowing) {
            this.isShow = true;
        }
        else {
            this.isShow = false;
        }
    };
    AppComponent.prototype.ngDoCheck = function () {
        this.subItems();
    };
    AppComponent.prototype.navigationInterceptor = function (event) {
        if (event instanceof router_1.NavigationStart) {
            this.loading = true;
            this.loaded = false;
        }
        if (event instanceof router_1.NavigationEnd) {
            this.loading = false;
            this.loaded = true;
            window.scrollTo(0, 0);
            var data = this.getTitle(this.router.routerState, this.router.routerState.root);
            this.titleService.setTitle(data && data[0] ? this.util.getString(data[0]) + ' | Flyvip' :
                this.util.getString('Home') + ' | Flyvip');
        }
        // Set loading state to false in both of the below events to hide the spinner in case a request fails
        if (event instanceof router_1.NavigationCancel) {
            this.loading = false;
            this.loaded = true;
        }
        if (event instanceof router_1.NavigationError) {
            this.loading = false;
            this.loaded = true;
        }
    };
    AppComponent.prototype.subItems = function () {
        this.subCart = [];
        var parent_id;
        for (var i = 0; i < this.cart.cart.length; i++) {
            if (this.cart.cart[i].parent_id != "0" || this.cart.cart[i].parent_id != 0) {
                if (typeof this.cart.cart[i].parent_id !== undefined) {
                    parent_id = this.cart.cart[i].parent_id.split(',');
                }
                else {
                    parent_id = 0;
                }
                for (var j = 0; j < parent_id.length; j++) {
                    if (parent_id[j] != 0 || parent_id[j] != "0") {
                        console.log("parent_id", parent_id[j], this.cart.cart[i].id);
                        var temp = JSON.parse(JSON.stringify(this.cart.cart[i]));
                        console.log("before", temp.parent_id, this.cart.cart[i].id);
                        temp.parent_id = parent_id[j];
                        console.log("after", temp.parent_id, this.cart.cart[i].id);
                        this.subCart.push(temp);
                        console.log(this.subCart);
                    }
                }
            }
        }
    };
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
    AppComponent.prototype.getTitle = function (state, parent) {
        var data = [];
        if (parent && parent.snapshot.data && parent.snapshot.data.title) {
            data.push(parent.snapshot.data.title);
        }
        if (state && parent) {
            data.push.apply(data, this.getTitle(state, state.firstChild(parent)));
        }
        return data;
    };
    AppComponent.prototype.initializeApp = function () {
        var _this = this;
        this.api.get('cities').subscribe(function (data) {
            console.log(data);
            if (data && data.status === 200 && data.data && data.data.length) {
                var cities = data.data.filter(function (x) { return x.status === '1'; });
                var id = localStorage.getItem('city');
                if (id && id !== null && id !== 'null') {
                }
                else {
                    localStorage.setItem('city', cities[0].id);
                    _this.util.publishCity('push');
                }
                _this.chmod.detectChanges();
                var lng = localStorage.getItem('language');
                console.log("language is", lng);
                if (!lng || lng === null) {
                    _this.api.get('users/getDefaultSettings').subscribe(function (data) {
                        console.log('----------------- app setting', data);
                        if (data && data.status === 200 && data.data) {
                            var manage = data.data.manage;
                            var language = data.data.lang;
                            var popup = data.data.popup;
                            if (manage && manage.length > 0) {
                                if (manage[0].app_close === 0 || manage[0].app_close === '0') {
                                    _this.util.appClosed = true;
                                    _this.util.appClosedMessage = manage[0].message;
                                }
                                else {
                                    _this.util.appClosed = false;
                                }
                            }
                            else {
                                _this.util.appClosed = false;
                            }
                            if (language) {
                                _this.util.translations = language;
                                localStorage.setItem('language', data.data.file);
                                localStorage.setItem('language_id', data.data.langid);
                                console.log("translations", _this.util.translations);
                                // localStorage.setItem('language_id', )
                            }
                            if (popup && popup.length > 0) {
                                if (popup[0].shown === 1 || popup[0].shown === '1') {
                                    _this.util.havepopup = true;
                                    _this.util.popupMessage = popup[0].message;
                                    _this.util.publishPopup();
                                }
                                else {
                                    _this.util.havepopup = false;
                                }
                            }
                            else {
                                _this.util.havepopup = false;
                            }
                            if (language) {
                                _this.util.translations = language;
                                localStorage.setItem('language', data.data.file);
                                var trl = _this.getTitle(_this.router.routerState, _this.router.routerState.root);
                                _this.titleService.setTitle(trl && trl[0] ? _this.util.getString(trl[0]) + ' | Flyvip' :
                                    _this.util.getString('Home') + ' | Flyvip');
                            }
                            if (data.data.lang_position) {
                                if (data.data.lang_position == "0") {
                                    _this.util.direction = "rtl";
                                    _this.util.cside = "left";
                                }
                                else {
                                    _this.util.direction = "ltr";
                                    _this.util.cside = "right";
                                }
                            }
                            var settings = data.data.settings;
                            console.log("info", settings);
                            if (settings && settings.length > 0) {
                                var info = settings[0];
                                // this.util.direction = info.appDirection;
                                // this.util.cside = info.currencySide;
                                // console.log("utilside", this.util.cside);
                                // if(this.util.cside == "right"){
                                //   this.direction = "rtl";
                                // }else{
                                //   this.direction = "ltr";
                                // }
                                _this.util.currecny = info.currencySymbol;
                                _this.util.logo = info.logo;
                                _this.util.twillo = info.twillo;
                                _this.util.delivery = info.delivery;
                                document.documentElement.dir = _this.util.direction;
                            }
                            else {
                                _this.util.direction = 'ltr';
                                _this.util.cside = 'right';
                                console.log("utilside", _this.util.cside);
                                if (_this.util.cside == "right") {
                                    _this.direction = "rtl";
                                }
                                else {
                                    _this.direction = "ltr";
                                }
                                _this.util.currecny = '$';
                                document.documentElement.dir = _this.util.direction;
                            }
                            var general = data.data.general;
                            console.log('generalllll============================>', general);
                            if (general && general.length > 0) {
                                var info = general[0];
                                _this.util.general = info;
                                _this.cart.minOrderPrice = parseFloat(info.min);
                                _this.cart.shipping = info.shipping;
                                _this.cart.shippingPrice = parseFloat(info.shippingPrice);
                                _this.cart.orderTax = parseFloat(info.tax);
                                _this.cart.freeShipping = parseFloat(info.free);
                            }
                            _this.getCart();
                        }
                        else {
                            _this.getCart();
                        }
                    }, function (error) {
                        _this.loaded = true;
                        console.log('default settings', error);
                    });
                }
                else {
                    var param = {
                        id: localStorage.getItem('language_id')
                    };
                    _this.api.post('users/getDefaultSettingsById', param).subscribe(function (data) {
                        console.log('----------------- app setting', data);
                        if (data && data.status === 200 && data.data) {
                            var manage = data.data.manage;
                            var language = data.data.lang;
                            var popup = data.data.popup;
                            if (manage && manage.length > 0) {
                                if (manage[0].app_close === 0 || manage[0].app_close === '0') {
                                    _this.util.appClosed = true;
                                    _this.util.appClosedMessage = manage[0].message;
                                }
                                else {
                                    _this.util.appClosed = false;
                                }
                            }
                            else {
                                _this.util.appClosed = false;
                            }
                            console.log('*******************popup', popup);
                            if (popup && popup.length > 0) {
                                if (popup[0].shown === 1 || popup[0].shown === '1') {
                                    _this.util.havepopup = true;
                                    _this.util.popupMessage = popup[0].message;
                                    console.log('publish poppupppupppp');
                                    _this.util.publishPopup();
                                }
                                else {
                                    _this.util.havepopup = false;
                                }
                            }
                            else {
                                _this.util.havepopup = false;
                            }
                            if (language) {
                                _this.util.translations = language;
                                var trl = _this.getTitle(_this.router.routerState, _this.router.routerState.root);
                                _this.titleService.setTitle(trl && trl[0] ? _this.util.getString(trl[0]) + ' | Flyvip' :
                                    _this.util.getString('Home') + ' | Flyvip');
                            }
                            var settings = data.data.settings;
                            if (settings && settings.length > 0) {
                                var info = settings[0];
                                _this.util.direction = info.appDirection;
                                _this.util.cside = info.currencySide;
                                console.log("info", info);
                                console.log("utilside", _this.util.cside);
                                // if(this.util.cside == "right"){
                                //   this.direction = "rtl";
                                // }else{
                                //   this.direction = "ltr";
                                // }
                                if (data.data.lang_position == "0") {
                                    _this.util.direction = "rtl";
                                }
                                else {
                                    _this.util.direction = "ltr";
                                }
                                _this.util.currecny = info.currencySymbol;
                                _this.util.logo = info.logo;
                                _this.util.twillo = info.twillo;
                                _this.util.delivery = info.delivery;
                                document.documentElement.dir = _this.util.direction;
                            }
                            else {
                                _this.util.direction = 'ltr';
                                _this.util.cside = 'right';
                                console.log("utilside", _this.util.cside);
                                if (_this.util.cside == "right") {
                                    _this.direction = "rtl";
                                }
                                else {
                                    _this.direction = "ltr";
                                }
                                _this.util.currecny = '$';
                                document.documentElement.dir = _this.util.direction;
                            }
                            var general = data.data.general;
                            console.log('generalllll============================>', general);
                            if (general && general.length > 0) {
                                var info = general[0];
                                _this.util.general = info;
                                _this.cart.minOrderPrice = parseFloat(info.min);
                                _this.cart.shipping = info.shipping;
                                _this.cart.shippingPrice = parseFloat(info.shippingPrice);
                                _this.cart.orderTax = parseFloat(info.tax);
                                _this.cart.freeShipping = parseFloat(info.free);
                            }
                            _this.getCart();
                        }
                        else {
                            _this.getCart();
                        }
                    }, function (error) {
                        console.log('default settings by id', error);
                        _this.util.appClosed = false;
                        _this.util.direction = 'ltr';
                        _this.util.cside = 'right';
                        console.log("utilside", _this.util.cside);
                        if (_this.util.cside == "right") {
                            _this.direction = "rtl";
                        }
                        else {
                            _this.direction = "ltr";
                        }
                        _this.util.currecny = '$';
                        document.documentElement.dir = _this.util.direction;
                        _this.loaded = true;
                    });
                }
            }
            else {
                _this.util.toast('error', _this.util.getString('Error'), 'No cities found');
                _this.loaded = true;
            }
        }, function (error) {
            console.log('error', error);
            _this.loaded = true;
            _this.util.toast('error', _this.util.getString('Error'), _this.util.getString('Something went wrong'));
        });
        var uid = localStorage.getItem('uid');
        if (uid && uid !== null && uid !== 'null') {
            var param = {
                id: uid
            };
            this.api.post('users/getById', param).subscribe(function (data) {
                console.log('user info=>', data);
                if (data && data.status === 200 && data.data && data.data.length) {
                    _this.util.userInfo = data.data[0];
                }
            }, function (error) {
                console.log(error);
            });
        }
    };
    AppComponent.prototype.getCart = function () {
        var _this = this;
        this.loaded = true;
        this.util.getKeys('cart').then(function (data) {
            if (data && data !== null && data !== 'null') {
                var cart = JSON.parse(data);
                console.log('cart===>>', cart);
                _this.cart.cart = cart;
                _this.cart.itemId = [];
                _this.cart.cart.forEach(function (element) {
                    _this.cart.itemId.push(element.id);
                });
                console.log('cartitemss ----><>>>>', _this.cart.cart);
                console.log('subitem=====>>>', _this.cart.itemId);
                _this.cart.calcuate();
            }
        });
    };
    AppComponent.prototype.addAddOn = function (item, parent) {
        var _this = this;
        // this.parentId = id;
        // const param = {
        //   id: this.parentId
        // };
        console.log("item", item, parent);
        var id = item.id;
        parent.variations[0].items.forEach(function (element) {
            if (element.id == id) {
                console.log("element id", element.id, id);
                element.quantity = element.quantity + 1;
                console.log(parent.variations[0].items);
                _this.cart.addAddOn(id, parent, element.quantity);
            }
        });
    };
    AppComponent.prototype.minusAddOn = function (item, parent) {
        var _this = this;
        // this.parentId = id;
        // const param = {
        //   id: this.parentId
        // };
        console.log("item", item, parent);
        var id = item.id;
        parent.variations[0].items.forEach(function (element) {
            if (element.id == id) {
                console.log("element id", element.id, id);
                element.quantity = element.quantity - 1;
                console.log(parent.variations[0].items);
                _this.cart.addAddOn(id, parent, element.quantity);
            }
        });
    };
    AppComponent.prototype.onResize = function (event) {
        this.innerHeight = event.target.innerHeight + 'px';
        /* menu responsive */
        this.windowWidth = event.target.innerWidth;
        var reSizeFlag = true;
        if (this.deviceType === 'tablet' && this.windowWidth >= 768 && this.windowWidth <= 1024) {
            reSizeFlag = false;
        }
        else if (this.deviceType === 'mobile' && this.windowWidth < 768) {
            reSizeFlag = false;
        }
        this.util.deviceType = this.deviceType;
        if (reSizeFlag) {
            this.setMenuAttributs(this.windowWidth);
        }
    };
    AppComponent.prototype.setMenuAttributs = function (windowWidth) {
        if (windowWidth >= 768 && windowWidth <= 1024) {
            this.deviceType = 'mobile';
            this.verticalNavType = 'offcanvas';
            this.verticalEffect = 'push';
        }
        else if (windowWidth < 768) {
            this.deviceType = 'mobile';
            this.verticalNavType = 'offcanvas';
            this.verticalEffect = 'overlay';
        }
        else {
            this.deviceType = 'desktop';
            this.verticalNavType = 'expanded';
            this.verticalEffect = 'shrink';
        }
        this.util.deviceType = this.deviceType;
    };
    AppComponent.prototype.openLink = function (link) {
        this.router.navigate([link]);
    };
    AppComponent.prototype.add = function (product, index) {
        if (this.cart.cart[index].quantiy > 0) {
            this.cart.cart[index].quantiy = this.cart.cart[index].quantiy + 1;
            this.cart.addQuantity(this.cart.cart[index].quantiy, product.id);
        }
    };
    AppComponent.prototype.remove = function (product, index) {
        if (this.cart.cart[index].quantiy === 1) {
            if (this.cart.cart[index].variations[0]) {
                this.cart.cart[index].variations[0].items.forEach(function (element) {
                    element.quantity = 0;
                });
            }
            this.cart.cart[index].quantiy = 0;
            this.cart.removeItem(product.id);
            // this.removeChild(product.id);
        }
        else {
            this.cart.cart[index].quantiy = this.cart.cart[index].quantiy - 1;
            this.cart.addQuantity(this.cart.cart[index].quantiy, product.id);
        }
    };
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
    AppComponent.prototype.gotoTop = function () {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    };
    AppComponent.prototype.checkout = function () {
        this.cartModel.hide();
        // this.router.navigate(['checkout']).then(() => {
        //   window.location.reload();
        // });
        this.router.navigate(['checkout']);
    };
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
    AppComponent.prototype.getSubQuanity = function (id) {
        var data = this.cart.cart.filter(function (x) { return x.id === id; });
        console.log("getSubQuanity", data);
        var quantity = data[0].quantiy;
        return quantity;
    };
    __decorate([
        core_1.ViewChild('cartModel')
    ], AppComponent.prototype, "cartModel");
    __decorate([
        core_1.HostListener('window:scroll')
    ], AppComponent.prototype, "checkScroll");
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.scss']
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
