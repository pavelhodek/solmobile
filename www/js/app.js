//'use strict';

// angular app
(function () {
    angular.module('sol', ['ngResource', 'sol.controllers', 'sol.services']);
    angular.module('sol.controllers', []);
    angular.module('sol.services', []);

    
    var sol = angular.module("sol");

    sol.config([
        '$httpProvider', function($httpProvider) {
            //$httpProvider.defaults.useXDomain = true;
            ////$httpProvider.defaults.withCredentials = true;
            //delete $httpProvider.defaults.headers.common["X-Requested-With"];
            //$httpProvider.defaults.headers.common["Accept"] = "application/json";
            //$httpProvider.defaults.headers.common["Content-Type"] = "application/json";
        }
    ]);



})();



var deviceReadyDeferred = $.Deferred();
var jqmReadyDeferred = $.Deferred();

//document.addEventListener("deviceReady", deviceReady, false);

//function deviceReady() {
//  deviceReadyDeferred.resolve();
//}

//$(document).on("mobileinit", function () {
//  jqmReadyDeferred.resolve();
//});

//$.when(deviceReadyDeferred, jqmReadyDeferred).then(doWhenBothFrameworksLoaded);

//function doWhenBothFrameworksLoaded() {
//  // TBD
//}



var app = {

    //log: function (message) {
    //    if (window && window.console && window.console.log) {
    //        window.console.log(message);
    //    }
    //},

    // APPLICATION CONSTRUCTOR
    initialize: function () {
        //this.log("initialize");
        //this.deviceReadyDeferred = $.Deferred();
        //this.jqmReadyDeferred = $.Deferred();

        this.bindEvents();
    },

    // BIND EVENT LISTENERS
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        //this.log("bindEvents");
        //document.addEventListener('deviceReady', this.onDeviceReady, false);
        document.addEventListener("deviceReady", this.onDeviceReady, false);


        //$(document).on("mobileinit", function () {
        //    //this.log("mobileinit");
        //    this.jqmReadyDeferred.resolve();
        //});

        $(document).on("mobileinit", function () {
            jqmReadyDeferred.resolve();
        });


        //$.when(this.deviceReadyDeferred, this.jqmReadyDeferred).then(this.doWhenAllFrameworksLoaded);

        $.when(deviceReadyDeferred, jqmReadyDeferred).then(this.doWhenAllFrameworksLoaded);

        //this.log("bindEvents - ok");
    },

    // DEVICEREADY EVENT HANDLER
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        //this.log("onDeviceReady");

        deviceReadyDeferred.resolve();
        //this.deviceReadyDeferred.resolve();

        app.receivedEvent('deviceready');


        var element = document.getElementById('deviceProperties');
        if (element) {
            element.innerHTML = 'Device Name: ' + device.name + '<br />' +
                                'Device Cordova: ' + device.cordova + '<br />' +
                                'Device Platform: ' + device.platform + '<br />' +
                                'Device UUID: ' + device.uuid + '<br />' +
                                'Device Version: ' + device.version + '<br />';

        }

    },

    // UPDATE DOM ON A RECEIVED EVENT
    receivedEvent: function (id) {
        //var parentElement = document.getElementById(id);
        //var listeningElement = parentElement.querySelector('.listening');
        //var receivedElement = parentElement.querySelector('.received');

        //listeningElement.setAttribute('style', 'display:none;');
        //receivedElement.setAttribute('style', 'display:block;');


        //log('Received Event: ' + id);
    },

    doWhenAllFrameworksLoaded: function () {
        // TBD
        //this.log("READY");
    },

};


