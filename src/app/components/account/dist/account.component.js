"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AccountComponent = void 0;
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
var AccountComponent = /** @class */ (function () {
    function AccountComponent(router, util, api) {
        this.router = router;
        this.util = util;
        this.api = api;
        this.myaddress = [];
        this.address = '';
        this.house = '';
        this.landmark = '';
        this.title = 'home';
        this.pincode = '';
        this.dragged = false;
        this.currentDiv = 1;
        console.log(this.util.userInfo);
        if (this.util && this.util.userInfo) {
            var info = this.util.userInfo;
            this.fname = info.first_name;
            this.lname = info.last_name;
            this.mobile = info.mobile;
            this.email = info.email;
            this.profile = info.cover;
        }
        else {
            this.getProfile();
        }
    }
    AccountComponent.prototype.ngOnInit = function () {
    };
    AccountComponent.prototype.showPosition = function (position) {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
    };
    AccountComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        var mapOptions = {
            center: { lat: 31.92923, lng: 34.86563 },
            zoom: 15
        };
        this.map = new google.maps.Map(document.getElementById("map"), mapOptions);
        // navigator.permissions &&
        // navigator.permissions.query({name: 'geolocation'}).then(function(PermissionStatus) {
        //   if('granted' === PermissionStatus.state) {
        //       // navigator.geolocation.getCurrentPosition(function(geoposition) {
        //       //     console.log(geoposition) 
        //       // })
        //   }else{
        //     window.alert("Please enable location ");
        //   }
        // })
        if (navigator.geolocation) {
            this.watchIdAccount = navigator.geolocation.watchPosition(function (res) {
                console.log("latlng", res.coords.latitude);
                _this.latitude = res.coords.latitude;
                _this.longitude = res.coords.longitude;
                var geocoder = new google.maps.Geocoder();
                _this.geocodeLatLng(geocoder, _this.map);
                if (!_this.dragged) {
                    var gps = new google.maps.LatLng(_this.latitude, _this.longitude);
                    if (_this.marker == null) {
                        _this.marker = new google.maps.Marker({
                            position: gps,
                            map: _this.map,
                            draggable: true,
                            animation: google.maps.Animation.DROP,
                            title: 'my position'
                        });
                    }
                    else {
                        _this.marker.setPosition(gps);
                    }
                    _this.map.panTo(gps);
                }
                google.maps.event.addListener(_this.marker, "dragend", function () {
                    console.log("latitudelongitude before", _this.latitude, _this.longitude);
                    _this.map.panTo(_this.marker.getPosition());
                    _this.dragged = true;
                    console.log("dragged");
                    _this.latitude = _this.map.center.lat();
                    _this.longitude = _this.map.center.lng();
                    console.log("latitudelongitude after", _this.latitude, _this.longitude);
                    var geocoder = new google.maps.Geocoder();
                    _this.geocodeLatLng(geocoder, _this.map);
                });
            });
        }
        else {
            window.alert("Please enable location ");
        }
    };
    AccountComponent.prototype.ngOnDestroy = function () {
        navigator.geolocation.clearWatch(this.watchIdAccount);
    };
    AccountComponent.prototype.geocodeLatLng = function (geocoder, map) {
        var _this = this;
        // const input = (document.getElementById("latlng") as HTMLInputElement).value;
        // const latlngStr = input.split(",", 2);
        var latlng = {
            lat: parseFloat(this.latitude),
            lng: parseFloat(this.longitude)
        };
        geocoder.geocode({ location: latlng }, function (results, status) {
            if (status === "OK") {
                if (results[0]) {
                    map.setZoom(15);
                    // const marker = new google.maps.Marker({
                    //   position: latlng,
                    //   map: map,
                    // });
                    console.log("physical address", results[0].formatted_address);
                    _this.address = results[0].formatted_address;
                    // infowindow.open(map, marker);
                }
                else {
                    window.alert("No results found");
                }
            }
            else {
                window.alert("Geocoder failed due to: " + status);
            }
        });
    };
    AccountComponent.prototype.goToOrder = function () {
        this.router.navigate(['/orders']);
    };
    AccountComponent.prototype.goToAddress = function () {
        this.currentDiv = 2;
        this.getAddress();
    };
    AccountComponent.prototype.getAddress = function () {
        var _this = this;
        var param = {
            id: localStorage.getItem('uid')
        };
        this.myaddress = [];
        this.util.start();
        this.api.post('address/getByUid', param).subscribe(function (data) {
            console.log(data);
            _this.util.stop();
            if (data && data.status === 200 && data.data.length) {
                _this.myaddress = data.data;
            }
        }, function (error) {
            console.log(error);
            _this.util.stop();
            _this.util.toast('error', _this.util.getString('Error'), _this.util.getString('Something went wrong'));
        });
    };
    AccountComponent.prototype.goToEditProfile = function () {
        this.router.navigate(['/edit-profile']);
    };
    AccountComponent.prototype.goToPayment = function () {
        this.router.navigate(['/payment-method']);
    };
    AccountComponent.prototype.openProfile = function () {
        this.currentDiv = 1;
    };
    AccountComponent.prototype.logout = function () {
        var city = localStorage.getItem('city');
        localStorage.clear();
        this.util.userInfo = null;
        localStorage.setItem('city', city);
        this.router.navigate(['']);
    };
    AccountComponent.prototype.reset = function () {
        this.router.navigate(['reset']);
    };
    AccountComponent.prototype.update = function () {
        var _this = this;
        if (!this.fname || this.fname === '' || !this.lname || this.lname === '') {
            this.util.toast('error', this.util.getString('Error'), 'All Fields are required');
            return false;
        }
        var param = {
            first_name: this.fname,
            last_name: this.lname,
            email: this.email,
            mobile: this.mobile,
            id: localStorage.getItem('uid'),
            cover: this.profile
        };
        this.util.start();
        this.api.post('users/edit_profile', param).subscribe(function (data) {
            _this.util.stop();
            console.log(data);
            _this.getProfile();
        }, function (error) {
            _this.util.stop();
            console.log(error);
        });
    };
    AccountComponent.prototype.getProfile = function () {
        var _this = this;
        var param = {
            id: localStorage.getItem('uid')
        };
        this.util.start();
        this.api.post('users/getById', param).subscribe(function (data) {
            _this.util.stop();
            console.log('user info=>', data);
            if (data && data.status === 200 && data.data && data.data.length) {
                var info = data.data[0];
                _this.util.userInfo = info;
                _this.fname = info.first_name;
                _this.lname = info.last_name;
                _this.mobile = info.mobile;
                _this.email = info.email;
            }
        }, function (error) {
            console.log(error);
            _this.util.stop();
        });
    };
    AccountComponent.prototype.updateAddress = function (info) {
        console.log(info);
        this.newAddress = false;
        this.id = info.id;
        this.address = info.address;
        this.pincode = info.pincode;
        this.house = info.house;
        this.landmark = info.landmark;
        this.lat = info.lat;
        this.lng = info.lng;
        this.title = info.title;
        this.addressModal.show();
    };
    AccountComponent.prototype.actionAddress = function () {
        var _this = this;
        if (this.newAddress) {
            console.log('new address');
            if (this.address === '' || this.landmark === '' || this.house === '' || this.pincode === '' || this.title === '') {
                this.util.toast('error', this.util.getString('Error'), 'All Fields are required');
                return false;
            }
            if (!this.lat || this.lat === '' || !this.lng || this.lng === '') {
                this.addressModal.hide();
                var geocoder = new google.maps.Geocoder;
                geocoder.geocode({ address: this.house + ' ' + this.landmark + ' ' + this.address + ' ' + this.pincode }, function (results, status) {
                    console.log(results, status);
                    if (status === 'OK' && results && results.length) {
                        _this.lat = results[0].geometry.location.lat();
                        _this.lng = results[0].geometry.location.lng();
                        console.log('----->', _this.lat, _this.lng);
                        console.log('call api');
                        _this.util.start();
                        var param = {
                            uid: localStorage.getItem('uid'),
                            address: _this.address,
                            lat: _this.lat,
                            lng: _this.lng,
                            title: _this.title,
                            house: _this.house,
                            landmark: _this.landmark,
                            pincode: _this.pincode
                        };
                        _this.api.post('address/save', param).subscribe(function (data) {
                            _this.util.stop();
                            _this.landmark = '';
                            _this.lat = '';
                            _this.lng = '';
                            _this.title = '';
                            _this.house = '';
                            _this.pincode = '';
                            _this.address = '';
                            if (data && data.status === 200) {
                                // this.navCtrl.back();
                                _this.getAddress();
                                // this.util.showToast('Address added', 'success', 'bottom');
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
                                    title: 'Address added'
                                });
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
                        _this.util.toast('error', _this.util.getString('Error'), _this.util.getString('Something went wrong'));
                        return false;
                    }
                });
            }
        }
        else {
            console.log('update address');
            if (this.address === '' || this.landmark === '' || this.house === '' || this.pincode === '' || this.title === '') {
                this.util.toast('error', this.util.getString('Error'), 'All Fields are required');
                return false;
            }
            this.addressModal.hide();
            var geocoder = new google.maps.Geocoder;
            geocoder.geocode({ address: this.house + ' ' + this.landmark + ' ' + this.address + ' ' + this.pincode }, function (results, status) {
                console.log(results, status);
                if (status === 'OK' && results && results.length) {
                    _this.lat = results[0].geometry.location.lat();
                    _this.lng = results[0].geometry.location.lng();
                    console.log('----->', _this.lat, _this.lng);
                    console.log('call api');
                    _this.util.start();
                    var param = {
                        uid: localStorage.getItem('uid'),
                        address: _this.address,
                        lat: _this.lat,
                        lng: _this.lng,
                        title: _this.title,
                        house: _this.house,
                        landmark: _this.landmark,
                        pincode: _this.pincode,
                        id: _this.id
                    };
                    _this.api.post('address/editList', param).subscribe(function (data) {
                        _this.util.stop();
                        _this.landmark = '';
                        _this.lat = '';
                        _this.lng = '';
                        _this.title = '';
                        _this.house = '';
                        _this.pincode = '';
                        _this.address = '';
                        if (data && data.status === 200) {
                            // this.navCtrl.back();
                            _this.getAddress();
                            // this.util.showToast('Address added', 'success', 'bottom');
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
                                title: 'Address added'
                            });
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
                    _this.util.toast('error', _this.util.getString('Error'), _this.util.getString('Something went wrong'));
                    return false;
                }
            });
        }
    };
    AccountComponent.prototype.deleteAddress = function (item) {
        var _this = this;
        console.log(item);
        sweetalert2_1["default"].fire({
            title: 'Are you sure',
            text: 'to delete this address',
            icon: 'error',
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: 'Delete',
            backdrop: false,
            background: 'white'
        }).then(function (status) {
            if (status && status.value) {
                console.log('delete');
                var param = {
                    id: item.id
                };
                _this.util.start();
                _this.api.post('address/deleteList', param).subscribe(function (info) {
                    console.log(info);
                    _this.util.stop();
                    _this.getAddress();
                }, function (error) {
                    console.log(error);
                    _this.util.stop();
                    _this.util.toast('error', 'Erro', 'Something went wrong');
                });
            }
        });
    };
    AccountComponent.prototype.addNewAddress = function () {
        this.newAddress = true;
        this.landmark = '';
        this.lat = '';
        this.lng = '';
        this.title = '';
        this.house = '';
        this.pincode = '';
        // this.address = '';
        this.id = '';
        this.addressModal.show();
    };
    AccountComponent.prototype.goChat = function () {
        this.router.navigate(['chats']);
    };
    AccountComponent.prototype.preview_banner = function (files) {
        // console.log('fle', files);
        // this.banner_to_upload = [];
        // if (files.length === 0)
        //   return;
        var _this = this;
        // var mimeType = files[0].type;
        // if (mimeType.match(/image\/*/) == null) {
        //   return;
        // }
        // this.banner_to_upload = files;
        // this.uploadImage();
        console.log('fle', files);
        if (files.length === 0) {
            return;
        }
        var mimeType = files[0].type;
        if (mimeType.match(/image\/*/) == null) {
            return;
        }
        if (files) {
            console.log('ok');
            this.util.start();
            this.api.uploadFile(files).subscribe(function (data) {
                console.log('==>>', data);
                if (data && data.status === 200 && data.data) {
                    _this.profile = data.data;
                    var param = {
                        id: localStorage.getItem('uid'),
                        cover: _this.profile
                    };
                    _this.api.post('users/edit_profile', param).subscribe(function (data) {
                        _this.util.stop();
                        console.log(data);
                        _this.getProfile();
                    }, function (error) {
                        _this.util.stop();
                        console.log(error);
                    });
                }
                else {
                    _this.util.stop();
                }
            }, function (err) {
                console.log(err);
                _this.util.stop();
            });
        }
        else {
            console.log('no');
        }
    };
    __decorate([
        core_1.ViewChild('addressModal')
    ], AccountComponent.prototype, "addressModal");
    __decorate([
        core_1.ViewChild('map', { static: true })
    ], AccountComponent.prototype, "mapEle");
    AccountComponent = __decorate([
        core_1.Component({
            selector: 'app-account',
            templateUrl: './account.component.html',
            styleUrls: ['./account.component.scss']
        })
    ], AccountComponent);
    return AccountComponent;
}());
exports.AccountComponent = AccountComponent;
