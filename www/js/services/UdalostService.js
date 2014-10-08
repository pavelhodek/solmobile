; (function () {
    "use strict";
    var module = angular.module('sol.services');

    module.factory('UdalostService', ['$http', '$q', '$log', 'NastaveniService', 'AuthorizationService', function ($http, $q, $log, NastaveniService, AuthorizationService) {
        $log.debug('UdalostService');

        var me = {};

        me.getUdalostInfo = function(udalostId, udalostPoradi) {
            $log.debug('Udalost');

            var url = NastaveniService.getApiURL() + 'Udalosti' + '/' + udalostId + '/' + udalostPoradi;

            $http.defaults.headers.common.Authorization = AuthorizationService.getAuthorizationHeader();

            return $http.get(url);
        };
        
        return me;
    }]);
})();