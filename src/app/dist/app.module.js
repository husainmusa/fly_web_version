"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
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
var platform_browser_1 = require("@angular/platform-browser");
var animations_1 = require("@angular/platform-browser/animations");
var app_component_1 = require("./app.component");
var angular_bootstrap_md_1 = require("angular-bootstrap-md");
var forms_1 = require("@angular/forms");
var app_routing_module_1 = require("./app-routing.module");
var users_component_1 = require("./layouts/users/users.component");
var admins_component_1 = require("./layouts/admins/admins.component");
var errors_component_1 = require("./layouts/errors/errors.component");
var headers_component_1 = require("./shared/headers/headers.component");
var footers_component_1 = require("./shared/footers/footers.component");
var service_worker_1 = require("@angular/service-worker");
var environment_1 = require("../environments/environment");
var http_1 = require("@angular/common/http");
var angular2_toaster_1 = require("angular2-toaster");
var ngx_ui_loader_1 = require("ngx-ui-loader");
var shared_module_1 = require("./shared/shared.module");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var ngx_skeleton_loader_1 = require("ngx-skeleton-loader");
var mobile_header_component_1 = require("./shared/mobile-header/mobile-header.component");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                users_component_1.UsersComponent,
                admins_component_1.AdminsComponent,
                errors_component_1.ErrorsComponent,
                headers_component_1.HeadersComponent,
                footers_component_1.FootersComponent,
                mobile_header_component_1.MobileHeaderComponent,
            ],
            imports: [
                platform_browser_1.BrowserModule,
                animations_1.BrowserAnimationsModule,
                angular_bootstrap_md_1.MDBBootstrapModule.forRoot(),
                forms_1.FormsModule,
                app_routing_module_1.AppRoutingModule,
                http_1.HttpClientModule,
                angular2_toaster_1.ToasterModule.forRoot(),
                ngx_ui_loader_1.NgxUiLoaderModule,
                shared_module_1.SharedModule,
                service_worker_1.ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment_1.environment.production }),
                ng_bootstrap_1.NgbModule,
                ngx_skeleton_loader_1.NgxSkeletonLoaderModule,
            ],
            providers: [],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
