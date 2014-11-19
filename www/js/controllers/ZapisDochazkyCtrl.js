﻿; (function () {
    "use strict";
    angular.module('sol.controllers').controller('ZapisDochazkyCtrl', function ($scope, $rootScope, $log, $q, $filter, ZapisDochazkyService, RozvrhService, TridyService, ObdobiDneService, UdalostService) {
        $log.debug('ZapisDochazkyCtrl');

        angular.element(document)
            .on("pagecreate", "#dochazka", function (event, ui) {
                $log.debug("PAGECREATE - #DOCHAZKA");
            })
            .on("pageshow", "#dochazka", function (event, ui) {
                $log.debug("PAGESHOW - #DOCHAZKA");
                $scope.reset();
                $scope.loadData();
            });

        $scope.reset = function () {
            $scope.data = {};
            $scope.isDataLoaded = false;
            //$scope.posledniZadanyTypAbsence = null;
            //$scope.posledniZadanaPoznamka = null;
            $scope.posledniEditovanyStudentIndex = null;
        };


        function findTridaById(tridy, id) {
            for (var i = 0, len = tridy.length; i < len; i++) {
                if (tridy[i].SKUPINA_ID == id) {
                    //$log.debug(tridy[i]);
                    return tridy[i];
                }
            }

            return null;
        }

        //function getTridaNazev(tridy, id) {
        //    var trida = findTridaById(tridy, id);
        //    if (trida != null)
        //        return trida.NAZEV;
        //    else
        //        return '';
        //}

        //function getTridaPoradi(tridy, id) {
        //    var trida = findTridaById(tridy, id);
        //    if (trida != null)
        //        return trida.PORADI;
        //    else
        //        return 0;
        //}


        function getTridaNazev(trida) {
            if (trida != null)
                return trida.NAZEV;
            else
                return '';
        }

        function getTridaPoradi(trida) {
            if (trida != null)
                return trida.PORADI;
            else
                return 0;
        }



        function dochazkaStudenta(dochazky, obdobiDne, studentID) {
            var result = [];
            //$log.debug(dochazky);


            for (var i = 0, obdobiDneLength = obdobiDne.length; i < obdobiDneLength; i++) {
                var typDochazky = '-';
                var obdobiDneId = obdobiDne[i].OBDOBI_DNE_ID;
                for (var j = 0, dochazkyLength = dochazky.length; j < dochazkyLength; j++) {
                    var dochazka = dochazky[j];
                    if (dochazka.OSOBA_ID == studentID && dochazka.OBDOBI_DNE_ID == obdobiDneId) {
                        typDochazky = typDochazkyText(dochazka.TYP_DOCHAZKY);
                        break;
                    }
                }

                result[i] = typDochazky;
            }

            return result;
        }


        function duvodAbsenceStudenta(dochazky, studentId) {
            for (var i = 0, dochazkyLength = dochazky.length; i < dochazkyLength; i++) {
                var dochazka = dochazky[i];
                if (dochazka.OSOBA_ID == studentId) {
                    return dochazka.POZNAMKA;
                }
            }

            return '';
        }


        function typDochazkyText(value) {
            if (value == '') return "-";
            if (value == "A") return "/";
            if (value == "S") return "Š";
            return value;
        }

        function typDochazkyValue(text) {
            if (text == '-') return "";
            if (text == "/") return "A";
            if (text == "Š") return "S";
            return text;
        }


        function zadaneDochazky(studenti, obdobiDne) {
            var result = [];

            studenti.forEach(function (student, studentIndex, studentArray) {
                obdobiDne.forEach(function (obdobi, obdobiIndex, obdobiArray) {
                    result[result.length] = {
                        "ORGANIZACE_ID": student.ORGANIZACE_ID,
                        "OSOBA_ID": student.OSOBA_ID,
                        "DATUM": RozvrhService.selectedDatum,
                        "OBDOBI_DNE_ID": obdobi.OBDOBI_DNE_ID,
                        "TYP_DOCHAZKY": typDochazkyValue(student.DOCHAZKA[obdobiIndex]),
                        "OBDOBI_ID": obdobi.OBDOBI_ID,
                        "POZNAMKA": student.POZNAMKA,
                        "TYP_VYUKY": "T", //student.TYP_VYUKY,
                        "KODPRA_I": "'hod", //$rootScope.currentUser,
                        "KODPRA_U": "hod" //$rootScope.currentUser
                    };
                });
            });

            return result;
        }


        //$scope.posledniZadanyTypAbsence = "-";
        //$scope.posledniZadanaPoznamka = null;
        $scope.posledniEditovanyStudentIndex = null;

        $scope.prepniAbsenci = function (dochazka, indexHodiny, indexStudenta) {
            if (dochazka[indexHodiny] == '-') {
                dochazka[indexHodiny] = '/'; // A / 
                //$scope.posledniZadanyTypAbsence = '/';
            } else {
                dochazka[indexHodiny] = '-';
                //$scope.posledniZadanyTypAbsence = '-';
            }
            $scope.posledniEditovanyStudentIndex = indexStudenta;
        };

        $scope.editacePoznamky = function (indexStudenta) {
            $scope.posledniEditovanyStudentIndex = indexStudenta;
        }


        $scope.loadData = function () {
            $log.log("ZapisDochazkyCtrl - loadData");

            $scope.UdalostID = RozvrhService.selectedUdalostID;
            $scope.UdalostPoradi = RozvrhService.selectedUdalostPoradi;


            var tridy = TridyService.all();
            var obdobiDne = ObdobiDneService.all();

            var dochazky = ZapisDochazkyService.getByRozvrhovaUdalost($scope.UdalostID, $scope.UdalostPoradi);
            // pockam na vsechny promise
            $q.all([dochazky, tridy, obdobiDne]).then(function(results) {
                $log.log("ZapisDochazkyCtrl - all resloved");

                var dochazky = results[0].data.Data;
                var tridy = results[1].data.Data;
                var obdobiDne = results[2].data.Data;

                //$log.log(dochazky);
                //$log.log(tridy);
                //$log.log(obdobiDne);

                UdalostService.getPopisHodiny($scope.UdalostID, $scope.UdalostPoradi).then(
                    function(result) {
                        $scope.popisHodiny = result.data;
                        //$log.debug(result);
                    },
                    function(error) {
                        $scope.popisHodiny = '';
                        //$log.error(error);
                    }
                );


                angular.forEach(dochazky.Studenti, function(value, key, object) {
                    //$log.debug(value);
                    var trida = findTridaById(tridy, value.TRIDA_ID);
                    var tridaNazev = getTridaNazev(trida);
                    var tridaPoradi = getTridaPoradi(trida);

                    angular.extend(value, { TRIDA_NAZEV: tridaNazev, TRIDA_PORADI: tridaPoradi });
                    angular.extend(value, { DOCHAZKA: dochazkaStudenta(dochazky.Dochazky, dochazky.ObdobiDne, value.OSOBA_ID) });
                    angular.extend(value, { POZNAMKA: duvodAbsenceStudenta(dochazky.Dochazky, value.OSOBA_ID) });

                    //$log.debug(value);

                });


                dochazky.Studenti.sort(function (a, b) {
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

                $scope.data = dochazky;

                $scope.isDataLoaded = true;

                setTimeout(function () {
                    //var table = angular.element('#dochazka-table');
                    var table = $('#dochazka-table');
                    table.table('refresh');
                    $('[type="text"]', table).textinput();
                }, 0);

            },
            function (error) {
                $log.error(error);
            });

        };


        $scope.nazevStudenta = function (student) {
            return (student.PRIJMENI || '') + ' ' + (student.JMENO || '');
        };


        $scope.prednastavitDlePredchozi = function () {
            $log.info('prednastavitDlePredchozi');

            if ($scope.posledniEditovanyStudentIndex == null)
                return;

            var referencniStudent = $scope.data.Studenti[$scope.posledniEditovanyStudentIndex];


            angular.forEach($scope.data.Studenti, function (student) {
                var newDochazka = [];
                angular.copy(referencniStudent.DOCHAZKA, newDochazka);

                //student.DOCHAZKA.forEach(function (item, index, array) {
                //    newDochazka[newDochazka.length] = $scope.posledniZadanyTypAbsence;
                //});

                student.DOCHAZKA = newDochazka;
                student.POZNAMKA = referencniStudent.POZNAMKA;
            });

            //$log.debug($scope.data.Studenti);

        };

        $scope.ulozit = function () {
            $log.info('ulozit');
            //$log.debug($scope.data);

            var status = ZapisDochazkyService.save($scope.UdalostID, $scope.UdalostPoradi, zadaneDochazky($scope.data.Studenti, $scope.data.ObdobiDne));
            //$log.info(status);
            status.then(function (result) {
                //$log.info(result);
                if (result.data.Code == "OK") {
                    $("#popupDochazka").html("Uloženo.").popup("open");
                }
                else if (result.data.Code == "ERROR") {
                    $("#popupDochazka").html("Nepodařilo se uložit. <br>" + result.data.Message).popup("open");
                }
            });
        };

        $scope.zpet = function () {
            $log.info('zpet');
            $.mobile.changePage('#rozvrh', 'slide', true, true);
        };

    });
})();