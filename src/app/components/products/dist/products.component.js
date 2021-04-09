"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.ProductsComponent = void 0;
var core_1 = require("@angular/core");
var ProductsComponent = /** @class */ (function () {
    function ProductsComponent(api, util, cart, router, route, navCtrl) {
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
        this.dummyProduct = [];
        this.dummy = Array(20);
        this.qty = 0;
        this.selectedFilter = '';
        this.isClosedFilter = true;
        this.route.queryParams.subscribe(function (data) {
            console.log("inside products");
            console.log(data);
            if (data && data.id) {
                _this.id = data.id;
                _this.limit = 1;
                _this.loaded = false;
                _this.haveSortFilter = false;
                _this.name = data.name;
                _this.dummyTopProducts = Array(30);
                // this.getOffers();
                _this.getProducts(false, 'none');
            }
            else {
                _this.navCtrl.back();
            }
        });
        console.log("inside products");
    }
    ProductsComponent.prototype.getOffers = function () {
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
    ProductsComponent.prototype.ngOnInit = function () {
    };
    ProductsComponent.prototype.changeMode = function () {
        this.mode = this.mode === 'grid' ? 'list' : 'grid';
    };
    ProductsComponent.prototype.getProducts = function (limit, event) {
        var _this = this;
        var param = {
            id: this.id,
            limit: this.limit * 10,
            cid: localStorage.getItem('city')
        };
        this.api.post('products/getByCid', param).subscribe(function (data) {
            console.log('ids', data);
            _this.dummy = [];
            if (data && data.status === 200 && data.data && data.data.length) {
                var products = data.data;
                _this.products = products.filter(function (x) { return x.status === '1'; });
                _this.dummyProduct = _this.products;
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
                        } })(info.variations)) {
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
                        info.variations[0].items.forEach(function (element) {
                            element['quantity'] = 0;
                            element.id = _this.id + '_' + element.title;
                        });
                    }
                    if (_this.cart.itemId.includes(info.id)) {
                        var index_2 = _this.cart.cart.filter(function (x) { return x.id === info.id; });
                        info['quantiy'] = index_2[0].quantiy;
                        if (info.variations[0]) {
                            info.variations[0].items.forEach(function (pageElement) {
                                index_2[0].variations[0].items.forEach(function (cartElement) {
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
                            info.variations[0].items.forEach(function (addOnElement) {
                                addOnElement.quantity = 0;
                            });
                        }
                    }
                });
                _this.max = Math.max.apply(Math, __spreadArrays(_this.products.map(function (o) { return o.original_price; }), [0]));
                console.log('maxValueOfPrice', _this.max);
                _this.min = Math.min.apply(null, _this.products.map(function (item) { return item.original_price; }));
                console.log('minValueOfPrice', _this.min);
                if (_this.selectedFilterID && _this.selectedFilterID !== null) {
                    _this.updateFilter();
                }
                if (_this.haveSortFilter && _this.isClosedFilter === false) {
                    _this.sortFilter();
                }
            }
            if (limit) {
                event.complete();
            }
        }, function (error) {
            console.log(error);
            _this.util.toast('error', _this.util.getString('Error'), _this.util.getString('Something went wrong'));
            if (limit) {
                event.complete();
            }
        });
    };
    ProductsComponent.prototype.sortFilter = function () {
        var _this = this;
        if (this.discount && this.discount !== null) {
            console.log('filter with discount');
            var products_1 = [];
            this.dummyProduct.forEach(function (element) {
                if (parseFloat(element.original_price) >= _this.minValue && parseFloat(element.original_price) <= _this.maxValue &&
                    parseFloat(_this.discount) <= parseFloat(element.discount)) {
                    products_1.push(element);
                }
                _this.products = products_1;
            });
        }
        else {
            console.log('filter without discount');
            var products_2 = [];
            this.dummyProduct.forEach(function (element) {
                if (parseFloat(element.original_price) >= _this.minValue && parseFloat(element.original_price) <= _this.maxValue) {
                    products_2.push(element);
                }
            });
            this.products = products_2;
        }
    };
    ProductsComponent.prototype.updateFilter = function () {
        switch (this.selectedFilterID) {
            case '1':
                console.log('its rating');
                this.selectedFilter = this.util.getString('Popularity');
                this.products = this.products.sort(function (a, b) {
                    return parseFloat(b.total_rating) < parseFloat(a.total_rating) ? -1
                        : (parseFloat(b.total_rating) > parseFloat(a.total_rating) ? 1 : 0);
                });
                break;
            case '2':
                console.log('its low to high');
                this.selectedFilter = this.util.getString('Price L-H');
                this.products = this.products.sort(function (a, b) {
                    return parseFloat(a.original_price) < parseFloat(b.original_price) ? -1
                        : (parseFloat(a.original_price) > parseFloat(b.original_price) ? 1 : 0);
                });
                break;
            case '3':
                console.log('its highht to low');
                this.selectedFilter = this.util.getString('Price H-L');
                this.products = this.products.sort(function (a, b) {
                    return parseFloat(b.original_price) < parseFloat(a.original_price) ? -1
                        : (parseFloat(b.original_price) > parseFloat(a.original_price) ? 1 : 0);
                });
                break;
            case '4':
                console.log('its a - z');
                this.selectedFilter = this.util.getString('A-Z');
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
                this.selectedFilter = this.util.getString('Z-A');
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
                this.selectedFilter = this.util.getString('% Off');
                this.products = this.products.sort(function (a, b) {
                    return parseFloat(b.discount) < parseFloat(a.discount) ? -1
                        : (parseFloat(b.discount) > parseFloat(a.discount) ? 1 : 0);
                });
                break;
            default:
                break;
        }
    };
    ProductsComponent.prototype.onChange = function (value) {
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
    ProductsComponent.prototype.singleProduct = function (item) {
        console.log('-->', item);
        var param = {
            queryParams: {
                id: item.id
            }
        };
        this.router.navigate(['product-detail'], param);
    };
    ProductsComponent.prototype.addToCart = function (item, index) {
        console.log(item);
        this.products[index].quantiy = 1;
        this.cart.addItem(item);
    };
    ProductsComponent.prototype.add = function (product, index) {
        console.log(product);
        if (this.products[index].quantiy > 0) {
            this.products[index].quantiy = this.products[index].quantiy + 1;
            this.cart.addQuantity(this.products[index].quantiy, product.id);
        }
    };
    ProductsComponent.prototype.remove = function (product, index) {
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
    ProductsComponent.prototype.loadData = function () {
        this.limit = this.limit + 1;
        this.loaded = true;
        this.getOffers();
    };
    ProductsComponent = __decorate([
        core_1.Component({
            selector: 'app-products',
            templateUrl: './products.component.html',
            styleUrls: ['./products.component.scss']
        })
    ], ProductsComponent);
    return ProductsComponent;
}());
exports.ProductsComponent = ProductsComponent;
