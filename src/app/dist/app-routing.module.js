"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppRoutingModule = void 0;
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
var router_1 = require("@angular/router");
var users_component_1 = require("./layouts/users/users.component");
var errors_component_1 = require("./layouts/errors/errors.component");
var auth_guard_1 = require("./guard/auth.guard");
var success_component_1 = require("./components/success/success.component");
var routes = [
    {
        path: "success", component: success_component_1.SuccessComponent
    },
    {
        path: '',
        component: users_component_1.UsersComponent,
        children: [
            // {
            //   path: '',
            //   redirectTo: 'home',
            //   pathMatch: 'full'
            // },
            {
                path: 'categories',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./components/categories/categories.module'); }).then(function (m) { return m.CategoriesModule; }); },
                data: { title: 'Categories' }
            },
            {
                path: '',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./components/home/home.module'); }).then(function (m) { return m.HomeModule; }); },
                data: { title: 'Home' }
            },
            {
                path: 'home',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./components/home/home.module'); }).then(function (m) { return m.HomeModule; }); },
                data: { title: 'Home' }
            },
            {
                path: 'product-detail',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./components/product-detail/product-detail.module'); }).then(function (m) { return m.ProductDetailModule; }); },
                data: { title: 'Product Details' }
            },
            {
                path: 'orders',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./components/orders/orders.module'); }).then(function (m) { return m.OrdersModule; }); },
                canActivate: [auth_guard_1.AuthGuard],
                data: { title: 'Orders' }
            },
            {
                path: 'order-detail',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./components/order-detail/order-detail.module'); }).then(function (m) { return m.OrderDetailModule; }); },
                canActivate: [auth_guard_1.AuthGuard],
                data: { title: 'Order Details' }
            },
            {
                path: 'account',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./components/account/account.module'); }).then(function (m) { return m.AccountModule; }); },
                canActivate: [auth_guard_1.AuthGuard],
                data: { title: 'Account' }
            },
            {
                path: 'checkout',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./components/checkout/checkout.module'); }).then(function (m) { return m.CheckoutModule; }); },
                canActivate: [auth_guard_1.AuthGuard],
                data: { title: 'Checkout' }
            },
            {
                path: 'privacy-policy',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./components/privacy-policy/privacy-policy.module'); }).then(function (m) { return m.PrivacyPolicyModule; }); },
                data: { title: 'Privacy Policy' }
            },
            {
                path: 'contact',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./components/contact/contact.module'); }).then(function (m) { return m.ContactModule; }); },
                data: { title: 'Contact' }
            },
            {
                path: 'refund-policy',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./components/refund-policy/refund-policy.module'); }).then(function (m) { return m.RefundPolicyModule; }); },
                data: { title: 'Refund Policy' }
            },
            {
                path: 'help',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./components/help/help.module'); }).then(function (m) { return m.HelpModule; }); },
                data: { title: 'Help' }
            },
            {
                path: 'login',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./components/login/login.module'); }).then(function (m) { return m.LoginModule; }); },
                data: { title: 'Login' }
            },
            {
                path: 'register',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./components/register/register.module'); }).then(function (m) { return m.RegisterModule; }); },
                data: { title: 'Categories' }
            },
            {
                path: 'sub-categoris',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./components/subcats/subcats.module'); }).then(function (m) { return m.SubcatsModule; }); },
                data: { title: 'Sub Categories' }
            },
            {
                path: 'reset',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./components/reset/reset.module'); }).then(function (m) { return m.ResetModule; }); },
                data: { title: 'Reset' }
            },
            {
                path: 'faq',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./components/faq/faq.module'); }).then(function (m) { return m.FaqModule; }); },
                data: { title: 'Faqs' }
            },
            {
                path: 'top-picked',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./components/top-picked/top-picked.module'); }).then(function (m) { return m.TopPickedModule; }); },
                data: { title: 'Top Picked' }
            },
            {
                path: 'top-stores',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./components/top-store/top-store.module'); }).then(function (m) { return m.TopStoreModule; }); },
                data: { title: 'Top Stores' }
            },
            {
                path: 'top-offers',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./components/top-offers/top-offers.module'); }).then(function (m) { return m.TopOffersModule; }); },
                data: { title: 'Top Offers' }
            },
            {
                path: 'search',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./components/search/search.module'); }).then(function (m) { return m.SearchModule; }); },
                data: { title: 'Search' }
            },
            {
                path: 'stores-products',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./components/stores-product/stores-product.module'); }).then(function (m) { return m.StoresProductModule; }); },
                data: { title: 'Categories' }
            },
            {
                path: 'products',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./components/products/products.module'); }).then(function (m) { return m.ProductsModule; }); },
                data: { title: 'Products' }
            },
            {
                path: 'paytmcallback',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./components/paytmcallback/paytmcallback.module'); }).then(function (m) { return m.PaytmcallbackModule; }); },
                data: { title: 'Success' }
            },
            {
                path: 'instamojocallback',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./components/instamojocallback/instamojocallback.module'); }).then(function (m) { return m.InstamojocallbackModule; }); },
                data: { title: 'Success' }
            },
            {
                path: 'flutterwavecallback',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./components/flutterwavecallback/flutterwavecallback.module'); }).then(function (m) { return m.FlutterwavecallbackModule; }); },
                data: { title: 'Success' }
            },
            {
                path: 'chats',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./components/chats/chats.module'); }).then(function (m) { return m.ChatsModule; }); },
                canActivate: [auth_guard_1.AuthGuard],
                data: { title: 'Chats' }
            },
            {
                path: 'about',
                loadChildren: function () { return Promise.resolve().then(function () { return require('./components/about/about.module'); }).then(function (m) { return m.AboutModule; }); },
                canActivate: [auth_guard_1.AuthGuard],
                data: { title: 'About' }
            },
            {
                path: '404',
                component: errors_component_1.ErrorsComponent
            },
            {
                path: '**',
                component: errors_component_1.ErrorsComponent
            }
        ]
    },
    {
        path: '**',
        component: errors_component_1.ErrorsComponent
    }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