//<ul data-role="listview" data-inset="true"> \
//    <li data-icon="home"><a href="#index">Hlavní stránka</a></li> \
//    <li data-icon="calendar"><a href="#rozvrh" >Rozvrh</a></li> \
//    <li data-icon="bullets"><a href="#probirane-ucivo" >Probírané učivo</a></li> \
//    <li data-icon="check"><a href="#dochazka" >Docházka</a></li> \
//    <li data-icon="grid"><a href="#hodnoceni" >Hodnocení</a></li> \
//    <li data-icon="false"><a href="#skolni-rok" data-icon="gear" data-iconpos="left">Školní rok</a></li> \
//    <li data-role="list-divider"></li> \
//    <li data-icon="user"><a href="#login" >Přihlášení</a></li> \
//    <li data-icon="delete" ><a href="#logout" >Odhlášení</a></li> \
//    <li data-icon="gear"><a href="#nastaveni" >Nastavení</a></li> \
//    <li data-icon="search"><a href="#napoveda" >Nápověda</a></li> \
//    <li data-icon="info"><a href="#o-aplikaci" >O aplikaci</a></li> \
//</ul> \


var solSidePanel = '\
<div data-role="panel" id="solSidePanel" data-position="left" data-display="push" data-theme="a" class="sol-sidebar" > \
    <div data-role="header"> \
        <h1>Menu</h1> \
        <a href="#" data-role="button" data-rel="close" class="ui-btn ui-btn-right ui-btn-icon-notext ui-icon-delete  ui-corner-all" >Zavřít</a> \
    </div> \
    <ul data-role="listview" data-inset="true"> \
        <li data-icon="home"><a href="#index">Hlavní stránka</a></li> \
        <li data-icon="calendar"><a href="#rozvrh" >Rozvrh</a></li> \
        <li data-role="list-divider"></li> \
        <li data-icon="user"><a href="#login" >Přihlášení</a></li> \
        <li data-icon="delete" ><a href="#logout" >Odhlášení</a></li> \
        <li data-icon="gear"><a href="#nastaveni" >Nastavení</a></li> \
    </ul> \
</div>';


$(document).one('pagebeforecreate', function () {
    $.mobile.pageContainer.prepend(solSidePanel);
    $("#solSidePanel").panel().enhanceWithin();
});






//function log(message) {
//    if (windows && windows.console && windows.console.log) {
//        console.log(message);
//    }
//}


//var sol = angular.module('sol', ['sol.controllers', 'sol.services'])
//    .config(function ($http, AuthorizationService) {

//         Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
//         for form inputs)
//        if (window.cordova && window.cordova.plugins.Keyboard) {
//            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
//        }
//        if (window.StatusBar) {
//             org.apache.cordova.statusbar required
//            StatusBar.styleDefault();
//        }

//        $http.defaults.headers.common.Authorization = AuthorizationService.getAuthorizationHeader();
//    })



////var solApp = angular.module('solApp', ['$stateProvider', '$urlRouterProvider', '$locationProvider', 'sol.controllers', 'sol.services'])
////var solApp = angular.module('solApp', ['ngTouch', 'ngRoute', 'ui.router', 'solApp.controllers', 'solApp.services', 'ajoslin.mobile-navigate'])
//    .run(function ($http, AuthorizationService) {

//        //// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
//        //// for form inputs)
//        //// cordova plugin add https://github.com/driftyco/ionic-plugins-keyboard.git
//        //if (window.cordova && window.cordova.plugins.Keyboard) {
//        //    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
//        //}
//        //// cordova plugin add https://github.com/jonathannaguin/org.apache.cordova.statusbar.git
//        //if (window.StatusBar) {
//        //    // org.apache.cordova.statusbar required
//        //    StatusBar.styleDefault();
//        //}

//        //$http.defaults.headers.common.Authorization = AuthorizationService.getAuthorizationHeader();
//    })

//    //// http://stackoverflow.com/questions/15606751/angular-changes-urls-to-unsafe-in-extension-page
//    //.config(['$compileProvider', function($compileProvider) {   
//    //    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel|sms|chrome-extension):/);
//    //    // Angular before v1.2 uses $compileProvider.urlSanitizationWhitelist(...)
//    //}])



