; (function () {
    "use strict";
    var module = angular.module('sol.services');

    module.factory('ZapisDochazkyService', ['$http', '$q', '$log', 'NastaveniService', 'AuthorizationService', 'RozvrhService', function ($http, $q, $log, NastaveniService, AuthorizationService, RozvrhService) {
        $log.debug('ZapisDochazkyService');

        var me = {};

        me.getByRozvrhovaUdalost = function(udalostId, poradi) {
            me.selectedUdalostID = udalostId;
            me.selectedUdalostPoradi = poradi;

            $log.debug('ZapisDochazkyService - getByRozvrhovaUdalost');
            //$log.debug(udalostId, poradi);


            var url = NastaveniService.getApiURL() + 'ZapisDochazky' + '/' + udalostId + '/' + poradi;

            //$log.debug(url);
            //$log.info(AuthorizationService.getAuthorizationHeader());

            $http.defaults.headers.common.Authorization = AuthorizationService.getAuthorizationHeader();

            return $http.get(url);
        };


        me.save = function (udalostId, poradi, data) {

            var url = NastaveniService.getApiURL() + 'ZapisDochazky' + '/' + udalostId + '/' + poradi;

            //$log.debug(url);
            $log.info(AuthorizationService.getAuthorizationHeader());

            $http.defaults.headers.common.Authorization = AuthorizationService.getAuthorizationHeader();
            //$log.debug(data);
            return $http.put(url, data);
        };

        return me;
    }]);
})();


