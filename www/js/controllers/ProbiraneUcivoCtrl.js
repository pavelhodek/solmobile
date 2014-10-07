;(function () {
    "use strict";
    angular.module('sol.controllers')

        .controller('ProbiraneUcivoCtrl', function ($scope, $rootScope, $log, ProbiraneUcivoService) {
            $log.debug('ProbiraneUcivoCtrl');

            $scope.popisHodiny = '27.7.2014 (3.): ČJL (Český jazyk a literatura) - prostě nějaká rozumně dlouhá informace do záhlaví';

            var udalostID = '';

            var xx = ProbiraneUcivoService.getByUdalostId(udalostID);

            xx.then(
                function (result) {
                    //$log.log(result);
                    $scope.data = result;
                },
                function (error) {
                    $log.error(error);
                });

            $scope.prednastavitDlePredchozi = function () {
                $log.info('prednastavitDlePredchozi');
            };

            $scope.ulozit = function () {
                $log.info('ulozit');
            }

            $scope.ulozitAZadatDochazku = function () {
                $log.info('ulozit');
                $.mobile.changePage('#dochazka');
            }


            $scope.storno = function () {
                $log.info('storno');
            }

        });
})();