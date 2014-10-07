//'use strict';

/* Controllers */

//var solAppControllers = angular.module('sol.controllers', []);



//solAppControllers.controller('ZapisHodnoceniCtrl', function ($scope, $rootScope, $log, ZapisHodnoceniService) {
//solAppControllers.controller('ZapisHodnoceniCtrl', ['$scope', '$rootScope', '$log', 'ZapisHodnoceniService', function ($scope, $rootScope, $log, ZapisHodnoceniService) {
//    $log.debug('ZapisHodnoceniCtrl');

//    angular.element(document)
//        .on("pagecreate", "#hodnoceni", function (event, ui) {
//            $log.debug("PAGECREATE - #HODNOCENI");
//        })
//        .on("pageshow", "#hodnoceni", function (event, ui) {
//            $log.debug("PAGESHOW - #HODNOCENI");
//            $scope.init();
//        });


//    $scope.clearData = function () {
//        $scope.data = {};
//        $scope.isDataLoaded = false;
//    }


//    var udalostID = '';

//    $scope.init = function () {
//        $scope.loadData();
//    }


//    $scope.loadData = function () {
//        var xx = ZapisHodnoceniService.getByUdalostId(udalostID);

//        xx.then(
//            function (result) {
//                $log.log("ZapisHodnoceniCtrl - loadData");

//                $scope.popisHodiny = '27.7.2014 (3.): ČJL (Český jazyk a literatura) - prostě nějaká rozumně dlouhá informace do záhlaví.';

//                $scope.data = result;

//                $scope.isDataLoaded = true;
//            },
//            function (error) {
//                $log.error(error);
//            });


//        setTimeout(function() {
//            var table = angular.element('#hodnoceni-table');
//            table.table('refresh');
//            //angular.element('[type="text"]', '#hodnoceni-table').textinput();
//            angular.element('[type="text"]', table).textinput();
//        }, 0);


////.success(function (data) {
//        //    $log.log(data);
//        //    $scope.data = data;
//        //})
//        //.error(function (data) {
//        //    $log.error(data);
//        //});
//    }


//    $scope.prednastavitDlePredchozi = function () {
//        $log.info('prednastavitDlePredchozi');
//    };

//    $scope.ulozit = function () {
//        $log.info('ulozit');
//    }

//    $scope.storno = function () {
//        $log.info('storno');
//    }

//}]);
//});

//solAppControllers.controller('GlobalCtrl', ['$scope', '$rootScope', '$log', 'ZapisHodnoceniService', function ($scope, $rootScope, $log, ZapisHodnoceniService) {
//    $rootScope.userName = 'hod';
//    //$rootScope.selectedDate = new Date();

//    //$rootScope.incrementSelectedDate = function () {
//    //    $rootScope.selectedDate.setDate($rootScope.selectedDate.getDate() + 1);
//    //}

//    //$rootScope.decrementSelectedDate = function () {
//    //    $rootScope.selectedDate.setDate($rootScope.selectedDate.getDate() - 1);
//    //}

//    //$rootScope.decrementSelectedDate = function (daysToAdd) {
//    //    $rootScope.selectedDate.setDate($rootScope.selectedDate.getDate() + daysToAdd);
//    //}


//    //angular.element(document)
//    //    .on("pagecreate", "#hodnoceni", function (event, ui) {
//    //        $log.debug("PAGECREATE - #HODNOCENI");
//    //    })
//    //    .on("pageshow", "#hodnoceni", function (event, ui) {
//    //        $log.debug("PAGESHOW - #HODNOCENI");
//    //    })


//    //$(function ($) {
//    //    $(document)
//    //        .on("pagecreate", "#hodnoceni", function (event, ui) {
//    //            $log.debug("pagecreate - #hodnoceni");

