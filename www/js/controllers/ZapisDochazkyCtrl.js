;
(function() {
    "use strict";
    angular.module('sol.controllers').controller('ZapisDochazkyCtrl', function ($scope, $rootScope, $log, $q, $filter, ZapisDochazkyService, RozvrhService, TridyService, ObdobiDneService) {
        $log.debug('ZapisDochazkyCtrl');

        angular.element(document)
            .on("pagecreate", "#dochazka", function(event, ui) {
                $log.debug("PAGECREATE - #DOCHAZKA");
            })
            .on("pageshow", "#dochazka", function(event, ui) {
                    $log.debug("PAGESHOW - #DOCHAZKA");
                    $scope.reset();
                    $scope.loadData();
                }
            );

        $scope.reset = function() {
            $scope.data = {};
            $scope.isDataLoaded = false;
            $scope.posledniZadanyTypAbsence = null;
        };

            //$scope.popisHodiny = '27.7.2014 (3.): ČJL (Český jazyk a literatura) - prostě nějaká rozumně dlouhá informace do záhlaví';


            function nazevTridy(tridy, id) {
                for (var i = 0, len = tridy.length; i < len; i++) {
                    if (tridy[i].SKUPINA_ID == id) {
                        $log.debug(tridy[i].NAZEV);
                        return tridy[i].NAZEV;
                    }
                }

                return '';
            }

            function dochazkaStudenta(dochazky, obdobiDne, studentID) {
                var result = [];
                $log.debug(dochazky);


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

                studenti.forEach(function(student, studentIndex, studentArray) {
                    obdobiDne.forEach(function(obdobi, obdobiIndex, obdobiArray) {
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


            $scope.posledniZadanyTypAbsence = null;

            $scope.prepniAbsenci = function(dochazka, index) {
                if (dochazka[index] == '-') {
                    dochazka[index] = '/'; // A / 
                    $scope.posledniZadanyTypAbsence = '/';
                } else {
                    dochazka[index] = '-';
                    $scope.posledniZadanyTypAbsence = '-';
                }
            };

            $scope.loadData = function() {
                $log.log("ZapisDochazkyCtrl - loadData");
                $scope.UdalostID = RozvrhService.selectedUdalostID;
                $scope.UdalostPoradi = RozvrhService.selectedUdalostPoradi;


                var tridy = TridyService.all();
                var obdobiDne = ObdobiDneService.all();

                var dochazky = ZapisDochazkyService.getByRozvrhovaUdalost($scope.UdalostID, $scope.UdalostPoradi);

                $q.all([dochazky, tridy, obdobiDne]).then(function(results) {
                        $log.log("ZapisDochazkyCtrl - all resloved");

                        var dochazky = results[0].data.Data;
                        var tridy = results[1].data.Data;
                        var obdobiDne = results[2].data.Data;

                        $log.log(dochazky);
                        $log.log(tridy);
                        $log.log(obdobiDne);

                        $scope.popisHodiny = '27.7.2014 (3.): ČJL (Český jazyk a literatura) - prostě nějaká rozumně dlouhá informace do záhlaví.';

                        angular.forEach(dochazky.Studenti, function(value, key, object) {
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
                    function(error) {
                        $log.error(error);
                    });


                setTimeout(function() {
                    var table = angular.element('#dochazka-table');
                    table.table('refresh');
                    //angular.element('[type="text"]', '#hodnoceni-table').textinput();
                    //angular.element('[type="text"]', table).textinput();
                }, 0);
            };


            $scope.nazevStudenta = function(student) {
                return (student.PRIJMENI || '') + ' ' + (student.JMENO || '');
            };


            $scope.prednastavitDlePredchozi = function() {
                $log.info('prednastavitDlePredchozi');

                angular.forEach($scope.data.Studenti, function (student) {
                    var newDochazka = [];
                    student.DOCHAZKA.forEach(function(item, index, array) {
                        newDochazka[newDochazka.length] = $scope.posledniZadanyTypAbsence;
                    });
                    student.DOCHAZKA = newDochazka;
                });

                //$log.debug($scope.data.Studenti);

            };

            $scope.ulozit = function() {
                $log.info('ulozit');
                $log.debug($scope.data);

                var status = ZapisDochazkyService.save($scope.UdalostID, $scope.UdalostPoradi, zadaneDochazky($scope.data.Studenti, $scope.data.ObdobiDne));
                $log.info(status);
                status.then(function (result) {
                    $log.info(result);
                    if (result.data.Code == "OK") {
                        $("#popupDochazka").html("Uloženo.").popup("open");
                    } 
                    else if (result.data.Code == "ERROR")
                    {
                        $("#popupDochazka").html("Nepodařilo se uložit. <br>" + result.data.Message).popup("open");
                    }
                });
            };

            $scope.storno = function() {
                $log.info('storno');
                //$log.debug($scope.data);
                $.mobile.changePage('#rozvrh', 'slide', true, true);
            };

        });
})();