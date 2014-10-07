; (function () {
    "use strict";
    var module = angular.module('sol.services');

    module.factory('ObdobiRokuService', ['$http', '$q', '$log', 'NastaveniService', 'AuthorizationService', function ($http, $q, $log, NastaveniService, AuthorizationService) {
        $log.debug('ObdobiRokuService');

        return {
            all: function () {
                $log.debug('ObdobiRokuService - all');
                var url = NastaveniService.getApiURL() + 'ObdobiRoku';

                //$log.info(AuthorizationService.getAuthorizationHeader());

                $http.defaults.headers.common.Authorization = AuthorizationService.getAuthorizationHeader();

                return $http.get(url, { cache: true });
            }
        };

    }]);
})();

