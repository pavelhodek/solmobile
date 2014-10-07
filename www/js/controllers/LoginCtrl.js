; (function () {
    "use strict";
    angular.module('sol.controllers')

        .controller('LoginCtrl', ['$scope', '$rootScope', '$log', 'AuthorizationService', function ($scope, $rootScope, $log, AuthorizationService) {
            $log.debug('LoginCtrl');

            angular.element(document)
                .on("pagecreate", "#login", function (event, ui) {
                    $log.debug("PAGECREATE - #LOGIN");
                })
                .on("pageshow", "#login", function (event, ui) {
                //.on("pagebeforeshow", "#login", function (event, ui) {
                    $log.debug("PAGESHOW - #LOGIN");

                    $scope.$apply(function () {
                        $scope.init();
                        $log.debug("PAGESHOW - #LOGIN init");
                    });
                });



            $rootScope.$on('logout', function () {
                $log.debug("LoginCtrl - on logout");
                //$scope.resetForm();
                $scope.init();
            });

            var initial = {
                username: null,
                password: null,
                remember: false
            };


            $scope.resetForm = function () {
                $log.debug("LoginCtrl - resetForm");

                angular.extend($scope, initial);

                //$log.debug($scope.remember);

                // refresh radiobuttonu (kvůli jqm extenzi)
                setTimeout(function () {
                    $("#remember").checkboxradio("refresh");
                }, 0);

            }



            $scope.init = function () {
                $log.debug("init");

                //var remember = AuthorizationService.getRemember();
                //var username = AuthorizationService.getUsername();
                //var password = AuthorizationService.getPassword();

                //$log.debug(username);
                //$log.debug(password);
                //$log.debug(remember);


                //$scope.username = username;
                //$scope.remember = remember;
                ////if (remember) {
                //    $scope.password = password;
                ////}


                $scope.username = AuthorizationService.getUsername();
                $scope.password = null;

                $scope.remember = AuthorizationService.getRemember();
                $log.debug('remember: ', $scope.remember);

                if ($scope.remember) {
                    $log.info('loading stored username');
                    $log.info(AuthorizationService.getUsername());

                    $scope.password = AuthorizationService.getPassword();
                }

                setTimeout(function () {
                    $("#remember").checkboxradio("refresh");
                }, 0);
            }


            //*/

            //$scope.resetForm();

            //$scope.init();
            /*

            $scope.username = null;
            $scope.password = null;

            $scope.remember = AuthorizationService.getRemember(); 
            $log.debug('log debug: ', $scope.remember);

            if ($scope.remember) {
                $log.info('loading stored username');
                $scope.username = AuthorizationService.getUsername();
                $scope.password = AuthorizationService.getPassword();
            }
            

            //$log.debug($scope.username);
            //$log.debug($scope.password);
            //$log.debug($scope.remember);



            $scope.username = AuthorizationService.getUsername();
            $scope.password = AuthorizationService.getPassword();
            $scope.remember = AuthorizationService.getRemember();

            */

            $scope.login = function () {
                $log.debug("LOGIN");

                $rootScope.currentUser = null;
                $rootScope.$broadcast('login');


                AuthorizationService.setUsername($scope.username);
                AuthorizationService.setPassword($scope.password);
                AuthorizationService.setRemember($scope.remember);



                var result = AuthorizationService.checkAuthorizationIsValid();
                $log.debug(result);

                
                result
                    .success(function (data, status, headers, config) {
                        $log.debug(data);
                        $log.debug(status);

                        if (data.Data) {
                            $rootScope.currentUser = AuthorizationService.getUsername();
                            $.mobile.changePage('#rozvrh', 'slide', true, true);
                        } else {
                            $rootScope.currentUser = null;


                            if (data.Status.Code == "ACCOUNT_LOCKED") {
                                $("#popupLogin").html("Účet je uzamčen.").popup("open");
                            } else {
                                $("#popupLogin").html("Neplatné přihlášení.").popup("open");
                            }

                            

                            //$.mobile.changePage('#login', 'slide', true, true);
                        }
                    });



                /*
                result.then(function (data) {
                    $log.debug(data);
                    $log.debug(status);

                    if (data.Data) {
                        $rootScope.currentUser = AuthorizationService.getUsername();
                        $.mobile.changePage('#rozvrh', 'slide', true, true);
                    } else {
                        $rootScope.currentUser = null;
                        $.mobile.changePage('#login', 'slide', true, true);
                    }
                });
                */


                //$("#login").dialog("close");
                //$.mobile.changePage("#index");
            };

            /*
            var result = AuthorizationService.checkAuthorizationIsValid();
            //$log.debug(result);

            result.success(function (data, status, headers, config) {
                if (data.Data) {
                    $.mobile.changePage('#rozvrh', 'slide', true, true);
                } else {
                    $.mobile.changePage('#login', 'slide', true, true);
                }
            });
            */
        }]);
})();