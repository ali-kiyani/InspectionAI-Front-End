(self["webpackChunkInspectionAI"] = self["webpackChunkInspectionAI"] || []).push([["main"],{

/***/ 98255:
/*!*******************************************************!*\
  !*** ./$_lazy_route_resources/ lazy namespace object ***!
  \*******************************************************/
/***/ (function(module) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 98255;
module.exports = webpackEmptyAsyncContext;

/***/ }),

/***/ 24697:
/*!********************************!*\
  !*** ./src/app-initializer.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppInitializer": function() { return /* binding */ AppInitializer; }
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 38583);
/* harmony import */ var moment_timezone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment-timezone */ 71412);
/* harmony import */ var moment_timezone__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment_timezone__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_es__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lodash-es */ 69180);
/* harmony import */ var lodash_es__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! lodash-es */ 12671);
/* harmony import */ var _shared_AppConsts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @shared/AppConsts */ 85079);
/* harmony import */ var _shared_session_app_session_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @shared/session/app-session.service */ 97558);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ 92340);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 37716);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common/http */ 91841);









var AppInitializer = /** @class */ (function () {
    function AppInitializer(_injector, _platformLocation, _httpClient) {
        this._injector = _injector;
        this._platformLocation = _platformLocation;
        this._httpClient = _httpClient;
    }
    AppInitializer.prototype.init = function () {
        var _this = this;
        return function () {
            abp.ui.setBusy();
            return new Promise(function (resolve, reject) {
                _shared_AppConsts__WEBPACK_IMPORTED_MODULE_1__.AppConsts.appBaseHref = _this.getBaseHref();
                var appBaseUrl = _this.getDocumentOrigin() + _shared_AppConsts__WEBPACK_IMPORTED_MODULE_1__.AppConsts.appBaseHref;
                _this.getApplicationConfig(appBaseUrl, function () {
                    _this.getUserConfiguration(function () {
                        abp.event.trigger('abp.dynamicScriptsInitialized');
                        // do not use constructor injection for AppSessionService
                        var appSessionService = _this._injector.get(_shared_session_app_session_service__WEBPACK_IMPORTED_MODULE_2__.AppSessionService);
                        appSessionService.init().then(function (result) {
                            abp.ui.clearBusy();
                            if (_this.shouldLoadLocale()) {
                                var angularLocale = _this.convertAbpLocaleToAngularLocale(abp.localization.currentLanguage.name);
                                __webpack_require__(36896)("./" + angularLocale + ".js").then(function (module) {
                                    (0,_angular_common__WEBPACK_IMPORTED_MODULE_4__.registerLocaleData)(module.default);
                                    resolve(result);
                                }, reject);
                            }
                            else {
                                resolve(result);
                            }
                        }, function (err) {
                            abp.ui.clearBusy();
                            reject(err);
                        });
                    });
                });
            });
        };
    };
    AppInitializer.prototype.getBaseHref = function () {
        var baseUrl = this._platformLocation.getBaseHrefFromDOM();
        if (baseUrl) {
            return baseUrl;
        }
        return '/';
    };
    AppInitializer.prototype.getDocumentOrigin = function () {
        if (!document.location.origin) {
            var port = document.location.port ? ':' + document.location.port : '';
            return (document.location.protocol + '//' + document.location.hostname + port);
        }
        return document.location.origin;
    };
    AppInitializer.prototype.shouldLoadLocale = function () {
        return (abp.localization.currentLanguage.name &&
            abp.localization.currentLanguage.name !== 'en-US');
    };
    AppInitializer.prototype.convertAbpLocaleToAngularLocale = function (locale) {
        if (!_shared_AppConsts__WEBPACK_IMPORTED_MODULE_1__.AppConsts.localeMappings) {
            return locale;
        }
        var localeMapings = (0,lodash_es__WEBPACK_IMPORTED_MODULE_5__.default)(_shared_AppConsts__WEBPACK_IMPORTED_MODULE_1__.AppConsts.localeMappings, { from: locale });
        if (localeMapings && localeMapings.length) {
            return localeMapings[0]['to'];
        }
        return locale;
    };
    AppInitializer.prototype.getCurrentClockProvider = function (currentProviderName) {
        if (currentProviderName === 'unspecifiedClockProvider') {
            return abp.timing.unspecifiedClockProvider;
        }
        if (currentProviderName === 'utcClockProvider') {
            return abp.timing.utcClockProvider;
        }
        return abp.timing.localClockProvider;
    };
    AppInitializer.prototype.getUserConfiguration = function (callback) {
        var _this = this;
        var cookieLangValue = abp.utils.getCookieValue('Abp.Localization.CultureName');
        var token = abp.auth.getToken();
        var requestHeaders = {
            'Abp.TenantId': "" + abp.multiTenancy.getTenantIdCookie(),
            '.AspNetCore.Culture': "c=" + cookieLangValue + "|uic=" + cookieLangValue,
        };
        if (token) {
            requestHeaders['Authorization'] = "Bearer " + token;
        }
        this._httpClient
            .get(_shared_AppConsts__WEBPACK_IMPORTED_MODULE_1__.AppConsts.remoteServiceBaseUrl + "/AbpUserConfiguration/GetAll", {
            headers: requestHeaders,
        })
            .subscribe(function (response) {
            var result = response.result;
            (0,lodash_es__WEBPACK_IMPORTED_MODULE_6__.default)(abp, result);
            abp.clock.provider = _this.getCurrentClockProvider(result.clock.provider);
            moment_timezone__WEBPACK_IMPORTED_MODULE_0__.locale(abp.localization.currentLanguage.name);
            if (abp.clock.provider.supportsMultipleTimezone) {
                moment_timezone__WEBPACK_IMPORTED_MODULE_0__.tz.setDefault(abp.timing.timeZoneInfo.iana.timeZoneId);
            }
            callback();
        });
    };
    AppInitializer.prototype.getApplicationConfig = function (appRootUrl, callback) {
        this._httpClient
            .get(appRootUrl + "assets/" + _environments_environment__WEBPACK_IMPORTED_MODULE_3__.environment.appConfig, {
            headers: {
                'Abp.TenantId': "" + abp.multiTenancy.getTenantIdCookie(),
            },
        })
            .subscribe(function (response) {
            _shared_AppConsts__WEBPACK_IMPORTED_MODULE_1__.AppConsts.appBaseUrl = response.appBaseUrl;
            _shared_AppConsts__WEBPACK_IMPORTED_MODULE_1__.AppConsts.remoteServiceBaseUrl = response.remoteServiceBaseUrl;
            _shared_AppConsts__WEBPACK_IMPORTED_MODULE_1__.AppConsts.localeMappings = response.localeMappings;
            callback();
        });
    };
    AppInitializer.ɵfac = function AppInitializer_Factory(t) { return new (t || AppInitializer)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_7__.Injector), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_common__WEBPACK_IMPORTED_MODULE_4__.PlatformLocation), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_8__.HttpClient)); };
    AppInitializer.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjectable"]({ token: AppInitializer, factory: AppInitializer.ɵfac, providedIn: 'root' });
    return AppInitializer;
}());



/***/ }),

/***/ 92340:
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "environment": function() { return /* binding */ environment; }
/* harmony export */ });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
var environment = {
    production: false,
    hmr: false,
    appConfig: 'appconfig.json'
};


/***/ }),

/***/ 84187:
/*!********************!*\
  !*** ./src/hmr.ts ***!
  \********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "hmrBootstrap": function() { return /* binding */ hmrBootstrap; }
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 37716);
/* harmony import */ var _angularclass_hmr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angularclass/hmr */ 91049);
/* harmony import */ var _angularclass_hmr__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_angularclass_hmr__WEBPACK_IMPORTED_MODULE_0__);


var hmrBootstrap = function (module, bootstrap) {
    var ngModule;
    module.hot.accept();
    bootstrap().then(function (mod) { return ngModule = mod; });
    module.hot.dispose(function () {
        var appRef = ngModule.injector.get(_angular_core__WEBPACK_IMPORTED_MODULE_1__.ApplicationRef);
        var elements = appRef.components.map(function (c) { return c.location.nativeElement; });
        var makeVisible = (0,_angularclass_hmr__WEBPACK_IMPORTED_MODULE_0__.createNewHosts)(elements);
        ngModule.destroy();
        makeVisible();
    });
};


/***/ }),

/***/ 14431:
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/platform-browser */ 39075);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 37716);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./environments/environment */ 92340);
/* harmony import */ var _root_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./root.module */ 91709);
/* harmony import */ var _hmr__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./hmr */ 84187);
/* harmony import */ var moment_min_locales_min__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! moment/min/locales.min */ 64301);
/* harmony import */ var moment_min_locales_min__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(moment_min_locales_min__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var moment_timezone__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! moment-timezone */ 71412);
/* harmony import */ var moment_timezone__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(moment_timezone__WEBPACK_IMPORTED_MODULE_4__);







if (_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.production) {
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.enableProdMode)();
}
var bootstrap = function () {
    return _angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__.platformBrowser().bootstrapModule(_root_module__WEBPACK_IMPORTED_MODULE_1__.RootModule);
};
/* "Hot Module Replacement" is enabled as described on
 * https://medium.com/@beeman/tutorial-enable-hrm-in-angular-cli-apps-1b0d13b80130#.sa87zkloh
 */
if (_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.hmr) {
    if (false) {}
    else {
        console.error('HMR is not enabled for webpack-dev-server!');
        console.log('Are you using the --hmr flag for ng serve?');
    }
}
else {
    bootstrap(); // Regular bootstrap
}


/***/ }),

/***/ 93316:
/*!************************************!*\
  !*** ./src/root-routing.module.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RootRoutingModule": function() { return /* binding */ RootRoutingModule; }
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 39895);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 37716);



var routes = [
    { path: '', redirectTo: '/app/home', pathMatch: 'full' },
    {
        path: 'account',
        loadChildren: function () { return Promise.all(/*! import() */[__webpack_require__.e("common"), __webpack_require__.e("src_account_account_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! account/account.module */ 72880)).then(function (m) { return m.AccountModule; }); },
        data: { preload: true }
    },
    {
        path: 'app',
        loadChildren: function () { return Promise.all(/*! import() */[__webpack_require__.e("common"), __webpack_require__.e("src_app_app_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! app/app.module */ 36747)).then(function (m) { return m.AppModule; }); },
        data: { preload: true }
    }
];
var RootRoutingModule = /** @class */ (function () {
    function RootRoutingModule() {
    }
    RootRoutingModule.ɵfac = function RootRoutingModule_Factory(t) { return new (t || RootRoutingModule)(); };
    RootRoutingModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: RootRoutingModule });
    RootRoutingModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ providers: [], imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })], _angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterModule] });
    return RootRoutingModule;
}());

(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](RootRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterModule], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterModule] }); })();


/***/ }),

/***/ 51245:
/*!*******************************!*\
  !*** ./src/root.component.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RootComponent": function() { return /* binding */ RootComponent; }
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 37716);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 39895);


var RootComponent = /** @class */ (function () {
    function RootComponent() {
    }
    RootComponent.ɵfac = function RootComponent_Factory(t) { return new (t || RootComponent)(); };
    RootComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: RootComponent, selectors: [["app-root"]], decls: 1, vars: 0, template: function RootComponent_Template(rf, ctx) { if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "router-outlet");
        } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterOutlet], encapsulation: 2 });
    return RootComponent;
}());



/***/ }),

/***/ 91709:
/*!****************************!*\
  !*** ./src/root.module.ts ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getCurrentLanguage": function() { return /* binding */ getCurrentLanguage; },
/* harmony export */   "RootModule": function() { return /* binding */ RootModule; }
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/core */ 37716);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/platform-browser */ 39075);
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/platform-browser/animations */ 75835);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common/http */ 91841);
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ngx-bootstrap/modal */ 63301);
/* harmony import */ var ngx_bootstrap_dropdown__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-bootstrap/dropdown */ 10743);
/* harmony import */ var ngx_bootstrap_collapse__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-bootstrap/collapse */ 70453);
/* harmony import */ var ngx_bootstrap_tabs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-bootstrap/tabs */ 75690);
/* harmony import */ var abp_ng2_module__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! abp-ng2-module */ 71300);
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./shared/shared.module */ 8395);
/* harmony import */ var _shared_service_proxies_service_proxy_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @shared/service-proxies/service-proxy.module */ 55696);
/* harmony import */ var _root_routing_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./root-routing.module */ 93316);
/* harmony import */ var _shared_AppConsts__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @shared/AppConsts */ 85079);
/* harmony import */ var _shared_service_proxies_service_proxies__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @shared/service-proxies/service-proxies */ 37857);
/* harmony import */ var _root_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./root.component */ 51245);
/* harmony import */ var _app_initializer__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./app-initializer */ 24697);






















function getCurrentLanguage() {
    if (abp.localization.currentLanguage.name) {
        return abp.localization.currentLanguage.name;
    }
    // todo: Waiting for https://github.com/angular/angular/issues/31465 to be fixed.
    return 'en';
}
var RootModule = /** @class */ (function () {
    function RootModule() {
    }
    RootModule.ɵfac = function RootModule_Factory(t) { return new (t || RootModule)(); };
    RootModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdefineNgModule"]({ type: RootModule, bootstrap: [_root_component__WEBPACK_IMPORTED_MODULE_9__.RootComponent] });
    RootModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdefineInjector"]({ providers: [
            { provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_12__.HTTP_INTERCEPTORS, useClass: abp_ng2_module__WEBPACK_IMPORTED_MODULE_13__.AbpHttpInterceptor, multi: true },
            {
                provide: _angular_core__WEBPACK_IMPORTED_MODULE_11__.APP_INITIALIZER,
                useFactory: function (appInitializer) { return appInitializer.init(); },
                deps: [_app_initializer__WEBPACK_IMPORTED_MODULE_10__.AppInitializer],
                multi: true,
            },
            { provide: _shared_service_proxies_service_proxies__WEBPACK_IMPORTED_MODULE_8__.API_BASE_URL, useFactory: function () { return _shared_AppConsts__WEBPACK_IMPORTED_MODULE_7__.AppConsts.remoteServiceBaseUrl; } },
            {
                provide: _angular_core__WEBPACK_IMPORTED_MODULE_11__.LOCALE_ID,
                useFactory: getCurrentLanguage,
            },
        ], imports: [[
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_14__.BrowserModule,
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_15__.BrowserAnimationsModule,
                _angular_common_http__WEBPACK_IMPORTED_MODULE_12__.HttpClientModule,
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_4__.SharedModule.forRoot(),
                ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_0__.ModalModule.forRoot(),
                ngx_bootstrap_dropdown__WEBPACK_IMPORTED_MODULE_1__.BsDropdownModule.forRoot(),
                ngx_bootstrap_collapse__WEBPACK_IMPORTED_MODULE_2__.CollapseModule.forRoot(),
                ngx_bootstrap_tabs__WEBPACK_IMPORTED_MODULE_3__.TabsModule.forRoot(),
                _shared_service_proxies_service_proxy_module__WEBPACK_IMPORTED_MODULE_5__.ServiceProxyModule,
                _root_routing_module__WEBPACK_IMPORTED_MODULE_6__.RootRoutingModule,
            ]] });
    return RootModule;
}());

(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵsetNgModuleScope"](RootModule, { declarations: [_root_component__WEBPACK_IMPORTED_MODULE_9__.RootComponent], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_14__.BrowserModule,
        _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_15__.BrowserAnimationsModule,
        _angular_common_http__WEBPACK_IMPORTED_MODULE_12__.HttpClientModule, _shared_shared_module__WEBPACK_IMPORTED_MODULE_4__.SharedModule, ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_0__.ModalModule, ngx_bootstrap_dropdown__WEBPACK_IMPORTED_MODULE_1__.BsDropdownModule, ngx_bootstrap_collapse__WEBPACK_IMPORTED_MODULE_2__.CollapseModule, ngx_bootstrap_tabs__WEBPACK_IMPORTED_MODULE_3__.TabsModule, _shared_service_proxies_service_proxy_module__WEBPACK_IMPORTED_MODULE_5__.ServiceProxyModule,
        _root_routing_module__WEBPACK_IMPORTED_MODULE_6__.RootRoutingModule] }); })();


/***/ }),

/***/ 85079:
/*!*********************************!*\
  !*** ./src/shared/AppConsts.ts ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppConsts": function() { return /* binding */ AppConsts; }
/* harmony export */ });
var AppConsts = /** @class */ (function () {
    function AppConsts() {
    }
    AppConsts.localeMappings = [];
    AppConsts.userManagement = {
        defaultAdminUserName: 'admin'
    };
    AppConsts.localization = {
        defaultLocalizationSourceName: 'InspectionAI'
    };
    AppConsts.authorization = {
        encryptedAuthTokenName: 'enc_auth_token'
    };
    return AppConsts;
}());



/***/ }),

/***/ 16772:
/*!******************************************!*\
  !*** ./src/shared/app-component-base.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppComponentBase": function() { return /* binding */ AppComponentBase; }
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 37716);
/* harmony import */ var _shared_AppConsts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @shared/AppConsts */ 85079);
/* harmony import */ var abp_ng2_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! abp-ng2-module */ 71300);
/* harmony import */ var _shared_session_app_session_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @shared/session/app-session.service */ 97558);




var AppComponentBase = /** @class */ (function () {
    function AppComponentBase(injector) {
        this.localizationSourceName = _shared_AppConsts__WEBPACK_IMPORTED_MODULE_0__.AppConsts.localization.defaultLocalizationSourceName;
        this.localization = injector.get(abp_ng2_module__WEBPACK_IMPORTED_MODULE_2__.LocalizationService);
        this.permission = injector.get(abp_ng2_module__WEBPACK_IMPORTED_MODULE_2__.PermissionCheckerService);
        this.feature = injector.get(abp_ng2_module__WEBPACK_IMPORTED_MODULE_2__.FeatureCheckerService);
        this.notify = injector.get(abp_ng2_module__WEBPACK_IMPORTED_MODULE_2__.NotifyService);
        this.setting = injector.get(abp_ng2_module__WEBPACK_IMPORTED_MODULE_2__.SettingService);
        this.message = injector.get(abp_ng2_module__WEBPACK_IMPORTED_MODULE_2__.MessageService);
        this.multiTenancy = injector.get(abp_ng2_module__WEBPACK_IMPORTED_MODULE_2__.AbpMultiTenancyService);
        this.appSession = injector.get(_shared_session_app_session_service__WEBPACK_IMPORTED_MODULE_1__.AppSessionService);
        this.elementRef = injector.get(_angular_core__WEBPACK_IMPORTED_MODULE_3__.ElementRef);
    }
    AppComponentBase.prototype.l = function (key) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var localizedText = this.localization.localize(key, this.localizationSourceName);
        if (!localizedText) {
            localizedText = key;
        }
        if (!args || !args.length) {
            return localizedText;
        }
        args.unshift(localizedText);
        return abp.utils.formatString.apply(this, args);
    };
    AppComponentBase.prototype.isGranted = function (permissionName) {
        return this.permission.isGranted(permissionName);
    };
    return AppComponentBase;
}());



/***/ }),

/***/ 50895:
/*!*********************************************!*\
  !*** ./src/shared/auth/app-auth.service.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppAuthService": function() { return /* binding */ AppAuthService; }
/* harmony export */ });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 68939);
/* harmony import */ var _shared_AppConsts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @shared/AppConsts */ 85079);
/* harmony import */ var _shared_helpers_UrlHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @shared/helpers/UrlHelper */ 87737);
/* harmony import */ var _shared_service_proxies_service_proxies__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @shared/service-proxies/service-proxies */ 37857);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 37716);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 39895);
/* harmony import */ var abp_ng2_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! abp-ng2-module */ 71300);








var AppAuthService = /** @class */ (function () {
    function AppAuthService(_tokenAuthService, _router, _utilsService, _tokenService, _logService) {
        this._tokenAuthService = _tokenAuthService;
        this._router = _router;
        this._utilsService = _utilsService;
        this._tokenService = _tokenService;
        this._logService = _logService;
        this.clear();
    }
    AppAuthService.prototype.logout = function (reload) {
        abp.auth.clearToken();
        abp.utils.deleteCookie(_shared_AppConsts__WEBPACK_IMPORTED_MODULE_0__.AppConsts.authorization.encryptedAuthTokenName);
        if (reload !== false) {
            location.href = _shared_AppConsts__WEBPACK_IMPORTED_MODULE_0__.AppConsts.appBaseUrl;
        }
    };
    AppAuthService.prototype.authenticate = function (finallyCallback) {
        var _this = this;
        finallyCallback = finallyCallback || (function () { });
        this._tokenAuthService
            .authenticate(this.authenticateModel)
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.finalize)(function () {
            finallyCallback();
        }))
            .subscribe(function (result) {
            _this.processAuthenticateResult(result);
        });
    };
    AppAuthService.prototype.processAuthenticateResult = function (authenticateResult) {
        this.authenticateResult = authenticateResult;
        if (authenticateResult.accessToken) {
            // Successfully logged in
            this.login(authenticateResult.accessToken, authenticateResult.encryptedAccessToken, authenticateResult.expireInSeconds, this.rememberMe);
        }
        else {
            // Unexpected result!
            this._logService.warn('Unexpected authenticateResult!');
            this._router.navigate(['account/login']);
        }
    };
    AppAuthService.prototype.login = function (accessToken, encryptedAccessToken, expireInSeconds, rememberMe) {
        var tokenExpireDate = rememberMe
            ? new Date(new Date().getTime() + 1000 * expireInSeconds)
            : undefined;
        this._tokenService.setToken(accessToken, tokenExpireDate);
        this._utilsService.setCookieValue(_shared_AppConsts__WEBPACK_IMPORTED_MODULE_0__.AppConsts.authorization.encryptedAuthTokenName, encryptedAccessToken, tokenExpireDate, abp.appPath);
        var initialUrl = _shared_helpers_UrlHelper__WEBPACK_IMPORTED_MODULE_1__.UrlHelper.initialUrl;
        if (initialUrl.indexOf('/login') > 0) {
            initialUrl = _shared_AppConsts__WEBPACK_IMPORTED_MODULE_0__.AppConsts.appBaseUrl;
        }
        location.href = initialUrl;
    };
    AppAuthService.prototype.clear = function () {
        this.authenticateModel = new _shared_service_proxies_service_proxies__WEBPACK_IMPORTED_MODULE_2__.AuthenticateModel();
        this.authenticateModel.rememberClient = false;
        this.authenticateResult = null;
        this.rememberMe = false;
    };
    AppAuthService.ɵfac = function AppAuthService_Factory(t) { return new (t || AppAuthService)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_shared_service_proxies_service_proxies__WEBPACK_IMPORTED_MODULE_2__.TokenAuthServiceProxy), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](abp_ng2_module__WEBPACK_IMPORTED_MODULE_6__.UtilsService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](abp_ng2_module__WEBPACK_IMPORTED_MODULE_6__.TokenService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](abp_ng2_module__WEBPACK_IMPORTED_MODULE_6__.LogService)); };
    AppAuthService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({ token: AppAuthService, factory: AppAuthService.ɵfac });
    return AppAuthService;
}());



/***/ }),

/***/ 21268:
/*!*********************************************!*\
  !*** ./src/shared/auth/auth-route-guard.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppRouteGuard": function() { return /* binding */ AppRouteGuard; }
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 37716);
/* harmony import */ var abp_ng2_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! abp-ng2-module */ 71300);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 39895);
/* harmony import */ var _session_app_session_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../session/app-session.service */ 97558);




var AppRouteGuard = /** @class */ (function () {
    function AppRouteGuard(_permissionChecker, _router, _sessionService) {
        this._permissionChecker = _permissionChecker;
        this._router = _router;
        this._sessionService = _sessionService;
    }
    AppRouteGuard.prototype.canActivate = function (route, state) {
        if (!this._sessionService.user) {
            this._router.navigate(['/account/login']);
            return false;
        }
        if (!route.data || !route.data['permission']) {
            return true;
        }
        if (this._permissionChecker.isGranted(route.data['permission'])) {
            return true;
        }
        this._router.navigate([this.selectBestRoute()]);
        return false;
    };
    AppRouteGuard.prototype.canActivateChild = function (route, state) {
        return this.canActivate(route, state);
    };
    AppRouteGuard.prototype.selectBestRoute = function () {
        if (!this._sessionService.user) {
            return '/account/login';
        }
        if (this._permissionChecker.isGranted('Pages.Users')) {
            return '/app/admin/users';
        }
        return '/app/home';
    };
    AppRouteGuard.ɵfac = function AppRouteGuard_Factory(t) { return new (t || AppRouteGuard)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](abp_ng2_module__WEBPACK_IMPORTED_MODULE_2__.PermissionCheckerService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_session_app_session_service__WEBPACK_IMPORTED_MODULE_0__.AppSessionService)); };
    AppRouteGuard.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: AppRouteGuard, factory: AppRouteGuard.ɵfac });
    return AppRouteGuard;
}());



/***/ }),

/***/ 74307:
/*!*******************************************************************!*\
  !*** ./src/shared/components/modal/abp-modal-footer.component.ts ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AbpModalFooterComponent": function() { return /* binding */ AbpModalFooterComponent; }
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 37716);
/* harmony import */ var _shared_app_component_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @shared/app-component-base */ 16772);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var AbpModalFooterComponent = /** @class */ (function (_super) {
    __extends(AbpModalFooterComponent, _super);
    function AbpModalFooterComponent(injector) {
        var _this = _super.call(this, injector) || this;
        _this.cancelLabel = _this.l('Cancel');
        _this.saveLabel = _this.l('Save');
        _this.onCancelClick = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
        return _this;
    }
    AbpModalFooterComponent.ɵfac = function AbpModalFooterComponent_Factory(t) { return new (t || AbpModalFooterComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.Injector)); };
    AbpModalFooterComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: AbpModalFooterComponent, selectors: [["abp-modal-footer"]], inputs: { cancelLabel: "cancelLabel", cancelDisabled: "cancelDisabled", saveLabel: "saveLabel", saveDisabled: "saveDisabled" }, outputs: { onCancelClick: "onCancelClick" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵInheritDefinitionFeature"]], decls: 5, vars: 4, consts: [[1, "modal-footer", "justify-content-between"], ["type", "button", 1, "btn", "btn-default", 3, "disabled", "click"], ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"]], template: function AbpModalFooterComponent_Template(rf, ctx) { if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "button", 1);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function AbpModalFooterComponent_Template_button_click_1_listener() { return ctx.onCancelClick.emit(); });
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "button", 2);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        } if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("disabled", ctx.cancelDisabled);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx.cancelLabel, " ");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("disabled", ctx.saveDisabled);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx.saveLabel, " ");
        } }, encapsulation: 2, changeDetection: 0 });
    return AbpModalFooterComponent;
}(_shared_app_component_base__WEBPACK_IMPORTED_MODULE_0__.AppComponentBase));



/***/ }),

/***/ 20219:
/*!*******************************************************************!*\
  !*** ./src/shared/components/modal/abp-modal-header.component.ts ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AbpModalHeaderComponent": function() { return /* binding */ AbpModalHeaderComponent; }
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 37716);
/* harmony import */ var _shared_app_component_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @shared/app-component-base */ 16772);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var AbpModalHeaderComponent = /** @class */ (function (_super) {
    __extends(AbpModalHeaderComponent, _super);
    function AbpModalHeaderComponent(injector) {
        var _this = _super.call(this, injector) || this;
        _this.onCloseClick = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
        return _this;
    }
    AbpModalHeaderComponent.ɵfac = function AbpModalHeaderComponent_Factory(t) { return new (t || AbpModalHeaderComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.Injector)); };
    AbpModalHeaderComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: AbpModalHeaderComponent, selectors: [["abp-modal-header"]], inputs: { title: "title" }, outputs: { onCloseClick: "onCloseClick" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵInheritDefinitionFeature"]], decls: 6, vars: 1, consts: [[1, "modal-header"], [1, "modal-title"], ["type", "button", "aria-label", "Close", 1, "close", 3, "click"], ["aria-hidden", "true"]], template: function AbpModalHeaderComponent_Template(rf, ctx) { if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "h4", 1);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "button", 2);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function AbpModalHeaderComponent_Template_button_click_3_listener() { return ctx.onCloseClick.emit(); });
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "span", 3);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "\u00D7");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        } if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx.title);
        } }, encapsulation: 2, changeDetection: 0 });
    return AbpModalHeaderComponent;
}(_shared_app_component_base__WEBPACK_IMPORTED_MODULE_0__.AppComponentBase));



/***/ }),

/***/ 4798:
/*!*******************************************************************************!*\
  !*** ./src/shared/components/pagination/abp-pagination-controls.component.ts ***!
  \*******************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AbpPaginationControlsComponent": function() { return /* binding */ AbpPaginationControlsComponent; }
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 37716);
/* harmony import */ var ngx_pagination__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ngx-pagination */ 72533);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 38583);




function AbpPaginationControlsComponent_ul_3_li_1_a_1_Template(rf, ctx) { if (rf & 1) {
    var _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "a", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function AbpPaginationControlsComponent_ul_3_li_1_a_1_Template_a_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r8); _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3); var _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](1); return _r0.previous(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "i", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
function AbpPaginationControlsComponent_ul_3_li_1_a_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "a", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "i", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
function AbpPaginationControlsComponent_ul_3_li_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "li", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, AbpPaginationControlsComponent_ul_3_li_1_a_1_Template, 2, 0, "a", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, AbpPaginationControlsComponent_ul_3_li_1_a_2_Template, 2, 0, "a", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    var _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("disabled", _r0.isFirstPage());
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !_r0.isFirstPage());
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", _r0.isFirstPage());
} }
function AbpPaginationControlsComponent_ul_3_li_2_Template(rf, ctx) { if (rf & 1) {
    var _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "li", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "a", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function AbpPaginationControlsComponent_ul_3_li_2_Template_a_click_1_listener() { var restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r11); var page_r9 = restoredCtx.$implicit; _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2); var _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](1); return _r0.setCurrent(page_r9.value); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    var page_r9 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    var _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵstyleProp"]("z-index", _r0.getCurrent() === page_r9.value ? "0" : "");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("active", _r0.getCurrent() === page_r9.value);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", page_r9.label, " ");
} }
function AbpPaginationControlsComponent_ul_3_li_3_a_1_Template(rf, ctx) { if (rf & 1) {
    var _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "a", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function AbpPaginationControlsComponent_ul_3_li_3_a_1_Template_a_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r15); _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3); var _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](1); return _r0.next(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "i", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
function AbpPaginationControlsComponent_ul_3_li_3_a_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "a", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "i", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
function AbpPaginationControlsComponent_ul_3_li_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "li", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, AbpPaginationControlsComponent_ul_3_li_3_a_1_Template, 2, 0, "a", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, AbpPaginationControlsComponent_ul_3_li_3_a_2_Template, 2, 0, "a", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    var _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("disabled", _r0.isLastPage());
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !_r0.isLastPage());
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", _r0.isLastPage());
} }
function AbpPaginationControlsComponent_ul_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "ul", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, AbpPaginationControlsComponent_ul_3_li_1_Template, 3, 4, "li", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, AbpPaginationControlsComponent_ul_3_li_2_Template, 3, 5, "li", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](3, AbpPaginationControlsComponent_ul_3_li_3_Template, 3, 4, "li", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    var ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    var _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r1.directionLinks);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", _r0.pages);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r1.directionLinks);
} }
var AbpPaginationControlsComponent = /** @class */ (function () {
    function AbpPaginationControlsComponent() {
        this.maxSize = 7;
        this.previousLabel = 'Previous';
        this.nextLabel = 'Next';
        this.screenReaderPaginationLabel = 'Pagination';
        this.screenReaderPageLabel = 'page';
        this.screenReaderCurrentLabel = "You're on page";
        this.pageChange = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
        this._directionLinks = true;
        this._autoHide = false;
    }
    Object.defineProperty(AbpPaginationControlsComponent.prototype, "directionLinks", {
        get: function () {
            return this._directionLinks;
        },
        set: function (value) {
            this._directionLinks = !!value && value !== 'false';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbpPaginationControlsComponent.prototype, "autoHide", {
        get: function () {
            return this._autoHide;
        },
        set: function (value) {
            this._autoHide = !!value && value !== 'false';
        },
        enumerable: false,
        configurable: true
    });
    AbpPaginationControlsComponent.ɵfac = function AbpPaginationControlsComponent_Factory(t) { return new (t || AbpPaginationControlsComponent)(); };
    AbpPaginationControlsComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: AbpPaginationControlsComponent, selectors: [["abp-pagination-controls"]], inputs: { id: "id", maxSize: "maxSize", previousLabel: "previousLabel", nextLabel: "nextLabel", screenReaderPaginationLabel: "screenReaderPaginationLabel", screenReaderPageLabel: "screenReaderPageLabel", screenReaderCurrentLabel: "screenReaderCurrentLabel", directionLinks: "directionLinks", autoHide: "autoHide" }, outputs: { pageChange: "pageChange" }, decls: 4, vars: 3, consts: [[3, "id", "maxSize", "pageChange"], ["p", "paginationApi"], ["class", "pagination m-0", 4, "ngIf"], [1, "pagination", "m-0"], ["class", "page-item", 3, "disabled", 4, "ngIf"], ["class", "page-item", 3, "active", "z-index", 4, "ngFor", "ngForOf"], [1, "page-item"], ["class", "page-link", "href", "javascript:;", 3, "click", 4, "ngIf"], ["class", "page-link", "href", "javascript:;", 4, "ngIf"], ["href", "javascript:;", 1, "page-link", 3, "click"], [1, "fas", "fa-chevron-left"], ["href", "javascript:;", 1, "page-link"], [1, "fas", "fa-chevron-right"]], template: function AbpPaginationControlsComponent_Template(rf, ctx) { if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "pagination-template", 0, 1);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("pageChange", function AbpPaginationControlsComponent_Template_pagination_template_pageChange_0_listener($event) { return ctx.pageChange.emit($event); });
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "nav");
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](3, AbpPaginationControlsComponent_ul_3_Template, 4, 3, "ul", 2);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        } if (rf & 2) {
            var _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](1);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("id", ctx.id)("maxSize", ctx.maxSize);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !(ctx.autoHide && _r0.pages.length <= 1));
        } }, directives: [ngx_pagination__WEBPACK_IMPORTED_MODULE_0__.PaginationControlsDirective, _angular_common__WEBPACK_IMPORTED_MODULE_2__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_2__.NgForOf], encapsulation: 2 });
    return AbpPaginationControlsComponent;
}());



/***/ }),

/***/ 43421:
/*!******************************************************************************!*\
  !*** ./src/shared/components/validation/abp-validation.summary.component.ts ***!
  \******************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AbpValidationSummaryComponent": function() { return /* binding */ AbpValidationSummaryComponent; }
/* harmony export */ });
/* harmony import */ var _shared_app_component_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @shared/app-component-base */ 16772);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 37716);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 38583);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __read = (undefined && undefined.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};



function AbpValidationSummaryComponent_ng_container_0_ng_container_1_span_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    var validationError_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;
    var ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("d-block", !!ctx_r3.control.errors[validationError_r2.name]);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx_r3.getValidationErrorMessage(validationError_r2), " ");
} }
function AbpValidationSummaryComponent_ng_container_0_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, AbpValidationSummaryComponent_ng_container_0_ng_container_1_span_1_Template, 2, 3, "span", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    var validationError_r2 = ctx.$implicit;
    var ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !!ctx_r1.control.errors[validationError_r2.name]);
} }
function AbpValidationSummaryComponent_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, AbpValidationSummaryComponent_ng_container_0_ng_container_1_Template, 2, 1, "ng-container", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    var ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r0.validationErrors);
} }
var AbpValidationSummaryComponent = /** @class */ (function (_super) {
    __extends(AbpValidationSummaryComponent, _super);
    function AbpValidationSummaryComponent(injector, _renderer) {
        var _this = _super.call(this, injector) || this;
        _this._renderer = _renderer;
        _this.defaultValidationErrors = [
            { name: 'required', localizationKey: 'ThisFieldIsRequired' },
            {
                name: 'minlength',
                localizationKey: 'PleaseEnterAtLeastNCharacter',
                propertyKey: 'requiredLength',
            },
            {
                name: 'maxlength',
                localizationKey: 'PleaseEnterNoMoreThanNCharacter',
                propertyKey: 'requiredLength',
            },
            {
                name: 'email',
                localizationKey: 'InvalidEmailAddress',
            },
            {
                name: 'pattern',
                localizationKey: 'InvalidPattern',
                propertyKey: 'requiredPattern',
            },
            {
                name: 'validateEqual',
                localizationKey: 'PairsDoNotMatch',
            },
        ];
        _this.validationErrors = _this.defaultValidationErrors;
        return _this;
    }
    Object.defineProperty(AbpValidationSummaryComponent.prototype, "customValidationErrors", {
        set: function (val) {
            if (val && val.length > 0) {
                var defaults = this.defaultValidationErrors.filter(function (defaultValidationError) {
                    return !val.find(function (customValidationError) {
                        return customValidationError.name === defaultValidationError.name;
                    });
                });
                this.validationErrors = __spreadArray(__spreadArray([], __read(defaults)), __read(val));
            }
        },
        enumerable: false,
        configurable: true
    });
    AbpValidationSummaryComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.controlEl) {
            this.control.valueChanges.subscribe(function () {
                if (_this.control.valid &&
                    (_this.control.dirty || _this.control.touched)) {
                    _this._renderer.removeClass(_this.controlEl, 'is-invalid');
                }
            });
        }
    };
    AbpValidationSummaryComponent.prototype.getValidationErrorMessage = function (error) {
        if (this.controlEl) {
            this._renderer.addClass(this.controlEl, 'is-invalid');
        }
        var propertyValue = this.control.errors[error.name][error.propertyKey];
        return !!propertyValue
            ? this.l(error.localizationKey, propertyValue)
            : this.l(error.localizationKey);
    };
    AbpValidationSummaryComponent.ɵfac = function AbpValidationSummaryComponent_Factory(t) { return new (t || AbpValidationSummaryComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.Injector), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.Renderer2)); };
    AbpValidationSummaryComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: AbpValidationSummaryComponent, selectors: [["abp-validation-summary"]], inputs: { control: "control", controlEl: "controlEl", customValidationErrors: "customValidationErrors" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵInheritDefinitionFeature"]], decls: 1, vars: 1, consts: [[4, "ngIf"], [4, "ngFor", "ngForOf"], ["class", "error invalid-feedback", 3, "d-block", 4, "ngIf"], [1, "error", "invalid-feedback"]], template: function AbpValidationSummaryComponent_Template(rf, ctx) { if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](0, AbpValidationSummaryComponent_ng_container_0_Template, 2, 1, "ng-container", 0);
        } if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.control.invalid && (ctx.control.dirty || ctx.control.touched));
        } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_2__.NgForOf], encapsulation: 2 });
    return AbpValidationSummaryComponent;
}(_shared_app_component_base__WEBPACK_IMPORTED_MODULE_0__.AppComponentBase));



/***/ }),

/***/ 72481:
/*!*************************************************!*\
  !*** ./src/shared/directives/busy.directive.ts ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BusyDirective": function() { return /* binding */ BusyDirective; }
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 37716);

var BusyDirective = /** @class */ (function () {
    function BusyDirective(_element) {
        this._element = _element;
    }
    Object.defineProperty(BusyDirective.prototype, "busy", {
        set: function (isBusy) {
            this.refreshState(isBusy);
        },
        enumerable: false,
        configurable: true
    });
    BusyDirective.prototype.refreshState = function (isBusy) {
        if (isBusy === undefined) {
            return;
        }
        if (isBusy) {
            abp.ui.setBusy(this._element.nativeElement);
        }
        else {
            abp.ui.clearBusy(this._element.nativeElement);
        }
    };
    BusyDirective.ɵfac = function BusyDirective_Factory(t) { return new (t || BusyDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef)); };
    BusyDirective.ɵdir = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({ type: BusyDirective, selectors: [["", "busy", ""]], inputs: { busy: "busy" } });
    return BusyDirective;
}());



/***/ }),

/***/ 92591:
/*!************************************************************!*\
  !*** ./src/shared/directives/equal-validator.directive.ts ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EqualValidator": function() { return /* binding */ EqualValidator; }
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 37716);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ 3679);



var EqualValidator = /** @class */ (function () {
    function EqualValidator(validateEqual, reverse) {
        this.validateEqual = validateEqual;
        this.reverse = reverse;
    }
    Object.defineProperty(EqualValidator.prototype, "isReverse", {
        get: function () {
            if (!this.reverse) {
                return false;
            }
            return this.reverse === 'true' ? true : false;
        },
        enumerable: false,
        configurable: true
    });
    EqualValidator.prototype.validate = function (control) {
        // self value
        var value = control.value;
        // second control
        var control2 = control.root.get(this.validateEqual);
        // value not equal
        if (control2 && value !== control2.value && !this.isReverse) {
            return {
                validateEqual: true
            };
        }
        // value equal and reverse
        if (control2 && value === control2.value && this.isReverse) {
            delete control2.errors['validateEqual'];
            if (!Object.keys(control2.errors).length) {
                control2.setErrors(null);
            }
        }
        // value not equal and reverse
        if (control2 && value !== control2.value && this.isReverse) {
            control2.setErrors({ validateEqual: true });
        }
        return null;
    };
    EqualValidator.ɵfac = function EqualValidator_Factory(t) { return new (t || EqualValidator)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinjectAttribute"]('validateEqual'), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinjectAttribute"]('reverse')); };
    EqualValidator.ɵdir = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({ type: EqualValidator, selectors: [["", "validateEqual", "", "formControlName", ""], ["", "validateEqual", "", "formControl", ""], ["", "validateEqual", "", "ngModel", ""]], features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([
                {
                    provide: _angular_forms__WEBPACK_IMPORTED_MODULE_1__.NG_VALIDATORS,
                    useExisting: (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(function () { return EqualValidator; }),
                    multi: true
                }
            ])] });
    return EqualValidator;
}());



/***/ }),

/***/ 87737:
/*!*****************************************!*\
  !*** ./src/shared/helpers/UrlHelper.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UrlHelper": function() { return /* binding */ UrlHelper; }
/* harmony export */ });
var UrlHelper = /** @class */ (function () {
    function UrlHelper() {
    }
    UrlHelper.getQueryParameters = function () {
        return document.location.search
            .replace(/(^\?)/, '')
            .split('&')
            .map(function (n) { return n = n.split('='), this[n[0]] = n[1], this; }.bind({}))[0];
    };
    /**
     * The URL requested, before initial routing.
     */
    UrlHelper.initialUrl = location.href;
    return UrlHelper;
}());



/***/ }),

/***/ 91077:
/*!***************************************************!*\
  !*** ./src/shared/layout/layout-store.service.ts ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LayoutStoreService": function() { return /* binding */ LayoutStoreService; }
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 26215);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ 92996);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 87519);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 37716);



var LayoutStoreService = /** @class */ (function () {
    function LayoutStoreService() {
        this.initialLayoutConfig = {
            sidebarExpanded: true
        };
        this.configSource = new rxjs__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject(this.initialLayoutConfig);
        this.config$ = this.configSource.asObservable();
    }
    Object.defineProperty(LayoutStoreService.prototype, "sidebarExpanded", {
        get: function () {
            return this.config$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.pluck)('sidebarExpanded'), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.distinctUntilChanged)());
        },
        enumerable: false,
        configurable: true
    });
    LayoutStoreService.prototype.setSidebarExpanded = function (value) {
        this.configSource.next(Object.assign(this.configSource.value, { sidebarExpanded: value }));
    };
    LayoutStoreService.ɵfac = function LayoutStoreService_Factory(t) { return new (t || LayoutStoreService)(); };
    LayoutStoreService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({ token: LayoutStoreService, factory: LayoutStoreService.ɵfac });
    return LayoutStoreService;
}());



/***/ }),

/***/ 37936:
/*!*******************************************!*\
  !*** ./src/shared/nav/app-url.service.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppUrlService": function() { return /* binding */ AppUrlService; }
/* harmony export */ });
/* harmony import */ var _shared_AppConsts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @shared/AppConsts */ 85079);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 37716);
/* harmony import */ var _session_app_session_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../session/app-session.service */ 97558);



var AppUrlService = /** @class */ (function () {
    function AppUrlService(_appSessionService) {
        this._appSessionService = _appSessionService;
    }
    Object.defineProperty(AppUrlService.prototype, "appRootUrl", {
        get: function () {
            if (this._appSessionService.tenant) {
                return this.getAppRootUrlOfTenant(this._appSessionService.tenant.tenancyName);
            }
            else {
                return this.getAppRootUrlOfTenant(null);
            }
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Returning url ends with '/'.
     */
    AppUrlService.prototype.getAppRootUrlOfTenant = function (tenancyName) {
        var baseUrl = this.ensureEndsWith(_shared_AppConsts__WEBPACK_IMPORTED_MODULE_0__.AppConsts.appBaseUrl, '/');
        if (baseUrl.indexOf(AppUrlService.tenancyNamePlaceHolder) < 0) {
            return baseUrl;
        }
        if (baseUrl.indexOf(AppUrlService.tenancyNamePlaceHolder + '.') >= 0) {
            baseUrl = baseUrl.replace(AppUrlService.tenancyNamePlaceHolder + '.', AppUrlService.tenancyNamePlaceHolder);
            if (tenancyName) {
                tenancyName = tenancyName + '.';
            }
        }
        if (!tenancyName) {
            return baseUrl.replace(AppUrlService.tenancyNamePlaceHolder, '');
        }
        return baseUrl.replace(AppUrlService.tenancyNamePlaceHolder, tenancyName);
    };
    AppUrlService.prototype.ensureEndsWith = function (str, c) {
        if (str.charAt(str.length - 1) !== c) {
            str = str + c;
        }
        return str;
    };
    AppUrlService.prototype.removeFromEnd = function (str, c) {
        if (str.charAt(str.length - 1) === c) {
            str = str.substr(0, str.length - 1);
        }
        return str;
    };
    AppUrlService.tenancyNamePlaceHolder = '{TENANCY_NAME}';
    AppUrlService.ɵfac = function AppUrlService_Factory(t) { return new (t || AppUrlService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_session_app_session_service__WEBPACK_IMPORTED_MODULE_1__.AppSessionService)); };
    AppUrlService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({ token: AppUrlService, factory: AppUrlService.ɵfac });
    return AppUrlService;
}());



/***/ }),

/***/ 35832:
/*!*******************************************!*\
  !*** ./src/shared/pipes/localize.pipe.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LocalizePipe": function() { return /* binding */ LocalizePipe; }
/* harmony export */ });
/* harmony import */ var _shared_app_component_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @shared/app-component-base */ 16772);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 37716);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __read = (undefined && undefined.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};


var LocalizePipe = /** @class */ (function (_super) {
    __extends(LocalizePipe, _super);
    function LocalizePipe(injector) {
        return _super.call(this, injector) || this;
    }
    LocalizePipe.prototype.transform = function (key) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return this.l.apply(this, __spreadArray([key], __read(args)));
    };
    LocalizePipe.ɵfac = function LocalizePipe_Factory(t) { return new (t || LocalizePipe)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.Injector, 16)); };
    LocalizePipe.ɵpipe = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefinePipe"]({ name: "localize", type: LocalizePipe, pure: true });
    return LocalizePipe;
}(_shared_app_component_base__WEBPACK_IMPORTED_MODULE_0__.AppComponentBase));



/***/ }),

/***/ 37857:
/*!*******************************************************!*\
  !*** ./src/shared/service-proxies/service-proxies.ts ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "API_BASE_URL": function() { return /* binding */ API_BASE_URL; },
/* harmony export */   "AccountServiceProxy": function() { return /* binding */ AccountServiceProxy; },
/* harmony export */   "AssemblyDetectionServiceProxy": function() { return /* binding */ AssemblyDetectionServiceProxy; },
/* harmony export */   "ConfigurationServiceProxy": function() { return /* binding */ ConfigurationServiceProxy; },
/* harmony export */   "DetailedDashboardServiceProxy": function() { return /* binding */ DetailedDashboardServiceProxy; },
/* harmony export */   "OverviewDashboardServiceProxy": function() { return /* binding */ OverviewDashboardServiceProxy; },
/* harmony export */   "ProductServiceProxy": function() { return /* binding */ ProductServiceProxy; },
/* harmony export */   "RoleServiceProxy": function() { return /* binding */ RoleServiceProxy; },
/* harmony export */   "SessionServiceProxy": function() { return /* binding */ SessionServiceProxy; },
/* harmony export */   "StageServiceProxy": function() { return /* binding */ StageServiceProxy; },
/* harmony export */   "TenantServiceProxy": function() { return /* binding */ TenantServiceProxy; },
/* harmony export */   "TokenAuthServiceProxy": function() { return /* binding */ TokenAuthServiceProxy; },
/* harmony export */   "UserServiceProxy": function() { return /* binding */ UserServiceProxy; },
/* harmony export */   "ApplicationInfoDto": function() { return /* binding */ ApplicationInfoDto; },
/* harmony export */   "AssemblyDefectsDto": function() { return /* binding */ AssemblyDefectsDto; },
/* harmony export */   "AssemblyDetectionDto": function() { return /* binding */ AssemblyDetectionDto; },
/* harmony export */   "AssemblyDetectionDtoPagedResultDto": function() { return /* binding */ AssemblyDetectionDtoPagedResultDto; },
/* harmony export */   "AuthenticateModel": function() { return /* binding */ AuthenticateModel; },
/* harmony export */   "AuthenticateResultModel": function() { return /* binding */ AuthenticateResultModel; },
/* harmony export */   "ChangePasswordDto": function() { return /* binding */ ChangePasswordDto; },
/* harmony export */   "ChangeRefreshTimeDto": function() { return /* binding */ ChangeRefreshTimeDto; },
/* harmony export */   "ChangeUiThemeInput": function() { return /* binding */ ChangeUiThemeInput; },
/* harmony export */   "ChangeUserLanguageDto": function() { return /* binding */ ChangeUserLanguageDto; },
/* harmony export */   "CreateAssemblyDetectionDto": function() { return /* binding */ CreateAssemblyDetectionDto; },
/* harmony export */   "CreateRoleDto": function() { return /* binding */ CreateRoleDto; },
/* harmony export */   "CreateTenantDto": function() { return /* binding */ CreateTenantDto; },
/* harmony export */   "CreateUserDto": function() { return /* binding */ CreateUserDto; },
/* harmony export */   "DetailedAssemblyDefects": function() { return /* binding */ DetailedAssemblyDefects; },
/* harmony export */   "DetailedDefectiveRatio": function() { return /* binding */ DetailedDefectiveRatio; },
/* harmony export */   "DetailedDefectTrendDataDto": function() { return /* binding */ DetailedDefectTrendDataDto; },
/* harmony export */   "DetailedDefectTrendDto": function() { return /* binding */ DetailedDefectTrendDto; },
/* harmony export */   "DetailedGeneralInsightsDto": function() { return /* binding */ DetailedGeneralInsightsDto; },
/* harmony export */   "DetailedRevenueLossDataDto": function() { return /* binding */ DetailedRevenueLossDataDto; },
/* harmony export */   "DetailedRevenueLossDto": function() { return /* binding */ DetailedRevenueLossDto; },
/* harmony export */   "ExternalAuthenticateModel": function() { return /* binding */ ExternalAuthenticateModel; },
/* harmony export */   "ExternalAuthenticateResultModel": function() { return /* binding */ ExternalAuthenticateResultModel; },
/* harmony export */   "ExternalLoginProviderInfoModel": function() { return /* binding */ ExternalLoginProviderInfoModel; },
/* harmony export */   "FlatPermissionDto": function() { return /* binding */ FlatPermissionDto; },
/* harmony export */   "GetCurrentLoginInformationsOutput": function() { return /* binding */ GetCurrentLoginInformationsOutput; },
/* harmony export */   "GetRoleForEditOutput": function() { return /* binding */ GetRoleForEditOutput; },
/* harmony export */   "Int64EntityDto": function() { return /* binding */ Int64EntityDto; },
/* harmony export */   "IsTenantAvailableInput": function() { return /* binding */ IsTenantAvailableInput; },
/* harmony export */   "IsTenantAvailableOutput": function() { return /* binding */ IsTenantAvailableOutput; },
/* harmony export */   "OverviewDefectiveRatio": function() { return /* binding */ OverviewDefectiveRatio; },
/* harmony export */   "OverviewDefectRatioDto": function() { return /* binding */ OverviewDefectRatioDto; },
/* harmony export */   "OverviewDefectTrendDataDto": function() { return /* binding */ OverviewDefectTrendDataDto; },
/* harmony export */   "OverviewDefectTrendDto": function() { return /* binding */ OverviewDefectTrendDto; },
/* harmony export */   "OverviewGeneralInsightsDto": function() { return /* binding */ OverviewGeneralInsightsDto; },
/* harmony export */   "OverviewRevenueLossDataDto": function() { return /* binding */ OverviewRevenueLossDataDto; },
/* harmony export */   "OverviewRevenueLossDto": function() { return /* binding */ OverviewRevenueLossDto; },
/* harmony export */   "PermissionDto": function() { return /* binding */ PermissionDto; },
/* harmony export */   "PermissionDtoListResultDto": function() { return /* binding */ PermissionDtoListResultDto; },
/* harmony export */   "ProductDto": function() { return /* binding */ ProductDto; },
/* harmony export */   "ProductDtoListResultDto": function() { return /* binding */ ProductDtoListResultDto; },
/* harmony export */   "RegisterInput": function() { return /* binding */ RegisterInput; },
/* harmony export */   "RegisterOutput": function() { return /* binding */ RegisterOutput; },
/* harmony export */   "ResetPasswordDto": function() { return /* binding */ ResetPasswordDto; },
/* harmony export */   "RoleDto": function() { return /* binding */ RoleDto; },
/* harmony export */   "RoleDtoListResultDto": function() { return /* binding */ RoleDtoListResultDto; },
/* harmony export */   "RoleDtoPagedResultDto": function() { return /* binding */ RoleDtoPagedResultDto; },
/* harmony export */   "RoleEditDto": function() { return /* binding */ RoleEditDto; },
/* harmony export */   "RoleListDto": function() { return /* binding */ RoleListDto; },
/* harmony export */   "RoleListDtoListResultDto": function() { return /* binding */ RoleListDtoListResultDto; },
/* harmony export */   "StageDto": function() { return /* binding */ StageDto; },
/* harmony export */   "StageDtoListResultDto": function() { return /* binding */ StageDtoListResultDto; },
/* harmony export */   "TenantAvailabilityState": function() { return /* binding */ TenantAvailabilityState; },
/* harmony export */   "TenantDto": function() { return /* binding */ TenantDto; },
/* harmony export */   "TenantDtoPagedResultDto": function() { return /* binding */ TenantDtoPagedResultDto; },
/* harmony export */   "TenantLoginInfoDto": function() { return /* binding */ TenantLoginInfoDto; },
/* harmony export */   "UserDto": function() { return /* binding */ UserDto; },
/* harmony export */   "UserDtoPagedResultDto": function() { return /* binding */ UserDtoPagedResultDto; },
/* harmony export */   "UserLoginInfoDto": function() { return /* binding */ UserLoginInfoDto; },
/* harmony export */   "ApiException": function() { return /* binding */ ApiException; }
/* harmony export */ });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 19773);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 5304);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 40205);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 25917);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ 69165);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 37716);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 91841);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ 16738);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __values = (undefined && undefined.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
/* tslint:disable */
/* eslint-disable */
//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v13.9.3.0 (NJsonSchema v10.3.1.0 (Newtonsoft.Json v11.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------
// ReSharper disable InconsistentNaming







var API_BASE_URL = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.InjectionToken('API_BASE_URL');
var AccountServiceProxy = /** @class */ (function () {
    function AccountServiceProxy(http, baseUrl) {
        this.jsonParseReviver = undefined;
        this.http = http;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "";
    }
    /**
     * @param body (optional)
     * @return Success
     */
    AccountServiceProxy.prototype.isTenantAvailable = function (body) {
        var _this = this;
        var url_ = this.baseUrl + "/api/services/app/Account/IsTenantAvailable";
        url_ = url_.replace(/[?&]$/, "");
        var content_ = JSON.stringify(body);
        var options_ = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
                "Content-Type": "application/json-patch+json",
                "Accept": "text/plain"
            })
        };
        return this.http.request("post", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (response_) {
            return _this.processIsTenantAvailable(response_);
        })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(function (response_) {
            if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
                try {
                    return _this.processIsTenantAvailable(response_);
                }
                catch (e) {
                    return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
                }
            }
            else
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
        }));
    };
    AccountServiceProxy.prototype.processIsTenantAvailable = function (response) {
        var e_1, _a;
        var _this = this;
        var status = response.status;
        var responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body :
            response.error instanceof Blob ? response.error : undefined;
        var _headers = {};
        if (response.headers) {
            try {
                for (var _b = __values(response.headers.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var key = _c.value;
                    _headers[key] = response.headers.get(key);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        if (status === 200) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                var result200 = null;
                var resultData200 = _responseText === "" ? null : JSON.parse(_responseText, _this.jsonParseReviver);
                result200 = IsTenantAvailableOutput.fromJS(resultData200);
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
            }));
        }
        else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
    };
    /**
     * @param body (optional)
     * @return Success
     */
    AccountServiceProxy.prototype.register = function (body) {
        var _this = this;
        var url_ = this.baseUrl + "/api/services/app/Account/Register";
        url_ = url_.replace(/[?&]$/, "");
        var content_ = JSON.stringify(body);
        var options_ = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
                "Content-Type": "application/json-patch+json",
                "Accept": "text/plain"
            })
        };
        return this.http.request("post", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (response_) {
            return _this.processRegister(response_);
        })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(function (response_) {
            if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
                try {
                    return _this.processRegister(response_);
                }
                catch (e) {
                    return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
                }
            }
            else
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
        }));
    };
    AccountServiceProxy.prototype.processRegister = function (response) {
        var e_2, _a;
        var _this = this;
        var status = response.status;
        var responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body :
            response.error instanceof Blob ? response.error : undefined;
        var _headers = {};
        if (response.headers) {
            try {
                for (var _b = __values(response.headers.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var key = _c.value;
                    _headers[key] = response.headers.get(key);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
        if (status === 200) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                var result200 = null;
                var resultData200 = _responseText === "" ? null : JSON.parse(_responseText, _this.jsonParseReviver);
                result200 = RegisterOutput.fromJS(resultData200);
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
            }));
        }
        else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
    };
    AccountServiceProxy.ɵfac = function AccountServiceProxy_Factory(t) { return new (t || AccountServiceProxy)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](API_BASE_URL, 8)); };
    AccountServiceProxy.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: AccountServiceProxy, factory: AccountServiceProxy.ɵfac });
    return AccountServiceProxy;
}());

var AssemblyDetectionServiceProxy = /** @class */ (function () {
    function AssemblyDetectionServiceProxy(http, baseUrl) {
        this.jsonParseReviver = undefined;
        this.http = http;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "";
    }
    /**
     * @param body (optional)
     * @return Success
     */
    AssemblyDetectionServiceProxy.prototype.addNewDetection = function (body) {
        var _this = this;
        var url_ = this.baseUrl + "/api/services/app/AssemblyDetection/AddNewDetection";
        url_ = url_.replace(/[?&]$/, "");
        var content_ = JSON.stringify(body);
        var options_ = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
                "Content-Type": "application/json-patch+json",
            })
        };
        return this.http.request("post", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (response_) {
            return _this.processAddNewDetection(response_);
        })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(function (response_) {
            if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
                try {
                    return _this.processAddNewDetection(response_);
                }
                catch (e) {
                    return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
                }
            }
            else
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
        }));
    };
    AssemblyDetectionServiceProxy.prototype.processAddNewDetection = function (response) {
        var e_3, _a;
        var status = response.status;
        var responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body :
            response.error instanceof Blob ? response.error : undefined;
        var _headers = {};
        if (response.headers) {
            try {
                for (var _b = __values(response.headers.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var key = _c.value;
                    _headers[key] = response.headers.get(key);
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_3) throw e_3.error; }
            }
        }
        if (status === 200) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
            }));
        }
        else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
    };
    /**
     * @param body (optional)
     * @return Success
     */
    AssemblyDetectionServiceProxy.prototype.addBulkDetections = function (body) {
        var _this = this;
        var url_ = this.baseUrl + "/api/services/app/AssemblyDetection/AddBulkDetections";
        url_ = url_.replace(/[?&]$/, "");
        var content_ = JSON.stringify(body);
        var options_ = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
                "Content-Type": "application/json-patch+json",
            })
        };
        return this.http.request("post", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (response_) {
            return _this.processAddBulkDetections(response_);
        })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(function (response_) {
            if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
                try {
                    return _this.processAddBulkDetections(response_);
                }
                catch (e) {
                    return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
                }
            }
            else
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
        }));
    };
    AssemblyDetectionServiceProxy.prototype.processAddBulkDetections = function (response) {
        var e_4, _a;
        var status = response.status;
        var responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body :
            response.error instanceof Blob ? response.error : undefined;
        var _headers = {};
        if (response.headers) {
            try {
                for (var _b = __values(response.headers.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var key = _c.value;
                    _headers[key] = response.headers.get(key);
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_4) throw e_4.error; }
            }
        }
        if (status === 200) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
            }));
        }
        else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
    };
    /**
     * @param id (optional)
     * @return Success
     */
    AssemblyDetectionServiceProxy.prototype.get = function (id) {
        var _this = this;
        var url_ = this.baseUrl + "/api/services/app/AssemblyDetection/Get?";
        if (id === null)
            throw new Error("The parameter 'id' cannot be null.");
        else if (id !== undefined)
            url_ += "Id=" + encodeURIComponent("" + id) + "&";
        url_ = url_.replace(/[?&]$/, "");
        var options_ = {
            observe: "response",
            responseType: "blob",
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
                "Accept": "text/plain"
            })
        };
        return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (response_) {
            return _this.processGet(response_);
        })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(function (response_) {
            if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
                try {
                    return _this.processGet(response_);
                }
                catch (e) {
                    return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
                }
            }
            else
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
        }));
    };
    AssemblyDetectionServiceProxy.prototype.processGet = function (response) {
        var e_5, _a;
        var _this = this;
        var status = response.status;
        var responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body :
            response.error instanceof Blob ? response.error : undefined;
        var _headers = {};
        if (response.headers) {
            try {
                for (var _b = __values(response.headers.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var key = _c.value;
                    _headers[key] = response.headers.get(key);
                }
            }
            catch (e_5_1) { e_5 = { error: e_5_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_5) throw e_5.error; }
            }
        }
        if (status === 200) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                var result200 = null;
                var resultData200 = _responseText === "" ? null : JSON.parse(_responseText, _this.jsonParseReviver);
                result200 = AssemblyDetectionDto.fromJS(resultData200);
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
            }));
        }
        else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
    };
    /**
     * @param skipCount (optional)
     * @param maxResultCount (optional)
     * @return Success
     */
    AssemblyDetectionServiceProxy.prototype.getAll = function (skipCount, maxResultCount) {
        var _this = this;
        var url_ = this.baseUrl + "/api/services/app/AssemblyDetection/GetAll?";
        if (skipCount === null)
            throw new Error("The parameter 'skipCount' cannot be null.");
        else if (skipCount !== undefined)
            url_ += "SkipCount=" + encodeURIComponent("" + skipCount) + "&";
        if (maxResultCount === null)
            throw new Error("The parameter 'maxResultCount' cannot be null.");
        else if (maxResultCount !== undefined)
            url_ += "MaxResultCount=" + encodeURIComponent("" + maxResultCount) + "&";
        url_ = url_.replace(/[?&]$/, "");
        var options_ = {
            observe: "response",
            responseType: "blob",
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
                "Accept": "text/plain"
            })
        };
        return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (response_) {
            return _this.processGetAll(response_);
        })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(function (response_) {
            if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
                try {
                    return _this.processGetAll(response_);
                }
                catch (e) {
                    return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
                }
            }
            else
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
        }));
    };
    AssemblyDetectionServiceProxy.prototype.processGetAll = function (response) {
        var e_6, _a;
        var _this = this;
        var status = response.status;
        var responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body :
            response.error instanceof Blob ? response.error : undefined;
        var _headers = {};
        if (response.headers) {
            try {
                for (var _b = __values(response.headers.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var key = _c.value;
                    _headers[key] = response.headers.get(key);
                }
            }
            catch (e_6_1) { e_6 = { error: e_6_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_6) throw e_6.error; }
            }
        }
        if (status === 200) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                var result200 = null;
                var resultData200 = _responseText === "" ? null : JSON.parse(_responseText, _this.jsonParseReviver);
                result200 = AssemblyDetectionDtoPagedResultDto.fromJS(resultData200);
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
            }));
        }
        else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
    };
    /**
     * @param body (optional)
     * @return Success
     */
    AssemblyDetectionServiceProxy.prototype.create = function (body) {
        var _this = this;
        var url_ = this.baseUrl + "/api/services/app/AssemblyDetection/Create";
        url_ = url_.replace(/[?&]$/, "");
        var content_ = JSON.stringify(body);
        var options_ = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
                "Content-Type": "application/json-patch+json",
                "Accept": "text/plain"
            })
        };
        return this.http.request("post", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (response_) {
            return _this.processCreate(response_);
        })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(function (response_) {
            if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
                try {
                    return _this.processCreate(response_);
                }
                catch (e) {
                    return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
                }
            }
            else
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
        }));
    };
    AssemblyDetectionServiceProxy.prototype.processCreate = function (response) {
        var e_7, _a;
        var _this = this;
        var status = response.status;
        var responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body :
            response.error instanceof Blob ? response.error : undefined;
        var _headers = {};
        if (response.headers) {
            try {
                for (var _b = __values(response.headers.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var key = _c.value;
                    _headers[key] = response.headers.get(key);
                }
            }
            catch (e_7_1) { e_7 = { error: e_7_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_7) throw e_7.error; }
            }
        }
        if (status === 200) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                var result200 = null;
                var resultData200 = _responseText === "" ? null : JSON.parse(_responseText, _this.jsonParseReviver);
                result200 = AssemblyDetectionDto.fromJS(resultData200);
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
            }));
        }
        else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
    };
    /**
     * @param body (optional)
     * @return Success
     */
    AssemblyDetectionServiceProxy.prototype.update = function (body) {
        var _this = this;
        var url_ = this.baseUrl + "/api/services/app/AssemblyDetection/Update";
        url_ = url_.replace(/[?&]$/, "");
        var content_ = JSON.stringify(body);
        var options_ = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
                "Content-Type": "application/json-patch+json",
                "Accept": "text/plain"
            })
        };
        return this.http.request("put", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (response_) {
            return _this.processUpdate(response_);
        })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(function (response_) {
            if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
                try {
                    return _this.processUpdate(response_);
                }
                catch (e) {
                    return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
                }
            }
            else
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
        }));
    };
    AssemblyDetectionServiceProxy.prototype.processUpdate = function (response) {
        var e_8, _a;
        var _this = this;
        var status = response.status;
        var responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body :
            response.error instanceof Blob ? response.error : undefined;
        var _headers = {};
        if (response.headers) {
            try {
                for (var _b = __values(response.headers.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var key = _c.value;
                    _headers[key] = response.headers.get(key);
                }
            }
            catch (e_8_1) { e_8 = { error: e_8_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_8) throw e_8.error; }
            }
        }
        if (status === 200) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                var result200 = null;
                var resultData200 = _responseText === "" ? null : JSON.parse(_responseText, _this.jsonParseReviver);
                result200 = AssemblyDetectionDto.fromJS(resultData200);
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
            }));
        }
        else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
    };
    /**
     * @param id (optional)
     * @return Success
     */
    AssemblyDetectionServiceProxy.prototype.delete = function (id) {
        var _this = this;
        var url_ = this.baseUrl + "/api/services/app/AssemblyDetection/Delete?";
        if (id === null)
            throw new Error("The parameter 'id' cannot be null.");
        else if (id !== undefined)
            url_ += "Id=" + encodeURIComponent("" + id) + "&";
        url_ = url_.replace(/[?&]$/, "");
        var options_ = {
            observe: "response",
            responseType: "blob",
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({})
        };
        return this.http.request("delete", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (response_) {
            return _this.processDelete(response_);
        })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(function (response_) {
            if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
                try {
                    return _this.processDelete(response_);
                }
                catch (e) {
                    return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
                }
            }
            else
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
        }));
    };
    AssemblyDetectionServiceProxy.prototype.processDelete = function (response) {
        var e_9, _a;
        var status = response.status;
        var responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body :
            response.error instanceof Blob ? response.error : undefined;
        var _headers = {};
        if (response.headers) {
            try {
                for (var _b = __values(response.headers.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var key = _c.value;
                    _headers[key] = response.headers.get(key);
                }
            }
            catch (e_9_1) { e_9 = { error: e_9_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_9) throw e_9.error; }
            }
        }
        if (status === 200) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
            }));
        }
        else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
    };
    AssemblyDetectionServiceProxy.ɵfac = function AssemblyDetectionServiceProxy_Factory(t) { return new (t || AssemblyDetectionServiceProxy)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](API_BASE_URL, 8)); };
    AssemblyDetectionServiceProxy.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: AssemblyDetectionServiceProxy, factory: AssemblyDetectionServiceProxy.ɵfac });
    return AssemblyDetectionServiceProxy;
}());

var ConfigurationServiceProxy = /** @class */ (function () {
    function ConfigurationServiceProxy(http, baseUrl) {
        this.jsonParseReviver = undefined;
        this.http = http;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "";
    }
    /**
     * @param body (optional)
     * @return Success
     */
    ConfigurationServiceProxy.prototype.changeUiTheme = function (body) {
        var _this = this;
        var url_ = this.baseUrl + "/api/services/app/Configuration/ChangeUiTheme";
        url_ = url_.replace(/[?&]$/, "");
        var content_ = JSON.stringify(body);
        var options_ = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
                "Content-Type": "application/json-patch+json",
            })
        };
        return this.http.request("post", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (response_) {
            return _this.processChangeUiTheme(response_);
        })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(function (response_) {
            if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
                try {
                    return _this.processChangeUiTheme(response_);
                }
                catch (e) {
                    return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
                }
            }
            else
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
        }));
    };
    ConfigurationServiceProxy.prototype.processChangeUiTheme = function (response) {
        var e_10, _a;
        var status = response.status;
        var responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body :
            response.error instanceof Blob ? response.error : undefined;
        var _headers = {};
        if (response.headers) {
            try {
                for (var _b = __values(response.headers.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var key = _c.value;
                    _headers[key] = response.headers.get(key);
                }
            }
            catch (e_10_1) { e_10 = { error: e_10_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_10) throw e_10.error; }
            }
        }
        if (status === 200) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
            }));
        }
        else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
    };
    ConfigurationServiceProxy.ɵfac = function ConfigurationServiceProxy_Factory(t) { return new (t || ConfigurationServiceProxy)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](API_BASE_URL, 8)); };
    ConfigurationServiceProxy.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: ConfigurationServiceProxy, factory: ConfigurationServiceProxy.ɵfac });
    return ConfigurationServiceProxy;
}());

var DetailedDashboardServiceProxy = /** @class */ (function () {
    function DetailedDashboardServiceProxy(http, baseUrl) {
        this.jsonParseReviver = undefined;
        this.http = http;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "";
    }
    /**
     * @param duration (optional)
     * @param productId (optional)
     * @param stageId (optional)
     * @return Success
     */
    DetailedDashboardServiceProxy.prototype.getGeneralInsights = function (duration, productId, stageId) {
        var _this = this;
        var url_ = this.baseUrl + "/api/services/app/DetailedDashboard/GetGeneralInsights?";
        if (duration === null)
            throw new Error("The parameter 'duration' cannot be null.");
        else if (duration !== undefined)
            url_ += "duration=" + encodeURIComponent("" + duration) + "&";
        if (productId === null)
            throw new Error("The parameter 'productId' cannot be null.");
        else if (productId !== undefined)
            url_ += "productId=" + encodeURIComponent("" + productId) + "&";
        if (stageId === null)
            throw new Error("The parameter 'stageId' cannot be null.");
        else if (stageId !== undefined)
            url_ += "stageId=" + encodeURIComponent("" + stageId) + "&";
        url_ = url_.replace(/[?&]$/, "");
        var options_ = {
            observe: "response",
            responseType: "blob",
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
                "Accept": "text/plain"
            })
        };
        return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (response_) {
            return _this.processGetGeneralInsights(response_);
        })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(function (response_) {
            if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
                try {
                    return _this.processGetGeneralInsights(response_);
                }
                catch (e) {
                    return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
                }
            }
            else
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
        }));
    };
    DetailedDashboardServiceProxy.prototype.processGetGeneralInsights = function (response) {
        var e_11, _a;
        var _this = this;
        var status = response.status;
        var responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body :
            response.error instanceof Blob ? response.error : undefined;
        var _headers = {};
        if (response.headers) {
            try {
                for (var _b = __values(response.headers.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var key = _c.value;
                    _headers[key] = response.headers.get(key);
                }
            }
            catch (e_11_1) { e_11 = { error: e_11_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_11) throw e_11.error; }
            }
        }
        if (status === 200) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                var result200 = null;
                var resultData200 = _responseText === "" ? null : JSON.parse(_responseText, _this.jsonParseReviver);
                result200 = DetailedGeneralInsightsDto.fromJS(resultData200);
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
            }));
        }
        else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
    };
    /**
     * @param duration (optional)
     * @param productId (optional)
     * @param stageId (optional)
     * @return Success
     */
    DetailedDashboardServiceProxy.prototype.getDefectTrend = function (duration, productId, stageId) {
        var _this = this;
        var url_ = this.baseUrl + "/api/services/app/DetailedDashboard/GetDefectTrend?";
        if (duration === null)
            throw new Error("The parameter 'duration' cannot be null.");
        else if (duration !== undefined)
            url_ += "duration=" + encodeURIComponent("" + duration) + "&";
        if (productId === null)
            throw new Error("The parameter 'productId' cannot be null.");
        else if (productId !== undefined)
            url_ += "productId=" + encodeURIComponent("" + productId) + "&";
        if (stageId === null)
            throw new Error("The parameter 'stageId' cannot be null.");
        else if (stageId !== undefined)
            url_ += "stageId=" + encodeURIComponent("" + stageId) + "&";
        url_ = url_.replace(/[?&]$/, "");
        var options_ = {
            observe: "response",
            responseType: "blob",
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
                "Accept": "text/plain"
            })
        };
        return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (response_) {
            return _this.processGetDefectTrend(response_);
        })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(function (response_) {
            if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
                try {
                    return _this.processGetDefectTrend(response_);
                }
                catch (e) {
                    return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
                }
            }
            else
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
        }));
    };
    DetailedDashboardServiceProxy.prototype.processGetDefectTrend = function (response) {
        var e_12, _a;
        var _this = this;
        var status = response.status;
        var responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body :
            response.error instanceof Blob ? response.error : undefined;
        var _headers = {};
        if (response.headers) {
            try {
                for (var _b = __values(response.headers.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var key = _c.value;
                    _headers[key] = response.headers.get(key);
                }
            }
            catch (e_12_1) { e_12 = { error: e_12_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_12) throw e_12.error; }
            }
        }
        if (status === 200) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                var result200 = null;
                var resultData200 = _responseText === "" ? null : JSON.parse(_responseText, _this.jsonParseReviver);
                result200 = DetailedDefectTrendDto.fromJS(resultData200);
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
            }));
        }
        else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
    };
    /**
     * @param duration (optional)
     * @param productId (optional)
     * @param stageId (optional)
     * @return Success
     */
    DetailedDashboardServiceProxy.prototype.getRevenueLoss = function (duration, productId, stageId) {
        var _this = this;
        var url_ = this.baseUrl + "/api/services/app/DetailedDashboard/GetRevenueLoss?";
        if (duration === null)
            throw new Error("The parameter 'duration' cannot be null.");
        else if (duration !== undefined)
            url_ += "duration=" + encodeURIComponent("" + duration) + "&";
        if (productId === null)
            throw new Error("The parameter 'productId' cannot be null.");
        else if (productId !== undefined)
            url_ += "productId=" + encodeURIComponent("" + productId) + "&";
        if (stageId === null)
            throw new Error("The parameter 'stageId' cannot be null.");
        else if (stageId !== undefined)
            url_ += "stageId=" + encodeURIComponent("" + stageId) + "&";
        url_ = url_.replace(/[?&]$/, "");
        var options_ = {
            observe: "response",
            responseType: "blob",
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
                "Accept": "text/plain"
            })
        };
        return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (response_) {
            return _this.processGetRevenueLoss(response_);
        })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(function (response_) {
            if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
                try {
                    return _this.processGetRevenueLoss(response_);
                }
                catch (e) {
                    return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
                }
            }
            else
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
        }));
    };
    DetailedDashboardServiceProxy.prototype.processGetRevenueLoss = function (response) {
        var e_13, _a;
        var _this = this;
        var status = response.status;
        var responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body :
            response.error instanceof Blob ? response.error : undefined;
        var _headers = {};
        if (response.headers) {
            try {
                for (var _b = __values(response.headers.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var key = _c.value;
                    _headers[key] = response.headers.get(key);
                }
            }
            catch (e_13_1) { e_13 = { error: e_13_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_13) throw e_13.error; }
            }
        }
        if (status === 200) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                var result200 = null;
                var resultData200 = _responseText === "" ? null : JSON.parse(_responseText, _this.jsonParseReviver);
                result200 = DetailedRevenueLossDto.fromJS(resultData200);
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
            }));
        }
        else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
    };
    /**
     * @param duration (optional)
     * @param productId (optional)
     * @param stageId (optional)
     * @return Success
     */
    DetailedDashboardServiceProxy.prototype.getAssemblyDefects = function (duration, productId, stageId) {
        var _this = this;
        var url_ = this.baseUrl + "/api/services/app/DetailedDashboard/GetAssemblyDefects?";
        if (duration === null)
            throw new Error("The parameter 'duration' cannot be null.");
        else if (duration !== undefined)
            url_ += "duration=" + encodeURIComponent("" + duration) + "&";
        if (productId === null)
            throw new Error("The parameter 'productId' cannot be null.");
        else if (productId !== undefined)
            url_ += "productId=" + encodeURIComponent("" + productId) + "&";
        if (stageId === null)
            throw new Error("The parameter 'stageId' cannot be null.");
        else if (stageId !== undefined)
            url_ += "stageId=" + encodeURIComponent("" + stageId) + "&";
        url_ = url_.replace(/[?&]$/, "");
        var options_ = {
            observe: "response",
            responseType: "blob",
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
                "Accept": "text/plain"
            })
        };
        return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (response_) {
            return _this.processGetAssemblyDefects(response_);
        })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(function (response_) {
            if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
                try {
                    return _this.processGetAssemblyDefects(response_);
                }
                catch (e) {
                    return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
                }
            }
            else
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
        }));
    };
    DetailedDashboardServiceProxy.prototype.processGetAssemblyDefects = function (response) {
        var e_14, _a;
        var _this = this;
        var status = response.status;
        var responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body :
            response.error instanceof Blob ? response.error : undefined;
        var _headers = {};
        if (response.headers) {
            try {
                for (var _b = __values(response.headers.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var key = _c.value;
                    _headers[key] = response.headers.get(key);
                }
            }
            catch (e_14_1) { e_14 = { error: e_14_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_14) throw e_14.error; }
            }
        }
        if (status === 200) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                var result200 = null;
                var resultData200 = _responseText === "" ? null : JSON.parse(_responseText, _this.jsonParseReviver);
                result200 = DetailedAssemblyDefects.fromJS(resultData200);
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
            }));
        }
        else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
    };
    /**
     * @param duration (optional)
     * @param productId (optional)
     * @param stageId (optional)
     * @return Success
     */
    DetailedDashboardServiceProxy.prototype.getDefectiveRatio = function (duration, productId, stageId) {
        var _this = this;
        var url_ = this.baseUrl + "/api/services/app/DetailedDashboard/GetDefectiveRatio?";
        if (duration === null)
            throw new Error("The parameter 'duration' cannot be null.");
        else if (duration !== undefined)
            url_ += "duration=" + encodeURIComponent("" + duration) + "&";
        if (productId === null)
            throw new Error("The parameter 'productId' cannot be null.");
        else if (productId !== undefined)
            url_ += "productId=" + encodeURIComponent("" + productId) + "&";
        if (stageId === null)
            throw new Error("The parameter 'stageId' cannot be null.");
        else if (stageId !== undefined)
            url_ += "stageId=" + encodeURIComponent("" + stageId) + "&";
        url_ = url_.replace(/[?&]$/, "");
        var options_ = {
            observe: "response",
            responseType: "blob",
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
                "Accept": "text/plain"
            })
        };
        return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (response_) {
            return _this.processGetDefectiveRatio(response_);
        })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(function (response_) {
            if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
                try {
                    return _this.processGetDefectiveRatio(response_);
                }
                catch (e) {
                    return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
                }
            }
            else
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
        }));
    };
    DetailedDashboardServiceProxy.prototype.processGetDefectiveRatio = function (response) {
        var e_15, _a;
        var _this = this;
        var status = response.status;
        var responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body :
            response.error instanceof Blob ? response.error : undefined;
        var _headers = {};
        if (response.headers) {
            try {
                for (var _b = __values(response.headers.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var key = _c.value;
                    _headers[key] = response.headers.get(key);
                }
            }
            catch (e_15_1) { e_15 = { error: e_15_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_15) throw e_15.error; }
            }
        }
        if (status === 200) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                var result200 = null;
                var resultData200 = _responseText === "" ? null : JSON.parse(_responseText, _this.jsonParseReviver);
                result200 = DetailedDefectiveRatio.fromJS(resultData200);
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
            }));
        }
        else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
    };
    DetailedDashboardServiceProxy.ɵfac = function DetailedDashboardServiceProxy_Factory(t) { return new (t || DetailedDashboardServiceProxy)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](API_BASE_URL, 8)); };
    DetailedDashboardServiceProxy.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: DetailedDashboardServiceProxy, factory: DetailedDashboardServiceProxy.ɵfac });
    return DetailedDashboardServiceProxy;
}());

var OverviewDashboardServiceProxy = /** @class */ (function () {
    function OverviewDashboardServiceProxy(http, baseUrl) {
        this.jsonParseReviver = undefined;
        this.http = http;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "";
    }
    /**
     * @param randLimit (optional)
     * @param from (optional)
     * @param to (optional)
     * @return Success
     */
    OverviewDashboardServiceProxy.prototype.fillGoodData = function (randLimit, from, to) {
        var _this = this;
        var url_ = this.baseUrl + "/api/services/app/OverviewDashboard/FillGoodData?";
        if (randLimit === null)
            throw new Error("The parameter 'randLimit' cannot be null.");
        else if (randLimit !== undefined)
            url_ += "randLimit=" + encodeURIComponent("" + randLimit) + "&";
        if (from === null)
            throw new Error("The parameter 'from' cannot be null.");
        else if (from !== undefined)
            url_ += "from=" + encodeURIComponent(from ? "" + from.toJSON() : "") + "&";
        if (to === null)
            throw new Error("The parameter 'to' cannot be null.");
        else if (to !== undefined)
            url_ += "to=" + encodeURIComponent(to ? "" + to.toJSON() : "") + "&";
        url_ = url_.replace(/[?&]$/, "");
        var options_ = {
            observe: "response",
            responseType: "blob",
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({})
        };
        return this.http.request("post", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (response_) {
            return _this.processFillGoodData(response_);
        })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(function (response_) {
            if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
                try {
                    return _this.processFillGoodData(response_);
                }
                catch (e) {
                    return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
                }
            }
            else
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
        }));
    };
    OverviewDashboardServiceProxy.prototype.processFillGoodData = function (response) {
        var e_16, _a;
        var status = response.status;
        var responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body :
            response.error instanceof Blob ? response.error : undefined;
        var _headers = {};
        if (response.headers) {
            try {
                for (var _b = __values(response.headers.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var key = _c.value;
                    _headers[key] = response.headers.get(key);
                }
            }
            catch (e_16_1) { e_16 = { error: e_16_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_16) throw e_16.error; }
            }
        }
        if (status === 200) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
            }));
        }
        else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
    };
    /**
     * @param step (optional)
     * @param perDayCount (optional)
     * @param from (optional)
     * @param to (optional)
     * @return Success
     */
    OverviewDashboardServiceProxy.prototype.fillData = function (step, perDayCount, from, to) {
        var _this = this;
        var url_ = this.baseUrl + "/api/services/app/OverviewDashboard/FillData?";
        if (step === null)
            throw new Error("The parameter 'step' cannot be null.");
        else if (step !== undefined)
            url_ += "step=" + encodeURIComponent("" + step) + "&";
        if (perDayCount === null)
            throw new Error("The parameter 'perDayCount' cannot be null.");
        else if (perDayCount !== undefined)
            url_ += "perDayCount=" + encodeURIComponent("" + perDayCount) + "&";
        if (from === null)
            throw new Error("The parameter 'from' cannot be null.");
        else if (from !== undefined)
            url_ += "from=" + encodeURIComponent(from ? "" + from.toJSON() : "") + "&";
        if (to === null)
            throw new Error("The parameter 'to' cannot be null.");
        else if (to !== undefined)
            url_ += "to=" + encodeURIComponent(to ? "" + to.toJSON() : "") + "&";
        url_ = url_.replace(/[?&]$/, "");
        var options_ = {
            observe: "response",
            responseType: "blob",
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({})
        };
        return this.http.request("post", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (response_) {
            return _this.processFillData(response_);
        })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(function (response_) {
            if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
                try {
                    return _this.processFillData(response_);
                }
                catch (e) {
                    return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
                }
            }
            else
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
        }));
    };
    OverviewDashboardServiceProxy.prototype.processFillData = function (response) {
        var e_17, _a;
        var status = response.status;
        var responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body :
            response.error instanceof Blob ? response.error : undefined;
        var _headers = {};
        if (response.headers) {
            try {
                for (var _b = __values(response.headers.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var key = _c.value;
                    _headers[key] = response.headers.get(key);
                }
            }
            catch (e_17_1) { e_17 = { error: e_17_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_17) throw e_17.error; }
            }
        }
        if (status === 200) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
            }));
        }
        else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
    };
    /**
     * @param duration (optional)
     * @return Success
     */
    OverviewDashboardServiceProxy.prototype.getGeneralInsights = function (duration) {
        var _this = this;
        var url_ = this.baseUrl + "/api/services/app/OverviewDashboard/GetGeneralInsights?";
        if (duration === null)
            throw new Error("The parameter 'duration' cannot be null.");
        else if (duration !== undefined)
            url_ += "duration=" + encodeURIComponent("" + duration) + "&";
        url_ = url_.replace(/[?&]$/, "");
        var options_ = {
            observe: "response",
            responseType: "blob",
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
                "Accept": "text/plain"
            })
        };
        return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (response_) {
            return _this.processGetGeneralInsights(response_);
        })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(function (response_) {
            if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
                try {
                    return _this.processGetGeneralInsights(response_);
                }
                catch (e) {
                    return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
                }
            }
            else
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
        }));
    };
    OverviewDashboardServiceProxy.prototype.processGetGeneralInsights = function (response) {
        var e_18, _a;
        var _this = this;
        var status = response.status;
        var responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body :
            response.error instanceof Blob ? response.error : undefined;
        var _headers = {};
        if (response.headers) {
            try {
                for (var _b = __values(response.headers.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var key = _c.value;
                    _headers[key] = response.headers.get(key);
                }
            }
            catch (e_18_1) { e_18 = { error: e_18_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_18) throw e_18.error; }
            }
        }
        if (status === 200) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                var result200 = null;
                var resultData200 = _responseText === "" ? null : JSON.parse(_responseText, _this.jsonParseReviver);
                result200 = OverviewGeneralInsightsDto.fromJS(resultData200);
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
            }));
        }
        else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
    };
    /**
     * @param duration (optional)
     * @return Success
     */
    OverviewDashboardServiceProxy.prototype.getProductRevenueLoss = function (duration) {
        var _this = this;
        var url_ = this.baseUrl + "/api/services/app/OverviewDashboard/GetProductRevenueLoss?";
        if (duration === null)
            throw new Error("The parameter 'duration' cannot be null.");
        else if (duration !== undefined)
            url_ += "duration=" + encodeURIComponent("" + duration) + "&";
        url_ = url_.replace(/[?&]$/, "");
        var options_ = {
            observe: "response",
            responseType: "blob",
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
                "Accept": "text/plain"
            })
        };
        return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (response_) {
            return _this.processGetProductRevenueLoss(response_);
        })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(function (response_) {
            if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
                try {
                    return _this.processGetProductRevenueLoss(response_);
                }
                catch (e) {
                    return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
                }
            }
            else
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
        }));
    };
    OverviewDashboardServiceProxy.prototype.processGetProductRevenueLoss = function (response) {
        var e_19, _a;
        var _this = this;
        var status = response.status;
        var responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body :
            response.error instanceof Blob ? response.error : undefined;
        var _headers = {};
        if (response.headers) {
            try {
                for (var _b = __values(response.headers.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var key = _c.value;
                    _headers[key] = response.headers.get(key);
                }
            }
            catch (e_19_1) { e_19 = { error: e_19_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_19) throw e_19.error; }
            }
        }
        if (status === 200) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                var result200 = null;
                var resultData200 = _responseText === "" ? null : JSON.parse(_responseText, _this.jsonParseReviver);
                result200 = OverviewRevenueLossDto.fromJS(resultData200);
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
            }));
        }
        else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
    };
    /**
     * @param duration (optional)
     * @return Success
     */
    OverviewDashboardServiceProxy.prototype.getProductDefectRatio = function (duration) {
        var _this = this;
        var url_ = this.baseUrl + "/api/services/app/OverviewDashboard/GetProductDefectRatio?";
        if (duration === null)
            throw new Error("The parameter 'duration' cannot be null.");
        else if (duration !== undefined)
            url_ += "duration=" + encodeURIComponent("" + duration) + "&";
        url_ = url_.replace(/[?&]$/, "");
        var options_ = {
            observe: "response",
            responseType: "blob",
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
                "Accept": "text/plain"
            })
        };
        return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (response_) {
            return _this.processGetProductDefectRatio(response_);
        })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(function (response_) {
            if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
                try {
                    return _this.processGetProductDefectRatio(response_);
                }
                catch (e) {
                    return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
                }
            }
            else
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
        }));
    };
    OverviewDashboardServiceProxy.prototype.processGetProductDefectRatio = function (response) {
        var e_20, _a;
        var _this = this;
        var status = response.status;
        var responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body :
            response.error instanceof Blob ? response.error : undefined;
        var _headers = {};
        if (response.headers) {
            try {
                for (var _b = __values(response.headers.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var key = _c.value;
                    _headers[key] = response.headers.get(key);
                }
            }
            catch (e_20_1) { e_20 = { error: e_20_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_20) throw e_20.error; }
            }
        }
        if (status === 200) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                var result200 = null;
                var resultData200 = _responseText === "" ? null : JSON.parse(_responseText, _this.jsonParseReviver);
                result200 = OverviewDefectRatioDto.fromJS(resultData200);
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
            }));
        }
        else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
    };
    /**
     * @param duration (optional)
     * @return Success
     */
    OverviewDashboardServiceProxy.prototype.getDefectiveProducts = function (duration) {
        var _this = this;
        var url_ = this.baseUrl + "/api/services/app/OverviewDashboard/GetDefectiveProducts?";
        if (duration === null)
            throw new Error("The parameter 'duration' cannot be null.");
        else if (duration !== undefined)
            url_ += "duration=" + encodeURIComponent("" + duration) + "&";
        url_ = url_.replace(/[?&]$/, "");
        var options_ = {
            observe: "response",
            responseType: "blob",
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
                "Accept": "text/plain"
            })
        };
        return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (response_) {
            return _this.processGetDefectiveProducts(response_);
        })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(function (response_) {
            if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
                try {
                    return _this.processGetDefectiveProducts(response_);
                }
                catch (e) {
                    return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
                }
            }
            else
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
        }));
    };
    OverviewDashboardServiceProxy.prototype.processGetDefectiveProducts = function (response) {
        var e_21, _a;
        var _this = this;
        var status = response.status;
        var responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body :
            response.error instanceof Blob ? response.error : undefined;
        var _headers = {};
        if (response.headers) {
            try {
                for (var _b = __values(response.headers.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var key = _c.value;
                    _headers[key] = response.headers.get(key);
                }
            }
            catch (e_21_1) { e_21 = { error: e_21_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_21) throw e_21.error; }
            }
        }
        if (status === 200) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                var result200 = null;
                var resultData200 = _responseText === "" ? null : JSON.parse(_responseText, _this.jsonParseReviver);
                result200 = OverviewDefectiveRatio.fromJS(resultData200);
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
            }));
        }
        else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
    };
    /**
     * @param duration (optional)
     * @return Success
     */
    OverviewDashboardServiceProxy.prototype.getProductDefectTrend = function (duration) {
        var _this = this;
        var url_ = this.baseUrl + "/api/services/app/OverviewDashboard/GetProductDefectTrend?";
        if (duration === null)
            throw new Error("The parameter 'duration' cannot be null.");
        else if (duration !== undefined)
            url_ += "duration=" + encodeURIComponent("" + duration) + "&";
        url_ = url_.replace(/[?&]$/, "");
        var options_ = {
            observe: "response",
            responseType: "blob",
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
                "Accept": "text/plain"
            })
        };
        return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (response_) {
            return _this.processGetProductDefectTrend(response_);
        })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(function (response_) {
            if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
                try {
                    return _this.processGetProductDefectTrend(response_);
                }
                catch (e) {
                    return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
                }
            }
            else
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
        }));
    };
    OverviewDashboardServiceProxy.prototype.processGetProductDefectTrend = function (response) {
        var e_22, _a;
        var _this = this;
        var status = response.status;
        var responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body :
            response.error instanceof Blob ? response.error : undefined;
        var _headers = {};
        if (response.headers) {
            try {
                for (var _b = __values(response.headers.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var key = _c.value;
                    _headers[key] = response.headers.get(key);
                }
            }
            catch (e_22_1) { e_22 = { error: e_22_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_22) throw e_22.error; }
            }
        }
        if (status === 200) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                var result200 = null;
                var resultData200 = _responseText === "" ? null : JSON.parse(_responseText, _this.jsonParseReviver);
                result200 = OverviewDefectTrendDto.fromJS(resultData200);
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
            }));
        }
        else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
    };
    OverviewDashboardServiceProxy.ɵfac = function OverviewDashboardServiceProxy_Factory(t) { return new (t || OverviewDashboardServiceProxy)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](API_BASE_URL, 8)); };
    OverviewDashboardServiceProxy.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: OverviewDashboardServiceProxy, factory: OverviewDashboardServiceProxy.ɵfac });
    return OverviewDashboardServiceProxy;
}());

var ProductServiceProxy = /** @class */ (function () {
    function ProductServiceProxy(http, baseUrl) {
        this.jsonParseReviver = undefined;
        this.http = http;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "";
    }
    /**
     * @return Success
     */
    ProductServiceProxy.prototype.getAllProducts = function () {
        var _this = this;
        var url_ = this.baseUrl + "/api/services/app/Product/GetAllProducts";
        url_ = url_.replace(/[?&]$/, "");
        var options_ = {
            observe: "response",
            responseType: "blob",
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
                "Accept": "text/plain"
            })
        };
        return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (response_) {
            return _this.processGetAllProducts(response_);
        })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(function (response_) {
            if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
                try {
                    return _this.processGetAllProducts(response_);
                }
                catch (e) {
                    return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
                }
            }
            else
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
        }));
    };
    ProductServiceProxy.prototype.processGetAllProducts = function (response) {
        var e_23, _a;
        var _this = this;
        var status = response.status;
        var responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body :
            response.error instanceof Blob ? response.error : undefined;
        var _headers = {};
        if (response.headers) {
            try {
                for (var _b = __values(response.headers.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var key = _c.value;
                    _headers[key] = response.headers.get(key);
                }
            }
            catch (e_23_1) { e_23 = { error: e_23_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_23) throw e_23.error; }
            }
        }
        if (status === 200) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                var result200 = null;
                var resultData200 = _responseText === "" ? null : JSON.parse(_responseText, _this.jsonParseReviver);
                result200 = ProductDtoListResultDto.fromJS(resultData200);
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
            }));
        }
        else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
    };
    ProductServiceProxy.ɵfac = function ProductServiceProxy_Factory(t) { return new (t || ProductServiceProxy)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](API_BASE_URL, 8)); };
    ProductServiceProxy.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: ProductServiceProxy, factory: ProductServiceProxy.ɵfac });
    return ProductServiceProxy;
}());

var RoleServiceProxy = /** @class */ (function () {
    function RoleServiceProxy(http, baseUrl) {
        this.jsonParseReviver = undefined;
        this.http = http;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "";
    }
    /**
     * @param body (optional)
     * @return Success
     */
    RoleServiceProxy.prototype.create = function (body) {
        var _this = this;
        var url_ = this.baseUrl + "/api/services/app/Role/Create";
        url_ = url_.replace(/[?&]$/, "");
        var content_ = JSON.stringify(body);
        var options_ = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
                "Content-Type": "application/json-patch+json",
                "Accept": "text/plain"
            })
        };
        return this.http.request("post", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (response_) {
            return _this.processCreate(response_);
        })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(function (response_) {
            if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
                try {
                    return _this.processCreate(response_);
                }
                catch (e) {
                    return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
                }
            }
            else
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
        }));
    };
    RoleServiceProxy.prototype.processCreate = function (response) {
        var e_24, _a;
        var _this = this;
        var status = response.status;
        var responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body :
            response.error instanceof Blob ? response.error : undefined;
        var _headers = {};
        if (response.headers) {
            try {
                for (var _b = __values(response.headers.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var key = _c.value;
                    _headers[key] = response.headers.get(key);
                }
            }
            catch (e_24_1) { e_24 = { error: e_24_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_24) throw e_24.error; }
            }
        }
        if (status === 200) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                var result200 = null;
                var resultData200 = _responseText === "" ? null : JSON.parse(_responseText, _this.jsonParseReviver);
                result200 = RoleDto.fromJS(resultData200);
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
            }));
        }
        else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
    };
    /**
     * @param permission (optional)
     * @return Success
     */
    RoleServiceProxy.prototype.getRoles = function (permission) {
        var _this = this;
        var url_ = this.baseUrl + "/api/services/app/Role/GetRoles?";
        if (permission === null)
            throw new Error("The parameter 'permission' cannot be null.");
        else if (permission !== undefined)
            url_ += "Permission=" + encodeURIComponent("" + permission) + "&";
        url_ = url_.replace(/[?&]$/, "");
        var options_ = {
            observe: "response",
            responseType: "blob",
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
                "Accept": "text/plain"
            })
        };
        return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (response_) {
            return _this.processGetRoles(response_);
        })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(function (response_) {
            if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
                try {
                    return _this.processGetRoles(response_);
                }
                catch (e) {
                    return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
                }
            }
            else
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
        }));
    };
    RoleServiceProxy.prototype.processGetRoles = function (response) {
        var e_25, _a;
        var _this = this;
        var status = response.status;
        var responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body :
            response.error instanceof Blob ? response.error : undefined;
        var _headers = {};
        if (response.headers) {
            try {
                for (var _b = __values(response.headers.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var key = _c.value;
                    _headers[key] = response.headers.get(key);
                }
            }
            catch (e_25_1) { e_25 = { error: e_25_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_25) throw e_25.error; }
            }
        }
        if (status === 200) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                var result200 = null;
                var resultData200 = _responseText === "" ? null : JSON.parse(_responseText, _this.jsonParseReviver);
                result200 = RoleListDtoListResultDto.fromJS(resultData200);
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
            }));
        }
        else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
    };
    /**
     * @param body (optional)
     * @return Success
     */
    RoleServiceProxy.prototype.update = function (body) {
        var _this = this;
        var url_ = this.baseUrl + "/api/services/app/Role/Update";
        url_ = url_.replace(/[?&]$/, "");
        var content_ = JSON.stringify(body);
        var options_ = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
                "Content-Type": "application/json-patch+json",
                "Accept": "text/plain"
            })
        };
        return this.http.request("put", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (response_) {
            return _this.processUpdate(response_);
        })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(function (response_) {
            if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
                try {
                    return _this.processUpdate(response_);
                }
                catch (e) {
                    return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
                }
            }
            else
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
        }));
    };
    RoleServiceProxy.prototype.processUpdate = function (response) {
        var e_26, _a;
        var _this = this;
        var status = response.status;
        var responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body :
            response.error instanceof Blob ? response.error : undefined;
        var _headers = {};
        if (response.headers) {
            try {
                for (var _b = __values(response.headers.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var key = _c.value;
                    _headers[key] = response.headers.get(key);
                }
            }
            catch (e_26_1) { e_26 = { error: e_26_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_26) throw e_26.error; }
            }
        }
        if (status === 200) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                var result200 = null;
                var resultData200 = _responseText === "" ? null : JSON.parse(_responseText, _this.jsonParseReviver);
                result200 = RoleDto.fromJS(resultData200);
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
            }));
        }
        else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
    };
    /**
     * @param id (optional)
     * @return Success
     */
    RoleServiceProxy.prototype.delete = function (id) {
        var _this = this;
        var url_ = this.baseUrl + "/api/services/app/Role/Delete?";
        if (id === null)
            throw new Error("The parameter 'id' cannot be null.");
        else if (id !== undefined)
            url_ += "Id=" + encodeURIComponent("" + id) + "&";
        url_ = url_.replace(/[?&]$/, "");
        var options_ = {
            observe: "response",
            responseType: "blob",
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({})
        };
        return this.http.request("delete", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (response_) {
            return _this.processDelete(response_);
        })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(function (response_) {
            if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
                try {
                    return _this.processDelete(response_);
                }
                catch (e) {
                    return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
                }
            }
            else
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
        }));
    };
    RoleServiceProxy.prototype.processDelete = function (response) {
        var e_27, _a;
        var status = response.status;
        var responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body :
            response.error instanceof Blob ? response.error : undefined;
        var _headers = {};
        if (response.headers) {
            try {
                for (var _b = __values(response.headers.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var key = _c.value;
                    _headers[key] = response.headers.get(key);
                }
            }
            catch (e_27_1) { e_27 = { error: e_27_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_27) throw e_27.error; }
            }
        }
        if (status === 200) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
            }));
        }
        else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
    };
    /**
     * @return Success
     */
    RoleServiceProxy.prototype.getAllPermissions = function () {
        var _this = this;
        var url_ = this.baseUrl + "/api/services/app/Role/GetAllPermissions";
        url_ = url_.replace(/[?&]$/, "");
        var options_ = {
            observe: "response",
            responseType: "blob",
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
                "Accept": "text/plain"
            })
        };
        return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (response_) {
            return _this.processGetAllPermissions(response_);
        })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(function (response_) {
            if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
                try {
                    return _this.processGetAllPermissions(response_);
                }
                catch (e) {
                    return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
                }
            }
            else
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
        }));
    };
    RoleServiceProxy.prototype.processGetAllPermissions = function (response) {
        var e_28, _a;
        var _this = this;
        var status = response.status;
        var responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body :
            response.error instanceof Blob ? response.error : undefined;
        var _headers = {};
        if (response.headers) {
            try {
                for (var _b = __values(response.headers.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var key = _c.value;
                    _headers[key] = response.headers.get(key);
                }
            }
            catch (e_28_1) { e_28 = { error: e_28_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_28) throw e_28.error; }
            }
        }
        if (status === 200) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                var result200 = null;
                var resultData200 = _responseText === "" ? null : JSON.parse(_responseText, _this.jsonParseReviver);
                result200 = PermissionDtoListResultDto.fromJS(resultData200);
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
            }));
        }
        else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
    };
    /**
     * @param id (optional)
     * @return Success
     */
    RoleServiceProxy.prototype.getRoleForEdit = function (id) {
        var _this = this;
        var url_ = this.baseUrl + "/api/services/app/Role/GetRoleForEdit?";
        if (id === null)
            throw new Error("The parameter 'id' cannot be null.");
        else if (id !== undefined)
            url_ += "Id=" + encodeURIComponent("" + id) + "&";
        url_ = url_.replace(/[?&]$/, "");
        var options_ = {
            observe: "response",
            responseType: "blob",
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
                "Accept": "text/plain"
            })
        };
        return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (response_) {
            return _this.processGetRoleForEdit(response_);
        })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(function (response_) {
            if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
                try {
                    return _this.processGetRoleForEdit(response_);
                }
                catch (e) {
                    return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
                }
            }
            else
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
        }));
    };
    RoleServiceProxy.prototype.processGetRoleForEdit = function (response) {
        var e_29, _a;
        var _this = this;
        var status = response.status;
        var responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body :
            response.error instanceof Blob ? response.error : undefined;
        var _headers = {};
        if (response.headers) {
            try {
                for (var _b = __values(response.headers.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var key = _c.value;
                    _headers[key] = response.headers.get(key);
                }
            }
            catch (e_29_1) { e_29 = { error: e_29_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_29) throw e_29.error; }
            }
        }
        if (status === 200) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                var result200 = null;
                var resultData200 = _responseText === "" ? null : JSON.parse(_responseText, _this.jsonParseReviver);
                result200 = GetRoleForEditOutput.fromJS(resultData200);
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
            }));
        }
        else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
    };
    /**
     * @param id (optional)
     * @return Success
     */
    RoleServiceProxy.prototype.get = function (id) {
        var _this = this;
        var url_ = this.baseUrl + "/api/services/app/Role/Get?";
        if (id === null)
            throw new Error("The parameter 'id' cannot be null.");
        else if (id !== undefined)
            url_ += "Id=" + encodeURIComponent("" + id) + "&";
        url_ = url_.replace(/[?&]$/, "");
        var options_ = {
            observe: "response",
            responseType: "blob",
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
                "Accept": "text/plain"
            })
        };
        return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (response_) {
            return _this.processGet(response_);
        })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(function (response_) {
            if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
                try {
                    return _this.processGet(response_);
                }
                catch (e) {
                    return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
                }
            }
            else
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
        }));
    };
    RoleServiceProxy.prototype.processGet = function (response) {
        var e_30, _a;
        var _this = this;
        var status = response.status;
        var responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body :
            response.error instanceof Blob ? response.error : undefined;
        var _headers = {};
        if (response.headers) {
            try {
                for (var _b = __values(response.headers.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var key = _c.value;
                    _headers[key] = response.headers.get(key);
                }
            }
            catch (e_30_1) { e_30 = { error: e_30_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_30) throw e_30.error; }
            }
        }
        if (status === 200) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                var result200 = null;
                var resultData200 = _responseText === "" ? null : JSON.parse(_responseText, _this.jsonParseReviver);
                result200 = RoleDto.fromJS(resultData200);
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
            }));
        }
        else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
    };
    /**
     * @param keyword (optional)
     * @param skipCount (optional)
     * @param maxResultCount (optional)
     * @return Success
     */
    RoleServiceProxy.prototype.getAll = function (keyword, skipCount, maxResultCount) {
        var _this = this;
        var url_ = this.baseUrl + "/api/services/app/Role/GetAll?";
        if (keyword === null)
            throw new Error("The parameter 'keyword' cannot be null.");
        else if (keyword !== undefined)
            url_ += "Keyword=" + encodeURIComponent("" + keyword) + "&";
        if (skipCount === null)
            throw new Error("The parameter 'skipCount' cannot be null.");
        else if (skipCount !== undefined)
            url_ += "SkipCount=" + encodeURIComponent("" + skipCount) + "&";
        if (maxResultCount === null)
            throw new Error("The parameter 'maxResultCount' cannot be null.");
        else if (maxResultCount !== undefined)
            url_ += "MaxResultCount=" + encodeURIComponent("" + maxResultCount) + "&";
        url_ = url_.replace(/[?&]$/, "");
        var options_ = {
            observe: "response",
            responseType: "blob",
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
                "Accept": "text/plain"
            })
        };
        return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (response_) {
            return _this.processGetAll(response_);
        })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(function (response_) {
            if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
                try {
                    return _this.processGetAll(response_);
                }
                catch (e) {
                    return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
                }
            }
            else
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
        }));
    };
    RoleServiceProxy.prototype.processGetAll = function (response) {
        var e_31, _a;
        var _this = this;
        var status = response.status;
        var responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body :
            response.error instanceof Blob ? response.error : undefined;
        var _headers = {};
        if (response.headers) {
            try {
                for (var _b = __values(response.headers.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var key = _c.value;
                    _headers[key] = response.headers.get(key);
                }
            }
            catch (e_31_1) { e_31 = { error: e_31_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_31) throw e_31.error; }
            }
        }
        if (status === 200) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                var result200 = null;
                var resultData200 = _responseText === "" ? null : JSON.parse(_responseText, _this.jsonParseReviver);
                result200 = RoleDtoPagedResultDto.fromJS(resultData200);
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
            }));
        }
        else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
    };
    RoleServiceProxy.ɵfac = function RoleServiceProxy_Factory(t) { return new (t || RoleServiceProxy)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](API_BASE_URL, 8)); };
    RoleServiceProxy.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: RoleServiceProxy, factory: RoleServiceProxy.ɵfac });
    return RoleServiceProxy;
}());

var SessionServiceProxy = /** @class */ (function () {
    function SessionServiceProxy(http, baseUrl) {
        this.jsonParseReviver = undefined;
        this.http = http;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "";
    }
    /**
     * @return Success
     */
    SessionServiceProxy.prototype.getCurrentLoginInformations = function () {
        var _this = this;
        var url_ = this.baseUrl + "/api/services/app/Session/GetCurrentLoginInformations";
        url_ = url_.replace(/[?&]$/, "");
        var options_ = {
            observe: "response",
            responseType: "blob",
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
                "Accept": "text/plain"
            })
        };
        return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (response_) {
            return _this.processGetCurrentLoginInformations(response_);
        })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(function (response_) {
            if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
                try {
                    return _this.processGetCurrentLoginInformations(response_);
                }
                catch (e) {
                    return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
                }
            }
            else
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
        }));
    };
    SessionServiceProxy.prototype.processGetCurrentLoginInformations = function (response) {
        var e_32, _a;
        var _this = this;
        var status = response.status;
        var responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body :
            response.error instanceof Blob ? response.error : undefined;
        var _headers = {};
        if (response.headers) {
            try {
                for (var _b = __values(response.headers.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var key = _c.value;
                    _headers[key] = response.headers.get(key);
                }
            }
            catch (e_32_1) { e_32 = { error: e_32_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_32) throw e_32.error; }
            }
        }
        if (status === 200) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                var result200 = null;
                var resultData200 = _responseText === "" ? null : JSON.parse(_responseText, _this.jsonParseReviver);
                result200 = GetCurrentLoginInformationsOutput.fromJS(resultData200);
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
            }));
        }
        else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
    };
    SessionServiceProxy.ɵfac = function SessionServiceProxy_Factory(t) { return new (t || SessionServiceProxy)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](API_BASE_URL, 8)); };
    SessionServiceProxy.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: SessionServiceProxy, factory: SessionServiceProxy.ɵfac });
    return SessionServiceProxy;
}());

var StageServiceProxy = /** @class */ (function () {
    function StageServiceProxy(http, baseUrl) {
        this.jsonParseReviver = undefined;
        this.http = http;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "";
    }
    /**
     * @return Success
     */
    StageServiceProxy.prototype.getAllStages = function () {
        var _this = this;
        var url_ = this.baseUrl + "/api/services/app/Stage/GetAllStages";
        url_ = url_.replace(/[?&]$/, "");
        var options_ = {
            observe: "response",
            responseType: "blob",
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
                "Accept": "text/plain"
            })
        };
        return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (response_) {
            return _this.processGetAllStages(response_);
        })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(function (response_) {
            if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
                try {
                    return _this.processGetAllStages(response_);
                }
                catch (e) {
                    return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
                }
            }
            else
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
        }));
    };
    StageServiceProxy.prototype.processGetAllStages = function (response) {
        var e_33, _a;
        var _this = this;
        var status = response.status;
        var responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body :
            response.error instanceof Blob ? response.error : undefined;
        var _headers = {};
        if (response.headers) {
            try {
                for (var _b = __values(response.headers.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var key = _c.value;
                    _headers[key] = response.headers.get(key);
                }
            }
            catch (e_33_1) { e_33 = { error: e_33_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_33) throw e_33.error; }
            }
        }
        if (status === 200) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                var result200 = null;
                var resultData200 = _responseText === "" ? null : JSON.parse(_responseText, _this.jsonParseReviver);
                result200 = StageDtoListResultDto.fromJS(resultData200);
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
            }));
        }
        else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
    };
    /**
     * @param productId (optional)
     * @return Success
     */
    StageServiceProxy.prototype.getProductStages = function (productId) {
        var _this = this;
        var url_ = this.baseUrl + "/api/services/app/Stage/GetProductStages?";
        if (productId === null)
            throw new Error("The parameter 'productId' cannot be null.");
        else if (productId !== undefined)
            url_ += "productId=" + encodeURIComponent("" + productId) + "&";
        url_ = url_.replace(/[?&]$/, "");
        var options_ = {
            observe: "response",
            responseType: "blob",
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
                "Accept": "text/plain"
            })
        };
        return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (response_) {
            return _this.processGetProductStages(response_);
        })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(function (response_) {
            if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
                try {
                    return _this.processGetProductStages(response_);
                }
                catch (e) {
                    return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
                }
            }
            else
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
        }));
    };
    StageServiceProxy.prototype.processGetProductStages = function (response) {
        var e_34, _a;
        var _this = this;
        var status = response.status;
        var responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body :
            response.error instanceof Blob ? response.error : undefined;
        var _headers = {};
        if (response.headers) {
            try {
                for (var _b = __values(response.headers.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var key = _c.value;
                    _headers[key] = response.headers.get(key);
                }
            }
            catch (e_34_1) { e_34 = { error: e_34_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_34) throw e_34.error; }
            }
        }
        if (status === 200) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                var result200 = null;
                var resultData200 = _responseText === "" ? null : JSON.parse(_responseText, _this.jsonParseReviver);
                result200 = StageDtoListResultDto.fromJS(resultData200);
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
            }));
        }
        else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
    };
    StageServiceProxy.ɵfac = function StageServiceProxy_Factory(t) { return new (t || StageServiceProxy)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](API_BASE_URL, 8)); };
    StageServiceProxy.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: StageServiceProxy, factory: StageServiceProxy.ɵfac });
    return StageServiceProxy;
}());

var TenantServiceProxy = /** @class */ (function () {
    function TenantServiceProxy(http, baseUrl) {
        this.jsonParseReviver = undefined;
        this.http = http;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "";
    }
    /**
     * @param body (optional)
     * @return Success
     */
    TenantServiceProxy.prototype.create = function (body) {
        var _this = this;
        var url_ = this.baseUrl + "/api/services/app/Tenant/Create";
        url_ = url_.replace(/[?&]$/, "");
        var content_ = JSON.stringify(body);
        var options_ = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
                "Content-Type": "application/json-patch+json",
                "Accept": "text/plain"
            })
        };
        return this.http.request("post", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (response_) {
            return _this.processCreate(response_);
        })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(function (response_) {
            if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
                try {
                    return _this.processCreate(response_);
                }
                catch (e) {
                    return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
                }
            }
            else
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
        }));
    };
    TenantServiceProxy.prototype.processCreate = function (response) {
        var e_35, _a;
        var _this = this;
        var status = response.status;
        var responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body :
            response.error instanceof Blob ? response.error : undefined;
        var _headers = {};
        if (response.headers) {
            try {
                for (var _b = __values(response.headers.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var key = _c.value;
                    _headers[key] = response.headers.get(key);
                }
            }
            catch (e_35_1) { e_35 = { error: e_35_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_35) throw e_35.error; }
            }
        }
        if (status === 200) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                var result200 = null;
                var resultData200 = _responseText === "" ? null : JSON.parse(_responseText, _this.jsonParseReviver);
                result200 = TenantDto.fromJS(resultData200);
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
            }));
        }
        else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
    };
    /**
     * @param id (optional)
     * @return Success
     */
    TenantServiceProxy.prototype.delete = function (id) {
        var _this = this;
        var url_ = this.baseUrl + "/api/services/app/Tenant/Delete?";
        if (id === null)
            throw new Error("The parameter 'id' cannot be null.");
        else if (id !== undefined)
            url_ += "Id=" + encodeURIComponent("" + id) + "&";
        url_ = url_.replace(/[?&]$/, "");
        var options_ = {
            observe: "response",
            responseType: "blob",
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({})
        };
        return this.http.request("delete", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (response_) {
            return _this.processDelete(response_);
        })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(function (response_) {
            if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
                try {
                    return _this.processDelete(response_);
                }
                catch (e) {
                    return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
                }
            }
            else
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
        }));
    };
    TenantServiceProxy.prototype.processDelete = function (response) {
        var e_36, _a;
        var status = response.status;
        var responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body :
            response.error instanceof Blob ? response.error : undefined;
        var _headers = {};
        if (response.headers) {
            try {
                for (var _b = __values(response.headers.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var key = _c.value;
                    _headers[key] = response.headers.get(key);
                }
            }
            catch (e_36_1) { e_36 = { error: e_36_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_36) throw e_36.error; }
            }
        }
        if (status === 200) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
            }));
        }
        else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
    };
    /**
     * @param id (optional)
     * @return Success
     */
    TenantServiceProxy.prototype.get = function (id) {
        var _this = this;
        var url_ = this.baseUrl + "/api/services/app/Tenant/Get?";
        if (id === null)
            throw new Error("The parameter 'id' cannot be null.");
        else if (id !== undefined)
            url_ += "Id=" + encodeURIComponent("" + id) + "&";
        url_ = url_.replace(/[?&]$/, "");
        var options_ = {
            observe: "response",
            responseType: "blob",
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
                "Accept": "text/plain"
            })
        };
        return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (response_) {
            return _this.processGet(response_);
        })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(function (response_) {
            if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
                try {
                    return _this.processGet(response_);
                }
                catch (e) {
                    return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
                }
            }
            else
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
        }));
    };
    TenantServiceProxy.prototype.processGet = function (response) {
        var e_37, _a;
        var _this = this;
        var status = response.status;
        var responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body :
            response.error instanceof Blob ? response.error : undefined;
        var _headers = {};
        if (response.headers) {
            try {
                for (var _b = __values(response.headers.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var key = _c.value;
                    _headers[key] = response.headers.get(key);
                }
            }
            catch (e_37_1) { e_37 = { error: e_37_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_37) throw e_37.error; }
            }
        }
        if (status === 200) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                var result200 = null;
                var resultData200 = _responseText === "" ? null : JSON.parse(_responseText, _this.jsonParseReviver);
                result200 = TenantDto.fromJS(resultData200);
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
            }));
        }
        else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
    };
    /**
     * @param keyword (optional)
     * @param isActive (optional)
     * @param skipCount (optional)
     * @param maxResultCount (optional)
     * @return Success
     */
    TenantServiceProxy.prototype.getAll = function (keyword, isActive, skipCount, maxResultCount) {
        var _this = this;
        var url_ = this.baseUrl + "/api/services/app/Tenant/GetAll?";
        if (keyword === null)
            throw new Error("The parameter 'keyword' cannot be null.");
        else if (keyword !== undefined)
            url_ += "Keyword=" + encodeURIComponent("" + keyword) + "&";
        if (isActive === null)
            throw new Error("The parameter 'isActive' cannot be null.");
        else if (isActive !== undefined)
            url_ += "IsActive=" + encodeURIComponent("" + isActive) + "&";
        if (skipCount === null)
            throw new Error("The parameter 'skipCount' cannot be null.");
        else if (skipCount !== undefined)
            url_ += "SkipCount=" + encodeURIComponent("" + skipCount) + "&";
        if (maxResultCount === null)
            throw new Error("The parameter 'maxResultCount' cannot be null.");
        else if (maxResultCount !== undefined)
            url_ += "MaxResultCount=" + encodeURIComponent("" + maxResultCount) + "&";
        url_ = url_.replace(/[?&]$/, "");
        var options_ = {
            observe: "response",
            responseType: "blob",
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
                "Accept": "text/plain"
            })
        };
        return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (response_) {
            return _this.processGetAll(response_);
        })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(function (response_) {
            if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
                try {
                    return _this.processGetAll(response_);
                }
                catch (e) {
                    return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
                }
            }
            else
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
        }));
    };
    TenantServiceProxy.prototype.processGetAll = function (response) {
        var e_38, _a;
        var _this = this;
        var status = response.status;
        var responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body :
            response.error instanceof Blob ? response.error : undefined;
        var _headers = {};
        if (response.headers) {
            try {
                for (var _b = __values(response.headers.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var key = _c.value;
                    _headers[key] = response.headers.get(key);
                }
            }
            catch (e_38_1) { e_38 = { error: e_38_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_38) throw e_38.error; }
            }
        }
        if (status === 200) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                var result200 = null;
                var resultData200 = _responseText === "" ? null : JSON.parse(_responseText, _this.jsonParseReviver);
                result200 = TenantDtoPagedResultDto.fromJS(resultData200);
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
            }));
        }
        else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
    };
    /**
     * @param body (optional)
     * @return Success
     */
    TenantServiceProxy.prototype.update = function (body) {
        var _this = this;
        var url_ = this.baseUrl + "/api/services/app/Tenant/Update";
        url_ = url_.replace(/[?&]$/, "");
        var content_ = JSON.stringify(body);
        var options_ = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
                "Content-Type": "application/json-patch+json",
                "Accept": "text/plain"
            })
        };
        return this.http.request("put", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (response_) {
            return _this.processUpdate(response_);
        })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(function (response_) {
            if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
                try {
                    return _this.processUpdate(response_);
                }
                catch (e) {
                    return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
                }
            }
            else
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
        }));
    };
    TenantServiceProxy.prototype.processUpdate = function (response) {
        var e_39, _a;
        var _this = this;
        var status = response.status;
        var responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body :
            response.error instanceof Blob ? response.error : undefined;
        var _headers = {};
        if (response.headers) {
            try {
                for (var _b = __values(response.headers.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var key = _c.value;
                    _headers[key] = response.headers.get(key);
                }
            }
            catch (e_39_1) { e_39 = { error: e_39_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_39) throw e_39.error; }
            }
        }
        if (status === 200) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                var result200 = null;
                var resultData200 = _responseText === "" ? null : JSON.parse(_responseText, _this.jsonParseReviver);
                result200 = TenantDto.fromJS(resultData200);
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
            }));
        }
        else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
    };
    TenantServiceProxy.ɵfac = function TenantServiceProxy_Factory(t) { return new (t || TenantServiceProxy)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](API_BASE_URL, 8)); };
    TenantServiceProxy.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: TenantServiceProxy, factory: TenantServiceProxy.ɵfac });
    return TenantServiceProxy;
}());

var TokenAuthServiceProxy = /** @class */ (function () {
    function TokenAuthServiceProxy(http, baseUrl) {
        this.jsonParseReviver = undefined;
        this.http = http;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "";
    }
    /**
     * @param body (optional)
     * @return Success
     */
    TokenAuthServiceProxy.prototype.authenticate = function (body) {
        var _this = this;
        var url_ = this.baseUrl + "/api/TokenAuth/Authenticate";
        url_ = url_.replace(/[?&]$/, "");
        var content_ = JSON.stringify(body);
        var options_ = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
                "Content-Type": "application/json-patch+json",
                "Accept": "text/plain"
            })
        };
        return this.http.request("post", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (response_) {
            return _this.processAuthenticate(response_);
        })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(function (response_) {
            if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
                try {
                    return _this.processAuthenticate(response_);
                }
                catch (e) {
                    return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
                }
            }
            else
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
        }));
    };
    TokenAuthServiceProxy.prototype.processAuthenticate = function (response) {
        var e_40, _a;
        var _this = this;
        var status = response.status;
        var responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body :
            response.error instanceof Blob ? response.error : undefined;
        var _headers = {};
        if (response.headers) {
            try {
                for (var _b = __values(response.headers.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var key = _c.value;
                    _headers[key] = response.headers.get(key);
                }
            }
            catch (e_40_1) { e_40 = { error: e_40_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_40) throw e_40.error; }
            }
        }
        if (status === 200) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                var result200 = null;
                var resultData200 = _responseText === "" ? null : JSON.parse(_responseText, _this.jsonParseReviver);
                result200 = AuthenticateResultModel.fromJS(resultData200);
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
            }));
        }
        else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
    };
    /**
     * @return Success
     */
    TokenAuthServiceProxy.prototype.getExternalAuthenticationProviders = function () {
        var _this = this;
        var url_ = this.baseUrl + "/api/TokenAuth/GetExternalAuthenticationProviders";
        url_ = url_.replace(/[?&]$/, "");
        var options_ = {
            observe: "response",
            responseType: "blob",
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
                "Accept": "text/plain"
            })
        };
        return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (response_) {
            return _this.processGetExternalAuthenticationProviders(response_);
        })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(function (response_) {
            if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
                try {
                    return _this.processGetExternalAuthenticationProviders(response_);
                }
                catch (e) {
                    return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
                }
            }
            else
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
        }));
    };
    TokenAuthServiceProxy.prototype.processGetExternalAuthenticationProviders = function (response) {
        var e_41, _a;
        var _this = this;
        var status = response.status;
        var responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body :
            response.error instanceof Blob ? response.error : undefined;
        var _headers = {};
        if (response.headers) {
            try {
                for (var _b = __values(response.headers.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var key = _c.value;
                    _headers[key] = response.headers.get(key);
                }
            }
            catch (e_41_1) { e_41 = { error: e_41_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_41) throw e_41.error; }
            }
        }
        if (status === 200) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                var e_42, _a;
                var result200 = null;
                var resultData200 = _responseText === "" ? null : JSON.parse(_responseText, _this.jsonParseReviver);
                if (Array.isArray(resultData200)) {
                    result200 = [];
                    try {
                        for (var resultData200_1 = __values(resultData200), resultData200_1_1 = resultData200_1.next(); !resultData200_1_1.done; resultData200_1_1 = resultData200_1.next()) {
                            var item = resultData200_1_1.value;
                            result200.push(ExternalLoginProviderInfoModel.fromJS(item));
                        }
                    }
                    catch (e_42_1) { e_42 = { error: e_42_1 }; }
                    finally {
                        try {
                            if (resultData200_1_1 && !resultData200_1_1.done && (_a = resultData200_1.return)) _a.call(resultData200_1);
                        }
                        finally { if (e_42) throw e_42.error; }
                    }
                }
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
            }));
        }
        else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
    };
    /**
     * @param body (optional)
     * @return Success
     */
    TokenAuthServiceProxy.prototype.externalAuthenticate = function (body) {
        var _this = this;
        var url_ = this.baseUrl + "/api/TokenAuth/ExternalAuthenticate";
        url_ = url_.replace(/[?&]$/, "");
        var content_ = JSON.stringify(body);
        var options_ = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
                "Content-Type": "application/json-patch+json",
                "Accept": "text/plain"
            })
        };
        return this.http.request("post", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (response_) {
            return _this.processExternalAuthenticate(response_);
        })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(function (response_) {
            if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
                try {
                    return _this.processExternalAuthenticate(response_);
                }
                catch (e) {
                    return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
                }
            }
            else
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
        }));
    };
    TokenAuthServiceProxy.prototype.processExternalAuthenticate = function (response) {
        var e_43, _a;
        var _this = this;
        var status = response.status;
        var responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body :
            response.error instanceof Blob ? response.error : undefined;
        var _headers = {};
        if (response.headers) {
            try {
                for (var _b = __values(response.headers.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var key = _c.value;
                    _headers[key] = response.headers.get(key);
                }
            }
            catch (e_43_1) { e_43 = { error: e_43_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_43) throw e_43.error; }
            }
        }
        if (status === 200) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                var result200 = null;
                var resultData200 = _responseText === "" ? null : JSON.parse(_responseText, _this.jsonParseReviver);
                result200 = ExternalAuthenticateResultModel.fromJS(resultData200);
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
            }));
        }
        else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
    };
    TokenAuthServiceProxy.ɵfac = function TokenAuthServiceProxy_Factory(t) { return new (t || TokenAuthServiceProxy)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](API_BASE_URL, 8)); };
    TokenAuthServiceProxy.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: TokenAuthServiceProxy, factory: TokenAuthServiceProxy.ɵfac });
    return TokenAuthServiceProxy;
}());

var UserServiceProxy = /** @class */ (function () {
    function UserServiceProxy(http, baseUrl) {
        this.jsonParseReviver = undefined;
        this.http = http;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "";
    }
    /**
     * @param body (optional)
     * @return Success
     */
    UserServiceProxy.prototype.create = function (body) {
        var _this = this;
        var url_ = this.baseUrl + "/api/services/app/User/Create";
        url_ = url_.replace(/[?&]$/, "");
        var content_ = JSON.stringify(body);
        var options_ = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
                "Content-Type": "application/json-patch+json",
                "Accept": "text/plain"
            })
        };
        return this.http.request("post", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (response_) {
            return _this.processCreate(response_);
        })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(function (response_) {
            if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
                try {
                    return _this.processCreate(response_);
                }
                catch (e) {
                    return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
                }
            }
            else
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
        }));
    };
    UserServiceProxy.prototype.processCreate = function (response) {
        var e_44, _a;
        var _this = this;
        var status = response.status;
        var responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body :
            response.error instanceof Blob ? response.error : undefined;
        var _headers = {};
        if (response.headers) {
            try {
                for (var _b = __values(response.headers.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var key = _c.value;
                    _headers[key] = response.headers.get(key);
                }
            }
            catch (e_44_1) { e_44 = { error: e_44_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_44) throw e_44.error; }
            }
        }
        if (status === 200) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                var result200 = null;
                var resultData200 = _responseText === "" ? null : JSON.parse(_responseText, _this.jsonParseReviver);
                result200 = UserDto.fromJS(resultData200);
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
            }));
        }
        else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
    };
    /**
     * @param body (optional)
     * @return Success
     */
    UserServiceProxy.prototype.update = function (body) {
        var _this = this;
        var url_ = this.baseUrl + "/api/services/app/User/Update";
        url_ = url_.replace(/[?&]$/, "");
        var content_ = JSON.stringify(body);
        var options_ = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
                "Content-Type": "application/json-patch+json",
                "Accept": "text/plain"
            })
        };
        return this.http.request("put", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (response_) {
            return _this.processUpdate(response_);
        })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(function (response_) {
            if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
                try {
                    return _this.processUpdate(response_);
                }
                catch (e) {
                    return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
                }
            }
            else
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
        }));
    };
    UserServiceProxy.prototype.processUpdate = function (response) {
        var e_45, _a;
        var _this = this;
        var status = response.status;
        var responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body :
            response.error instanceof Blob ? response.error : undefined;
        var _headers = {};
        if (response.headers) {
            try {
                for (var _b = __values(response.headers.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var key = _c.value;
                    _headers[key] = response.headers.get(key);
                }
            }
            catch (e_45_1) { e_45 = { error: e_45_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_45) throw e_45.error; }
            }
        }
        if (status === 200) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                var result200 = null;
                var resultData200 = _responseText === "" ? null : JSON.parse(_responseText, _this.jsonParseReviver);
                result200 = UserDto.fromJS(resultData200);
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
            }));
        }
        else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
    };
    /**
     * @param id (optional)
     * @return Success
     */
    UserServiceProxy.prototype.delete = function (id) {
        var _this = this;
        var url_ = this.baseUrl + "/api/services/app/User/Delete?";
        if (id === null)
            throw new Error("The parameter 'id' cannot be null.");
        else if (id !== undefined)
            url_ += "Id=" + encodeURIComponent("" + id) + "&";
        url_ = url_.replace(/[?&]$/, "");
        var options_ = {
            observe: "response",
            responseType: "blob",
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({})
        };
        return this.http.request("delete", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (response_) {
            return _this.processDelete(response_);
        })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(function (response_) {
            if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
                try {
                    return _this.processDelete(response_);
                }
                catch (e) {
                    return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
                }
            }
            else
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
        }));
    };
    UserServiceProxy.prototype.processDelete = function (response) {
        var e_46, _a;
        var status = response.status;
        var responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body :
            response.error instanceof Blob ? response.error : undefined;
        var _headers = {};
        if (response.headers) {
            try {
                for (var _b = __values(response.headers.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var key = _c.value;
                    _headers[key] = response.headers.get(key);
                }
            }
            catch (e_46_1) { e_46 = { error: e_46_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_46) throw e_46.error; }
            }
        }
        if (status === 200) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
            }));
        }
        else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
    };
    /**
     * @param body (optional)
     * @return Success
     */
    UserServiceProxy.prototype.activate = function (body) {
        var _this = this;
        var url_ = this.baseUrl + "/api/services/app/User/Activate";
        url_ = url_.replace(/[?&]$/, "");
        var content_ = JSON.stringify(body);
        var options_ = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
                "Content-Type": "application/json-patch+json",
            })
        };
        return this.http.request("post", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (response_) {
            return _this.processActivate(response_);
        })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(function (response_) {
            if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
                try {
                    return _this.processActivate(response_);
                }
                catch (e) {
                    return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
                }
            }
            else
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
        }));
    };
    UserServiceProxy.prototype.processActivate = function (response) {
        var e_47, _a;
        var status = response.status;
        var responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body :
            response.error instanceof Blob ? response.error : undefined;
        var _headers = {};
        if (response.headers) {
            try {
                for (var _b = __values(response.headers.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var key = _c.value;
                    _headers[key] = response.headers.get(key);
                }
            }
            catch (e_47_1) { e_47 = { error: e_47_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_47) throw e_47.error; }
            }
        }
        if (status === 200) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
            }));
        }
        else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
    };
    /**
     * @param body (optional)
     * @return Success
     */
    UserServiceProxy.prototype.deActivate = function (body) {
        var _this = this;
        var url_ = this.baseUrl + "/api/services/app/User/DeActivate";
        url_ = url_.replace(/[?&]$/, "");
        var content_ = JSON.stringify(body);
        var options_ = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
                "Content-Type": "application/json-patch+json",
            })
        };
        return this.http.request("post", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (response_) {
            return _this.processDeActivate(response_);
        })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(function (response_) {
            if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
                try {
                    return _this.processDeActivate(response_);
                }
                catch (e) {
                    return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
                }
            }
            else
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
        }));
    };
    UserServiceProxy.prototype.processDeActivate = function (response) {
        var e_48, _a;
        var status = response.status;
        var responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body :
            response.error instanceof Blob ? response.error : undefined;
        var _headers = {};
        if (response.headers) {
            try {
                for (var _b = __values(response.headers.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var key = _c.value;
                    _headers[key] = response.headers.get(key);
                }
            }
            catch (e_48_1) { e_48 = { error: e_48_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_48) throw e_48.error; }
            }
        }
        if (status === 200) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
            }));
        }
        else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
    };
    /**
     * @return Success
     */
    UserServiceProxy.prototype.getRoles = function () {
        var _this = this;
        var url_ = this.baseUrl + "/api/services/app/User/GetRoles";
        url_ = url_.replace(/[?&]$/, "");
        var options_ = {
            observe: "response",
            responseType: "blob",
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
                "Accept": "text/plain"
            })
        };
        return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (response_) {
            return _this.processGetRoles(response_);
        })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(function (response_) {
            if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
                try {
                    return _this.processGetRoles(response_);
                }
                catch (e) {
                    return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
                }
            }
            else
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
        }));
    };
    UserServiceProxy.prototype.processGetRoles = function (response) {
        var e_49, _a;
        var _this = this;
        var status = response.status;
        var responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body :
            response.error instanceof Blob ? response.error : undefined;
        var _headers = {};
        if (response.headers) {
            try {
                for (var _b = __values(response.headers.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var key = _c.value;
                    _headers[key] = response.headers.get(key);
                }
            }
            catch (e_49_1) { e_49 = { error: e_49_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_49) throw e_49.error; }
            }
        }
        if (status === 200) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                var result200 = null;
                var resultData200 = _responseText === "" ? null : JSON.parse(_responseText, _this.jsonParseReviver);
                result200 = RoleDtoListResultDto.fromJS(resultData200);
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
            }));
        }
        else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
    };
    /**
     * @param body (optional)
     * @return Success
     */
    UserServiceProxy.prototype.changeLanguage = function (body) {
        var _this = this;
        var url_ = this.baseUrl + "/api/services/app/User/ChangeLanguage";
        url_ = url_.replace(/[?&]$/, "");
        var content_ = JSON.stringify(body);
        var options_ = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
                "Content-Type": "application/json-patch+json",
            })
        };
        return this.http.request("post", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (response_) {
            return _this.processChangeLanguage(response_);
        })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(function (response_) {
            if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
                try {
                    return _this.processChangeLanguage(response_);
                }
                catch (e) {
                    return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
                }
            }
            else
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
        }));
    };
    UserServiceProxy.prototype.processChangeLanguage = function (response) {
        var e_50, _a;
        var status = response.status;
        var responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body :
            response.error instanceof Blob ? response.error : undefined;
        var _headers = {};
        if (response.headers) {
            try {
                for (var _b = __values(response.headers.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var key = _c.value;
                    _headers[key] = response.headers.get(key);
                }
            }
            catch (e_50_1) { e_50 = { error: e_50_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_50) throw e_50.error; }
            }
        }
        if (status === 200) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
            }));
        }
        else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
    };
    /**
     * @param body (optional)
     * @return Success
     */
    UserServiceProxy.prototype.changePassword = function (body) {
        var _this = this;
        var url_ = this.baseUrl + "/api/services/app/User/ChangePassword";
        url_ = url_.replace(/[?&]$/, "");
        var content_ = JSON.stringify(body);
        var options_ = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
                "Content-Type": "application/json-patch+json",
                "Accept": "text/plain"
            })
        };
        return this.http.request("post", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (response_) {
            return _this.processChangePassword(response_);
        })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(function (response_) {
            if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
                try {
                    return _this.processChangePassword(response_);
                }
                catch (e) {
                    return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
                }
            }
            else
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
        }));
    };
    UserServiceProxy.prototype.processChangePassword = function (response) {
        var e_51, _a;
        var _this = this;
        var status = response.status;
        var responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body :
            response.error instanceof Blob ? response.error : undefined;
        var _headers = {};
        if (response.headers) {
            try {
                for (var _b = __values(response.headers.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var key = _c.value;
                    _headers[key] = response.headers.get(key);
                }
            }
            catch (e_51_1) { e_51 = { error: e_51_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_51) throw e_51.error; }
            }
        }
        if (status === 200) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                var result200 = null;
                var resultData200 = _responseText === "" ? null : JSON.parse(_responseText, _this.jsonParseReviver);
                result200 = resultData200 !== undefined ? resultData200 : null;
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
            }));
        }
        else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
    };
    /**
     * @param body (optional)
     * @return Success
     */
    UserServiceProxy.prototype.resetPassword = function (body) {
        var _this = this;
        var url_ = this.baseUrl + "/api/services/app/User/ResetPassword";
        url_ = url_.replace(/[?&]$/, "");
        var content_ = JSON.stringify(body);
        var options_ = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
                "Content-Type": "application/json-patch+json",
                "Accept": "text/plain"
            })
        };
        return this.http.request("post", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (response_) {
            return _this.processResetPassword(response_);
        })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(function (response_) {
            if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
                try {
                    return _this.processResetPassword(response_);
                }
                catch (e) {
                    return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
                }
            }
            else
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
        }));
    };
    UserServiceProxy.prototype.processResetPassword = function (response) {
        var e_52, _a;
        var _this = this;
        var status = response.status;
        var responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body :
            response.error instanceof Blob ? response.error : undefined;
        var _headers = {};
        if (response.headers) {
            try {
                for (var _b = __values(response.headers.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var key = _c.value;
                    _headers[key] = response.headers.get(key);
                }
            }
            catch (e_52_1) { e_52 = { error: e_52_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_52) throw e_52.error; }
            }
        }
        if (status === 200) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                var result200 = null;
                var resultData200 = _responseText === "" ? null : JSON.parse(_responseText, _this.jsonParseReviver);
                result200 = resultData200 !== undefined ? resultData200 : null;
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
            }));
        }
        else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
    };
    /**
     * @param body (optional)
     * @return Success
     */
    UserServiceProxy.prototype.changeRefreshTimeSettings = function (body) {
        var _this = this;
        var url_ = this.baseUrl + "/api/services/app/User/ChangeRefreshTimeSettings";
        url_ = url_.replace(/[?&]$/, "");
        var content_ = JSON.stringify(body);
        var options_ = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
                "Content-Type": "application/json-patch+json",
            })
        };
        return this.http.request("post", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (response_) {
            return _this.processChangeRefreshTimeSettings(response_);
        })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(function (response_) {
            if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
                try {
                    return _this.processChangeRefreshTimeSettings(response_);
                }
                catch (e) {
                    return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
                }
            }
            else
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
        }));
    };
    UserServiceProxy.prototype.processChangeRefreshTimeSettings = function (response) {
        var e_53, _a;
        var status = response.status;
        var responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body :
            response.error instanceof Blob ? response.error : undefined;
        var _headers = {};
        if (response.headers) {
            try {
                for (var _b = __values(response.headers.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var key = _c.value;
                    _headers[key] = response.headers.get(key);
                }
            }
            catch (e_53_1) { e_53 = { error: e_53_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_53) throw e_53.error; }
            }
        }
        if (status === 200) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
            }));
        }
        else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
    };
    /**
     * @param id (optional)
     * @return Success
     */
    UserServiceProxy.prototype.get = function (id) {
        var _this = this;
        var url_ = this.baseUrl + "/api/services/app/User/Get?";
        if (id === null)
            throw new Error("The parameter 'id' cannot be null.");
        else if (id !== undefined)
            url_ += "Id=" + encodeURIComponent("" + id) + "&";
        url_ = url_.replace(/[?&]$/, "");
        var options_ = {
            observe: "response",
            responseType: "blob",
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
                "Accept": "text/plain"
            })
        };
        return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (response_) {
            return _this.processGet(response_);
        })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(function (response_) {
            if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
                try {
                    return _this.processGet(response_);
                }
                catch (e) {
                    return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
                }
            }
            else
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
        }));
    };
    UserServiceProxy.prototype.processGet = function (response) {
        var e_54, _a;
        var _this = this;
        var status = response.status;
        var responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body :
            response.error instanceof Blob ? response.error : undefined;
        var _headers = {};
        if (response.headers) {
            try {
                for (var _b = __values(response.headers.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var key = _c.value;
                    _headers[key] = response.headers.get(key);
                }
            }
            catch (e_54_1) { e_54 = { error: e_54_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_54) throw e_54.error; }
            }
        }
        if (status === 200) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                var result200 = null;
                var resultData200 = _responseText === "" ? null : JSON.parse(_responseText, _this.jsonParseReviver);
                result200 = UserDto.fromJS(resultData200);
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
            }));
        }
        else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
    };
    /**
     * @param keyword (optional)
     * @param isActive (optional)
     * @param skipCount (optional)
     * @param maxResultCount (optional)
     * @return Success
     */
    UserServiceProxy.prototype.getAll = function (keyword, isActive, skipCount, maxResultCount) {
        var _this = this;
        var url_ = this.baseUrl + "/api/services/app/User/GetAll?";
        if (keyword === null)
            throw new Error("The parameter 'keyword' cannot be null.");
        else if (keyword !== undefined)
            url_ += "Keyword=" + encodeURIComponent("" + keyword) + "&";
        if (isActive === null)
            throw new Error("The parameter 'isActive' cannot be null.");
        else if (isActive !== undefined)
            url_ += "IsActive=" + encodeURIComponent("" + isActive) + "&";
        if (skipCount === null)
            throw new Error("The parameter 'skipCount' cannot be null.");
        else if (skipCount !== undefined)
            url_ += "SkipCount=" + encodeURIComponent("" + skipCount) + "&";
        if (maxResultCount === null)
            throw new Error("The parameter 'maxResultCount' cannot be null.");
        else if (maxResultCount !== undefined)
            url_ += "MaxResultCount=" + encodeURIComponent("" + maxResultCount) + "&";
        url_ = url_.replace(/[?&]$/, "");
        var options_ = {
            observe: "response",
            responseType: "blob",
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpHeaders({
                "Accept": "text/plain"
            })
        };
        return this.http.request("get", url_, options_).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (response_) {
            return _this.processGetAll(response_);
        })).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(function (response_) {
            if (response_ instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponseBase) {
                try {
                    return _this.processGetAll(response_);
                }
                catch (e) {
                    return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(e);
                }
            }
            else
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(response_);
        }));
    };
    UserServiceProxy.prototype.processGetAll = function (response) {
        var e_55, _a;
        var _this = this;
        var status = response.status;
        var responseBlob = response instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpResponse ? response.body :
            response.error instanceof Blob ? response.error : undefined;
        var _headers = {};
        if (response.headers) {
            try {
                for (var _b = __values(response.headers.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var key = _c.value;
                    _headers[key] = response.headers.get(key);
                }
            }
            catch (e_55_1) { e_55 = { error: e_55_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_55) throw e_55.error; }
            }
        }
        if (status === 200) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                var result200 = null;
                var resultData200 = _responseText === "" ? null : JSON.parse(_responseText, _this.jsonParseReviver);
                result200 = UserDtoPagedResultDto.fromJS(resultData200);
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(result200);
            }));
        }
        else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.mergeMap)(function (_responseText) {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null);
    };
    UserServiceProxy.ɵfac = function UserServiceProxy_Factory(t) { return new (t || UserServiceProxy)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](API_BASE_URL, 8)); };
    UserServiceProxy.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: UserServiceProxy, factory: UserServiceProxy.ɵfac });
    return UserServiceProxy;
}());

var ApplicationInfoDto = /** @class */ (function () {
    function ApplicationInfoDto(data) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    this[property] = data[property];
            }
        }
    }
    ApplicationInfoDto.prototype.init = function (_data) {
        if (_data) {
            this.version = _data["version"];
            this.releaseDate = _data["releaseDate"] ? moment__WEBPACK_IMPORTED_MODULE_0__(_data["releaseDate"].toString()) : undefined;
            if (_data["features"]) {
                this.features = {};
                for (var key in _data["features"]) {
                    if (_data["features"].hasOwnProperty(key))
                        this.features[key] = _data["features"][key];
                }
            }
        }
    };
    ApplicationInfoDto.fromJS = function (data) {
        data = typeof data === 'object' ? data : {};
        var result = new ApplicationInfoDto();
        result.init(data);
        return result;
    };
    ApplicationInfoDto.prototype.toJSON = function (data) {
        data = typeof data === 'object' ? data : {};
        data["version"] = this.version;
        data["releaseDate"] = this.releaseDate ? this.releaseDate.toISOString() : undefined;
        if (this.features) {
            data["features"] = {};
            for (var key in this.features) {
                if (this.features.hasOwnProperty(key))
                    data["features"][key] = this.features[key];
            }
        }
        return data;
    };
    ApplicationInfoDto.prototype.clone = function () {
        var json = this.toJSON();
        var result = new ApplicationInfoDto();
        result.init(json);
        return result;
    };
    return ApplicationInfoDto;
}());

var AssemblyDefectsDto = /** @class */ (function () {
    function AssemblyDefectsDto(data) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    this[property] = data[property];
            }
        }
    }
    AssemblyDefectsDto.prototype.init = function (_data) {
        if (_data) {
            this.id = _data["id"];
            this.assemblyDetectionId = _data["assemblyDetectionId"];
            this.stageId = _data["stageId"];
            this.defectId = _data["defectId"];
            this.confidence = _data["confidence"];
            this.detectionTime = _data["detectionTime"] ? moment__WEBPACK_IMPORTED_MODULE_0__(_data["detectionTime"].toString()) : undefined;
        }
    };
    AssemblyDefectsDto.fromJS = function (data) {
        data = typeof data === 'object' ? data : {};
        var result = new AssemblyDefectsDto();
        result.init(data);
        return result;
    };
    AssemblyDefectsDto.prototype.toJSON = function (data) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["assemblyDetectionId"] = this.assemblyDetectionId;
        data["stageId"] = this.stageId;
        data["defectId"] = this.defectId;
        data["confidence"] = this.confidence;
        data["detectionTime"] = this.detectionTime ? this.detectionTime.toISOString() : undefined;
        return data;
    };
    AssemblyDefectsDto.prototype.clone = function () {
        var json = this.toJSON();
        var result = new AssemblyDefectsDto();
        result.init(json);
        return result;
    };
    return AssemblyDefectsDto;
}());

var AssemblyDetectionDto = /** @class */ (function () {
    function AssemblyDetectionDto(data) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    this[property] = data[property];
            }
        }
    }
    AssemblyDetectionDto.prototype.init = function (_data) {
        var e_56, _a;
        if (_data) {
            this.id = _data["id"];
            this.assemblyLineId = _data["assemblyLineId"];
            this.productId = _data["productId"];
            this.stageId = _data["stageId"];
            this.detectionTime = _data["detectionTime"] ? moment__WEBPACK_IMPORTED_MODULE_0__(_data["detectionTime"].toString()) : undefined;
            this.defectsCount = _data["defectsCount"];
            this.imageUrl = _data["imageUrl"];
            if (Array.isArray(_data["assemblyDefects"])) {
                this.assemblyDefects = [];
                try {
                    for (var _b = __values(_data["assemblyDefects"]), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var item = _c.value;
                        this.assemblyDefects.push(AssemblyDefectsDto.fromJS(item));
                    }
                }
                catch (e_56_1) { e_56 = { error: e_56_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_56) throw e_56.error; }
                }
            }
        }
    };
    AssemblyDetectionDto.fromJS = function (data) {
        data = typeof data === 'object' ? data : {};
        var result = new AssemblyDetectionDto();
        result.init(data);
        return result;
    };
    AssemblyDetectionDto.prototype.toJSON = function (data) {
        var e_57, _a;
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["assemblyLineId"] = this.assemblyLineId;
        data["productId"] = this.productId;
        data["stageId"] = this.stageId;
        data["detectionTime"] = this.detectionTime ? this.detectionTime.toISOString() : undefined;
        data["defectsCount"] = this.defectsCount;
        data["imageUrl"] = this.imageUrl;
        if (Array.isArray(this.assemblyDefects)) {
            data["assemblyDefects"] = [];
            try {
                for (var _b = __values(this.assemblyDefects), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var item = _c.value;
                    data["assemblyDefects"].push(item.toJSON());
                }
            }
            catch (e_57_1) { e_57 = { error: e_57_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_57) throw e_57.error; }
            }
        }
        return data;
    };
    AssemblyDetectionDto.prototype.clone = function () {
        var json = this.toJSON();
        var result = new AssemblyDetectionDto();
        result.init(json);
        return result;
    };
    return AssemblyDetectionDto;
}());

var AssemblyDetectionDtoPagedResultDto = /** @class */ (function () {
    function AssemblyDetectionDtoPagedResultDto(data) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    this[property] = data[property];
            }
        }
    }
    AssemblyDetectionDtoPagedResultDto.prototype.init = function (_data) {
        var e_58, _a;
        if (_data) {
            if (Array.isArray(_data["items"])) {
                this.items = [];
                try {
                    for (var _b = __values(_data["items"]), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var item = _c.value;
                        this.items.push(AssemblyDetectionDto.fromJS(item));
                    }
                }
                catch (e_58_1) { e_58 = { error: e_58_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_58) throw e_58.error; }
                }
            }
            this.totalCount = _data["totalCount"];
        }
    };
    AssemblyDetectionDtoPagedResultDto.fromJS = function (data) {
        data = typeof data === 'object' ? data : {};
        var result = new AssemblyDetectionDtoPagedResultDto();
        result.init(data);
        return result;
    };
    AssemblyDetectionDtoPagedResultDto.prototype.toJSON = function (data) {
        var e_59, _a;
        data = typeof data === 'object' ? data : {};
        if (Array.isArray(this.items)) {
            data["items"] = [];
            try {
                for (var _b = __values(this.items), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var item = _c.value;
                    data["items"].push(item.toJSON());
                }
            }
            catch (e_59_1) { e_59 = { error: e_59_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_59) throw e_59.error; }
            }
        }
        data["totalCount"] = this.totalCount;
        return data;
    };
    AssemblyDetectionDtoPagedResultDto.prototype.clone = function () {
        var json = this.toJSON();
        var result = new AssemblyDetectionDtoPagedResultDto();
        result.init(json);
        return result;
    };
    return AssemblyDetectionDtoPagedResultDto;
}());

var AuthenticateModel = /** @class */ (function () {
    function AuthenticateModel(data) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    this[property] = data[property];
            }
        }
    }
    AuthenticateModel.prototype.init = function (_data) {
        if (_data) {
            this.userNameOrEmailAddress = _data["userNameOrEmailAddress"];
            this.password = _data["password"];
            this.rememberClient = _data["rememberClient"];
        }
    };
    AuthenticateModel.fromJS = function (data) {
        data = typeof data === 'object' ? data : {};
        var result = new AuthenticateModel();
        result.init(data);
        return result;
    };
    AuthenticateModel.prototype.toJSON = function (data) {
        data = typeof data === 'object' ? data : {};
        data["userNameOrEmailAddress"] = this.userNameOrEmailAddress;
        data["password"] = this.password;
        data["rememberClient"] = this.rememberClient;
        return data;
    };
    AuthenticateModel.prototype.clone = function () {
        var json = this.toJSON();
        var result = new AuthenticateModel();
        result.init(json);
        return result;
    };
    return AuthenticateModel;
}());

var AuthenticateResultModel = /** @class */ (function () {
    function AuthenticateResultModel(data) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    this[property] = data[property];
            }
        }
    }
    AuthenticateResultModel.prototype.init = function (_data) {
        if (_data) {
            this.accessToken = _data["accessToken"];
            this.encryptedAccessToken = _data["encryptedAccessToken"];
            this.expireInSeconds = _data["expireInSeconds"];
            this.userId = _data["userId"];
        }
    };
    AuthenticateResultModel.fromJS = function (data) {
        data = typeof data === 'object' ? data : {};
        var result = new AuthenticateResultModel();
        result.init(data);
        return result;
    };
    AuthenticateResultModel.prototype.toJSON = function (data) {
        data = typeof data === 'object' ? data : {};
        data["accessToken"] = this.accessToken;
        data["encryptedAccessToken"] = this.encryptedAccessToken;
        data["expireInSeconds"] = this.expireInSeconds;
        data["userId"] = this.userId;
        return data;
    };
    AuthenticateResultModel.prototype.clone = function () {
        var json = this.toJSON();
        var result = new AuthenticateResultModel();
        result.init(json);
        return result;
    };
    return AuthenticateResultModel;
}());

var ChangePasswordDto = /** @class */ (function () {
    function ChangePasswordDto(data) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    this[property] = data[property];
            }
        }
    }
    ChangePasswordDto.prototype.init = function (_data) {
        if (_data) {
            this.currentPassword = _data["currentPassword"];
            this.newPassword = _data["newPassword"];
        }
    };
    ChangePasswordDto.fromJS = function (data) {
        data = typeof data === 'object' ? data : {};
        var result = new ChangePasswordDto();
        result.init(data);
        return result;
    };
    ChangePasswordDto.prototype.toJSON = function (data) {
        data = typeof data === 'object' ? data : {};
        data["currentPassword"] = this.currentPassword;
        data["newPassword"] = this.newPassword;
        return data;
    };
    ChangePasswordDto.prototype.clone = function () {
        var json = this.toJSON();
        var result = new ChangePasswordDto();
        result.init(json);
        return result;
    };
    return ChangePasswordDto;
}());

var ChangeRefreshTimeDto = /** @class */ (function () {
    function ChangeRefreshTimeDto(data) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    this[property] = data[property];
            }
        }
    }
    ChangeRefreshTimeDto.prototype.init = function (_data) {
        if (_data) {
            this.refreshTime = _data["refreshTime"];
        }
    };
    ChangeRefreshTimeDto.fromJS = function (data) {
        data = typeof data === 'object' ? data : {};
        var result = new ChangeRefreshTimeDto();
        result.init(data);
        return result;
    };
    ChangeRefreshTimeDto.prototype.toJSON = function (data) {
        data = typeof data === 'object' ? data : {};
        data["refreshTime"] = this.refreshTime;
        return data;
    };
    ChangeRefreshTimeDto.prototype.clone = function () {
        var json = this.toJSON();
        var result = new ChangeRefreshTimeDto();
        result.init(json);
        return result;
    };
    return ChangeRefreshTimeDto;
}());

var ChangeUiThemeInput = /** @class */ (function () {
    function ChangeUiThemeInput(data) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    this[property] = data[property];
            }
        }
    }
    ChangeUiThemeInput.prototype.init = function (_data) {
        if (_data) {
            this.theme = _data["theme"];
        }
    };
    ChangeUiThemeInput.fromJS = function (data) {
        data = typeof data === 'object' ? data : {};
        var result = new ChangeUiThemeInput();
        result.init(data);
        return result;
    };
    ChangeUiThemeInput.prototype.toJSON = function (data) {
        data = typeof data === 'object' ? data : {};
        data["theme"] = this.theme;
        return data;
    };
    ChangeUiThemeInput.prototype.clone = function () {
        var json = this.toJSON();
        var result = new ChangeUiThemeInput();
        result.init(json);
        return result;
    };
    return ChangeUiThemeInput;
}());

var ChangeUserLanguageDto = /** @class */ (function () {
    function ChangeUserLanguageDto(data) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    this[property] = data[property];
            }
        }
    }
    ChangeUserLanguageDto.prototype.init = function (_data) {
        if (_data) {
            this.languageName = _data["languageName"];
        }
    };
    ChangeUserLanguageDto.fromJS = function (data) {
        data = typeof data === 'object' ? data : {};
        var result = new ChangeUserLanguageDto();
        result.init(data);
        return result;
    };
    ChangeUserLanguageDto.prototype.toJSON = function (data) {
        data = typeof data === 'object' ? data : {};
        data["languageName"] = this.languageName;
        return data;
    };
    ChangeUserLanguageDto.prototype.clone = function () {
        var json = this.toJSON();
        var result = new ChangeUserLanguageDto();
        result.init(json);
        return result;
    };
    return ChangeUserLanguageDto;
}());

var CreateAssemblyDetectionDto = /** @class */ (function () {
    function CreateAssemblyDetectionDto(data) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    this[property] = data[property];
            }
        }
    }
    CreateAssemblyDetectionDto.prototype.init = function (_data) {
        var e_60, _a;
        if (_data) {
            this.assemblyLineId = _data["assemblyLineId"];
            this.productId = _data["productId"];
            this.stageId = _data["stageId"];
            this.detectionTime = _data["detectionTime"] ? moment__WEBPACK_IMPORTED_MODULE_0__(_data["detectionTime"].toString()) : undefined;
            this.defectsCount = _data["defectsCount"];
            if (Array.isArray(_data["assemblyDefects"])) {
                this.assemblyDefects = [];
                try {
                    for (var _b = __values(_data["assemblyDefects"]), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var item = _c.value;
                        this.assemblyDefects.push(AssemblyDefectsDto.fromJS(item));
                    }
                }
                catch (e_60_1) { e_60 = { error: e_60_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_60) throw e_60.error; }
                }
            }
        }
    };
    CreateAssemblyDetectionDto.fromJS = function (data) {
        data = typeof data === 'object' ? data : {};
        var result = new CreateAssemblyDetectionDto();
        result.init(data);
        return result;
    };
    CreateAssemblyDetectionDto.prototype.toJSON = function (data) {
        var e_61, _a;
        data = typeof data === 'object' ? data : {};
        data["assemblyLineId"] = this.assemblyLineId;
        data["productId"] = this.productId;
        data["stageId"] = this.stageId;
        data["detectionTime"] = this.detectionTime ? this.detectionTime.toISOString() : undefined;
        data["defectsCount"] = this.defectsCount;
        if (Array.isArray(this.assemblyDefects)) {
            data["assemblyDefects"] = [];
            try {
                for (var _b = __values(this.assemblyDefects), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var item = _c.value;
                    data["assemblyDefects"].push(item.toJSON());
                }
            }
            catch (e_61_1) { e_61 = { error: e_61_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_61) throw e_61.error; }
            }
        }
        return data;
    };
    CreateAssemblyDetectionDto.prototype.clone = function () {
        var json = this.toJSON();
        var result = new CreateAssemblyDetectionDto();
        result.init(json);
        return result;
    };
    return CreateAssemblyDetectionDto;
}());

var CreateRoleDto = /** @class */ (function () {
    function CreateRoleDto(data) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    this[property] = data[property];
            }
        }
    }
    CreateRoleDto.prototype.init = function (_data) {
        var e_62, _a;
        if (_data) {
            this.name = _data["name"];
            this.displayName = _data["displayName"];
            this.normalizedName = _data["normalizedName"];
            this.description = _data["description"];
            if (Array.isArray(_data["grantedPermissions"])) {
                this.grantedPermissions = [];
                try {
                    for (var _b = __values(_data["grantedPermissions"]), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var item = _c.value;
                        this.grantedPermissions.push(item);
                    }
                }
                catch (e_62_1) { e_62 = { error: e_62_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_62) throw e_62.error; }
                }
            }
        }
    };
    CreateRoleDto.fromJS = function (data) {
        data = typeof data === 'object' ? data : {};
        var result = new CreateRoleDto();
        result.init(data);
        return result;
    };
    CreateRoleDto.prototype.toJSON = function (data) {
        var e_63, _a;
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        data["displayName"] = this.displayName;
        data["normalizedName"] = this.normalizedName;
        data["description"] = this.description;
        if (Array.isArray(this.grantedPermissions)) {
            data["grantedPermissions"] = [];
            try {
                for (var _b = __values(this.grantedPermissions), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var item = _c.value;
                    data["grantedPermissions"].push(item);
                }
            }
            catch (e_63_1) { e_63 = { error: e_63_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_63) throw e_63.error; }
            }
        }
        return data;
    };
    CreateRoleDto.prototype.clone = function () {
        var json = this.toJSON();
        var result = new CreateRoleDto();
        result.init(json);
        return result;
    };
    return CreateRoleDto;
}());

var CreateTenantDto = /** @class */ (function () {
    function CreateTenantDto(data) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    this[property] = data[property];
            }
        }
    }
    CreateTenantDto.prototype.init = function (_data) {
        if (_data) {
            this.tenancyName = _data["tenancyName"];
            this.name = _data["name"];
            this.adminEmailAddress = _data["adminEmailAddress"];
            this.connectionString = _data["connectionString"];
            this.isActive = _data["isActive"];
        }
    };
    CreateTenantDto.fromJS = function (data) {
        data = typeof data === 'object' ? data : {};
        var result = new CreateTenantDto();
        result.init(data);
        return result;
    };
    CreateTenantDto.prototype.toJSON = function (data) {
        data = typeof data === 'object' ? data : {};
        data["tenancyName"] = this.tenancyName;
        data["name"] = this.name;
        data["adminEmailAddress"] = this.adminEmailAddress;
        data["connectionString"] = this.connectionString;
        data["isActive"] = this.isActive;
        return data;
    };
    CreateTenantDto.prototype.clone = function () {
        var json = this.toJSON();
        var result = new CreateTenantDto();
        result.init(json);
        return result;
    };
    return CreateTenantDto;
}());

var CreateUserDto = /** @class */ (function () {
    function CreateUserDto(data) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    this[property] = data[property];
            }
        }
    }
    CreateUserDto.prototype.init = function (_data) {
        var e_64, _a;
        if (_data) {
            this.userName = _data["userName"];
            this.name = _data["name"];
            this.surname = _data["surname"];
            this.emailAddress = _data["emailAddress"];
            this.isActive = _data["isActive"];
            if (Array.isArray(_data["roleNames"])) {
                this.roleNames = [];
                try {
                    for (var _b = __values(_data["roleNames"]), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var item = _c.value;
                        this.roleNames.push(item);
                    }
                }
                catch (e_64_1) { e_64 = { error: e_64_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_64) throw e_64.error; }
                }
            }
            this.password = _data["password"];
        }
    };
    CreateUserDto.fromJS = function (data) {
        data = typeof data === 'object' ? data : {};
        var result = new CreateUserDto();
        result.init(data);
        return result;
    };
    CreateUserDto.prototype.toJSON = function (data) {
        var e_65, _a;
        data = typeof data === 'object' ? data : {};
        data["userName"] = this.userName;
        data["name"] = this.name;
        data["surname"] = this.surname;
        data["emailAddress"] = this.emailAddress;
        data["isActive"] = this.isActive;
        if (Array.isArray(this.roleNames)) {
            data["roleNames"] = [];
            try {
                for (var _b = __values(this.roleNames), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var item = _c.value;
                    data["roleNames"].push(item);
                }
            }
            catch (e_65_1) { e_65 = { error: e_65_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_65) throw e_65.error; }
            }
        }
        data["password"] = this.password;
        return data;
    };
    CreateUserDto.prototype.clone = function () {
        var json = this.toJSON();
        var result = new CreateUserDto();
        result.init(json);
        return result;
    };
    return CreateUserDto;
}());

var DetailedAssemblyDefects = /** @class */ (function () {
    function DetailedAssemblyDefects(data) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    this[property] = data[property];
            }
        }
    }
    DetailedAssemblyDefects.prototype.init = function (_data) {
        var e_66, _a, e_67, _b, e_68, _c;
        if (_data) {
            if (Array.isArray(_data["assemblyNames"])) {
                this.assemblyNames = [];
                try {
                    for (var _d = __values(_data["assemblyNames"]), _e = _d.next(); !_e.done; _e = _d.next()) {
                        var item = _e.value;
                        this.assemblyNames.push(item);
                    }
                }
                catch (e_66_1) { e_66 = { error: e_66_1 }; }
                finally {
                    try {
                        if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
                    }
                    finally { if (e_66) throw e_66.error; }
                }
            }
            if (Array.isArray(_data["assemblyId"])) {
                this.assemblyId = [];
                try {
                    for (var _f = __values(_data["assemblyId"]), _g = _f.next(); !_g.done; _g = _f.next()) {
                        var item = _g.value;
                        this.assemblyId.push(item);
                    }
                }
                catch (e_67_1) { e_67 = { error: e_67_1 }; }
                finally {
                    try {
                        if (_g && !_g.done && (_b = _f.return)) _b.call(_f);
                    }
                    finally { if (e_67) throw e_67.error; }
                }
            }
            if (Array.isArray(_data["assemblyDefectsCount"])) {
                this.assemblyDefectsCount = [];
                try {
                    for (var _h = __values(_data["assemblyDefectsCount"]), _j = _h.next(); !_j.done; _j = _h.next()) {
                        var item = _j.value;
                        this.assemblyDefectsCount.push(item);
                    }
                }
                catch (e_68_1) { e_68 = { error: e_68_1 }; }
                finally {
                    try {
                        if (_j && !_j.done && (_c = _h.return)) _c.call(_h);
                    }
                    finally { if (e_68) throw e_68.error; }
                }
            }
        }
    };
    DetailedAssemblyDefects.fromJS = function (data) {
        data = typeof data === 'object' ? data : {};
        var result = new DetailedAssemblyDefects();
        result.init(data);
        return result;
    };
    DetailedAssemblyDefects.prototype.toJSON = function (data) {
        var e_69, _a, e_70, _b, e_71, _c;
        data = typeof data === 'object' ? data : {};
        if (Array.isArray(this.assemblyNames)) {
            data["assemblyNames"] = [];
            try {
                for (var _d = __values(this.assemblyNames), _e = _d.next(); !_e.done; _e = _d.next()) {
                    var item = _e.value;
                    data["assemblyNames"].push(item);
                }
            }
            catch (e_69_1) { e_69 = { error: e_69_1 }; }
            finally {
                try {
                    if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
                }
                finally { if (e_69) throw e_69.error; }
            }
        }
        if (Array.isArray(this.assemblyId)) {
            data["assemblyId"] = [];
            try {
                for (var _f = __values(this.assemblyId), _g = _f.next(); !_g.done; _g = _f.next()) {
                    var item = _g.value;
                    data["assemblyId"].push(item);
                }
            }
            catch (e_70_1) { e_70 = { error: e_70_1 }; }
            finally {
                try {
                    if (_g && !_g.done && (_b = _f.return)) _b.call(_f);
                }
                finally { if (e_70) throw e_70.error; }
            }
        }
        if (Array.isArray(this.assemblyDefectsCount)) {
            data["assemblyDefectsCount"] = [];
            try {
                for (var _h = __values(this.assemblyDefectsCount), _j = _h.next(); !_j.done; _j = _h.next()) {
                    var item = _j.value;
                    data["assemblyDefectsCount"].push(item);
                }
            }
            catch (e_71_1) { e_71 = { error: e_71_1 }; }
            finally {
                try {
                    if (_j && !_j.done && (_c = _h.return)) _c.call(_h);
                }
                finally { if (e_71) throw e_71.error; }
            }
        }
        return data;
    };
    DetailedAssemblyDefects.prototype.clone = function () {
        var json = this.toJSON();
        var result = new DetailedAssemblyDefects();
        result.init(json);
        return result;
    };
    return DetailedAssemblyDefects;
}());

var DetailedDefectiveRatio = /** @class */ (function () {
    function DetailedDefectiveRatio(data) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    this[property] = data[property];
            }
        }
    }
    DetailedDefectiveRatio.prototype.init = function (_data) {
        var e_72, _a, e_73, _b;
        if (_data) {
            if (Array.isArray(_data["names"])) {
                this.names = [];
                try {
                    for (var _c = __values(_data["names"]), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var item = _d.value;
                        this.names.push(item);
                    }
                }
                catch (e_72_1) { e_72 = { error: e_72_1 }; }
                finally {
                    try {
                        if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                    }
                    finally { if (e_72) throw e_72.error; }
                }
            }
            if (Array.isArray(_data["count"])) {
                this.count = [];
                try {
                    for (var _e = __values(_data["count"]), _f = _e.next(); !_f.done; _f = _e.next()) {
                        var item = _f.value;
                        this.count.push(item);
                    }
                }
                catch (e_73_1) { e_73 = { error: e_73_1 }; }
                finally {
                    try {
                        if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                    }
                    finally { if (e_73) throw e_73.error; }
                }
            }
        }
    };
    DetailedDefectiveRatio.fromJS = function (data) {
        data = typeof data === 'object' ? data : {};
        var result = new DetailedDefectiveRatio();
        result.init(data);
        return result;
    };
    DetailedDefectiveRatio.prototype.toJSON = function (data) {
        var e_74, _a, e_75, _b;
        data = typeof data === 'object' ? data : {};
        if (Array.isArray(this.names)) {
            data["names"] = [];
            try {
                for (var _c = __values(this.names), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var item = _d.value;
                    data["names"].push(item);
                }
            }
            catch (e_74_1) { e_74 = { error: e_74_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_74) throw e_74.error; }
            }
        }
        if (Array.isArray(this.count)) {
            data["count"] = [];
            try {
                for (var _e = __values(this.count), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var item = _f.value;
                    data["count"].push(item);
                }
            }
            catch (e_75_1) { e_75 = { error: e_75_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                }
                finally { if (e_75) throw e_75.error; }
            }
        }
        return data;
    };
    DetailedDefectiveRatio.prototype.clone = function () {
        var json = this.toJSON();
        var result = new DetailedDefectiveRatio();
        result.init(json);
        return result;
    };
    return DetailedDefectiveRatio;
}());

var DetailedDefectTrendDataDto = /** @class */ (function () {
    function DetailedDefectTrendDataDto(data) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    this[property] = data[property];
            }
        }
    }
    DetailedDefectTrendDataDto.prototype.init = function (_data) {
        var e_76, _a;
        if (_data) {
            this.name = _data["name"];
            this.defectId = _data["defectId"];
            if (Array.isArray(_data["data"])) {
                this.data = [];
                try {
                    for (var _b = __values(_data["data"]), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var item = _c.value;
                        this.data.push(item);
                    }
                }
                catch (e_76_1) { e_76 = { error: e_76_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_76) throw e_76.error; }
                }
            }
        }
    };
    DetailedDefectTrendDataDto.fromJS = function (data) {
        data = typeof data === 'object' ? data : {};
        var result = new DetailedDefectTrendDataDto();
        result.init(data);
        return result;
    };
    DetailedDefectTrendDataDto.prototype.toJSON = function (data) {
        var e_77, _a;
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        data["defectId"] = this.defectId;
        if (Array.isArray(this.data)) {
            data["data"] = [];
            try {
                for (var _b = __values(this.data), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var item = _c.value;
                    data["data"].push(item);
                }
            }
            catch (e_77_1) { e_77 = { error: e_77_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_77) throw e_77.error; }
            }
        }
        return data;
    };
    DetailedDefectTrendDataDto.prototype.clone = function () {
        var json = this.toJSON();
        var result = new DetailedDefectTrendDataDto();
        result.init(json);
        return result;
    };
    return DetailedDefectTrendDataDto;
}());

var DetailedDefectTrendDto = /** @class */ (function () {
    function DetailedDefectTrendDto(data) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    this[property] = data[property];
            }
        }
    }
    DetailedDefectTrendDto.prototype.init = function (_data) {
        var e_78, _a, e_79, _b, e_80, _c;
        if (_data) {
            if (Array.isArray(_data["labels"])) {
                this.labels = [];
                try {
                    for (var _d = __values(_data["labels"]), _e = _d.next(); !_e.done; _e = _d.next()) {
                        var item = _e.value;
                        this.labels.push(moment__WEBPACK_IMPORTED_MODULE_0__(item));
                    }
                }
                catch (e_78_1) { e_78 = { error: e_78_1 }; }
                finally {
                    try {
                        if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
                    }
                    finally { if (e_78) throw e_78.error; }
                }
            }
            if (Array.isArray(_data["all"])) {
                this.all = [];
                try {
                    for (var _f = __values(_data["all"]), _g = _f.next(); !_g.done; _g = _f.next()) {
                        var item = _g.value;
                        this.all.push(item);
                    }
                }
                catch (e_79_1) { e_79 = { error: e_79_1 }; }
                finally {
                    try {
                        if (_g && !_g.done && (_b = _f.return)) _b.call(_f);
                    }
                    finally { if (e_79) throw e_79.error; }
                }
            }
            if (Array.isArray(_data["data"])) {
                this.data = [];
                try {
                    for (var _h = __values(_data["data"]), _j = _h.next(); !_j.done; _j = _h.next()) {
                        var item = _j.value;
                        this.data.push(DetailedDefectTrendDataDto.fromJS(item));
                    }
                }
                catch (e_80_1) { e_80 = { error: e_80_1 }; }
                finally {
                    try {
                        if (_j && !_j.done && (_c = _h.return)) _c.call(_h);
                    }
                    finally { if (e_80) throw e_80.error; }
                }
            }
        }
    };
    DetailedDefectTrendDto.fromJS = function (data) {
        data = typeof data === 'object' ? data : {};
        var result = new DetailedDefectTrendDto();
        result.init(data);
        return result;
    };
    DetailedDefectTrendDto.prototype.toJSON = function (data) {
        var e_81, _a, e_82, _b, e_83, _c;
        data = typeof data === 'object' ? data : {};
        if (Array.isArray(this.labels)) {
            data["labels"] = [];
            try {
                for (var _d = __values(this.labels), _e = _d.next(); !_e.done; _e = _d.next()) {
                    var item = _e.value;
                    data["labels"].push(item.toISOString());
                }
            }
            catch (e_81_1) { e_81 = { error: e_81_1 }; }
            finally {
                try {
                    if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
                }
                finally { if (e_81) throw e_81.error; }
            }
        }
        if (Array.isArray(this.all)) {
            data["all"] = [];
            try {
                for (var _f = __values(this.all), _g = _f.next(); !_g.done; _g = _f.next()) {
                    var item = _g.value;
                    data["all"].push(item);
                }
            }
            catch (e_82_1) { e_82 = { error: e_82_1 }; }
            finally {
                try {
                    if (_g && !_g.done && (_b = _f.return)) _b.call(_f);
                }
                finally { if (e_82) throw e_82.error; }
            }
        }
        if (Array.isArray(this.data)) {
            data["data"] = [];
            try {
                for (var _h = __values(this.data), _j = _h.next(); !_j.done; _j = _h.next()) {
                    var item = _j.value;
                    data["data"].push(item.toJSON());
                }
            }
            catch (e_83_1) { e_83 = { error: e_83_1 }; }
            finally {
                try {
                    if (_j && !_j.done && (_c = _h.return)) _c.call(_h);
                }
                finally { if (e_83) throw e_83.error; }
            }
        }
        return data;
    };
    DetailedDefectTrendDto.prototype.clone = function () {
        var json = this.toJSON();
        var result = new DetailedDefectTrendDto();
        result.init(json);
        return result;
    };
    return DetailedDefectTrendDto;
}());

var DetailedGeneralInsightsDto = /** @class */ (function () {
    function DetailedGeneralInsightsDto(data) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    this[property] = data[property];
            }
        }
    }
    DetailedGeneralInsightsDto.prototype.init = function (_data) {
        var e_84, _a, e_85, _b, e_86, _c, e_87, _d;
        if (_data) {
            this.totalDetections = _data["totalDetections"];
            this.totalDefects = _data["totalDefects"];
            this.totalGood = _data["totalGood"];
            if (Array.isArray(_data["labels"])) {
                this.labels = [];
                try {
                    for (var _e = __values(_data["labels"]), _f = _e.next(); !_f.done; _f = _e.next()) {
                        var item = _f.value;
                        this.labels.push(moment__WEBPACK_IMPORTED_MODULE_0__(item));
                    }
                }
                catch (e_84_1) { e_84 = { error: e_84_1 }; }
                finally {
                    try {
                        if (_f && !_f.done && (_a = _e.return)) _a.call(_e);
                    }
                    finally { if (e_84) throw e_84.error; }
                }
            }
            if (Array.isArray(_data["detections"])) {
                this.detections = [];
                try {
                    for (var _g = __values(_data["detections"]), _h = _g.next(); !_h.done; _h = _g.next()) {
                        var item = _h.value;
                        this.detections.push(item);
                    }
                }
                catch (e_85_1) { e_85 = { error: e_85_1 }; }
                finally {
                    try {
                        if (_h && !_h.done && (_b = _g.return)) _b.call(_g);
                    }
                    finally { if (e_85) throw e_85.error; }
                }
            }
            if (Array.isArray(_data["defects"])) {
                this.defects = [];
                try {
                    for (var _j = __values(_data["defects"]), _k = _j.next(); !_k.done; _k = _j.next()) {
                        var item = _k.value;
                        this.defects.push(item);
                    }
                }
                catch (e_86_1) { e_86 = { error: e_86_1 }; }
                finally {
                    try {
                        if (_k && !_k.done && (_c = _j.return)) _c.call(_j);
                    }
                    finally { if (e_86) throw e_86.error; }
                }
            }
            if (Array.isArray(_data["good"])) {
                this.good = [];
                try {
                    for (var _l = __values(_data["good"]), _m = _l.next(); !_m.done; _m = _l.next()) {
                        var item = _m.value;
                        this.good.push(item);
                    }
                }
                catch (e_87_1) { e_87 = { error: e_87_1 }; }
                finally {
                    try {
                        if (_m && !_m.done && (_d = _l.return)) _d.call(_l);
                    }
                    finally { if (e_87) throw e_87.error; }
                }
            }
        }
    };
    DetailedGeneralInsightsDto.fromJS = function (data) {
        data = typeof data === 'object' ? data : {};
        var result = new DetailedGeneralInsightsDto();
        result.init(data);
        return result;
    };
    DetailedGeneralInsightsDto.prototype.toJSON = function (data) {
        var e_88, _a, e_89, _b, e_90, _c, e_91, _d;
        data = typeof data === 'object' ? data : {};
        data["totalDetections"] = this.totalDetections;
        data["totalDefects"] = this.totalDefects;
        data["totalGood"] = this.totalGood;
        if (Array.isArray(this.labels)) {
            data["labels"] = [];
            try {
                for (var _e = __values(this.labels), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var item = _f.value;
                    data["labels"].push(item.toISOString());
                }
            }
            catch (e_88_1) { e_88 = { error: e_88_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_a = _e.return)) _a.call(_e);
                }
                finally { if (e_88) throw e_88.error; }
            }
        }
        if (Array.isArray(this.detections)) {
            data["detections"] = [];
            try {
                for (var _g = __values(this.detections), _h = _g.next(); !_h.done; _h = _g.next()) {
                    var item = _h.value;
                    data["detections"].push(item);
                }
            }
            catch (e_89_1) { e_89 = { error: e_89_1 }; }
            finally {
                try {
                    if (_h && !_h.done && (_b = _g.return)) _b.call(_g);
                }
                finally { if (e_89) throw e_89.error; }
            }
        }
        if (Array.isArray(this.defects)) {
            data["defects"] = [];
            try {
                for (var _j = __values(this.defects), _k = _j.next(); !_k.done; _k = _j.next()) {
                    var item = _k.value;
                    data["defects"].push(item);
                }
            }
            catch (e_90_1) { e_90 = { error: e_90_1 }; }
            finally {
                try {
                    if (_k && !_k.done && (_c = _j.return)) _c.call(_j);
                }
                finally { if (e_90) throw e_90.error; }
            }
        }
        if (Array.isArray(this.good)) {
            data["good"] = [];
            try {
                for (var _l = __values(this.good), _m = _l.next(); !_m.done; _m = _l.next()) {
                    var item = _m.value;
                    data["good"].push(item);
                }
            }
            catch (e_91_1) { e_91 = { error: e_91_1 }; }
            finally {
                try {
                    if (_m && !_m.done && (_d = _l.return)) _d.call(_l);
                }
                finally { if (e_91) throw e_91.error; }
            }
        }
        return data;
    };
    DetailedGeneralInsightsDto.prototype.clone = function () {
        var json = this.toJSON();
        var result = new DetailedGeneralInsightsDto();
        result.init(json);
        return result;
    };
    return DetailedGeneralInsightsDto;
}());

var DetailedRevenueLossDataDto = /** @class */ (function () {
    function DetailedRevenueLossDataDto(data) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    this[property] = data[property];
            }
        }
    }
    DetailedRevenueLossDataDto.prototype.init = function (_data) {
        var e_92, _a;
        if (_data) {
            this.name = _data["name"];
            this.id = _data["id"];
            if (Array.isArray(_data["data"])) {
                this.data = [];
                try {
                    for (var _b = __values(_data["data"]), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var item = _c.value;
                        this.data.push(item);
                    }
                }
                catch (e_92_1) { e_92 = { error: e_92_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_92) throw e_92.error; }
                }
            }
        }
    };
    DetailedRevenueLossDataDto.fromJS = function (data) {
        data = typeof data === 'object' ? data : {};
        var result = new DetailedRevenueLossDataDto();
        result.init(data);
        return result;
    };
    DetailedRevenueLossDataDto.prototype.toJSON = function (data) {
        var e_93, _a;
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        data["id"] = this.id;
        if (Array.isArray(this.data)) {
            data["data"] = [];
            try {
                for (var _b = __values(this.data), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var item = _c.value;
                    data["data"].push(item);
                }
            }
            catch (e_93_1) { e_93 = { error: e_93_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_93) throw e_93.error; }
            }
        }
        return data;
    };
    DetailedRevenueLossDataDto.prototype.clone = function () {
        var json = this.toJSON();
        var result = new DetailedRevenueLossDataDto();
        result.init(json);
        return result;
    };
    return DetailedRevenueLossDataDto;
}());

var DetailedRevenueLossDto = /** @class */ (function () {
    function DetailedRevenueLossDto(data) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    this[property] = data[property];
            }
        }
    }
    DetailedRevenueLossDto.prototype.init = function (_data) {
        var e_94, _a, e_95, _b, e_96, _c;
        if (_data) {
            if (Array.isArray(_data["labels"])) {
                this.labels = [];
                try {
                    for (var _d = __values(_data["labels"]), _e = _d.next(); !_e.done; _e = _d.next()) {
                        var item = _e.value;
                        this.labels.push(moment__WEBPACK_IMPORTED_MODULE_0__(item));
                    }
                }
                catch (e_94_1) { e_94 = { error: e_94_1 }; }
                finally {
                    try {
                        if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
                    }
                    finally { if (e_94) throw e_94.error; }
                }
            }
            if (Array.isArray(_data["all"])) {
                this.all = [];
                try {
                    for (var _f = __values(_data["all"]), _g = _f.next(); !_g.done; _g = _f.next()) {
                        var item = _g.value;
                        this.all.push(item);
                    }
                }
                catch (e_95_1) { e_95 = { error: e_95_1 }; }
                finally {
                    try {
                        if (_g && !_g.done && (_b = _f.return)) _b.call(_f);
                    }
                    finally { if (e_95) throw e_95.error; }
                }
            }
            if (Array.isArray(_data["data"])) {
                this.data = [];
                try {
                    for (var _h = __values(_data["data"]), _j = _h.next(); !_j.done; _j = _h.next()) {
                        var item = _j.value;
                        this.data.push(DetailedRevenueLossDataDto.fromJS(item));
                    }
                }
                catch (e_96_1) { e_96 = { error: e_96_1 }; }
                finally {
                    try {
                        if (_j && !_j.done && (_c = _h.return)) _c.call(_h);
                    }
                    finally { if (e_96) throw e_96.error; }
                }
            }
        }
    };
    DetailedRevenueLossDto.fromJS = function (data) {
        data = typeof data === 'object' ? data : {};
        var result = new DetailedRevenueLossDto();
        result.init(data);
        return result;
    };
    DetailedRevenueLossDto.prototype.toJSON = function (data) {
        var e_97, _a, e_98, _b, e_99, _c;
        data = typeof data === 'object' ? data : {};
        if (Array.isArray(this.labels)) {
            data["labels"] = [];
            try {
                for (var _d = __values(this.labels), _e = _d.next(); !_e.done; _e = _d.next()) {
                    var item = _e.value;
                    data["labels"].push(item.toISOString());
                }
            }
            catch (e_97_1) { e_97 = { error: e_97_1 }; }
            finally {
                try {
                    if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
                }
                finally { if (e_97) throw e_97.error; }
            }
        }
        if (Array.isArray(this.all)) {
            data["all"] = [];
            try {
                for (var _f = __values(this.all), _g = _f.next(); !_g.done; _g = _f.next()) {
                    var item = _g.value;
                    data["all"].push(item);
                }
            }
            catch (e_98_1) { e_98 = { error: e_98_1 }; }
            finally {
                try {
                    if (_g && !_g.done && (_b = _f.return)) _b.call(_f);
                }
                finally { if (e_98) throw e_98.error; }
            }
        }
        if (Array.isArray(this.data)) {
            data["data"] = [];
            try {
                for (var _h = __values(this.data), _j = _h.next(); !_j.done; _j = _h.next()) {
                    var item = _j.value;
                    data["data"].push(item.toJSON());
                }
            }
            catch (e_99_1) { e_99 = { error: e_99_1 }; }
            finally {
                try {
                    if (_j && !_j.done && (_c = _h.return)) _c.call(_h);
                }
                finally { if (e_99) throw e_99.error; }
            }
        }
        return data;
    };
    DetailedRevenueLossDto.prototype.clone = function () {
        var json = this.toJSON();
        var result = new DetailedRevenueLossDto();
        result.init(json);
        return result;
    };
    return DetailedRevenueLossDto;
}());

var ExternalAuthenticateModel = /** @class */ (function () {
    function ExternalAuthenticateModel(data) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    this[property] = data[property];
            }
        }
    }
    ExternalAuthenticateModel.prototype.init = function (_data) {
        if (_data) {
            this.authProvider = _data["authProvider"];
            this.providerKey = _data["providerKey"];
            this.providerAccessCode = _data["providerAccessCode"];
        }
    };
    ExternalAuthenticateModel.fromJS = function (data) {
        data = typeof data === 'object' ? data : {};
        var result = new ExternalAuthenticateModel();
        result.init(data);
        return result;
    };
    ExternalAuthenticateModel.prototype.toJSON = function (data) {
        data = typeof data === 'object' ? data : {};
        data["authProvider"] = this.authProvider;
        data["providerKey"] = this.providerKey;
        data["providerAccessCode"] = this.providerAccessCode;
        return data;
    };
    ExternalAuthenticateModel.prototype.clone = function () {
        var json = this.toJSON();
        var result = new ExternalAuthenticateModel();
        result.init(json);
        return result;
    };
    return ExternalAuthenticateModel;
}());

var ExternalAuthenticateResultModel = /** @class */ (function () {
    function ExternalAuthenticateResultModel(data) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    this[property] = data[property];
            }
        }
    }
    ExternalAuthenticateResultModel.prototype.init = function (_data) {
        if (_data) {
            this.accessToken = _data["accessToken"];
            this.encryptedAccessToken = _data["encryptedAccessToken"];
            this.expireInSeconds = _data["expireInSeconds"];
            this.waitingForActivation = _data["waitingForActivation"];
        }
    };
    ExternalAuthenticateResultModel.fromJS = function (data) {
        data = typeof data === 'object' ? data : {};
        var result = new ExternalAuthenticateResultModel();
        result.init(data);
        return result;
    };
    ExternalAuthenticateResultModel.prototype.toJSON = function (data) {
        data = typeof data === 'object' ? data : {};
        data["accessToken"] = this.accessToken;
        data["encryptedAccessToken"] = this.encryptedAccessToken;
        data["expireInSeconds"] = this.expireInSeconds;
        data["waitingForActivation"] = this.waitingForActivation;
        return data;
    };
    ExternalAuthenticateResultModel.prototype.clone = function () {
        var json = this.toJSON();
        var result = new ExternalAuthenticateResultModel();
        result.init(json);
        return result;
    };
    return ExternalAuthenticateResultModel;
}());

var ExternalLoginProviderInfoModel = /** @class */ (function () {
    function ExternalLoginProviderInfoModel(data) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    this[property] = data[property];
            }
        }
    }
    ExternalLoginProviderInfoModel.prototype.init = function (_data) {
        if (_data) {
            this.name = _data["name"];
            this.clientId = _data["clientId"];
        }
    };
    ExternalLoginProviderInfoModel.fromJS = function (data) {
        data = typeof data === 'object' ? data : {};
        var result = new ExternalLoginProviderInfoModel();
        result.init(data);
        return result;
    };
    ExternalLoginProviderInfoModel.prototype.toJSON = function (data) {
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        data["clientId"] = this.clientId;
        return data;
    };
    ExternalLoginProviderInfoModel.prototype.clone = function () {
        var json = this.toJSON();
        var result = new ExternalLoginProviderInfoModel();
        result.init(json);
        return result;
    };
    return ExternalLoginProviderInfoModel;
}());

var FlatPermissionDto = /** @class */ (function () {
    function FlatPermissionDto(data) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    this[property] = data[property];
            }
        }
    }
    FlatPermissionDto.prototype.init = function (_data) {
        if (_data) {
            this.name = _data["name"];
            this.displayName = _data["displayName"];
            this.description = _data["description"];
        }
    };
    FlatPermissionDto.fromJS = function (data) {
        data = typeof data === 'object' ? data : {};
        var result = new FlatPermissionDto();
        result.init(data);
        return result;
    };
    FlatPermissionDto.prototype.toJSON = function (data) {
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        data["displayName"] = this.displayName;
        data["description"] = this.description;
        return data;
    };
    FlatPermissionDto.prototype.clone = function () {
        var json = this.toJSON();
        var result = new FlatPermissionDto();
        result.init(json);
        return result;
    };
    return FlatPermissionDto;
}());

var GetCurrentLoginInformationsOutput = /** @class */ (function () {
    function GetCurrentLoginInformationsOutput(data) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    this[property] = data[property];
            }
        }
    }
    GetCurrentLoginInformationsOutput.prototype.init = function (_data) {
        if (_data) {
            this.application = _data["application"] ? ApplicationInfoDto.fromJS(_data["application"]) : undefined;
            this.user = _data["user"] ? UserLoginInfoDto.fromJS(_data["user"]) : undefined;
            this.tenant = _data["tenant"] ? TenantLoginInfoDto.fromJS(_data["tenant"]) : undefined;
        }
    };
    GetCurrentLoginInformationsOutput.fromJS = function (data) {
        data = typeof data === 'object' ? data : {};
        var result = new GetCurrentLoginInformationsOutput();
        result.init(data);
        return result;
    };
    GetCurrentLoginInformationsOutput.prototype.toJSON = function (data) {
        data = typeof data === 'object' ? data : {};
        data["application"] = this.application ? this.application.toJSON() : undefined;
        data["user"] = this.user ? this.user.toJSON() : undefined;
        data["tenant"] = this.tenant ? this.tenant.toJSON() : undefined;
        return data;
    };
    GetCurrentLoginInformationsOutput.prototype.clone = function () {
        var json = this.toJSON();
        var result = new GetCurrentLoginInformationsOutput();
        result.init(json);
        return result;
    };
    return GetCurrentLoginInformationsOutput;
}());

var GetRoleForEditOutput = /** @class */ (function () {
    function GetRoleForEditOutput(data) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    this[property] = data[property];
            }
        }
    }
    GetRoleForEditOutput.prototype.init = function (_data) {
        var e_100, _a, e_101, _b;
        if (_data) {
            this.role = _data["role"] ? RoleEditDto.fromJS(_data["role"]) : undefined;
            if (Array.isArray(_data["permissions"])) {
                this.permissions = [];
                try {
                    for (var _c = __values(_data["permissions"]), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var item = _d.value;
                        this.permissions.push(FlatPermissionDto.fromJS(item));
                    }
                }
                catch (e_100_1) { e_100 = { error: e_100_1 }; }
                finally {
                    try {
                        if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                    }
                    finally { if (e_100) throw e_100.error; }
                }
            }
            if (Array.isArray(_data["grantedPermissionNames"])) {
                this.grantedPermissionNames = [];
                try {
                    for (var _e = __values(_data["grantedPermissionNames"]), _f = _e.next(); !_f.done; _f = _e.next()) {
                        var item = _f.value;
                        this.grantedPermissionNames.push(item);
                    }
                }
                catch (e_101_1) { e_101 = { error: e_101_1 }; }
                finally {
                    try {
                        if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                    }
                    finally { if (e_101) throw e_101.error; }
                }
            }
        }
    };
    GetRoleForEditOutput.fromJS = function (data) {
        data = typeof data === 'object' ? data : {};
        var result = new GetRoleForEditOutput();
        result.init(data);
        return result;
    };
    GetRoleForEditOutput.prototype.toJSON = function (data) {
        var e_102, _a, e_103, _b;
        data = typeof data === 'object' ? data : {};
        data["role"] = this.role ? this.role.toJSON() : undefined;
        if (Array.isArray(this.permissions)) {
            data["permissions"] = [];
            try {
                for (var _c = __values(this.permissions), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var item = _d.value;
                    data["permissions"].push(item.toJSON());
                }
            }
            catch (e_102_1) { e_102 = { error: e_102_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_102) throw e_102.error; }
            }
        }
        if (Array.isArray(this.grantedPermissionNames)) {
            data["grantedPermissionNames"] = [];
            try {
                for (var _e = __values(this.grantedPermissionNames), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var item = _f.value;
                    data["grantedPermissionNames"].push(item);
                }
            }
            catch (e_103_1) { e_103 = { error: e_103_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                }
                finally { if (e_103) throw e_103.error; }
            }
        }
        return data;
    };
    GetRoleForEditOutput.prototype.clone = function () {
        var json = this.toJSON();
        var result = new GetRoleForEditOutput();
        result.init(json);
        return result;
    };
    return GetRoleForEditOutput;
}());

var Int64EntityDto = /** @class */ (function () {
    function Int64EntityDto(data) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    this[property] = data[property];
            }
        }
    }
    Int64EntityDto.prototype.init = function (_data) {
        if (_data) {
            this.id = _data["id"];
        }
    };
    Int64EntityDto.fromJS = function (data) {
        data = typeof data === 'object' ? data : {};
        var result = new Int64EntityDto();
        result.init(data);
        return result;
    };
    Int64EntityDto.prototype.toJSON = function (data) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        return data;
    };
    Int64EntityDto.prototype.clone = function () {
        var json = this.toJSON();
        var result = new Int64EntityDto();
        result.init(json);
        return result;
    };
    return Int64EntityDto;
}());

var IsTenantAvailableInput = /** @class */ (function () {
    function IsTenantAvailableInput(data) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    this[property] = data[property];
            }
        }
    }
    IsTenantAvailableInput.prototype.init = function (_data) {
        if (_data) {
            this.tenancyName = _data["tenancyName"];
        }
    };
    IsTenantAvailableInput.fromJS = function (data) {
        data = typeof data === 'object' ? data : {};
        var result = new IsTenantAvailableInput();
        result.init(data);
        return result;
    };
    IsTenantAvailableInput.prototype.toJSON = function (data) {
        data = typeof data === 'object' ? data : {};
        data["tenancyName"] = this.tenancyName;
        return data;
    };
    IsTenantAvailableInput.prototype.clone = function () {
        var json = this.toJSON();
        var result = new IsTenantAvailableInput();
        result.init(json);
        return result;
    };
    return IsTenantAvailableInput;
}());

var IsTenantAvailableOutput = /** @class */ (function () {
    function IsTenantAvailableOutput(data) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    this[property] = data[property];
            }
        }
    }
    IsTenantAvailableOutput.prototype.init = function (_data) {
        if (_data) {
            this.state = _data["state"];
            this.tenantId = _data["tenantId"];
        }
    };
    IsTenantAvailableOutput.fromJS = function (data) {
        data = typeof data === 'object' ? data : {};
        var result = new IsTenantAvailableOutput();
        result.init(data);
        return result;
    };
    IsTenantAvailableOutput.prototype.toJSON = function (data) {
        data = typeof data === 'object' ? data : {};
        data["state"] = this.state;
        data["tenantId"] = this.tenantId;
        return data;
    };
    IsTenantAvailableOutput.prototype.clone = function () {
        var json = this.toJSON();
        var result = new IsTenantAvailableOutput();
        result.init(json);
        return result;
    };
    return IsTenantAvailableOutput;
}());

var OverviewDefectiveRatio = /** @class */ (function () {
    function OverviewDefectiveRatio(data) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    this[property] = data[property];
            }
        }
    }
    OverviewDefectiveRatio.prototype.init = function (_data) {
        var e_104, _a, e_105, _b;
        if (_data) {
            if (Array.isArray(_data["names"])) {
                this.names = [];
                try {
                    for (var _c = __values(_data["names"]), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var item = _d.value;
                        this.names.push(item);
                    }
                }
                catch (e_104_1) { e_104 = { error: e_104_1 }; }
                finally {
                    try {
                        if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                    }
                    finally { if (e_104) throw e_104.error; }
                }
            }
            if (Array.isArray(_data["count"])) {
                this.count = [];
                try {
                    for (var _e = __values(_data["count"]), _f = _e.next(); !_f.done; _f = _e.next()) {
                        var item = _f.value;
                        this.count.push(item);
                    }
                }
                catch (e_105_1) { e_105 = { error: e_105_1 }; }
                finally {
                    try {
                        if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                    }
                    finally { if (e_105) throw e_105.error; }
                }
            }
        }
    };
    OverviewDefectiveRatio.fromJS = function (data) {
        data = typeof data === 'object' ? data : {};
        var result = new OverviewDefectiveRatio();
        result.init(data);
        return result;
    };
    OverviewDefectiveRatio.prototype.toJSON = function (data) {
        var e_106, _a, e_107, _b;
        data = typeof data === 'object' ? data : {};
        if (Array.isArray(this.names)) {
            data["names"] = [];
            try {
                for (var _c = __values(this.names), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var item = _d.value;
                    data["names"].push(item);
                }
            }
            catch (e_106_1) { e_106 = { error: e_106_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_106) throw e_106.error; }
            }
        }
        if (Array.isArray(this.count)) {
            data["count"] = [];
            try {
                for (var _e = __values(this.count), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var item = _f.value;
                    data["count"].push(item);
                }
            }
            catch (e_107_1) { e_107 = { error: e_107_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                }
                finally { if (e_107) throw e_107.error; }
            }
        }
        return data;
    };
    OverviewDefectiveRatio.prototype.clone = function () {
        var json = this.toJSON();
        var result = new OverviewDefectiveRatio();
        result.init(json);
        return result;
    };
    return OverviewDefectiveRatio;
}());

var OverviewDefectRatioDto = /** @class */ (function () {
    function OverviewDefectRatioDto(data) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    this[property] = data[property];
            }
        }
    }
    OverviewDefectRatioDto.prototype.init = function (_data) {
        var e_108, _a, e_109, _b, e_110, _c, e_111, _d;
        if (_data) {
            if (Array.isArray(_data["ids"])) {
                this.ids = [];
                try {
                    for (var _e = __values(_data["ids"]), _f = _e.next(); !_f.done; _f = _e.next()) {
                        var item = _f.value;
                        this.ids.push(item);
                    }
                }
                catch (e_108_1) { e_108 = { error: e_108_1 }; }
                finally {
                    try {
                        if (_f && !_f.done && (_a = _e.return)) _a.call(_e);
                    }
                    finally { if (e_108) throw e_108.error; }
                }
            }
            if (Array.isArray(_data["name"])) {
                this.name = [];
                try {
                    for (var _g = __values(_data["name"]), _h = _g.next(); !_h.done; _h = _g.next()) {
                        var item = _h.value;
                        this.name.push(item);
                    }
                }
                catch (e_109_1) { e_109 = { error: e_109_1 }; }
                finally {
                    try {
                        if (_h && !_h.done && (_b = _g.return)) _b.call(_g);
                    }
                    finally { if (e_109) throw e_109.error; }
                }
            }
            if (Array.isArray(_data["defects"])) {
                this.defects = [];
                try {
                    for (var _j = __values(_data["defects"]), _k = _j.next(); !_k.done; _k = _j.next()) {
                        var item = _k.value;
                        this.defects.push(item);
                    }
                }
                catch (e_110_1) { e_110 = { error: e_110_1 }; }
                finally {
                    try {
                        if (_k && !_k.done && (_c = _j.return)) _c.call(_j);
                    }
                    finally { if (e_110) throw e_110.error; }
                }
            }
            if (Array.isArray(_data["good"])) {
                this.good = [];
                try {
                    for (var _l = __values(_data["good"]), _m = _l.next(); !_m.done; _m = _l.next()) {
                        var item = _m.value;
                        this.good.push(item);
                    }
                }
                catch (e_111_1) { e_111 = { error: e_111_1 }; }
                finally {
                    try {
                        if (_m && !_m.done && (_d = _l.return)) _d.call(_l);
                    }
                    finally { if (e_111) throw e_111.error; }
                }
            }
        }
    };
    OverviewDefectRatioDto.fromJS = function (data) {
        data = typeof data === 'object' ? data : {};
        var result = new OverviewDefectRatioDto();
        result.init(data);
        return result;
    };
    OverviewDefectRatioDto.prototype.toJSON = function (data) {
        var e_112, _a, e_113, _b, e_114, _c, e_115, _d;
        data = typeof data === 'object' ? data : {};
        if (Array.isArray(this.ids)) {
            data["ids"] = [];
            try {
                for (var _e = __values(this.ids), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var item = _f.value;
                    data["ids"].push(item);
                }
            }
            catch (e_112_1) { e_112 = { error: e_112_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_a = _e.return)) _a.call(_e);
                }
                finally { if (e_112) throw e_112.error; }
            }
        }
        if (Array.isArray(this.name)) {
            data["name"] = [];
            try {
                for (var _g = __values(this.name), _h = _g.next(); !_h.done; _h = _g.next()) {
                    var item = _h.value;
                    data["name"].push(item);
                }
            }
            catch (e_113_1) { e_113 = { error: e_113_1 }; }
            finally {
                try {
                    if (_h && !_h.done && (_b = _g.return)) _b.call(_g);
                }
                finally { if (e_113) throw e_113.error; }
            }
        }
        if (Array.isArray(this.defects)) {
            data["defects"] = [];
            try {
                for (var _j = __values(this.defects), _k = _j.next(); !_k.done; _k = _j.next()) {
                    var item = _k.value;
                    data["defects"].push(item);
                }
            }
            catch (e_114_1) { e_114 = { error: e_114_1 }; }
            finally {
                try {
                    if (_k && !_k.done && (_c = _j.return)) _c.call(_j);
                }
                finally { if (e_114) throw e_114.error; }
            }
        }
        if (Array.isArray(this.good)) {
            data["good"] = [];
            try {
                for (var _l = __values(this.good), _m = _l.next(); !_m.done; _m = _l.next()) {
                    var item = _m.value;
                    data["good"].push(item);
                }
            }
            catch (e_115_1) { e_115 = { error: e_115_1 }; }
            finally {
                try {
                    if (_m && !_m.done && (_d = _l.return)) _d.call(_l);
                }
                finally { if (e_115) throw e_115.error; }
            }
        }
        return data;
    };
    OverviewDefectRatioDto.prototype.clone = function () {
        var json = this.toJSON();
        var result = new OverviewDefectRatioDto();
        result.init(json);
        return result;
    };
    return OverviewDefectRatioDto;
}());

var OverviewDefectTrendDataDto = /** @class */ (function () {
    function OverviewDefectTrendDataDto(data) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    this[property] = data[property];
            }
        }
    }
    OverviewDefectTrendDataDto.prototype.init = function (_data) {
        var e_116, _a;
        if (_data) {
            this.name = _data["name"];
            this.id = _data["id"];
            if (Array.isArray(_data["data"])) {
                this.data = [];
                try {
                    for (var _b = __values(_data["data"]), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var item = _c.value;
                        this.data.push(item);
                    }
                }
                catch (e_116_1) { e_116 = { error: e_116_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_116) throw e_116.error; }
                }
            }
        }
    };
    OverviewDefectTrendDataDto.fromJS = function (data) {
        data = typeof data === 'object' ? data : {};
        var result = new OverviewDefectTrendDataDto();
        result.init(data);
        return result;
    };
    OverviewDefectTrendDataDto.prototype.toJSON = function (data) {
        var e_117, _a;
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        data["id"] = this.id;
        if (Array.isArray(this.data)) {
            data["data"] = [];
            try {
                for (var _b = __values(this.data), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var item = _c.value;
                    data["data"].push(item);
                }
            }
            catch (e_117_1) { e_117 = { error: e_117_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_117) throw e_117.error; }
            }
        }
        return data;
    };
    OverviewDefectTrendDataDto.prototype.clone = function () {
        var json = this.toJSON();
        var result = new OverviewDefectTrendDataDto();
        result.init(json);
        return result;
    };
    return OverviewDefectTrendDataDto;
}());

var OverviewDefectTrendDto = /** @class */ (function () {
    function OverviewDefectTrendDto(data) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    this[property] = data[property];
            }
        }
    }
    OverviewDefectTrendDto.prototype.init = function (_data) {
        var e_118, _a, e_119, _b, e_120, _c;
        if (_data) {
            if (Array.isArray(_data["labels"])) {
                this.labels = [];
                try {
                    for (var _d = __values(_data["labels"]), _e = _d.next(); !_e.done; _e = _d.next()) {
                        var item = _e.value;
                        this.labels.push(moment__WEBPACK_IMPORTED_MODULE_0__(item));
                    }
                }
                catch (e_118_1) { e_118 = { error: e_118_1 }; }
                finally {
                    try {
                        if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
                    }
                    finally { if (e_118) throw e_118.error; }
                }
            }
            if (Array.isArray(_data["all"])) {
                this.all = [];
                try {
                    for (var _f = __values(_data["all"]), _g = _f.next(); !_g.done; _g = _f.next()) {
                        var item = _g.value;
                        this.all.push(item);
                    }
                }
                catch (e_119_1) { e_119 = { error: e_119_1 }; }
                finally {
                    try {
                        if (_g && !_g.done && (_b = _f.return)) _b.call(_f);
                    }
                    finally { if (e_119) throw e_119.error; }
                }
            }
            if (Array.isArray(_data["data"])) {
                this.data = [];
                try {
                    for (var _h = __values(_data["data"]), _j = _h.next(); !_j.done; _j = _h.next()) {
                        var item = _j.value;
                        this.data.push(OverviewDefectTrendDataDto.fromJS(item));
                    }
                }
                catch (e_120_1) { e_120 = { error: e_120_1 }; }
                finally {
                    try {
                        if (_j && !_j.done && (_c = _h.return)) _c.call(_h);
                    }
                    finally { if (e_120) throw e_120.error; }
                }
            }
        }
    };
    OverviewDefectTrendDto.fromJS = function (data) {
        data = typeof data === 'object' ? data : {};
        var result = new OverviewDefectTrendDto();
        result.init(data);
        return result;
    };
    OverviewDefectTrendDto.prototype.toJSON = function (data) {
        var e_121, _a, e_122, _b, e_123, _c;
        data = typeof data === 'object' ? data : {};
        if (Array.isArray(this.labels)) {
            data["labels"] = [];
            try {
                for (var _d = __values(this.labels), _e = _d.next(); !_e.done; _e = _d.next()) {
                    var item = _e.value;
                    data["labels"].push(item.toISOString());
                }
            }
            catch (e_121_1) { e_121 = { error: e_121_1 }; }
            finally {
                try {
                    if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
                }
                finally { if (e_121) throw e_121.error; }
            }
        }
        if (Array.isArray(this.all)) {
            data["all"] = [];
            try {
                for (var _f = __values(this.all), _g = _f.next(); !_g.done; _g = _f.next()) {
                    var item = _g.value;
                    data["all"].push(item);
                }
            }
            catch (e_122_1) { e_122 = { error: e_122_1 }; }
            finally {
                try {
                    if (_g && !_g.done && (_b = _f.return)) _b.call(_f);
                }
                finally { if (e_122) throw e_122.error; }
            }
        }
        if (Array.isArray(this.data)) {
            data["data"] = [];
            try {
                for (var _h = __values(this.data), _j = _h.next(); !_j.done; _j = _h.next()) {
                    var item = _j.value;
                    data["data"].push(item.toJSON());
                }
            }
            catch (e_123_1) { e_123 = { error: e_123_1 }; }
            finally {
                try {
                    if (_j && !_j.done && (_c = _h.return)) _c.call(_h);
                }
                finally { if (e_123) throw e_123.error; }
            }
        }
        return data;
    };
    OverviewDefectTrendDto.prototype.clone = function () {
        var json = this.toJSON();
        var result = new OverviewDefectTrendDto();
        result.init(json);
        return result;
    };
    return OverviewDefectTrendDto;
}());

var OverviewGeneralInsightsDto = /** @class */ (function () {
    function OverviewGeneralInsightsDto(data) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    this[property] = data[property];
            }
        }
    }
    OverviewGeneralInsightsDto.prototype.init = function (_data) {
        var e_124, _a, e_125, _b, e_126, _c, e_127, _d;
        if (_data) {
            this.totalDetections = _data["totalDetections"];
            this.totalDefects = _data["totalDefects"];
            this.totalGood = _data["totalGood"];
            if (Array.isArray(_data["labels"])) {
                this.labels = [];
                try {
                    for (var _e = __values(_data["labels"]), _f = _e.next(); !_f.done; _f = _e.next()) {
                        var item = _f.value;
                        this.labels.push(moment__WEBPACK_IMPORTED_MODULE_0__(item));
                    }
                }
                catch (e_124_1) { e_124 = { error: e_124_1 }; }
                finally {
                    try {
                        if (_f && !_f.done && (_a = _e.return)) _a.call(_e);
                    }
                    finally { if (e_124) throw e_124.error; }
                }
            }
            if (Array.isArray(_data["detections"])) {
                this.detections = [];
                try {
                    for (var _g = __values(_data["detections"]), _h = _g.next(); !_h.done; _h = _g.next()) {
                        var item = _h.value;
                        this.detections.push(item);
                    }
                }
                catch (e_125_1) { e_125 = { error: e_125_1 }; }
                finally {
                    try {
                        if (_h && !_h.done && (_b = _g.return)) _b.call(_g);
                    }
                    finally { if (e_125) throw e_125.error; }
                }
            }
            if (Array.isArray(_data["defects"])) {
                this.defects = [];
                try {
                    for (var _j = __values(_data["defects"]), _k = _j.next(); !_k.done; _k = _j.next()) {
                        var item = _k.value;
                        this.defects.push(item);
                    }
                }
                catch (e_126_1) { e_126 = { error: e_126_1 }; }
                finally {
                    try {
                        if (_k && !_k.done && (_c = _j.return)) _c.call(_j);
                    }
                    finally { if (e_126) throw e_126.error; }
                }
            }
            if (Array.isArray(_data["good"])) {
                this.good = [];
                try {
                    for (var _l = __values(_data["good"]), _m = _l.next(); !_m.done; _m = _l.next()) {
                        var item = _m.value;
                        this.good.push(item);
                    }
                }
                catch (e_127_1) { e_127 = { error: e_127_1 }; }
                finally {
                    try {
                        if (_m && !_m.done && (_d = _l.return)) _d.call(_l);
                    }
                    finally { if (e_127) throw e_127.error; }
                }
            }
        }
    };
    OverviewGeneralInsightsDto.fromJS = function (data) {
        data = typeof data === 'object' ? data : {};
        var result = new OverviewGeneralInsightsDto();
        result.init(data);
        return result;
    };
    OverviewGeneralInsightsDto.prototype.toJSON = function (data) {
        var e_128, _a, e_129, _b, e_130, _c, e_131, _d;
        data = typeof data === 'object' ? data : {};
        data["totalDetections"] = this.totalDetections;
        data["totalDefects"] = this.totalDefects;
        data["totalGood"] = this.totalGood;
        if (Array.isArray(this.labels)) {
            data["labels"] = [];
            try {
                for (var _e = __values(this.labels), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var item = _f.value;
                    data["labels"].push(item.toISOString());
                }
            }
            catch (e_128_1) { e_128 = { error: e_128_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_a = _e.return)) _a.call(_e);
                }
                finally { if (e_128) throw e_128.error; }
            }
        }
        if (Array.isArray(this.detections)) {
            data["detections"] = [];
            try {
                for (var _g = __values(this.detections), _h = _g.next(); !_h.done; _h = _g.next()) {
                    var item = _h.value;
                    data["detections"].push(item);
                }
            }
            catch (e_129_1) { e_129 = { error: e_129_1 }; }
            finally {
                try {
                    if (_h && !_h.done && (_b = _g.return)) _b.call(_g);
                }
                finally { if (e_129) throw e_129.error; }
            }
        }
        if (Array.isArray(this.defects)) {
            data["defects"] = [];
            try {
                for (var _j = __values(this.defects), _k = _j.next(); !_k.done; _k = _j.next()) {
                    var item = _k.value;
                    data["defects"].push(item);
                }
            }
            catch (e_130_1) { e_130 = { error: e_130_1 }; }
            finally {
                try {
                    if (_k && !_k.done && (_c = _j.return)) _c.call(_j);
                }
                finally { if (e_130) throw e_130.error; }
            }
        }
        if (Array.isArray(this.good)) {
            data["good"] = [];
            try {
                for (var _l = __values(this.good), _m = _l.next(); !_m.done; _m = _l.next()) {
                    var item = _m.value;
                    data["good"].push(item);
                }
            }
            catch (e_131_1) { e_131 = { error: e_131_1 }; }
            finally {
                try {
                    if (_m && !_m.done && (_d = _l.return)) _d.call(_l);
                }
                finally { if (e_131) throw e_131.error; }
            }
        }
        return data;
    };
    OverviewGeneralInsightsDto.prototype.clone = function () {
        var json = this.toJSON();
        var result = new OverviewGeneralInsightsDto();
        result.init(json);
        return result;
    };
    return OverviewGeneralInsightsDto;
}());

var OverviewRevenueLossDataDto = /** @class */ (function () {
    function OverviewRevenueLossDataDto(data) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    this[property] = data[property];
            }
        }
    }
    OverviewRevenueLossDataDto.prototype.init = function (_data) {
        var e_132, _a;
        if (_data) {
            this.name = _data["name"];
            this.id = _data["id"];
            if (Array.isArray(_data["data"])) {
                this.data = [];
                try {
                    for (var _b = __values(_data["data"]), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var item = _c.value;
                        this.data.push(item);
                    }
                }
                catch (e_132_1) { e_132 = { error: e_132_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_132) throw e_132.error; }
                }
            }
        }
    };
    OverviewRevenueLossDataDto.fromJS = function (data) {
        data = typeof data === 'object' ? data : {};
        var result = new OverviewRevenueLossDataDto();
        result.init(data);
        return result;
    };
    OverviewRevenueLossDataDto.prototype.toJSON = function (data) {
        var e_133, _a;
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        data["id"] = this.id;
        if (Array.isArray(this.data)) {
            data["data"] = [];
            try {
                for (var _b = __values(this.data), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var item = _c.value;
                    data["data"].push(item);
                }
            }
            catch (e_133_1) { e_133 = { error: e_133_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_133) throw e_133.error; }
            }
        }
        return data;
    };
    OverviewRevenueLossDataDto.prototype.clone = function () {
        var json = this.toJSON();
        var result = new OverviewRevenueLossDataDto();
        result.init(json);
        return result;
    };
    return OverviewRevenueLossDataDto;
}());

var OverviewRevenueLossDto = /** @class */ (function () {
    function OverviewRevenueLossDto(data) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    this[property] = data[property];
            }
        }
    }
    OverviewRevenueLossDto.prototype.init = function (_data) {
        var e_134, _a, e_135, _b, e_136, _c;
        if (_data) {
            if (Array.isArray(_data["labels"])) {
                this.labels = [];
                try {
                    for (var _d = __values(_data["labels"]), _e = _d.next(); !_e.done; _e = _d.next()) {
                        var item = _e.value;
                        this.labels.push(moment__WEBPACK_IMPORTED_MODULE_0__(item));
                    }
                }
                catch (e_134_1) { e_134 = { error: e_134_1 }; }
                finally {
                    try {
                        if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
                    }
                    finally { if (e_134) throw e_134.error; }
                }
            }
            if (Array.isArray(_data["all"])) {
                this.all = [];
                try {
                    for (var _f = __values(_data["all"]), _g = _f.next(); !_g.done; _g = _f.next()) {
                        var item = _g.value;
                        this.all.push(item);
                    }
                }
                catch (e_135_1) { e_135 = { error: e_135_1 }; }
                finally {
                    try {
                        if (_g && !_g.done && (_b = _f.return)) _b.call(_f);
                    }
                    finally { if (e_135) throw e_135.error; }
                }
            }
            if (Array.isArray(_data["data"])) {
                this.data = [];
                try {
                    for (var _h = __values(_data["data"]), _j = _h.next(); !_j.done; _j = _h.next()) {
                        var item = _j.value;
                        this.data.push(OverviewRevenueLossDataDto.fromJS(item));
                    }
                }
                catch (e_136_1) { e_136 = { error: e_136_1 }; }
                finally {
                    try {
                        if (_j && !_j.done && (_c = _h.return)) _c.call(_h);
                    }
                    finally { if (e_136) throw e_136.error; }
                }
            }
        }
    };
    OverviewRevenueLossDto.fromJS = function (data) {
        data = typeof data === 'object' ? data : {};
        var result = new OverviewRevenueLossDto();
        result.init(data);
        return result;
    };
    OverviewRevenueLossDto.prototype.toJSON = function (data) {
        var e_137, _a, e_138, _b, e_139, _c;
        data = typeof data === 'object' ? data : {};
        if (Array.isArray(this.labels)) {
            data["labels"] = [];
            try {
                for (var _d = __values(this.labels), _e = _d.next(); !_e.done; _e = _d.next()) {
                    var item = _e.value;
                    data["labels"].push(item.toISOString());
                }
            }
            catch (e_137_1) { e_137 = { error: e_137_1 }; }
            finally {
                try {
                    if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
                }
                finally { if (e_137) throw e_137.error; }
            }
        }
        if (Array.isArray(this.all)) {
            data["all"] = [];
            try {
                for (var _f = __values(this.all), _g = _f.next(); !_g.done; _g = _f.next()) {
                    var item = _g.value;
                    data["all"].push(item);
                }
            }
            catch (e_138_1) { e_138 = { error: e_138_1 }; }
            finally {
                try {
                    if (_g && !_g.done && (_b = _f.return)) _b.call(_f);
                }
                finally { if (e_138) throw e_138.error; }
            }
        }
        if (Array.isArray(this.data)) {
            data["data"] = [];
            try {
                for (var _h = __values(this.data), _j = _h.next(); !_j.done; _j = _h.next()) {
                    var item = _j.value;
                    data["data"].push(item.toJSON());
                }
            }
            catch (e_139_1) { e_139 = { error: e_139_1 }; }
            finally {
                try {
                    if (_j && !_j.done && (_c = _h.return)) _c.call(_h);
                }
                finally { if (e_139) throw e_139.error; }
            }
        }
        return data;
    };
    OverviewRevenueLossDto.prototype.clone = function () {
        var json = this.toJSON();
        var result = new OverviewRevenueLossDto();
        result.init(json);
        return result;
    };
    return OverviewRevenueLossDto;
}());

var PermissionDto = /** @class */ (function () {
    function PermissionDto(data) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    this[property] = data[property];
            }
        }
    }
    PermissionDto.prototype.init = function (_data) {
        if (_data) {
            this.id = _data["id"];
            this.name = _data["name"];
            this.displayName = _data["displayName"];
            this.description = _data["description"];
        }
    };
    PermissionDto.fromJS = function (data) {
        data = typeof data === 'object' ? data : {};
        var result = new PermissionDto();
        result.init(data);
        return result;
    };
    PermissionDto.prototype.toJSON = function (data) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["displayName"] = this.displayName;
        data["description"] = this.description;
        return data;
    };
    PermissionDto.prototype.clone = function () {
        var json = this.toJSON();
        var result = new PermissionDto();
        result.init(json);
        return result;
    };
    return PermissionDto;
}());

var PermissionDtoListResultDto = /** @class */ (function () {
    function PermissionDtoListResultDto(data) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    this[property] = data[property];
            }
        }
    }
    PermissionDtoListResultDto.prototype.init = function (_data) {
        var e_140, _a;
        if (_data) {
            if (Array.isArray(_data["items"])) {
                this.items = [];
                try {
                    for (var _b = __values(_data["items"]), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var item = _c.value;
                        this.items.push(PermissionDto.fromJS(item));
                    }
                }
                catch (e_140_1) { e_140 = { error: e_140_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_140) throw e_140.error; }
                }
            }
        }
    };
    PermissionDtoListResultDto.fromJS = function (data) {
        data = typeof data === 'object' ? data : {};
        var result = new PermissionDtoListResultDto();
        result.init(data);
        return result;
    };
    PermissionDtoListResultDto.prototype.toJSON = function (data) {
        var e_141, _a;
        data = typeof data === 'object' ? data : {};
        if (Array.isArray(this.items)) {
            data["items"] = [];
            try {
                for (var _b = __values(this.items), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var item = _c.value;
                    data["items"].push(item.toJSON());
                }
            }
            catch (e_141_1) { e_141 = { error: e_141_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_141) throw e_141.error; }
            }
        }
        return data;
    };
    PermissionDtoListResultDto.prototype.clone = function () {
        var json = this.toJSON();
        var result = new PermissionDtoListResultDto();
        result.init(json);
        return result;
    };
    return PermissionDtoListResultDto;
}());

var ProductDto = /** @class */ (function () {
    function ProductDto(data) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    this[property] = data[property];
            }
        }
    }
    ProductDto.prototype.init = function (_data) {
        if (_data) {
            this.id = _data["id"];
            this.name = _data["name"];
        }
    };
    ProductDto.fromJS = function (data) {
        data = typeof data === 'object' ? data : {};
        var result = new ProductDto();
        result.init(data);
        return result;
    };
    ProductDto.prototype.toJSON = function (data) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        return data;
    };
    ProductDto.prototype.clone = function () {
        var json = this.toJSON();
        var result = new ProductDto();
        result.init(json);
        return result;
    };
    return ProductDto;
}());

var ProductDtoListResultDto = /** @class */ (function () {
    function ProductDtoListResultDto(data) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    this[property] = data[property];
            }
        }
    }
    ProductDtoListResultDto.prototype.init = function (_data) {
        var e_142, _a;
        if (_data) {
            if (Array.isArray(_data["items"])) {
                this.items = [];
                try {
                    for (var _b = __values(_data["items"]), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var item = _c.value;
                        this.items.push(ProductDto.fromJS(item));
                    }
                }
                catch (e_142_1) { e_142 = { error: e_142_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_142) throw e_142.error; }
                }
            }
        }
    };
    ProductDtoListResultDto.fromJS = function (data) {
        data = typeof data === 'object' ? data : {};
        var result = new ProductDtoListResultDto();
        result.init(data);
        return result;
    };
    ProductDtoListResultDto.prototype.toJSON = function (data) {
        var e_143, _a;
        data = typeof data === 'object' ? data : {};
        if (Array.isArray(this.items)) {
            data["items"] = [];
            try {
                for (var _b = __values(this.items), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var item = _c.value;
                    data["items"].push(item.toJSON());
                }
            }
            catch (e_143_1) { e_143 = { error: e_143_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_143) throw e_143.error; }
            }
        }
        return data;
    };
    ProductDtoListResultDto.prototype.clone = function () {
        var json = this.toJSON();
        var result = new ProductDtoListResultDto();
        result.init(json);
        return result;
    };
    return ProductDtoListResultDto;
}());

var RegisterInput = /** @class */ (function () {
    function RegisterInput(data) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    this[property] = data[property];
            }
        }
    }
    RegisterInput.prototype.init = function (_data) {
        if (_data) {
            this.name = _data["name"];
            this.surname = _data["surname"];
            this.userName = _data["userName"];
            this.emailAddress = _data["emailAddress"];
            this.password = _data["password"];
            this.captchaResponse = _data["captchaResponse"];
        }
    };
    RegisterInput.fromJS = function (data) {
        data = typeof data === 'object' ? data : {};
        var result = new RegisterInput();
        result.init(data);
        return result;
    };
    RegisterInput.prototype.toJSON = function (data) {
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        data["surname"] = this.surname;
        data["userName"] = this.userName;
        data["emailAddress"] = this.emailAddress;
        data["password"] = this.password;
        data["captchaResponse"] = this.captchaResponse;
        return data;
    };
    RegisterInput.prototype.clone = function () {
        var json = this.toJSON();
        var result = new RegisterInput();
        result.init(json);
        return result;
    };
    return RegisterInput;
}());

var RegisterOutput = /** @class */ (function () {
    function RegisterOutput(data) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    this[property] = data[property];
            }
        }
    }
    RegisterOutput.prototype.init = function (_data) {
        if (_data) {
            this.canLogin = _data["canLogin"];
        }
    };
    RegisterOutput.fromJS = function (data) {
        data = typeof data === 'object' ? data : {};
        var result = new RegisterOutput();
        result.init(data);
        return result;
    };
    RegisterOutput.prototype.toJSON = function (data) {
        data = typeof data === 'object' ? data : {};
        data["canLogin"] = this.canLogin;
        return data;
    };
    RegisterOutput.prototype.clone = function () {
        var json = this.toJSON();
        var result = new RegisterOutput();
        result.init(json);
        return result;
    };
    return RegisterOutput;
}());

var ResetPasswordDto = /** @class */ (function () {
    function ResetPasswordDto(data) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    this[property] = data[property];
            }
        }
    }
    ResetPasswordDto.prototype.init = function (_data) {
        if (_data) {
            this.adminPassword = _data["adminPassword"];
            this.userId = _data["userId"];
            this.newPassword = _data["newPassword"];
        }
    };
    ResetPasswordDto.fromJS = function (data) {
        data = typeof data === 'object' ? data : {};
        var result = new ResetPasswordDto();
        result.init(data);
        return result;
    };
    ResetPasswordDto.prototype.toJSON = function (data) {
        data = typeof data === 'object' ? data : {};
        data["adminPassword"] = this.adminPassword;
        data["userId"] = this.userId;
        data["newPassword"] = this.newPassword;
        return data;
    };
    ResetPasswordDto.prototype.clone = function () {
        var json = this.toJSON();
        var result = new ResetPasswordDto();
        result.init(json);
        return result;
    };
    return ResetPasswordDto;
}());

var RoleDto = /** @class */ (function () {
    function RoleDto(data) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    this[property] = data[property];
            }
        }
    }
    RoleDto.prototype.init = function (_data) {
        var e_144, _a;
        if (_data) {
            this.id = _data["id"];
            this.name = _data["name"];
            this.displayName = _data["displayName"];
            this.normalizedName = _data["normalizedName"];
            this.description = _data["description"];
            if (Array.isArray(_data["grantedPermissions"])) {
                this.grantedPermissions = [];
                try {
                    for (var _b = __values(_data["grantedPermissions"]), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var item = _c.value;
                        this.grantedPermissions.push(item);
                    }
                }
                catch (e_144_1) { e_144 = { error: e_144_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_144) throw e_144.error; }
                }
            }
        }
    };
    RoleDto.fromJS = function (data) {
        data = typeof data === 'object' ? data : {};
        var result = new RoleDto();
        result.init(data);
        return result;
    };
    RoleDto.prototype.toJSON = function (data) {
        var e_145, _a;
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["displayName"] = this.displayName;
        data["normalizedName"] = this.normalizedName;
        data["description"] = this.description;
        if (Array.isArray(this.grantedPermissions)) {
            data["grantedPermissions"] = [];
            try {
                for (var _b = __values(this.grantedPermissions), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var item = _c.value;
                    data["grantedPermissions"].push(item);
                }
            }
            catch (e_145_1) { e_145 = { error: e_145_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_145) throw e_145.error; }
            }
        }
        return data;
    };
    RoleDto.prototype.clone = function () {
        var json = this.toJSON();
        var result = new RoleDto();
        result.init(json);
        return result;
    };
    return RoleDto;
}());

var RoleDtoListResultDto = /** @class */ (function () {
    function RoleDtoListResultDto(data) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    this[property] = data[property];
            }
        }
    }
    RoleDtoListResultDto.prototype.init = function (_data) {
        var e_146, _a;
        if (_data) {
            if (Array.isArray(_data["items"])) {
                this.items = [];
                try {
                    for (var _b = __values(_data["items"]), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var item = _c.value;
                        this.items.push(RoleDto.fromJS(item));
                    }
                }
                catch (e_146_1) { e_146 = { error: e_146_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_146) throw e_146.error; }
                }
            }
        }
    };
    RoleDtoListResultDto.fromJS = function (data) {
        data = typeof data === 'object' ? data : {};
        var result = new RoleDtoListResultDto();
        result.init(data);
        return result;
    };
    RoleDtoListResultDto.prototype.toJSON = function (data) {
        var e_147, _a;
        data = typeof data === 'object' ? data : {};
        if (Array.isArray(this.items)) {
            data["items"] = [];
            try {
                for (var _b = __values(this.items), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var item = _c.value;
                    data["items"].push(item.toJSON());
                }
            }
            catch (e_147_1) { e_147 = { error: e_147_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_147) throw e_147.error; }
            }
        }
        return data;
    };
    RoleDtoListResultDto.prototype.clone = function () {
        var json = this.toJSON();
        var result = new RoleDtoListResultDto();
        result.init(json);
        return result;
    };
    return RoleDtoListResultDto;
}());

var RoleDtoPagedResultDto = /** @class */ (function () {
    function RoleDtoPagedResultDto(data) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    this[property] = data[property];
            }
        }
    }
    RoleDtoPagedResultDto.prototype.init = function (_data) {
        var e_148, _a;
        if (_data) {
            if (Array.isArray(_data["items"])) {
                this.items = [];
                try {
                    for (var _b = __values(_data["items"]), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var item = _c.value;
                        this.items.push(RoleDto.fromJS(item));
                    }
                }
                catch (e_148_1) { e_148 = { error: e_148_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_148) throw e_148.error; }
                }
            }
            this.totalCount = _data["totalCount"];
        }
    };
    RoleDtoPagedResultDto.fromJS = function (data) {
        data = typeof data === 'object' ? data : {};
        var result = new RoleDtoPagedResultDto();
        result.init(data);
        return result;
    };
    RoleDtoPagedResultDto.prototype.toJSON = function (data) {
        var e_149, _a;
        data = typeof data === 'object' ? data : {};
        if (Array.isArray(this.items)) {
            data["items"] = [];
            try {
                for (var _b = __values(this.items), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var item = _c.value;
                    data["items"].push(item.toJSON());
                }
            }
            catch (e_149_1) { e_149 = { error: e_149_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_149) throw e_149.error; }
            }
        }
        data["totalCount"] = this.totalCount;
        return data;
    };
    RoleDtoPagedResultDto.prototype.clone = function () {
        var json = this.toJSON();
        var result = new RoleDtoPagedResultDto();
        result.init(json);
        return result;
    };
    return RoleDtoPagedResultDto;
}());

var RoleEditDto = /** @class */ (function () {
    function RoleEditDto(data) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    this[property] = data[property];
            }
        }
    }
    RoleEditDto.prototype.init = function (_data) {
        if (_data) {
            this.id = _data["id"];
            this.name = _data["name"];
            this.displayName = _data["displayName"];
            this.description = _data["description"];
            this.isStatic = _data["isStatic"];
        }
    };
    RoleEditDto.fromJS = function (data) {
        data = typeof data === 'object' ? data : {};
        var result = new RoleEditDto();
        result.init(data);
        return result;
    };
    RoleEditDto.prototype.toJSON = function (data) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["displayName"] = this.displayName;
        data["description"] = this.description;
        data["isStatic"] = this.isStatic;
        return data;
    };
    RoleEditDto.prototype.clone = function () {
        var json = this.toJSON();
        var result = new RoleEditDto();
        result.init(json);
        return result;
    };
    return RoleEditDto;
}());

var RoleListDto = /** @class */ (function () {
    function RoleListDto(data) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    this[property] = data[property];
            }
        }
    }
    RoleListDto.prototype.init = function (_data) {
        if (_data) {
            this.id = _data["id"];
            this.name = _data["name"];
            this.displayName = _data["displayName"];
            this.isStatic = _data["isStatic"];
            this.isDefault = _data["isDefault"];
            this.creationTime = _data["creationTime"] ? moment__WEBPACK_IMPORTED_MODULE_0__(_data["creationTime"].toString()) : undefined;
        }
    };
    RoleListDto.fromJS = function (data) {
        data = typeof data === 'object' ? data : {};
        var result = new RoleListDto();
        result.init(data);
        return result;
    };
    RoleListDto.prototype.toJSON = function (data) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["displayName"] = this.displayName;
        data["isStatic"] = this.isStatic;
        data["isDefault"] = this.isDefault;
        data["creationTime"] = this.creationTime ? this.creationTime.toISOString() : undefined;
        return data;
    };
    RoleListDto.prototype.clone = function () {
        var json = this.toJSON();
        var result = new RoleListDto();
        result.init(json);
        return result;
    };
    return RoleListDto;
}());

var RoleListDtoListResultDto = /** @class */ (function () {
    function RoleListDtoListResultDto(data) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    this[property] = data[property];
            }
        }
    }
    RoleListDtoListResultDto.prototype.init = function (_data) {
        var e_150, _a;
        if (_data) {
            if (Array.isArray(_data["items"])) {
                this.items = [];
                try {
                    for (var _b = __values(_data["items"]), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var item = _c.value;
                        this.items.push(RoleListDto.fromJS(item));
                    }
                }
                catch (e_150_1) { e_150 = { error: e_150_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_150) throw e_150.error; }
                }
            }
        }
    };
    RoleListDtoListResultDto.fromJS = function (data) {
        data = typeof data === 'object' ? data : {};
        var result = new RoleListDtoListResultDto();
        result.init(data);
        return result;
    };
    RoleListDtoListResultDto.prototype.toJSON = function (data) {
        var e_151, _a;
        data = typeof data === 'object' ? data : {};
        if (Array.isArray(this.items)) {
            data["items"] = [];
            try {
                for (var _b = __values(this.items), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var item = _c.value;
                    data["items"].push(item.toJSON());
                }
            }
            catch (e_151_1) { e_151 = { error: e_151_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_151) throw e_151.error; }
            }
        }
        return data;
    };
    RoleListDtoListResultDto.prototype.clone = function () {
        var json = this.toJSON();
        var result = new RoleListDtoListResultDto();
        result.init(json);
        return result;
    };
    return RoleListDtoListResultDto;
}());

var StageDto = /** @class */ (function () {
    function StageDto(data) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    this[property] = data[property];
            }
        }
    }
    StageDto.prototype.init = function (_data) {
        if (_data) {
            this.id = _data["id"];
            this.name = _data["name"];
        }
    };
    StageDto.fromJS = function (data) {
        data = typeof data === 'object' ? data : {};
        var result = new StageDto();
        result.init(data);
        return result;
    };
    StageDto.prototype.toJSON = function (data) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        return data;
    };
    StageDto.prototype.clone = function () {
        var json = this.toJSON();
        var result = new StageDto();
        result.init(json);
        return result;
    };
    return StageDto;
}());

var StageDtoListResultDto = /** @class */ (function () {
    function StageDtoListResultDto(data) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    this[property] = data[property];
            }
        }
    }
    StageDtoListResultDto.prototype.init = function (_data) {
        var e_152, _a;
        if (_data) {
            if (Array.isArray(_data["items"])) {
                this.items = [];
                try {
                    for (var _b = __values(_data["items"]), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var item = _c.value;
                        this.items.push(StageDto.fromJS(item));
                    }
                }
                catch (e_152_1) { e_152 = { error: e_152_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_152) throw e_152.error; }
                }
            }
        }
    };
    StageDtoListResultDto.fromJS = function (data) {
        data = typeof data === 'object' ? data : {};
        var result = new StageDtoListResultDto();
        result.init(data);
        return result;
    };
    StageDtoListResultDto.prototype.toJSON = function (data) {
        var e_153, _a;
        data = typeof data === 'object' ? data : {};
        if (Array.isArray(this.items)) {
            data["items"] = [];
            try {
                for (var _b = __values(this.items), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var item = _c.value;
                    data["items"].push(item.toJSON());
                }
            }
            catch (e_153_1) { e_153 = { error: e_153_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_153) throw e_153.error; }
            }
        }
        return data;
    };
    StageDtoListResultDto.prototype.clone = function () {
        var json = this.toJSON();
        var result = new StageDtoListResultDto();
        result.init(json);
        return result;
    };
    return StageDtoListResultDto;
}());

var TenantAvailabilityState;
(function (TenantAvailabilityState) {
    TenantAvailabilityState[TenantAvailabilityState["_1"] = 1] = "_1";
    TenantAvailabilityState[TenantAvailabilityState["_2"] = 2] = "_2";
    TenantAvailabilityState[TenantAvailabilityState["_3"] = 3] = "_3";
})(TenantAvailabilityState || (TenantAvailabilityState = {}));
var TenantDto = /** @class */ (function () {
    function TenantDto(data) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    this[property] = data[property];
            }
        }
    }
    TenantDto.prototype.init = function (_data) {
        if (_data) {
            this.id = _data["id"];
            this.tenancyName = _data["tenancyName"];
            this.name = _data["name"];
            this.isActive = _data["isActive"];
        }
    };
    TenantDto.fromJS = function (data) {
        data = typeof data === 'object' ? data : {};
        var result = new TenantDto();
        result.init(data);
        return result;
    };
    TenantDto.prototype.toJSON = function (data) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["tenancyName"] = this.tenancyName;
        data["name"] = this.name;
        data["isActive"] = this.isActive;
        return data;
    };
    TenantDto.prototype.clone = function () {
        var json = this.toJSON();
        var result = new TenantDto();
        result.init(json);
        return result;
    };
    return TenantDto;
}());

var TenantDtoPagedResultDto = /** @class */ (function () {
    function TenantDtoPagedResultDto(data) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    this[property] = data[property];
            }
        }
    }
    TenantDtoPagedResultDto.prototype.init = function (_data) {
        var e_154, _a;
        if (_data) {
            if (Array.isArray(_data["items"])) {
                this.items = [];
                try {
                    for (var _b = __values(_data["items"]), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var item = _c.value;
                        this.items.push(TenantDto.fromJS(item));
                    }
                }
                catch (e_154_1) { e_154 = { error: e_154_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_154) throw e_154.error; }
                }
            }
            this.totalCount = _data["totalCount"];
        }
    };
    TenantDtoPagedResultDto.fromJS = function (data) {
        data = typeof data === 'object' ? data : {};
        var result = new TenantDtoPagedResultDto();
        result.init(data);
        return result;
    };
    TenantDtoPagedResultDto.prototype.toJSON = function (data) {
        var e_155, _a;
        data = typeof data === 'object' ? data : {};
        if (Array.isArray(this.items)) {
            data["items"] = [];
            try {
                for (var _b = __values(this.items), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var item = _c.value;
                    data["items"].push(item.toJSON());
                }
            }
            catch (e_155_1) { e_155 = { error: e_155_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_155) throw e_155.error; }
            }
        }
        data["totalCount"] = this.totalCount;
        return data;
    };
    TenantDtoPagedResultDto.prototype.clone = function () {
        var json = this.toJSON();
        var result = new TenantDtoPagedResultDto();
        result.init(json);
        return result;
    };
    return TenantDtoPagedResultDto;
}());

var TenantLoginInfoDto = /** @class */ (function () {
    function TenantLoginInfoDto(data) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    this[property] = data[property];
            }
        }
    }
    TenantLoginInfoDto.prototype.init = function (_data) {
        if (_data) {
            this.id = _data["id"];
            this.tenancyName = _data["tenancyName"];
            this.name = _data["name"];
        }
    };
    TenantLoginInfoDto.fromJS = function (data) {
        data = typeof data === 'object' ? data : {};
        var result = new TenantLoginInfoDto();
        result.init(data);
        return result;
    };
    TenantLoginInfoDto.prototype.toJSON = function (data) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["tenancyName"] = this.tenancyName;
        data["name"] = this.name;
        return data;
    };
    TenantLoginInfoDto.prototype.clone = function () {
        var json = this.toJSON();
        var result = new TenantLoginInfoDto();
        result.init(json);
        return result;
    };
    return TenantLoginInfoDto;
}());

var UserDto = /** @class */ (function () {
    function UserDto(data) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    this[property] = data[property];
            }
        }
    }
    UserDto.prototype.init = function (_data) {
        var e_156, _a;
        if (_data) {
            this.id = _data["id"];
            this.userName = _data["userName"];
            this.name = _data["name"];
            this.surname = _data["surname"];
            this.emailAddress = _data["emailAddress"];
            this.isActive = _data["isActive"];
            this.fullName = _data["fullName"];
            this.lastLoginTime = _data["lastLoginTime"] ? moment__WEBPACK_IMPORTED_MODULE_0__(_data["lastLoginTime"].toString()) : undefined;
            this.creationTime = _data["creationTime"] ? moment__WEBPACK_IMPORTED_MODULE_0__(_data["creationTime"].toString()) : undefined;
            if (Array.isArray(_data["roleNames"])) {
                this.roleNames = [];
                try {
                    for (var _b = __values(_data["roleNames"]), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var item = _c.value;
                        this.roleNames.push(item);
                    }
                }
                catch (e_156_1) { e_156 = { error: e_156_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_156) throw e_156.error; }
                }
            }
        }
    };
    UserDto.fromJS = function (data) {
        data = typeof data === 'object' ? data : {};
        var result = new UserDto();
        result.init(data);
        return result;
    };
    UserDto.prototype.toJSON = function (data) {
        var e_157, _a;
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["userName"] = this.userName;
        data["name"] = this.name;
        data["surname"] = this.surname;
        data["emailAddress"] = this.emailAddress;
        data["isActive"] = this.isActive;
        data["fullName"] = this.fullName;
        data["lastLoginTime"] = this.lastLoginTime ? this.lastLoginTime.toISOString() : undefined;
        data["creationTime"] = this.creationTime ? this.creationTime.toISOString() : undefined;
        if (Array.isArray(this.roleNames)) {
            data["roleNames"] = [];
            try {
                for (var _b = __values(this.roleNames), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var item = _c.value;
                    data["roleNames"].push(item);
                }
            }
            catch (e_157_1) { e_157 = { error: e_157_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_157) throw e_157.error; }
            }
        }
        return data;
    };
    UserDto.prototype.clone = function () {
        var json = this.toJSON();
        var result = new UserDto();
        result.init(json);
        return result;
    };
    return UserDto;
}());

var UserDtoPagedResultDto = /** @class */ (function () {
    function UserDtoPagedResultDto(data) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    this[property] = data[property];
            }
        }
    }
    UserDtoPagedResultDto.prototype.init = function (_data) {
        var e_158, _a;
        if (_data) {
            if (Array.isArray(_data["items"])) {
                this.items = [];
                try {
                    for (var _b = __values(_data["items"]), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var item = _c.value;
                        this.items.push(UserDto.fromJS(item));
                    }
                }
                catch (e_158_1) { e_158 = { error: e_158_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_158) throw e_158.error; }
                }
            }
            this.totalCount = _data["totalCount"];
        }
    };
    UserDtoPagedResultDto.fromJS = function (data) {
        data = typeof data === 'object' ? data : {};
        var result = new UserDtoPagedResultDto();
        result.init(data);
        return result;
    };
    UserDtoPagedResultDto.prototype.toJSON = function (data) {
        var e_159, _a;
        data = typeof data === 'object' ? data : {};
        if (Array.isArray(this.items)) {
            data["items"] = [];
            try {
                for (var _b = __values(this.items), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var item = _c.value;
                    data["items"].push(item.toJSON());
                }
            }
            catch (e_159_1) { e_159 = { error: e_159_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_159) throw e_159.error; }
            }
        }
        data["totalCount"] = this.totalCount;
        return data;
    };
    UserDtoPagedResultDto.prototype.clone = function () {
        var json = this.toJSON();
        var result = new UserDtoPagedResultDto();
        result.init(json);
        return result;
    };
    return UserDtoPagedResultDto;
}());

var UserLoginInfoDto = /** @class */ (function () {
    function UserLoginInfoDto(data) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    this[property] = data[property];
            }
        }
    }
    UserLoginInfoDto.prototype.init = function (_data) {
        if (_data) {
            this.id = _data["id"];
            this.name = _data["name"];
            this.surname = _data["surname"];
            this.userName = _data["userName"];
            this.emailAddress = _data["emailAddress"];
        }
    };
    UserLoginInfoDto.fromJS = function (data) {
        data = typeof data === 'object' ? data : {};
        var result = new UserLoginInfoDto();
        result.init(data);
        return result;
    };
    UserLoginInfoDto.prototype.toJSON = function (data) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["surname"] = this.surname;
        data["userName"] = this.userName;
        data["emailAddress"] = this.emailAddress;
        return data;
    };
    UserLoginInfoDto.prototype.clone = function () {
        var json = this.toJSON();
        var result = new UserLoginInfoDto();
        result.init(json);
        return result;
    };
    return UserLoginInfoDto;
}());

var ApiException = /** @class */ (function (_super) {
    __extends(ApiException, _super);
    function ApiException(message, status, response, headers, result) {
        var _this = _super.call(this) || this;
        _this.isApiException = true;
        _this.message = message;
        _this.status = status;
        _this.response = response;
        _this.headers = headers;
        _this.result = result;
        return _this;
    }
    ApiException.isApiException = function (obj) {
        return obj.isApiException === true;
    };
    return ApiException;
}(Error));

function throwException(message, status, response, headers, result) {
    if (result !== null && result !== undefined)
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(result);
    else
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)(new ApiException(message, status, response, headers, null));
}
function blobToText(blob) {
    return new rxjs__WEBPACK_IMPORTED_MODULE_7__.Observable(function (observer) {
        if (!blob) {
            observer.next("");
            observer.complete();
        }
        else {
            var reader = new FileReader();
            reader.onload = function (event) {
                observer.next(event.target.result);
                observer.complete();
            };
            reader.readAsText(blob);
        }
    });
}


/***/ }),

/***/ 55696:
/*!************************************************************!*\
  !*** ./src/shared/service-proxies/service-proxy.module.ts ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ServiceProxyModule": function() { return /* binding */ ServiceProxyModule; }
/* harmony export */ });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 91841);
/* harmony import */ var abp_ng2_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! abp-ng2-module */ 71300);
/* harmony import */ var _service_proxies__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./service-proxies */ 37857);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 37716);




var ServiceProxyModule = /** @class */ (function () {
    function ServiceProxyModule() {
    }
    ServiceProxyModule.ɵfac = function ServiceProxyModule_Factory(t) { return new (t || ServiceProxyModule)(); };
    ServiceProxyModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: ServiceProxyModule });
    ServiceProxyModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ providers: [
            _service_proxies__WEBPACK_IMPORTED_MODULE_0__.RoleServiceProxy,
            _service_proxies__WEBPACK_IMPORTED_MODULE_0__.SessionServiceProxy,
            _service_proxies__WEBPACK_IMPORTED_MODULE_0__.TenantServiceProxy,
            _service_proxies__WEBPACK_IMPORTED_MODULE_0__.UserServiceProxy,
            _service_proxies__WEBPACK_IMPORTED_MODULE_0__.TokenAuthServiceProxy,
            _service_proxies__WEBPACK_IMPORTED_MODULE_0__.AccountServiceProxy,
            _service_proxies__WEBPACK_IMPORTED_MODULE_0__.ConfigurationServiceProxy,
            _service_proxies__WEBPACK_IMPORTED_MODULE_0__.DetailedDashboardServiceProxy,
            _service_proxies__WEBPACK_IMPORTED_MODULE_0__.OverviewDashboardServiceProxy,
            _service_proxies__WEBPACK_IMPORTED_MODULE_0__.ProductServiceProxy,
            _service_proxies__WEBPACK_IMPORTED_MODULE_0__.StageServiceProxy,
            { provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HTTP_INTERCEPTORS, useClass: abp_ng2_module__WEBPACK_IMPORTED_MODULE_3__.AbpHttpInterceptor, multi: true }
        ] });
    return ServiceProxyModule;
}());



/***/ }),

/***/ 97558:
/*!***************************************************!*\
  !*** ./src/shared/session/app-session.service.ts ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppSessionService": function() { return /* binding */ AppSessionService; }
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 37716);
/* harmony import */ var _shared_service_proxies_service_proxies__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @shared/service-proxies/service-proxies */ 37857);
/* harmony import */ var abp_ng2_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! abp-ng2-module */ 71300);



var AppSessionService = /** @class */ (function () {
    function AppSessionService(_sessionService, _abpMultiTenancyService) {
        this._sessionService = _sessionService;
        this._abpMultiTenancyService = _abpMultiTenancyService;
    }
    Object.defineProperty(AppSessionService.prototype, "application", {
        get: function () {
            return this._application;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AppSessionService.prototype, "user", {
        get: function () {
            return this._user;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AppSessionService.prototype, "userId", {
        get: function () {
            return this.user ? this.user.id : null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AppSessionService.prototype, "tenant", {
        get: function () {
            return this._tenant;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AppSessionService.prototype, "tenantId", {
        get: function () {
            return this.tenant ? this.tenant.id : null;
        },
        enumerable: false,
        configurable: true
    });
    AppSessionService.prototype.getShownLoginName = function () {
        var userName = this._user.userName;
        if (!this._abpMultiTenancyService.isEnabled) {
            return userName;
        }
        return (this._tenant ? this._tenant.tenancyName : '.') + '\\' + userName;
    };
    AppSessionService.prototype.init = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._sessionService.getCurrentLoginInformations().toPromise().then(function (result) {
                _this._application = result.application;
                _this._user = result.user;
                _this._tenant = result.tenant;
                resolve(true);
            }, function (err) {
                reject(err);
            });
        });
    };
    AppSessionService.prototype.changeTenantIfNeeded = function (tenantId) {
        if (this.isCurrentTenant(tenantId)) {
            return false;
        }
        abp.multiTenancy.setTenantIdCookie(tenantId);
        location.reload();
        return true;
    };
    AppSessionService.prototype.isCurrentTenant = function (tenantId) {
        if (!tenantId && this.tenant) {
            return false;
        }
        else if (tenantId && (!this.tenant || this.tenant.id !== tenantId)) {
            return false;
        }
        return true;
    };
    AppSessionService.ɵfac = function AppSessionService_Factory(t) { return new (t || AppSessionService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_shared_service_proxies_service_proxies__WEBPACK_IMPORTED_MODULE_0__.SessionServiceProxy), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](abp_ng2_module__WEBPACK_IMPORTED_MODULE_2__.AbpMultiTenancyService)); };
    AppSessionService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: AppSessionService, factory: AppSessionService.ɵfac });
    return AppSessionService;
}());



/***/ }),

/***/ 8395:
/*!*************************************!*\
  !*** ./src/shared/shared.module.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SharedModule": function() { return /* binding */ SharedModule; }
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/common */ 38583);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/router */ 39895);
/* harmony import */ var ngx_pagination__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ngx-pagination */ 72533);
/* harmony import */ var _session_app_session_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./session/app-session.service */ 97558);
/* harmony import */ var _nav_app_url_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./nav/app-url.service */ 37936);
/* harmony import */ var _auth_app_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./auth/app-auth.service */ 50895);
/* harmony import */ var _auth_auth_route_guard__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./auth/auth-route-guard */ 21268);
/* harmony import */ var _shared_pipes_localize_pipe__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @shared/pipes/localize.pipe */ 35832);
/* harmony import */ var _components_pagination_abp_pagination_controls_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/pagination/abp-pagination-controls.component */ 4798);
/* harmony import */ var _components_validation_abp_validation_summary_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/validation/abp-validation.summary.component */ 43421);
/* harmony import */ var _components_modal_abp_modal_header_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/modal/abp-modal-header.component */ 20219);
/* harmony import */ var _components_modal_abp_modal_footer_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/modal/abp-modal-footer.component */ 74307);
/* harmony import */ var _layout_layout_store_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./layout/layout-store.service */ 91077);
/* harmony import */ var _directives_busy_directive__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./directives/busy.directive */ 72481);
/* harmony import */ var _directives_equal_validator_directive__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./directives/equal-validator.directive */ 92591);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/core */ 37716);
















var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule.forRoot = function () {
        return {
            ngModule: SharedModule,
            providers: [
                _session_app_session_service__WEBPACK_IMPORTED_MODULE_1__.AppSessionService,
                _nav_app_url_service__WEBPACK_IMPORTED_MODULE_2__.AppUrlService,
                _auth_app_auth_service__WEBPACK_IMPORTED_MODULE_3__.AppAuthService,
                _auth_auth_route_guard__WEBPACK_IMPORTED_MODULE_4__.AppRouteGuard,
                _layout_layout_store_service__WEBPACK_IMPORTED_MODULE_10__.LayoutStoreService
            ]
        };
    };
    SharedModule.ɵfac = function SharedModule_Factory(t) { return new (t || SharedModule)(); };
    SharedModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdefineNgModule"]({ type: SharedModule });
    SharedModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdefineInjector"]({ imports: [[
                _angular_common__WEBPACK_IMPORTED_MODULE_14__.CommonModule,
                _angular_router__WEBPACK_IMPORTED_MODULE_15__.RouterModule,
                ngx_pagination__WEBPACK_IMPORTED_MODULE_0__.NgxPaginationModule
            ]] });
    return SharedModule;
}());

(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵsetNgModuleScope"](SharedModule, { declarations: [_components_pagination_abp_pagination_controls_component__WEBPACK_IMPORTED_MODULE_6__.AbpPaginationControlsComponent,
        _components_validation_abp_validation_summary_component__WEBPACK_IMPORTED_MODULE_7__.AbpValidationSummaryComponent,
        _components_modal_abp_modal_header_component__WEBPACK_IMPORTED_MODULE_8__.AbpModalHeaderComponent,
        _components_modal_abp_modal_footer_component__WEBPACK_IMPORTED_MODULE_9__.AbpModalFooterComponent,
        _shared_pipes_localize_pipe__WEBPACK_IMPORTED_MODULE_5__.LocalizePipe,
        _directives_busy_directive__WEBPACK_IMPORTED_MODULE_11__.BusyDirective,
        _directives_equal_validator_directive__WEBPACK_IMPORTED_MODULE_12__.EqualValidator], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_14__.CommonModule,
        _angular_router__WEBPACK_IMPORTED_MODULE_15__.RouterModule,
        ngx_pagination__WEBPACK_IMPORTED_MODULE_0__.NgxPaginationModule], exports: [_components_pagination_abp_pagination_controls_component__WEBPACK_IMPORTED_MODULE_6__.AbpPaginationControlsComponent,
        _components_validation_abp_validation_summary_component__WEBPACK_IMPORTED_MODULE_7__.AbpValidationSummaryComponent,
        _components_modal_abp_modal_header_component__WEBPACK_IMPORTED_MODULE_8__.AbpModalHeaderComponent,
        _components_modal_abp_modal_footer_component__WEBPACK_IMPORTED_MODULE_9__.AbpModalFooterComponent,
        _shared_pipes_localize_pipe__WEBPACK_IMPORTED_MODULE_5__.LocalizePipe,
        _directives_busy_directive__WEBPACK_IMPORTED_MODULE_11__.BusyDirective,
        _directives_equal_validator_directive__WEBPACK_IMPORTED_MODULE_12__.EqualValidator] }); })();


/***/ }),

/***/ 36896:
/*!**********************************************************************************!*\
  !*** ./node_modules/@angular/common/locales/ lazy ^\.\/.*\.js$ namespace object ***!
  \**********************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var map = {
	"./af-NA.js": [
		11758,
		"node_modules_angular_common_locales_af-NA_js"
	],
	"./af.js": [
		64347,
		"node_modules_angular_common_locales_af_js"
	],
	"./agq.js": [
		79399,
		"node_modules_angular_common_locales_agq_js"
	],
	"./ak.js": [
		60826,
		"node_modules_angular_common_locales_ak_js"
	],
	"./am.js": [
		81766,
		"node_modules_angular_common_locales_am_js"
	],
	"./ar-AE.js": [
		24058,
		"node_modules_angular_common_locales_ar-AE_js"
	],
	"./ar-BH.js": [
		13338,
		"node_modules_angular_common_locales_ar-BH_js"
	],
	"./ar-DJ.js": [
		8713,
		"node_modules_angular_common_locales_ar-DJ_js"
	],
	"./ar-DZ.js": [
		74186,
		"node_modules_angular_common_locales_ar-DZ_js"
	],
	"./ar-EG.js": [
		62392,
		"node_modules_angular_common_locales_ar-EG_js"
	],
	"./ar-EH.js": [
		42385,
		"node_modules_angular_common_locales_ar-EH_js"
	],
	"./ar-ER.js": [
		54793,
		"node_modules_angular_common_locales_ar-ER_js"
	],
	"./ar-IL.js": [
		1941,
		"node_modules_angular_common_locales_ar-IL_js"
	],
	"./ar-IQ.js": [
		74123,
		"node_modules_angular_common_locales_ar-IQ_js"
	],
	"./ar-JO.js": [
		37927,
		"node_modules_angular_common_locales_ar-JO_js"
	],
	"./ar-KM.js": [
		58043,
		"node_modules_angular_common_locales_ar-KM_js"
	],
	"./ar-KW.js": [
		35643,
		"node_modules_angular_common_locales_ar-KW_js"
	],
	"./ar-LB.js": [
		6717,
		"node_modules_angular_common_locales_ar-LB_js"
	],
	"./ar-LY.js": [
		98030,
		"node_modules_angular_common_locales_ar-LY_js"
	],
	"./ar-MA.js": [
		58898,
		"node_modules_angular_common_locales_ar-MA_js"
	],
	"./ar-MR.js": [
		54802,
		"node_modules_angular_common_locales_ar-MR_js"
	],
	"./ar-OM.js": [
		52854,
		"node_modules_angular_common_locales_ar-OM_js"
	],
	"./ar-PS.js": [
		25850,
		"node_modules_angular_common_locales_ar-PS_js"
	],
	"./ar-QA.js": [
		43946,
		"node_modules_angular_common_locales_ar-QA_js"
	],
	"./ar-SA.js": [
		40253,
		"node_modules_angular_common_locales_ar-SA_js"
	],
	"./ar-SD.js": [
		8159,
		"node_modules_angular_common_locales_ar-SD_js"
	],
	"./ar-SO.js": [
		23492,
		"node_modules_angular_common_locales_ar-SO_js"
	],
	"./ar-SS.js": [
		46123,
		"node_modules_angular_common_locales_ar-SS_js"
	],
	"./ar-SY.js": [
		39872,
		"node_modules_angular_common_locales_ar-SY_js"
	],
	"./ar-TD.js": [
		98345,
		"node_modules_angular_common_locales_ar-TD_js"
	],
	"./ar-TN.js": [
		5775,
		"node_modules_angular_common_locales_ar-TN_js"
	],
	"./ar-YE.js": [
		77738,
		"node_modules_angular_common_locales_ar-YE_js"
	],
	"./ar.js": [
		22194,
		"node_modules_angular_common_locales_ar_js"
	],
	"./as.js": [
		18856,
		"node_modules_angular_common_locales_as_js"
	],
	"./asa.js": [
		35008,
		"node_modules_angular_common_locales_asa_js"
	],
	"./ast.js": [
		45493,
		"node_modules_angular_common_locales_ast_js"
	],
	"./az-Cyrl.js": [
		34629,
		"node_modules_angular_common_locales_az-Cyrl_js"
	],
	"./az-Latn.js": [
		19892,
		"node_modules_angular_common_locales_az-Latn_js"
	],
	"./az.js": [
		22681,
		"node_modules_angular_common_locales_az_js"
	],
	"./bas.js": [
		6149,
		"node_modules_angular_common_locales_bas_js"
	],
	"./be.js": [
		99806,
		"node_modules_angular_common_locales_be_js"
	],
	"./bem.js": [
		55158,
		"node_modules_angular_common_locales_bem_js"
	],
	"./bez.js": [
		2365,
		"node_modules_angular_common_locales_bez_js"
	],
	"./bg.js": [
		2075,
		"node_modules_angular_common_locales_bg_js"
	],
	"./bm.js": [
		72201,
		"node_modules_angular_common_locales_bm_js"
	],
	"./bn-IN.js": [
		10473,
		"node_modules_angular_common_locales_bn-IN_js"
	],
	"./bn.js": [
		82715,
		"node_modules_angular_common_locales_bn_js"
	],
	"./bo-IN.js": [
		58920,
		"node_modules_angular_common_locales_bo-IN_js"
	],
	"./bo.js": [
		86068,
		"node_modules_angular_common_locales_bo_js"
	],
	"./br.js": [
		1049,
		"node_modules_angular_common_locales_br_js"
	],
	"./brx.js": [
		48194,
		"node_modules_angular_common_locales_brx_js"
	],
	"./bs-Cyrl.js": [
		13070,
		"node_modules_angular_common_locales_bs-Cyrl_js"
	],
	"./bs-Latn.js": [
		89191,
		"node_modules_angular_common_locales_bs-Latn_js"
	],
	"./bs.js": [
		3207,
		"node_modules_angular_common_locales_bs_js"
	],
	"./ca-AD.js": [
		84431,
		"node_modules_angular_common_locales_ca-AD_js"
	],
	"./ca-ES-VALENCIA.js": [
		43242,
		"node_modules_angular_common_locales_ca-ES-VALENCIA_js"
	],
	"./ca-FR.js": [
		44182,
		"node_modules_angular_common_locales_ca-FR_js"
	],
	"./ca-IT.js": [
		97657,
		"node_modules_angular_common_locales_ca-IT_js"
	],
	"./ca.js": [
		85153,
		"node_modules_angular_common_locales_ca_js"
	],
	"./ccp-IN.js": [
		69198,
		"node_modules_angular_common_locales_ccp-IN_js"
	],
	"./ccp.js": [
		57650,
		"node_modules_angular_common_locales_ccp_js"
	],
	"./ce.js": [
		19406,
		"node_modules_angular_common_locales_ce_js"
	],
	"./ceb.js": [
		18145,
		"node_modules_angular_common_locales_ceb_js"
	],
	"./cgg.js": [
		63802,
		"node_modules_angular_common_locales_cgg_js"
	],
	"./chr.js": [
		67668,
		"node_modules_angular_common_locales_chr_js"
	],
	"./ckb-IR.js": [
		24237,
		"node_modules_angular_common_locales_ckb-IR_js"
	],
	"./ckb.js": [
		64395,
		"node_modules_angular_common_locales_ckb_js"
	],
	"./cs.js": [
		41375,
		"node_modules_angular_common_locales_cs_js"
	],
	"./cu.js": [
		14927,
		"node_modules_angular_common_locales_cu_js"
	],
	"./cy.js": [
		63368,
		"node_modules_angular_common_locales_cy_js"
	],
	"./da-GL.js": [
		941,
		"node_modules_angular_common_locales_da-GL_js"
	],
	"./da.js": [
		24795,
		"node_modules_angular_common_locales_da_js"
	],
	"./dav.js": [
		94274,
		"node_modules_angular_common_locales_dav_js"
	],
	"./de-AT.js": [
		93606,
		"node_modules_angular_common_locales_de-AT_js"
	],
	"./de-BE.js": [
		15650,
		"node_modules_angular_common_locales_de-BE_js"
	],
	"./de-CH.js": [
		26520,
		"node_modules_angular_common_locales_de-CH_js"
	],
	"./de-IT.js": [
		88225,
		"node_modules_angular_common_locales_de-IT_js"
	],
	"./de-LI.js": [
		56231,
		"node_modules_angular_common_locales_de-LI_js"
	],
	"./de-LU.js": [
		82491,
		"node_modules_angular_common_locales_de-LU_js"
	],
	"./de.js": [
		4175,
		"node_modules_angular_common_locales_de_js"
	],
	"./dje.js": [
		11806,
		"node_modules_angular_common_locales_dje_js"
	],
	"./dsb.js": [
		50306,
		"node_modules_angular_common_locales_dsb_js"
	],
	"./dua.js": [
		56637,
		"node_modules_angular_common_locales_dua_js"
	],
	"./dyo.js": [
		11149,
		"node_modules_angular_common_locales_dyo_js"
	],
	"./dz.js": [
		54027,
		"node_modules_angular_common_locales_dz_js"
	],
	"./ebu.js": [
		28276,
		"node_modules_angular_common_locales_ebu_js"
	],
	"./ee-TG.js": [
		84154,
		"node_modules_angular_common_locales_ee-TG_js"
	],
	"./ee.js": [
		75169,
		"node_modules_angular_common_locales_ee_js"
	],
	"./el-CY.js": [
		98757,
		"node_modules_angular_common_locales_el-CY_js"
	],
	"./el.js": [
		49421,
		"node_modules_angular_common_locales_el_js"
	],
	"./en-001.js": [
		75298,
		"node_modules_angular_common_locales_en-001_js"
	],
	"./en-150.js": [
		59098,
		"node_modules_angular_common_locales_en-150_js"
	],
	"./en-AE.js": [
		83850,
		"node_modules_angular_common_locales_en-AE_js"
	],
	"./en-AG.js": [
		98221,
		"node_modules_angular_common_locales_en-AG_js"
	],
	"./en-AI.js": [
		94134,
		"node_modules_angular_common_locales_en-AI_js"
	],
	"./en-AS.js": [
		28526,
		"node_modules_angular_common_locales_en-AS_js"
	],
	"./en-AT.js": [
		38256,
		"node_modules_angular_common_locales_en-AT_js"
	],
	"./en-AU.js": [
		33945,
		"node_modules_angular_common_locales_en-AU_js"
	],
	"./en-BB.js": [
		13384,
		"node_modules_angular_common_locales_en-BB_js"
	],
	"./en-BE.js": [
		24571,
		"node_modules_angular_common_locales_en-BE_js"
	],
	"./en-BI.js": [
		68194,
		"node_modules_angular_common_locales_en-BI_js"
	],
	"./en-BM.js": [
		25297,
		"node_modules_angular_common_locales_en-BM_js"
	],
	"./en-BS.js": [
		50543,
		"node_modules_angular_common_locales_en-BS_js"
	],
	"./en-BW.js": [
		65267,
		"node_modules_angular_common_locales_en-BW_js"
	],
	"./en-BZ.js": [
		27408,
		"node_modules_angular_common_locales_en-BZ_js"
	],
	"./en-CA.js": [
		75913,
		"node_modules_angular_common_locales_en-CA_js"
	],
	"./en-CC.js": [
		4318,
		"node_modules_angular_common_locales_en-CC_js"
	],
	"./en-CH.js": [
		17970,
		"node_modules_angular_common_locales_en-CH_js"
	],
	"./en-CK.js": [
		93207,
		"node_modules_angular_common_locales_en-CK_js"
	],
	"./en-CM.js": [
		48626,
		"node_modules_angular_common_locales_en-CM_js"
	],
	"./en-CX.js": [
		16622,
		"node_modules_angular_common_locales_en-CX_js"
	],
	"./en-CY.js": [
		84090,
		"node_modules_angular_common_locales_en-CY_js"
	],
	"./en-DE.js": [
		47452,
		"node_modules_angular_common_locales_en-DE_js"
	],
	"./en-DG.js": [
		88108,
		"node_modules_angular_common_locales_en-DG_js"
	],
	"./en-DK.js": [
		18214,
		"node_modules_angular_common_locales_en-DK_js"
	],
	"./en-DM.js": [
		78669,
		"node_modules_angular_common_locales_en-DM_js"
	],
	"./en-ER.js": [
		96750,
		"node_modules_angular_common_locales_en-ER_js"
	],
	"./en-FI.js": [
		89999,
		"node_modules_angular_common_locales_en-FI_js"
	],
	"./en-FJ.js": [
		99148,
		"node_modules_angular_common_locales_en-FJ_js"
	],
	"./en-FK.js": [
		94854,
		"node_modules_angular_common_locales_en-FK_js"
	],
	"./en-FM.js": [
		41352,
		"node_modules_angular_common_locales_en-FM_js"
	],
	"./en-GB.js": [
		6141,
		"node_modules_angular_common_locales_en-GB_js"
	],
	"./en-GD.js": [
		43759,
		"node_modules_angular_common_locales_en-GD_js"
	],
	"./en-GG.js": [
		15455,
		"node_modules_angular_common_locales_en-GG_js"
	],
	"./en-GH.js": [
		18415,
		"node_modules_angular_common_locales_en-GH_js"
	],
	"./en-GI.js": [
		93624,
		"node_modules_angular_common_locales_en-GI_js"
	],
	"./en-GM.js": [
		74777,
		"node_modules_angular_common_locales_en-GM_js"
	],
	"./en-GU.js": [
		90275,
		"node_modules_angular_common_locales_en-GU_js"
	],
	"./en-GY.js": [
		74978,
		"node_modules_angular_common_locales_en-GY_js"
	],
	"./en-HK.js": [
		10050,
		"node_modules_angular_common_locales_en-HK_js"
	],
	"./en-IE.js": [
		78523,
		"node_modules_angular_common_locales_en-IE_js"
	],
	"./en-IL.js": [
		83714,
		"node_modules_angular_common_locales_en-IL_js"
	],
	"./en-IM.js": [
		72387,
		"node_modules_angular_common_locales_en-IM_js"
	],
	"./en-IN.js": [
		57429,
		"node_modules_angular_common_locales_en-IN_js"
	],
	"./en-IO.js": [
		17173,
		"node_modules_angular_common_locales_en-IO_js"
	],
	"./en-JE.js": [
		40787,
		"node_modules_angular_common_locales_en-JE_js"
	],
	"./en-JM.js": [
		20768,
		"node_modules_angular_common_locales_en-JM_js"
	],
	"./en-KE.js": [
		95778,
		"node_modules_angular_common_locales_en-KE_js"
	],
	"./en-KI.js": [
		31507,
		"node_modules_angular_common_locales_en-KI_js"
	],
	"./en-KN.js": [
		61225,
		"node_modules_angular_common_locales_en-KN_js"
	],
	"./en-KY.js": [
		31103,
		"node_modules_angular_common_locales_en-KY_js"
	],
	"./en-LC.js": [
		36973,
		"node_modules_angular_common_locales_en-LC_js"
	],
	"./en-LR.js": [
		13213,
		"node_modules_angular_common_locales_en-LR_js"
	],
	"./en-LS.js": [
		893,
		"node_modules_angular_common_locales_en-LS_js"
	],
	"./en-MG.js": [
		89998,
		"node_modules_angular_common_locales_en-MG_js"
	],
	"./en-MH.js": [
		81841,
		"node_modules_angular_common_locales_en-MH_js"
	],
	"./en-MO.js": [
		21771,
		"node_modules_angular_common_locales_en-MO_js"
	],
	"./en-MP.js": [
		43678,
		"node_modules_angular_common_locales_en-MP_js"
	],
	"./en-MS.js": [
		76310,
		"node_modules_angular_common_locales_en-MS_js"
	],
	"./en-MT.js": [
		32663,
		"node_modules_angular_common_locales_en-MT_js"
	],
	"./en-MU.js": [
		37522,
		"node_modules_angular_common_locales_en-MU_js"
	],
	"./en-MW.js": [
		13408,
		"node_modules_angular_common_locales_en-MW_js"
	],
	"./en-MY.js": [
		58271,
		"node_modules_angular_common_locales_en-MY_js"
	],
	"./en-NA.js": [
		4795,
		"node_modules_angular_common_locales_en-NA_js"
	],
	"./en-NF.js": [
		64804,
		"node_modules_angular_common_locales_en-NF_js"
	],
	"./en-NG.js": [
		32989,
		"node_modules_angular_common_locales_en-NG_js"
	],
	"./en-NL.js": [
		83732,
		"node_modules_angular_common_locales_en-NL_js"
	],
	"./en-NR.js": [
		9348,
		"node_modules_angular_common_locales_en-NR_js"
	],
	"./en-NU.js": [
		46616,
		"node_modules_angular_common_locales_en-NU_js"
	],
	"./en-NZ.js": [
		70079,
		"node_modules_angular_common_locales_en-NZ_js"
	],
	"./en-PG.js": [
		66613,
		"node_modules_angular_common_locales_en-PG_js"
	],
	"./en-PH.js": [
		83986,
		"node_modules_angular_common_locales_en-PH_js"
	],
	"./en-PK.js": [
		60614,
		"node_modules_angular_common_locales_en-PK_js"
	],
	"./en-PN.js": [
		23467,
		"node_modules_angular_common_locales_en-PN_js"
	],
	"./en-PR.js": [
		54555,
		"node_modules_angular_common_locales_en-PR_js"
	],
	"./en-PW.js": [
		3707,
		"node_modules_angular_common_locales_en-PW_js"
	],
	"./en-RW.js": [
		72302,
		"node_modules_angular_common_locales_en-RW_js"
	],
	"./en-SB.js": [
		57117,
		"node_modules_angular_common_locales_en-SB_js"
	],
	"./en-SC.js": [
		88234,
		"node_modules_angular_common_locales_en-SC_js"
	],
	"./en-SD.js": [
		92843,
		"node_modules_angular_common_locales_en-SD_js"
	],
	"./en-SE.js": [
		96204,
		"node_modules_angular_common_locales_en-SE_js"
	],
	"./en-SG.js": [
		53102,
		"node_modules_angular_common_locales_en-SG_js"
	],
	"./en-SH.js": [
		46812,
		"node_modules_angular_common_locales_en-SH_js"
	],
	"./en-SI.js": [
		68224,
		"node_modules_angular_common_locales_en-SI_js"
	],
	"./en-SL.js": [
		51814,
		"node_modules_angular_common_locales_en-SL_js"
	],
	"./en-SS.js": [
		56066,
		"node_modules_angular_common_locales_en-SS_js"
	],
	"./en-SX.js": [
		64427,
		"node_modules_angular_common_locales_en-SX_js"
	],
	"./en-SZ.js": [
		47773,
		"node_modules_angular_common_locales_en-SZ_js"
	],
	"./en-TC.js": [
		17060,
		"node_modules_angular_common_locales_en-TC_js"
	],
	"./en-TK.js": [
		42640,
		"node_modules_angular_common_locales_en-TK_js"
	],
	"./en-TO.js": [
		95840,
		"node_modules_angular_common_locales_en-TO_js"
	],
	"./en-TT.js": [
		73305,
		"node_modules_angular_common_locales_en-TT_js"
	],
	"./en-TV.js": [
		97901,
		"node_modules_angular_common_locales_en-TV_js"
	],
	"./en-TZ.js": [
		86014,
		"node_modules_angular_common_locales_en-TZ_js"
	],
	"./en-UG.js": [
		32613,
		"node_modules_angular_common_locales_en-UG_js"
	],
	"./en-UM.js": [
		98014,
		"node_modules_angular_common_locales_en-UM_js"
	],
	"./en-US-POSIX.js": [
		3700,
		"node_modules_angular_common_locales_en-US-POSIX_js"
	],
	"./en-VC.js": [
		60594,
		"node_modules_angular_common_locales_en-VC_js"
	],
	"./en-VG.js": [
		80372,
		"node_modules_angular_common_locales_en-VG_js"
	],
	"./en-VI.js": [
		24207,
		"node_modules_angular_common_locales_en-VI_js"
	],
	"./en-VU.js": [
		50340,
		"node_modules_angular_common_locales_en-VU_js"
	],
	"./en-WS.js": [
		40182,
		"node_modules_angular_common_locales_en-WS_js"
	],
	"./en-ZA.js": [
		33875,
		"node_modules_angular_common_locales_en-ZA_js"
	],
	"./en-ZM.js": [
		87613,
		"node_modules_angular_common_locales_en-ZM_js"
	],
	"./en-ZW.js": [
		25062,
		"node_modules_angular_common_locales_en-ZW_js"
	],
	"./en.js": [
		3929,
		"node_modules_angular_common_locales_en_js"
	],
	"./eo.js": [
		22573,
		"node_modules_angular_common_locales_eo_js"
	],
	"./es-419.js": [
		38597,
		"node_modules_angular_common_locales_es-419_js"
	],
	"./es-AR.js": [
		30248,
		"node_modules_angular_common_locales_es-AR_js"
	],
	"./es-BO.js": [
		63479,
		"node_modules_angular_common_locales_es-BO_js"
	],
	"./es-BR.js": [
		9111,
		"node_modules_angular_common_locales_es-BR_js"
	],
	"./es-BZ.js": [
		70912,
		"node_modules_angular_common_locales_es-BZ_js"
	],
	"./es-CL.js": [
		13130,
		"node_modules_angular_common_locales_es-CL_js"
	],
	"./es-CO.js": [
		21299,
		"node_modules_angular_common_locales_es-CO_js"
	],
	"./es-CR.js": [
		12668,
		"node_modules_angular_common_locales_es-CR_js"
	],
	"./es-CU.js": [
		54745,
		"node_modules_angular_common_locales_es-CU_js"
	],
	"./es-DO.js": [
		83615,
		"node_modules_angular_common_locales_es-DO_js"
	],
	"./es-EA.js": [
		25743,
		"node_modules_angular_common_locales_es-EA_js"
	],
	"./es-EC.js": [
		21228,
		"node_modules_angular_common_locales_es-EC_js"
	],
	"./es-GQ.js": [
		4394,
		"node_modules_angular_common_locales_es-GQ_js"
	],
	"./es-GT.js": [
		19566,
		"node_modules_angular_common_locales_es-GT_js"
	],
	"./es-HN.js": [
		51294,
		"node_modules_angular_common_locales_es-HN_js"
	],
	"./es-IC.js": [
		2750,
		"node_modules_angular_common_locales_es-IC_js"
	],
	"./es-MX.js": [
		73394,
		"node_modules_angular_common_locales_es-MX_js"
	],
	"./es-NI.js": [
		4285,
		"node_modules_angular_common_locales_es-NI_js"
	],
	"./es-PA.js": [
		64580,
		"node_modules_angular_common_locales_es-PA_js"
	],
	"./es-PE.js": [
		31360,
		"node_modules_angular_common_locales_es-PE_js"
	],
	"./es-PH.js": [
		58123,
		"node_modules_angular_common_locales_es-PH_js"
	],
	"./es-PR.js": [
		38306,
		"node_modules_angular_common_locales_es-PR_js"
	],
	"./es-PY.js": [
		71428,
		"node_modules_angular_common_locales_es-PY_js"
	],
	"./es-SV.js": [
		37101,
		"node_modules_angular_common_locales_es-SV_js"
	],
	"./es-US.js": [
		39410,
		"node_modules_angular_common_locales_es-US_js"
	],
	"./es-UY.js": [
		64829,
		"node_modules_angular_common_locales_es-UY_js"
	],
	"./es-VE.js": [
		43015,
		"node_modules_angular_common_locales_es-VE_js"
	],
	"./es.js": [
		90441,
		"node_modules_angular_common_locales_es_js"
	],
	"./et.js": [
		32333,
		"node_modules_angular_common_locales_et_js"
	],
	"./eu.js": [
		49182,
		"node_modules_angular_common_locales_eu_js"
	],
	"./ewo.js": [
		99914,
		"node_modules_angular_common_locales_ewo_js"
	],
	"./extra/af-NA.js": [
		41417,
		"node_modules_angular_common_locales_extra_af-NA_js"
	],
	"./extra/af.js": [
		76536,
		"node_modules_angular_common_locales_extra_af_js"
	],
	"./extra/agq.js": [
		36737,
		"node_modules_angular_common_locales_extra_agq_js"
	],
	"./extra/ak.js": [
		76626,
		"node_modules_angular_common_locales_extra_ak_js"
	],
	"./extra/am.js": [
		67417,
		"node_modules_angular_common_locales_extra_am_js"
	],
	"./extra/ar-AE.js": [
		98469,
		"node_modules_angular_common_locales_extra_ar-AE_js"
	],
	"./extra/ar-BH.js": [
		41167,
		"node_modules_angular_common_locales_extra_ar-BH_js"
	],
	"./extra/ar-DJ.js": [
		24421,
		"node_modules_angular_common_locales_extra_ar-DJ_js"
	],
	"./extra/ar-DZ.js": [
		80273,
		"node_modules_angular_common_locales_extra_ar-DZ_js"
	],
	"./extra/ar-EG.js": [
		5175,
		"node_modules_angular_common_locales_extra_ar-EG_js"
	],
	"./extra/ar-EH.js": [
		85823,
		"node_modules_angular_common_locales_extra_ar-EH_js"
	],
	"./extra/ar-ER.js": [
		91989,
		"node_modules_angular_common_locales_extra_ar-ER_js"
	],
	"./extra/ar-IL.js": [
		83610,
		"node_modules_angular_common_locales_extra_ar-IL_js"
	],
	"./extra/ar-IQ.js": [
		1093,
		"node_modules_angular_common_locales_extra_ar-IQ_js"
	],
	"./extra/ar-JO.js": [
		31930,
		"node_modules_angular_common_locales_extra_ar-JO_js"
	],
	"./extra/ar-KM.js": [
		53101,
		"node_modules_angular_common_locales_extra_ar-KM_js"
	],
	"./extra/ar-KW.js": [
		41296,
		"node_modules_angular_common_locales_extra_ar-KW_js"
	],
	"./extra/ar-LB.js": [
		54067,
		"node_modules_angular_common_locales_extra_ar-LB_js"
	],
	"./extra/ar-LY.js": [
		88520,
		"node_modules_angular_common_locales_extra_ar-LY_js"
	],
	"./extra/ar-MA.js": [
		73245,
		"node_modules_angular_common_locales_extra_ar-MA_js"
	],
	"./extra/ar-MR.js": [
		85186,
		"node_modules_angular_common_locales_extra_ar-MR_js"
	],
	"./extra/ar-OM.js": [
		58200,
		"node_modules_angular_common_locales_extra_ar-OM_js"
	],
	"./extra/ar-PS.js": [
		340,
		"node_modules_angular_common_locales_extra_ar-PS_js"
	],
	"./extra/ar-QA.js": [
		94212,
		"node_modules_angular_common_locales_extra_ar-QA_js"
	],
	"./extra/ar-SA.js": [
		8281,
		"node_modules_angular_common_locales_extra_ar-SA_js"
	],
	"./extra/ar-SD.js": [
		79770,
		"node_modules_angular_common_locales_extra_ar-SD_js"
	],
	"./extra/ar-SO.js": [
		83194,
		"node_modules_angular_common_locales_extra_ar-SO_js"
	],
	"./extra/ar-SS.js": [
		4395,
		"node_modules_angular_common_locales_extra_ar-SS_js"
	],
	"./extra/ar-SY.js": [
		30387,
		"node_modules_angular_common_locales_extra_ar-SY_js"
	],
	"./extra/ar-TD.js": [
		8681,
		"node_modules_angular_common_locales_extra_ar-TD_js"
	],
	"./extra/ar-TN.js": [
		19459,
		"node_modules_angular_common_locales_extra_ar-TN_js"
	],
	"./extra/ar-YE.js": [
		23005,
		"node_modules_angular_common_locales_extra_ar-YE_js"
	],
	"./extra/ar.js": [
		61832,
		"node_modules_angular_common_locales_extra_ar_js"
	],
	"./extra/as.js": [
		3823,
		"node_modules_angular_common_locales_extra_as_js"
	],
	"./extra/asa.js": [
		23359,
		"node_modules_angular_common_locales_extra_asa_js"
	],
	"./extra/ast.js": [
		33374,
		"node_modules_angular_common_locales_extra_ast_js"
	],
	"./extra/az-Cyrl.js": [
		45027,
		"node_modules_angular_common_locales_extra_az-Cyrl_js"
	],
	"./extra/az-Latn.js": [
		6094,
		"node_modules_angular_common_locales_extra_az-Latn_js"
	],
	"./extra/az.js": [
		9567,
		"node_modules_angular_common_locales_extra_az_js"
	],
	"./extra/bas.js": [
		97184,
		"node_modules_angular_common_locales_extra_bas_js"
	],
	"./extra/be.js": [
		83639,
		"node_modules_angular_common_locales_extra_be_js"
	],
	"./extra/bem.js": [
		10240,
		"node_modules_angular_common_locales_extra_bem_js"
	],
	"./extra/bez.js": [
		30477,
		"node_modules_angular_common_locales_extra_bez_js"
	],
	"./extra/bg.js": [
		16211,
		"node_modules_angular_common_locales_extra_bg_js"
	],
	"./extra/bm.js": [
		786,
		"node_modules_angular_common_locales_extra_bm_js"
	],
	"./extra/bn-IN.js": [
		3451,
		"node_modules_angular_common_locales_extra_bn-IN_js"
	],
	"./extra/bn.js": [
		20807,
		"node_modules_angular_common_locales_extra_bn_js"
	],
	"./extra/bo-IN.js": [
		26611,
		"node_modules_angular_common_locales_extra_bo-IN_js"
	],
	"./extra/bo.js": [
		30358,
		"node_modules_angular_common_locales_extra_bo_js"
	],
	"./extra/br.js": [
		9050,
		"node_modules_angular_common_locales_extra_br_js"
	],
	"./extra/brx.js": [
		69904,
		"node_modules_angular_common_locales_extra_brx_js"
	],
	"./extra/bs-Cyrl.js": [
		73336,
		"node_modules_angular_common_locales_extra_bs-Cyrl_js"
	],
	"./extra/bs-Latn.js": [
		84952,
		"node_modules_angular_common_locales_extra_bs-Latn_js"
	],
	"./extra/bs.js": [
		59434,
		"node_modules_angular_common_locales_extra_bs_js"
	],
	"./extra/ca-AD.js": [
		88867,
		"node_modules_angular_common_locales_extra_ca-AD_js"
	],
	"./extra/ca-ES-VALENCIA.js": [
		55931,
		"node_modules_angular_common_locales_extra_ca-ES-VALENCIA_js"
	],
	"./extra/ca-FR.js": [
		83177,
		"node_modules_angular_common_locales_extra_ca-FR_js"
	],
	"./extra/ca-IT.js": [
		3932,
		"node_modules_angular_common_locales_extra_ca-IT_js"
	],
	"./extra/ca.js": [
		27641,
		"node_modules_angular_common_locales_extra_ca_js"
	],
	"./extra/ccp-IN.js": [
		52055,
		"node_modules_angular_common_locales_extra_ccp-IN_js"
	],
	"./extra/ccp.js": [
		30605,
		"node_modules_angular_common_locales_extra_ccp_js"
	],
	"./extra/ce.js": [
		93083,
		"node_modules_angular_common_locales_extra_ce_js"
	],
	"./extra/ceb.js": [
		14405,
		"node_modules_angular_common_locales_extra_ceb_js"
	],
	"./extra/cgg.js": [
		33529,
		"node_modules_angular_common_locales_extra_cgg_js"
	],
	"./extra/chr.js": [
		43685,
		"node_modules_angular_common_locales_extra_chr_js"
	],
	"./extra/ckb-IR.js": [
		51121,
		"node_modules_angular_common_locales_extra_ckb-IR_js"
	],
	"./extra/ckb.js": [
		76019,
		"node_modules_angular_common_locales_extra_ckb_js"
	],
	"./extra/cs.js": [
		82578,
		"node_modules_angular_common_locales_extra_cs_js"
	],
	"./extra/cu.js": [
		20010,
		"node_modules_angular_common_locales_extra_cu_js"
	],
	"./extra/cy.js": [
		60979,
		"node_modules_angular_common_locales_extra_cy_js"
	],
	"./extra/da-GL.js": [
		44981,
		"node_modules_angular_common_locales_extra_da-GL_js"
	],
	"./extra/da.js": [
		29377,
		"node_modules_angular_common_locales_extra_da_js"
	],
	"./extra/dav.js": [
		28083,
		"node_modules_angular_common_locales_extra_dav_js"
	],
	"./extra/de-AT.js": [
		10180,
		"node_modules_angular_common_locales_extra_de-AT_js"
	],
	"./extra/de-BE.js": [
		2263,
		"node_modules_angular_common_locales_extra_de-BE_js"
	],
	"./extra/de-CH.js": [
		29235,
		"node_modules_angular_common_locales_extra_de-CH_js"
	],
	"./extra/de-IT.js": [
		12523,
		"node_modules_angular_common_locales_extra_de-IT_js"
	],
	"./extra/de-LI.js": [
		24686,
		"node_modules_angular_common_locales_extra_de-LI_js"
	],
	"./extra/de-LU.js": [
		96526,
		"node_modules_angular_common_locales_extra_de-LU_js"
	],
	"./extra/de.js": [
		13508,
		"node_modules_angular_common_locales_extra_de_js"
	],
	"./extra/dje.js": [
		3501,
		"node_modules_angular_common_locales_extra_dje_js"
	],
	"./extra/dsb.js": [
		43750,
		"node_modules_angular_common_locales_extra_dsb_js"
	],
	"./extra/dua.js": [
		83587,
		"node_modules_angular_common_locales_extra_dua_js"
	],
	"./extra/dyo.js": [
		82015,
		"node_modules_angular_common_locales_extra_dyo_js"
	],
	"./extra/dz.js": [
		75261,
		"node_modules_angular_common_locales_extra_dz_js"
	],
	"./extra/ebu.js": [
		34445,
		"node_modules_angular_common_locales_extra_ebu_js"
	],
	"./extra/ee-TG.js": [
		17367,
		"node_modules_angular_common_locales_extra_ee-TG_js"
	],
	"./extra/ee.js": [
		50843,
		"node_modules_angular_common_locales_extra_ee_js"
	],
	"./extra/el-CY.js": [
		68162,
		"node_modules_angular_common_locales_extra_el-CY_js"
	],
	"./extra/el.js": [
		45123,
		"node_modules_angular_common_locales_extra_el_js"
	],
	"./extra/en-001.js": [
		61411,
		"node_modules_angular_common_locales_extra_en-001_js"
	],
	"./extra/en-150.js": [
		47297,
		"node_modules_angular_common_locales_extra_en-150_js"
	],
	"./extra/en-AE.js": [
		86511,
		"node_modules_angular_common_locales_extra_en-AE_js"
	],
	"./extra/en-AG.js": [
		23477,
		"node_modules_angular_common_locales_extra_en-AG_js"
	],
	"./extra/en-AI.js": [
		17596,
		"node_modules_angular_common_locales_extra_en-AI_js"
	],
	"./extra/en-AS.js": [
		63625,
		"node_modules_angular_common_locales_extra_en-AS_js"
	],
	"./extra/en-AT.js": [
		31026,
		"node_modules_angular_common_locales_extra_en-AT_js"
	],
	"./extra/en-AU.js": [
		25224,
		"node_modules_angular_common_locales_extra_en-AU_js"
	],
	"./extra/en-BB.js": [
		18799,
		"node_modules_angular_common_locales_extra_en-BB_js"
	],
	"./extra/en-BE.js": [
		61447,
		"node_modules_angular_common_locales_extra_en-BE_js"
	],
	"./extra/en-BI.js": [
		78739,
		"node_modules_angular_common_locales_extra_en-BI_js"
	],
	"./extra/en-BM.js": [
		65002,
		"node_modules_angular_common_locales_extra_en-BM_js"
	],
	"./extra/en-BS.js": [
		73114,
		"node_modules_angular_common_locales_extra_en-BS_js"
	],
	"./extra/en-BW.js": [
		2693,
		"node_modules_angular_common_locales_extra_en-BW_js"
	],
	"./extra/en-BZ.js": [
		65527,
		"node_modules_angular_common_locales_extra_en-BZ_js"
	],
	"./extra/en-CA.js": [
		92074,
		"node_modules_angular_common_locales_extra_en-CA_js"
	],
	"./extra/en-CC.js": [
		83879,
		"node_modules_angular_common_locales_extra_en-CC_js"
	],
	"./extra/en-CH.js": [
		80742,
		"node_modules_angular_common_locales_extra_en-CH_js"
	],
	"./extra/en-CK.js": [
		9742,
		"node_modules_angular_common_locales_extra_en-CK_js"
	],
	"./extra/en-CM.js": [
		27076,
		"node_modules_angular_common_locales_extra_en-CM_js"
	],
	"./extra/en-CX.js": [
		31674,
		"node_modules_angular_common_locales_extra_en-CX_js"
	],
	"./extra/en-CY.js": [
		89164,
		"node_modules_angular_common_locales_extra_en-CY_js"
	],
	"./extra/en-DE.js": [
		16067,
		"node_modules_angular_common_locales_extra_en-DE_js"
	],
	"./extra/en-DG.js": [
		47985,
		"node_modules_angular_common_locales_extra_en-DG_js"
	],
	"./extra/en-DK.js": [
		29695,
		"node_modules_angular_common_locales_extra_en-DK_js"
	],
	"./extra/en-DM.js": [
		28690,
		"node_modules_angular_common_locales_extra_en-DM_js"
	],
	"./extra/en-ER.js": [
		82667,
		"node_modules_angular_common_locales_extra_en-ER_js"
	],
	"./extra/en-FI.js": [
		92540,
		"node_modules_angular_common_locales_extra_en-FI_js"
	],
	"./extra/en-FJ.js": [
		36342,
		"node_modules_angular_common_locales_extra_en-FJ_js"
	],
	"./extra/en-FK.js": [
		42603,
		"node_modules_angular_common_locales_extra_en-FK_js"
	],
	"./extra/en-FM.js": [
		85094,
		"node_modules_angular_common_locales_extra_en-FM_js"
	],
	"./extra/en-GB.js": [
		43268,
		"node_modules_angular_common_locales_extra_en-GB_js"
	],
	"./extra/en-GD.js": [
		64828,
		"node_modules_angular_common_locales_extra_en-GD_js"
	],
	"./extra/en-GG.js": [
		93786,
		"node_modules_angular_common_locales_extra_en-GG_js"
	],
	"./extra/en-GH.js": [
		10245,
		"node_modules_angular_common_locales_extra_en-GH_js"
	],
	"./extra/en-GI.js": [
		8254,
		"node_modules_angular_common_locales_extra_en-GI_js"
	],
	"./extra/en-GM.js": [
		71638,
		"node_modules_angular_common_locales_extra_en-GM_js"
	],
	"./extra/en-GU.js": [
		60263,
		"node_modules_angular_common_locales_extra_en-GU_js"
	],
	"./extra/en-GY.js": [
		21541,
		"node_modules_angular_common_locales_extra_en-GY_js"
	],
	"./extra/en-HK.js": [
		63045,
		"node_modules_angular_common_locales_extra_en-HK_js"
	],
	"./extra/en-IE.js": [
		26892,
		"node_modules_angular_common_locales_extra_en-IE_js"
	],
	"./extra/en-IL.js": [
		97842,
		"node_modules_angular_common_locales_extra_en-IL_js"
	],
	"./extra/en-IM.js": [
		29039,
		"node_modules_angular_common_locales_extra_en-IM_js"
	],
	"./extra/en-IN.js": [
		34032,
		"node_modules_angular_common_locales_extra_en-IN_js"
	],
	"./extra/en-IO.js": [
		94328,
		"node_modules_angular_common_locales_extra_en-IO_js"
	],
	"./extra/en-JE.js": [
		31359,
		"node_modules_angular_common_locales_extra_en-JE_js"
	],
	"./extra/en-JM.js": [
		673,
		"node_modules_angular_common_locales_extra_en-JM_js"
	],
	"./extra/en-KE.js": [
		48693,
		"node_modules_angular_common_locales_extra_en-KE_js"
	],
	"./extra/en-KI.js": [
		16586,
		"node_modules_angular_common_locales_extra_en-KI_js"
	],
	"./extra/en-KN.js": [
		69040,
		"node_modules_angular_common_locales_extra_en-KN_js"
	],
	"./extra/en-KY.js": [
		32859,
		"node_modules_angular_common_locales_extra_en-KY_js"
	],
	"./extra/en-LC.js": [
		78846,
		"node_modules_angular_common_locales_extra_en-LC_js"
	],
	"./extra/en-LR.js": [
		57318,
		"node_modules_angular_common_locales_extra_en-LR_js"
	],
	"./extra/en-LS.js": [
		768,
		"node_modules_angular_common_locales_extra_en-LS_js"
	],
	"./extra/en-MG.js": [
		35560,
		"node_modules_angular_common_locales_extra_en-MG_js"
	],
	"./extra/en-MH.js": [
		22466,
		"node_modules_angular_common_locales_extra_en-MH_js"
	],
	"./extra/en-MO.js": [
		10393,
		"node_modules_angular_common_locales_extra_en-MO_js"
	],
	"./extra/en-MP.js": [
		67500,
		"node_modules_angular_common_locales_extra_en-MP_js"
	],
	"./extra/en-MS.js": [
		2310,
		"node_modules_angular_common_locales_extra_en-MS_js"
	],
	"./extra/en-MT.js": [
		15681,
		"node_modules_angular_common_locales_extra_en-MT_js"
	],
	"./extra/en-MU.js": [
		67653,
		"node_modules_angular_common_locales_extra_en-MU_js"
	],
	"./extra/en-MW.js": [
		99175,
		"node_modules_angular_common_locales_extra_en-MW_js"
	],
	"./extra/en-MY.js": [
		16015,
		"node_modules_angular_common_locales_extra_en-MY_js"
	],
	"./extra/en-NA.js": [
		7274,
		"node_modules_angular_common_locales_extra_en-NA_js"
	],
	"./extra/en-NF.js": [
		41019,
		"node_modules_angular_common_locales_extra_en-NF_js"
	],
	"./extra/en-NG.js": [
		38822,
		"node_modules_angular_common_locales_extra_en-NG_js"
	],
	"./extra/en-NL.js": [
		31781,
		"node_modules_angular_common_locales_extra_en-NL_js"
	],
	"./extra/en-NR.js": [
		46750,
		"node_modules_angular_common_locales_extra_en-NR_js"
	],
	"./extra/en-NU.js": [
		65311,
		"node_modules_angular_common_locales_extra_en-NU_js"
	],
	"./extra/en-NZ.js": [
		74218,
		"node_modules_angular_common_locales_extra_en-NZ_js"
	],
	"./extra/en-PG.js": [
		40415,
		"node_modules_angular_common_locales_extra_en-PG_js"
	],
	"./extra/en-PH.js": [
		34766,
		"node_modules_angular_common_locales_extra_en-PH_js"
	],
	"./extra/en-PK.js": [
		39491,
		"node_modules_angular_common_locales_extra_en-PK_js"
	],
	"./extra/en-PN.js": [
		30549,
		"node_modules_angular_common_locales_extra_en-PN_js"
	],
	"./extra/en-PR.js": [
		51440,
		"node_modules_angular_common_locales_extra_en-PR_js"
	],
	"./extra/en-PW.js": [
		81860,
		"node_modules_angular_common_locales_extra_en-PW_js"
	],
	"./extra/en-RW.js": [
		72699,
		"node_modules_angular_common_locales_extra_en-RW_js"
	],
	"./extra/en-SB.js": [
		30260,
		"node_modules_angular_common_locales_extra_en-SB_js"
	],
	"./extra/en-SC.js": [
		61389,
		"node_modules_angular_common_locales_extra_en-SC_js"
	],
	"./extra/en-SD.js": [
		68769,
		"node_modules_angular_common_locales_extra_en-SD_js"
	],
	"./extra/en-SE.js": [
		71798,
		"node_modules_angular_common_locales_extra_en-SE_js"
	],
	"./extra/en-SG.js": [
		3120,
		"node_modules_angular_common_locales_extra_en-SG_js"
	],
	"./extra/en-SH.js": [
		13577,
		"node_modules_angular_common_locales_extra_en-SH_js"
	],
	"./extra/en-SI.js": [
		5071,
		"node_modules_angular_common_locales_extra_en-SI_js"
	],
	"./extra/en-SL.js": [
		23371,
		"node_modules_angular_common_locales_extra_en-SL_js"
	],
	"./extra/en-SS.js": [
		57846,
		"node_modules_angular_common_locales_extra_en-SS_js"
	],
	"./extra/en-SX.js": [
		4538,
		"node_modules_angular_common_locales_extra_en-SX_js"
	],
	"./extra/en-SZ.js": [
		22014,
		"node_modules_angular_common_locales_extra_en-SZ_js"
	],
	"./extra/en-TC.js": [
		56220,
		"node_modules_angular_common_locales_extra_en-TC_js"
	],
	"./extra/en-TK.js": [
		36546,
		"node_modules_angular_common_locales_extra_en-TK_js"
	],
	"./extra/en-TO.js": [
		68511,
		"node_modules_angular_common_locales_extra_en-TO_js"
	],
	"./extra/en-TT.js": [
		5817,
		"node_modules_angular_common_locales_extra_en-TT_js"
	],
	"./extra/en-TV.js": [
		85054,
		"node_modules_angular_common_locales_extra_en-TV_js"
	],
	"./extra/en-TZ.js": [
		61606,
		"node_modules_angular_common_locales_extra_en-TZ_js"
	],
	"./extra/en-UG.js": [
		32223,
		"node_modules_angular_common_locales_extra_en-UG_js"
	],
	"./extra/en-UM.js": [
		52200,
		"node_modules_angular_common_locales_extra_en-UM_js"
	],
	"./extra/en-US-POSIX.js": [
		35058,
		"node_modules_angular_common_locales_extra_en-US-POSIX_js"
	],
	"./extra/en-VC.js": [
		73025,
		"node_modules_angular_common_locales_extra_en-VC_js"
	],
	"./extra/en-VG.js": [
		4414,
		"node_modules_angular_common_locales_extra_en-VG_js"
	],
	"./extra/en-VI.js": [
		67476,
		"node_modules_angular_common_locales_extra_en-VI_js"
	],
	"./extra/en-VU.js": [
		37484,
		"node_modules_angular_common_locales_extra_en-VU_js"
	],
	"./extra/en-WS.js": [
		74674,
		"node_modules_angular_common_locales_extra_en-WS_js"
	],
	"./extra/en-ZA.js": [
		73894,
		"node_modules_angular_common_locales_extra_en-ZA_js"
	],
	"./extra/en-ZM.js": [
		64416,
		"node_modules_angular_common_locales_extra_en-ZM_js"
	],
	"./extra/en-ZW.js": [
		75466,
		"node_modules_angular_common_locales_extra_en-ZW_js"
	],
	"./extra/en.js": [
		25837,
		"node_modules_angular_common_locales_extra_en_js"
	],
	"./extra/eo.js": [
		92516,
		"node_modules_angular_common_locales_extra_eo_js"
	],
	"./extra/es-419.js": [
		25247,
		"node_modules_angular_common_locales_extra_es-419_js"
	],
	"./extra/es-AR.js": [
		14069,
		"node_modules_angular_common_locales_extra_es-AR_js"
	],
	"./extra/es-BO.js": [
		41527,
		"node_modules_angular_common_locales_extra_es-BO_js"
	],
	"./extra/es-BR.js": [
		2752,
		"node_modules_angular_common_locales_extra_es-BR_js"
	],
	"./extra/es-BZ.js": [
		49411,
		"node_modules_angular_common_locales_extra_es-BZ_js"
	],
	"./extra/es-CL.js": [
		58655,
		"node_modules_angular_common_locales_extra_es-CL_js"
	],
	"./extra/es-CO.js": [
		92567,
		"node_modules_angular_common_locales_extra_es-CO_js"
	],
	"./extra/es-CR.js": [
		37403,
		"node_modules_angular_common_locales_extra_es-CR_js"
	],
	"./extra/es-CU.js": [
		53694,
		"node_modules_angular_common_locales_extra_es-CU_js"
	],
	"./extra/es-DO.js": [
		12990,
		"node_modules_angular_common_locales_extra_es-DO_js"
	],
	"./extra/es-EA.js": [
		72492,
		"node_modules_angular_common_locales_extra_es-EA_js"
	],
	"./extra/es-EC.js": [
		10805,
		"node_modules_angular_common_locales_extra_es-EC_js"
	],
	"./extra/es-GQ.js": [
		73163,
		"node_modules_angular_common_locales_extra_es-GQ_js"
	],
	"./extra/es-GT.js": [
		82415,
		"node_modules_angular_common_locales_extra_es-GT_js"
	],
	"./extra/es-HN.js": [
		48363,
		"node_modules_angular_common_locales_extra_es-HN_js"
	],
	"./extra/es-IC.js": [
		56293,
		"node_modules_angular_common_locales_extra_es-IC_js"
	],
	"./extra/es-MX.js": [
		88247,
		"node_modules_angular_common_locales_extra_es-MX_js"
	],
	"./extra/es-NI.js": [
		63140,
		"node_modules_angular_common_locales_extra_es-NI_js"
	],
	"./extra/es-PA.js": [
		80047,
		"node_modules_angular_common_locales_extra_es-PA_js"
	],
	"./extra/es-PE.js": [
		5298,
		"node_modules_angular_common_locales_extra_es-PE_js"
	],
	"./extra/es-PH.js": [
		84553,
		"node_modules_angular_common_locales_extra_es-PH_js"
	],
	"./extra/es-PR.js": [
		139,
		"node_modules_angular_common_locales_extra_es-PR_js"
	],
	"./extra/es-PY.js": [
		96619,
		"node_modules_angular_common_locales_extra_es-PY_js"
	],
	"./extra/es-SV.js": [
		26936,
		"node_modules_angular_common_locales_extra_es-SV_js"
	],
	"./extra/es-US.js": [
		54406,
		"node_modules_angular_common_locales_extra_es-US_js"
	],
	"./extra/es-UY.js": [
		40512,
		"node_modules_angular_common_locales_extra_es-UY_js"
	],
	"./extra/es-VE.js": [
		43112,
		"node_modules_angular_common_locales_extra_es-VE_js"
	],
	"./extra/es.js": [
		70973,
		"node_modules_angular_common_locales_extra_es_js"
	],
	"./extra/et.js": [
		37720,
		"node_modules_angular_common_locales_extra_et_js"
	],
	"./extra/eu.js": [
		43280,
		"node_modules_angular_common_locales_extra_eu_js"
	],
	"./extra/ewo.js": [
		49335,
		"node_modules_angular_common_locales_extra_ewo_js"
	],
	"./extra/fa-AF.js": [
		81150,
		"node_modules_angular_common_locales_extra_fa-AF_js"
	],
	"./extra/fa.js": [
		42993,
		"node_modules_angular_common_locales_extra_fa_js"
	],
	"./extra/ff-CM.js": [
		25177,
		"node_modules_angular_common_locales_extra_ff-CM_js"
	],
	"./extra/ff-GN.js": [
		83245,
		"node_modules_angular_common_locales_extra_ff-GN_js"
	],
	"./extra/ff-Latn-BF.js": [
		34736,
		"node_modules_angular_common_locales_extra_ff-Latn-BF_js"
	],
	"./extra/ff-Latn-CM.js": [
		85206,
		"node_modules_angular_common_locales_extra_ff-Latn-CM_js"
	],
	"./extra/ff-Latn-GH.js": [
		79927,
		"node_modules_angular_common_locales_extra_ff-Latn-GH_js"
	],
	"./extra/ff-Latn-GM.js": [
		4831,
		"node_modules_angular_common_locales_extra_ff-Latn-GM_js"
	],
	"./extra/ff-Latn-GN.js": [
		99773,
		"node_modules_angular_common_locales_extra_ff-Latn-GN_js"
	],
	"./extra/ff-Latn-GW.js": [
		30790,
		"node_modules_angular_common_locales_extra_ff-Latn-GW_js"
	],
	"./extra/ff-Latn-LR.js": [
		99966,
		"node_modules_angular_common_locales_extra_ff-Latn-LR_js"
	],
	"./extra/ff-Latn-MR.js": [
		12227,
		"node_modules_angular_common_locales_extra_ff-Latn-MR_js"
	],
	"./extra/ff-Latn-NE.js": [
		26618,
		"node_modules_angular_common_locales_extra_ff-Latn-NE_js"
	],
	"./extra/ff-Latn-NG.js": [
		88934,
		"node_modules_angular_common_locales_extra_ff-Latn-NG_js"
	],
	"./extra/ff-Latn-SL.js": [
		36782,
		"node_modules_angular_common_locales_extra_ff-Latn-SL_js"
	],
	"./extra/ff-Latn.js": [
		80291,
		"node_modules_angular_common_locales_extra_ff-Latn_js"
	],
	"./extra/ff-MR.js": [
		78773,
		"node_modules_angular_common_locales_extra_ff-MR_js"
	],
	"./extra/ff.js": [
		80757,
		"node_modules_angular_common_locales_extra_ff_js"
	],
	"./extra/fi.js": [
		41274,
		"node_modules_angular_common_locales_extra_fi_js"
	],
	"./extra/fil.js": [
		94246,
		"node_modules_angular_common_locales_extra_fil_js"
	],
	"./extra/fo-DK.js": [
		62154,
		"node_modules_angular_common_locales_extra_fo-DK_js"
	],
	"./extra/fo.js": [
		1473,
		"node_modules_angular_common_locales_extra_fo_js"
	],
	"./extra/fr-BE.js": [
		19253,
		"node_modules_angular_common_locales_extra_fr-BE_js"
	],
	"./extra/fr-BF.js": [
		25892,
		"node_modules_angular_common_locales_extra_fr-BF_js"
	],
	"./extra/fr-BI.js": [
		57574,
		"node_modules_angular_common_locales_extra_fr-BI_js"
	],
	"./extra/fr-BJ.js": [
		41098,
		"node_modules_angular_common_locales_extra_fr-BJ_js"
	],
	"./extra/fr-BL.js": [
		73760,
		"node_modules_angular_common_locales_extra_fr-BL_js"
	],
	"./extra/fr-CA.js": [
		83027,
		"node_modules_angular_common_locales_extra_fr-CA_js"
	],
	"./extra/fr-CD.js": [
		94469,
		"node_modules_angular_common_locales_extra_fr-CD_js"
	],
	"./extra/fr-CF.js": [
		12943,
		"node_modules_angular_common_locales_extra_fr-CF_js"
	],
	"./extra/fr-CG.js": [
		4779,
		"node_modules_angular_common_locales_extra_fr-CG_js"
	],
	"./extra/fr-CH.js": [
		30235,
		"node_modules_angular_common_locales_extra_fr-CH_js"
	],
	"./extra/fr-CI.js": [
		55235,
		"node_modules_angular_common_locales_extra_fr-CI_js"
	],
	"./extra/fr-CM.js": [
		27287,
		"node_modules_angular_common_locales_extra_fr-CM_js"
	],
	"./extra/fr-DJ.js": [
		96336,
		"node_modules_angular_common_locales_extra_fr-DJ_js"
	],
	"./extra/fr-DZ.js": [
		12284,
		"node_modules_angular_common_locales_extra_fr-DZ_js"
	],
	"./extra/fr-GA.js": [
		70371,
		"node_modules_angular_common_locales_extra_fr-GA_js"
	],
	"./extra/fr-GF.js": [
		62,
		"node_modules_angular_common_locales_extra_fr-GF_js"
	],
	"./extra/fr-GN.js": [
		89978,
		"node_modules_angular_common_locales_extra_fr-GN_js"
	],
	"./extra/fr-GP.js": [
		6893,
		"node_modules_angular_common_locales_extra_fr-GP_js"
	],
	"./extra/fr-GQ.js": [
		98789,
		"node_modules_angular_common_locales_extra_fr-GQ_js"
	],
	"./extra/fr-HT.js": [
		5816,
		"node_modules_angular_common_locales_extra_fr-HT_js"
	],
	"./extra/fr-KM.js": [
		27250,
		"node_modules_angular_common_locales_extra_fr-KM_js"
	],
	"./extra/fr-LU.js": [
		63703,
		"node_modules_angular_common_locales_extra_fr-LU_js"
	],
	"./extra/fr-MA.js": [
		33726,
		"node_modules_angular_common_locales_extra_fr-MA_js"
	],
	"./extra/fr-MC.js": [
		36993,
		"node_modules_angular_common_locales_extra_fr-MC_js"
	],
	"./extra/fr-MF.js": [
		32133,
		"node_modules_angular_common_locales_extra_fr-MF_js"
	],
	"./extra/fr-MG.js": [
		60114,
		"node_modules_angular_common_locales_extra_fr-MG_js"
	],
	"./extra/fr-ML.js": [
		39209,
		"node_modules_angular_common_locales_extra_fr-ML_js"
	],
	"./extra/fr-MQ.js": [
		65173,
		"node_modules_angular_common_locales_extra_fr-MQ_js"
	],
	"./extra/fr-MR.js": [
		70718,
		"node_modules_angular_common_locales_extra_fr-MR_js"
	],
	"./extra/fr-MU.js": [
		96780,
		"node_modules_angular_common_locales_extra_fr-MU_js"
	],
	"./extra/fr-NC.js": [
		20638,
		"node_modules_angular_common_locales_extra_fr-NC_js"
	],
	"./extra/fr-NE.js": [
		79516,
		"node_modules_angular_common_locales_extra_fr-NE_js"
	],
	"./extra/fr-PF.js": [
		12988,
		"node_modules_angular_common_locales_extra_fr-PF_js"
	],
	"./extra/fr-PM.js": [
		67038,
		"node_modules_angular_common_locales_extra_fr-PM_js"
	],
	"./extra/fr-RE.js": [
		70721,
		"node_modules_angular_common_locales_extra_fr-RE_js"
	],
	"./extra/fr-RW.js": [
		63717,
		"node_modules_angular_common_locales_extra_fr-RW_js"
	],
	"./extra/fr-SC.js": [
		76849,
		"node_modules_angular_common_locales_extra_fr-SC_js"
	],
	"./extra/fr-SN.js": [
		97713,
		"node_modules_angular_common_locales_extra_fr-SN_js"
	],
	"./extra/fr-SY.js": [
		60911,
		"node_modules_angular_common_locales_extra_fr-SY_js"
	],
	"./extra/fr-TD.js": [
		70642,
		"node_modules_angular_common_locales_extra_fr-TD_js"
	],
	"./extra/fr-TG.js": [
		67076,
		"node_modules_angular_common_locales_extra_fr-TG_js"
	],
	"./extra/fr-TN.js": [
		27047,
		"node_modules_angular_common_locales_extra_fr-TN_js"
	],
	"./extra/fr-VU.js": [
		5564,
		"node_modules_angular_common_locales_extra_fr-VU_js"
	],
	"./extra/fr-WF.js": [
		4770,
		"node_modules_angular_common_locales_extra_fr-WF_js"
	],
	"./extra/fr-YT.js": [
		47374,
		"node_modules_angular_common_locales_extra_fr-YT_js"
	],
	"./extra/fr.js": [
		33913,
		"node_modules_angular_common_locales_extra_fr_js"
	],
	"./extra/fur.js": [
		89413,
		"node_modules_angular_common_locales_extra_fur_js"
	],
	"./extra/fy.js": [
		60762,
		"node_modules_angular_common_locales_extra_fy_js"
	],
	"./extra/ga-GB.js": [
		61208,
		"node_modules_angular_common_locales_extra_ga-GB_js"
	],
	"./extra/ga.js": [
		55040,
		"node_modules_angular_common_locales_extra_ga_js"
	],
	"./extra/gd.js": [
		98971,
		"node_modules_angular_common_locales_extra_gd_js"
	],
	"./extra/gl.js": [
		59626,
		"node_modules_angular_common_locales_extra_gl_js"
	],
	"./extra/gsw-FR.js": [
		54006,
		"node_modules_angular_common_locales_extra_gsw-FR_js"
	],
	"./extra/gsw-LI.js": [
		69521,
		"node_modules_angular_common_locales_extra_gsw-LI_js"
	],
	"./extra/gsw.js": [
		47975,
		"node_modules_angular_common_locales_extra_gsw_js"
	],
	"./extra/gu.js": [
		76321,
		"node_modules_angular_common_locales_extra_gu_js"
	],
	"./extra/guz.js": [
		17844,
		"node_modules_angular_common_locales_extra_guz_js"
	],
	"./extra/gv.js": [
		59146,
		"node_modules_angular_common_locales_extra_gv_js"
	],
	"./extra/ha-GH.js": [
		85007,
		"node_modules_angular_common_locales_extra_ha-GH_js"
	],
	"./extra/ha-NE.js": [
		30164,
		"node_modules_angular_common_locales_extra_ha-NE_js"
	],
	"./extra/ha.js": [
		92765,
		"node_modules_angular_common_locales_extra_ha_js"
	],
	"./extra/haw.js": [
		90993,
		"node_modules_angular_common_locales_extra_haw_js"
	],
	"./extra/he.js": [
		5830,
		"node_modules_angular_common_locales_extra_he_js"
	],
	"./extra/hi.js": [
		38146,
		"node_modules_angular_common_locales_extra_hi_js"
	],
	"./extra/hr-BA.js": [
		78511,
		"node_modules_angular_common_locales_extra_hr-BA_js"
	],
	"./extra/hr.js": [
		86479,
		"node_modules_angular_common_locales_extra_hr_js"
	],
	"./extra/hsb.js": [
		93067,
		"node_modules_angular_common_locales_extra_hsb_js"
	],
	"./extra/hu.js": [
		55148,
		"node_modules_angular_common_locales_extra_hu_js"
	],
	"./extra/hy.js": [
		79364,
		"node_modules_angular_common_locales_extra_hy_js"
	],
	"./extra/ia.js": [
		85361,
		"node_modules_angular_common_locales_extra_ia_js"
	],
	"./extra/id.js": [
		61810,
		"node_modules_angular_common_locales_extra_id_js"
	],
	"./extra/ig.js": [
		62531,
		"node_modules_angular_common_locales_extra_ig_js"
	],
	"./extra/ii.js": [
		34337,
		"node_modules_angular_common_locales_extra_ii_js"
	],
	"./extra/is.js": [
		80882,
		"node_modules_angular_common_locales_extra_is_js"
	],
	"./extra/it-CH.js": [
		39431,
		"node_modules_angular_common_locales_extra_it-CH_js"
	],
	"./extra/it-SM.js": [
		49090,
		"node_modules_angular_common_locales_extra_it-SM_js"
	],
	"./extra/it-VA.js": [
		1558,
		"node_modules_angular_common_locales_extra_it-VA_js"
	],
	"./extra/it.js": [
		306,
		"node_modules_angular_common_locales_extra_it_js"
	],
	"./extra/ja.js": [
		84628,
		"node_modules_angular_common_locales_extra_ja_js"
	],
	"./extra/jgo.js": [
		97072,
		"node_modules_angular_common_locales_extra_jgo_js"
	],
	"./extra/jmc.js": [
		34780,
		"node_modules_angular_common_locales_extra_jmc_js"
	],
	"./extra/jv.js": [
		9481,
		"node_modules_angular_common_locales_extra_jv_js"
	],
	"./extra/ka.js": [
		63093,
		"node_modules_angular_common_locales_extra_ka_js"
	],
	"./extra/kab.js": [
		23724,
		"node_modules_angular_common_locales_extra_kab_js"
	],
	"./extra/kam.js": [
		92192,
		"node_modules_angular_common_locales_extra_kam_js"
	],
	"./extra/kde.js": [
		98330,
		"node_modules_angular_common_locales_extra_kde_js"
	],
	"./extra/kea.js": [
		76171,
		"node_modules_angular_common_locales_extra_kea_js"
	],
	"./extra/khq.js": [
		73863,
		"node_modules_angular_common_locales_extra_khq_js"
	],
	"./extra/ki.js": [
		21481,
		"node_modules_angular_common_locales_extra_ki_js"
	],
	"./extra/kk.js": [
		37858,
		"node_modules_angular_common_locales_extra_kk_js"
	],
	"./extra/kkj.js": [
		31915,
		"node_modules_angular_common_locales_extra_kkj_js"
	],
	"./extra/kl.js": [
		58007,
		"node_modules_angular_common_locales_extra_kl_js"
	],
	"./extra/kln.js": [
		61666,
		"node_modules_angular_common_locales_extra_kln_js"
	],
	"./extra/km.js": [
		49590,
		"node_modules_angular_common_locales_extra_km_js"
	],
	"./extra/kn.js": [
		32336,
		"node_modules_angular_common_locales_extra_kn_js"
	],
	"./extra/ko-KP.js": [
		5834,
		"node_modules_angular_common_locales_extra_ko-KP_js"
	],
	"./extra/ko.js": [
		97393,
		"node_modules_angular_common_locales_extra_ko_js"
	],
	"./extra/kok.js": [
		58530,
		"node_modules_angular_common_locales_extra_kok_js"
	],
	"./extra/ks-Arab.js": [
		79175,
		"node_modules_angular_common_locales_extra_ks-Arab_js"
	],
	"./extra/ks.js": [
		27807,
		"node_modules_angular_common_locales_extra_ks_js"
	],
	"./extra/ksb.js": [
		75443,
		"node_modules_angular_common_locales_extra_ksb_js"
	],
	"./extra/ksf.js": [
		22203,
		"node_modules_angular_common_locales_extra_ksf_js"
	],
	"./extra/ksh.js": [
		55926,
		"node_modules_angular_common_locales_extra_ksh_js"
	],
	"./extra/ku.js": [
		31937,
		"node_modules_angular_common_locales_extra_ku_js"
	],
	"./extra/kw.js": [
		18115,
		"node_modules_angular_common_locales_extra_kw_js"
	],
	"./extra/ky.js": [
		83299,
		"node_modules_angular_common_locales_extra_ky_js"
	],
	"./extra/lag.js": [
		18336,
		"node_modules_angular_common_locales_extra_lag_js"
	],
	"./extra/lb.js": [
		53385,
		"node_modules_angular_common_locales_extra_lb_js"
	],
	"./extra/lg.js": [
		48943,
		"node_modules_angular_common_locales_extra_lg_js"
	],
	"./extra/lkt.js": [
		12242,
		"node_modules_angular_common_locales_extra_lkt_js"
	],
	"./extra/ln-AO.js": [
		58473,
		"node_modules_angular_common_locales_extra_ln-AO_js"
	],
	"./extra/ln-CF.js": [
		40491,
		"node_modules_angular_common_locales_extra_ln-CF_js"
	],
	"./extra/ln-CG.js": [
		5812,
		"node_modules_angular_common_locales_extra_ln-CG_js"
	],
	"./extra/ln.js": [
		28805,
		"node_modules_angular_common_locales_extra_ln_js"
	],
	"./extra/lo.js": [
		9565,
		"node_modules_angular_common_locales_extra_lo_js"
	],
	"./extra/lrc-IQ.js": [
		49094,
		"node_modules_angular_common_locales_extra_lrc-IQ_js"
	],
	"./extra/lrc.js": [
		38338,
		"node_modules_angular_common_locales_extra_lrc_js"
	],
	"./extra/lt.js": [
		76725,
		"node_modules_angular_common_locales_extra_lt_js"
	],
	"./extra/lu.js": [
		4996,
		"node_modules_angular_common_locales_extra_lu_js"
	],
	"./extra/luo.js": [
		14545,
		"node_modules_angular_common_locales_extra_luo_js"
	],
	"./extra/luy.js": [
		67990,
		"node_modules_angular_common_locales_extra_luy_js"
	],
	"./extra/lv.js": [
		48337,
		"node_modules_angular_common_locales_extra_lv_js"
	],
	"./extra/mas-TZ.js": [
		80606,
		"node_modules_angular_common_locales_extra_mas-TZ_js"
	],
	"./extra/mas.js": [
		83866,
		"node_modules_angular_common_locales_extra_mas_js"
	],
	"./extra/mer.js": [
		26102,
		"node_modules_angular_common_locales_extra_mer_js"
	],
	"./extra/mfe.js": [
		3768,
		"node_modules_angular_common_locales_extra_mfe_js"
	],
	"./extra/mg.js": [
		14271,
		"node_modules_angular_common_locales_extra_mg_js"
	],
	"./extra/mgh.js": [
		65755,
		"node_modules_angular_common_locales_extra_mgh_js"
	],
	"./extra/mgo.js": [
		63515,
		"node_modules_angular_common_locales_extra_mgo_js"
	],
	"./extra/mi.js": [
		28712,
		"node_modules_angular_common_locales_extra_mi_js"
	],
	"./extra/mk.js": [
		53796,
		"node_modules_angular_common_locales_extra_mk_js"
	],
	"./extra/ml.js": [
		48795,
		"node_modules_angular_common_locales_extra_ml_js"
	],
	"./extra/mn.js": [
		86503,
		"node_modules_angular_common_locales_extra_mn_js"
	],
	"./extra/mr.js": [
		81563,
		"node_modules_angular_common_locales_extra_mr_js"
	],
	"./extra/ms-BN.js": [
		57444,
		"node_modules_angular_common_locales_extra_ms-BN_js"
	],
	"./extra/ms-SG.js": [
		75705,
		"node_modules_angular_common_locales_extra_ms-SG_js"
	],
	"./extra/ms.js": [
		18488,
		"node_modules_angular_common_locales_extra_ms_js"
	],
	"./extra/mt.js": [
		77466,
		"node_modules_angular_common_locales_extra_mt_js"
	],
	"./extra/mua.js": [
		53894,
		"node_modules_angular_common_locales_extra_mua_js"
	],
	"./extra/my.js": [
		6686,
		"node_modules_angular_common_locales_extra_my_js"
	],
	"./extra/mzn.js": [
		19643,
		"node_modules_angular_common_locales_extra_mzn_js"
	],
	"./extra/naq.js": [
		30444,
		"node_modules_angular_common_locales_extra_naq_js"
	],
	"./extra/nb-SJ.js": [
		75969,
		"node_modules_angular_common_locales_extra_nb-SJ_js"
	],
	"./extra/nb.js": [
		55402,
		"node_modules_angular_common_locales_extra_nb_js"
	],
	"./extra/nd.js": [
		68723,
		"node_modules_angular_common_locales_extra_nd_js"
	],
	"./extra/nds-NL.js": [
		59349,
		"node_modules_angular_common_locales_extra_nds-NL_js"
	],
	"./extra/nds.js": [
		5897,
		"node_modules_angular_common_locales_extra_nds_js"
	],
	"./extra/ne-IN.js": [
		60546,
		"node_modules_angular_common_locales_extra_ne-IN_js"
	],
	"./extra/ne.js": [
		34261,
		"node_modules_angular_common_locales_extra_ne_js"
	],
	"./extra/nl-AW.js": [
		69044,
		"node_modules_angular_common_locales_extra_nl-AW_js"
	],
	"./extra/nl-BE.js": [
		57807,
		"node_modules_angular_common_locales_extra_nl-BE_js"
	],
	"./extra/nl-BQ.js": [
		72271,
		"node_modules_angular_common_locales_extra_nl-BQ_js"
	],
	"./extra/nl-CW.js": [
		67861,
		"node_modules_angular_common_locales_extra_nl-CW_js"
	],
	"./extra/nl-SR.js": [
		18195,
		"node_modules_angular_common_locales_extra_nl-SR_js"
	],
	"./extra/nl-SX.js": [
		12585,
		"node_modules_angular_common_locales_extra_nl-SX_js"
	],
	"./extra/nl.js": [
		7485,
		"node_modules_angular_common_locales_extra_nl_js"
	],
	"./extra/nmg.js": [
		14210,
		"node_modules_angular_common_locales_extra_nmg_js"
	],
	"./extra/nn.js": [
		28261,
		"node_modules_angular_common_locales_extra_nn_js"
	],
	"./extra/nnh.js": [
		99454,
		"node_modules_angular_common_locales_extra_nnh_js"
	],
	"./extra/nus.js": [
		75829,
		"node_modules_angular_common_locales_extra_nus_js"
	],
	"./extra/nyn.js": [
		79795,
		"node_modules_angular_common_locales_extra_nyn_js"
	],
	"./extra/om-KE.js": [
		97140,
		"node_modules_angular_common_locales_extra_om-KE_js"
	],
	"./extra/om.js": [
		19080,
		"node_modules_angular_common_locales_extra_om_js"
	],
	"./extra/or.js": [
		40954,
		"node_modules_angular_common_locales_extra_or_js"
	],
	"./extra/os-RU.js": [
		97315,
		"node_modules_angular_common_locales_extra_os-RU_js"
	],
	"./extra/os.js": [
		18162,
		"node_modules_angular_common_locales_extra_os_js"
	],
	"./extra/pa-Arab.js": [
		85328,
		"node_modules_angular_common_locales_extra_pa-Arab_js"
	],
	"./extra/pa-Guru.js": [
		77258,
		"node_modules_angular_common_locales_extra_pa-Guru_js"
	],
	"./extra/pa.js": [
		22094,
		"node_modules_angular_common_locales_extra_pa_js"
	],
	"./extra/pl.js": [
		99362,
		"node_modules_angular_common_locales_extra_pl_js"
	],
	"./extra/prg.js": [
		85578,
		"node_modules_angular_common_locales_extra_prg_js"
	],
	"./extra/ps-PK.js": [
		80419,
		"node_modules_angular_common_locales_extra_ps-PK_js"
	],
	"./extra/ps.js": [
		45866,
		"node_modules_angular_common_locales_extra_ps_js"
	],
	"./extra/pt-AO.js": [
		56001,
		"node_modules_angular_common_locales_extra_pt-AO_js"
	],
	"./extra/pt-CH.js": [
		81896,
		"node_modules_angular_common_locales_extra_pt-CH_js"
	],
	"./extra/pt-CV.js": [
		72230,
		"node_modules_angular_common_locales_extra_pt-CV_js"
	],
	"./extra/pt-GQ.js": [
		36639,
		"node_modules_angular_common_locales_extra_pt-GQ_js"
	],
	"./extra/pt-GW.js": [
		90593,
		"node_modules_angular_common_locales_extra_pt-GW_js"
	],
	"./extra/pt-LU.js": [
		87823,
		"node_modules_angular_common_locales_extra_pt-LU_js"
	],
	"./extra/pt-MO.js": [
		92066,
		"node_modules_angular_common_locales_extra_pt-MO_js"
	],
	"./extra/pt-MZ.js": [
		22867,
		"node_modules_angular_common_locales_extra_pt-MZ_js"
	],
	"./extra/pt-PT.js": [
		52366,
		"node_modules_angular_common_locales_extra_pt-PT_js"
	],
	"./extra/pt-ST.js": [
		28918,
		"node_modules_angular_common_locales_extra_pt-ST_js"
	],
	"./extra/pt-TL.js": [
		48838,
		"node_modules_angular_common_locales_extra_pt-TL_js"
	],
	"./extra/pt.js": [
		38242,
		"node_modules_angular_common_locales_extra_pt_js"
	],
	"./extra/qu-BO.js": [
		37020,
		"node_modules_angular_common_locales_extra_qu-BO_js"
	],
	"./extra/qu-EC.js": [
		13174,
		"node_modules_angular_common_locales_extra_qu-EC_js"
	],
	"./extra/qu.js": [
		28912,
		"node_modules_angular_common_locales_extra_qu_js"
	],
	"./extra/rm.js": [
		11688,
		"node_modules_angular_common_locales_extra_rm_js"
	],
	"./extra/rn.js": [
		40051,
		"node_modules_angular_common_locales_extra_rn_js"
	],
	"./extra/ro-MD.js": [
		18902,
		"node_modules_angular_common_locales_extra_ro-MD_js"
	],
	"./extra/ro.js": [
		8389,
		"node_modules_angular_common_locales_extra_ro_js"
	],
	"./extra/rof.js": [
		13155,
		"node_modules_angular_common_locales_extra_rof_js"
	],
	"./extra/root.js": [
		54122,
		"node_modules_angular_common_locales_extra_root_js"
	],
	"./extra/ru-BY.js": [
		46696,
		"node_modules_angular_common_locales_extra_ru-BY_js"
	],
	"./extra/ru-KG.js": [
		1086,
		"node_modules_angular_common_locales_extra_ru-KG_js"
	],
	"./extra/ru-KZ.js": [
		39724,
		"node_modules_angular_common_locales_extra_ru-KZ_js"
	],
	"./extra/ru-MD.js": [
		79441,
		"node_modules_angular_common_locales_extra_ru-MD_js"
	],
	"./extra/ru-UA.js": [
		8502,
		"node_modules_angular_common_locales_extra_ru-UA_js"
	],
	"./extra/ru.js": [
		2284,
		"node_modules_angular_common_locales_extra_ru_js"
	],
	"./extra/rw.js": [
		69514,
		"node_modules_angular_common_locales_extra_rw_js"
	],
	"./extra/rwk.js": [
		75293,
		"node_modules_angular_common_locales_extra_rwk_js"
	],
	"./extra/sah.js": [
		93773,
		"node_modules_angular_common_locales_extra_sah_js"
	],
	"./extra/saq.js": [
		81681,
		"node_modules_angular_common_locales_extra_saq_js"
	],
	"./extra/sbp.js": [
		93899,
		"node_modules_angular_common_locales_extra_sbp_js"
	],
	"./extra/sd-Arab.js": [
		7501,
		"node_modules_angular_common_locales_extra_sd-Arab_js"
	],
	"./extra/sd.js": [
		53337,
		"node_modules_angular_common_locales_extra_sd_js"
	],
	"./extra/se-FI.js": [
		99712,
		"node_modules_angular_common_locales_extra_se-FI_js"
	],
	"./extra/se-SE.js": [
		14703,
		"node_modules_angular_common_locales_extra_se-SE_js"
	],
	"./extra/se.js": [
		39559,
		"node_modules_angular_common_locales_extra_se_js"
	],
	"./extra/seh.js": [
		24405,
		"node_modules_angular_common_locales_extra_seh_js"
	],
	"./extra/ses.js": [
		182,
		"node_modules_angular_common_locales_extra_ses_js"
	],
	"./extra/sg.js": [
		69399,
		"node_modules_angular_common_locales_extra_sg_js"
	],
	"./extra/shi-Latn.js": [
		73281,
		"node_modules_angular_common_locales_extra_shi-Latn_js"
	],
	"./extra/shi-Tfng.js": [
		52581,
		"node_modules_angular_common_locales_extra_shi-Tfng_js"
	],
	"./extra/shi.js": [
		41958,
		"node_modules_angular_common_locales_extra_shi_js"
	],
	"./extra/si.js": [
		77724,
		"node_modules_angular_common_locales_extra_si_js"
	],
	"./extra/sk.js": [
		70244,
		"node_modules_angular_common_locales_extra_sk_js"
	],
	"./extra/sl.js": [
		21717,
		"node_modules_angular_common_locales_extra_sl_js"
	],
	"./extra/smn.js": [
		65927,
		"node_modules_angular_common_locales_extra_smn_js"
	],
	"./extra/sn.js": [
		57721,
		"node_modules_angular_common_locales_extra_sn_js"
	],
	"./extra/so-DJ.js": [
		19995,
		"node_modules_angular_common_locales_extra_so-DJ_js"
	],
	"./extra/so-ET.js": [
		31037,
		"node_modules_angular_common_locales_extra_so-ET_js"
	],
	"./extra/so-KE.js": [
		69351,
		"node_modules_angular_common_locales_extra_so-KE_js"
	],
	"./extra/so.js": [
		50605,
		"node_modules_angular_common_locales_extra_so_js"
	],
	"./extra/sq-MK.js": [
		29802,
		"node_modules_angular_common_locales_extra_sq-MK_js"
	],
	"./extra/sq-XK.js": [
		46914,
		"node_modules_angular_common_locales_extra_sq-XK_js"
	],
	"./extra/sq.js": [
		52546,
		"node_modules_angular_common_locales_extra_sq_js"
	],
	"./extra/sr-Cyrl-BA.js": [
		69750,
		"node_modules_angular_common_locales_extra_sr-Cyrl-BA_js"
	],
	"./extra/sr-Cyrl-ME.js": [
		35722,
		"node_modules_angular_common_locales_extra_sr-Cyrl-ME_js"
	],
	"./extra/sr-Cyrl-XK.js": [
		3493,
		"node_modules_angular_common_locales_extra_sr-Cyrl-XK_js"
	],
	"./extra/sr-Cyrl.js": [
		81889,
		"node_modules_angular_common_locales_extra_sr-Cyrl_js"
	],
	"./extra/sr-Latn-BA.js": [
		40269,
		"node_modules_angular_common_locales_extra_sr-Latn-BA_js"
	],
	"./extra/sr-Latn-ME.js": [
		48533,
		"node_modules_angular_common_locales_extra_sr-Latn-ME_js"
	],
	"./extra/sr-Latn-XK.js": [
		91857,
		"node_modules_angular_common_locales_extra_sr-Latn-XK_js"
	],
	"./extra/sr-Latn.js": [
		95678,
		"node_modules_angular_common_locales_extra_sr-Latn_js"
	],
	"./extra/sr.js": [
		56324,
		"node_modules_angular_common_locales_extra_sr_js"
	],
	"./extra/sv-AX.js": [
		63337,
		"node_modules_angular_common_locales_extra_sv-AX_js"
	],
	"./extra/sv-FI.js": [
		31133,
		"node_modules_angular_common_locales_extra_sv-FI_js"
	],
	"./extra/sv.js": [
		91008,
		"node_modules_angular_common_locales_extra_sv_js"
	],
	"./extra/sw-CD.js": [
		44596,
		"node_modules_angular_common_locales_extra_sw-CD_js"
	],
	"./extra/sw-KE.js": [
		96125,
		"node_modules_angular_common_locales_extra_sw-KE_js"
	],
	"./extra/sw-UG.js": [
		8171,
		"node_modules_angular_common_locales_extra_sw-UG_js"
	],
	"./extra/sw.js": [
		13032,
		"node_modules_angular_common_locales_extra_sw_js"
	],
	"./extra/ta-LK.js": [
		24758,
		"node_modules_angular_common_locales_extra_ta-LK_js"
	],
	"./extra/ta-MY.js": [
		46723,
		"node_modules_angular_common_locales_extra_ta-MY_js"
	],
	"./extra/ta-SG.js": [
		9426,
		"node_modules_angular_common_locales_extra_ta-SG_js"
	],
	"./extra/ta.js": [
		11571,
		"node_modules_angular_common_locales_extra_ta_js"
	],
	"./extra/te.js": [
		18717,
		"node_modules_angular_common_locales_extra_te_js"
	],
	"./extra/teo-KE.js": [
		55498,
		"node_modules_angular_common_locales_extra_teo-KE_js"
	],
	"./extra/teo.js": [
		92283,
		"node_modules_angular_common_locales_extra_teo_js"
	],
	"./extra/tg.js": [
		31700,
		"node_modules_angular_common_locales_extra_tg_js"
	],
	"./extra/th.js": [
		52150,
		"node_modules_angular_common_locales_extra_th_js"
	],
	"./extra/ti-ER.js": [
		81751,
		"node_modules_angular_common_locales_extra_ti-ER_js"
	],
	"./extra/ti.js": [
		82606,
		"node_modules_angular_common_locales_extra_ti_js"
	],
	"./extra/tk.js": [
		39696,
		"node_modules_angular_common_locales_extra_tk_js"
	],
	"./extra/to.js": [
		71710,
		"node_modules_angular_common_locales_extra_to_js"
	],
	"./extra/tr-CY.js": [
		89005,
		"node_modules_angular_common_locales_extra_tr-CY_js"
	],
	"./extra/tr.js": [
		10474,
		"node_modules_angular_common_locales_extra_tr_js"
	],
	"./extra/tt.js": [
		45025,
		"node_modules_angular_common_locales_extra_tt_js"
	],
	"./extra/twq.js": [
		3081,
		"node_modules_angular_common_locales_extra_twq_js"
	],
	"./extra/tzm.js": [
		16416,
		"node_modules_angular_common_locales_extra_tzm_js"
	],
	"./extra/ug.js": [
		81633,
		"node_modules_angular_common_locales_extra_ug_js"
	],
	"./extra/uk.js": [
		71225,
		"node_modules_angular_common_locales_extra_uk_js"
	],
	"./extra/ur-IN.js": [
		86170,
		"node_modules_angular_common_locales_extra_ur-IN_js"
	],
	"./extra/ur.js": [
		9154,
		"node_modules_angular_common_locales_extra_ur_js"
	],
	"./extra/uz-Arab.js": [
		90031,
		"node_modules_angular_common_locales_extra_uz-Arab_js"
	],
	"./extra/uz-Cyrl.js": [
		82608,
		"node_modules_angular_common_locales_extra_uz-Cyrl_js"
	],
	"./extra/uz-Latn.js": [
		82986,
		"node_modules_angular_common_locales_extra_uz-Latn_js"
	],
	"./extra/uz.js": [
		43463,
		"node_modules_angular_common_locales_extra_uz_js"
	],
	"./extra/vai-Latn.js": [
		31293,
		"node_modules_angular_common_locales_extra_vai-Latn_js"
	],
	"./extra/vai-Vaii.js": [
		76371,
		"node_modules_angular_common_locales_extra_vai-Vaii_js"
	],
	"./extra/vai.js": [
		30938,
		"node_modules_angular_common_locales_extra_vai_js"
	],
	"./extra/vi.js": [
		38898,
		"node_modules_angular_common_locales_extra_vi_js"
	],
	"./extra/vo.js": [
		35487,
		"node_modules_angular_common_locales_extra_vo_js"
	],
	"./extra/vun.js": [
		42633,
		"node_modules_angular_common_locales_extra_vun_js"
	],
	"./extra/wae.js": [
		42132,
		"node_modules_angular_common_locales_extra_wae_js"
	],
	"./extra/wo.js": [
		17637,
		"node_modules_angular_common_locales_extra_wo_js"
	],
	"./extra/xh.js": [
		20573,
		"node_modules_angular_common_locales_extra_xh_js"
	],
	"./extra/xog.js": [
		66959,
		"node_modules_angular_common_locales_extra_xog_js"
	],
	"./extra/yav.js": [
		23860,
		"node_modules_angular_common_locales_extra_yav_js"
	],
	"./extra/yi.js": [
		3365,
		"node_modules_angular_common_locales_extra_yi_js"
	],
	"./extra/yo-BJ.js": [
		58402,
		"node_modules_angular_common_locales_extra_yo-BJ_js"
	],
	"./extra/yo.js": [
		39478,
		"node_modules_angular_common_locales_extra_yo_js"
	],
	"./extra/yue-Hans.js": [
		385,
		"node_modules_angular_common_locales_extra_yue-Hans_js"
	],
	"./extra/yue-Hant.js": [
		81395,
		"node_modules_angular_common_locales_extra_yue-Hant_js"
	],
	"./extra/yue.js": [
		38361,
		"node_modules_angular_common_locales_extra_yue_js"
	],
	"./extra/zgh.js": [
		59243,
		"node_modules_angular_common_locales_extra_zgh_js"
	],
	"./extra/zh-Hans-HK.js": [
		76097,
		"node_modules_angular_common_locales_extra_zh-Hans-HK_js"
	],
	"./extra/zh-Hans-MO.js": [
		1132,
		"node_modules_angular_common_locales_extra_zh-Hans-MO_js"
	],
	"./extra/zh-Hans-SG.js": [
		35686,
		"node_modules_angular_common_locales_extra_zh-Hans-SG_js"
	],
	"./extra/zh-Hans.js": [
		30598,
		"node_modules_angular_common_locales_extra_zh-Hans_js"
	],
	"./extra/zh-Hant-HK.js": [
		86914,
		"node_modules_angular_common_locales_extra_zh-Hant-HK_js"
	],
	"./extra/zh-Hant-MO.js": [
		35625,
		"node_modules_angular_common_locales_extra_zh-Hant-MO_js"
	],
	"./extra/zh-Hant.js": [
		88605,
		"node_modules_angular_common_locales_extra_zh-Hant_js"
	],
	"./extra/zh.js": [
		258,
		"node_modules_angular_common_locales_extra_zh_js"
	],
	"./extra/zu.js": [
		59687,
		"node_modules_angular_common_locales_extra_zu_js"
	],
	"./fa-AF.js": [
		3242,
		"node_modules_angular_common_locales_fa-AF_js"
	],
	"./fa.js": [
		96707,
		"node_modules_angular_common_locales_fa_js"
	],
	"./ff-CM.js": [
		42563,
		"node_modules_angular_common_locales_ff-CM_js"
	],
	"./ff-GN.js": [
		4016,
		"node_modules_angular_common_locales_ff-GN_js"
	],
	"./ff-Latn-BF.js": [
		63958,
		"node_modules_angular_common_locales_ff-Latn-BF_js"
	],
	"./ff-Latn-CM.js": [
		38415,
		"node_modules_angular_common_locales_ff-Latn-CM_js"
	],
	"./ff-Latn-GH.js": [
		50546,
		"node_modules_angular_common_locales_ff-Latn-GH_js"
	],
	"./ff-Latn-GM.js": [
		39531,
		"node_modules_angular_common_locales_ff-Latn-GM_js"
	],
	"./ff-Latn-GN.js": [
		87160,
		"node_modules_angular_common_locales_ff-Latn-GN_js"
	],
	"./ff-Latn-GW.js": [
		42849,
		"node_modules_angular_common_locales_ff-Latn-GW_js"
	],
	"./ff-Latn-LR.js": [
		66756,
		"node_modules_angular_common_locales_ff-Latn-LR_js"
	],
	"./ff-Latn-MR.js": [
		28207,
		"node_modules_angular_common_locales_ff-Latn-MR_js"
	],
	"./ff-Latn-NE.js": [
		99705,
		"node_modules_angular_common_locales_ff-Latn-NE_js"
	],
	"./ff-Latn-NG.js": [
		76945,
		"node_modules_angular_common_locales_ff-Latn-NG_js"
	],
	"./ff-Latn-SL.js": [
		77021,
		"node_modules_angular_common_locales_ff-Latn-SL_js"
	],
	"./ff-Latn.js": [
		92410,
		"node_modules_angular_common_locales_ff-Latn_js"
	],
	"./ff-MR.js": [
		63086,
		"node_modules_angular_common_locales_ff-MR_js"
	],
	"./ff.js": [
		74028,
		"node_modules_angular_common_locales_ff_js"
	],
	"./fi.js": [
		96985,
		"node_modules_angular_common_locales_fi_js"
	],
	"./fil.js": [
		52872,
		"node_modules_angular_common_locales_fil_js"
	],
	"./fo-DK.js": [
		81963,
		"node_modules_angular_common_locales_fo-DK_js"
	],
	"./fo.js": [
		75543,
		"node_modules_angular_common_locales_fo_js"
	],
	"./fr-BE.js": [
		33841,
		"node_modules_angular_common_locales_fr-BE_js"
	],
	"./fr-BF.js": [
		56366,
		"node_modules_angular_common_locales_fr-BF_js"
	],
	"./fr-BI.js": [
		84065,
		"node_modules_angular_common_locales_fr-BI_js"
	],
	"./fr-BJ.js": [
		53651,
		"node_modules_angular_common_locales_fr-BJ_js"
	],
	"./fr-BL.js": [
		72933,
		"node_modules_angular_common_locales_fr-BL_js"
	],
	"./fr-CA.js": [
		50730,
		"node_modules_angular_common_locales_fr-CA_js"
	],
	"./fr-CD.js": [
		55514,
		"node_modules_angular_common_locales_fr-CD_js"
	],
	"./fr-CF.js": [
		15850,
		"node_modules_angular_common_locales_fr-CF_js"
	],
	"./fr-CG.js": [
		40071,
		"node_modules_angular_common_locales_fr-CG_js"
	],
	"./fr-CH.js": [
		95067,
		"node_modules_angular_common_locales_fr-CH_js"
	],
	"./fr-CI.js": [
		90945,
		"node_modules_angular_common_locales_fr-CI_js"
	],
	"./fr-CM.js": [
		75283,
		"node_modules_angular_common_locales_fr-CM_js"
	],
	"./fr-DJ.js": [
		57516,
		"node_modules_angular_common_locales_fr-DJ_js"
	],
	"./fr-DZ.js": [
		46712,
		"node_modules_angular_common_locales_fr-DZ_js"
	],
	"./fr-GA.js": [
		70667,
		"node_modules_angular_common_locales_fr-GA_js"
	],
	"./fr-GF.js": [
		75152,
		"node_modules_angular_common_locales_fr-GF_js"
	],
	"./fr-GN.js": [
		51791,
		"node_modules_angular_common_locales_fr-GN_js"
	],
	"./fr-GP.js": [
		9724,
		"node_modules_angular_common_locales_fr-GP_js"
	],
	"./fr-GQ.js": [
		84046,
		"node_modules_angular_common_locales_fr-GQ_js"
	],
	"./fr-HT.js": [
		81327,
		"node_modules_angular_common_locales_fr-HT_js"
	],
	"./fr-KM.js": [
		18157,
		"node_modules_angular_common_locales_fr-KM_js"
	],
	"./fr-LU.js": [
		91677,
		"node_modules_angular_common_locales_fr-LU_js"
	],
	"./fr-MA.js": [
		81691,
		"node_modules_angular_common_locales_fr-MA_js"
	],
	"./fr-MC.js": [
		98252,
		"node_modules_angular_common_locales_fr-MC_js"
	],
	"./fr-MF.js": [
		29036,
		"node_modules_angular_common_locales_fr-MF_js"
	],
	"./fr-MG.js": [
		81813,
		"node_modules_angular_common_locales_fr-MG_js"
	],
	"./fr-ML.js": [
		24691,
		"node_modules_angular_common_locales_fr-ML_js"
	],
	"./fr-MQ.js": [
		45733,
		"node_modules_angular_common_locales_fr-MQ_js"
	],
	"./fr-MR.js": [
		21218,
		"node_modules_angular_common_locales_fr-MR_js"
	],
	"./fr-MU.js": [
		12466,
		"node_modules_angular_common_locales_fr-MU_js"
	],
	"./fr-NC.js": [
		29938,
		"node_modules_angular_common_locales_fr-NC_js"
	],
	"./fr-NE.js": [
		50702,
		"node_modules_angular_common_locales_fr-NE_js"
	],
	"./fr-PF.js": [
		83502,
		"node_modules_angular_common_locales_fr-PF_js"
	],
	"./fr-PM.js": [
		70629,
		"node_modules_angular_common_locales_fr-PM_js"
	],
	"./fr-RE.js": [
		29100,
		"node_modules_angular_common_locales_fr-RE_js"
	],
	"./fr-RW.js": [
		28897,
		"node_modules_angular_common_locales_fr-RW_js"
	],
	"./fr-SC.js": [
		49146,
		"node_modules_angular_common_locales_fr-SC_js"
	],
	"./fr-SN.js": [
		72867,
		"node_modules_angular_common_locales_fr-SN_js"
	],
	"./fr-SY.js": [
		36557,
		"node_modules_angular_common_locales_fr-SY_js"
	],
	"./fr-TD.js": [
		30551,
		"node_modules_angular_common_locales_fr-TD_js"
	],
	"./fr-TG.js": [
		40817,
		"node_modules_angular_common_locales_fr-TG_js"
	],
	"./fr-TN.js": [
		61985,
		"node_modules_angular_common_locales_fr-TN_js"
	],
	"./fr-VU.js": [
		60560,
		"node_modules_angular_common_locales_fr-VU_js"
	],
	"./fr-WF.js": [
		38875,
		"node_modules_angular_common_locales_fr-WF_js"
	],
	"./fr-YT.js": [
		36188,
		"node_modules_angular_common_locales_fr-YT_js"
	],
	"./fr.js": [
		9575,
		"node_modules_angular_common_locales_fr_js"
	],
	"./fur.js": [
		75945,
		"node_modules_angular_common_locales_fur_js"
	],
	"./fy.js": [
		60589,
		"node_modules_angular_common_locales_fy_js"
	],
	"./ga-GB.js": [
		89693,
		"node_modules_angular_common_locales_ga-GB_js"
	],
	"./ga.js": [
		85767,
		"node_modules_angular_common_locales_ga_js"
	],
	"./gd.js": [
		85535,
		"node_modules_angular_common_locales_gd_js"
	],
	"./gl.js": [
		47385,
		"node_modules_angular_common_locales_gl_js"
	],
	"./global/af-NA.js": [
		11986,
		"node_modules_angular_common_locales_global_af-NA_js"
	],
	"./global/af.js": [
		46252,
		"node_modules_angular_common_locales_global_af_js"
	],
	"./global/agq.js": [
		93355,
		"node_modules_angular_common_locales_global_agq_js"
	],
	"./global/ak.js": [
		34385,
		"node_modules_angular_common_locales_global_ak_js"
	],
	"./global/am.js": [
		95517,
		"node_modules_angular_common_locales_global_am_js"
	],
	"./global/ar-AE.js": [
		62361,
		"node_modules_angular_common_locales_global_ar-AE_js"
	],
	"./global/ar-BH.js": [
		24670,
		"node_modules_angular_common_locales_global_ar-BH_js"
	],
	"./global/ar-DJ.js": [
		80170,
		"node_modules_angular_common_locales_global_ar-DJ_js"
	],
	"./global/ar-DZ.js": [
		97748,
		"node_modules_angular_common_locales_global_ar-DZ_js"
	],
	"./global/ar-EG.js": [
		9225,
		"node_modules_angular_common_locales_global_ar-EG_js"
	],
	"./global/ar-EH.js": [
		38209,
		"node_modules_angular_common_locales_global_ar-EH_js"
	],
	"./global/ar-ER.js": [
		35385,
		"node_modules_angular_common_locales_global_ar-ER_js"
	],
	"./global/ar-IL.js": [
		62107,
		"node_modules_angular_common_locales_global_ar-IL_js"
	],
	"./global/ar-IQ.js": [
		79435,
		"node_modules_angular_common_locales_global_ar-IQ_js"
	],
	"./global/ar-JO.js": [
		92682,
		"node_modules_angular_common_locales_global_ar-JO_js"
	],
	"./global/ar-KM.js": [
		29283,
		"node_modules_angular_common_locales_global_ar-KM_js"
	],
	"./global/ar-KW.js": [
		48261,
		"node_modules_angular_common_locales_global_ar-KW_js"
	],
	"./global/ar-LB.js": [
		63605,
		"node_modules_angular_common_locales_global_ar-LB_js"
	],
	"./global/ar-LY.js": [
		43193,
		"node_modules_angular_common_locales_global_ar-LY_js"
	],
	"./global/ar-MA.js": [
		80653,
		"node_modules_angular_common_locales_global_ar-MA_js"
	],
	"./global/ar-MR.js": [
		47232,
		"node_modules_angular_common_locales_global_ar-MR_js"
	],
	"./global/ar-OM.js": [
		38015,
		"node_modules_angular_common_locales_global_ar-OM_js"
	],
	"./global/ar-PS.js": [
		75171,
		"node_modules_angular_common_locales_global_ar-PS_js"
	],
	"./global/ar-QA.js": [
		35376,
		"node_modules_angular_common_locales_global_ar-QA_js"
	],
	"./global/ar-SA.js": [
		11135,
		"node_modules_angular_common_locales_global_ar-SA_js"
	],
	"./global/ar-SD.js": [
		31294,
		"node_modules_angular_common_locales_global_ar-SD_js"
	],
	"./global/ar-SO.js": [
		81521,
		"node_modules_angular_common_locales_global_ar-SO_js"
	],
	"./global/ar-SS.js": [
		65814,
		"node_modules_angular_common_locales_global_ar-SS_js"
	],
	"./global/ar-SY.js": [
		20671,
		"node_modules_angular_common_locales_global_ar-SY_js"
	],
	"./global/ar-TD.js": [
		97696,
		"node_modules_angular_common_locales_global_ar-TD_js"
	],
	"./global/ar-TN.js": [
		16803,
		"node_modules_angular_common_locales_global_ar-TN_js"
	],
	"./global/ar-YE.js": [
		15764,
		"node_modules_angular_common_locales_global_ar-YE_js"
	],
	"./global/ar.js": [
		88367,
		"node_modules_angular_common_locales_global_ar_js"
	],
	"./global/as.js": [
		44776,
		"node_modules_angular_common_locales_global_as_js"
	],
	"./global/asa.js": [
		93371,
		"node_modules_angular_common_locales_global_asa_js"
	],
	"./global/ast.js": [
		42552,
		"node_modules_angular_common_locales_global_ast_js"
	],
	"./global/az-Cyrl.js": [
		48088,
		"node_modules_angular_common_locales_global_az-Cyrl_js"
	],
	"./global/az-Latn.js": [
		12962,
		"node_modules_angular_common_locales_global_az-Latn_js"
	],
	"./global/az.js": [
		99132,
		"node_modules_angular_common_locales_global_az_js"
	],
	"./global/bas.js": [
		45057,
		"node_modules_angular_common_locales_global_bas_js"
	],
	"./global/be.js": [
		26138,
		"node_modules_angular_common_locales_global_be_js"
	],
	"./global/bem.js": [
		81382,
		"node_modules_angular_common_locales_global_bem_js"
	],
	"./global/bez.js": [
		63183,
		"node_modules_angular_common_locales_global_bez_js"
	],
	"./global/bg.js": [
		15217,
		"node_modules_angular_common_locales_global_bg_js"
	],
	"./global/bm.js": [
		41655,
		"node_modules_angular_common_locales_global_bm_js"
	],
	"./global/bn-IN.js": [
		56708,
		"node_modules_angular_common_locales_global_bn-IN_js"
	],
	"./global/bn.js": [
		31602,
		"node_modules_angular_common_locales_global_bn_js"
	],
	"./global/bo-IN.js": [
		86391,
		"node_modules_angular_common_locales_global_bo-IN_js"
	],
	"./global/bo.js": [
		42171,
		"node_modules_angular_common_locales_global_bo_js"
	],
	"./global/br.js": [
		44206,
		"node_modules_angular_common_locales_global_br_js"
	],
	"./global/brx.js": [
		25544,
		"node_modules_angular_common_locales_global_brx_js"
	],
	"./global/bs-Cyrl.js": [
		43957,
		"node_modules_angular_common_locales_global_bs-Cyrl_js"
	],
	"./global/bs-Latn.js": [
		10195,
		"node_modules_angular_common_locales_global_bs-Latn_js"
	],
	"./global/bs.js": [
		67767,
		"node_modules_angular_common_locales_global_bs_js"
	],
	"./global/ca-AD.js": [
		16045,
		"node_modules_angular_common_locales_global_ca-AD_js"
	],
	"./global/ca-ES-VALENCIA.js": [
		91058,
		"node_modules_angular_common_locales_global_ca-ES-VALENCIA_js"
	],
	"./global/ca-FR.js": [
		78908,
		"node_modules_angular_common_locales_global_ca-FR_js"
	],
	"./global/ca-IT.js": [
		89854,
		"node_modules_angular_common_locales_global_ca-IT_js"
	],
	"./global/ca.js": [
		92162,
		"node_modules_angular_common_locales_global_ca_js"
	],
	"./global/ccp-IN.js": [
		5806,
		"node_modules_angular_common_locales_global_ccp-IN_js"
	],
	"./global/ccp.js": [
		91473,
		"node_modules_angular_common_locales_global_ccp_js"
	],
	"./global/ce.js": [
		34277,
		"node_modules_angular_common_locales_global_ce_js"
	],
	"./global/ceb.js": [
		13804,
		"node_modules_angular_common_locales_global_ceb_js"
	],
	"./global/cgg.js": [
		68159,
		"node_modules_angular_common_locales_global_cgg_js"
	],
	"./global/chr.js": [
		33240,
		"node_modules_angular_common_locales_global_chr_js"
	],
	"./global/ckb-IR.js": [
		52747,
		"node_modules_angular_common_locales_global_ckb-IR_js"
	],
	"./global/ckb.js": [
		2134,
		"node_modules_angular_common_locales_global_ckb_js"
	],
	"./global/cs.js": [
		97506,
		"node_modules_angular_common_locales_global_cs_js"
	],
	"./global/cu.js": [
		76693,
		"node_modules_angular_common_locales_global_cu_js"
	],
	"./global/cy.js": [
		19456,
		"node_modules_angular_common_locales_global_cy_js"
	],
	"./global/da-GL.js": [
		63618,
		"node_modules_angular_common_locales_global_da-GL_js"
	],
	"./global/da.js": [
		71271,
		"node_modules_angular_common_locales_global_da_js"
	],
	"./global/dav.js": [
		71711,
		"node_modules_angular_common_locales_global_dav_js"
	],
	"./global/de-AT.js": [
		99485,
		"node_modules_angular_common_locales_global_de-AT_js"
	],
	"./global/de-BE.js": [
		47462,
		"node_modules_angular_common_locales_global_de-BE_js"
	],
	"./global/de-CH.js": [
		71302,
		"node_modules_angular_common_locales_global_de-CH_js"
	],
	"./global/de-IT.js": [
		39351,
		"node_modules_angular_common_locales_global_de-IT_js"
	],
	"./global/de-LI.js": [
		92221,
		"node_modules_angular_common_locales_global_de-LI_js"
	],
	"./global/de-LU.js": [
		52748,
		"node_modules_angular_common_locales_global_de-LU_js"
	],
	"./global/de.js": [
		73228,
		"node_modules_angular_common_locales_global_de_js"
	],
	"./global/dje.js": [
		96612,
		"node_modules_angular_common_locales_global_dje_js"
	],
	"./global/dsb.js": [
		20864,
		"node_modules_angular_common_locales_global_dsb_js"
	],
	"./global/dua.js": [
		75179,
		"node_modules_angular_common_locales_global_dua_js"
	],
	"./global/dyo.js": [
		92444,
		"node_modules_angular_common_locales_global_dyo_js"
	],
	"./global/dz.js": [
		13654,
		"node_modules_angular_common_locales_global_dz_js"
	],
	"./global/ebu.js": [
		37235,
		"node_modules_angular_common_locales_global_ebu_js"
	],
	"./global/ee-TG.js": [
		63819,
		"node_modules_angular_common_locales_global_ee-TG_js"
	],
	"./global/ee.js": [
		58911,
		"node_modules_angular_common_locales_global_ee_js"
	],
	"./global/el-CY.js": [
		79761,
		"node_modules_angular_common_locales_global_el-CY_js"
	],
	"./global/el.js": [
		46930,
		"node_modules_angular_common_locales_global_el_js"
	],
	"./global/en-001.js": [
		82767,
		"node_modules_angular_common_locales_global_en-001_js"
	],
	"./global/en-150.js": [
		25451,
		"node_modules_angular_common_locales_global_en-150_js"
	],
	"./global/en-AE.js": [
		78405,
		"node_modules_angular_common_locales_global_en-AE_js"
	],
	"./global/en-AG.js": [
		83828,
		"node_modules_angular_common_locales_global_en-AG_js"
	],
	"./global/en-AI.js": [
		16455,
		"node_modules_angular_common_locales_global_en-AI_js"
	],
	"./global/en-AS.js": [
		50968,
		"node_modules_angular_common_locales_global_en-AS_js"
	],
	"./global/en-AT.js": [
		20094,
		"node_modules_angular_common_locales_global_en-AT_js"
	],
	"./global/en-AU.js": [
		94705,
		"node_modules_angular_common_locales_global_en-AU_js"
	],
	"./global/en-BB.js": [
		63487,
		"node_modules_angular_common_locales_global_en-BB_js"
	],
	"./global/en-BE.js": [
		64972,
		"node_modules_angular_common_locales_global_en-BE_js"
	],
	"./global/en-BI.js": [
		27731,
		"node_modules_angular_common_locales_global_en-BI_js"
	],
	"./global/en-BM.js": [
		43713,
		"node_modules_angular_common_locales_global_en-BM_js"
	],
	"./global/en-BS.js": [
		42456,
		"node_modules_angular_common_locales_global_en-BS_js"
	],
	"./global/en-BW.js": [
		33922,
		"node_modules_angular_common_locales_global_en-BW_js"
	],
	"./global/en-BZ.js": [
		63547,
		"node_modules_angular_common_locales_global_en-BZ_js"
	],
	"./global/en-CA.js": [
		99723,
		"node_modules_angular_common_locales_global_en-CA_js"
	],
	"./global/en-CC.js": [
		1967,
		"node_modules_angular_common_locales_global_en-CC_js"
	],
	"./global/en-CH.js": [
		18793,
		"node_modules_angular_common_locales_global_en-CH_js"
	],
	"./global/en-CK.js": [
		45882,
		"node_modules_angular_common_locales_global_en-CK_js"
	],
	"./global/en-CM.js": [
		25189,
		"node_modules_angular_common_locales_global_en-CM_js"
	],
	"./global/en-CX.js": [
		32540,
		"node_modules_angular_common_locales_global_en-CX_js"
	],
	"./global/en-CY.js": [
		57901,
		"node_modules_angular_common_locales_global_en-CY_js"
	],
	"./global/en-DE.js": [
		1990,
		"node_modules_angular_common_locales_global_en-DE_js"
	],
	"./global/en-DG.js": [
		2101,
		"node_modules_angular_common_locales_global_en-DG_js"
	],
	"./global/en-DK.js": [
		52732,
		"node_modules_angular_common_locales_global_en-DK_js"
	],
	"./global/en-DM.js": [
		87634,
		"node_modules_angular_common_locales_global_en-DM_js"
	],
	"./global/en-ER.js": [
		42189,
		"node_modules_angular_common_locales_global_en-ER_js"
	],
	"./global/en-FI.js": [
		1706,
		"node_modules_angular_common_locales_global_en-FI_js"
	],
	"./global/en-FJ.js": [
		85198,
		"node_modules_angular_common_locales_global_en-FJ_js"
	],
	"./global/en-FK.js": [
		7191,
		"node_modules_angular_common_locales_global_en-FK_js"
	],
	"./global/en-FM.js": [
		56697,
		"node_modules_angular_common_locales_global_en-FM_js"
	],
	"./global/en-GB.js": [
		57854,
		"node_modules_angular_common_locales_global_en-GB_js"
	],
	"./global/en-GD.js": [
		26512,
		"node_modules_angular_common_locales_global_en-GD_js"
	],
	"./global/en-GG.js": [
		7432,
		"node_modules_angular_common_locales_global_en-GG_js"
	],
	"./global/en-GH.js": [
		8089,
		"node_modules_angular_common_locales_global_en-GH_js"
	],
	"./global/en-GI.js": [
		18023,
		"node_modules_angular_common_locales_global_en-GI_js"
	],
	"./global/en-GM.js": [
		99604,
		"node_modules_angular_common_locales_global_en-GM_js"
	],
	"./global/en-GU.js": [
		4,
		"node_modules_angular_common_locales_global_en-GU_js"
	],
	"./global/en-GY.js": [
		48967,
		"node_modules_angular_common_locales_global_en-GY_js"
	],
	"./global/en-HK.js": [
		64865,
		"node_modules_angular_common_locales_global_en-HK_js"
	],
	"./global/en-IE.js": [
		42039,
		"node_modules_angular_common_locales_global_en-IE_js"
	],
	"./global/en-IL.js": [
		80345,
		"node_modules_angular_common_locales_global_en-IL_js"
	],
	"./global/en-IM.js": [
		25468,
		"node_modules_angular_common_locales_global_en-IM_js"
	],
	"./global/en-IN.js": [
		5388,
		"node_modules_angular_common_locales_global_en-IN_js"
	],
	"./global/en-IO.js": [
		71653,
		"node_modules_angular_common_locales_global_en-IO_js"
	],
	"./global/en-JE.js": [
		13491,
		"node_modules_angular_common_locales_global_en-JE_js"
	],
	"./global/en-JM.js": [
		95333,
		"node_modules_angular_common_locales_global_en-JM_js"
	],
	"./global/en-KE.js": [
		10259,
		"node_modules_angular_common_locales_global_en-KE_js"
	],
	"./global/en-KI.js": [
		63016,
		"node_modules_angular_common_locales_global_en-KI_js"
	],
	"./global/en-KN.js": [
		3773,
		"node_modules_angular_common_locales_global_en-KN_js"
	],
	"./global/en-KY.js": [
		1316,
		"node_modules_angular_common_locales_global_en-KY_js"
	],
	"./global/en-LC.js": [
		13880,
		"node_modules_angular_common_locales_global_en-LC_js"
	],
	"./global/en-LR.js": [
		16276,
		"node_modules_angular_common_locales_global_en-LR_js"
	],
	"./global/en-LS.js": [
		16709,
		"node_modules_angular_common_locales_global_en-LS_js"
	],
	"./global/en-MG.js": [
		88321,
		"node_modules_angular_common_locales_global_en-MG_js"
	],
	"./global/en-MH.js": [
		80768,
		"node_modules_angular_common_locales_global_en-MH_js"
	],
	"./global/en-MO.js": [
		30018,
		"node_modules_angular_common_locales_global_en-MO_js"
	],
	"./global/en-MP.js": [
		56011,
		"node_modules_angular_common_locales_global_en-MP_js"
	],
	"./global/en-MS.js": [
		30652,
		"node_modules_angular_common_locales_global_en-MS_js"
	],
	"./global/en-MT.js": [
		68851,
		"node_modules_angular_common_locales_global_en-MT_js"
	],
	"./global/en-MU.js": [
		49348,
		"node_modules_angular_common_locales_global_en-MU_js"
	],
	"./global/en-MW.js": [
		98717,
		"node_modules_angular_common_locales_global_en-MW_js"
	],
	"./global/en-MY.js": [
		62772,
		"node_modules_angular_common_locales_global_en-MY_js"
	],
	"./global/en-NA.js": [
		39810,
		"node_modules_angular_common_locales_global_en-NA_js"
	],
	"./global/en-NF.js": [
		64823,
		"node_modules_angular_common_locales_global_en-NF_js"
	],
	"./global/en-NG.js": [
		21905,
		"node_modules_angular_common_locales_global_en-NG_js"
	],
	"./global/en-NL.js": [
		30207,
		"node_modules_angular_common_locales_global_en-NL_js"
	],
	"./global/en-NR.js": [
		89575,
		"node_modules_angular_common_locales_global_en-NR_js"
	],
	"./global/en-NU.js": [
		94639,
		"node_modules_angular_common_locales_global_en-NU_js"
	],
	"./global/en-NZ.js": [
		38206,
		"node_modules_angular_common_locales_global_en-NZ_js"
	],
	"./global/en-PG.js": [
		28872,
		"node_modules_angular_common_locales_global_en-PG_js"
	],
	"./global/en-PH.js": [
		31987,
		"node_modules_angular_common_locales_global_en-PH_js"
	],
	"./global/en-PK.js": [
		26721,
		"node_modules_angular_common_locales_global_en-PK_js"
	],
	"./global/en-PN.js": [
		54367,
		"node_modules_angular_common_locales_global_en-PN_js"
	],
	"./global/en-PR.js": [
		89359,
		"node_modules_angular_common_locales_global_en-PR_js"
	],
	"./global/en-PW.js": [
		81545,
		"node_modules_angular_common_locales_global_en-PW_js"
	],
	"./global/en-RW.js": [
		13718,
		"node_modules_angular_common_locales_global_en-RW_js"
	],
	"./global/en-SB.js": [
		12383,
		"node_modules_angular_common_locales_global_en-SB_js"
	],
	"./global/en-SC.js": [
		20061,
		"node_modules_angular_common_locales_global_en-SC_js"
	],
	"./global/en-SD.js": [
		71609,
		"node_modules_angular_common_locales_global_en-SD_js"
	],
	"./global/en-SE.js": [
		20914,
		"node_modules_angular_common_locales_global_en-SE_js"
	],
	"./global/en-SG.js": [
		43537,
		"node_modules_angular_common_locales_global_en-SG_js"
	],
	"./global/en-SH.js": [
		61155,
		"node_modules_angular_common_locales_global_en-SH_js"
	],
	"./global/en-SI.js": [
		21798,
		"node_modules_angular_common_locales_global_en-SI_js"
	],
	"./global/en-SL.js": [
		98915,
		"node_modules_angular_common_locales_global_en-SL_js"
	],
	"./global/en-SS.js": [
		80391,
		"node_modules_angular_common_locales_global_en-SS_js"
	],
	"./global/en-SX.js": [
		28317,
		"node_modules_angular_common_locales_global_en-SX_js"
	],
	"./global/en-SZ.js": [
		17797,
		"node_modules_angular_common_locales_global_en-SZ_js"
	],
	"./global/en-TC.js": [
		7212,
		"node_modules_angular_common_locales_global_en-TC_js"
	],
	"./global/en-TK.js": [
		50363,
		"node_modules_angular_common_locales_global_en-TK_js"
	],
	"./global/en-TO.js": [
		94426,
		"node_modules_angular_common_locales_global_en-TO_js"
	],
	"./global/en-TT.js": [
		77701,
		"node_modules_angular_common_locales_global_en-TT_js"
	],
	"./global/en-TV.js": [
		86377,
		"node_modules_angular_common_locales_global_en-TV_js"
	],
	"./global/en-TZ.js": [
		79895,
		"node_modules_angular_common_locales_global_en-TZ_js"
	],
	"./global/en-UG.js": [
		46169,
		"node_modules_angular_common_locales_global_en-UG_js"
	],
	"./global/en-UM.js": [
		12563,
		"node_modules_angular_common_locales_global_en-UM_js"
	],
	"./global/en-US-POSIX.js": [
		55808,
		"node_modules_angular_common_locales_global_en-US-POSIX_js"
	],
	"./global/en-VC.js": [
		4823,
		"node_modules_angular_common_locales_global_en-VC_js"
	],
	"./global/en-VG.js": [
		48066,
		"node_modules_angular_common_locales_global_en-VG_js"
	],
	"./global/en-VI.js": [
		37883,
		"node_modules_angular_common_locales_global_en-VI_js"
	],
	"./global/en-VU.js": [
		46115,
		"node_modules_angular_common_locales_global_en-VU_js"
	],
	"./global/en-WS.js": [
		10794,
		"node_modules_angular_common_locales_global_en-WS_js"
	],
	"./global/en-ZA.js": [
		20741,
		"node_modules_angular_common_locales_global_en-ZA_js"
	],
	"./global/en-ZM.js": [
		59714,
		"node_modules_angular_common_locales_global_en-ZM_js"
	],
	"./global/en-ZW.js": [
		73779,
		"node_modules_angular_common_locales_global_en-ZW_js"
	],
	"./global/en.js": [
		17792,
		"node_modules_angular_common_locales_global_en_js"
	],
	"./global/eo.js": [
		61194,
		"node_modules_angular_common_locales_global_eo_js"
	],
	"./global/es-419.js": [
		60071,
		"node_modules_angular_common_locales_global_es-419_js"
	],
	"./global/es-AR.js": [
		63505,
		"node_modules_angular_common_locales_global_es-AR_js"
	],
	"./global/es-BO.js": [
		19051,
		"node_modules_angular_common_locales_global_es-BO_js"
	],
	"./global/es-BR.js": [
		64516,
		"node_modules_angular_common_locales_global_es-BR_js"
	],
	"./global/es-BZ.js": [
		30296,
		"node_modules_angular_common_locales_global_es-BZ_js"
	],
	"./global/es-CL.js": [
		86922,
		"node_modules_angular_common_locales_global_es-CL_js"
	],
	"./global/es-CO.js": [
		94647,
		"node_modules_angular_common_locales_global_es-CO_js"
	],
	"./global/es-CR.js": [
		59849,
		"node_modules_angular_common_locales_global_es-CR_js"
	],
	"./global/es-CU.js": [
		79177,
		"node_modules_angular_common_locales_global_es-CU_js"
	],
	"./global/es-DO.js": [
		96531,
		"node_modules_angular_common_locales_global_es-DO_js"
	],
	"./global/es-EA.js": [
		50666,
		"node_modules_angular_common_locales_global_es-EA_js"
	],
	"./global/es-EC.js": [
		19008,
		"node_modules_angular_common_locales_global_es-EC_js"
	],
	"./global/es-GQ.js": [
		38572,
		"node_modules_angular_common_locales_global_es-GQ_js"
	],
	"./global/es-GT.js": [
		819,
		"node_modules_angular_common_locales_global_es-GT_js"
	],
	"./global/es-HN.js": [
		8675,
		"node_modules_angular_common_locales_global_es-HN_js"
	],
	"./global/es-IC.js": [
		92956,
		"node_modules_angular_common_locales_global_es-IC_js"
	],
	"./global/es-MX.js": [
		25555,
		"node_modules_angular_common_locales_global_es-MX_js"
	],
	"./global/es-NI.js": [
		20932,
		"node_modules_angular_common_locales_global_es-NI_js"
	],
	"./global/es-PA.js": [
		60764,
		"node_modules_angular_common_locales_global_es-PA_js"
	],
	"./global/es-PE.js": [
		8498,
		"node_modules_angular_common_locales_global_es-PE_js"
	],
	"./global/es-PH.js": [
		40745,
		"node_modules_angular_common_locales_global_es-PH_js"
	],
	"./global/es-PR.js": [
		31726,
		"node_modules_angular_common_locales_global_es-PR_js"
	],
	"./global/es-PY.js": [
		88123,
		"node_modules_angular_common_locales_global_es-PY_js"
	],
	"./global/es-SV.js": [
		3815,
		"node_modules_angular_common_locales_global_es-SV_js"
	],
	"./global/es-US.js": [
		15068,
		"node_modules_angular_common_locales_global_es-US_js"
	],
	"./global/es-UY.js": [
		4485,
		"node_modules_angular_common_locales_global_es-UY_js"
	],
	"./global/es-VE.js": [
		4906,
		"node_modules_angular_common_locales_global_es-VE_js"
	],
	"./global/es.js": [
		653,
		"node_modules_angular_common_locales_global_es_js"
	],
	"./global/et.js": [
		69113,
		"node_modules_angular_common_locales_global_et_js"
	],
	"./global/eu.js": [
		63536,
		"node_modules_angular_common_locales_global_eu_js"
	],
	"./global/ewo.js": [
		53495,
		"node_modules_angular_common_locales_global_ewo_js"
	],
	"./global/fa-AF.js": [
		10299,
		"node_modules_angular_common_locales_global_fa-AF_js"
	],
	"./global/fa.js": [
		13412,
		"node_modules_angular_common_locales_global_fa_js"
	],
	"./global/ff-CM.js": [
		41223,
		"node_modules_angular_common_locales_global_ff-CM_js"
	],
	"./global/ff-GN.js": [
		94447,
		"node_modules_angular_common_locales_global_ff-GN_js"
	],
	"./global/ff-Latn-BF.js": [
		975,
		"node_modules_angular_common_locales_global_ff-Latn-BF_js"
	],
	"./global/ff-Latn-CM.js": [
		67172,
		"node_modules_angular_common_locales_global_ff-Latn-CM_js"
	],
	"./global/ff-Latn-GH.js": [
		9938,
		"node_modules_angular_common_locales_global_ff-Latn-GH_js"
	],
	"./global/ff-Latn-GM.js": [
		17905,
		"node_modules_angular_common_locales_global_ff-Latn-GM_js"
	],
	"./global/ff-Latn-GN.js": [
		45943,
		"node_modules_angular_common_locales_global_ff-Latn-GN_js"
	],
	"./global/ff-Latn-GW.js": [
		20082,
		"node_modules_angular_common_locales_global_ff-Latn-GW_js"
	],
	"./global/ff-Latn-LR.js": [
		51301,
		"node_modules_angular_common_locales_global_ff-Latn-LR_js"
	],
	"./global/ff-Latn-MR.js": [
		68849,
		"node_modules_angular_common_locales_global_ff-Latn-MR_js"
	],
	"./global/ff-Latn-NE.js": [
		46099,
		"node_modules_angular_common_locales_global_ff-Latn-NE_js"
	],
	"./global/ff-Latn-NG.js": [
		58617,
		"node_modules_angular_common_locales_global_ff-Latn-NG_js"
	],
	"./global/ff-Latn-SL.js": [
		72449,
		"node_modules_angular_common_locales_global_ff-Latn-SL_js"
	],
	"./global/ff-Latn.js": [
		98794,
		"node_modules_angular_common_locales_global_ff-Latn_js"
	],
	"./global/ff-MR.js": [
		62261,
		"node_modules_angular_common_locales_global_ff-MR_js"
	],
	"./global/ff.js": [
		44146,
		"node_modules_angular_common_locales_global_ff_js"
	],
	"./global/fi.js": [
		70170,
		"node_modules_angular_common_locales_global_fi_js"
	],
	"./global/fil.js": [
		34213,
		"node_modules_angular_common_locales_global_fil_js"
	],
	"./global/fo-DK.js": [
		22861,
		"node_modules_angular_common_locales_global_fo-DK_js"
	],
	"./global/fo.js": [
		35158,
		"node_modules_angular_common_locales_global_fo_js"
	],
	"./global/fr-BE.js": [
		9016,
		"node_modules_angular_common_locales_global_fr-BE_js"
	],
	"./global/fr-BF.js": [
		9012,
		"node_modules_angular_common_locales_global_fr-BF_js"
	],
	"./global/fr-BI.js": [
		77,
		"node_modules_angular_common_locales_global_fr-BI_js"
	],
	"./global/fr-BJ.js": [
		2488,
		"node_modules_angular_common_locales_global_fr-BJ_js"
	],
	"./global/fr-BL.js": [
		44943,
		"node_modules_angular_common_locales_global_fr-BL_js"
	],
	"./global/fr-CA.js": [
		41906,
		"node_modules_angular_common_locales_global_fr-CA_js"
	],
	"./global/fr-CD.js": [
		12895,
		"node_modules_angular_common_locales_global_fr-CD_js"
	],
	"./global/fr-CF.js": [
		85002,
		"node_modules_angular_common_locales_global_fr-CF_js"
	],
	"./global/fr-CG.js": [
		99456,
		"node_modules_angular_common_locales_global_fr-CG_js"
	],
	"./global/fr-CH.js": [
		26312,
		"node_modules_angular_common_locales_global_fr-CH_js"
	],
	"./global/fr-CI.js": [
		15462,
		"node_modules_angular_common_locales_global_fr-CI_js"
	],
	"./global/fr-CM.js": [
		75100,
		"node_modules_angular_common_locales_global_fr-CM_js"
	],
	"./global/fr-DJ.js": [
		43401,
		"node_modules_angular_common_locales_global_fr-DJ_js"
	],
	"./global/fr-DZ.js": [
		72384,
		"node_modules_angular_common_locales_global_fr-DZ_js"
	],
	"./global/fr-GA.js": [
		58086,
		"node_modules_angular_common_locales_global_fr-GA_js"
	],
	"./global/fr-GF.js": [
		66484,
		"node_modules_angular_common_locales_global_fr-GF_js"
	],
	"./global/fr-GN.js": [
		12469,
		"node_modules_angular_common_locales_global_fr-GN_js"
	],
	"./global/fr-GP.js": [
		18537,
		"node_modules_angular_common_locales_global_fr-GP_js"
	],
	"./global/fr-GQ.js": [
		29951,
		"node_modules_angular_common_locales_global_fr-GQ_js"
	],
	"./global/fr-HT.js": [
		16483,
		"node_modules_angular_common_locales_global_fr-HT_js"
	],
	"./global/fr-KM.js": [
		46817,
		"node_modules_angular_common_locales_global_fr-KM_js"
	],
	"./global/fr-LU.js": [
		3457,
		"node_modules_angular_common_locales_global_fr-LU_js"
	],
	"./global/fr-MA.js": [
		24045,
		"node_modules_angular_common_locales_global_fr-MA_js"
	],
	"./global/fr-MC.js": [
		9351,
		"node_modules_angular_common_locales_global_fr-MC_js"
	],
	"./global/fr-MF.js": [
		14024,
		"node_modules_angular_common_locales_global_fr-MF_js"
	],
	"./global/fr-MG.js": [
		7095,
		"node_modules_angular_common_locales_global_fr-MG_js"
	],
	"./global/fr-ML.js": [
		4279,
		"node_modules_angular_common_locales_global_fr-ML_js"
	],
	"./global/fr-MQ.js": [
		50889,
		"node_modules_angular_common_locales_global_fr-MQ_js"
	],
	"./global/fr-MR.js": [
		57240,
		"node_modules_angular_common_locales_global_fr-MR_js"
	],
	"./global/fr-MU.js": [
		24661,
		"node_modules_angular_common_locales_global_fr-MU_js"
	],
	"./global/fr-NC.js": [
		11440,
		"node_modules_angular_common_locales_global_fr-NC_js"
	],
	"./global/fr-NE.js": [
		7851,
		"node_modules_angular_common_locales_global_fr-NE_js"
	],
	"./global/fr-PF.js": [
		70359,
		"node_modules_angular_common_locales_global_fr-PF_js"
	],
	"./global/fr-PM.js": [
		74711,
		"node_modules_angular_common_locales_global_fr-PM_js"
	],
	"./global/fr-RE.js": [
		53851,
		"node_modules_angular_common_locales_global_fr-RE_js"
	],
	"./global/fr-RW.js": [
		74534,
		"node_modules_angular_common_locales_global_fr-RW_js"
	],
	"./global/fr-SC.js": [
		69876,
		"node_modules_angular_common_locales_global_fr-SC_js"
	],
	"./global/fr-SN.js": [
		1808,
		"node_modules_angular_common_locales_global_fr-SN_js"
	],
	"./global/fr-SY.js": [
		63407,
		"node_modules_angular_common_locales_global_fr-SY_js"
	],
	"./global/fr-TD.js": [
		98750,
		"node_modules_angular_common_locales_global_fr-TD_js"
	],
	"./global/fr-TG.js": [
		21757,
		"node_modules_angular_common_locales_global_fr-TG_js"
	],
	"./global/fr-TN.js": [
		18752,
		"node_modules_angular_common_locales_global_fr-TN_js"
	],
	"./global/fr-VU.js": [
		6386,
		"node_modules_angular_common_locales_global_fr-VU_js"
	],
	"./global/fr-WF.js": [
		69790,
		"node_modules_angular_common_locales_global_fr-WF_js"
	],
	"./global/fr-YT.js": [
		50496,
		"node_modules_angular_common_locales_global_fr-YT_js"
	],
	"./global/fr.js": [
		90693,
		"node_modules_angular_common_locales_global_fr_js"
	],
	"./global/fur.js": [
		58105,
		"node_modules_angular_common_locales_global_fur_js"
	],
	"./global/fy.js": [
		79654,
		"node_modules_angular_common_locales_global_fy_js"
	],
	"./global/ga-GB.js": [
		78753,
		"node_modules_angular_common_locales_global_ga-GB_js"
	],
	"./global/ga.js": [
		83343,
		"node_modules_angular_common_locales_global_ga_js"
	],
	"./global/gd.js": [
		63219,
		"node_modules_angular_common_locales_global_gd_js"
	],
	"./global/gl.js": [
		97135,
		"node_modules_angular_common_locales_global_gl_js"
	],
	"./global/gsw-FR.js": [
		52423,
		"node_modules_angular_common_locales_global_gsw-FR_js"
	],
	"./global/gsw-LI.js": [
		30816,
		"node_modules_angular_common_locales_global_gsw-LI_js"
	],
	"./global/gsw.js": [
		5638,
		"node_modules_angular_common_locales_global_gsw_js"
	],
	"./global/gu.js": [
		72995,
		"node_modules_angular_common_locales_global_gu_js"
	],
	"./global/guz.js": [
		60232,
		"node_modules_angular_common_locales_global_guz_js"
	],
	"./global/gv.js": [
		53663,
		"node_modules_angular_common_locales_global_gv_js"
	],
	"./global/ha-GH.js": [
		90752,
		"node_modules_angular_common_locales_global_ha-GH_js"
	],
	"./global/ha-NE.js": [
		33318,
		"node_modules_angular_common_locales_global_ha-NE_js"
	],
	"./global/ha.js": [
		2602,
		"node_modules_angular_common_locales_global_ha_js"
	],
	"./global/haw.js": [
		79293,
		"node_modules_angular_common_locales_global_haw_js"
	],
	"./global/he.js": [
		2982,
		"node_modules_angular_common_locales_global_he_js"
	],
	"./global/hi.js": [
		6499,
		"node_modules_angular_common_locales_global_hi_js"
	],
	"./global/hr-BA.js": [
		56192,
		"node_modules_angular_common_locales_global_hr-BA_js"
	],
	"./global/hr.js": [
		26657,
		"node_modules_angular_common_locales_global_hr_js"
	],
	"./global/hsb.js": [
		23426,
		"node_modules_angular_common_locales_global_hsb_js"
	],
	"./global/hu.js": [
		3636,
		"node_modules_angular_common_locales_global_hu_js"
	],
	"./global/hy.js": [
		82372,
		"node_modules_angular_common_locales_global_hy_js"
	],
	"./global/ia.js": [
		93305,
		"node_modules_angular_common_locales_global_ia_js"
	],
	"./global/id.js": [
		66634,
		"node_modules_angular_common_locales_global_id_js"
	],
	"./global/ig.js": [
		2555,
		"node_modules_angular_common_locales_global_ig_js"
	],
	"./global/ii.js": [
		89018,
		"node_modules_angular_common_locales_global_ii_js"
	],
	"./global/is.js": [
		8153,
		"node_modules_angular_common_locales_global_is_js"
	],
	"./global/it-CH.js": [
		30666,
		"node_modules_angular_common_locales_global_it-CH_js"
	],
	"./global/it-SM.js": [
		25623,
		"node_modules_angular_common_locales_global_it-SM_js"
	],
	"./global/it-VA.js": [
		42231,
		"node_modules_angular_common_locales_global_it-VA_js"
	],
	"./global/it.js": [
		38132,
		"node_modules_angular_common_locales_global_it_js"
	],
	"./global/ja.js": [
		57860,
		"node_modules_angular_common_locales_global_ja_js"
	],
	"./global/jgo.js": [
		36692,
		"node_modules_angular_common_locales_global_jgo_js"
	],
	"./global/jmc.js": [
		94369,
		"node_modules_angular_common_locales_global_jmc_js"
	],
	"./global/jv.js": [
		8756,
		"node_modules_angular_common_locales_global_jv_js"
	],
	"./global/ka.js": [
		35267,
		"node_modules_angular_common_locales_global_ka_js"
	],
	"./global/kab.js": [
		8178,
		"node_modules_angular_common_locales_global_kab_js"
	],
	"./global/kam.js": [
		78103,
		"node_modules_angular_common_locales_global_kam_js"
	],
	"./global/kde.js": [
		3990,
		"node_modules_angular_common_locales_global_kde_js"
	],
	"./global/kea.js": [
		31787,
		"node_modules_angular_common_locales_global_kea_js"
	],
	"./global/khq.js": [
		82820,
		"node_modules_angular_common_locales_global_khq_js"
	],
	"./global/ki.js": [
		70748,
		"node_modules_angular_common_locales_global_ki_js"
	],
	"./global/kk.js": [
		29210,
		"node_modules_angular_common_locales_global_kk_js"
	],
	"./global/kkj.js": [
		1543,
		"node_modules_angular_common_locales_global_kkj_js"
	],
	"./global/kl.js": [
		63870,
		"node_modules_angular_common_locales_global_kl_js"
	],
	"./global/kln.js": [
		24824,
		"node_modules_angular_common_locales_global_kln_js"
	],
	"./global/km.js": [
		38150,
		"node_modules_angular_common_locales_global_km_js"
	],
	"./global/kn.js": [
		14310,
		"node_modules_angular_common_locales_global_kn_js"
	],
	"./global/ko-KP.js": [
		54105,
		"node_modules_angular_common_locales_global_ko-KP_js"
	],
	"./global/ko.js": [
		24015,
		"node_modules_angular_common_locales_global_ko_js"
	],
	"./global/kok.js": [
		5209,
		"node_modules_angular_common_locales_global_kok_js"
	],
	"./global/ks-Arab.js": [
		32923,
		"node_modules_angular_common_locales_global_ks-Arab_js"
	],
	"./global/ks.js": [
		40585,
		"node_modules_angular_common_locales_global_ks_js"
	],
	"./global/ksb.js": [
		97526,
		"node_modules_angular_common_locales_global_ksb_js"
	],
	"./global/ksf.js": [
		9187,
		"node_modules_angular_common_locales_global_ksf_js"
	],
	"./global/ksh.js": [
		17214,
		"node_modules_angular_common_locales_global_ksh_js"
	],
	"./global/ku.js": [
		86887,
		"node_modules_angular_common_locales_global_ku_js"
	],
	"./global/kw.js": [
		47711,
		"node_modules_angular_common_locales_global_kw_js"
	],
	"./global/ky.js": [
		72921,
		"node_modules_angular_common_locales_global_ky_js"
	],
	"./global/lag.js": [
		14614,
		"node_modules_angular_common_locales_global_lag_js"
	],
	"./global/lb.js": [
		70792,
		"node_modules_angular_common_locales_global_lb_js"
	],
	"./global/lg.js": [
		61303,
		"node_modules_angular_common_locales_global_lg_js"
	],
	"./global/lkt.js": [
		22557,
		"node_modules_angular_common_locales_global_lkt_js"
	],
	"./global/ln-AO.js": [
		23376,
		"node_modules_angular_common_locales_global_ln-AO_js"
	],
	"./global/ln-CF.js": [
		91052,
		"node_modules_angular_common_locales_global_ln-CF_js"
	],
	"./global/ln-CG.js": [
		58650,
		"node_modules_angular_common_locales_global_ln-CG_js"
	],
	"./global/ln.js": [
		40266,
		"node_modules_angular_common_locales_global_ln_js"
	],
	"./global/lo.js": [
		80840,
		"node_modules_angular_common_locales_global_lo_js"
	],
	"./global/lrc-IQ.js": [
		64068,
		"node_modules_angular_common_locales_global_lrc-IQ_js"
	],
	"./global/lrc.js": [
		82293,
		"node_modules_angular_common_locales_global_lrc_js"
	],
	"./global/lt.js": [
		76623,
		"node_modules_angular_common_locales_global_lt_js"
	],
	"./global/lu.js": [
		96579,
		"node_modules_angular_common_locales_global_lu_js"
	],
	"./global/luo.js": [
		35080,
		"node_modules_angular_common_locales_global_luo_js"
	],
	"./global/luy.js": [
		12103,
		"node_modules_angular_common_locales_global_luy_js"
	],
	"./global/lv.js": [
		3519,
		"node_modules_angular_common_locales_global_lv_js"
	],
	"./global/mas-TZ.js": [
		56478,
		"node_modules_angular_common_locales_global_mas-TZ_js"
	],
	"./global/mas.js": [
		79429,
		"node_modules_angular_common_locales_global_mas_js"
	],
	"./global/mer.js": [
		75404,
		"node_modules_angular_common_locales_global_mer_js"
	],
	"./global/mfe.js": [
		19661,
		"node_modules_angular_common_locales_global_mfe_js"
	],
	"./global/mg.js": [
		45353,
		"node_modules_angular_common_locales_global_mg_js"
	],
	"./global/mgh.js": [
		44196,
		"node_modules_angular_common_locales_global_mgh_js"
	],
	"./global/mgo.js": [
		19104,
		"node_modules_angular_common_locales_global_mgo_js"
	],
	"./global/mi.js": [
		82044,
		"node_modules_angular_common_locales_global_mi_js"
	],
	"./global/mk.js": [
		9494,
		"node_modules_angular_common_locales_global_mk_js"
	],
	"./global/ml.js": [
		76685,
		"node_modules_angular_common_locales_global_ml_js"
	],
	"./global/mn.js": [
		64325,
		"node_modules_angular_common_locales_global_mn_js"
	],
	"./global/mr.js": [
		92929,
		"node_modules_angular_common_locales_global_mr_js"
	],
	"./global/ms-BN.js": [
		76198,
		"node_modules_angular_common_locales_global_ms-BN_js"
	],
	"./global/ms-SG.js": [
		50983,
		"node_modules_angular_common_locales_global_ms-SG_js"
	],
	"./global/ms.js": [
		73307,
		"node_modules_angular_common_locales_global_ms_js"
	],
	"./global/mt.js": [
		24752,
		"node_modules_angular_common_locales_global_mt_js"
	],
	"./global/mua.js": [
		24280,
		"node_modules_angular_common_locales_global_mua_js"
	],
	"./global/my.js": [
		13580,
		"node_modules_angular_common_locales_global_my_js"
	],
	"./global/mzn.js": [
		69357,
		"node_modules_angular_common_locales_global_mzn_js"
	],
	"./global/naq.js": [
		41720,
		"node_modules_angular_common_locales_global_naq_js"
	],
	"./global/nb-SJ.js": [
		58178,
		"node_modules_angular_common_locales_global_nb-SJ_js"
	],
	"./global/nb.js": [
		93478,
		"node_modules_angular_common_locales_global_nb_js"
	],
	"./global/nd.js": [
		92108,
		"node_modules_angular_common_locales_global_nd_js"
	],
	"./global/nds-NL.js": [
		53025,
		"node_modules_angular_common_locales_global_nds-NL_js"
	],
	"./global/nds.js": [
		9248,
		"node_modules_angular_common_locales_global_nds_js"
	],
	"./global/ne-IN.js": [
		81957,
		"node_modules_angular_common_locales_global_ne-IN_js"
	],
	"./global/ne.js": [
		55313,
		"node_modules_angular_common_locales_global_ne_js"
	],
	"./global/nl-AW.js": [
		36733,
		"node_modules_angular_common_locales_global_nl-AW_js"
	],
	"./global/nl-BE.js": [
		55282,
		"node_modules_angular_common_locales_global_nl-BE_js"
	],
	"./global/nl-BQ.js": [
		97488,
		"node_modules_angular_common_locales_global_nl-BQ_js"
	],
	"./global/nl-CW.js": [
		32857,
		"node_modules_angular_common_locales_global_nl-CW_js"
	],
	"./global/nl-SR.js": [
		85973,
		"node_modules_angular_common_locales_global_nl-SR_js"
	],
	"./global/nl-SX.js": [
		7245,
		"node_modules_angular_common_locales_global_nl-SX_js"
	],
	"./global/nl.js": [
		8479,
		"node_modules_angular_common_locales_global_nl_js"
	],
	"./global/nmg.js": [
		72836,
		"node_modules_angular_common_locales_global_nmg_js"
	],
	"./global/nn.js": [
		44178,
		"node_modules_angular_common_locales_global_nn_js"
	],
	"./global/nnh.js": [
		78270,
		"node_modules_angular_common_locales_global_nnh_js"
	],
	"./global/nus.js": [
		94877,
		"node_modules_angular_common_locales_global_nus_js"
	],
	"./global/nyn.js": [
		14477,
		"node_modules_angular_common_locales_global_nyn_js"
	],
	"./global/om-KE.js": [
		77360,
		"node_modules_angular_common_locales_global_om-KE_js"
	],
	"./global/om.js": [
		64796,
		"node_modules_angular_common_locales_global_om_js"
	],
	"./global/or.js": [
		59801,
		"node_modules_angular_common_locales_global_or_js"
	],
	"./global/os-RU.js": [
		23404,
		"node_modules_angular_common_locales_global_os-RU_js"
	],
	"./global/os.js": [
		29717,
		"node_modules_angular_common_locales_global_os_js"
	],
	"./global/pa-Arab.js": [
		97016,
		"node_modules_angular_common_locales_global_pa-Arab_js"
	],
	"./global/pa-Guru.js": [
		73057,
		"node_modules_angular_common_locales_global_pa-Guru_js"
	],
	"./global/pa.js": [
		25618,
		"node_modules_angular_common_locales_global_pa_js"
	],
	"./global/pl.js": [
		6912,
		"node_modules_angular_common_locales_global_pl_js"
	],
	"./global/prg.js": [
		38814,
		"node_modules_angular_common_locales_global_prg_js"
	],
	"./global/ps-PK.js": [
		43111,
		"node_modules_angular_common_locales_global_ps-PK_js"
	],
	"./global/ps.js": [
		62232,
		"node_modules_angular_common_locales_global_ps_js"
	],
	"./global/pt-AO.js": [
		40581,
		"node_modules_angular_common_locales_global_pt-AO_js"
	],
	"./global/pt-CH.js": [
		60438,
		"node_modules_angular_common_locales_global_pt-CH_js"
	],
	"./global/pt-CV.js": [
		34941,
		"node_modules_angular_common_locales_global_pt-CV_js"
	],
	"./global/pt-GQ.js": [
		98727,
		"node_modules_angular_common_locales_global_pt-GQ_js"
	],
	"./global/pt-GW.js": [
		19346,
		"node_modules_angular_common_locales_global_pt-GW_js"
	],
	"./global/pt-LU.js": [
		65580,
		"node_modules_angular_common_locales_global_pt-LU_js"
	],
	"./global/pt-MO.js": [
		95285,
		"node_modules_angular_common_locales_global_pt-MO_js"
	],
	"./global/pt-MZ.js": [
		32437,
		"node_modules_angular_common_locales_global_pt-MZ_js"
	],
	"./global/pt-PT.js": [
		50736,
		"node_modules_angular_common_locales_global_pt-PT_js"
	],
	"./global/pt-ST.js": [
		40285,
		"node_modules_angular_common_locales_global_pt-ST_js"
	],
	"./global/pt-TL.js": [
		98749,
		"node_modules_angular_common_locales_global_pt-TL_js"
	],
	"./global/pt.js": [
		94402,
		"node_modules_angular_common_locales_global_pt_js"
	],
	"./global/qu-BO.js": [
		62071,
		"node_modules_angular_common_locales_global_qu-BO_js"
	],
	"./global/qu-EC.js": [
		16181,
		"node_modules_angular_common_locales_global_qu-EC_js"
	],
	"./global/qu.js": [
		60019,
		"node_modules_angular_common_locales_global_qu_js"
	],
	"./global/rm.js": [
		35198,
		"node_modules_angular_common_locales_global_rm_js"
	],
	"./global/rn.js": [
		45307,
		"node_modules_angular_common_locales_global_rn_js"
	],
	"./global/ro-MD.js": [
		81348,
		"node_modules_angular_common_locales_global_ro-MD_js"
	],
	"./global/ro.js": [
		80944,
		"node_modules_angular_common_locales_global_ro_js"
	],
	"./global/rof.js": [
		44256,
		"node_modules_angular_common_locales_global_rof_js"
	],
	"./global/root.js": [
		29482,
		"node_modules_angular_common_locales_global_root_js"
	],
	"./global/ru-BY.js": [
		67772,
		"node_modules_angular_common_locales_global_ru-BY_js"
	],
	"./global/ru-KG.js": [
		94874,
		"node_modules_angular_common_locales_global_ru-KG_js"
	],
	"./global/ru-KZ.js": [
		95510,
		"node_modules_angular_common_locales_global_ru-KZ_js"
	],
	"./global/ru-MD.js": [
		57046,
		"node_modules_angular_common_locales_global_ru-MD_js"
	],
	"./global/ru-UA.js": [
		51223,
		"node_modules_angular_common_locales_global_ru-UA_js"
	],
	"./global/ru.js": [
		98668,
		"node_modules_angular_common_locales_global_ru_js"
	],
	"./global/rw.js": [
		8049,
		"node_modules_angular_common_locales_global_rw_js"
	],
	"./global/rwk.js": [
		65018,
		"node_modules_angular_common_locales_global_rwk_js"
	],
	"./global/sah.js": [
		66280,
		"node_modules_angular_common_locales_global_sah_js"
	],
	"./global/saq.js": [
		50478,
		"node_modules_angular_common_locales_global_saq_js"
	],
	"./global/sbp.js": [
		84464,
		"node_modules_angular_common_locales_global_sbp_js"
	],
	"./global/sd-Arab.js": [
		79805,
		"node_modules_angular_common_locales_global_sd-Arab_js"
	],
	"./global/sd.js": [
		29866,
		"node_modules_angular_common_locales_global_sd_js"
	],
	"./global/se-FI.js": [
		39108,
		"node_modules_angular_common_locales_global_se-FI_js"
	],
	"./global/se-SE.js": [
		65066,
		"node_modules_angular_common_locales_global_se-SE_js"
	],
	"./global/se.js": [
		83342,
		"node_modules_angular_common_locales_global_se_js"
	],
	"./global/seh.js": [
		69897,
		"node_modules_angular_common_locales_global_seh_js"
	],
	"./global/ses.js": [
		66876,
		"node_modules_angular_common_locales_global_ses_js"
	],
	"./global/sg.js": [
		21081,
		"node_modules_angular_common_locales_global_sg_js"
	],
	"./global/shi-Latn.js": [
		40983,
		"node_modules_angular_common_locales_global_shi-Latn_js"
	],
	"./global/shi-Tfng.js": [
		40228,
		"node_modules_angular_common_locales_global_shi-Tfng_js"
	],
	"./global/shi.js": [
		96858,
		"node_modules_angular_common_locales_global_shi_js"
	],
	"./global/si.js": [
		96564,
		"node_modules_angular_common_locales_global_si_js"
	],
	"./global/sk.js": [
		52508,
		"node_modules_angular_common_locales_global_sk_js"
	],
	"./global/sl.js": [
		40397,
		"node_modules_angular_common_locales_global_sl_js"
	],
	"./global/smn.js": [
		70791,
		"node_modules_angular_common_locales_global_smn_js"
	],
	"./global/sn.js": [
		648,
		"node_modules_angular_common_locales_global_sn_js"
	],
	"./global/so-DJ.js": [
		70577,
		"node_modules_angular_common_locales_global_so-DJ_js"
	],
	"./global/so-ET.js": [
		58294,
		"node_modules_angular_common_locales_global_so-ET_js"
	],
	"./global/so-KE.js": [
		41926,
		"node_modules_angular_common_locales_global_so-KE_js"
	],
	"./global/so.js": [
		7176,
		"node_modules_angular_common_locales_global_so_js"
	],
	"./global/sq-MK.js": [
		55123,
		"node_modules_angular_common_locales_global_sq-MK_js"
	],
	"./global/sq-XK.js": [
		58177,
		"node_modules_angular_common_locales_global_sq-XK_js"
	],
	"./global/sq.js": [
		25583,
		"node_modules_angular_common_locales_global_sq_js"
	],
	"./global/sr-Cyrl-BA.js": [
		10715,
		"node_modules_angular_common_locales_global_sr-Cyrl-BA_js"
	],
	"./global/sr-Cyrl-ME.js": [
		40207,
		"node_modules_angular_common_locales_global_sr-Cyrl-ME_js"
	],
	"./global/sr-Cyrl-XK.js": [
		54711,
		"node_modules_angular_common_locales_global_sr-Cyrl-XK_js"
	],
	"./global/sr-Cyrl.js": [
		55655,
		"node_modules_angular_common_locales_global_sr-Cyrl_js"
	],
	"./global/sr-Latn-BA.js": [
		65338,
		"node_modules_angular_common_locales_global_sr-Latn-BA_js"
	],
	"./global/sr-Latn-ME.js": [
		93803,
		"node_modules_angular_common_locales_global_sr-Latn-ME_js"
	],
	"./global/sr-Latn-XK.js": [
		51234,
		"node_modules_angular_common_locales_global_sr-Latn-XK_js"
	],
	"./global/sr-Latn.js": [
		48544,
		"node_modules_angular_common_locales_global_sr-Latn_js"
	],
	"./global/sr.js": [
		70353,
		"node_modules_angular_common_locales_global_sr_js"
	],
	"./global/sv-AX.js": [
		25375,
		"node_modules_angular_common_locales_global_sv-AX_js"
	],
	"./global/sv-FI.js": [
		16268,
		"node_modules_angular_common_locales_global_sv-FI_js"
	],
	"./global/sv.js": [
		55849,
		"node_modules_angular_common_locales_global_sv_js"
	],
	"./global/sw-CD.js": [
		63095,
		"node_modules_angular_common_locales_global_sw-CD_js"
	],
	"./global/sw-KE.js": [
		17366,
		"node_modules_angular_common_locales_global_sw-KE_js"
	],
	"./global/sw-UG.js": [
		62147,
		"node_modules_angular_common_locales_global_sw-UG_js"
	],
	"./global/sw.js": [
		48348,
		"node_modules_angular_common_locales_global_sw_js"
	],
	"./global/ta-LK.js": [
		48670,
		"node_modules_angular_common_locales_global_ta-LK_js"
	],
	"./global/ta-MY.js": [
		70635,
		"node_modules_angular_common_locales_global_ta-MY_js"
	],
	"./global/ta-SG.js": [
		28368,
		"node_modules_angular_common_locales_global_ta-SG_js"
	],
	"./global/ta.js": [
		95456,
		"node_modules_angular_common_locales_global_ta_js"
	],
	"./global/te.js": [
		11723,
		"node_modules_angular_common_locales_global_te_js"
	],
	"./global/teo-KE.js": [
		18208,
		"node_modules_angular_common_locales_global_teo-KE_js"
	],
	"./global/teo.js": [
		26981,
		"node_modules_angular_common_locales_global_teo_js"
	],
	"./global/tg.js": [
		34800,
		"node_modules_angular_common_locales_global_tg_js"
	],
	"./global/th.js": [
		47392,
		"node_modules_angular_common_locales_global_th_js"
	],
	"./global/ti-ER.js": [
		29254,
		"node_modules_angular_common_locales_global_ti-ER_js"
	],
	"./global/ti.js": [
		44768,
		"node_modules_angular_common_locales_global_ti_js"
	],
	"./global/tk.js": [
		23041,
		"node_modules_angular_common_locales_global_tk_js"
	],
	"./global/to.js": [
		1963,
		"node_modules_angular_common_locales_global_to_js"
	],
	"./global/tr-CY.js": [
		56486,
		"node_modules_angular_common_locales_global_tr-CY_js"
	],
	"./global/tr.js": [
		54921,
		"node_modules_angular_common_locales_global_tr_js"
	],
	"./global/tt.js": [
		39595,
		"node_modules_angular_common_locales_global_tt_js"
	],
	"./global/twq.js": [
		61433,
		"node_modules_angular_common_locales_global_twq_js"
	],
	"./global/tzm.js": [
		24462,
		"node_modules_angular_common_locales_global_tzm_js"
	],
	"./global/ug.js": [
		7516,
		"node_modules_angular_common_locales_global_ug_js"
	],
	"./global/uk.js": [
		18170,
		"node_modules_angular_common_locales_global_uk_js"
	],
	"./global/ur-IN.js": [
		18468,
		"node_modules_angular_common_locales_global_ur-IN_js"
	],
	"./global/ur.js": [
		68772,
		"node_modules_angular_common_locales_global_ur_js"
	],
	"./global/uz-Arab.js": [
		702,
		"node_modules_angular_common_locales_global_uz-Arab_js"
	],
	"./global/uz-Cyrl.js": [
		60711,
		"node_modules_angular_common_locales_global_uz-Cyrl_js"
	],
	"./global/uz-Latn.js": [
		73333,
		"node_modules_angular_common_locales_global_uz-Latn_js"
	],
	"./global/uz.js": [
		75040,
		"node_modules_angular_common_locales_global_uz_js"
	],
	"./global/vai-Latn.js": [
		83244,
		"node_modules_angular_common_locales_global_vai-Latn_js"
	],
	"./global/vai-Vaii.js": [
		30485,
		"node_modules_angular_common_locales_global_vai-Vaii_js"
	],
	"./global/vai.js": [
		1628,
		"node_modules_angular_common_locales_global_vai_js"
	],
	"./global/vi.js": [
		14613,
		"node_modules_angular_common_locales_global_vi_js"
	],
	"./global/vo.js": [
		87148,
		"node_modules_angular_common_locales_global_vo_js"
	],
	"./global/vun.js": [
		21507,
		"node_modules_angular_common_locales_global_vun_js"
	],
	"./global/wae.js": [
		7338,
		"node_modules_angular_common_locales_global_wae_js"
	],
	"./global/wo.js": [
		29863,
		"node_modules_angular_common_locales_global_wo_js"
	],
	"./global/xh.js": [
		37362,
		"node_modules_angular_common_locales_global_xh_js"
	],
	"./global/xog.js": [
		31307,
		"node_modules_angular_common_locales_global_xog_js"
	],
	"./global/yav.js": [
		24030,
		"node_modules_angular_common_locales_global_yav_js"
	],
	"./global/yi.js": [
		11306,
		"node_modules_angular_common_locales_global_yi_js"
	],
	"./global/yo-BJ.js": [
		6129,
		"node_modules_angular_common_locales_global_yo-BJ_js"
	],
	"./global/yo.js": [
		53648,
		"node_modules_angular_common_locales_global_yo_js"
	],
	"./global/yue-Hans.js": [
		65228,
		"node_modules_angular_common_locales_global_yue-Hans_js"
	],
	"./global/yue-Hant.js": [
		54908,
		"node_modules_angular_common_locales_global_yue-Hant_js"
	],
	"./global/yue.js": [
		39498,
		"node_modules_angular_common_locales_global_yue_js"
	],
	"./global/zgh.js": [
		17539,
		"node_modules_angular_common_locales_global_zgh_js"
	],
	"./global/zh-Hans-HK.js": [
		17385,
		"node_modules_angular_common_locales_global_zh-Hans-HK_js"
	],
	"./global/zh-Hans-MO.js": [
		59041,
		"node_modules_angular_common_locales_global_zh-Hans-MO_js"
	],
	"./global/zh-Hans-SG.js": [
		33206,
		"node_modules_angular_common_locales_global_zh-Hans-SG_js"
	],
	"./global/zh-Hans.js": [
		70010,
		"node_modules_angular_common_locales_global_zh-Hans_js"
	],
	"./global/zh-Hant-HK.js": [
		32809,
		"node_modules_angular_common_locales_global_zh-Hant-HK_js"
	],
	"./global/zh-Hant-MO.js": [
		44661,
		"node_modules_angular_common_locales_global_zh-Hant-MO_js"
	],
	"./global/zh-Hant.js": [
		61090,
		"node_modules_angular_common_locales_global_zh-Hant_js"
	],
	"./global/zh.js": [
		67303,
		"node_modules_angular_common_locales_global_zh_js"
	],
	"./global/zu.js": [
		6133,
		"node_modules_angular_common_locales_global_zu_js"
	],
	"./gsw-FR.js": [
		82394,
		"node_modules_angular_common_locales_gsw-FR_js"
	],
	"./gsw-LI.js": [
		2070,
		"node_modules_angular_common_locales_gsw-LI_js"
	],
	"./gsw.js": [
		63652,
		"node_modules_angular_common_locales_gsw_js"
	],
	"./gu.js": [
		23,
		"node_modules_angular_common_locales_gu_js"
	],
	"./guz.js": [
		65837,
		"node_modules_angular_common_locales_guz_js"
	],
	"./gv.js": [
		86293,
		"node_modules_angular_common_locales_gv_js"
	],
	"./ha-GH.js": [
		76972,
		"node_modules_angular_common_locales_ha-GH_js"
	],
	"./ha-NE.js": [
		70738,
		"node_modules_angular_common_locales_ha-NE_js"
	],
	"./ha.js": [
		63968,
		"node_modules_angular_common_locales_ha_js"
	],
	"./haw.js": [
		35663,
		"node_modules_angular_common_locales_haw_js"
	],
	"./he.js": [
		7770,
		"node_modules_angular_common_locales_he_js"
	],
	"./hi.js": [
		51029,
		"node_modules_angular_common_locales_hi_js"
	],
	"./hr-BA.js": [
		13780,
		"node_modules_angular_common_locales_hr-BA_js"
	],
	"./hr.js": [
		47728,
		"node_modules_angular_common_locales_hr_js"
	],
	"./hsb.js": [
		98254,
		"node_modules_angular_common_locales_hsb_js"
	],
	"./hu.js": [
		56954,
		"node_modules_angular_common_locales_hu_js"
	],
	"./hy.js": [
		54734,
		"node_modules_angular_common_locales_hy_js"
	],
	"./ia.js": [
		20040,
		"node_modules_angular_common_locales_ia_js"
	],
	"./id.js": [
		20014,
		"node_modules_angular_common_locales_id_js"
	],
	"./ig.js": [
		46806,
		"node_modules_angular_common_locales_ig_js"
	],
	"./ii.js": [
		94203,
		"node_modules_angular_common_locales_ii_js"
	],
	"./is.js": [
		79411,
		"node_modules_angular_common_locales_is_js"
	],
	"./it-CH.js": [
		14352,
		"node_modules_angular_common_locales_it-CH_js"
	],
	"./it-SM.js": [
		81103,
		"node_modules_angular_common_locales_it-SM_js"
	],
	"./it-VA.js": [
		28513,
		"node_modules_angular_common_locales_it-VA_js"
	],
	"./it.js": [
		24656,
		"node_modules_angular_common_locales_it_js"
	],
	"./ja.js": [
		61235,
		"node_modules_angular_common_locales_ja_js"
	],
	"./jgo.js": [
		38757,
		"node_modules_angular_common_locales_jgo_js"
	],
	"./jmc.js": [
		89934,
		"node_modules_angular_common_locales_jmc_js"
	],
	"./jv.js": [
		70495,
		"node_modules_angular_common_locales_jv_js"
	],
	"./ka.js": [
		84839,
		"node_modules_angular_common_locales_ka_js"
	],
	"./kab.js": [
		24655,
		"node_modules_angular_common_locales_kab_js"
	],
	"./kam.js": [
		78718,
		"node_modules_angular_common_locales_kam_js"
	],
	"./kde.js": [
		55767,
		"node_modules_angular_common_locales_kde_js"
	],
	"./kea.js": [
		37455,
		"node_modules_angular_common_locales_kea_js"
	],
	"./khq.js": [
		3397,
		"node_modules_angular_common_locales_khq_js"
	],
	"./ki.js": [
		18622,
		"node_modules_angular_common_locales_ki_js"
	],
	"./kk.js": [
		89870,
		"node_modules_angular_common_locales_kk_js"
	],
	"./kkj.js": [
		220,
		"node_modules_angular_common_locales_kkj_js"
	],
	"./kl.js": [
		96390,
		"node_modules_angular_common_locales_kl_js"
	],
	"./kln.js": [
		79669,
		"node_modules_angular_common_locales_kln_js"
	],
	"./km.js": [
		45871,
		"node_modules_angular_common_locales_km_js"
	],
	"./kn.js": [
		96601,
		"node_modules_angular_common_locales_kn_js"
	],
	"./ko-KP.js": [
		79022,
		"node_modules_angular_common_locales_ko-KP_js"
	],
	"./ko.js": [
		72766,
		"node_modules_angular_common_locales_ko_js"
	],
	"./kok.js": [
		83960,
		"node_modules_angular_common_locales_kok_js"
	],
	"./ks-Arab.js": [
		50945,
		"node_modules_angular_common_locales_ks-Arab_js"
	],
	"./ks.js": [
		19229,
		"node_modules_angular_common_locales_ks_js"
	],
	"./ksb.js": [
		79507,
		"node_modules_angular_common_locales_ksb_js"
	],
	"./ksf.js": [
		16988,
		"node_modules_angular_common_locales_ksf_js"
	],
	"./ksh.js": [
		25810,
		"node_modules_angular_common_locales_ksh_js"
	],
	"./ku.js": [
		25127,
		"node_modules_angular_common_locales_ku_js"
	],
	"./kw.js": [
		50779,
		"node_modules_angular_common_locales_kw_js"
	],
	"./ky.js": [
		4088,
		"node_modules_angular_common_locales_ky_js"
	],
	"./lag.js": [
		61322,
		"node_modules_angular_common_locales_lag_js"
	],
	"./lb.js": [
		47986,
		"node_modules_angular_common_locales_lb_js"
	],
	"./lg.js": [
		74428,
		"node_modules_angular_common_locales_lg_js"
	],
	"./lkt.js": [
		36882,
		"node_modules_angular_common_locales_lkt_js"
	],
	"./ln-AO.js": [
		52165,
		"node_modules_angular_common_locales_ln-AO_js"
	],
	"./ln-CF.js": [
		15268,
		"node_modules_angular_common_locales_ln-CF_js"
	],
	"./ln-CG.js": [
		5551,
		"node_modules_angular_common_locales_ln-CG_js"
	],
	"./ln.js": [
		60369,
		"node_modules_angular_common_locales_ln_js"
	],
	"./lo.js": [
		69479,
		"node_modules_angular_common_locales_lo_js"
	],
	"./lrc-IQ.js": [
		95600,
		"node_modules_angular_common_locales_lrc-IQ_js"
	],
	"./lrc.js": [
		77982,
		"node_modules_angular_common_locales_lrc_js"
	],
	"./lt.js": [
		51868,
		"node_modules_angular_common_locales_lt_js"
	],
	"./lu.js": [
		8867,
		"node_modules_angular_common_locales_lu_js"
	],
	"./luo.js": [
		57284,
		"node_modules_angular_common_locales_luo_js"
	],
	"./luy.js": [
		63620,
		"node_modules_angular_common_locales_luy_js"
	],
	"./lv.js": [
		60290,
		"node_modules_angular_common_locales_lv_js"
	],
	"./mas-TZ.js": [
		56201,
		"node_modules_angular_common_locales_mas-TZ_js"
	],
	"./mas.js": [
		12841,
		"node_modules_angular_common_locales_mas_js"
	],
	"./mer.js": [
		90845,
		"node_modules_angular_common_locales_mer_js"
	],
	"./mfe.js": [
		79640,
		"node_modules_angular_common_locales_mfe_js"
	],
	"./mg.js": [
		51830,
		"node_modules_angular_common_locales_mg_js"
	],
	"./mgh.js": [
		19735,
		"node_modules_angular_common_locales_mgh_js"
	],
	"./mgo.js": [
		905,
		"node_modules_angular_common_locales_mgo_js"
	],
	"./mi.js": [
		30530,
		"node_modules_angular_common_locales_mi_js"
	],
	"./mk.js": [
		16841,
		"node_modules_angular_common_locales_mk_js"
	],
	"./ml.js": [
		94819,
		"node_modules_angular_common_locales_ml_js"
	],
	"./mn.js": [
		87759,
		"node_modules_angular_common_locales_mn_js"
	],
	"./mr.js": [
		68811,
		"node_modules_angular_common_locales_mr_js"
	],
	"./ms-BN.js": [
		95123,
		"node_modules_angular_common_locales_ms-BN_js"
	],
	"./ms-SG.js": [
		15284,
		"node_modules_angular_common_locales_ms-SG_js"
	],
	"./ms.js": [
		10787,
		"node_modules_angular_common_locales_ms_js"
	],
	"./mt.js": [
		44315,
		"node_modules_angular_common_locales_mt_js"
	],
	"./mua.js": [
		26991,
		"node_modules_angular_common_locales_mua_js"
	],
	"./my.js": [
		81438,
		"node_modules_angular_common_locales_my_js"
	],
	"./mzn.js": [
		43192,
		"node_modules_angular_common_locales_mzn_js"
	],
	"./naq.js": [
		99103,
		"node_modules_angular_common_locales_naq_js"
	],
	"./nb-SJ.js": [
		81280,
		"node_modules_angular_common_locales_nb-SJ_js"
	],
	"./nb.js": [
		45290,
		"node_modules_angular_common_locales_nb_js"
	],
	"./nd.js": [
		89202,
		"node_modules_angular_common_locales_nd_js"
	],
	"./nds-NL.js": [
		540,
		"node_modules_angular_common_locales_nds-NL_js"
	],
	"./nds.js": [
		67573,
		"node_modules_angular_common_locales_nds_js"
	],
	"./ne-IN.js": [
		73303,
		"node_modules_angular_common_locales_ne-IN_js"
	],
	"./ne.js": [
		76481,
		"node_modules_angular_common_locales_ne_js"
	],
	"./nl-AW.js": [
		87889,
		"node_modules_angular_common_locales_nl-AW_js"
	],
	"./nl-BE.js": [
		5765,
		"node_modules_angular_common_locales_nl-BE_js"
	],
	"./nl-BQ.js": [
		45423,
		"node_modules_angular_common_locales_nl-BQ_js"
	],
	"./nl-CW.js": [
		81205,
		"node_modules_angular_common_locales_nl-CW_js"
	],
	"./nl-SR.js": [
		22347,
		"node_modules_angular_common_locales_nl-SR_js"
	],
	"./nl-SX.js": [
		47000,
		"node_modules_angular_common_locales_nl-SX_js"
	],
	"./nl.js": [
		12606,
		"node_modules_angular_common_locales_nl_js"
	],
	"./nmg.js": [
		70665,
		"node_modules_angular_common_locales_nmg_js"
	],
	"./nn.js": [
		65941,
		"node_modules_angular_common_locales_nn_js"
	],
	"./nnh.js": [
		74365,
		"node_modules_angular_common_locales_nnh_js"
	],
	"./nus.js": [
		53493,
		"node_modules_angular_common_locales_nus_js"
	],
	"./nyn.js": [
		42964,
		"node_modules_angular_common_locales_nyn_js"
	],
	"./om-KE.js": [
		94191,
		"node_modules_angular_common_locales_om-KE_js"
	],
	"./om.js": [
		35165,
		"node_modules_angular_common_locales_om_js"
	],
	"./or.js": [
		76008,
		"node_modules_angular_common_locales_or_js"
	],
	"./os-RU.js": [
		73966,
		"node_modules_angular_common_locales_os-RU_js"
	],
	"./os.js": [
		71486,
		"node_modules_angular_common_locales_os_js"
	],
	"./pa-Arab.js": [
		3923,
		"node_modules_angular_common_locales_pa-Arab_js"
	],
	"./pa-Guru.js": [
		65818,
		"node_modules_angular_common_locales_pa-Guru_js"
	],
	"./pa.js": [
		18070,
		"node_modules_angular_common_locales_pa_js"
	],
	"./pl.js": [
		20869,
		"node_modules_angular_common_locales_pl_js"
	],
	"./prg.js": [
		35464,
		"node_modules_angular_common_locales_prg_js"
	],
	"./ps-PK.js": [
		93531,
		"node_modules_angular_common_locales_ps-PK_js"
	],
	"./ps.js": [
		65938,
		"node_modules_angular_common_locales_ps_js"
	],
	"./pt-AO.js": [
		17500,
		"node_modules_angular_common_locales_pt-AO_js"
	],
	"./pt-CH.js": [
		96819,
		"node_modules_angular_common_locales_pt-CH_js"
	],
	"./pt-CV.js": [
		26790,
		"node_modules_angular_common_locales_pt-CV_js"
	],
	"./pt-GQ.js": [
		13095,
		"node_modules_angular_common_locales_pt-GQ_js"
	],
	"./pt-GW.js": [
		5289,
		"node_modules_angular_common_locales_pt-GW_js"
	],
	"./pt-LU.js": [
		873,
		"node_modules_angular_common_locales_pt-LU_js"
	],
	"./pt-MO.js": [
		56920,
		"node_modules_angular_common_locales_pt-MO_js"
	],
	"./pt-MZ.js": [
		7533,
		"node_modules_angular_common_locales_pt-MZ_js"
	],
	"./pt-PT.js": [
		32237,
		"node_modules_angular_common_locales_pt-PT_js"
	],
	"./pt-ST.js": [
		34398,
		"node_modules_angular_common_locales_pt-ST_js"
	],
	"./pt-TL.js": [
		17381,
		"node_modules_angular_common_locales_pt-TL_js"
	],
	"./pt.js": [
		42482,
		"node_modules_angular_common_locales_pt_js"
	],
	"./qu-BO.js": [
		10046,
		"node_modules_angular_common_locales_qu-BO_js"
	],
	"./qu-EC.js": [
		12806,
		"node_modules_angular_common_locales_qu-EC_js"
	],
	"./qu.js": [
		3722,
		"node_modules_angular_common_locales_qu_js"
	],
	"./rm.js": [
		83558,
		"node_modules_angular_common_locales_rm_js"
	],
	"./rn.js": [
		36199,
		"node_modules_angular_common_locales_rn_js"
	],
	"./ro-MD.js": [
		2160,
		"node_modules_angular_common_locales_ro-MD_js"
	],
	"./ro.js": [
		6639,
		"node_modules_angular_common_locales_ro_js"
	],
	"./rof.js": [
		65318,
		"node_modules_angular_common_locales_rof_js"
	],
	"./root.js": [
		65205,
		"node_modules_angular_common_locales_root_js"
	],
	"./ru-BY.js": [
		51599,
		"node_modules_angular_common_locales_ru-BY_js"
	],
	"./ru-KG.js": [
		62569,
		"node_modules_angular_common_locales_ru-KG_js"
	],
	"./ru-KZ.js": [
		63781,
		"node_modules_angular_common_locales_ru-KZ_js"
	],
	"./ru-MD.js": [
		34700,
		"node_modules_angular_common_locales_ru-MD_js"
	],
	"./ru-UA.js": [
		7593,
		"node_modules_angular_common_locales_ru-UA_js"
	],
	"./ru.js": [
		84027,
		"node_modules_angular_common_locales_ru_js"
	],
	"./rw.js": [
		23655,
		"node_modules_angular_common_locales_rw_js"
	],
	"./rwk.js": [
		66996,
		"node_modules_angular_common_locales_rwk_js"
	],
	"./sah.js": [
		92263,
		"node_modules_angular_common_locales_sah_js"
	],
	"./saq.js": [
		25597,
		"node_modules_angular_common_locales_saq_js"
	],
	"./sbp.js": [
		40410,
		"node_modules_angular_common_locales_sbp_js"
	],
	"./sd-Arab.js": [
		11177,
		"node_modules_angular_common_locales_sd-Arab_js"
	],
	"./sd.js": [
		81956,
		"node_modules_angular_common_locales_sd_js"
	],
	"./se-FI.js": [
		97765,
		"node_modules_angular_common_locales_se-FI_js"
	],
	"./se-SE.js": [
		49813,
		"node_modules_angular_common_locales_se-SE_js"
	],
	"./se.js": [
		80946,
		"node_modules_angular_common_locales_se_js"
	],
	"./seh.js": [
		50595,
		"node_modules_angular_common_locales_seh_js"
	],
	"./ses.js": [
		64242,
		"node_modules_angular_common_locales_ses_js"
	],
	"./sg.js": [
		25943,
		"node_modules_angular_common_locales_sg_js"
	],
	"./shi-Latn.js": [
		47774,
		"node_modules_angular_common_locales_shi-Latn_js"
	],
	"./shi-Tfng.js": [
		40852,
		"node_modules_angular_common_locales_shi-Tfng_js"
	],
	"./shi.js": [
		31248,
		"node_modules_angular_common_locales_shi_js"
	],
	"./si.js": [
		3797,
		"node_modules_angular_common_locales_si_js"
	],
	"./sk.js": [
		49850,
		"node_modules_angular_common_locales_sk_js"
	],
	"./sl.js": [
		74310,
		"node_modules_angular_common_locales_sl_js"
	],
	"./smn.js": [
		1280,
		"node_modules_angular_common_locales_smn_js"
	],
	"./sn.js": [
		17798,
		"node_modules_angular_common_locales_sn_js"
	],
	"./so-DJ.js": [
		69365,
		"node_modules_angular_common_locales_so-DJ_js"
	],
	"./so-ET.js": [
		77610,
		"node_modules_angular_common_locales_so-ET_js"
	],
	"./so-KE.js": [
		2283,
		"node_modules_angular_common_locales_so-KE_js"
	],
	"./so.js": [
		86197,
		"node_modules_angular_common_locales_so_js"
	],
	"./sq-MK.js": [
		25160,
		"node_modules_angular_common_locales_sq-MK_js"
	],
	"./sq-XK.js": [
		30804,
		"node_modules_angular_common_locales_sq-XK_js"
	],
	"./sq.js": [
		54497,
		"node_modules_angular_common_locales_sq_js"
	],
	"./sr-Cyrl-BA.js": [
		46489,
		"node_modules_angular_common_locales_sr-Cyrl-BA_js"
	],
	"./sr-Cyrl-ME.js": [
		19187,
		"node_modules_angular_common_locales_sr-Cyrl-ME_js"
	],
	"./sr-Cyrl-XK.js": [
		61126,
		"node_modules_angular_common_locales_sr-Cyrl-XK_js"
	],
	"./sr-Cyrl.js": [
		49462,
		"node_modules_angular_common_locales_sr-Cyrl_js"
	],
	"./sr-Latn-BA.js": [
		61012,
		"node_modules_angular_common_locales_sr-Latn-BA_js"
	],
	"./sr-Latn-ME.js": [
		93670,
		"node_modules_angular_common_locales_sr-Latn-ME_js"
	],
	"./sr-Latn-XK.js": [
		25178,
		"node_modules_angular_common_locales_sr-Latn-XK_js"
	],
	"./sr-Latn.js": [
		11665,
		"node_modules_angular_common_locales_sr-Latn_js"
	],
	"./sr.js": [
		47371,
		"node_modules_angular_common_locales_sr_js"
	],
	"./sv-AX.js": [
		79325,
		"node_modules_angular_common_locales_sv-AX_js"
	],
	"./sv-FI.js": [
		1177,
		"node_modules_angular_common_locales_sv-FI_js"
	],
	"./sv.js": [
		8686,
		"node_modules_angular_common_locales_sv_js"
	],
	"./sw-CD.js": [
		76605,
		"node_modules_angular_common_locales_sw-CD_js"
	],
	"./sw-KE.js": [
		55643,
		"node_modules_angular_common_locales_sw-KE_js"
	],
	"./sw-UG.js": [
		78573,
		"node_modules_angular_common_locales_sw-UG_js"
	],
	"./sw.js": [
		5766,
		"node_modules_angular_common_locales_sw_js"
	],
	"./ta-LK.js": [
		80714,
		"node_modules_angular_common_locales_ta-LK_js"
	],
	"./ta-MY.js": [
		77693,
		"node_modules_angular_common_locales_ta-MY_js"
	],
	"./ta-SG.js": [
		93211,
		"node_modules_angular_common_locales_ta-SG_js"
	],
	"./ta.js": [
		76900,
		"node_modules_angular_common_locales_ta_js"
	],
	"./te.js": [
		2328,
		"node_modules_angular_common_locales_te_js"
	],
	"./teo-KE.js": [
		18223,
		"node_modules_angular_common_locales_teo-KE_js"
	],
	"./teo.js": [
		72031,
		"node_modules_angular_common_locales_teo_js"
	],
	"./tg.js": [
		3063,
		"node_modules_angular_common_locales_tg_js"
	],
	"./th.js": [
		88330,
		"node_modules_angular_common_locales_th_js"
	],
	"./ti-ER.js": [
		50052,
		"node_modules_angular_common_locales_ti-ER_js"
	],
	"./ti.js": [
		91616,
		"node_modules_angular_common_locales_ti_js"
	],
	"./tk.js": [
		36744,
		"node_modules_angular_common_locales_tk_js"
	],
	"./to.js": [
		37844,
		"node_modules_angular_common_locales_to_js"
	],
	"./tr-CY.js": [
		22318,
		"node_modules_angular_common_locales_tr-CY_js"
	],
	"./tr.js": [
		80045,
		"node_modules_angular_common_locales_tr_js"
	],
	"./tt.js": [
		76245,
		"node_modules_angular_common_locales_tt_js"
	],
	"./twq.js": [
		39446,
		"node_modules_angular_common_locales_twq_js"
	],
	"./tzm.js": [
		36572,
		"node_modules_angular_common_locales_tzm_js"
	],
	"./ug.js": [
		46124,
		"node_modules_angular_common_locales_ug_js"
	],
	"./uk.js": [
		50327,
		"node_modules_angular_common_locales_uk_js"
	],
	"./ur-IN.js": [
		30832,
		"node_modules_angular_common_locales_ur-IN_js"
	],
	"./ur.js": [
		52895,
		"node_modules_angular_common_locales_ur_js"
	],
	"./uz-Arab.js": [
		82553,
		"node_modules_angular_common_locales_uz-Arab_js"
	],
	"./uz-Cyrl.js": [
		18122,
		"node_modules_angular_common_locales_uz-Cyrl_js"
	],
	"./uz-Latn.js": [
		44554,
		"node_modules_angular_common_locales_uz-Latn_js"
	],
	"./uz.js": [
		76211,
		"node_modules_angular_common_locales_uz_js"
	],
	"./vai-Latn.js": [
		47147,
		"node_modules_angular_common_locales_vai-Latn_js"
	],
	"./vai-Vaii.js": [
		46547,
		"node_modules_angular_common_locales_vai-Vaii_js"
	],
	"./vai.js": [
		43098,
		"node_modules_angular_common_locales_vai_js"
	],
	"./vi.js": [
		91335,
		"node_modules_angular_common_locales_vi_js"
	],
	"./vo.js": [
		58313,
		"node_modules_angular_common_locales_vo_js"
	],
	"./vun.js": [
		12168,
		"node_modules_angular_common_locales_vun_js"
	],
	"./wae.js": [
		88929,
		"node_modules_angular_common_locales_wae_js"
	],
	"./wo.js": [
		72327,
		"node_modules_angular_common_locales_wo_js"
	],
	"./xh.js": [
		67359,
		"node_modules_angular_common_locales_xh_js"
	],
	"./xog.js": [
		18019,
		"node_modules_angular_common_locales_xog_js"
	],
	"./yav.js": [
		65677,
		"node_modules_angular_common_locales_yav_js"
	],
	"./yi.js": [
		77934,
		"node_modules_angular_common_locales_yi_js"
	],
	"./yo-BJ.js": [
		10954,
		"node_modules_angular_common_locales_yo-BJ_js"
	],
	"./yo.js": [
		20409,
		"node_modules_angular_common_locales_yo_js"
	],
	"./yue-Hans.js": [
		4978,
		"node_modules_angular_common_locales_yue-Hans_js"
	],
	"./yue-Hant.js": [
		39918,
		"node_modules_angular_common_locales_yue-Hant_js"
	],
	"./yue.js": [
		27791,
		"node_modules_angular_common_locales_yue_js"
	],
	"./zgh.js": [
		72981,
		"node_modules_angular_common_locales_zgh_js"
	],
	"./zh-Hans-HK.js": [
		84329,
		"node_modules_angular_common_locales_zh-Hans-HK_js"
	],
	"./zh-Hans-MO.js": [
		14886,
		"node_modules_angular_common_locales_zh-Hans-MO_js"
	],
	"./zh-Hans-SG.js": [
		94409,
		"node_modules_angular_common_locales_zh-Hans-SG_js"
	],
	"./zh-Hans.js": [
		34711,
		"node_modules_angular_common_locales_zh-Hans_js"
	],
	"./zh-Hant-HK.js": [
		17829,
		"node_modules_angular_common_locales_zh-Hant-HK_js"
	],
	"./zh-Hant-MO.js": [
		99079,
		"node_modules_angular_common_locales_zh-Hant-MO_js"
	],
	"./zh-Hant.js": [
		40794,
		"node_modules_angular_common_locales_zh-Hant_js"
	],
	"./zh.js": [
		85068,
		"node_modules_angular_common_locales_zh_js"
	],
	"./zu.js": [
		60643,
		"node_modules_angular_common_locales_zu_js"
	]
};
function webpackAsyncContext(req) {
	if(!__webpack_require__.o(map, req)) {
		return Promise.resolve().then(function() {
			var e = new Error("Cannot find module '" + req + "'");
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		});
	}

	var ids = map[req], id = ids[0];
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__.t(id, 7 | 16);
	});
}
webpackAsyncContext.keys = function() { return Object.keys(map); };
webpackAsyncContext.id = 36896;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 46700:
/*!***************************************************!*\
  !*** ./node_modules/moment/locale/ sync ^\.\/.*$ ***!
  \***************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var map = {
	"./af": 26431,
	"./af.js": 26431,
	"./ar": 81286,
	"./ar-dz": 1616,
	"./ar-dz.js": 1616,
	"./ar-kw": 9759,
	"./ar-kw.js": 9759,
	"./ar-ly": 43160,
	"./ar-ly.js": 43160,
	"./ar-ma": 62551,
	"./ar-ma.js": 62551,
	"./ar-sa": 79989,
	"./ar-sa.js": 79989,
	"./ar-tn": 6962,
	"./ar-tn.js": 6962,
	"./ar.js": 81286,
	"./az": 15887,
	"./az.js": 15887,
	"./be": 14572,
	"./be.js": 14572,
	"./bg": 3276,
	"./bg.js": 3276,
	"./bm": 93344,
	"./bm.js": 93344,
	"./bn": 58985,
	"./bn.js": 58985,
	"./bo": 94391,
	"./bo.js": 94391,
	"./br": 46728,
	"./br.js": 46728,
	"./bs": 5536,
	"./bs.js": 5536,
	"./ca": 41043,
	"./ca.js": 41043,
	"./cs": 70420,
	"./cs.js": 70420,
	"./cv": 33513,
	"./cv.js": 33513,
	"./cy": 6771,
	"./cy.js": 6771,
	"./da": 47978,
	"./da.js": 47978,
	"./de": 46061,
	"./de-at": 25204,
	"./de-at.js": 25204,
	"./de-ch": 2653,
	"./de-ch.js": 2653,
	"./de.js": 46061,
	"./dv": 85,
	"./dv.js": 85,
	"./el": 8579,
	"./el.js": 8579,
	"./en-SG": 84285,
	"./en-SG.js": 84285,
	"./en-au": 25724,
	"./en-au.js": 25724,
	"./en-ca": 10525,
	"./en-ca.js": 10525,
	"./en-gb": 52847,
	"./en-gb.js": 52847,
	"./en-ie": 67216,
	"./en-ie.js": 67216,
	"./en-il": 39305,
	"./en-il.js": 39305,
	"./en-nz": 79130,
	"./en-nz.js": 79130,
	"./eo": 50802,
	"./eo.js": 50802,
	"./es": 40328,
	"./es-do": 45551,
	"./es-do.js": 45551,
	"./es-us": 64790,
	"./es-us.js": 64790,
	"./es.js": 40328,
	"./et": 96389,
	"./et.js": 96389,
	"./eu": 52961,
	"./eu.js": 52961,
	"./fa": 26151,
	"./fa.js": 26151,
	"./fi": 7997,
	"./fi.js": 7997,
	"./fo": 37779,
	"./fo.js": 37779,
	"./fr": 28174,
	"./fr-ca": 3287,
	"./fr-ca.js": 3287,
	"./fr-ch": 38867,
	"./fr-ch.js": 38867,
	"./fr.js": 28174,
	"./fy": 50452,
	"./fy.js": 50452,
	"./ga": 45014,
	"./ga.js": 45014,
	"./gd": 74127,
	"./gd.js": 74127,
	"./gl": 72124,
	"./gl.js": 72124,
	"./gom-latn": 37953,
	"./gom-latn.js": 37953,
	"./gu": 76604,
	"./gu.js": 76604,
	"./he": 1222,
	"./he.js": 1222,
	"./hi": 74235,
	"./hi.js": 74235,
	"./hr": 622,
	"./hr.js": 622,
	"./hu": 37735,
	"./hu.js": 37735,
	"./hy-am": 90402,
	"./hy-am.js": 90402,
	"./id": 59187,
	"./id.js": 59187,
	"./is": 30536,
	"./is.js": 30536,
	"./it": 35007,
	"./it-ch": 94667,
	"./it-ch.js": 94667,
	"./it.js": 35007,
	"./ja": 62093,
	"./ja.js": 62093,
	"./jv": 80059,
	"./jv.js": 80059,
	"./ka": 66870,
	"./ka.js": 66870,
	"./kk": 80880,
	"./kk.js": 80880,
	"./km": 1083,
	"./km.js": 1083,
	"./kn": 68785,
	"./kn.js": 68785,
	"./ko": 21721,
	"./ko.js": 21721,
	"./ku": 37851,
	"./ku.js": 37851,
	"./ky": 1727,
	"./ky.js": 1727,
	"./lb": 40346,
	"./lb.js": 40346,
	"./lo": 93002,
	"./lo.js": 93002,
	"./lt": 64035,
	"./lt.js": 64035,
	"./lv": 56927,
	"./lv.js": 56927,
	"./me": 5634,
	"./me.js": 5634,
	"./mi": 94173,
	"./mi.js": 94173,
	"./mk": 86320,
	"./mk.js": 86320,
	"./ml": 11705,
	"./ml.js": 11705,
	"./mn": 31062,
	"./mn.js": 31062,
	"./mr": 92805,
	"./mr.js": 92805,
	"./ms": 11341,
	"./ms-my": 59900,
	"./ms-my.js": 59900,
	"./ms.js": 11341,
	"./mt": 37734,
	"./mt.js": 37734,
	"./my": 19034,
	"./my.js": 19034,
	"./nb": 9324,
	"./nb.js": 9324,
	"./ne": 46495,
	"./ne.js": 46495,
	"./nl": 70673,
	"./nl-be": 76272,
	"./nl-be.js": 76272,
	"./nl.js": 70673,
	"./nn": 72486,
	"./nn.js": 72486,
	"./pa-in": 2829,
	"./pa-in.js": 2829,
	"./pl": 78444,
	"./pl.js": 78444,
	"./pt": 53170,
	"./pt-br": 66117,
	"./pt-br.js": 66117,
	"./pt.js": 53170,
	"./ro": 96587,
	"./ro.js": 96587,
	"./ru": 39264,
	"./ru.js": 39264,
	"./sd": 42135,
	"./sd.js": 42135,
	"./se": 95366,
	"./se.js": 95366,
	"./si": 93379,
	"./si.js": 93379,
	"./sk": 46143,
	"./sk.js": 46143,
	"./sl": 196,
	"./sl.js": 196,
	"./sq": 21082,
	"./sq.js": 21082,
	"./sr": 91621,
	"./sr-cyrl": 98963,
	"./sr-cyrl.js": 98963,
	"./sr.js": 91621,
	"./ss": 41404,
	"./ss.js": 41404,
	"./sv": 55685,
	"./sv.js": 55685,
	"./sw": 3872,
	"./sw.js": 3872,
	"./ta": 54106,
	"./ta.js": 54106,
	"./te": 39204,
	"./te.js": 39204,
	"./tet": 83692,
	"./tet.js": 83692,
	"./tg": 86361,
	"./tg.js": 86361,
	"./th": 31735,
	"./th.js": 31735,
	"./tl-ph": 96129,
	"./tl-ph.js": 96129,
	"./tlh": 13759,
	"./tlh.js": 13759,
	"./tr": 81644,
	"./tr.js": 81644,
	"./tzl": 90875,
	"./tzl.js": 90875,
	"./tzm": 16878,
	"./tzm-latn": 11041,
	"./tzm-latn.js": 11041,
	"./tzm.js": 16878,
	"./ug-cn": 74357,
	"./ug-cn.js": 74357,
	"./uk": 74810,
	"./uk.js": 74810,
	"./ur": 86794,
	"./ur.js": 86794,
	"./uz": 28966,
	"./uz-latn": 77959,
	"./uz-latn.js": 77959,
	"./uz.js": 28966,
	"./vi": 35386,
	"./vi.js": 35386,
	"./x-pseudo": 23156,
	"./x-pseudo.js": 23156,
	"./yo": 68028,
	"./yo.js": 68028,
	"./zh-cn": 9330,
	"./zh-cn.js": 9330,
	"./zh-hk": 89380,
	"./zh-hk.js": 89380,
	"./zh-tw": 96508,
	"./zh-tw.js": 96508
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 46700;

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["vendor"], function() { return __webpack_exec__(14431); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.js.map