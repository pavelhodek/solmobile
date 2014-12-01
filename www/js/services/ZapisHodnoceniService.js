; (function () {
    "use strict";
    var module = angular.module('sol.services');

    module.factory('ZapisHodnoceniService', ['$http', '$q', '$log', 'NastaveniService', 'AuthorizationService',
        function ($http, $q, $log, NastaveniService, AuthorizationService) {
        $log.debug('ZapisHodnoceniService');

        var me = {};

        me.selectedUdalostID = null;
        me.selectedUdalostPoradi = null;

        //me.getByUdalostId = function () {
        //    $log.debug('ZapisHodnoceniService - getByUdalostId');
        //    return deferred.promise;
        //};

        me.getByRozvrhovaUdalost = function (udalostID, poradi) {
            me.selectedUdalostID = udalostID;
            me.selectedUdalostPoradi = poradi;

            $log.debug('ZapisHodnoceniService - getByRozvrhovaUdalost');
            //$log.debug(udalostID, poradi);


            var url = NastaveniService.getApiURL() + 'ZapisHodnoceni/' + udalostID + '/' + poradi;

            //$log.debug(url);
            $log.info(AuthorizationService.getAuthorizationHeader());

            $http.defaults.headers.common.Authorization = AuthorizationService.getAuthorizationHeader();

            return $http.get(url);
        };

        me.save = function (data) {

            var url = NastaveniService.getApiURL() + 'ZapisHodnoceni/';

            //$log.debug(url);
            $log.info(AuthorizationService.getAuthorizationHeader());

            $http.defaults.headers.common.Authorization = AuthorizationService.getAuthorizationHeader();
            //$log.debug(data);
            return $http.post(url, data);
        };



        return me;
    }]);
})();