//    //            //$("#hodnoceni")
//    //            //    .swipeleft(function () {
//    //            //        //console.log("swipeleft");
//    //            //        $.mobile.pageContainer.pagecontainer("change", "rozvrh.html", {});
//    //            //    })
//    //            //    .swiperight(function () {
//    //            //        //console.log("swiperight");
//    //            //        $.mobile.pageContainer.pagecontainer("change", "dochazka.html", {});
//    //            //    });
//    //        });
//    //});



//}]);

//solAppControllers.controller('SkolniRokyCtrl', function ($scope, $log, SkolniRokyService) {
//    $log.debug('SkolniRokyCtrl');

//    SkolniRokyService.all()
//        .success(function (result) {
//            //$log.log(result);
//            $scope.skolniRoky = result;
//        })
//        .error(function (error) {
//            $log.error(error);
//        })
//    ;

//});



//solAppControllers.controller('RozvrhCtrl', function ($scope, $rootScope, $log, SelectedDateService, RozvrhService) {
//    $log.debug('RozvrhCtrl');

//    angular.element(document)
//        .on("pagecreate", "#rozvrh", function (event, ui) {
//            $log.debug("PAGECREATE - #ROZVRH");
//        })
//        .on("pageshow", "#rozvrh", function (event, ui) {
//            $log.debug("PAGESHOW - #ROZVRH");
//            $scope.init();
//        });

//    $scope.timeFormat = "HH:mm";

//    $scope.init = function () {
//        $scope.loadData();
//    }

//    $scope.selectedDate = SelectedDateService.getSelectedDate();

//    $scope.loadData = function () {
//        var xx = RozvrhService.getByDatum($scope.selectedDate);

//        xx.then(
//            function (result) {
//                $log.log("RozvrhCtrl - loadData");

//                //$scope.popisHodiny = '27.7.2014 (3.): ČJL (Český jazyk a literatura) - prostě nějaká rozumně dlouhá informace do záhlaví.';

//                $scope.data = result;

//                $scope.isDataLoaded = true;
//            },
//            function (error) {
//                $log.error(error);
//            });


//        setTimeout(function () {
//            var table = angular.element('#rozvrh-table');
//            table.listview('refresh');

//            //angular.element('[type="text"]', '#hodnoceni-table').textinput();
//            //angular.element('[type="text"]', table).textinput();
//        }, 0)

//    };

//        //$scope.popisHodiny = '27.7.2014 (3.): ČJL (Český jazyk a literatura) - prostě nějaká rozumně dlouhá informace do záhlaví';

//    $scope.popupMenu = function (event, id, x) {
//        $log.info('popupMenu');
//        $log.debug(event);
//        $log.debug(id);
//        $log.debug(x);

        
//        $('#popupMenu').popup('open', {
//            transition: 'pop',
//            positionTo: "origin",
//            //x: event.clientX,
//            //y: event.clientY

//            x: event.pageX,
//            y: event.pageY

//        });
//    }


//    $scope.popupInfo = function (event, id, x) {
//        $log.info('popupInfo');
//        $log.debug(event);
//        $log.debug(id);
//        $log.debug(x);

//        alert(x);

//        $('#popupInfo').popup('open', {
//            transition: 'pop',
//            positionTo: "origin",
//            //x: event.clientX,
//            //y: event.clientY

//            x: event.pageX,
//            y: event.pageY
//        });



//        //<p><strong>Detail hodiny</strong></p>
//        //<p>Zde může být celá řada dalších informací prakticky libovolně formátovaných, včetně formulářových prvků či tabulek.</p>


//        //$('#about').popup('open', {
//        //    transition: 'pop'
//        //});
//    }


//    $scope.zapsatProbiraneUcivo = function (changePage) {
//        //$.mobile.changePage(changePage, { options });
//        //$(":mobile-pagecontainer").pagecontainer("change", "target", { options });
//        //$.mobile.pageContainer.pagecontainer("change", "target", { options });
//        //$("body").pagecontainer("change", "target", { options });

