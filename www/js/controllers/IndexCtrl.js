; (function () {
    "use strict";
    angular.module('sol.controllers')

        .controller('IndexCtrl', ['$scope', '$rootScope', '$log', 'AuthorizationService', function ($scope, $rootScope, $log, AuthorizationService) {
            //$log.debug('IndexCtrl');

            $scope.redirectToLogin = function () {
                $.mobile.pageContainer.pagecontainer("change", "#login");
                //$.mobile.changePage('#login');
            }

            var isLoginRemember = AuthorizationService.getRemember();
            if (isLoginRemember) {

                var credentials = AuthorizationService.getStoredCredentials();

                if (credentials != null) {
                    var result = AuthorizationService.checkAuthorizationIsValid();

                    result.success(function (data, status, headers, config) {
                        if (data.Data) {
                            setTimeout(function () { $.mobile.changePage('#rozvrh'); }, 0);
                        } else {
                            setTimeout(function () { $.mobile.changePage('#login'); }, 0);
                        }
                    });
                } else {
                    setTimeout(function () { $.mobile.changePage('#login'); }, 0);
                }
            } else {
                setTimeout(function () { $.mobile.changePage('#login'); }, 0);
            }
        }]);
})();