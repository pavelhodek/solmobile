; (function () {
    "use strict";
    angular.module('sol.controllers')

        .controller('RozvrhCtrl', function ($scope, $rootScope, $log, NastaveniService, SelectedDateService, RozvrhService, ZapisHodnoceniService) {
            $log.debug('RozvrhCtrl');

            angular.element(document)
                .on("pagecreate", "#rozvrh", function (event, ui) {
                    $log.debug("PAGECREATE - #ROZVRH");
                })
                .on("pageshow", "#rozvrh", function (event, ui) {
                    $log.debug("PAGESHOW - #ROZVRH");
                    $scope.init();
                });

            $scope.timeFormat = NastaveniService.timeFormat;
            $scope.dateFormat = NastaveniService.dateFormat;

            $scope.selectedDate = SelectedDateService.getSelectedDate();

            $scope.init = function () {
                $scope.loadData();
            }


            function pause(ms) {
                console.log('pause: ' + ms);
                ms += new Date().getTime();
                while (new Date() < ms) { }
            }


            // obdobiDneNazev(udalost){{udalost.OBDOBI_DNE_OD_NAZEV}} - {{udalost.OBDOBI_DNE_DO_NAZEV}}

            $scope.obdobiDneNazev = function (udalost) {
                if (udalost.OBDOBI_DNE_OD_NAZEV == udalost.OBDOBI_DNE_DO_NAZEV)
                    return udalost.OBDOBI_DNE_OD_NAZEV;
                else
                    return udalost.OBDOBI_DNE_OD_NAZEV + ' - ' + udalost.OBDOBI_DNE_DO_NAZEV;
            };

            $scope.zdrojeInfo = function(udalost) {
                var nazvySkupin = [];

                var skupiny = udalost.SKUPINY_UDALOSTI;

                for (var i = 0, len = skupiny.length; i < len; i++) {
                    var skupina = skupiny[i];
                    if (skupina.PRIZNAK_DRUH_SKUPINY == 'T')
                        nazvySkupin.push(skupina.TRIDA_NAZEV);
                    else if (skupina.PRIZNAK_DRUH_SKUPINY == 'S')
                        nazvySkupin.push(skupina.TRIDA_NAZEV + ' ' + skupina.SKUPINA_NAZEV);
                    else
                        nazvySkupin.push(skupina.TRIDA_NAZEV + ' (seminář)');
                }


                var nazvyMistnosti = [];

                var mistnosti = udalost.MISTNOSTI_UDALOSTI;

                for (var i = 0, len = mistnosti.length; i < len; i++) {
                    var mistnost = mistnosti[i];
                    nazvyMistnosti.push(mistnost.NAZEV);
                }

                var result = '';
                if (nazvySkupin.length > 0)
                    result = nazvySkupin.join(" + ");

                if (nazvySkupin.length > 0 && nazvyMistnosti.length > 0)
                    result += ', ';

                if (nazvyMistnosti.length > 0)
                    result +=  nazvyMistnosti.join(" + ");

                return result; 
            };



            $scope.loadData = function () {

                $.mobile.loading("show", {
                    text: "načítám...",
                    textVisible: true,
                    theme: "a",
                    html: ""
                });

                var data = RozvrhService.getByDatum($scope.selectedDate);
                /*
                xx.then(
                    function (result) {
                        $log.log("RozvrhCtrl - loadData");

                        //$scope.popisHodiny = '27.7.2014 (3.): ČJL (Český jazyk a literatura) - prostě nějaká rozumně dlouhá informace do záhlaví.';

                        $scope.data = result;

                        $scope.isDataLoaded = true;
                    },
                    function (error) {
                        $log.error(error);
                    });
                */



                data
                    .success(function (result, status, headers, config) {
                        $log.log("RozvrhCtrl - loadData");

                        //$scope.popisHodiny = '27.7.2014 (3.): ČJL (Český jazyk a literatura) - prostě nějaká rozumně dlouhá informace do záhlaví.';

                        $log.log(result);



                        if (result.Status.Code != "OK") {
                            $scope.data = null;
                            $("#popupRozvrh").html(result.Status.Message).popup("open");
                        } else {
                            $scope.data = result.Data.UDALOSTI;

                            $scope.isDataLoaded = true;
                        }

                        setTimeout(function () {
                            var table = angular.element('#rozvrh-table');
                            table.listview('refresh');

                            //angular.element('[type="text"]', '#hodnoceni-table').textinput();
                            //angular.element('[type="text"]', table).textinput();
                        }, 0);

                        $.mobile.loading("hide");

                    })
                    .error(function (error, status, headers, config) {
                        $log.log("ERROR");
                        $log.error(status);

                        if (status == 401) {
                            setTimeout(function () { $.mobile.changePage('#login'); }, 0);
                        }


                        $.mobile.loading("hide");

                    })
                ;
            };

            //$scope.popisHodiny = '27.7.2014 (3.): ČJL (Český jazyk a literatura) - prostě nějaká rozumně dlouhá informace do záhlaví';

            $scope.showPopupMenu = function (event, udalost, x) {
                $log.info('popupMenu');
                $log.debug(event);
                $log.debug(udalost.UDALOST_ID, udalost.PORADI);
                $log.debug(x);


                RozvrhService.selectedUdalostID = udalost.UDALOST_ID;
                RozvrhService.selectedUdalostPoradi = udalost.PORADI;
                RozvrhService.selectedDatum = udalost.DATUM;


                //ZapisHodnoceniService.selectedUdalostID = udalost.UDALOST_ID;
                //ZapisHodnoceniService.selectedUdalostPoradi = udalost.PORADI;

                //ZapisDochazkyService.selectedUdalostID = udalost.UDALOST_ID;
                //ZapisDochazkyService.selectedUdalostPoradi = udalost.PORADI;

                $('#popupMenu').popup('open', {
                    transition: 'pop',
                    positionTo: "origin",
                    //x: event.clientX,
                    //y: event.clientY

                    x: event.pageX,
                    y: event.pageY

                });
            }


            $scope.showPopupInfo = function (event, id, x) {
                $log.info('popupInfo');
                $log.debug(event);
                $log.debug(id);
                $log.debug(x);

                //alert(x);

                $('#popupInfo').popup('open', {
                    transition: 'pop',
                    positionTo: "origin",
                    //x: event.clientX,
                    //y: event.clientY

                    x: event.pageX,
                    y: event.pageY
                });



                //<p><strong>Detail hodiny</strong></p>
                //<p>Zde může být celá řada dalších informací prakticky libovolně formátovaných, včetně formulářových prvků či tabulek.</p>


                //$('#about').popup('open', {
                //    transition: 'pop'
                //});
            }


            $scope.zapsatProbiraneUcivo = function (changePage) {
                //$.mobile.changePage(changePage, { options });
                //$(":mobile-pagecontainer").pagecontainer("change", "target", { options });
                //$.mobile.pageContainer.pagecontainer("change", "target", { options });
                //$("body").pagecontainer("change", "target", { options });

                $.mobile.pageContainer.pagecontainer('change', changePage, {
                    transition: 'none',
                    reload: true,
                    changeHash: true,
                    reverse: false,
                    showLoadMsg: true
                });
            };

            $scope.zapsatDochazku = function (changePage) {
                $.mobile.pageContainer.pagecontainer('change', changePage, {
                    transition: 'none', // 
                    reload: true,
                    changeHash: true,
                    reverse: false,
                    showLoadMsg: true
                });
            };

            $scope.zapsatHodnoceni = function (changePage) {
                $.mobile.pageContainer.pagecontainer('change', changePage, {
                    transition: 'none',
                    reload: true,
                    changeHash: true,
                    reverse: false,
                    showLoadMsg: true
                });
            };


            $scope.prednastavitDlePredchozi = function () {
                $log.info('prednastavitDlePredchozi');
            };

            $scope.ulozit = function () {
                $log.info('ulozit');
            }

            $scope.storno = function () {
                $log.info('storno');
            }



            $scope.decrementSelectedDate = function () {
                $log.info('decrementSelectedDate');
                SelectedDateService.decrementSelectedDate();
                $scope.selectedDate = SelectedDateService.getSelectedDate();

                $scope.data = null;



                $scope.loadData();
            }

            $scope.incrementSelectedDate = function () {
                $log.info('incrementSelectedDate');
                SelectedDateService.incrementSelectedDate();
                $scope.selectedDate = SelectedDateService.getSelectedDate();

                $scope.data = null;




                setTimeout(function () {
                    var table = angular.element('#rozvrh-table');
                    table.listview('refresh');

                    //angular.element('[type="text"]', '#hodnoceni-table').textinput();
                    //angular.element('[type="text"]', table).textinput();
                }, 0);
                //pause(2000);


                $scope.loadData();



            }


        });

})();