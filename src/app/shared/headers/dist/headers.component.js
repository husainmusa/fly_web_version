"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HeadersComponent = void 0;
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
var HeadersComponent = /** @class */ (function () {
    function HeadersComponent(router, util, api, cart) {
        this.router = router;
        this.util = util;
        this.api = api;
        this.cart = cart;
        this.cities = [];
        this.cityName = '';
        this.dummy = Array(5);
        this.terms = '';
        this.products = [];
        this.dummyLang = Array(5);
        this.langs = [];
        this.getCities();
        this.getLangs();
        var lng = localStorage.getItem('language');
        if (lng && lng != null && lng !== 'null') {
            this.lngId = lng;
        }
    }
    HeadersComponent.prototype.ngOnInit = function () {
    };
    HeadersComponent.prototype.getLangName = function () {
        var lng = localStorage.getItem('language');
        if (lng && lng != null && lng !== 'null') {
            var lngs = this.langs.filter(function (x) { return x.file === lng; });
            return lngs && lngs.length > 0 ? lngs[0].name : 'EN';
        }
        return 'EN';
    };
    HeadersComponent.prototype.getLangFlag = function () {
        var lng = localStorage.getItem('language');
        if (lng && lng != null && lng !== 'null') {
            var lngs = this.langs.filter(function (x) { return x.file === lng; });
            return lngs && lngs.length > 0 ? this.api.mediaURL + lngs[0].cover : 'assets/imgs/en.png';
        }
        return 'assets/imgs/en.png';
    };
    HeadersComponent.prototype.changed = function (value) {
        var _this = this;
        this.lngId = value;
        console.log("this.lngId", this.lngId);
        var item = this.langs.filter(function (x) { return x.file === _this.lngId; });
        console.log("item", item[0].id);
        if (item && item.length > 0) {
            this.util.direction = item[0].positions === '1' ? 'ltr' : 'rtl';
            document.documentElement.dir = this.util.direction;
            localStorage.setItem('language', this.lngId);
            localStorage.setItem('language_id', item[0].id);
            window.location.reload();
        }
    };
    HeadersComponent.prototype.getLangs = function () {
        var _this = this;
        this.api.get('lang').subscribe(function (data) {
            console.log('---------------------------------------------------', data);
            _this.dummyLang = [];
            if (data && data.status === 200 && data.data && data.data.length) {
                _this.langs = data.data.filter(function (x) { return x.status === '1'; });
            }
        }, function (error) {
            console.log('error', error);
            _this.dummyLang = [];
            _this.util.toast('error', _this.util.getString('Error'), _this.util.getString('Something went wrong'));
        });
    };
    HeadersComponent.prototype.getCities = function () {
        var _this = this;
        this.api.get('cities').subscribe(function (data) {
            console.log(data);
            _this.dummy = [];
            if (data && data.status === 200 && data.data && data.data.length) {
                _this.cities = data.data.filter(function (x) { return x.status === '1'; });
                var id = localStorage.getItem('city');
                if (id && id !== null && id !== 'null') {
                    _this.id = id;
                    var city = _this.cities.filter(function (x) { return x.id === _this.id; });
                    if (city && city.length > 0) {
                        _this.util.city = city[0];
                        _this.cityName = city[0].name;
                    }
                }
            }
            else {
                _this.util.toast('error', _this.util.getString('Error'), _this.util.getString('No cities found'));
            }
        }, function (error) {
            console.log('error', error);
            _this.dummy = [];
            _this.util.toast('error', _this.util.getString('Error'), _this.util.getString('Something went wrong'));
        });
    };
    HeadersComponent.prototype.selectedCity = function (item) {
        console.log(item);
        localStorage.setItem('city', item.id);
        window.location.reload();
    };
    HeadersComponent.prototype.goToCart = function () {
        this.router.navigate(['/cart']);
    };
    HeadersComponent.prototype.goToLogin = function () {
        this.router.navigate(['/login']);
    };
    HeadersComponent.prototype.openPage = function (item) {
        var param = {
            queryParams: {
                category: item
            }
        };
        this.router.navigate(['categories'], param);
    };
    HeadersComponent.prototype.handleChange = function (event) {
        console.log(event);
    };
    HeadersComponent.prototype.goToHome = function (val) {
        this.router.navigate(['home']);
    };
    HeadersComponent.prototype.getAccount = function () {
        var uid = localStorage.getItem('uid');
        if (uid && uid != null && uid !== 'null') {
            return true;
        }
        return false;
    };
    HeadersComponent.prototype.logout = function () {
        var city = localStorage.getItem('city');
        var fuid = localStorage.getItem("fuid");
        localStorage.clear();
        this.util.userInfo = null;
        localStorage.setItem("fuid", fuid);
        localStorage.setItem('city', city);
        this.router.navigate(['']);
    };
    HeadersComponent.prototype.help = function () {
        this.router.navigate(['help']);
    };
    HeadersComponent.prototype.faq = function () {
        this.router.navigate(['faq']);
    };
    HeadersComponent.prototype.login = function () {
        console.log('login');
        this.router.navigate(['login']);
    };
    HeadersComponent.prototype.myaccount = function () {
        // this.router.navigate(['account']).then(() => {
        //   window.location.reload();
        // });
        this.router.navigate(['account']);
    };
    HeadersComponent.prototype.myOrders = function () {
        this.router.navigate(['orders']);
    };
    HeadersComponent.prototype.home = function () {
        this.router.navigate(['']);
    };
    HeadersComponent.prototype.selected = function (item) {
        var _this = this;
        console.log('id', this.id);
        this.id = item.id;
        this.clicked = true;
        localStorage.setItem('city', this.id);
        var city = this.cities.filter(function (x) { return x.id === _this.id; });
        this.util.city = city[0];
        this.cityName = city[0].name;
        this.util.publishCity(city);
        this.cart.cart = [];
        this.cart.itemId = [];
        this.cart.totalPrice = 0;
        this.cart.grandTotal = 0;
        this.cart.coupon = null;
        this.cart.discount = null;
        this.util.clearKeys('cart');
        this.util.publishCity('data');
    };
    HeadersComponent.prototype.inputChange = function () {
        console.log(this.terms);
        if (this.terms) {
        }
        else {
            this.products = [];
        }
    };
    HeadersComponent.prototype.openProduct = function (item) {
        var param = {
            queryParams: {
                id: item.id
            }
        };
        this.products = [];
        this.terms = '';
        this.router.navigate(['product-detail'], param);
    };
    HeadersComponent.prototype.search = function (event) {
        var _this = this;
        console.log(event);
        if (event && event !== '') {
            var param = {
                id: localStorage.getItem('city'),
                search: event
            };
            this.util.start();
            this.api.post('products/getSearchItems', param).subscribe(function (data) {
                console.log('search data==>', data);
                _this.util.stop();
                if (data && data.status === 200 && data.data) {
                    _this.products = data.data;
                }
            }, function (error) {
                console.log('error in searhc filess--->>', error);
                _this.util.stop();
                _this.util.toast('error', _this.util.getString('Error'), _this.util.getString('Something went wrong'));
            });
        }
    };
    HeadersComponent.prototype.goChat = function () {
        this.router.navigate(['chats']);
    };
    __decorate([
        core_1.ViewChild('cityModal')
    ], HeadersComponent.prototype, "cityModal");
    HeadersComponent = __decorate([
        core_1.Component({
            selector: 'app-headers',
            templateUrl: './headers.component.html',
            styleUrls: ['./headers.component.scss']
        })
    ], HeadersComponent);
    return HeadersComponent;
}());
exports.HeadersComponent = HeadersComponent;
