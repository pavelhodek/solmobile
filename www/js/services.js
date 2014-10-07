//'use strict';

/* Services */

//var solAppServices = angular.module('solApp.services', []);


//solAppServices.factory('navSvc', function ($navigate) {
//    return {
//        slidePage: function (path, type) {
//            $navigate.go(path, type);
//        },
//        back: function () {
//            $navigate.back();
//        }
//    }
//});

//solAppServices.factory('NastaveniService', function ($http, $q, AuthorizationService) {


//})


//solAppServices.factory('SelectedDateService', function () {
//    var selectedDate = new Date();

//    return {
//        getSelectedDate: function () {
//            return selectedDate;
//        },
//        setSelectedDate: function (date) {
//            selectedDate = date;
//        },
//        incrementSelectedDate: function () {
//            selectedDate.setDate(selectedDate.getDate() + 1);
//            return selectedDate;
//        },
//        decrementSelectedDate: function () {
//            selectedDate.setDate(selectedDate.getDate() - 1);
//            return selectedDate;
//        }
//    }
//});


//solAppServices.factory('RozvrhService', function ($http, $q, $log, AuthorizationService) {
//    $log.debug('RozvrhService');

//    var rozvrhData = [
//        { id: '1', nazev: 'ČJL (Český jazyk a literatura)', obdobiDne: '1.', casVyukyOd: new Date(2014, 6, 24, 8, 0, 0), casVyukyDo: new Date(2014, 6, 24, 8, 45, 0), info: '3.A, UC1', popupInfo: 'nějaké informace' },
//        { id: '1', nazev: 'ČJL (Český jazyk a literatura)', obdobiDne: '1.', casVyukyOd: new Date(2014, 6, 24, 8, 0, 0), casVyukyDo: new Date(2014, 6, 24, 8, 45, 0), info: '3.A, UC1', popupInfo: 'nějaké informace' },
//        { id: '1', nazev: 'ČJL (Český jazyk a literatura)', obdobiDne: '1.', casVyukyOd: new Date(2014, 6, 24, 8, 0, 0), casVyukyDo: new Date(2014, 6, 24, 8, 45, 0), info: '3.A, UC1', popupInfo: 'nějaké informace' },
//        { id: '1', nazev: 'ČJL (Český jazyk a literatura)', obdobiDne: '1.', casVyukyOd: new Date(2014, 6, 24, 8, 0, 0), casVyukyDo: new Date(2014, 6, 24, 8, 45, 0), info: '3.A, UC1', popupInfo: 'nějaké informace' },
//        { id: '1', nazev: 'ČJL (Český jazyk a literatura)', obdobiDne: '1.', casVyukyOd: new Date(2014, 6, 24, 8, 0, 0), casVyukyDo: new Date(2014, 6, 24, 8, 45, 0), info: '3.A, UC1', popupInfo: 'nějaké informace' },
//        { id: '1', nazev: 'ČJL (Český jazyk a literatura)', obdobiDne: '1.', casVyukyOd: new Date(2014, 6, 24, 8, 0, 0), casVyukyDo: new Date(2014, 6, 24, 8, 45, 0), info: '3.A, UC1', popupInfo: 'nějaké informace' },
//    ];

//    var deferred = $q.defer();

//    deferred.resolve(rozvrhData);

//    return {
//        getByDatum: function (datum) {
//            $log.debug('RozvrhService - getByDatum');
//            return deferred.promise;
//        }
//    }
//});



