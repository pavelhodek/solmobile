; (function () {
    "use strict";
    angular.module('sol.controllers').controller('ZapisHodnoceniCtrl', function ($scope, $rootScope, $log, $q, ZapisHodnoceniService, DruhyHodnoceniService, RozvrhService, TridyService, ObdobiDneService, UdalostService, ObdobiRokuService, StupniceHodnoceniService) {
        $log.debug('ZapisHodnoceniCtrl');

        angular.element(document)
            .on("pagecreate", "#hodnoceni", function (event, ui) {
                $log.debug("PAGECREATE - #HODNOCENI");
            })
            .on("pageshow", "#hodnoceni", function (event, ui) {
                $log.debug("PAGESHOW - #HODNOCENI");
                $scope.reset();
                $scope.loadData();
            });


        $scope.reset = function () {
            $scope.data = {};
            $scope.isDataLoaded = false;
            $scope.posledniEditovanyStudentIndex = null;
        };


        $scope.loadData = function () {
            $log.log("ZapisHodnoceniCtrl - loadData");

            $scope.UdalostID = RozvrhService.selectedUdalostID;
            $scope.UdalostPoradi = RozvrhService.selectedUdalostPoradi;

            ObdobiRokuService.getByDate(RozvrhService.selectedDatum).then(
                // {data: Object, status: 200, headers: function, config: Object, statusText: "OK"}
                function (result) {
                    $log.info(result);
                    $scope.OBDOBI_ID_P = result.OBDOBI_ID;
                    setTimeout(function() {
                        $('#hodnoceniPololeti').selectmenu('refresh');
                    }, 0);
                },
                function (err) {
                    $scope.OBDOBI_ID_P = null;
                    $log.error(err);
                });


            var hodnoceni = ZapisHodnoceniService.getByRozvrhovaUdalost($scope.UdalostID, $scope.UdalostPoradi);
            var druhyHodnoceni = DruhyHodnoceniService.all();
            var tridy = TridyService.all();
            var obdobiRoku = ObdobiRokuService.all();
            var stupniceHodnoceni = StupniceHodnoceniService.all();

            //var obdobiDne = ObdobiDneService.all();            

            // pockam na vsechny promise
            $q.all([hodnoceni, druhyHodnoceni, tridy, obdobiRoku, stupniceHodnoceni]).then(function (results) {
                $log.log("ZapisHodnoceniCtrl - all resloved");

                var hodnoceni = results[0].data.Data;
                var druhyHodnoceni = results[1].data.Data;
                var tridy = results[2].data.Data;
                var obdobiRoku = results[3].data.Data;
                var stupniceHodnoceni = results[4].data.Data;

                //var obdobiDne = results[2].data.Data;

                //$log.log(hodnoceni);
                //$log.log(druhyHodnoceni);
                //$log.log(tridy);
                //$log.log(obdobiRoku);
                //$log.log(stupniceHodnoceni);

                UdalostService.getPopisHodiny($scope.UdalostID, $scope.UdalostPoradi).then(
                    function (result) {
                        $scope.popisHodiny = result.data;
                        //$log.debug(result);
                    },
                    function (error) {
                        $scope.popisHodiny = '';
                        //$log.error(error);
                    }
                    );

                angular.forEach(hodnoceni.Studenti, function (value, key, object) {
                    //$log.debug(value);
                    angular.extend(value, { TRIDA_NAZEV: nazevTridy(tridy, value.TRIDA_ID) });
                    //angular.extend(value, { DOCHAZKA: dochazkaStudenta(dochazky.Dochazky, dochazky.ObdobiDne, value.OSOBA_ID) });
                    //angular.extend(value, { POZNAMKA: duvodAbsenceStudenta(dochazky.Dochazky, value.OSOBA_ID) });

                    //$log.debug(value);

                });


                hodnoceni.Studenti.sort(function (a, b) {
                    //$log.debug(a.TRIDA_PORADI);
                    //$log.debug(a.TRIDA_NAZEV);
                    //$log.debug(a.PRIJMENI);
                    //$log.debug(a.JMENO);
                    //$log.debug(a.CVTV);

                    var order = (a.TRIDA_PORADI || 0) - (b.TRIDA_PORADI || 0);
                    //$log.debug(order);

                    if (order != 0) {
                        return order;
                    }

                    order = (a.TRIDA_NAZEV || "").localeCompare(b.TRIDA_NAZEV || "");
                    if (order != 0) {
                        return order;
                    }

                    order = (a.PRIJMENI || "").localeCompare(b.PRIJMENI || "");
                    if (order != 0) {
                        return order;
                    }

                    order = (a.JMENO || "").localeCompare(b.JMENO || "");
                    if (order != 0) {
                        return order;
                    }

                    order = (a.CVTV || 0) - (b.CVTV || 0);
                    if (order != 0) {
                        return order;
                    }

                    return order;
                });



                //$log.debug(data);
                hodnoceni.DruhyHodnoceni = druhyHodnoceni;
                hodnoceni.ObdobiRoku = obdobiRoku;
                hodnoceni.StupniceHodnoceni = stupniceHodnoceni;

                $scope.data = hodnoceni;

                //$log.info($scope.data);

                $scope.isDataLoaded = true;

                setTimeout(function () {
                    var table = angular.element('#hodnoceni-table');
                    table.table('refresh');
                    angular.element('[type="text"]', table).textinput();
                }, 0);

            },
            function (error) {
                $log.error(error);
            });

        };


        $scope.nazevStudenta = function (student) {
            return (student.PRIJMENI || '') + ' ' + (student.JMENO || '');
        };

        $scope.ulozit = function () {
            $log.info('ulozit');
        }

        $scope.ulozitAPodobne = function () {
            $log.info('ulozitAPodobne');
        };

        $scope.zpet = function () {
            $log.info('zpet');
            $.mobile.changePage('#rozvrh', 'slide', true, true);
        }

        // ------------------

        function nazevTridy(tridy, id) {
            for (var i = 0, len = tridy.length; i < len; i++) {
                if (tridy[i].SKUPINA_ID == id) {
                    //$log.debug(tridy[i].NAZEV);
                    return tridy[i].NAZEV;
                }
            }

            return '';
        }


        $scope.posledniEditovanyStudentIndex = null;
        $scope.hodnoceniNastavitVsem = false;
        $scope.vybraneHodnoceni = null;

        $scope.prepniHodnoceni = function (student, indexStudenta, event) {
            $log.debug('prepniHodnoceni');
            $scope.hodnoceniNastavitVsem = false;
            // kvuli jqm extenzim je treba refresh
            setTimeout(function () {
                $("#hodnoceniNastavitVsem").checkboxradio("refresh");
            }, 0);

            $scope.vybraneHodnoceni = student.VYSLEDEK;

            $("#hodnoceniVyberPopup").popup("open", {
                transition: "pop",
                positionTo: "origin",
                //x: event.clientX,
                //y: event.clientY

                x: event.pageX,
                y: event.pageY

            });

            $scope.posledniEditovanyStudentIndex = indexStudenta;
            setTimeout(function() {
                $("input[type='radio']").checkboxradio();
                $("input[type='radio']").checkboxradio("refresh");
            }, 0);
        };

        $scope.nastavHodnoceni = function (vysledek) {
            $log.info('nastavHodnoceni');

            var student = $scope.data.Studenti[$scope.posledniEditovanyStudentIndex];

            student.VYSLEDEK = vysledek;
            $("#hodnoceniVyberPopup").popup("close");
        };

    });

})();