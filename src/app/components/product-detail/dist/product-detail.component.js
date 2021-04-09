"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProductDetailComponent = void 0;
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
var ProductDetailComponent = /** @class */ (function () {
    function ProductDetailComponent(route, router, navCtrl, api, util, cart) {
        var _this = this;
        this.route = route;
        this.router = router;
        this.navCtrl = navCtrl;
        this.api = api;
        this.util = util;
        this.cart = cart;
        this.name = '';
        this.coverImage = '';
        this.childrenId = [];
        this.key_features = '';
        this.disclaimer = '';
        this.gallery = [];
        this.relatedProduct = [];
        this.related = [];
        this.dummyTopProducts = Array(5);
        this.quantiy = 0;
        this.products = [];
        this.filter = '1';
        this.mode = 'grid';
        this.subProductId = [];
        this.parent = [];
        this.route.queryParams.subscribe(function (data) {
            if (data && data.id) {
                _this.id = data.id;
                _this.getProduct();
            }
            else {
                _this.navCtrl.back();
            }
        });
    }
    ProductDetailComponent.prototype.getProduct = function () {
        var _this = this;
        this.selectedProduct = this.id;
        var param = {
            id: this.id
        };
        this.loaded = false;
        this.api.post('products/getById', param).subscribe(function (data) {
            _this.loaded = true;
            console.log(data);
            _this.gallery = [];
            if (data && data.status === 200 && data.data && data.data.length) {
                var info = data.data[0];
                _this.productt = info;
                _this.productt['quantiy'] = 0;
                _this.name = info.name;
                _this.description = info.descriptions;
                _this.subId = info.sub_cate_id;
                _this.coverImage = info.cover;
                _this.key_features = info.key_features;
                _this.disclaimer = info.disclaimer;
                _this.discount = info.discount;
                _this.exp_date = info.exp_date;
                _this.gram = info.gram;
                _this.have_gram = info.have_gram;
                _this.kg = info.kg;
                _this.have_kg = info.have_kg;
                _this.liter = info.liter;
                _this.have_liter = info.have_liter;
                _this.ml = info.ml;
                _this.have_ml = info.have_ml;
                _this.pcs = info.pcs;
                _this.have_pcs = info.have_pcs;
                _this.in_offer = info.in_offer;
                _this.in_stoke = info.in_stoke;
                _this.is_single = info.is_single;
                _this.veg = info.kind;
                _this.realPrice = parseFloat(info.original_price);
                _this.sellPrice = parseFloat(info.sell_price);
                _this.status = info.status;
                _this.storeId = info.store_id;
                _this.storeName = info.s_name;
                _this.gallery.push(_this.coverImage);
                _this.size = info.size;
                console.log(info.variations, "variations");
                if (info.variations && info.size === '1' && info.variations !== '') {
                    if ((function (x) { try {
                        JSON.parse(x);
                        return true;
                    }
                    catch (e) {
                        return false;
                    } })(info.status)) {
                        _this.variations = JSON.parse(info.variations);
                        _this.variant = 0;
                        _this.productt['variations'] = JSON.parse(info.variations);
                        _this.productt['variant'] = 0;
                    }
                    else {
                        info.variations = [];
                        _this.productt['variations'] = [];
                        _this.variant = 1;
                        _this.productt['variant'] = 1;
                    }
                }
                else {
                    _this.variations = [];
                    _this.variant = 1;
                    _this.productt['variations'] = [];
                    _this.productt['variant'] = 1;
                }
                if (_this.productt.variations[0]) {
                    if (_this.productt.variations[0]) {
                        _this.productt.variations[0].items.forEach(function (element) {
                            element['quantity'] = 0;
                            element.id = _this.id + '_' + element.title;
                        });
                    }
                }
                _this.checkCartItems();
                if (info.images) {
                    var images = JSON.parse(info.images);
                    console.log('images======>>>', images);
                    if (images[0]) {
                        _this.gallery.push(images[0]);
                    }
                    if (images[1]) {
                        _this.gallery.push(images[1]);
                    }
                    if (images[2]) {
                        _this.gallery.push(images[2]);
                    }
                    if (images[3]) {
                        _this.gallery.push(images[3]);
                    }
                    if (images[4]) {
                        _this.gallery.push(images[4]);
                    }
                    if (images[5]) {
                        _this.gallery.push(images[5]);
                    }
                }
                _this.getRelated();
            }
            else {
                _this.util.toast('error', _this.util.getString('Error'), _this.util.getString('Something went wrong'));
            }
        }, function (error) {
            console.log(error);
            _this.loaded = true;
            _this.util.toast('error', _this.util.getString('Error'), _this.util.getString('Something went wrong'));
        });
    };
    ProductDetailComponent.prototype.onFav = function () {
        var _this = this;
        if (this.util.favIds.includes(this.id)) {
            console.log('remove this');
            this.util.removeFav(this.id);
            console.log('after removed', this.util.favIds);
            console.log('edit');
            var param = {
                id: localStorage.getItem('uid'),
                ids: this.util.favIds.join()
            };
            this.util.haveFav = true;
            console.log('parama', param);
            this.api.post('favourite/editList', param).subscribe(function (data) {
                console.log('save response', data);
                if (data && data.status !== 200) {
                    _this.util.toast('error', _this.util.getString('Error'), _this.util.getString('Something went wrong'));
                }
            }, function (error) {
                console.log('error on save', error);
                _this.util.toast('error', _this.util.getString('Error'), _this.util.getString('Something went wrong'));
            });
        }
        else {
            console.log('add new');
            this.util.setFav(this.id);
            console.log('after added', this.util.favIds);
            if (this.util.haveFav) {
                console.log('edit');
                var param = {
                    id: localStorage.getItem('uid'),
                    ids: this.util.favIds.join()
                };
                this.util.haveFav = true;
                console.log('parama', param);
                this.api.post('favourite/editList', param).subscribe(function (data) {
                    console.log('save response', data);
                    if (data && data.status !== 200) {
                        _this.util.toast('error', _this.util.getString('Error'), _this.util.getString('Something went wrong'));
                    }
                }, function (error) {
                    console.log('error on save', error);
                    _this.util.toast('error', _this.util.getString('Error'), _this.util.getString('Something went wrong'));
                });
            }
            else {
                console.log('save');
                var param = {
                    uid: localStorage.getItem('uid'),
                    ids: this.util.favIds.join()
                };
                this.util.haveFav = true;
                console.log('parama', param);
                this.api.post('favourite/save', param).subscribe(function (data) {
                    console.log('save response', data);
                    if (data && data.status !== 200) {
                        _this.util.toast('error', _this.util.getString('Error'), _this.util.getString('Something went wrong'));
                    }
                }, function (error) {
                    console.log('error on save', error);
                    _this.util.toast('error', _this.util.getString('Error'), _this.util.getString('Something went wrong'));
                });
            }
        }
    };
    ProductDetailComponent.prototype.openStore = function () {
        console.log('open store');
        var param = {
            queryParams: {
                id: this.storeId,
                name: this.storeName,
                type: "store"
            }
        };
        this.router.navigate(['stores-products'], param);
    };
    ProductDetailComponent.prototype.changes = function (index) {
        this.variant = index;
        this.cart.calcuate();
        this.productt['variant'] = this.variant;
    };
    // getRelated() {
    //   const param = {
    //     id: this.subId,
    //     limit: 1000,
    //     cid: localStorage.getItem('city')
    //   };
    //   this.related = [];
    //   this.dummyTopProducts = Array(5);
    //   this.subProductId = [];
    //   this.api.post('products/getRelated', param).subscribe((data: any) => {
    //     for(let i = 0; i < data.data.length; i++){
    //       this.parent = data.data[i]['parent_id'].split(',');
    //       for(let j = 0; j < this.parent.length; j++){
    //         if(this.parent[j] == this.selectedProduct  && this.parent[j] != 0){
    //           this.subProductId.push(data.data[i]);
    //           console.log("sub products",this.subProductId )
    //           // this.getSubQuanity(data.data[i].id);
    //           if (data.data[i].variations && data.data[i].size === '1' && data.data[i].variations !== '') {
    //             if (((x) => { try { JSON.parse(x); return true; } catch (e) { return false } })(data.data[i].status)) {
    //               this.variations = JSON.parse(data.data[i].variations);
    //               this.variant = 0;
    //               data.data[i]['variations'] = JSON.parse(data.data[i].variations);
    //               data.data[i]['variant'] = 0;
    //             } else {
    //               data.data[i].variations = [];
    //               data.data[i]['variations'] = [];
    //               this.variant = 1;
    //               data.data[i]['variant'] = 1;
    //             }
    //           } else {
    //             this.variations = [];
    //             this.variant = 1;
    //             this.productt['variations'] = [];
    //             this.productt['variant'] = 1;
    //           }
    //           this.checkCartItems();
    //         }   
    //       }
    //     }
    //     console.log("subproduct", this.subProductId);
    //     console.log('=>related=>', data);
    //     this.dummyTopProducts = [];
    //     if (data && data.status === 200 && data.data && data.data.length) {
    //       const products = data.data;
    //       this.relatedProduct = [];
    //       for(let i = 0; i< products.length; i++){
    //         if(products[i].parent_id == '0' || products[i].parent_id == ''){
    //           this.relatedProduct.push(products[i]);
    //         }
    //       }
    //       this.related = this.relatedProduct.filter(x => x.id !== this.id);
    //     }
    //   }, error => {
    //     console.log(error);
    //     this.dummyTopProducts = [];
    //   });
    // }
    ProductDetailComponent.prototype.getRelated = function () {
        var _this = this;
        var param = {
            id: this.subId,
            limit: 5,
            cid: localStorage.getItem('city')
        };
        this.related = [];
        this.dummyTopProducts = Array(5);
        this.api.post('products/getRelated', param).subscribe(function (data) {
            console.log('=>related=>', data);
            _this.dummyTopProducts = [];
            if (data && data.status === 200 && data.data && data.data.length) {
                var products = data.data;
                _this.related = products.filter(function (x) { return x.id !== _this.id; });
            }
        }, function (error) {
            console.log(error);
            _this.dummyTopProducts = [];
        });
    };
    ProductDetailComponent.prototype.checkCartItems = function () {
        var _this = this;
        var item = this.cart.cart.filter(function (x) { return x.id === _this.id; });
        console.log('cart=====>>>>>>', item);
        if (item && item.length) {
            this.quantiy = item[0].quantiy;
            if (this.productt.variations[0]) {
                this.productt.variations[0].items.forEach(function (pageElement) {
                    item[0].variations[0].items.forEach(function (cartElement) {
                        if (pageElement.id == cartElement.id) {
                            pageElement.quantity = cartElement.quantity;
                        }
                    });
                });
            }
        }
    };
    ProductDetailComponent.prototype.addToCart = function () {
        this.quantiy = 1;
        this.productt.quantiy = 1;
        this.cart.addItem(this.productt);
    };
    // addSubToCart(id) {
    //   this.subId = id;
    //   const param = {
    //     id: this.subId
    //   };
    //   this.api.post('products/getById', param).subscribe((data: any) => {
    //     console.log(data), "data";
    //     if (data && data.status === 200 && data.data && data.data.length) {
    //       const info = data.data[0];
    //       this.subProduct = info;
    //       this.subQuantity = 1;
    //       this.subProduct.quantiy = 1;
    //       console.log("sub quantity", this.subProduct.quantiy);
    //       this.cart.subAddItem(this.subProduct,id);
    //     }
    //   });
    // }
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
    //   } else {
    //     this.subQuantity = this.subQuantity - 1;
    //     this.cart.subAddQuantity(this.subQuantity, id);
    //   }
    // }
    ProductDetailComponent.prototype.add = function () {
        this.quantiy = this.quantiy + 1;
        this.cart.addQuantity(this.quantiy, this.id);
    };
    // removeChild(parentId){
    //   console.log(this.cart.cart.length, "cartlength");
    //   const cart = this.cart.cart;
    //   const cartlength = cart.length;
    //   for(let i = 0; i < cartlength; i++){  
    //     console.log(this.cart.cart.length, "cartlength inside" , i);
    //     console.log("this cart", this.cart.cart[i]);
    //     let parent_id = cart[i].parent_id.split(',');
    //     console.log("parentid",parent_id, "id", this.cart.cart[i].id );
    //     for(let j = 0; j < parent_id.length; j++ ){
    //       if(parent_id[j] == parentId){
    //         this.childrenId.push(cart[i].id);
    //       }
    //     }
    //   }
    //   this.cart.removeChild(this.childrenId);
    // }
    ProductDetailComponent.prototype.remove = function () {
        if (this.quantiy === 1) {
            if (this.productt.variations[0]) {
                this.productt.variations[0].items.forEach(function (element) {
                    element.quantity = 0;
                });
            }
            this.quantiy = 0;
            this.cart.removeItem(this.id);
            // this.removeChild(this.id);
        }
        else {
            this.quantiy = this.quantiy - 1;
            this.cart.addQuantity(this.quantiy, this.id);
        }
    };
    ProductDetailComponent.prototype.addAddOn = function (item, parent) {
        var _this = this;
        // this.parentId = id;
        // const param = {
        //   id: this.parentId
        // };
        console.log("item", item, parent);
        var id = item.id;
        this.productt.variations[0].items.forEach(function (element) {
            if (element.id == id) {
                console.log("element id", element.id, id);
                element.quantity = element.quantity + 1;
                console.log(_this.variations[0].items);
                _this.cart.addAddOn(id, parent, element.quantity);
            }
        });
    };
    ProductDetailComponent.prototype.minusAddOn = function (item, parent) {
        var _this = this;
        // this.parentId = id;
        // const param = {
        //   id: this.parentId
        // };
        console.log("item", item, parent);
        var id = item.id;
        this.productt.variations[0].items.forEach(function (element) {
            if (element.id == id) {
                console.log("element id", element.id, id);
                element.quantity = element.quantity - 1;
                console.log(_this.variations[0].items);
                _this.cart.addAddOn(id, parent, element.quantity);
            }
        });
    };
    ProductDetailComponent.prototype.getQuanity = function () {
        var _this = this;
        var data = this.cart.cart.filter(function (x) { return x.id === _this.id; });
        this.quantiy = data[0].quantiy;
        return data[0].quantiy;
    };
    ProductDetailComponent.prototype.getAddOnQuantity = function (id) {
        var _this = this;
        var data = this.cart.cart.filter(function (x) { return x.id === _this.id; });
        if (data.length > 0) {
            if (this.productt.variations[0]) {
                data[0].variations[0].items.forEach(function (cartElement) {
                    if (id == cartElement.id) {
                        _this.productt.variations[0].items.forEach(function (pageElement) {
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
    ProductDetailComponent.prototype.getSubQuanity = function (id) {
        var data = this.cart.cart.filter(function (x) { return x.id === id; });
        console.log("getSubQuanity", data);
        var quantity = data[0].quantiy;
        return quantity;
    };
    ProductDetailComponent.prototype.ngOnInit = function () {
    };
    ProductDetailComponent.prototype.goToProductDetail = function (item) {
        this.id = item.id;
        this.name = '';
        this.loaded = false;
        this.getProduct();
    };
    ProductDetailComponent.prototype.scrollRighttopContent = function () {
        this.topContent.nativeElement.scrollLeft += 450;
    };
    ProductDetailComponent.prototype.scrollLefttopContent = function () {
        this.topContent.nativeElement.scrollLeft -= 450;
    };
    __decorate([
        core_1.ViewChild('topContent', { read: core_1.ElementRef })
    ], ProductDetailComponent.prototype, "topContent");
    ProductDetailComponent = __decorate([
        core_1.Component({
            selector: 'app-product-detail',
            templateUrl: './product-detail.component.html',
            styleUrls: ['./product-detail.component.scss']
        })
    ], ProductDetailComponent);
    return ProductDetailComponent;
}());
exports.ProductDetailComponent = ProductDetailComponent;