//solAppServices.factory('ZapisHodnoceniService', function ($http, $q, $log, AuthorizationService) {
//    $log.debug('ZapisHodnoceniService');
//    var hodnoceniData = [
//        { cvtv: '1', jmeno: 'Adamová Markéta', znamka: '1', slovniHodnoceni: 'super' },
//        { cvtv: '2', jmeno: 'Bořek Jaroslav', znamka: '2', slovniHodnoceni: '' },
//        { cvtv: '3', jmeno: 'Cibulka Tomáš', znamka: '3', slovniHodnoceni: '' },
//        { cvtv: '4', jmeno: 'Dálavská Miroslava', znamka: '-', slovniHodnoceni: 'pracovala velmi dobře' },
//        { cvtv: '5', jmeno: 'Fikus Jan', znamka: '5', slovniHodnoceni: '' },
//        { cvtv: '6', jmeno: 'Gustava Roman', znamka: '2', slovniHodnoceni: '' },
//        { cvtv: '7', jmeno: 'Hrubý Karel', znamka: '5', slovniHodnoceni: '' },
//        { cvtv: '8', jmeno: 'Kalous Michal', znamka: '2', slovniHodnoceni: '' },
//        { cvtv: '9', jmeno: 'Lacko Roman', znamka: '-', slovniHodnoceni: '' },
//        { cvtv: '10', jmeno: 'Malá Jaroslava', znamka: '2', slovniHodnoceni: '' },
//        { cvtv: '11', jmeno: 'Malý Richard', znamka: '1', slovniHodnoceni: '' },
//        { cvtv: '12', jmeno: 'Novák Jan', znamka: '1', slovniHodnoceni: '' },
//        { cvtv: '13', jmeno: 'Novotný Josef', znamka: '', slovniHodnoceni: 'velmi šikovný' },
//        { cvtv: '14', jmeno: 'Novosad Pavel', znamka: '', slovniHodnoceni: '' },
//        { cvtv: '15', jmeno: 'Opatrný Kamil', znamka: '', slovniHodnoceni: '' },
//        { cvtv: '16', jmeno: 'Patera Jindřich', znamka: '', slovniHodnoceni: '' },
//        { cvtv: '17', jmeno: 'Rázná Pavlína', znamka: '', slovniHodnoceni: '' },
//        { cvtv: '18', jmeno: 'Rychlý Petr', znamka: '', slovniHodnoceni: '' },
//        { cvtv: '19', jmeno: 'Stránská Jaroslava', znamka: '', slovniHodnoceni: 'pracovala výborně' },
//        { cvtv: '20', jmeno: 'Strákalová Květoslava', znamka: '', slovniHodnoceni: '' },
//        { cvtv: '21', jmeno: 'Tlustý Petr', znamka: '', slovniHodnoceni: '' },
//        { cvtv: '22', jmeno: 'Toulavá Lenka', znamka: '', slovniHodnoceni: '' },
//        { cvtv: '23', jmeno: 'Uhranulá Eva', znamka: '', slovniHodnoceni: '' },
//        { cvtv: '24', jmeno: 'Veselý Roman', znamka: '', slovniHodnoceni: '' },
//        { cvtv: '25', jmeno: 'Wágner Jaroslav', znamka: '', slovniHodnoceni: '' },
//        { cvtv: '', jmeno: '', znamka: '', slovniHodnoceni: '' }
//    ];

//    var deferred = $q.defer();

//    deferred.resolve(hodnoceniData);

//    return {
//        getByUdalostId: function (udalostID) {
//            $log.debug('ZapisHodnoceniService - getByUdalostId');
//            return deferred.promise;
//        }
//    }
//});


//solAppServices.factory('ZapisDochazkyService', function ($http, $q, $log, AuthorizationService) {
//    $log.debug('ZapisDochazkyService');