//        $.mobile.pageContainer.pagecontainer('change', changePage, {
//            transition: 'none',
//            reload: true,
//            changeHash: true,
//            reverse: false,
//            showLoadMsg: true
//        });
//    };

//    $scope.zapsatDochazku = function (changePage) {
//        $.mobile.pageContainer.pagecontainer('change', changePage, {
//            transition: 'none', // 
//            reload: true,
//            changeHash: true,
//            reverse: false,
//            showLoadMsg: true
//        });
//    };

//    $scope.zapsatHodnoceni = function (changePage) {
//        $.mobile.pageContainer.pagecontainer('change', changePage, {
//            transition: 'none', 
//            reload: true,
//            changeHash: true,
//            reverse: false,
//            showLoadMsg: true
//        });
//    };


//    $scope.prednastavitDlePredchozi = function () {
//        $log.info('prednastavitDlePredchozi');
//    };

//    $scope.ulozit = function () {
//        $log.info('ulozit');
//    }

//    $scope.storno = function () {
//        $log.info('storno');
//    }

//});



//solAppControllers.controller('ZapisDochazkyCtrl', function ($scope, $rootScope, $log, ZapisDochazkyService) {
//    $log.debug('ZapisDochazkyCtrl');
//    //$scope.pokus = "ABCD";

//    $scope.popisHodiny = '27.7.2014 (3.): ČJL (Český jazyk a literatura) - prostě nějaká rozumně dlouhá informace do záhlaví';

//    var udalostID = '';

//    var xx = ZapisDochazkyService.getByUdalostId(udalostID);

//    xx.then(
//        function (result) {
//            //$log.log(result);
//            $scope.data = result;
//        },
//        function (error) {
//            $log.error(error);
//        });

//    $scope.prednastavitDlePredchozi = function () {
//        $log.info('prednastavitDlePredchozi');
//    };

//    $scope.ulozit = function () {
//        $log.info('ulozit');
//    }

//    $scope.storno = function () {
//        $log.info('storno');
//    }

//});


//solAppControllers.controller('ProbiraneUcivoCtrl', function ($scope, $rootScope, $log, ProbiraneUcivoService) {
//    $log.debug('ProbiraneUcivoCtrl');

//    $scope.popisHodiny = '27.7.2014 (3.): ČJL (Český jazyk a literatura) - prostě nějaká rozumně dlouhá informace do záhlaví';

//    var udalostID = '';

//    var xx = ProbiraneUcivoService.getByUdalostId(udalostID);

//    xx.then(
//        function (result) {
//            //$log.log(result);
//            $scope.data = result;
//        },
//        function (error) {
//            $log.error(error);
//        });

//    $scope.prednastavitDlePredchozi = function () {
//        $log.info('prednastavitDlePredchozi');
//    };

//    $scope.ulozit = function () {
//        $log.info('ulozit');
//    }

//    $scope.ulozitAZadatDochazku = function () {
//        $log.info('ulozit');
//        $.mobile.changePage('#dochazka');
//    }


//    $scope.storno = function () {
//        $log.info('storno');
//    }

//});




    //.controller('HomeCtrl', function ($scope, navSvc, $rootScope) {
    //    $rootScope.showSettings = false;
    //    $scope.slidePage = function (path, type) {
    //        console.log('slidePage');
    //        navSvc.slidePage(path, type);
    //        console.log('slidePage - OK');
    //    };
    //    $scope.back = function () {
    //        navSvc.back();
    //    };
    //    $scope.changeSettings = function () {
    //        $rootScope.showSettings = true;
    //    };
    //    $scope.closeOverlay = function () {
    //        $rootScope.showSettings = false;
    //    };

    //    $scope.openPopup = function (page, popupId){
    //        $('#' + popupId).html($(page.el)).popup('open');
    //    }

    //})



//angular.module('sol.controllers', [])
//    .controller('SkolniRokyCtrl', function ($scope, SkolniRokyService) {
//        SkolniRokyService.all().success(function (data) { $scope.skolniRoky = data });
//    })





