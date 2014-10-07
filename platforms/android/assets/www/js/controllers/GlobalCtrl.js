;(function () {
    "use strict";
    angular.module('sol.controllers')

        .controller('GlobalCtrl', ['$scope', '$rootScope', '$log', 'ZapisHodnoceniService', function ($scope, $rootScope, $log, ZapisHodnoceniService) {
            $rootScope.userName = 'hod';
            //$rootScope.selectedDate = new Date();

            //$rootScope.incrementSelectedDate = function () {
            //    $rootScope.selectedDate.setDate($rootScope.selectedDate.getDate() + 1);
            //}

            //$rootScope.decrementSelectedDate = function () {
            //    $rootScope.selectedDate.setDate($rootScope.selectedDate.getDate() - 1);
            //}

            //$rootScope.decrementSelectedDate = function (daysToAdd) {
            //    $rootScope.selectedDate.setDate($rootScope.selectedDate.getDate() + daysToAdd);
            //}


            //angular.element(document)
            //    .on("pagecreate", "#hodnoceni", function (event, ui) {
            //        $log.debug("PAGECREATE - #HODNOCENI");
            //    })
            //    .on("pageshow", "#hodnoceni", function (event, ui) {
            //        $log.debug("PAGESHOW - #HODNOCENI");
            //    })


            //$(function ($) {
            //    $(document)
            //        .on("pagecreate", "#hodnoceni", function (event, ui) {
            //            $log.debug("pagecreate - #hodnoceni");

            //            //$("#hodnoceni")
            //            //    .swipeleft(function () {
            //            //        //console.log("swipeleft");
            //            //        $.mobile.pageContainer.pagecontainer("change", "rozvrh.html", {});
            //            //    })
            //            //    .swiperight(function () {
            //            //        //console.log("swiperight");
            //            //        $.mobile.pageContainer.pagecontainer("change", "dochazka.html", {});
            //            //    });
            //        });
            //});



        }]);


})();