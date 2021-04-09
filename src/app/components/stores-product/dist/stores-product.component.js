"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.StoresProductComponent = void 0;
var core_1 = require("@angular/core");
var StoresProductComponent = /** @class */ (function () {
    function StoresProductComponent(api, util, cart, router, route, navCtrl) {
        var _this = this;
        this.api = api;
        this.util = util;
        this.cart = cart;
        this.router = router;
        this.route = route;
        this.navCtrl = navCtrl;
        this.products = [];
        this.dummyTopProducts = [];
        this.relatedProduct = [];
        this.filter = '1';
        this.mode = 'grid';
        this.route.queryParams.subscribe(function (data) {
            console.log("categorytype", data);
            console.log("categorytype", data.type);
            if (data && data.id) {
                _this.id = data.id;
                _this.limit = 1;
                _this.loaded = false;
                _this.name = data.name;
                _this.dummyTopProducts = Array(30);
                if (data.type == "category") {
                    console.log("inside category");
                    _this.getProducts();
                }
                else {
                    console.log("inside store");
                    _this.getOffers();
                }
            }
            else {
                _this.navCtrl.back();
            }
        });
    }
    StoresProductComponent.prototype.getOffers = function () {
        var _this = this;
        var param = {
            id: this.id,
            limit: this.limit * 12
        };
        this.api.post('products/getProductByStores', param).subscribe(function (data) {
            console.log('top products', data);
            var products = data.data;
            _this.maxLimit = (_this.limit * 12) - 1;
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
                    }
                    _this.products = [];
                    // for(let i = 0; i< products.length; i++){
                    //   if(products[i].parent_id == '0' || products[i].parent_id == ''){
                    //     this.products.push(products[i]);
                    //   }
                    // }
                    _this.products.push(element);
                });
                if (_this.loaded) {
                    _this.loaded = false;
                }
            }
            else {
                _this.navCtrl.back();
            }
        }, function (error) {
            console.log(error);
            _this.dummyTopProducts = [];
        });
    };
    StoresProductComponent.prototype.getProducts = function () {
        var _this = this;
        var param = {
            id: this.id,
            limit: this.limit * 12,
            cid: localStorage.getItem('city')
        };
        this.api.post('products/getByCid', param).subscribe(function (data) {
            console.log('top products', data);
            var products = data.data;
            _this.maxLimit = (_this.limit * 12) - 1;
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
                    }
                    _this.products = [];
                    // for(let i = 0; i< products.length; i++){
                    //   if(products[i].parent_id == '0' || products[i].parent_id == ''){
                    //     this.products.push(products[i]);
                    //   }
                    // }
                    _this.products.push(element);
                });
                if (_this.loaded) {
                    _this.loaded = false;
                }
            }
            else {
                _this.navCtrl.back();
            }
        }, function (error) {
            console.log(error);
            _this.dummyTopProducts = [];
        });
    };
    StoresProductComponent.prototype.ngOnInit = function () {
    };
    StoresProductComponent.prototype.changeMode = function () {
        this.mode = this.mode === 'grid' ? 'list' : 'grid';
    };
    StoresProductComponent.prototype.onChange = function (value) {
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
    StoresProductComponent.prototype.singleProduct = function (item) {
        console.log('-->', item);
        var param = {
            queryParams: {
                id: item.id
            }
        };
        this.router.navigate(['product-detail'], param);
    };
    StoresProductComponent.prototype.addToCart = function (item, index) {
        console.log(item);
        this.products[index].quantiy = 1;
        this.cart.addItem(item);
    };
    StoresProductComponent.prototype.add = function (product, index) {
        console.log(product);
        if (this.products[index].quantiy > 0) {
            this.products[index].quantiy = this.products[index].quantiy + 1;
            this.cart.addQuantity(this.products[index].quantiy, product.id);
        }
    };
    StoresProductComponent.prototype.remove = function (product, index) {
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
    StoresProductComponent.prototype.loadData = function () {
        this.limit = this.limit + 1;
        this.loaded = true;
        this.getOffers();
    };
    StoresProductComponent = __decorate([
        core_1.Component({
            selector: 'app-stores-product',
            templateUrl: './stores-product.component.html',
            styleUrls: ['./stores-product.component.scss']
        })
    ], StoresProductComponent);
    return StoresProductComponent;
}());
exports.StoresProductComponent = StoresProductComponent;
