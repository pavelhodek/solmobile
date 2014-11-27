; (function () {
    "use strict";
    angular.module('sol.controllers')

        .controller('NastaveniCtrl', ['$scope', '$rootScope', '$http', '$log', 'NastaveniService', function ($scope, $rootScope, $http, $log, NastaveniService) {
            $log.debug('NastaveniCtrl');

            $scope.apiURL = NastaveniService.getApiURL();

            $scope.save = function () {
                $log.debug('NastaveniCtrl - SAVE');

                NastaveniService.setApiURL($scope.apiURL);

                //var headers = {
                //    'Access-Control-Allow-Origin' : '*',
                //    'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS, PUT',
                //    'Content-Type': 'application/json',
                //    'Accept': 'application/json'
                //};

                $http({
                    method: 'GET', url: $scope.apiURL + "/Test", timeout: 5000
                    //,headers: headers
                    }).
                   success(function (data, status, headers, config) {
                       $("#nastaveniNotifier").html("Nastavení uloženo. <br>Zadané URL je platné.").popup("open");

                   }).
                   error(function (data, status, headers, config) {
                       $log.debug(data);
                       $log.debug(status);
                       $log.debug(headers);
                       $log.debug(config);
                       $("#nastaveniNotifier").html("Nastavení uloženo. <br>Nepopdařilo se však ověřit platnost URL.").popup("open");
                   });


                //$.mobile.changePage('#login', 'slide', true, true);
            };






        }]);
})();