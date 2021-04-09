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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.OrderDetailComponent = void 0;
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
var OrderDetailComponent = /** @class */ (function () {
    function OrderDetailComponent(router, route, api, util, navCtrl) {
        var _this = this;
        this.router = router;
        this.route = route;
        this.api = api;
        this.util = util;
        this.navCtrl = navCtrl;
        this.orderDetail = [];
        this.orders = [];
        this.status = [];
        this.driverInfo = [];
        this.acceptedDriverInfo = [];
        this.stores = [];
        this.route.queryParams.subscribe(function (data) {
            console.log(data);
            if (data && data.id) {
                _this.id = data.id;
                _this.loaded = false;
                _this.getOrder();
            }
            else {
                _this.navCtrl.back();
            }
        });
    }
    OrderDetailComponent.prototype.getOrder = function () {
        var _this = this;
        var param = {
            id: this.id
        };
        this.api.post('orders/getById', param).subscribe(function (data) {
            console.log(data);
            _this.loaded = true;
            if (data && data.status === 200 && data.data.length > 0) {
                var info = data.data[0];
                console.log(info);
                _this.orderDetail = JSON.parse(info.notes);
                var order_1 = JSON.parse(info.orders);
                console.log('order=====>>', order_1);
                var finalOrder_1 = [];
                var ids = __spreadArrays(new Set(order_1.map(function (item) { return item.store_id; })));
                ids.forEach(function (element) {
                    var param = {
                        id: element,
                        order: []
                    };
                    finalOrder_1.push(param);
                });
                ids.forEach(function (element, index) {
                    order_1.forEach(function (cart) {
                        if (cart.variations && cart.variations !== '' && typeof cart.variations === 'string') {
                            cart.variations = JSON.parse(cart.variations);
                            console.log(cart['variant']);
                            if (cart["variant"] === undefined) {
                                cart['variant'] = 0;
                            }
                        }
                        if (cart.store_id === element) {
                            finalOrder_1[index].order.push(cart);
                        }
                    });
                });
                console.log('final order', finalOrder_1);
                _this.orders = finalOrder_1;
                _this.status = JSON.parse(info.status);
                console.log('order status--------------------', _this.status);
                var status = _this.status.filter(function (x) { return x.status === 'created'; });
                if (status.length === _this.status.length) {
                    _this.canCancle = true;
                }
                else {
                    _this.canCancle = false;
                }
                var delivered = _this.status.filter(function (x) { return x.status === 'delivered'; });
                if (delivered.length === _this.status.length) {
                    _this.isDelivered = true;
                }
                else {
                    _this.isDelivered = false;
                }
                if (info.paid_method == "online") {
                    _this.cashPaid = "Paid";
                }
                else {
                    if (info.paid_method == "cod" && _this.isDelivered) {
                        _this.cashPaid = "Paid";
                    }
                    else if (info.paid_method == "cod" && !_this.isDelivered) {
                        _this.cashPaid = "Pending";
                    }
                }
                // if()
                _this.datetime = moment(info.date_time).format('dddd, MMMM Do YYYY');
                _this.payMethod = info.paid_method === 'cod' ? 'COD' : 'Easy Card';
                _this.orderAt = info.order_to;
                _this.driverId = info.driver_id;
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
                if (_this.driverId && _this.driverId !== '') {
                    var userinfo = {
                        id: _this.driverId
                    };
                    _this.api.post('drivers/getDriversData', userinfo).subscribe(function (data) {
                        console.log('driverid>', data);
                        if (data && data.status === 200 && data.data && data.data.length) {
                            // this.driverInfo = data.data;
                            data.data.forEach(function (element) { return __awaiter(_this, void 0, void 0, function () {
                                var orderParam;
                                var _this = this;
                                return __generator(this, function (_a) {
                                    orderParam = {
                                        id: this.id
                                    };
                                    this.api.post('acceptedorders/getByOrderId', orderParam).subscribe(function (accepteddata) {
                                        if (accepteddata && accepteddata.status === 200 && accepteddata.data.length > 0) {
                                            accepteddata.data.forEach(function (acceptedElement) { return __awaiter(_this, void 0, void 0, function () {
                                                return __generator(this, function (_a) {
                                                    if (acceptedElement.driver_id == element.id) {
                                                        this.acceptedDriverInfo.push(element);
                                                        console.log("yes", element.first_name);
                                                        console.log("yes", this.acceptedDriverInfo);
                                                    }
                                                    return [2 /*return*/];
                                                });
                                            }); });
                                        }
                                    });
                                    return [2 /*return*/];
                                });
                            }); });
                        }
                    }, function (error) {
                        console.log(error);
                    });
                }
                var stores = {
                    id: info.store_id
                };
                _this.api.post('stores/getStoresData', stores).subscribe(function (data) {
                    console.log('store=-============>>', data);
                    console.log('store=-============>>', data);
                    if (data && data.status === 200 && data.data.length) {
                        _this.stores = data.data;
                    }
                    else {
                        // this.util.showToast('No Stores Found', 'danger', 'bottom');
                        _this.util.toast('error', _this.util.getString('Error'), _this.util.getString('No Stores Found'));
                        _this.back();
                    }
                }, function (error) {
                    console.log('error', error);
                    _this.util.toast('error', _this.util.getString('Error'), _this.util.getString('Something went wrong'));
                });
                if (_this.orderAt === 'home') {
                    var address = JSON.parse(info.address);
                    console.log('---address', address);
                    if (address && address.address) {
                        _this.userLat = address.lat;
                        _this.userLng = address.lng;
                        _this.address = address.landmark + ' ' + address.house + ' ' + address.address + ' ' + address.pincode;
                        // this.getDrivers();
                    }
                }
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
    OrderDetailComponent.prototype.ngOnInit = function () {
    };
    OrderDetailComponent.prototype.getDrivers = function () {
        var param = {
            id: this.driverId
        };
        this.api.post('drivers/getById', param).subscribe(function (data) {
            console.log(data);
        }, function (error) {
            console.log(error);
        });
    };
    OrderDetailComponent.prototype.getStoreName = function (id) {
        var item = this.stores.filter(function (x) { return x.uid === id; });
        if (item && item.length) {
            return item[0].name;
        }
        return 'Store';
    };
    OrderDetailComponent.prototype.getOrderStatus = function (id) {
        var item = this.status.filter(function (x) { return x.id === id; });
        if (item && item.length) {
            return item[0].status;
        }
        return 'created';
    };
    OrderDetailComponent.prototype.goToTracker = function () {
        this.router.navigate(['/tracker']);
    };
    OrderDetailComponent.prototype.back = function () {
        this.navCtrl.back();
    };
    OrderDetailComponent.prototype.contanct = function (item) {
        console.log(item);
    };
    OrderDetailComponent.prototype.contanctDriver = function (item) {
        console.log(item);
    };
    OrderDetailComponent = __decorate([
        core_1.Component({
            selector: 'app-order-detail',
            templateUrl: './order-detail.component.html',
            styleUrls: ['./order-detail.component.scss']
        })
    ], OrderDetailComponent);
    return OrderDetailComponent;
}());
exports.OrderDetailComponent = OrderDetailComponent;