//    var dochazkaData = [
//    { 'trida': '3.A', 'cvtv': '1', 'jmeno': 'Adamová Markéta', 'duvodAbsence': '', 'hodiny': ['-', ''] },
//    { 'trida': '3.A', 'cvtv': '2', 'jmeno': 'Bořek Jaroslav', 'duvodAbsence': 'nějaký důvod', 'hodiny': ['/', '/'] },
//    { 'trida': '3.A', 'cvtv': '3', 'jmeno': 'Cibulka Tomáš', 'duvodAbsence': '', 'hodiny': ['-', '/'] },
//    { 'trida': '3.A', 'cvtv': '4', 'jmeno': 'Dálavská Miroslava', 'duvodAbsence': '', 'hodiny': ['-', '-'] },
//    { 'trida': '3.A', 'cvtv': '5', 'jmeno': 'Fikus Jan', 'duvodAbsence': '', 'hodiny': ['/', '-'] },
//    { 'trida': '3.A', 'cvtv': '6', 'jmeno': 'Gustava Roman', 'duvodAbsence': '', 'hodiny': ['/', '/'] },
//    { 'trida': '3.A', 'cvtv': '7', 'jmeno': 'Hrubý Karel', 'duvodAbsence': '', 'hodiny': ['-', '-'] },
//    { 'trida': '3.A', 'cvtv': '8', 'jmeno': 'Kalous Michal', 'duvodAbsence': '', 'hodiny': ['/', '-'] },
//    { 'trida': '3.A', 'cvtv': '9', 'jmeno': 'Lacko Roman', 'duvodAbsence': '', 'hodiny': ['-', '-'] },
//    { 'trida': '3.A', 'cvtv': '10', 'jmeno': 'Malá Jaroslava', 'duvodAbsence': '', 'hodiny': ['-', '-'] },
//    { 'trida': '3.A', 'cvtv': '11', 'jmeno': 'Malý Richard', 'duvodAbsence': '', 'hodiny': ['-', '-'] },
//    { 'trida': '3.A', 'cvtv': '12', 'jmeno': 'Novák Jan', 'duvodAbsence': '', 'hodiny': ['-', '-'] },
//    { 'trida': '3.A', 'cvtv': '13', 'jmeno': 'Novotný Josef', 'duvodAbsence': '', 'hodiny': ['-', '-'] },
//    { 'trida': '3.B', 'cvtv': '14', 'jmeno': 'Novosad Pavel', 'duvodAbsence': '', 'hodiny': ['-', '-'] },
//    { 'trida': '3.B', 'cvtv': '15', 'jmeno': 'Opatrný Kamil', 'duvodAbsence': '', 'hodiny': ['-', '-'] },
//    { 'trida': '3.B', 'cvtv': '16', 'jmeno': 'Patera Jindřich', 'duvodAbsence': '', 'hodiny': ['-', '-'] },
//    { 'trida': '3.B', 'cvtv': '17', 'jmeno': 'Rázná Pavlína', 'duvodAbsence': '', 'hodiny': ['-', '-'] },
//    { 'trida': '3.B', 'cvtv': '18', 'jmeno': 'Rychlý Petr', 'duvodAbsence': '', 'hodiny': ['-', '-'] },
//    { 'trida': '3.B', 'cvtv': '19', 'jmeno': 'Stránská Jaroslava', 'duvodAbsence': '', 'hodiny': ['-', '-'] },
//    { 'trida': '3.B', 'cvtv': '20', 'jmeno': 'Strákalová Květoslava', 'duvodAbsence': '', 'hodiny': ['-', '-'] },
//    { 'trida': '3.B', 'cvtv': '21', 'jmeno': 'Tlustý Petr', 'duvodAbsence': '', 'hodiny': ['-', '-'] },
//    { 'trida': '3.B', 'cvtv': '22', 'jmeno': 'Toulavá Lenka', 'duvodAbsence': '', 'hodiny': ['-', '-'] },
//    { 'trida': '3.B', 'cvtv': '23', 'jmeno': 'Uhranulá Eva', 'duvodAbsence': '', 'hodiny': ['-', '-'] },
//    { 'trida': '3.B', 'cvtv': '24', 'jmeno': 'Veselý Roman', 'duvodAbsence': '', 'hodiny': ['-', '-'] },
//    { 'trida': '3.B', 'cvtv': '25', 'jmeno': 'Wágner Jaroslav', 'duvodAbsence': '', 'hodiny': ['-', '-'] },
//    { 'trida': '3.B', 'cvtv': '', 'jmeno': '', 'duvodAbsence': '', 'hodiny': ['-', '-'] }
//    ];

//    var deferred = $q.defer();

//    deferred.resolve(dochazkaData);

//    return {
//        getByUdalostId: function (udalostID) {
//            $log.debug('ZapisDochazkyService - getByUdalostId');
//            return deferred.promise;
//        }
//    }
//});



//solAppServices.factory('SkolniRokyService', function ($http, $q, $log, AuthorizationService) {
//    $log.debug('SkolniRokyService');

//    // Might use a resource here that returns a JSON array


//    // PhoneGap application
//    // Web page
//    // production

//    //var serviceURL = "http://10.0.2.2/SOLWebApi/api/";
//    var serviceURL = "http://localhost/SOLWebApi/api/";
//    var serviceURL = "http://172.20.2.26/SOLWebApi/api/";


//    return {
//        all: function () {
//            $log.debug('SkolniRokyService - all');
//            var url = serviceURL + 'SkolniRoky';

//            //console.log(AuthorizationService.getAuthorizationHeader());
//            $log.info(AuthorizationService.getAuthorizationHeader());

//            $http.defaults.headers.common.Authorization = AuthorizationService.getAuthorizationHeader();
//            //return {};
//            return $http.get(url);
//        }
//    };

//})


//solAppServices.factory('AuthorizationService', function ($http) {

//    function setAuthorizationHeader() {
//        $http.defaults.headers.common.Authorization = getAuthorizationHeader();
//    }

//    function getAuthorizationHeader() {
//        var username = localStorage.getItem("username");
//        var password = localStorage.getItem("password");

//        var basicAuthHash = base64.encode(username + ":" + password); // window.btoa("ada:xx");

//        //console.log('getAuthorizationHeader login: ' + username + " / " + password);


//        return 'Basic ' + basicAuthHash;
//    }


//    function clearLogin() {
//        var username = localStorage.removeItem("username");
//        var password = localStorage.removeItem("password");
//    }


//    return {
//        setAuthorizationHeader: setAuthorizationHeader,
//        getAuthorizationHeader: getAuthorizationHeader,


