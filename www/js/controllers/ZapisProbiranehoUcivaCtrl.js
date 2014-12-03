; (function () {
    "use strict";
    angular.module('sol.controllers')
        .controller('ZapisProbiranehoUcivaCtrl', function($scope, $rootScope, $log, $q, $filter, ZapisProbiranehoUcivaService, RozvrhService, TridyService, ObdobiDneService, UdalostService) {
        //$log.debug('ZapisProbiranehoUcivaCtrl');

        angular.element(document)
            .on("pagecreate", "#probirane-ucivo", function(event, ui) {
                //$log.debug("PAGECREATE - #PROBIRANE-UCIVO");
            })
            .on("pageshow", "#probirane-ucivo", function(event, ui) {
                //$log.debug("PAGESHOW - #PROBIRANE-UCIVO");
                $scope.reset();
                $scope.loadData();
            });


        $scope.reset = function() {
            $scope.data = {};
            $scope.isDataLoaded = false;
            $scope.submitted = false;

            $scope.jeViceTrid = true;
            $scope.jeViceHodin = true;

            $scope.limitToTrida = 1000000;
            $scope.zapsatVsemTridam = true;
            setTimeout(function() {

                $scope.hideCheckBox($('#zapsatVsemTridam'));
                $scope.hideCheckBox($('#zapsatHodinyZvlast'));


                $("#zapsatVsemTridam").checkboxradio("refresh");
                $scope.setVisibilityTrida();
            }, 0);
        };


        //$scope.$watch(function (scope) { return scope.zapsatVsemTridam; }, function (newVal, oldVal) {
        //    $log.debug('zapsatVsemTridam has changed!');
        //});

        $scope.$watch("zapsatVsemTridam", function(newVal, oldVal) {
            $log.debug('zapsatVsemTridam has changed!');
        });


        //$scope.$watch(function (scope) { return scope.zapsatVsemTridam; }, function (newVal, oldVal) {
        //    $log.debug('zapsatVsemTridam has changed!');
        //});


        $scope.loadData = function() {
            //$log.log("ZapisProbiranehoUcivaCtrl - loadData");
            $scope.UdalostID = RozvrhService.selectedUdalostID;
            $scope.UdalostPoradi = RozvrhService.selectedUdalostPoradi;


            //var tridy = TridyService.all();
            //var obdobiDne = ObdobiDneService.all();

            var probiraneUcivo = ZapisProbiranehoUcivaService.getByRozvrhovaUdalost($scope.UdalostID, $scope.UdalostPoradi);

            // pockam na vsechny promise
            $q.all([probiraneUcivo]).then(function(results) {
                    //$log.log("ZapisProbiranehoUcivaCtrl - all resloved");

                    var probiraneUcivo = results[0].data.Data;

                    //$log.log(probiraneUcivo);

                    UdalostService.getPopisHodiny($scope.UdalostID, $scope.UdalostPoradi).then(
                        function(result) {
                            $scope.popisHodiny = result.data;
                            //$log.debug(result);
                        },
                        function(error) {
                            $scope.popisHodiny = '';
                            $log.error(error);
                        }
                    );

                    probiraneUcivo.Tridy = _(probiraneUcivo.StudijniSkupiny)
                        .map(function(x) { return { TRIDA_ID: x.TRIDA_ID, TRIDA_NAZEV: x.TRIDA_NAZEV, TRIDA_PORADI_ZOBRAZENI: x.TRIDA_PORADI_ZOBRAZENI }; })
                        .uniq(function(x) { return x.TRIDA_ID; })
                        .sortBy(function(x) { return x.NAZEV; })
                        .sortBy(function(x) { return x.PORADI_ZOBRAZENI; }).value();

                    $log.debug(probiraneUcivo);

                    $scope.data = probiraneUcivo;

                    $scope.pocetTrid = _.size($scope.data.Tridy);
                    $scope.pocetHodin = _.size($scope.data.ObdobiDne);

                    $scope.seznamTrid = _($scope.data.Tridy).pluck("TRIDA_NAZEV").reduce(function(acc, item) { return acc + ', ' + item; });
                    $scope.selectedTrida = _.chain($scope.data.Tridy).pluck("TRIDA_ID").first().value();

                    if ($scope.pocetTrid > 1) $scope.showCheckBox($('#zapsatVsemTridam'));
                    if ($scope.pocetHodin > 1) $scope.showCheckBox($('#zapsatHodinyZvlast'));


                    var pocetProbiraneUcivoView = 1;
                    if ($scope.zapsatHodinyZvlast) {
                        pocetProbiraneUcivoView = $scope.pocetHodin;
                    }

                    //var ProbiraneUcivoView = [];
                    makeProbiraneUcivoView();


                    $scope.enhanceFields();

                    $log.info($scope.data.ProbiraneUcivo);
                    $log.info($scope.data.ProbiraneUcivoView);

                    //$scope.$watchCollection("data.ProbiraneUcivo", function (newValue, oldValue) {
                    //    $log.debug('watchCollection');
                    //    $log.info(newValue, oldValue);
                    //});

                    //$scope.$watch("data.ProbiraneUcivo", function (newValue, oldValue) {
                    //    $log.debug('watch');
                    //    $log.info(newValue, oldValue);
                    //});


                    $scope.$watch("data.ProbiraneUcivo", function(newValue, oldValue, x, y, z) {
                        $log.debug('watch values');
                        $log.info(newValue, oldValue, x, y, z);


                        //_.each($scope.data.ProbiraneUcivo, function (item) {
                        //    item.PROBRANE_UCIVO = newValue.PROBRANE_UCIVO;
                        //    item.POZNAMKA = newValue.POZNAMKA;

                        //});

                    }, true);

                    $scope.isDataLoaded = true;


                },
                function(error) {
                    $log.error(error);
                });


            setTimeout(function() {
                //var table = angular.element('#dochazka-table');
                //table.table('refresh');
                //angular.element('[type="text"]', '#hodnoceni-table').textinput();
                //angular.element('[type="text"]', table).textinput();
            }, 0);
        };


        $scope.ulozit = function() {
            //$log.info('ulozit');

            $scope.submitted = true;

            if ($scope.probiraneUcivoForm.$invalid) {
                $("#probiraneUcivoNotifier").html("Zadání není validní.").popup("open");
                //$log.warn('nebylo uloženo');
                //$log.debug($scope.probiraneUcivoForm);
                return;
            }

            var status = ZapisProbiranehoUcivaService.save($scope.UdalostID, $scope.UdalostPoradi, zadaneUcivo($scope.data));

            status.then(function(result) {
                if (result.data.Code == "OK") {
                    //$log.info('ZapisProbiranehoUciva - SAVED');
                    navigateToRozvrh();
                    $("#rozvrhNotifier").html("Probírané učivo uloženo.").popup("open");
                } else if (result.data.Code == "ERROR") {
                    $log.error("ZapisProbiranehoUciva - ERROR: " + result.data.Message);
                    $("#probiraneUcivoNotifier").html("Nepodařilo se uložit. <br>" + result.data.Message).popup("open");
                }
            });

        };

        $scope.ulozitAZadatDochazku = function() {
            //$log.info('ulozit');

            $scope.submitted = true;

            if ($scope.probiraneUcivoForm.$invalid) {
                $("#probiraneUcivoNotifier").html("Zadání není validní.").popup("open");
                //$log.warn('nebylo uloženo');
                //$log.debug($scope.probiraneUcivoForm);
                return;
            }

            var status = ZapisProbiranehoUcivaService.save($scope.UdalostID, $scope.UdalostPoradi, zadaneUcivo($scope.data));

            status.then(function(result) {
                if (result.data.Code == "OK") {
                    //$log.info('ZapisProbiranehoUciva - SAVED');
                    navigateToDochazka();
                    $("#dochazkaNotifier").html("Probírané učivo uloženo.").popup("open");
                } else if (result.data.Code == "ERROR") {
                    $log.error("ZapisProbiranehoUciva - ERROR: " + result.data.Message);
                    $("#probiraneUcivoNotifier").html("Nepodařilo se uložit. <br>" + result.data.Message).popup("open");
                }
            });


        };


        $scope.zpet = function() {
            //$log.info('zpet');
            navigateToRozvrh();
        };


        $scope.showSelecMenu = function(element) {
            $(element).parents('.ui-select').show();
        };

        $scope.hideSelecMenu = function(element) {
            $(element).parents('.ui-select').hide();
        };

        $scope.showTextBox = function(element) {
            $(element).parent('.ui-input-text').show();
        };

        $scope.hideTextBox = function(element) {
            $(element).parent('.ui-input-text').hide();
        };

        $scope.showCheckBox = function(element) {
            $(element).parent('.ui-checkbox').show();
        };

        $scope.hideCheckBox = function(element) {
            $(element).parent('.ui-checkbox').hide();
        };

        $scope.setVisibilityTrida = function() {
            //$log.debug('setVisibilityTrida');
            //$log.debug($scope.zapsatVsemTridam);

            if ($scope.zapsatVsemTridam) {
                //$log.debug('showTextBox');

                //$scope.selectedTrida = null;
                //$scope.limitToTrida = 1;
                $scope.selectedTrida = _.chain($scope.data.Tridy).pluck("TRIDA_ID").first().value();

                $scope.hideSelecMenu($('#probiraneUcivoTrida'));
                $scope.showTextBox($('#seznamTrid'));
            } else {
                //$log.debug('showSelecMenu');

                //$scope.limitToTrida = 1000000;
                $scope.selectedTrida = _.chain($scope.data.Tridy).pluck("TRIDA_ID").first().value();

                $scope.hideTextBox($('#seznamTrid'));
                $scope.showSelecMenu($('#probiraneUcivoTrida'));
            }

            $scope.enhanceFields();
        };

        $scope.enhanceFields = function() {
            setTimeout(function() {
                angular.element('[type="number"],[type="text"],textarea').textinput();
                angular.element('#probiraneUcivoTrida').selectmenu('refresh');
            }, 0);
        };


        $scope.zapsatVsemTridamChanged = function() {
            $scope.setVisibilityTrida();
            makeProbiraneUcivoView();
        };

        $scope.zapsatHodinyZvlastChanged = function() {
            makeProbiraneUcivoView();
        };

        $scope.probiraneUcivoTridaChanged = function () {
            makeProbiraneUcivoView();
        };


        function makeProbiraneUcivoView() {
            var ProbiraneUcivoView = _($scope.data.ProbiraneUcivo)
                .map(function(x) {
                    return {
                        OBDOBI_DNE_ID: x.OBDOBI_DNE_ID,
                        SKUPINA_ID: x.SKUPINA_ID,
                        SKUPINY_ID: x.SKUPINY_ID,
                        PROBRANE_UCIVO: x.PROBRANE_UCIVO,
                        POZNAMKA: x.POZNAMKA,
                        POCET_ODUCENYCH_HODIN: x.POCET_ODUCENYCH_HODIN
                    };
                })
                .filter(function(x) { return x.SKUPINA_ID == $scope.selectedTrida; })
                //.filter(function (x) { return x.SKUPINA_ID == $scope.selectedTrida; })
                .value();

            $scope.data.ProbiraneUcivoView = ProbiraneUcivoView;
            $scope.enhanceFields();
        }


        function navigateToRozvrh() {
            $.mobile.changePage('#rozvrh', 'slide', true, true);
            $scope.reset();
        }


        function navigateToDochazka() {
            $.mobile.changePage('#dochazka');
            $scope.reset();
        }


        function zadaneUcivo(data) {
            var result = data.ProbiraneUcivo;

            return result;
        }

    });
})();