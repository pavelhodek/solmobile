;(function () {
    "use strict";
    angular.module('sol.controllers')

        .controller('ZapisHodnoceniCtrl', ['$scope', '$rootScope', '$log', 'ZapisHodnoceniService', function ($scope, $rootScope, $log, ZapisHodnoceniService, UdalostService) {
            $log.debug('ZapisHodnoceniCtrl');

            angular.element(document)
                .on("pagecreate", "#hodnoceni", function (event, ui) {
                    $log.debug("PAGECREATE - #HODNOCENI");
                })
                .on("pageshow", "#hodnoceni", function (event, ui) {
                    $log.debug("PAGESHOW - #HODNOCENI");
                    $scope.loadData();
                });


            $scope.clearData = function () {
                $scope.data = {};
                $scope.isDataLoaded = false;
            }


            

            //$scope.init = function () {
            //    $scope.loadData();
            //}


            $scope.loadData = function () {
                //var xx = ZapisHodnoceniService.getByUdalostId(udalostID);

                //var udalostID = ZapisHodnoceniService.selectedUdalostID;
                //var poradi = ZapisHodnoceniService.selectedUdalostPoradi;


                $scope.UdalostID = ZapisHodnoceniService.selectedUdalostID;
                $scope.UdalostPoradi = ZapisHodnoceniService.selectedUdalostPoradi;

                var xx = ZapisHodnoceniService.getByRozvrhovaUdalost($scope.UdalostID, $scope.UdalostPoradi);

                xx.then(
                    function (result) {
                        $log.log("ZapisHodnoceniCtrl - loadData");

                        $scope.popisHodiny = '27.7.2014 (3.): ČJL (Český jazyk a literatura) - prostě nějaká rozumně dlouhá informace do záhlaví.';

                        $scope.data = result;

                        $scope.isDataLoaded = true;
                    },
                    function (error) {
                        $log.error(error);
                    });


                setTimeout(function () {
                    var table = angular.element('#hodnoceni-table');
                    table.table('refresh');
                    //angular.element('[type="text"]', '#hodnoceni-table').textinput();
                    angular.element('[type="text"]', table).textinput();
                }, 0);


                //.success(function (data) {
                //    $log.log(data);
                //    $scope.data = data;
                //})
                //.error(function (data) {
                //    $log.error(data);
                //});
            }


            $scope.prednastavitDlePredchozi = function () {
                $log.info('prednastavitDlePredchozi');
            };

            $scope.ulozit = function () {
                $log.info('ulozit');
            }

            $scope.storno = function () {
                $log.info('storno');
            }

        }]);

})();