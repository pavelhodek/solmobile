; (function () {
    "use strict";
    var module = angular.module('sol.services');

    module.factory('SkolniRokyService', ['$http', '$q', '$log', '$resource', 'NastaveniService', 'AuthorizationService', function ($http, $q, $log, $resource, NastaveniService, AuthorizationService) {
        $log.debug('SkolniRokyService');

        //var me = {};

        //me.all = function() {
        //    $log.debug('SkolniRokyService - all');
        //    var url = NastaveniService.getApiURL() + 'SkolniRoky';

        //    //$log.info(AuthorizationService.getAuthorizationHeader());

        //    $http.defaults.headers.common.Authorization = AuthorizationService.getAuthorizationHeader();

        //    return $http.get(url, { cache: true });
        //};

        //return me;

        var url = NastaveniService.getApiURL() + 'SkolniRoky';

        var data = $resource(url).get();

        //$log.debug(SkolniRoky.get());

        var me = {};

        me.all = function () {
            return data.$promise;
        };

        return me;


    }]);
})();

