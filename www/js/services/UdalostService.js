; (function () {
    "use strict";
    var module = angular.module('sol.services');

    module.factory('UdalostService', ['$http', '$q', '$log', 'NastaveniService', 'AuthorizationService', function ($http, $q, $log, NastaveniService, AuthorizationService) {
        $log.debug('UdalostService');

        return {
            getUdalostInfo: function (udalostId, udalostPoradi) {
                $log.debug('Udalost');
                var url = NastaveniService.getApiURL() + 'Udalost';

                //$log.info(AuthorizationService.getAuthorizationHeader());

                $http.defaults.headers.common.Authorization = AuthorizationService.getAuthorizationHeader();

                return $http.get(url);
            }
        };

    }]);
})();