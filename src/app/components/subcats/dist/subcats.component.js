"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SubcatsComponent = void 0;
var core_1 = require("@angular/core");
var SubcatsComponent = /** @class */ (function () {
    function SubcatsComponent(route, navCtrl, util, api, cart, router) {
        var _this = this;
        this.route = route;
        this.navCtrl = navCtrl;
        this.util = util;
        this.api = api;
        this.cart = cart;
        this.router = router;
        this.dummyCates = [];
        this.cates = [];
        this.dummyProducts = [];
        this.products = [];
        this.id = '';
        this.cname = '';
        this.subId = '';
        this.subName = '';
        this.subCates = [];
        this.dummys = Array(20);
        this.filter = '1';
        this.route.queryParams.subscribe(function (data) {
            console.log('prama', data);
            if (data && data.cid && data.cname) {
                _this.dummyCates = Array(10);
                _this.dummyProducts = Array(16);
                _this.cname = data.cname;
                _this.id = data.cid;
                _this.limit = 1;
                _this.loaded = false;
                if (data.subid && data.sname) {
                    _this.subId = data.subid;
                    _this.subName = data.sname;
                    _this.tabSelected = _this.subId;
                }
                _this.getCategories();
            }
            else {
                _this.util.toast('error', _this.util.getString('Error'), _this.util.getString('wrong input'));
                _this.navCtrl.back();
            }
        });
    }
    SubcatsComponent.prototype.getCategories = function () {
        var _this = this;
        var param = {
            id: this.id
        };
        this.api.post('subcate/getByCId', param).subscribe(function (data) {
            if (data && data.status === 200 && data.data && data.data.length) {
                console.log('subcates', data.data);
                _this.dummyCates = [];
                _this.subCates = data.data.filter(function (x) { return x.status === '1'; });
                if (!_this.tabSelected || _this.tabSelected === '') {
                    _this.tabSelected = _this.subCates[0].id;
                }
                _this.getSubProducts();
            }
            else {
                _this.navCtrl.back();
                _this.dummyCates = [];
                _this.dummyProducts = [];
            }
            _this.getSubProducts();
        }, function (error) {
            console.log(error);
            _this.dummyCates = [];
            _this.dummyProducts = [];
            _this.util.toast('error', _this.util.getString('Error'), _this.util.getString('wrong input'));
        });
    };
    SubcatsComponent.prototype.getSubProducts = function () {
        var _this = this;
        var city = {
            id: this.id,
            cid: localStorage.getItem('city'),
            sid: this.tabSelected,
            limit: this.limit * 12
        };
        console.log('parma', city);
        // this.loaded = false;
        this.api.post('products/getByCSID', city).subscribe(function (cates) {
            console.log(cates);
            _this.dummyProducts = [];
            if (cates && cates.status === 200 && cates.data && cates.data.length) {
                _this.maxLimit = (_this.limit * 12) - 1;
                console.log('Max Limit0000', _this.maxLimit);
                console.log('products', cates.data);
                var products = cates.data;
                _this.products = products.filter(function (x) { return x.status === '1'; });
                // this.dummyProducts = this.products;
                // const cart = this.cart.cart;
                console.log('cart===============>>>>>>', _this.cart.cart);
                _this.products.forEach(function (info) {
                    if (info.variations && info.size === '1' && info.variations !== '') {
                        if ((function (x) { try {
                            JSON.parse(x);
                            return true;
                        }
                        catch (e) {
                            return false;
                        } })(info.status)) {
                            info.variations = JSON.parse(info.variations);
                            info['variant'] = 0;
                        }
                        else {
                            info.variations = [];
                            info['variant'] = 1;
                        }
                    }
                    else {
                        info.variations = [];
                        info['variant'] = 1;
                    }
                    if (info.variations[0]) {
                        if (info.variations[0]) {
                            info.variations[0].items.forEach(function (addOnElement) {
                                addOnElement['quantity'] = 0;
                                addOnElement.id = info.id + '_' + addOnElement.title;
                            });
                        }
                    }
                    if (_this.cart.itemId.includes(info.id)) {
                        var index_1 = _this.cart.cart.filter(function (x) { return x.id === info.id; });
                        info['quantiy'] = index_1[0].quantiy;
                        if (info.variations[0]) {
                            info.variations[0].items.forEach(function (pageElement) {
                                index_1[0].variations[0].items.forEach(function (cartElement) {
                                    if (pageElement.id == cartElement.id) {
                                        pageElement.quantity = cartElement.quantity;
                                    }
                                });
                            });
                        }
                    }
                    else {
                        info['quantiy'] = 0;
                        if (info.variations[0]) {
                            info.variations[0].items.forEach(function (pageElement) {
                                pageElement.quantity = 0;
                            });
                        }
                    }
                });
                _this.onChange(_this.filter);
                _this.dummys = [];
            }
            else {
                _this.dummys = [];
            }
            if (_this.loaded) {
                _this.loaded = false;
            }
        }, function (error) {
            console.log(error);
            _this.dummys = [];
            _this.dummyProducts = [];
            _this.util.toast('error', _this.util.getString('Error'), _this.util.getString('wrong input'));
        });
    };
    SubcatsComponent.prototype.ngOnInit = function () {
    };
    SubcatsComponent.prototype.onMenuClick = function (cid, name) {
        console.log(cid);
        this.tabSelected = cid;
        this.products = [];
        this.limit = 1;
        this.subName = name;
        this.dummyProducts = Array(20);
        this.getSubProducts();
        this.loaded = false;
    };
    SubcatsComponent.prototype.singleProduct = function (item) {
        console.log('-->', item);
        var param = {
            queryParams: {
                id: item.id
            }
        };
        this.router.navigate(['product-detail'], param);
    };
    SubcatsComponent.prototype.addToCart = function (item, index) {
        console.log(item);
        this.products[index].quantiy = 1;
        this.cart.addItem(item);
    };
    SubcatsComponent.prototype.add = function (product, index) {
        console.log(product);
        if (this.products[index].quantiy > 0) {
            this.products[index].quantiy = this.products[index].quantiy + 1;
            this.cart.addQuantity(this.products[index].quantiy, product.id);
        }
    };
    SubcatsComponent.prototype.remove = function (product, index) {
        console.log(product, index);
        if (this.products[index].quantiy === 1) {
            if (this.products[index].variations[0]) {
                this.products[index].variations[0].items.forEach(function (element) {
                    element.quantity = 0;
                });
            }
            this.products[index].quantiy = 0;
            this.cart.removeItem(product.id);
        }
        else {
            this.products[index].quantiy = this.products[index].quantiy - 1;
            this.cart.addQuantity(this.products[index].quantiy, product.id);
        }
    };
    SubcatsComponent.prototype.loadData = function () {
        this.limit = this.limit + 1;
        this.loaded = true;
        this.getSubProducts();
    };
    SubcatsComponent.prototype.onChange = function (value) {
        console.log(value, this.filter);
        switch (this.filter) {
            case '1':
                console.log('its rating');
                // this.products = this.products.sort((a, b) => parseInt(b.total_rating) - parseInt(a.total_rating));
                this.products = this.products.sort(function (a, b) {
                    return parseFloat(b.total_rating) < parseFloat(a.total_rating) ? -1
                        : (parseFloat(b.total_rating) > parseFloat(a.total_rating) ? 1 : 0);
                });
                break;
            case '2':
                console.log('its low to high');
                this.products = this.products.sort(function (a, b) {
                    return parseFloat(a.original_price) < parseFloat(b.original_price) ? -1
                        : (parseFloat(a.original_price) > parseFloat(b.original_price) ? 1 : 0);
                });
                break;
            case '3':
                console.log('its highht to low');
                this.products = this.products.sort(function (a, b) {
                    return parseFloat(b.original_price) < parseFloat(a.original_price) ? -1
                        : (parseFloat(b.original_price) > parseFloat(a.original_price) ? 1 : 0);
                });
                break;
            case '4':
                console.log('its a - z');
                this.products = this.products.sort(function (a, b) {
                    if (a.name < b.name) {
                        return -1;
                    }
                    if (a.name > b.name) {
                        return 1;
                    }
                    return 0;
                });
                break;
            case '5':
                console.log('its z - a');
                this.products = this.products.sort(function (a, b) {
                    if (a.name > b.name) {
                        return -1;
                    }
                    if (a.name < b.name) {
                        return 1;
                    }
                    return 0;
                });
                break;
            case '6':
                console.log('its % off');
                this.products = this.products.sort(function (a, b) {
                    return parseFloat(b.discount) < parseFloat(a.discount) ? -1
                        : (parseFloat(b.discount) > parseFloat(a.discount) ? 1 : 0);
                });
                break;
            default:
                break;
        }
    };
    __decorate([
        core_1.ViewChild('content', { static: false })
    ], SubcatsComponent.prototype, "content");
    SubcatsComponent = __decorate([
        core_1.Component({
            selector: 'app-subcats',
            templateUrl: './subcats.component.html',
            styleUrls: ['./subcats.component.scss']
        })
    ], SubcatsComponent);
    return SubcatsComponent;
}());
exports.SubcatsComponent = SubcatsComponent;
