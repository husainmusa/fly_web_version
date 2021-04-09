"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.HomeComponent = void 0;
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
var moment = require("moment");
var lodash_1 = require("lodash");
var HomeComponent = /** @class */ (function () {
    function HomeComponent(router, api, util, cart, chMod) {
        var _this = this;
        this.router = router;
        this.api = api;
        this.util = util;
        this.cart = cart;
        this.chMod = chMod;
        this.dummyCates = Array(30);
        this.categories = [];
        this.config = {
            a11y: true,
            direction: 'horizontal',
            slidesPerView: 9,
            slideToClickedSlide: true,
            mousewheel: true,
            scrollbar: false,
            watchSlidesProgress: true,
            navigation: true,
            keyboard: true,
            pagination: false,
            centeredSlides: true,
            loop: true,
            roundLengths: true,
            // slidesOffsetBefore: 100,
            // slidesOffsetAfter: 100,
            spaceBetween: 300
        };
        this.dummyBanners = [];
        this.banners = [];
        this.bottomDummy = [];
        this.bottomBanners = [];
        this.betweenDummy = [];
        this.betweenBanners = [];
        this.dummyTopProducts = [];
        this.topProducts = [];
        this.products = [];
        this.dummyProducts = [];
        this.dummyStores = [];
        this.stores = [];
        this.storeCopy = [];
        this.dummyOffers = [];
        this.offers = [];
        this.bottomcategory = [];
        this.dummyBottomCates = Array(2);
        setTimeout(function () {
            var acceptedCookies = localStorage.getItem('acceptedCookies');
            if (acceptedCookies && acceptedCookies != null && acceptedCookies !== 'null') {
            }
            else {
                _this.basicModal.show();
            }
        }, 1000);
        this.dummyCates = Array(30);
        this.dummyBanners = Array(30);
        this.bottomDummy = Array(30);
        this.betweenDummy = Array(30);
        this.dummyTopProducts = Array(30);
        this.dummyOffers = Array(30);
        this.offers = [];
        this.categories = [];
        this.banners = [];
        this.bottomBanners = [];
        this.betweenBanners = [];
        this.topProducts = [];
        this.products = [];
        this.bottomcategory = [];
        this.dummyBottomCates = Array(2);
        var city = localStorage.getItem('city');
        console.log('city', localStorage.getItem('city'));
        if (city && city != null && city !== 'null') {
            this.haveCity = true;
            this.getInit();
        }
        else {
            console.log('no city found...');
        }
        this.util.subscribeCity().subscribe(function (data) {
            _this.dummyCates = Array(30);
            _this.dummyBanners = Array(30);
            _this.bottomDummy = Array(30);
            _this.betweenDummy = Array(30);
            _this.dummyTopProducts = Array(30);
            _this.dummyOffers = Array(30);
            _this.offers = [];
            _this.categories = [];
            _this.banners = [];
            _this.bottomBanners = [];
            _this.betweenBanners = [];
            _this.topProducts = [];
            _this.products = [];
            _this.bottomcategory = [];
            _this.dummyBottomCates = Array(2);
            _this.getInit();
        });
    }
    HomeComponent.prototype.acceptcookies = function () {
        localStorage.setItem('acceptedCookies', 'true');
        this.basicModal.hide();
    };
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.util.getPopup().subscribe(function () {
            console.log('------------------- open popp');
            setTimeout(function () {
                _this.frameTop.show();
            }, 1000);
        });
    };
    HomeComponent.prototype.getInit = function () {
        var _this = this;
        this.dummyCates = Array(30);
        this.dummyBanners = Array(30);
        this.bottomDummy = Array(30);
        this.betweenDummy = Array(30);
        this.dummyTopProducts = Array(30);
        this.categories = [];
        this.banners = [];
        this.bottomBanners = [];
        this.betweenBanners = [];
        this.topProducts = [];
        this.products = [];
        var param = {
            id: localStorage.getItem('city')
        };
        this.api.post('stores/getByCity', param).subscribe(function (stores) {
            console.log('stores by city', stores);
            _this.stores = [];
            _this.storeCopy = [];
            if (stores && stores.status === 200 && stores.data && stores.data.length) {
                console.log('city found');
                _this.stores = stores.data;
                _this.stores.forEach(function (val) { return _this.storeCopy.push(Object.assign({}, val)); });
                _this.storeCopy = _this.storeCopy.sort(function (b, a) { return a.id - b.id; });
                console.log("stores", stores);
                _this.stores.forEach(function (element) { return __awaiter(_this, void 0, void 0, function () {
                    var _a, _b;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                _a = element;
                                _b = 'isOpen';
                                return [4 /*yield*/, this.isOpen(element.open_time, element.close_time)];
                            case 1:
                                _a[_b] = _c.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                console.log('store====>>>', _this.stores);
                _this.haveStores = true;
                _this.getCategorys();
                _this.getBanners();
                _this.dummyTopProducts = Array(30);
                _this.api.post('products/getTopRated', param).subscribe(function (data) {
                    _this.topProducts = [];
                    console.log('top products', data);
                    _this.dummyTopProducts = [];
                    if (data && data.status === 200 && data.data && data.data.length) {
                        data.data.forEach(function (element) {
                            if (element.variations && element.size === '1' && element.variations !== '') {
                                if ((function (x) { try {
                                    JSON.parse(x);
                                    return true;
                                }
                                catch (e) {
                                    return false;
                                } })(element.status)) {
                                    element.variations = JSON.parse(element.variations);
                                    element['variant'] = 0;
                                }
                                else {
                                    element.variations = [];
                                    element['variant'] = 1;
                                }
                            }
                            else {
                                element.variations = [];
                                element['variant'] = 1;
                            }
                            if (element.variations[0]) {
                                if (element.variations[0]) {
                                    element.variations[0].items.forEach(function (addOnElement) {
                                        addOnElement['quantity'] = 0;
                                        addOnElement.id = element.id + '_' + addOnElement.title;
                                    });
                                }
                            }
                            if (_this.cart.itemId.includes(element.id)) {
                                var index_1 = _this.cart.cart.filter(function (x) { return x.id === element.id; });
                                element['quantiy'] = index_1[0].quantiy;
                                if (element.variations[0]) {
                                    element.variations[0].items.forEach(function (pageElement) {
                                        index_1[0].variations[0].items.forEach(function (cartElement) {
                                            if (pageElement.id == cartElement.id) {
                                                pageElement.quantity = cartElement.quantity;
                                            }
                                        });
                                    });
                                }
                            }
                            else {
                                element['quantiy'] = 0;
                                if (element.variations[0]) {
                                    element.variations[0].items.forEach(function (pageElement) {
                                        pageElement.quantity = 0;
                                    });
                                }
                            }
                            // if(element.parent_id == '0' || element.parent_id == ''){
                            //   this.topProducts.push(element);
                            // }
                            _this.topProducts.push(element);
                        });
                    }
                }, function (error) {
                    console.log(error);
                    _this.dummyTopProducts = [];
                });
                _this.api.post('products/getHome', param).subscribe(function (data) {
                    console.log('home products', data);
                    _this.dummyTopProducts = [];
                    if (data && data.status === 200 && data.data && data.data.length) {
                        data.data.forEach(function (element) {
                            if (element.variations && element.size === '1' && element.variations !== '') {
                                if ((function (x) { try {
                                    JSON.parse(x);
                                    return true;
                                }
                                catch (e) {
                                    return false;
                                } })(element.status)) {
                                    element.variations = JSON.parse(element.variations);
                                    element['variant'] = 0;
                                }
                                else {
                                    element.variations = [];
                                    element['variant'] = 1;
                                }
                            }
                            else {
                                element.variations = [];
                                element['variant'] = 1;
                            }
                            if (element.variations[0]) {
                                if (element.variations[0]) {
                                    element.variations[0].items.forEach(function (addOnElement) {
                                        addOnElement['quantity'] = 0;
                                        addOnElement.id = element.id + '_' + addOnElement.title;
                                    });
                                }
                            }
                            if (_this.cart.itemId.includes(element.id)) {
                                var index_2 = _this.cart.cart.filter(function (x) { return x.id === element.id; });
                                element['quantiy'] = index_2[0].quantiy;
                                if (element.variations[0]) {
                                    element.variations[0].items.forEach(function (pageElement) {
                                        index_2[0].variations[0].items.forEach(function (cartElement) {
                                            if (pageElement.id == cartElement.id) {
                                                pageElement.quantity = cartElement.quantity;
                                            }
                                        });
                                    });
                                }
                            }
                            else {
                                element['quantiy'] = 0;
                                if (element.variations[0]) {
                                    element.variations[0].items.forEach(function (pageElement) {
                                        pageElement.quantity = 0;
                                    });
                                }
                            }
                            // if(element.parent_id == '0' || element.parent_id == ''){
                            //   this.topProducts.push(element);
                            // }
                            _this.topProducts.push(element);
                            console.log("topProducts", _this.topProducts);
                        });
                    }
                }, function (error) {
                    _this.dummyTopProducts = [];
                    console.log(error);
                });
                console.log('top products-->>>>>>>>>>>>>>>>--->>', _this.topProducts);
                _this.api.post('products/inOffers', param).subscribe(function (data) {
                    console.log('inOffersinOffers', data);
                    _this.dummyOffers = [];
                    if (data && data.status === 200 && data.data && data.data.length) {
                        // this.util.dummyProducts = data.data;
                        // const topOffers = this.util.dummyProducts.filter(x => x.in_offer === '1');
                        _this.offers = [];
                        data.data.filter(function (element) {
                            if (element.variations && element.size === '1' && element.variations !== '') {
                                if ((function (x) { try {
                                    JSON.parse(x);
                                    return true;
                                }
                                catch (e) {
                                    return false;
                                } })(element.status)) {
                                    element.variations = JSON.parse(element.variations);
                                    element['variant'] = 0;
                                }
                                else {
                                    element.variations = [];
                                    element['variant'] = 1;
                                }
                            }
                            else {
                                element.variations = [];
                                element['variant'] = 1;
                            }
                            if (element.variations[0]) {
                                if (element.variations[0]) {
                                    element.variations[0].items.forEach(function (addOnElement) {
                                        addOnElement['quantity'] = 0;
                                        addOnElement.id = element.id + '_' + addOnElement.title;
                                    });
                                }
                            }
                            if (_this.cart.itemId.includes(element.id)) {
                                var index_3 = _this.cart.cart.filter(function (x) { return x.id === element.id; });
                                element['quantiy'] = index_3[0].quantiy;
                                if (element.variations[0]) {
                                    element.variations[0].items.forEach(function (pageElement) {
                                        index_3[0].variations[0].items.forEach(function (cartElement) {
                                            if (pageElement.id == cartElement.id) {
                                                pageElement.quantity = cartElement.quantity;
                                            }
                                        });
                                    });
                                }
                            }
                            else {
                                element['quantiy'] = 0;
                                if (element.variations[0]) {
                                    element.variations[0].items.forEach(function (pageElement) {
                                        pageElement.quantity = 0;
                                    });
                                }
                            }
                            _this.offers.push(element);
                        });
                        _this.offers = lodash_1.sortBy(_this.offers, ['discount'], ['desc']);
                        console.log('----------------------------->', _this.offers);
                    }
                    else {
                        _this.util.dummyProducts = [];
                    }
                }, function (error) {
                    console.log(error);
                    _this.util.dummyProducts = [];
                    _this.dummyOffers = [];
                });
            }
            else {
                _this.haveStores = false;
                _this.stores = [];
                console.log('no city found');
                _this.dummyCates = [];
                _this.dummyBanners = [];
                _this.bottomDummy = [];
                _this.betweenDummy = [];
                _this.dummyTopProducts = [];
                _this.dummyProducts = [];
                _this.categories = [];
                _this.banners = [];
                _this.bottomBanners = [];
                _this.betweenBanners = [];
                _this.topProducts = [];
                _this.products = [];
                _this.chMod.detectChanges();
            }
        }, function (error) {
            console.log('error in get store by city', error);
            _this.stores = [];
            _this.haveStores = false;
            _this.dummyCates = [];
            _this.dummyBanners = [];
            _this.bottomDummy = [];
            _this.betweenDummy = [];
            _this.dummyTopProducts = [];
            _this.dummyProducts = [];
            _this.categories = [];
            _this.banners = [];
            _this.bottomBanners = [];
            _this.betweenBanners = [];
            _this.topProducts = [];
            _this.products = [];
            _this.util.toast('error', _this.util.getString('Error'), _this.util.getString('Something went wrong'));
            _this.chMod.detectChanges();
        });
    };
    HomeComponent.prototype.isOpen = function (start, end) {
        var format = 'H:mm:ss';
        var ctime = moment().format('HH:mm:ss');
        var time = moment(ctime, format);
        var beforeTime = moment(start, format);
        var afterTime = moment(end, format);
        if (time.isBetween(beforeTime, afterTime)) {
            return true;
        }
        return false;
    };
    HomeComponent.prototype.getBanners = function () {
        var _this = this;
        this.dummyBanners = Array(30);
        this.api.get('banners').subscribe(function (data) {
            console.log(data);
            _this.dummyBanners = [];
            _this.betweenDummy = [];
            _this.bottomDummy = [];
            _this.bottomBanners = [];
            _this.betweenBanners = [];
            _this.banners = [];
            if (data && data.status === 200 && data.data && data.data.length) {
                data.data.forEach(function (element) {
                    if (element && element.status === '1') {
                        if (element.position === '0') {
                            _this.banners.push(element);
                        }
                        else if (element.position === '1') {
                            _this.bottomBanners.push(element);
                        }
                        else {
                            _this.betweenBanners.push(element);
                        }
                    }
                });
                console.log('top', _this.banners);
                console.log('bottom', _this.bottomBanners);
                console.log('between', _this.betweenBanners);
            }
        }, function (error) {
            console.log(error);
            _this.dummyBanners = [];
        });
    };
    HomeComponent.prototype.getQuanity = function (id) {
        var data = this.cart.cart.filter(function (x) { return x.id === id; });
        return data[0].quantiy;
    };
    HomeComponent.prototype.getCategorys = function () {
        var _this = this;
        this.dummyCates = Array(30);
        this.api.get('categories').subscribe(function (datas) {
            console.log('categories', datas);
            _this.dummyCates = [];
            _this.categories = [];
            var cates = [];
            if (datas && datas.data && datas.data.length) {
                datas.data.forEach(function (element) {
                    if (element.status === '1') {
                        var info = {
                            id: element.id,
                            name: element.name,
                            cover: element.cover
                        };
                        var data = {
                            id: element.id,
                            name: element.name,
                            cover: element.cover,
                            subCates: []
                        };
                        cates.push(data);
                        _this.categories.push(info);
                    }
                });
                _this.api.get('subcate').subscribe(function (subCates) {
                    console.log('sub cates', subCates);
                    if (subCates && subCates.status === 200 && subCates.data && subCates.data.length) {
                        cates.forEach(function (element, i) {
                            subCates.data.forEach(function (sub) {
                                if (sub.status === '1' && element.id === sub.cate_id) {
                                    cates[i].subCates.push(sub);
                                }
                            });
                        });
                        // console.log('=>>', this.categories);
                        _this.dummyBottomCates = [];
                        _this.bottomcategory = cates;
                        console.log('bottomcategory cates==========>', _this.bottomcategory);
                    }
                    else {
                        _this.dummyBottomCates = [];
                    }
                }, function (error) {
                    console.log(error);
                    _this.util.toast('error', _this.util.getString('Error'), _this.util.getString('Something went wrong'));
                    _this.dummyBottomCates = [];
                });
            }
            else {
                _this.dummyCates = [];
                _this.dummyBottomCates = [];
            }
        }, function (error) {
            console.log(error);
            _this.util.toast('error', _this.util.getString('Error'), _this.util.getString('Something went wrong'));
            _this.dummyCates = [];
            _this.dummyBottomCates = [];
        });
    };
    HomeComponent.prototype.open = function () {
        // modal.show();
        this.basicModal.show();
    };
    HomeComponent.prototype.openPage = function (item, type) {
        console.log(item);
        if (item === 'picked') {
            this.router.navigate(['top-picked']);
        }
        else if (item === 'stores') {
            var param = {
                queryParams: {
                    type: type
                }
            };
            this.router.navigate(['/top-stores'], param);
        }
        else if (item === 'offers') {
            this.router.navigate(['top-offers']);
        }
    };
    HomeComponent.prototype.goToProductDetail = function (item) {
        console.log(item);
        var param = {
            queryParams: {
                val: JSON.stringify(item)
            }
        };
        this.router.navigate(['/product-detail'], param);
    };
    HomeComponent.prototype.subCate = function (item) {
        console.log("category item", item);
        var param = {
            queryParams: {
                cid: item.id,
                cname: item.name
            }
        };
        this.router.navigate(['sub-categoris'], param);
    };
    HomeComponent.prototype.subItems = function (item, sub) {
        console.log(item, sub);
        var param = {
            queryParams: {
                cid: item.id,
                cname: item.name,
                subid: sub.id,
                sname: sub.name
            }
        };
        this.router.navigate(['sub-categoris'], param);
    };
    HomeComponent.prototype.scrollRight = function () {
        this.content.nativeElement.scrollLeft += 250;
    };
    HomeComponent.prototype.scrollLeft = function () {
        this.content.nativeElement.scrollLeft -= 250;
    };
    HomeComponent.prototype.scrollRighttopOffers = function () {
        this.topOffers.nativeElement.scrollLeft += 450;
    };
    HomeComponent.prototype.scrollLefttopOffers = function () {
        this.topOffers.nativeElement.scrollLeft -= 450;
    };
    HomeComponent.prototype.scrollRighttopContent = function () {
        this.topContent.nativeElement.scrollLeft += 450;
    };
    HomeComponent.prototype.scrollLefttopContent = function () {
        this.topContent.nativeElement.scrollLeft -= 450;
    };
    HomeComponent.prototype.scrollRighttopStores = function () {
        this.topStores.nativeElement.scrollLeft += 450;
    };
    HomeComponent.prototype.scrollLefttopStores = function () {
        this.topStores.nativeElement.scrollLeft -= 450;
    };
    HomeComponent.prototype.topLeft = function () {
        this.topContent.nativeElement.scrollLeft -= 250;
    };
    HomeComponent.prototype.topRight = function () {
        this.topContent.nativeElement.scrollLeft += 250;
    };
    HomeComponent.prototype.openLink = function (item) {
        console.log(item);
        if (item.type === '0') {
            // Category
            console.log('open category');
            var name = this.categories.filter(function (x) { return x.id === item.link; });
            var cateName = '';
            if (name && name.length) {
                cateName = name[0].name;
            }
            var param = {
                queryParams: {
                    cid: item.link,
                    cname: cateName
                }
            };
            this.router.navigate(['sub-categoris'], param);
        }
        else if (item.type === '1') {
            // product
            console.log('open product');
            var param = {
                queryParams: {
                    id: item.link
                }
            };
            this.router.navigate(['product-detail'], param);
        }
        else {
            // link
            console.log('open link');
        }
    };
    HomeComponent.prototype.goToSingleProduct = function (product) {
        console.log('-->', product);
        var param = {
            queryParams: {
                id: product.id
            }
        };
        this.router.navigate(['product-detail'], param);
    };
    HomeComponent.prototype.addToCart = function (item, index) {
        console.log("items add cart", item);
        console.log("before", this.topProducts[index].quantiy);
        this.topProducts[index].quantiy = 1;
        console.log("after", this.topProducts[index].quantiy);
        this.cart.addItem(item);
    };
    HomeComponent.prototype.addOffersToCart = function (item, index) {
        console.log(item);
        this.offers[index].quantiy = 1;
        this.cart.addItem(item);
    };
    HomeComponent.prototype.add = function (product, index) {
        console.log(product);
        this.topProducts[index].quantiy = this.getQuanity(product.id);
        if (this.topProducts[index].quantiy > 0) {
            this.topProducts[index].quantiy = this.topProducts[index].quantiy + 1;
            this.cart.addQuantity(this.topProducts[index].quantiy, product.id);
        }
    };
    HomeComponent.prototype.remove = function (product, index) {
        console.log(product, index);
        this.topProducts[index].quantiy = this.getQuanity(product.id);
        if (this.topProducts[index].quantiy === 1) {
            if (this.topProducts[index].variations[0]) {
                this.topProducts[index].variations[0].items.forEach(function (element) {
                    element.quantity = 0;
                });
            }
            this.topProducts[index].quantiy = 0;
            this.cart.removeItem(product.id);
        }
        else {
            this.topProducts[index].quantiy = this.topProducts[index].quantiy - 1;
            this.cart.addQuantity(this.topProducts[index].quantiy, product.id);
        }
    };
    HomeComponent.prototype.addAddOn = function (item, parent) {
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
                _this.cart.addAddOn(id, parent, element.quantity);
            }
        });
    };
    HomeComponent.prototype.minusAddOn = function (item, parent) {
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
                _this.cart.addAddOn(id, parent, element.quantity);
            }
        });
    };
    HomeComponent.prototype.getAddOnQuantity = function (id, parent) {
        var _this = this;
        var parentId = parent.id;
        var data = this.cart.cart.filter(function (x) { return x.id === parentId; });
        if (data.length > 0) {
            if (parent.variations[0]) {
                data[0].variations[0].items.forEach(function (cartElement) {
                    if (id == cartElement.id) {
                        parent.variations[0].items.forEach(function (pageElement) {
                            if (pageElement.id == id) {
                                pageElement.quantity = cartElement.quantity;
                                _this.elementQuanity = pageElement.quantity;
                            }
                        });
                    }
                });
            }
        }
        else {
            this.elementQuanity = 0;
        }
        return this.elementQuanity;
    };
    HomeComponent.prototype.addOffers = function (product, index) {
        console.log(product);
        this.offers[index].quantiy = this.getQuanity(product.id);
        if (this.offers[index].quantiy > 0) {
            this.offers[index].quantiy = this.offers[index].quantiy + 1;
            this.cart.addQuantity(this.offers[index].quantiy, product.id);
        }
    };
    HomeComponent.prototype.removeOffers = function (product, index) {
        console.log(product, index);
        this.offers[index].quantiy = this.getQuanity(product.id);
        if (this.offers[index].quantiy === 1) {
            if (this.offers[index].variations[0]) {
                this.offers[index].variations[0].items.forEach(function (element) {
                    element.quantity = 0;
                });
            }
            this.offers[index].quantiy = 0;
            this.cart.removeItem(product.id);
        }
        else {
            this.offers[index].quantiy = this.offers[index].quantiy - 1;
            this.cart.addQuantity(this.offers[index].quantiy, product.id);
        }
    };
    HomeComponent.prototype.openStore = function (item, type) {
        console.log('open store', item);
        if (type == "category") {
            var param = {
                queryParams: {
                    id: item.id,
                    name: item.name,
                    type: type
                }
            };
            this.router.navigate(['stores-products'], param);
        }
        else {
            var param = {
                queryParams: {
                    id: item.uid,
                    name: item.name,
                    type: type
                }
            };
            this.router.navigate(['stores-products'], param);
        }
    };
    HomeComponent.prototype.getTime = function (time) {
        return moment(time, ['h:mm A']).format('hh:mm A');
    };
    HomeComponent.prototype.goToProductList = function (val) {
        var navData = {
            queryParams: {
                id: val.id,
                name: val.name
            }
        };
        this.router.navigate(['/tabs/categories/products'], navData);
    };
    HomeComponent.prototype.goToCategoryProductList = function (val) {
        var navData = {
            queryParams: {
                id: val.id,
                name: val.name
            }
        };
        this.router.navigate(['products'], navData);
    };
    __decorate([
        core_1.ViewChild('frameTop')
    ], HomeComponent.prototype, "frameTop");
    __decorate([
        core_1.ViewChild('basicModal')
    ], HomeComponent.prototype, "basicModal");
    __decorate([
        core_1.ViewChild('content', { read: core_1.ElementRef })
    ], HomeComponent.prototype, "content");
    __decorate([
        core_1.ViewChild('topContent', { read: core_1.ElementRef })
    ], HomeComponent.prototype, "topContent");
    __decorate([
        core_1.ViewChild('topStores', { read: core_1.ElementRef })
    ], HomeComponent.prototype, "topStores");
    __decorate([
        core_1.ViewChild('topOffers', { read: core_1.ElementRef })
    ], HomeComponent.prototype, "topOffers");
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'app-home',
            templateUrl: './home.component.html',
            styleUrls: ['./home.component.scss']
        })
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
