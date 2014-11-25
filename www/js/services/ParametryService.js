// https://sol.cca.cz/SOLWebApi/api/Parametry
; (function () {
    "use strict";
    angular
        .module('sol.services')
        .factory('ParametryService', parametryService);

    //    module.factory('ParametryService', ['$http', '$q', '$log', 'NastaveniService', 'AuthorizationService', function ($http, $q, $log, NastaveniService, AuthorizationService) {
    //$log.debug('ParametryService');


    function parametryService($http, $q, $log, NastaveniService, AuthorizationService) {
        $log.debug('ParametryService');

        function all() {
            $log.debug('ParametryService - all');
            var url = NastaveniService.getApiURL() + 'Parametry';

            $http.defaults.headers.common.Authorization = AuthorizationService.getAuthorizationHeader();

            //return $http.get(url, { cache: true });
            return $http.get(url);
        }

        function getStringById(parametrID) {
            $log.debug('ParametryService - getStringById');
            var url = NastaveniService.getApiURL() + 'Parametry/string/' + parametrID;

            $http.defaults.headers.common.Authorization = AuthorizationService.getAuthorizationHeader();

            //return $http.get(url, { cache: true });
            return $http.get(url);
        }

        function getDecimalById(parametrID) {
            $log.debug('ParametryService - getStringById');
            var url = NastaveniService.getApiURL() + 'Parametry/decimal/' + parametrID;

            $http.defaults.headers.common.Authorization = AuthorizationService.getAuthorizationHeader();

            //return $http.get(url, { cache: true });
            return $http.get(url);
        }

        return {
            all: all,
            getStringById: getStringById,
            getDecimalById: getDecimalById
        };

    }


    //}]);
})();

