; (function () {
    "use strict";
    angular.module('sol.controllers')
        .controller('ZapisProbiranehoUcivaCtrl', function ($scope, $rootScope, $log, $q, $filter, ZapisProbiranehoUcivaService, RozvrhService, TridyService, ObdobiDneService, UdalostService) {
            $log.debug('ZapisProbiranehoUcivaCtrl');

            angular.element(document)
                .on("pagecreate", "#probirane-ucivo", function (event, ui) {
                    $log.debug("PAGECREATE - #PROBIRANE-UCIVO");
                })
                .on("pageshow", "#probirane-ucivo", function (event, ui) {
                    $log.debug("PAGESHOW - #PROBIRANE-UCIVO");
                    $scope.reset();
                    $scope.loadData();
                });


            $scope.reset = function () {
                $scope.data = {};
                //$scope.isDataLoaded = false;
                //$scope.posledniEditovanyStudentIndex = null;
                //$scope.isHodnoceniProcenty = false;
                //$scope.isHodnoceniZnamkami = true;
                //$scope.isHodnoceniProcenty = false;
                //$scope.isHodnoceniDruhVysledkuVyber = false;
                //$scope.druhVysledku = "Z";
                $scope.submitted = false;
                //$scope.hodnoceniForm.$setPristine();

                //$('#hodnoceniDruh').selectmenu('refresh');
                $scope.limitToTrida = 1000000;
                $scope.zapsatVsemTridam = true;
                setTimeout(function () {
                    $("#zapsatVsemTridam").checkboxradio("refresh");
                    $scope.setVisibilityTrida();
                }, 0);

                
            };



            $scope.loadData = function () {
                $log.log("ZapisProbiranehoUcivaCtrl - loadData");
                $scope.UdalostID = RozvrhService.selectedUdalostID;
                $scope.UdalostPoradi = RozvrhService.selectedUdalostPoradi;


                //var tridy = TridyService.all();
                //var obdobiDne = ObdobiDneService.all();

                var probiraneUcivo = ZapisProbiranehoUcivaService.getByRozvrhovaUdalost($scope.UdalostID, $scope.UdalostPoradi);

                // pockam na vsechny promise
                $q.all([probiraneUcivo]).then(function (results) {
                    $log.log("ZapisProbiranehoUcivaCtrl - all resloved");

                    var probiraneUcivo = results[0].data.Data;
                    //var tridy = results[1].data.Data;
                    //var obdobiDne = results[2].data.Data;

                    $log.log(probiraneUcivo);
                    //$log.log(tridy);
                    //$log.log(obdobiDne);

                    // $scope.popisHodiny = '27.7.2014 (3.): ČJL (Český jazyk a literatura) - prostě nějaká rozumně dlouhá informace do záhlaví.';
                    UdalostService.getPopisHodiny($scope.UdalostID, $scope.UdalostPoradi).then(
                        function (result) { $scope.popisHodiny = result.data; $log.debug(result); },
                        function (error) { $scope.popisHodiny = ''; $log.error(error); }
                        );


                    //angular.forEach(dochazky.Studenti, function (value, key, object) {
                    //    $log.debug(value);
                    //    angular.extend(value, { TRIDA_NAZEV: nazevTridy(tridy, value.TRIDA_ID) });
                    //    angular.extend(value, { DOCHAZKA: dochazkaStudenta(dochazky.Dochazky, dochazky.ObdobiDne, value.OSOBA_ID) });
                    //    angular.extend(value, { POZNAMKA: duvodAbsenceStudenta(dochazky.Dochazky, value.OSOBA_ID) });

                    //    $log.debug(value);

                    //});
                    probiraneUcivo.Tridy = _(probiraneUcivo.StudijniSkupiny)
                        .map(function (x) { return { TRIDA_ID: x.TRIDA_ID, TRIDA_NAZEV: x.TRIDA_NAZEV, TRIDA_PORADI_ZOBRAZENI: x.TRIDA_PORADI_ZOBRAZENI }; })
                        .uniq(function (x) { return x.TRIDA_ID; })
                        .sortBy(function (x) { return x.NAZEV; })
                        .sortBy(function (x) { return x.PORADI_ZOBRAZENI; }).value();

                    $log.debug(probiraneUcivo);

                    $scope.data = probiraneUcivo;

                    //_.chain($scope.data.StudijniSkupiny) .pluck("genre").uniq().sortBy().value();

                    //$log.debug(_($scope.data.StudijniSkupiny).map(function(skupina) { return { skupina.TRIDA_ID, skupina.TRIDA_NAZEV } }));


                    $scope.seznamTrid = _($scope.data.Tridy).pluck("TRIDA_NAZEV").reduce(function (acc, item) { return acc + ', ' + item; });
                    $scope.selectedTrida = _.chain($scope.data.Tridy).pluck("TRIDA_ID").first().value();

                    //$scope.setVisibilityTrida();

                        $scope.enhanceFields();




                    $scope.isDataLoaded = true;


                },
                    function (error) {
                        $log.error(error);
                    });


                setTimeout(function () {
                    //var table = angular.element('#dochazka-table');
                    //table.table('refresh');
                    //angular.element('[type="text"]', '#hodnoceni-table').textinput();
                    //angular.element('[type="text"]', table).textinput();
                }, 0);
            };


        $scope.ulozit = function() {
            $log.info('ulozit');

            $scope.submitted = true;

            //$scope.$broadcast('show-errors-check-validity');

            if ($scope.probiraneUcivoForm.$invalid) {
                $("#probiraneUcivoNotifier").html("Zadání není validní.").popup("open");
                $log.warn('nebylo uloženo');
                $log.debug($scope.probiraneUcivoForm);
                return;
            }

            var status = ZapisProbiranehoUcivaService.save($scope.UdalostID, $scope.UdalostPoradi, zadaneUcivo($scope.data));

            //$log.info(status);
            status.then(function (result) {
                //$log.info(result);
                if (result.data.Code == "OK") {
                    $log.info('ZapisProbiranehoUciva - SAVED');
                    navigateToRozvrh();
                    $("#rozvrhNotifier").html("Probírané učivo uloženo.").popup("open");
                } else if (result.data.Code == "ERROR") {
                    $log.error("ZapisProbiranehoUciva - ERROR: " + result.data.Message);
                    $("#probiraneUcivoNotifier").html("Nepodařilo se uložit. <br>" + result.data.Message).popup("open");
                }
            });

        };

        $scope.ulozitAZadatDochazku = function() {
            $log.info('ulozit');
            //$.mobile.changePage('#dochazka');

            $scope.submitted = true;

            //$scope.$broadcast('show-errors-check-validity');

            if ($scope.probiraneUcivoForm.$invalid) {
                $("#probiraneUcivoNotifier").html("Zadání není validní.").popup("open");
                $log.warn('nebylo uloženo');
                $log.debug($scope.probiraneUcivoForm);
                return;
            }

            var status = ZapisProbiranehoUcivaService.save($scope.UdalostID, $scope.UdalostPoradi, zadaneUcivo($scope.data));

            //$log.info(status);
            status.then(function (result) {
                //$log.info(result);
                if (result.data.Code == "OK") {
                    $log.info('ZapisProbiranehoUciva - SAVED');
                    navigateToDochazka();
                    $("#dochazkaNotifier").html("Probírané učivo uloženo.").popup("open");
                } else if (result.data.Code == "ERROR") {
                    $log.error("ZapisProbiranehoUciva - ERROR: " + result.data.Message);
                    $("#probiraneUcivoNotifier").html("Nepodařilo se uložit. <br>" + result.data.Message).popup("open");
                }
            });


            
        };


        $scope.zpet = function() {
            $log.info('zpet');
            navigateToRozvrh();
        };


        $scope.showSelecMenu = function(element) {
            $(element).parents('.ui-select').show();
        };

        $scope.hideSelecMenu = function (element) {
            $(element).parents('.ui-select').hide();
        };

        $scope.showTextBox = function (element) {
            $(element).parent('.ui-input-text').show();
        };

        $scope.hideTextBox = function (element) {
            $(element).parent('.ui-input-text').hide();
        };


        $scope.setVisibilityTrida = function () {
            $log.debug('setVisibilityTrida');
            $log.debug($scope.zapsatVsemTridam);

            if ($scope.zapsatVsemTridam) {
                $log.debug('showTextBox');

                //$scope.selectedTrida = null;
                //$scope.limitToTrida = 1;
                $scope.selectedTrida = _.chain($scope.data.Tridy).pluck("TRIDA_ID").first().value();

                $scope.hideSelecMenu($('#probiraneUcivoTrida'));
                $scope.showTextBox($('#seznamTrid'));
            } else {
                $log.debug('showSelecMenu');

                //$scope.limitToTrida = 1000000;
                $scope.selectedTrida = _.chain($scope.data.Tridy).pluck("TRIDA_ID").first().value();

                $scope.hideTextBox($('#seznamTrid'));
                $scope.showSelecMenu($('#probiraneUcivoTrida'));
            }

            $scope.enhanceFields();
        };

        $scope.enhanceFields = function () {
            setTimeout(function () {
                angular.element('[type="number"],[type="text"],textarea').textinput();
                angular.element('#probiraneUcivoTrida').selectmenu('refresh');
            }, 0);
        };
        

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