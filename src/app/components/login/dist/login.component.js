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
exports.LoginComponent = void 0;
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
var sweetalert2_1 = require("sweetalert2");
var environment_1 = require("../../../environments/environment");
var app_1 = require("firebase/app");
require("firebase/auth");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(router, util, api, navCtrl) {
        this.router = router;
        this.util = util;
        this.api = api;
        this.navCtrl = navCtrl;
        this.email = '';
        this.password = '';
        this.otpSent = false;
        this.otpVerified = false;
        this.phoneNumber = "";
        this.newPhoneNumber = "";
        this.selectedCountry = "";
        this.phoneNumberExist = false;
        if (!app_1["default"].apps.length) {
            app_1["default"].initializeApp(environment_1.environment.firebase);
        }
        else {
            app_1["default"].app();
        }
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent.prototype.goToRegister = function () {
        this.router.navigate(['/register']);
    };
    LoginComponent.prototype.goToHome = function () {
        var _this = this;
        if (!this.email || !this.password) {
            this.util.toast('error', this.util.getString('Error'), this.util.getString('All Fields are required'));
            return false;
        }
        var emailfilter = /^[\w._-]+[+]?[\w._-]+@[\w.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailfilter.test(this.email)) {
            this.util.toast('error', this.util.getString('Error'), this.util.getString('Please enter valid email'));
            return false;
        }
        var param = {
            email: this.email,
            password: this.password
        };
        this.util.start();
        this.api.post('users/login', param).subscribe(function (data) {
            _this.util.stop();
            console.log(data);
            if (data && data.status === 200) {
                if (data && data.data && data.data.type === 'user') {
                    console.log("datastatus", data.data.status);
                    if (data.data.status === '1') {
                        localStorage.setItem('uid', data.data.id);
                        _this.util.userInfo = data.data;
                        var Toast = sweetalert2_1["default"].mixin({
                            toast: true,
                            position: 'bottom-end',
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true,
                            onOpen: function (toast) {
                                toast.addEventListener('mouseenter', sweetalert2_1["default"].stopTimer);
                                toast.addEventListener('mouseleave', sweetalert2_1["default"].resumeTimer);
                            }
                        });
                        Toast.fire({
                            icon: 'success',
                            title: _this.util.getString('Signed in successfully')
                        });
                        // this.router.navigate(['/home']);
                        _this.navCtrl.back();
                    }
                    else {
                        console.log('not valid');
                        sweetalert2_1["default"].fire({
                            title: _this.util.getString('Error'),
                            text: _this.util.getString('Your are blocked please contact administrator'),
                            icon: 'error',
                            showConfirmButton: true,
                            showCancelButton: true,
                            confirmButtonText: _this.util.getString('Need Help?'),
                            backdrop: false,
                            background: 'white'
                        }).then(function (status) {
                            if (status && status.value) {
                                localStorage.setItem('helpId', data.data.id);
                                _this.router.navigate(['inbox']);
                            }
                        });
                    }
                }
                else {
                    _this.util.toast('error', _this.util.getString('Error'), _this.util.getString('Not valid user'));
                    _this.email = '';
                    _this.password = '';
                }
            }
            else if (data && data.status === 500) {
                _this.util.toast('error', _this.util.getString('Error'), data.data.message);
            }
            else {
                _this.util.toast('error', _this.util.getString('Error'), _this.util.getString('Something went wrong'));
            }
        }, function (error) {
            console.log(error);
            _this.util.stop();
            _this.util.toast('error', _this.util.getString('Error'), _this.util.getString('Something went wrong'));
        });
    };
    LoginComponent.prototype.reset = function () {
        console.log('reset password');
        this.router.navigate(['reset']);
    };
    LoginComponent.prototype.sendOTP = function () {
        return __awaiter(this, void 0, void 0, function () {
            var concatphone, orderParam;
            var _this = this;
            return __generator(this, function (_a) {
                this.util.start();
                if (this.newPhoneNumber != '') {
                    if (this.newPhoneNumber.startsWith("0")) {
                        this.newPhoneNumber = this.newPhoneNumber.replace(/^0+/, '');
                    }
                    concatphone = "972" + this.newPhoneNumber;
                    this.phoneNumber = concatphone;
                    orderParam = {
                        phonenumber: concatphone
                    };
                    this.api.post("users/checkphone/", orderParam).subscribe(function (data) {
                        _this.util.stop();
                        console.log("checkphone response", data);
                        console.log(data);
                        if (data && data.status === 200) {
                            if (data && data.data[0] && data.data[0].type === 'user') {
                                if (data.data[0].status === '1') {
                                    _this.userid = data.data[0].id;
                                    if ((localStorage.getItem("fuid") == "") || (typeof localStorage.getItem("fuid") === undefined)) {
                                        _this.getOTP();
                                    }
                                    else {
                                        var fuid = localStorage.getItem("fuid");
                                        if (fuid == _this.userid) {
                                            localStorage.setItem('uid', _this.userid);
                                            _this.router.navigate(['']);
                                        }
                                        else {
                                            _this.getOTP();
                                        }
                                    }
                                    _this.util.userInfo = data.data[0];
                                }
                                else {
                                    console.log('not valid');
                                    sweetalert2_1["default"].fire({
                                        title: _this.util.getString('Error'),
                                        text: _this.util.getString('please wait for admin to activate your account'),
                                        icon: 'error',
                                        showConfirmButton: true,
                                        showCancelButton: true,
                                        confirmButtonText: _this.util.getString('Need Help?'),
                                        backdrop: false,
                                        background: 'white'
                                    }).then(function (status) {
                                        if (status && status.value) {
                                            localStorage.setItem('helpId', data.data.id);
                                            _this.router.navigate(['inbox']);
                                        }
                                        else {
                                            _this.otpSent = false;
                                            _this.router.navigate(['/login']);
                                        }
                                    });
                                }
                            }
                            else {
                                _this.util.toast('error', _this.util.getString('Error'), _this.util.getString('Not valid user'));
                                _this.email = '';
                                _this.password = '';
                            }
                        }
                        else if (data && data.status === 500) {
                            _this.util.toast('error', _this.util.getString('Error'), data.data);
                        }
                        else {
                            _this.util.toast('error', _this.util.getString('Error'), _this.util.getString('Something went wrong'));
                        }
                    }, function (error) {
                        console.log(error);
                        _this.util.stop();
                        _this.util.toast('error', _this.util.getString('Error'), _this.util.getString('Something went wrong'));
                    });
                }
                else {
                    this.util.toast('error', this.util.getString('Error'), this.util.getString('Enter Your Number'));
                }
                return [2 /*return*/];
            });
        });
    };
    LoginComponent.prototype.getOTP = function () {
        return __awaiter(this, void 0, void 0, function () {
            var concatphone;
            var _this = this;
            return __generator(this, function (_a) {
                concatphone = "+972" + this.newPhoneNumber;
                this.util.start();
                this.recaptchaVerifier = new app_1["default"].auth.RecaptchaVerifier('recaptcha-container', { 'size': 'invisible' });
                app_1["default"].auth().signInWithPhoneNumber(concatphone, this.recaptchaVerifier).then(function (data) {
                    _this.otpSent = true;
                    _this.otpconfirmationResult = data;
                    _this.util.stop();
                })["catch"](function (err) {
                    console.log(err);
                    _this.util.stop();
                });
                return [2 /*return*/];
            });
        });
    };
    LoginComponent.prototype.otpNumber = function (event) {
        this.newOtpNumber = event.target.value;
    };
    LoginComponent.prototype.phoneNumberChange = function (event) {
        this.newPhoneNumber = event.target.value;
        console.log(this.newPhoneNumber);
    };
    LoginComponent.prototype.verifyOTP = function () {
        return __awaiter(this, void 0, void 0, function () {
            var otpphone;
            var _this = this;
            return __generator(this, function (_a) {
                otpphone = this.newOtpNumber;
                this.util.start();
                if (otpphone != '') {
                    this.otpconfirmationResult.confirm(otpphone).then(function (data) {
                        console.log(data);
                        if (data) {
                            console.log("phone number before send", _this.phoneNumber);
                            localStorage.setItem('uid', _this.userid);
                            localStorage.setItem('fuid', _this.userid);
                            var fcm = localStorage.getItem('fcm');
                            if (fcm && fcm !== null && fcm !== 'null') {
                                var updateParam = {
                                    id: _this.userid,
                                    fcm_token: fcm
                                };
                                _this.api.post('users/edit_profile', updateParam).subscribe(function (data) {
                                    console.log('user info=>', data);
                                }, function (error) {
                                    console.log(error);
                                });
                            }
                            var favParam = {
                                id: _this.userid
                            };
                            _this.api.post('favourite/getByUid', favParam).subscribe(function (data) {
                                console.log('fav data', data);
                                if (data && data.status === 200 && data.data.length > 0) {
                                    _this.util.haveFav = true;
                                    try {
                                        _this.util.favIds = data.data[0].ids.split(',');
                                    }
                                    catch (error) {
                                        console.log('eroor', error);
                                    }
                                }
                                else {
                                    _this.util.haveFav = false;
                                }
                            }, function (error) {
                                _this.util.haveFav = false;
                                console.log('fav error', error);
                            });
                            _this.router.navigate(['']);
                            _this.util.stop();
                        }
                        // You can redirect to other protected route.
                    })["catch"](function (err) {
                        console.log(err);
                        _this.util.stop();
                        _this.util.toast('error', _this.util.getString('Error'), _this.util.getString('Enter a valid OTP'));
                    });
                }
                else {
                    this.util.toast('error', this.util.getString('Error'), this.util.getString('Enter the otp received in your given phone number'));
                }
                return [2 /*return*/];
            });
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.scss']
        })
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
