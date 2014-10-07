; (function () {
    "use strict";
    var module = angular.module('sol.services');

    module.factory('DruhyHodnoceniService', ['$http', '$q', '$log', 'NastaveniService', 'AuthorizationService', function ($http, $q, $log, NastaveniService, AuthorizationService) {
        $log.debug('DruhyHodnoceniService');

        return {
            all: function () {
                $log.debug('DruhyHodnoceniService - all');
                var url = NastaveniService.getApiURL() + 'DruhyHodnoceni';

                //$log.info(AuthorizationService.getAuthorizationHeader());

                $http.defaults.headers.common.Authorization = AuthorizationService.getAuthorizationHeader();

                return $http.get(url, { cache: true });
            }
        };

    }]);
})();

