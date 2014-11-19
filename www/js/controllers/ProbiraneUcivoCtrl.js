; (function () {
    "use strict";
    angular.module('sol.controllers')
        .controller('ProbiraneUcivoCtrl', function ($scope, $rootScope, $log, $q, $filter, ProbiraneUcivoService, RozvrhService, TridyService, ObdobiDneService, UdalostService) {

            $log.debug('ProbiraneUcivoCtrl');


            $scope.loadData = function () {
                $log.log("ProbiraneUcivoCtrl - loadData");
                $scope.UdalostID = RozvrhService.selectedUdalostID;
                $scope.UdalostPoradi = RozvrhService.selectedUdalostPoradi;


                var tridy = TridyService.all();
                var obdobiDne = ObdobiDneService.all();

                var dochazky = ProbiraneUcivoService.getByRozvrhovaUdalost($scope.UdalostID, $scope.UdalostPoradi);

                // pockam na vsechny promise
                $q.all([dochazky, tridy, obdobiDne]).then(function (results) {
                    $log.log("ZapisDochazkyCtrl - all resloved");

                    var dochazky = results[0].data.Data;
                    var tridy = results[1].data.Data;
                    var obdobiDne = results[2].data.Data;

                    $log.log(dochazky);
                    $log.log(tridy);
                    $log.log(obdobiDne);

                    // $scope.popisHodiny = '27.7.2014 (3.): ČJL (Český jazyk a literatura) - prostě nějaká rozumně dlouhá informace do záhlaví.';
                    UdalostService.getPopisHodiny($scope.UdalostID, $scope.UdalostPoradi).then(
                        function (result) { $scope.popisHodiny = result.data; $log.debug(result); },
                        function (error) { $scope.popisHodiny = ''; $log.error(error); }
                        );


                    angular.forEach(dochazky.Studenti, function (value, key, object) {
                        $log.debug(value);
                        angular.extend(value, { TRIDA_NAZEV: nazevTridy(tridy, value.TRIDA_ID) });
                        angular.extend(value, { DOCHAZKA: dochazkaStudenta(dochazky.Dochazky, dochazky.ObdobiDne, value.OSOBA_ID) });
                        angular.extend(value, { POZNAMKA: duvodAbsenceStudenta(dochazky.Dochazky, value.OSOBA_ID) });

                        $log.debug(value);

                    });

                    //$log.debug(data);

                    $scope.data = dochazky;

                    $scope.isDataLoaded = true;


                },
                    function (error) {
                        $log.error(error);
                    });


                setTimeout(function () {
                    var table = angular.element('#dochazka-table');
                    table.table('refresh');
                    //angular.element('[type="text"]', '#hodnoceni-table').textinput();
                    //angular.element('[type="text"]', table).textinput();
                }, 0);
            };


            /*
            var xx = ProbiraneUcivoService.getByRozvrhovaUdalost($scope.UdalostID, $scope.UdalostPoradi);

            xx.then(
                function (result) {
                    //$log.log(result);
                    $scope.data = result;
                },
                function (error) {
                    $log.error(error);
                });
            */

            $scope.ulozit = function () {
                $log.info('ulozit');
            }

            $scope.ulozitAZadatDochazku = function () {
                $log.info('ulozit');
                $.mobile.changePage('#dochazka');
            }


            $scope.zpet = function () {
                $log.info('zpet');
                $.mobile.changePage('#rozvrh', 'slide', true, true);
            }

        });
})();