//        logout: function () {
//            clearLogin();
//        },


//        storeLogin: function (username, password) {
//            localStorage.setItem("username", username);
//            localStorage.setItem("password", password);

//            setAuthorizationHeader();
//        }
//    }
//})



//// Simple value service.
//angular.module('myApp.services', []).
//  value('version', '0.1');


//// phonegap ready service - listens to deviceready
//myApp.factory('phonegapReady', function () {
//    return function (fn) {
//        var queue = [];
//        var impl = function () {
//            queue.push(Array.prototype.slice.call(arguments));
//        };

//        document.addEventListener('deviceready', function () {
//            queue.forEach(function (args) {
//                fn.apply(this, args);
//            });
//            impl = fn;
//        }, false);

//        return function () {
//            return impl.apply(this, arguments);
//        };
//    };
//});





//myApp.factory('geolocation', function ($rootScope, phonegapReady) {
//    return {
//        getCurrentPosition: function (onSuccess, onError, options) {
//            navigator.geolocation.getCurrentPosition(function () {
//                var that = this,
//                args = arguments;

//                if (onSuccess) {
//                    $rootScope.$apply(function () {
//                        onSuccess.apply(that, args);
//                    });
//                }
//            }, function () {
//                var that = this,
//                args = arguments;

//                if (onError) {
//                    $rootScope.$apply(function () {
//                        onError.apply(that, args);
//                    });
//                }
//            },
//                options);
//        }
//    };
//});

//myApp.factory('accelerometer', function ($rootScope, phonegapReady) {
//    return {
//        getCurrentAcceleration: phonegapReady(function (onSuccess, onError) {
//            navigator.accelerometer.getCurrentAcceleration(function () {
//                var that = this,
//                    args = arguments;

//                if (onSuccess) {
//                    $rootScope.$apply(function () {
//                        onSuccess.apply(that, args);
//                    });
//                }
//            }, function () {
//                var that = this,
//                args = arguments;

//                if (onError) {
//                    $rootScope.$apply(function () {
//                        onError.apply(that, args);
//                    });
//                }
//            });
//        })
//    };
//});

//myApp.factory('notification', function ($rootScope, phonegapReady) {
//    return {
//        alert: phonegapReady(function (message, alertCallback, title, buttonName) {
//            navigator.notification.alert(message, function () {
//                var that = this,
//                    args = arguments;

//                $rootScope.$apply(function () {
//                    alertCallback.apply(that, args);
//                });
//            }, title, buttonName);
//        }),
//        confirm: phonegapReady(function (message, confirmCallback, title, buttonLabels) {
//            navigator.notification.confirm(message, function () {
//                var that = this,
//                    args = arguments;

//                $rootScope.$apply(function () {
//                    confirmCallback.apply(that, args);
//                });
//            }, title, buttonLabels);
//        }),
//        beep: function (times) {
//            navigator.notification.beep(times);
//        },
//        vibrate: function (milliseconds) {
//            navigator.notification.vibrate(milliseconds);
//        }
//    };
//});

//myApp.factory('navSvc', function ($navigate) {
//    return {
//        slidePage: function (path, type) {
//            $navigate.go(path, type);
//        },
//        back: function () {
//            $navigate.back();
//        }
//    }
//});

//myApp.factory('compass', function ($rootScope, phonegapReady) {
//    return {
//        getCurrentHeading: phonegapReady(function (onSuccess, onError) {
//            navigator.compass.getCurrentHeading(function () {
//                var that = this,
//                    args = arguments;

//                if (onSuccess) {
//                    $rootScope.$apply(function () {
//                        onSuccess.apply(that, args);
//                    });
//                }
//            }, function () {
//                var that = this,
//                    args = arguments;

//                if (onError) {
//                    $rootScope.$apply(function () {
//                        onError.apply(that, args);
//                    });
//                }
//            });
//        })
//    };
//});

//myApp.factory('contacts', function ($rootScope, phonegapReady) {
//    return {
//        findContacts: phonegapReady(function (onSuccess, onError) {
//            var options = new ContactFindOptions();
//            options.filter = "";
//            options.multiple = true;
//            var fields = ["displayName", "name"];
//            navigator.contacts.find(fields, function (r) {
//                console.log("Success" + r.length); var that = this,
//                    args = arguments;
//                if (onSuccess) {
//                    $rootScope.$apply(function () {
//                        onSuccess.apply(that, args);
//                    });
//                }
//            }, function () {
//                var that = this,
//                    args = arguments;

//                if (onError) {
//                    $rootScope.$apply(function () {
//                        onError.apply(that, args);
//                    });
//                }
//            }, options)
//        })
//    }
//});