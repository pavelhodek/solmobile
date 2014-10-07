; (function () {
    "use strict";
    var module = angular.module('sol.services');

    module.factory('TridyService', ['$http', '$q', '$log', '$filter', 'NastaveniService', 'AuthorizationService', function ($http, $q, $log, $filter, NastaveniService, AuthorizationService) {
        $log.debug('TridyService');
        var me = {};

        me.all = function() {
            $log.debug('TridyService - all');
            var url = NastaveniService.getApiURL() + 'Tridy';

            //$log.info(AuthorizationService.getAuthorizationHeader());

            $http.defaults.headers.common.Authorization = AuthorizationService.getAuthorizationHeader();

            return $http.get(url, { cache: true });
        };

        me.getNazev = function (id) {
            //$log.debug(id);
            me.all().then(function (result) {
                $log.debug(result.data.Data.length);
                for (var i = 0, len = result.data.Data.length; i < len; i++) {
                    if (result.data.Data[i].SKUPINA_ID == id) {
                        $log.debug(result.data.Data[i].NAZEV);
                        return result.data.Data[i].NAZEV;
                    }
                }

                return '';
            });

            //var item = $filter('filter')(me.all(), function (d) { return d.Data.SKUPINA_ID === id; })[0];
            //return item.NAZEV;


        }


        return me;

    }]);
})();