//    ////.config(['$routeProvider', function ($routeProvider) {
//    //.config(['$routeProvider', function ($routeProvider) {
//    //    $routeProvider.when('/', { templateUrl: 'partials/napoveda.html', controller: 'HomeCtrl' });
//    //    $routeProvider.when('/about', { templateUrl: 'partials/o-aplikaci.html' });
//    //    $routeProvider.when('/rozvrh', { templateUrl: 'partials/rozvrh.html' });
//    //    //$routeProvider.when('/view3', { templateUrl: 'partials/accelerometerView.html' });
//    //    //$routeProvider.when('/view4', { templateUrl: 'partials/deviceInfoView.html' });
//    //    //$routeProvider.when('/view5', { templateUrl: 'partials/cameraView.html' });
//    //    //$routeProvider.when('/view6', { templateUrl: 'partials/contactsView.html' });
//    //    //$routeProvider.when('/view7', { templateUrl: 'partials/compassView.html' });
//    //    //$routeProvider.when('/view8', { templateUrl: 'partials/hackerNewsView.html' });
//    //    $routeProvider.otherwise({ redirectTo: '/' });
//    //}])

//;


//var solApp = angular.module('solApp', ['myApp.filters', 'myApp.services', 'myApp.directives', 'ajoslin.mobile-navigate', 'ngMobile'])
//var myApp = angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives', 'ajoslin.mobile-navigate', 'ngMobile'])
    //.config(function ($compileProvider) {
    //    $compileProvider.urlSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
    //})
    //.config(['$routeProvider', function ($routeProvider) {
    //    $routeProvider.when('/', { templateUrl: 'partials/homeView.html', controller: 'HomeCtrl' });
    //    $routeProvider.when('/view1', { templateUrl: 'partials/notificationView.html' });
    //    $routeProvider.when('/view2', { templateUrl: 'partials/geolocationView.html' });
    //    $routeProvider.when('/view3', { templateUrl: 'partials/accelerometerView.html' });
    //    $routeProvider.when('/view4', { templateUrl: 'partials/deviceInfoView.html' });
    //    $routeProvider.when('/view5', { templateUrl: 'partials/cameraView.html' });
    //    $routeProvider.when('/view6', { templateUrl: 'partials/contactsView.html' });
    //    $routeProvider.when('/view7', { templateUrl: 'partials/compassView.html' });
    //    $routeProvider.when('/view8', { templateUrl: 'partials/hackerNewsView.html' });
    //    $routeProvider.otherwise({ redirectTo: '/' });
    //}]);




//.config(function ($stateProvider, $urlRouterProvider) {
//    $stateProvider

//      .state('app', {
//          url: "/app",
//          abstract: true,
//          templateUrl: "templates/main.html",
//          controller: 'AppCtrl'
//      })

//    .state('app.logout', {
//        url: "/logout",
//        views: {
//            'mainContent': {
//                controller: "LogoutCtrl"
//            }
//        }
//    })


//      .state('app.search', {
//          url: "/search",
//          views: {
//              'mainContent': {
//                  templateUrl: "templates/search.html"
//              }
//          }
//      })

//      .state('app.browse', {
//          url: "/browse",
//          views: {
//              'mainContent': {
//                  templateUrl: "templates/browse.html"
//              }
//          }
//      })

//      .state('app.playlists', {
//          url: "/playlists",
//          views: {
//              'mainContent': {
//                  templateUrl: "templates/playlists.html",
//                  controller: 'PlaylistsCtrl'
//              }
//          }
//      })

//      .state('app.single', {
//          url: "/playlists/:playlistId",
//          views: {
//              'mainContent': {
//                  templateUrl: "templates/playlist.html",
//                  controller: 'PlaylistCtrl'
//              }
//          }
//      })

//      .state('app.rozvrh', {
//          url: "/rozvrh",
//          views: {
//              'mainContent': {
//                  templateUrl: "templates/rozvrh.html",
//                  controller: 'RozvrhCtrl'
//              }
//          }
//      })

//    .state('app.rozvrh-detail', {
//        url: '/rozvrh/:rozvrhId',
//        views: {
//            'mainContent': {
//                templateUrl: 'templates/rozvrh-detail.html',
//                controller: 'RozvrhDetailCtrl'
//            }
//        }
//    })


