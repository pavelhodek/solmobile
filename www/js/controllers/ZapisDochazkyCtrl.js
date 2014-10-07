; (function () {
    "use strict";
    angular.module('sol.controllers')

        .controller('ZapisDochazkyCtrl', function ($scope, $rootScope, $log, $q, $filter, ZapisDochazkyService, RozvrhService, TridyService, ObdobiDneService) {
            $log.debug('ZapisDochazkyCtrl');

            angular.element(document)
                .on("pagecreate", "#dochazka", function (event, ui) {
                    $log.debug("PAGECREATE - #DOCHAZKA");
                })
                .on("pageshow", "#dochazka", function (event, ui) {
                    $log.debug("PAGESHOW - #DOCHAZKA");
                    $scope.loadData();
                });

            $scope.clearData = function () {
                $scope.data = {};
                $scope.isDataLoaded = false;
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
                    var obdobiDneID = obdobiDne[i].OBDOBI_DNE_ID;
                    for (var j = 0, dochazkyLength = dochazky.length; j < dochazkyLength; j++) {
                        var dochazka = dochazky[j];
                        if (dochazka.OSOBA_ID == studentID && dochazka.OBDOBI_DNE_ID == obdobiDneID) {
                            typDochazky = dochazka.TYP_DOCHAZKY;
                            break;
                        }
                    }

                    result[i] = typDochazky;
                }

                return result;
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
                            "TYP_DOCHAZKY": student.DOCHAZKA[obdobiIndex],
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




            $scope.prepniAbsenci = function (dochazka, index) {
                if (dochazka[index] == '-')
                    dochazka[index] = 'A';
                else
                    dochazka[index] = '-';
            }


            $scope.loadData = function () {
                $log.log("ZapisDochazkyCtrl - loadData");
                $scope.UdalostID = RozvrhService.selectedUdalostID;
                $scope.UdalostPoradi = RozvrhService.selectedUdalostPoradi;


                var tridy = TridyService.all();
                var obdobiDne = ObdobiDneService.all();

                var dochazky = ZapisDochazkyService.getByRozvrhovaUdalost($scope.UdalostID, $scope.UdalostPoradi);

                //$q.all([dochazky, getCountryCode(), getDevice()])

                $q.all([dochazky, tridy, obdobiDne]).then(function (results) {
                    $log.log("ZapisDochazkyCtrl - all resloved");

                    var dochazky = results[0].data.Data;
                    var tridy = results[1].data.Data;
                    var obdobiDne = results[2].data.Data;

                    $log.log(dochazky);
                    $log.log(tridy);
                    $log.log(obdobiDne);

                    $scope.popisHodiny = '27.7.2014 (3.): ČJL (Český jazyk a literatura) - prostě nějaká rozumně dlouhá informace do záhlaví.';

                    var data = [];
                    angular.forEach(dochazky.Studenti, function (value, key, object) {
                        //this.push(key + ': ' + value);
                        //$log.debug(value); // item
                        //$log.debug(key); // 0 1 2 3

                        //var nazevTridy = ($filter('filter')(tridy.data.Data, { SKUPINA_ID: value.SKUPINA_ID })[0]).NAZEV;
                        $log.debug(value);
                        //var trida = nazevTridy(tridy, value.TRIDA_ID); //TridyService.getNazev(value.TRIDA_ID);
                        angular.extend(value, { TRIDA_NAZEV: nazevTridy(tridy, value.TRIDA_ID) });
                        angular.extend(value, { DOCHAZKA: dochazkaStudenta(dochazky.Dochazky, dochazky.ObdobiDne, value.OSOBA_ID) });

                        $log.debug(value);

                        this.push(value);
                    }, data);

                    $log.debug(data);



                    //$scope.data = dochazky.data.Data;
                    $scope.data = dochazky;

                    $scope.isDataLoaded = true;


                },
                function (error) {
                    $log.error(error);
                });




                //dochazky.then(
                //    function (result) {
                //        $log.log("ZapisDochazkyCtrl - loadData");

                //        $scope.popisHodiny = '27.7.2014 (3.): ČJL (Český jazyk a literatura) - prostě nějaká rozumně dlouhá informace do záhlaví.';

                //        $log.debug(result);


                //        var data = [];
                //        angular.forEach(result.data.Data.Studenti, function (value, key, object) {
                //            //this.push(key + ': ' + value);
                //            //$log.debug(value); // item
                //            //$log.debug(key); // 0 1 2 3
                //            var nazevTridy = { TRIDA_NAZEV: "název" + key };
                //            angular.extend(value, nazevTridy);
                //            this.push(value);
                //        }, data);

                //        $log.debug(data);



                //        $scope.data = result.data.Data;

                //        $scope.isDataLoaded = true;
                //    },
                //    function (error) {
                //        $log.error(error);
                //    });


                setTimeout(function () {
                    var table = angular.element('#dochazka-table');
                    table.table('refresh');
                    //angular.element('[type="text"]', '#hodnoceni-table').textinput();
                    //angular.element('[type="text"]', table).textinput();
                }, 0);
            }



            /*
            var udalostID = '';

            var xx = ZapisDochazkyService.getByUdalostId(udalostID);

            xx.then(
                function (result) {
                    //$log.log(result);
                    $scope.data = result;
                },
                function (error) {
                    $log.error(error);
                });

            */

            $scope.nazevStudenta = function (student) {
                return (student.PRIJMENI || '') + ' ' + (student.JMENO || '');
            }


            $scope.prednastavitDlePredchozi = function () {
                $log.info('prednastavitDlePredchozi');
            };

            $scope.ulozit = function () {
                $log.info('ulozit');
                $log.debug($scope.data);

                ZapisDochazkyService.save($scope.UdalostID, $scope.UdalostPoradi, zadaneDochazky($scope.data.Studenti, $scope.data.ObdobiDne));
            }

            $scope.storno = function () {
                $log.info('storno');
                //$log.debug($scope.data);
                $.mobile.changePage('#rozvrh', 'slide', true, true);
            }

        });
})();