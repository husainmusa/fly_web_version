"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = void 0 && (void 0).__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

var __spreadArrays = void 0 && (void 0).__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
    s += arguments[i].length;
  }

  for (var r = Array(s), k = 0, i = 0; i < il; i++) {
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
      r[k] = a[j];
    }
  }

  return r;
};

exports.__esModule = true;
exports.CheckoutComponent = void 0;

var core_1 = require("@angular/core");

var moment = require("moment");

var sweetalert2_1 = require("sweetalert2");

var CheckoutComponent =
/** @class */
function () {
  function CheckoutComponent(api, cart, util, navCtrl, router, razorpayService, cd, route) {
    var _this = this;

    this.api = api;
    this.cart = cart;
    this.util = util;
    this.navCtrl = navCtrl;
    this.router = router;
    this.razorpayService = razorpayService;
    this.cd = cd;
    this.route = route;
    this.selected = 1;
    this.deliveryOption = 'home';
    this.storeAddress = [];
    this.allDriversId = [];
    this.allDrivers = [];
    this.allDriversIdString = "";
    this.myaddress = [];
    this.cards = [];
    this.cnumber = '';
    this.cname = '';
    this.cvc = '';
    this.date = '';
    this.email = '';
    this.address = '';
    this.house = '';
    this.landmark = '';
    this.title = 'home';
    this.pincode = '';
    this.RAZORPAY_OPTIONS = {
      'key': '',
      'amount': 0,
      'name': 'Flyvip',
      'order_id': '',
      'description': 'Flyvip Payment',
      'image': this.api.mediaURL + this.util.logo,
      'prefill': {
        'name': '',
        'email': '',
        'contact': '',
        'method': ''
      },
      'modal': {},
      'theme': {
        'color': '#45C261'
      }
    };
    this.offers = [];
    this.route.queryParams.subscribe(function (data) {
      console.log(data);

      if (data && data.method && data.key) {
        console.log('Checkout data', data); // if()
      } else {
        _this.getPayments();

        _this.addCard = false;

        if (_this.cart.cart.length > 0) {
          _this.getStoreList();
        }

        _this.getAddress();

        _this.getOffers();

        _this.datetime = 'today';
        _this.time = _this.util.getString('Today - ') + moment().format('dddd, MMMM Do YYYY');
        _this.today = moment().format('dddd, MMMM Do YYYY');
        _this.nextDay = moment().add(1, 'days').format('dddd, MMMM Do YYYY');
      }
    });
    var param = {
      id: localStorage.getItem('city')
    };
    this.api.post('drivers/geyByCity', param).subscribe(function (data) {
      _this.allDrivers = data.data;
      console.log(_this.allDrivers, "all drivers");
      var alldid = [];

      for (var i = 0; i < _this.allDrivers.length; i++) {
        alldid.push(_this.allDrivers[i].id);
      }

      _this.allDriversId = alldid.join(",");
      console.log(_this.allDriversId, "all drivers return");
    });

    if (this.cart.util.currecny == '₪') {
      this.currencyValue = 1;
    } else if (this.cart.util.currecny == '$') {
      this.currencyValue = 2;
    } else if (this.cart.util.currecny == '€') {
      this.currencyValue = 5;
    }

    console.log("card details", this.cart);
  }

  CheckoutComponent.prototype.getPayments = function () {
    var _this = this;

    this.api.get('payments').subscribe(function (data) {
      console.log(data);

      if (data && data.status === 200 && data.data) {
        var info = data.data.filter(function (x) {
          return x.status === '1';
        });
        console.log('total payments', info);

        if (info && info.length > 0) {
          console.log('---->>', info);
          _this.cart.havePayment = true;
          var stripe = info.filter(function (x) {
            return x.id === '1';
          });
          var cod = info.filter(function (x) {
            return x.id === '2';
          });
          var paypal = info.filter(function (x) {
            return x.id === '3';
          });
          var razor = info.filter(function (x) {
            return x.id === '4';
          });
          var paytm = info.filter(function (x) {
            return x.id === '5';
          });
          var insta = info.filter(function (x) {
            return x.id === '6';
          });
          var paystack = info.filter(function (x) {
            return x.id === '7';
          });
          var flutterwave = info.filter(function (x) {
            return x.id === '8';
          });
          _this.cart.havePayTM = paytm && paytm.length > 0 ? true : false;
          _this.cart.havePayPal = paypal && paypal.length > 0 ? true : false;
          _this.cart.haveStripe = stripe && stripe.length > 0 ? true : false;
          _this.cart.haveRazor = razor && razor.length > 0 ? true : false;
          _this.cart.haveCOD = cod && cod.length > 0 ? true : false;
          _this.cart.haveInstamojo = insta && insta.length > 0 ? true : false;
          _this.cart.havePayStack = paystack && paystack.length > 0 ? true : false;
          _this.cart.haveFlutterwave = flutterwave && flutterwave.length > 0 ? true : false;

          if (_this.cart.haveStripe) {
            // this.util.stripe = stripe;
            if (stripe) {
              var creds = JSON.parse(stripe[0].creds);

              if (stripe[0].env === '1') {
                _this.util.stripe = creds.live;
              } else {
                _this.util.stripe = creds.test;
              }

              if (_this.util.userInfo && _this.util.userInfo.stripe_key) {
                _this.getCards();
              }

              _this.util.stripeCode = creds && creds.code ? creds.code : 'USD';
            }

            console.log('============>>', _this.util.stripe);
          }

          if (_this.cart.haveInstamojo) {
            var datas = info.filter(function (x) {
              return x.id === '6';
            });
            _this.cart.instaENV = datas[0].env;

            if (insta) {
              var instaPay = JSON.parse(datas[0].creds);
              _this.cart.instamojo = instaPay;
              console.log('instaMOJO', _this.cart.instamojo);
            }
          }

          if (_this.cart.havePayPal) {
            if (paypal) {
              var creds = JSON.parse(paypal[0].creds);

              if (paypal[0].env === '1') {
                _this.util.paypal = creds.live;
              } else {
                _this.util.paypal = creds.test;
              }

              if (_this.cart.havePayPal) {
                _this.initConfig();
              }

              _this.util.paypalCode = creds && creds.code ? creds.code : 'USD';
            }
          }

          if (_this.cart.haveRazor) {
            if (razor) {
              var creds = JSON.parse(razor[0].creds);

              if (razor[0].env === '1') {
                _this.util.razor = creds.live;
              } else {
                _this.util.razor = creds.test;
              }

              if (_this.cart.haveRazor) {
                _this.initRazor();
              }

              _this.util.razorCode = creds && creds.code ? creds.code : 'INR';
            }
          }

          if (_this.cart.havePayTM) {
            if (paytm) {
              var creds = JSON.parse(paytm[0].creds);
              _this.cart.paytmENV = paytm[0].env;
              _this.cart.paytmCreds = creds;
              console.log('creds=============>>>>>>>PAYRMMMMM', creds);
            }
          }

          if (_this.cart.havePayStack) {
            if (paystack) {
              var creds = JSON.parse(paystack[0].creds);
              _this.cart.paystack = creds;
              console.log('paystack creds=======>>>>>', _this.cart.paystack);
            }
          }

          if (_this.cart.haveFlutterwave) {
            if (flutterwave) {
              var creds = JSON.parse(flutterwave[0].creds);
              _this.cart.flutterwave = creds;
              console.log('fluterwave creds=>>', _this.cart.flutterwave);
            }
          }
        } else {
          _this.cart.havePayment = false;

          _this.util.toast('error', _this.util.getString('Error'), _this.util.getString('Something went wrong'));
        }
      } else {
        _this.cart.havePayment = false;

        _this.util.toast('error', _this.util.getString('Error'), _this.util.getString('Something went wrong'));
      }
    }, function (error) {
      console.log(error);
      _this.cart.havePayment = false;

      _this.util.toast('error', _this.util.getString('Error'), _this.util.getString('Something went wrong'));
    });
  };

  CheckoutComponent.prototype.paystackPay = function () {
    var _this = this;

    var handler = PaystackPop.setup({
      key: this.cart.paystack.pk,
      email: this.util.userInfo.email,
      amount: this.cart.grandTotal * 100,
      firstname: this.util.userInfo.first_name,
      lastname: this.util.userInfo.last_name,
      ref: '' + Math.floor(Math.random() * 1000000000 + 1),
      onClose: function onClose() {
        console.log('closed');
      },
      callback: function callback(response) {
        console.log(response); // response.reference

        _this.createOrder('paystack', response.reference);
      }
    });
    handler.openIframe();
  };

  CheckoutComponent.prototype.ngOnInit = function () {};

  CheckoutComponent.prototype.initRazor = function () {
    this.razorpayService.lazyLoadLibrary('https://checkout.razorpay.com/v1/checkout.js').subscribe();
  };

  CheckoutComponent.prototype.handleChange = function (event) {
    console.log(event);
    this.deliveryOption = event;
  };

  CheckoutComponent.prototype.getName = function () {
    return this.util.userInfo && this.util.userInfo.first_name ? this.util.userInfo.first_name + ' ' + this.util.userInfo.last_name : 'Flyvip';
  };

  CheckoutComponent.prototype.getEmail = function () {
    return this.util.userInfo && this.util.userInfo.email ? this.util.userInfo.email : 'info@flyvip.com';
  };

  CheckoutComponent.prototype.instaPay = function () {
    var _this = this;

    var curl;

    if (this.cart.instaENV === '0') {
      curl = 'https://test.instamojo.com/api/1.1/payment-requests/';
    } else {
      curl = 'https://www.instamojo.com/api/1.1/payment-requests/';
    }

    var callbackURL = window.location.origin + '/instamojocallback?method=instamojo&';
    var param = {
      allow_repeated_payments: 'False',
      amount: this.cart.grandTotal,
      name: this.getName(),
      purpose: 'Flyvip order',
      redirect_url: callbackURL,
      phone: this.util.userInfo && this.util.userInfo.mobile ? this.util.userInfo.mobile : '',
      send_email: 'True',
      webhook: this.api.baseUrl,
      send_sms: 'True',
      email: this.getEmail(),
      key: this.cart.instamojo.key,
      token: this.cart.instamojo.token,
      url: curl
    };
    this.util.start();
    this.api.post('users/instamojoRequest', param).subscribe(function (data) {
      console.log(data);

      _this.util.stop();

      if (data && data.status === 200) {
        var info = JSON.parse(data.data);
        console.log('info', info);

        if (info && info.success === true) {
          window.open(info.payment_request.longurl, '_self');
        } else {
          _this.util.toast('error', _this.util.getString('Error'), _this.util.getString('Something went wrong'));
        }
      } else {
        _this.util.toast('error', _this.util.getString('Error'), _this.util.getString('Something went wrong'));
      }
    }, function (error) {
      _this.util.stop();

      _this.util.toast('error', _this.util.getString('Error'), _this.util.getString('Something went wrong'));

      console.log(error);
    });
  };

  CheckoutComponent.prototype.flutterPay = function () {
    var callbackURL = window.location.origin + '/flutterwavecallback?method=flutterwave&';
    FlutterwaveCheckout({
      public_key: this.cart.flutterwave.pk,
      tx_ref: '' + Math.floor(Math.random() * 1000000000 + 1),
      amount: this.cart.grandTotal,
      currency: this.cart.flutterwave.code,
      payment_options: 'card, mobilemoneyghana, ussd',
      redirect_url: // specified redirect URL
      callbackURL,
      meta: {
        consumer_id: 23,
        consumer_mac: '92a3-912ba-1192a'
      },
      customer: {
        email: this.getEmail(),
        phone_number: this.util.userInfo.mobile,
        name: this.getName()
      },
      callback: function callback(data) {
        console.log(data);
      },
      onclose: function onclose() {
        console.log('closed');
      },
      customizations: {
        title: 'Flyvip',
        description: 'Flyvip order',
        logo: this.api.mediaURL + this.util.logo
      }
    });
  };

  CheckoutComponent.prototype.payTm = function () {
    // payFromWeb
    var orderId = this.util.makeid(20);
    var callbackURL = window.location.href + '?method=paytm&key=' + orderId;
    var param = {
      ORDER_ID: orderId,
      CUST_ID: localStorage.getItem('uid'),
      INDUSTRY_TYPE_ID: 'Retail',
      CHANNEL_ID: 'WAP',
      TXN_AMOUNT: this.cart.grandTotal ? this.cart.grandTotal : 5,
      callback: callbackURL
    };
    localStorage.setItem('payTMOrderID', orderId);
    localStorage.setItem('deliveryAt', this.deliveryOption);
    localStorage.setItem('deliveryAddress', JSON.stringify(this.cart.deliveryAddress));
    localStorage.setItem('datetime', this.datetime);
    localStorage.setItem('couponadded', JSON.stringify(this.cart.coupon));
    console.log('to url===>', this.api.JSON_to_URLEncoded(param));
    var url = this.api.baseUrl + 'paytm/payFromWeb?' + this.api.JSON_to_URLEncoded(param);
    window.open(url, '_self');
  };

  CheckoutComponent.prototype.getOffers = function () {
    var _this = this;

    this.api.get('offers').subscribe(function (data) {
      console.log(data);

      if (data && data.status === 200 && data.data && data.data.length) {
        var info = data.data.filter(function (x) {
          return x.status === '1';
        });
        _this.offers = info;
      }
    }, function (error) {
      console.log(error);

      _this.util.toast('error', _this.util.getString('Error'), _this.util.getString('Something went wrong'));
    });
  };

  CheckoutComponent.prototype.initConfig = function () {
    var _this = this;

    this.payPalConfig = {
      currency: this.util.paypalCode,
      clientId: this.util.paypal,
      createOrderOnClient: function createOrderOnClient(data) {
        return {
          intent: 'CAPTURE',
          purchase_units: [{
            amount: {
              currency_code: _this.util.paypalCode,
              value: _this.cart.grandTotal,
              breakdown: {
                item_total: {
                  currency_code: _this.util.paypalCode,
                  value: _this.cart.grandTotal
                }
              }
            }
          }]
        };
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: function onApprove(data, actions) {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then(function (details) {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });
      },
      onClientAuthorization: function onClientAuthorization(data) {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data); // this.showSuccess = true;

        _this.payId = data.id;

        _this.createOrder('paypal', _this.payId);
      },
      onCancel: function onCancel(data, actions) {
        console.log('OnCancel', data, actions); // this.showCancel = true;
      },
      onError: function onError(err) {
        console.log('OnError', err); // this.showError = true;
      },
      onClick: function onClick(data, actions) {
        console.log('onClick', data, actions); // this.resetStatus();
      }
    };
  };

  CheckoutComponent.prototype.getCards = function () {
    var _this = this;

    console.log(this.util.userInfo.stripe_key);
    this.api.httpGet('https://api.stripe.com/v1/customers/' + this.util.userInfo.stripe_key + '/sources?object=card', this.util.stripe).subscribe(function (cards) {
      console.log(cards);

      if (cards && cards.data) {
        _this.cards = cards.data;
        _this.token = _this.cards[0].id;
      }
    }, function (error) {
      console.log(error);

      if (error && error.error && error.error.error && error.error.error.message) {
        _this.util.toast('error', _this.util.getString('Error'), error.error.error.message);

        return false;
      }

      _this.util.toast('error', _this.util.getString('Error'), _this.util.getString('Something went wrong'));
    });
  };

  CheckoutComponent.prototype.proceed = function () {
    this.RAZORPAY_OPTIONS.key = this.util.razor;
    this.RAZORPAY_OPTIONS.amount = this.cart.grandTotal * 100;
    this.RAZORPAY_OPTIONS.prefill.email = this.util.userInfo.email;
    this.RAZORPAY_OPTIONS['handler'] = this.razorPaySuccessHandler.bind(this);
    var razorpay = new Razorpay(this.RAZORPAY_OPTIONS);
    razorpay.open();
  };

  CheckoutComponent.prototype.razorPaySuccessHandler = function (response) {
    console.log('->', response);
    this.payId = response.razorpay_payment_id;
    this.createOrder('razor', this.payId);
    this.cd.detectChanges();
  };

  CheckoutComponent.prototype.addNewAddress = function () {
    this.newAddress.show();
  };

  CheckoutComponent.prototype.addAddress = function () {
    var _this = this;

    if (this.address === '' || this.landmark === '' || this.house === '' || this.pincode === '') {
      this.util.toast('error', this.util.getString('Error'), this.util.getString('All Fields are required'));
      return false;
    }

    if (!this.lat || this.lat === '' || !this.lng || this.lng === '') {
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode({
        address: this.house + ' ' + this.landmark + ' ' + this.address + ' ' + this.pincode
      }, function (results, status) {
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

            _this.newAddress.hide();

            if (data && data.status === 200) {
              // this.navCtrl.back();
              _this.getAddress(); // this.util.showToast('Address added', 'success', 'bottom');


              var Toast = sweetalert2_1["default"].mixin({
                toast: true,
                position: 'bottom-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                onOpen: function onOpen(toast) {
                  toast.addEventListener('mouseenter', sweetalert2_1["default"].stopTimer);
                  toast.addEventListener('mouseleave', sweetalert2_1["default"].resumeTimer);
                }
              });
              Toast.fire({
                icon: 'success',
                title: _this.util.getString('Address added')
              });
            } else {
              _this.util.toast('error', _this.util.getString('Error'), _this.util.getString('Something went wrong'));
            }
          }, function (error) {
            console.log(error);

            _this.util.stop();

            _this.util.toast('error', _this.util.getString('Error'), _this.util.getString('Something went wrong'));
          });
        } else {
          _this.util.toast('error', _this.util.getString('Error'), _this.util.getString('Something went wrong'));

          return false;
        }
      });
    }
  };

  CheckoutComponent.prototype.payWithCard = function () {
    var _this = this;

    console.log(this.token);

    if (this.token) {
      var options = {
        amount: this.cart.grandTotal * 100,
        currency: this.util.stripeCode,
        customer: this.util.userInfo.stripe_key,
        card: this.token
      };
      console.log('options', options);
      var url = 'https://api.stripe.com/v1/charges';
      this.util.start();
      this.api.externalPost(url, options, this.util.stripe).subscribe(function (data) {
        console.log('------------------------->', data);
        _this.payId = data.id;

        _this.util.stop(); // this.util.showToast('Payment Success', 'success', 'bottom');


        var Toast = sweetalert2_1["default"].mixin({
          toast: true,
          position: 'bottom-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          onOpen: function onOpen(toast) {
            toast.addEventListener('mouseenter', sweetalert2_1["default"].stopTimer);
            toast.addEventListener('mouseleave', sweetalert2_1["default"].resumeTimer);
          }
        });
        Toast.fire({
          icon: 'success',
          title: _this.util.getString('Payment Success')
        });

        _this.createOrder('stripe', _this.payId);
      }, function (error) {
        _this.util.stop();

        console.log(error);

        if (error && error.error && error.error.error && error.error.error.message) {
          // this.util.showErrorAlert(error.error.error.message);
          _this.util.toast('error', _this.util.getString('Error'), error.error.error.message);

          return false;
        }

        _this.util.toast('error', _this.util.getString('Error'), _this.util.getString('Something went wrong'));
      });
    } else {
      this.util.toast('error', this.util.getString('Error'), this.util.getString('Please select card'));
    }
  };

  CheckoutComponent.prototype.createOrder = function (payMethod, payKey) {
    return __awaiter(this, void 0, void 0, function () {
      var storeId, orderStatus, notes, param;

      var _this = this;

      return __generator(this, function (_a) {
        storeId = __spreadArrays(new Set(this.cart.cart.map(function (item) {
          return item.store_id;
        })));
        orderStatus = [];
        storeId.forEach(function (element) {
          var info = {
            id: element,
            status: 'created'
          };
          orderStatus.push(info);
        });
        notes = [{
          status: 1,
          value: 'Order Created',
          time: moment().format('lll')
        }];
        param = {
          uid: localStorage.getItem('uid'),
          store_id: storeId.join(),
          date_time: this.cart.datetime === 'today' ? moment().format('YYYY-MM-DD HH:mm:ss') : moment().add(1, 'days').format('YYYY-MM-DD HH:mm:ss'),
          paid_method: payMethod,
          order_to: this.cart.deliveryAt,
          orders: JSON.stringify(this.cart.cart),
          notes: JSON.stringify(notes),
          address: this.cart.deliveryAt === 'home' ? JSON.stringify(this.cart.deliveryAddress) : '',
          driver_id: this.cart.deliveryAt === 'home' ? this.allDriversId : '',
          total: this.cart.totalPrice,
          tax: this.cart.orderTax,
          grand_total: this.cart.grandTotal,
          delivery_charge: this.cart.deliveryPrice,
          coupon_code: this.cart.coupon ? JSON.stringify(this.cart.coupon) : '',
          discount: this.cart.discount,
          pay_key: payKey,
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
        return [2
        /*return*/
        ];
      });
    });
  };

  CheckoutComponent.prototype.getAddress = function () {
    var _this = this;

    var param = {
      id: localStorage.getItem('uid')
    };
    this.myaddress = [];
    this.api.post('address/getByUid', param).subscribe(function (data) {
      console.log('addreess------------', data);

      if (data && data.status === 200 && data.data.length) {
        _this.myaddress = data.data;
      }
    }, function (error) {
      console.log(error);

      _this.util.toast('error', _this.util.getString('Error'), _this.util.getString('Something went wrong'));
    });
  };

  CheckoutComponent.prototype.getStoreList = function () {
    var _this = this;

    var info = __spreadArrays(new Set(this.cart.cart.map(function (item) {
      return item.store_id;
    })));

    console.log('store iddss==================>>', info); // test
    // info.push(10, 17);
    // test

    var param = {
      id: info.join()
    };
    this.api.post('stores/getStoresData', param).subscribe(function (data) {
      console.log(data);

      if (data && data.status === 200 && data.data.length) {
        _this.storeAddress = data.data;
        _this.cart.stores = _this.storeAddress;
      } else {
        _this.util.toast('error', _this.util.getString('Error'), _this.util.getString('Something went wrong')); // this.back();

      }
    }, function (error) {
      console.log('error', error);

      _this.util.toast('error', _this.util.getString('Error'), _this.util.getString('Something went wrong'));
    });
  };

  CheckoutComponent.prototype.back = function () {
    this.navCtrl.back();
  };

  CheckoutComponent.prototype.onSelect = function (data) {
    if (data === 'today') {
      this.datetime = 'today';
      this.time = this.util.getString('Today - ') + moment().format('dddd, MMMM Do YYYY');
    } else {
      this.datetime = 'tomorrow';
      this.time = this.util.getString('Tomorrow - ') + moment().add(1, 'days').format('dddd, MMMM Do YYYY');
    }
  };

  CheckoutComponent.prototype.prev = function () {
    console.log('prev', this.selected);

    if (this.selected === 2) {
      this.selected = 1;
    } else if (this.selected === 3 && this.deliveryOption === 'home') {
      this.selected = 2;
    } else {
      this.selected = 1;
    }
  };

  CheckoutComponent.prototype.next = function () {
    var _this = this;

    console.log('next', this.selected, this.deliveryOption);
    console.log('deliveryadddress', this.selectedAddress);
    this.cart.deliveryAt = this.deliveryOption;
    this.cart.datetime = this.datetime;

    if (this.selected === 1 && this.deliveryOption === 'home') {
      console.log("selected 1 home");
      this.selected = 2;
    } else if (this.selected === 1 && this.deliveryOption === 'store') {
      console.log("selected 1 store");
      this.selected = 3;
    } else if (this.selected === 2 && this.selectedAddress) {
      this.selected = 3;
      var selecte = this.myaddress.filter(function (x) {
        return x.id === _this.selectedAddress;
      });
      var item = selecte[0];
      this.cart.deliveryAddress = item;
    } else if (!this.selectedAddress) {
      console.log("selected wrong");
      this.util.toast('error', this.util.getString('Error'), this.util.getString('Please select address'));
    }

    this.cart.calcuate();
  };

  CheckoutComponent.prototype.add = function (product, index) {
    if (this.cart.cart[index].quantiy > 0) {
      this.cart.cart[index].quantiy = this.cart.cart[index].quantiy + 1;
      this.cart.addQuantity(this.cart.cart[index].quantiy, product.id);
    }
  };

  CheckoutComponent.prototype.remove = function (product, index) {
    if (this.cart.cart[index].quantiy === 1) {
      this.cart.cart[index].quantiy = 0;
      this.cart.removeItem(product.id);
    } else {
      this.cart.cart[index].quantiy = this.cart.cart[index].quantiy - 1;
      this.cart.addQuantity(this.cart.cart[index].quantiy, product.id);
    }
  };

  CheckoutComponent.prototype.payMethod = function (method) {
    console.log(method);
    this.payMethods = method;
  };

  CheckoutComponent.prototype.submit = function () {
    if (this.payMethods === 'cod') {
      this.createOrder(this.payMethods, '');
    } else if (this.payMethods === 'easycard') {
      console.log('pay with easycard');
      localStorage.setItem('deliveryAt', this.deliveryOption);
      localStorage.setItem('driverid', this.allDriversId);
      localStorage.setItem('deliveryAddress', JSON.stringify(this.cart.deliveryAddress));
      localStorage.setItem('datetime', this.datetime);
      var url = 'https://secure.e-c.co.il/easycard/createform.asp?RedirectToken=ecee3392-2939-4a46-b40e-c5b080b44fb5&Sum=' + this.cart.totalPrice + '&MType=' + this.currencyValue + '&returnURLTrue=https://flyvip.biz/success&returnURLFalse=https://flyvip.biz/success';
      console.log("easycard url");
      window.open(url, '_self'); // this.frame.show();
    } // } else if (this.payMethods === 'razor') {
    //   this.proceed();
    // } else if (this.payMethods === 'paytm') {
    //   this.payTm();
    // } else if (this.payMethods === 'instamojo') {
    //   this.instaPay();
    // } else if (this.payMethods === 'paystacks') {
    //   this.paystackPay();
    // } else if (this.payMethods === 'flutterPay') {
    //   this.flutterPay();
    // }

  };

  CheckoutComponent.prototype.addcard = function () {
    var _this = this;

    this.date = this.date.replace(/ /g, '');
    this.cnumber = this.cnumber.replace(/ /g, '');
    console.log('date============>', this.date.split('/'));
    console.log('cumner', this.cnumber);

    if (this.email === '' || this.cname === '' || this.cnumber === '' || this.cvc === '' || this.date === '') {
      // this.util.showToast('All Fields are required', 'danger', 'bottom');
      this.util.toast('error', this.util.getString('Error'), this.util.getString('All Fields are required'));
      return false;
    }

    var emailfilter = /^[\w._-]+[+]?[\w._-]+@[\w.-]+\.[a-zA-Z]{2,6}$/;

    if (!emailfilter.test(this.email)) {
      // this.util.showToast('Please enter valid email', 'danger', 'bottom');
      this.util.toast('error', this.util.getString('Error'), this.util.getString('Please enter valid emai'));
      return false;
    }

    var year = this.date.split('/')[1];
    var month = this.date.split('/')[0];
    var param = {
      'card[number]': this.cnumber,
      'card[exp_month]': month,
      'card[exp_year]': year,
      'card[cvc]': this.cvc
    };
    this.util.start();
    this.api.externalPost('https://api.stripe.com/v1/tokens', param, this.util.stripe).subscribe(function (data) {
      console.log(data);

      if (data && data.id) {
        // this.token = data.id;
        var customer = {
          description: 'Customer for Flyvip app',
          source: data.id,
          email: _this.email
        };

        _this.api.externalPost('https://api.stripe.com/v1/customers', customer, _this.util.stripe).subscribe(function (customer) {
          console.log(customer);

          _this.util.stop();

          if (customer && customer.id) {
            // this.cid = customer.id;
            var cid = {
              id: localStorage.getItem('uid'),
              stripe_key: customer.id
            };

            _this.updateUser(cid);
          }
        }, function (error) {
          _this.util.stop();

          console.log();

          if (error && error.error && error.error.error && error.error.error.message) {
            // this.util.showErrorAlert(error.error.error.message);
            _this.util.toast('error', _this.util.getString('Error'), error.error.error.message);

            return false;
          }

          _this.util.toast('error', _this.util.getString('Error'), _this.util.getString('Something went wrong'));
        });
      } else {
        _this.util.stop();
      }
    }, function (error) {
      console.log(error);

      _this.util.stop();

      console.log();

      if (error && error.error && error.error.error && error.error.error.message) {
        // this.util.showErrorAlert(error.error.error.message);
        _this.util.toast('error', _this.util.getString('Error'), error.error.error.message);

        return false;
      }

      _this.util.toast('error', _this.util.getString('Error'), _this.util.getString('Something went wrong'));
    });
  };

  CheckoutComponent.prototype.updateUser = function (param) {
    var _this = this;

    this.util.start();
    this.api.post('users/edit_profile', param).subscribe(function (data) {
      _this.util.stop();

      console.log(data);
      var getParam = {
        id: localStorage.getItem('uid')
      };

      _this.api.post('users/getById', getParam).subscribe(function (data) {
        console.log('user info=>', data);

        if (data && data.status === 200 && data.data && data.data.length) {
          _this.util.userInfo = data.data[0]; // this.navCtrl.back();
        } else {// this.navCtrl.back();
          }

        _this.addCard = false;

        _this.getCards();
      }, function (error) {
        console.log(error);
      });
    }, function (error) {
      _this.util.stop();

      console.log(error);

      _this.util.toast('error', _this.util.getString('Error'), _this.util.getString('Something went wrong'));
    });
  };

  CheckoutComponent.prototype.getTime = function (time) {
    return moment(time).format('LLLL');
  };

  CheckoutComponent.prototype.selectedOffers = function (item) {
    console.log(item);
    var min = parseFloat(item.min);

    if (this.cart.totalPrice >= min) {
      this.cart.coupon = item; // this.util.publishCoupon(item);

      this.cart.calcuate();
      console.log(this.cart.discount);
      this.offersModal.hide();
    } else {
      console.log('not valid with minimum amout', min);
      this.util.toast('error', this.util.getString('Error'), this.util.getString('Sorry') + ' ' + this.util.getString('minimum cart value must be') + min + ' ' + this.util.getString('or equal'));
    }
  };

  __decorate([core_1.ViewChild('frame')], CheckoutComponent.prototype, "frame");

  __decorate([core_1.ViewChild('newAddress')], CheckoutComponent.prototype, "newAddress");

  __decorate([core_1.ViewChild('paytabs')], CheckoutComponent.prototype, "paytabs");

  __decorate([core_1.ViewChild('offersModal')], CheckoutComponent.prototype, "offersModal");

  CheckoutComponent = __decorate([core_1.Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.scss']
  })], CheckoutComponent);
  return CheckoutComponent;
}();

exports.CheckoutComponent = CheckoutComponent;