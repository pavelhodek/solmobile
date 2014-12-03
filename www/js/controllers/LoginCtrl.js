; (function () {
    "use strict";
    angular.module('sol.controllers')

        .controller('LoginCtrl', ['$scope', '$rootScope', '$log', 'AuthorizationService', function ($scope, $rootScope, $log, AuthorizationService) {
            //$log.debug('LoginCtrl');

            angular.element(document)
                .on("pagecreate", "#login", function (event, ui) {
                    //$log.debug("PAGECREATE - #LOGIN");
                })
                .on("pageshow", "#login", function (event, ui) {
                    //.on("pagebeforeshow", "#login", function (event, ui) {
                    //$log.debug("PAGESHOW - #LOGIN");

                    $scope.$apply(function () {
                        $scope.init();
                        //$log.debug("PAGESHOW - #LOGIN init");
                    });
                });



            $rootScope.$on('logout', function () {
                //$log.debug("LoginCtrl - on logout");
                //$scope.resetForm();
                $scope.init();
            });

            var initial = {
                username: null,
                password: null,
                remember: false
            };


            $scope.resetForm = function () {
                //$log.debug("LoginCtrl - resetForm");

                angular.extend($scope, initial);

                // refresh radiobuttonu (kvůli jqm extenzi)
                setTimeout(function () {
                    $("#remember").checkboxradio("refresh");
                }, 0);

            }



            $scope.init = function () {
                $scope.username = AuthorizationService.getUsername();
                $scope.password = null;

                $scope.remember = AuthorizationService.getRemember();

                if ($scope.remember) {
                    $scope.password = AuthorizationService.getPassword();
                }

                setTimeout(function () {
                    $("#remember").checkboxradio("refresh");
                }, 0);
            }

            $scope.login = function () {
                //$log.debug("LOGIN");

                $rootScope.currentUser = null;
                $rootScope.$broadcast('login');

                AuthorizationService.setUsername($scope.username);
                AuthorizationService.setPassword($scope.password);
                AuthorizationService.setRemember($scope.remember);

                var result = AuthorizationService.checkAuthorizationIsValid();

                result
                    .success(function (data, status, headers, config) {

                        if (data.Data) {
                            $rootScope.currentUser = AuthorizationService.getUsername();
                            $.mobile.changePage('#rozvrh', 'slide', true, true);
                        } else {
                            $rootScope.currentUser = null;


                            if (data.Status.Code == "ACCOUNT_LOCKED") {
                                $("#loginNotifier").html("Účet je uzamčen.").popup("open");
                            } else {
                                $("#loginNotifier").html("Neplatné přihlášení.").popup("open");
                            }

                        }
                    });

            };

        }]);
})();