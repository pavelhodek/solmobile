; (function () {
    "use strict";
    var module = angular.module('sol.services');

    module.factory('SkolniRokyService', ['$http', '$q', '$log', '$resource', 'NastaveniService', 'AuthorizationService', function ($http, $q, $log, $resource, NastaveniService, AuthorizationService) {
        //$log.debug('SkolniRokyService');

        var url = NastaveniService.getApiURL() + 'SkolniRoky';

        var data = $resource(url).get();

        var me = {};

        me.all = function () {
            return data.$promise;
        };

        return me;

    }]);
})();