//    // skolni-roky
//      .state('app.skolni-roky', {
//          url: "/skolni-roky",
//          views: {
//              'mainContent': {
//                  templateUrl: "templates/skolni-roky.html",
//                  controller: 'SkolniRokyCtrl'
//              }
//          }
//      })

//      .state('app.o-aplikaci', {
//          url: "/o-aplikaci",
//          views: {
//              'mainContent': {
//                  templateUrl: "templates/o-aplikaci.html"
//              }
//          }
//      })

//      .state('app.nastaveni', {
//          url: "/nastaveni",
//          views: {
//              'mainContent': {
//                  templateUrl: "templates/nastaveni.html"
//              }
//          }
//      })


//    .state('app.map', {
//        url: '/map',
//        views: {
//            'mainContent': {
//                templateUrl: 'templates/map.html',
//                controller: 'MapCtrl'
//            }
//        }
//    })

//    ;

//    // if none of the above states are matched, use this as the fallback
//    //$urlRouterProvider.otherwise('/app/playlists');
//    $urlRouterProvider.otherwise('/app/rozvrh');
//});



;



//// Declare app level module which depends on filters, and services
//var myApp = angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives', 'ajoslin.mobile-navigate', 'ngMobile'])
//    .config(function ($compileProvider) {
//        $compileProvider.urlSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
//    })
//    .config(['$routeProvider', function ($routeProvider) {
//        $routeProvider.when('/', { templateUrl: 'partials/homeView.html', controller: 'HomeCtrl' });
//        $routeProvider.when('/view1', { templateUrl: 'partials/notificationView.html' });
//        $routeProvider.when('/view2', { templateUrl: 'partials/geolocationView.html' });
//        $routeProvider.when('/view3', { templateUrl: 'partials/accelerometerView.html' });
//        $routeProvider.when('/view4', { templateUrl: 'partials/deviceInfoView.html' });
//        $routeProvider.when('/view5', { templateUrl: 'partials/cameraView.html' });
//        $routeProvider.when('/view6', { templateUrl: 'partials/contactsView.html' });
//        $routeProvider.when('/view7', { templateUrl: 'partials/compassView.html' });
//        $routeProvider.when('/view8', { templateUrl: 'partials/hackerNewsView.html' });
//        $routeProvider.otherwise({ redirectTo: '/' });
//    }]);





///**
// * Created by HOD on 7. 7. 2014.
// */
//function alertInfo(event, ui) {
//    var strAlert = "";

//    for (var thing in event) {
//        strAlert += thing + " : " + event[thing] + "\n";
//    }
//    alert(strAlert);
//}




////ROZVRH

//;jQuery(function ($) {
//    $(document)
//        .on("pagecreate", "#rozvrh", function (event, ui) {
//            //console.log("create rozvrh");

//            $("#rozvrh")
//                .swipeleft(function () {
//                    //console.log("swipeleft");
//                    $.mobile.pageContainer.pagecontainer("change", "dochazka.html", {});
//                })
//                .swiperight(function () {
//                    //console.log("swiperight");
//                    $.mobile.pageContainer.pagecontainer("change", "hodnoceni.html", {});
//                });
//        })
//        .on("pagecreate", "#dochazka", function (event, ui) {
//            //console.log("create dochazka");

//            $("#dochazka")
//                .swipeleft(function () {
//                    //console.log("swipeleft");
//                    $.mobile.pageContainer.pagecontainer("change", "hodnoceni.html", {});
//                })
//                .swiperight(function () {
//                    //console.log("swiperight");
//                    $.mobile.pageContainer.pagecontainer("change", "rozvrh.html", {});
//                });
//        })
//        .on("pagecreate", "#hodnoceni", function (event, ui) {
//            //console.log("create hodnoceni");

//            $("#hodnoceni")
//                .swipeleft(function () {
//                    //console.log("swipeleft");
//                    $.mobile.pageContainer.pagecontainer("change", "rozvrh.html", {});
//                })
//                .swiperight(function () {
//                    //console.log("swiperight");
//                    $.mobile.pageContainer.pagecontainer("change", "dochazka.html", {});
//                });
//        });
//});

