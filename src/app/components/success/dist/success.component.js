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
exports.SuccessComponent = void 0;
var core_1 = require("@angular/core");
var moment = require("moment");
var SuccessComponent = /** @class */ (function () {
    function SuccessComponent(route, router, cart, util, api) {
        var _this = this;
        this.route = route;
        this.router = router;
        this.cart = cart;
        this.util = util;
        this.api = api;
        this.orderStatus = 1;
        this.date_time = localStorage.getItem('datetime');
        this.delivery_at = localStorage.getItem('deliveryAt');
        this.delivery_address = "";
        this.driver_id = "";
        console.log("cart details", this.cart);
        if (this.delivery_at === 'home') {
            this.delivery_address = JSON.parse(localStorage.getItem('deliveryAddress'));
            this.driver_id = localStorage.getItem('driverid');
            console.log("delivery Address", this.delivery_address);
        }
        this.route.queryParams.subscribe(function (params) {
            console.log("param", params);
            console.log("thiscart", _this.cart);
            _this.orderStatus = parseInt(params.Code);
            if (_this.orderStatus == 0) {
                _this.createOrder();
            }
        });
    }
    SuccessComponent.prototype.ngOnInit = function () {
    };
    SuccessComponent.prototype.createOrder = function () {
        return __awaiter(this, void 0, void 0, function () {
            var storeId, orderStatus, notes, param;
            var _this = this;
            return __generator(this, function (_a) {
                storeId = __spreadArrays(new Set(this.cart.cart.map(function (item) { return item.store_id; })));
                orderStatus = [];
                storeId.forEach(function (element) {
                    var info = {
                        id: element,
                        status: 'created'
                    };
                    orderStatus.push(info);
                });
                notes = [
                    {
                        status: 1,
                        value: 'Order Created',
                        time: moment().format('lll')
                    }
                ];
                param = {
                    uid: localStorage.getItem('uid'),
                    store_id: storeId.join(),
                    date_time: this.date_time === 'today' ? moment().format('YYYY-MM-DD HH:mm:ss') : moment().add(1, 'days').format('YYYY-MM-DD HH:mm:ss'),
                    paid_method: 'online',
                    order_to: this.delivery_at,
                    orders: JSON.stringify(this.cart.cart),
                    notes: JSON.stringify(notes),
                    address: this.delivery_at === 'home' ? JSON.stringify(this.delivery_address) : '',
                    driver_id: this.delivery_at === 'home' ? this.driver_id : '',
                    total: this.cart.totalPrice,
                    tax: this.cart.orderTax,
                    grand_total: this.cart.grandTotal,
                    delivery_charge: this.cart.deliveryPrice,
                    coupon_code: this.cart.coupon ? JSON.stringify(this.cart.coupon) : '',
                    discount: this.cart.discount,
                    pay_key: "",
                    status: JSON.stringify(orderStatus),
                    assignee: ''
                };
                console.log('param----->', param);
                this.util.start();
                this.api.post('orders/save', param).subscribe(function (data) {
                    console.log(data);
                    _this.util.stop();
                    _this.api.createOrderNotification(_this.cart.stores);
                    _this.cart.clearCart();
                    _this.util.publishNewOrder();
                    _this.router.navigate(['orders']);
                }, function (error) {
                    console.log(error);
                    _this.util.stop();
                    _this.util.toast('error', _this.util.getString('Error'), _this.util.getString('Something went wrong'));
                });
                return [2 /*return*/];
            });
        });
    };
    SuccessComponent = __decorate([
        core_1.Component({
            selector: 'app-success',
            templateUrl: './success.component.html',
            styleUrls: ['./success.component.scss']
        })
    ], SuccessComponent);
    return SuccessComponent;
}());
exports.SuccessComponent = SuccessComponent;