//function HomeCtrl($scope, navSvc, $rootScope) {
//    $rootScope.showSettings = false;
//    $scope.slidePage = function (path, type) {
//        navSvc.slidePage(path, type);
//    };
//    $scope.back = function () {
//        navSvc.back();
//    };
//    $scope.changeSettings = function () {
//        $rootScope.showSettings = true;
//    };
//    $scope.closeOverlay = function () {
//        $rootScope.showSettings = false;
//    };
//}

//function NotificationCtrl($scope) {
//    $scope.alertNotify = function () {
//        navigator.notification.alert("Sample Alert", function () { console.log("Alert success") }, "My Alert", "Close");
//    };

//    $scope.beepNotify = function () {
//        navigator.notification.beep(1);
//    };

//    $scope.vibrateNotify = function () {
//        navigator.notification.vibrate(3000);
//    };

//    $scope.confirmNotify = function () {
//        navigator.notification.confirm("My Confirmation", function () { console.log("Confirm Success") }, "Are you sure?", ["Ok", "Cancel"]);
//    };
//}

//function GeolocationCtrl($scope, navSvc, $rootScope) {
//    navigator.geolocation.getCurrentPosition(function (position) {
//        $scope.position = position;
//        $scope.$apply();
//    }, function (e) { console.log("Error retrieving position " + e.code + " " + e.message) });

//    $scope.back = function () {
//        navSvc.back();
//    };
//}

//function AccelerCtrl($scope) {
//    navigator.accelerometer.getCurrentAcceleration(function (acceleration) {
//        $scope.acceleration = acceleration;
//    }, function (e) { console.log("Error finding acceleration " + e) });
//}

//function DeviceCtrl($scope) {
//    $scope.device = device;
//}

//function CompassCtrl($scope) {
//    navigator.compass.getCurrentHeading(function (heading) {
//        $scope.heading = heading;
//        $scope.$apply();
//    }, function (e) { console.log("Error finding compass " + e.code) });
//}

//function HackerNewsCtrl($scope, $rootScope) {

//    // load in data from hacker news unless we already have
//    if (!$rootScope.items) {

//        jx.load('http://api.ihackernews.com/page', function (data) {
//            console.log(JSON.stringify(data));
//            $rootScope.items = data.items;
//            $scope.$apply();
//        }, 'json');

//    } else {
//        console.log('data already loaded');
//    }

//    $scope.loadItem = function (item) {
//        navigator.notification.alert(item.url, function () { console.log("Alert success") }, "My Alert", "Close");
//    };
//}


//function ContactsCtrl($scope) {
//    $scope.find = function () {
//        $scope.contacts = [];
//        var options = new ContactFindOptions();
//        //options.filter=""; //returns all results
//        options.filter = $scope.searchTxt;
//        options.multiple = true;
//        var fields = ["displayName", "name", "phoneNumbers"];
//        navigator.contacts.find(fields, function (contacts) {
//            $scope.contacts = contacts;
//            $scope.$apply();
//        }, function (e) { console.log("Error finding contacts " + e.code) }, options);
//    }
//}

//function CameraCtrl($scope) {
//    $scope.takePic = function () {
//        var options = {
//            quality: 50,
//            destinationType: Camera.DestinationType.DATA_URL,
//            sourceType: 1, // 0:Photo Library, 1=Camera, 2=Saved Photo Album
//            encodingType: 0 // 0=JPG 1=PNG
//        }
//        // Take picture using device camera and retrieve image as base64-encoded string
//        navigator.camera.getPicture(onSuccess, onFail, options);
//    }
//    var onSuccess = function (imageData) {
//        console.log("On Success! ");
//        $scope.picData = "data:image/jpeg;base64," + imageData;
//        $scope.$apply();
//    };
//    var onFail = function (e) {
//        console.log("On fail " + e);
//    };
//}

