; (function () {
    "use strict";
    var module = angular.module('sol.services');

    module.factory('RozvrhService', ['$http', '$q', '$log', 'NastaveniService', 'AuthorizationService', function ($http, $q, $log, NastaveniService, AuthorizationService) {

        $log.debug('RozvrhService');

        /*
                var rozvrhData = {
                    Data: {
                        Vyuka: [
                            { ID: '1', UdalostNazev: 'ČJL (Český jazyk a literatura)', ObdobiDneOdNazev: '1.', ObdobiDneDoNazev: '2.', CasVyukyOd: new Date(2014, 6, 24, 8, 0, 0), CasVyukyDo: new Date(2014, 6, 24, 8, 45, 0), UdalostInfo: '3.A, UC1', PopupInfo: 'nějaké informace' },
                            { ID: '1', UdalostNazev: 'ČJL (Český jazyk a literatura)', ObdobiDneOdNazev: '1.', ObdobiDneDoNazev: '2.', CasVyukyOd: new Date(2014, 6, 24, 8, 0, 0), CasVyukyDo: new Date(2014, 6, 24, 8, 45, 0), UdalostInfo: '3.A, UC1', PopupInfo: 'nějaké informace' },
                            { ID: '1', UdalostNazev: 'ČJL (Český jazyk a literatura)', ObdobiDneOdNazev: '1.', ObdobiDneDoNazev: '2.', CasVyukyOd: new Date(2014, 6, 24, 8, 0, 0), CasVyukyDo: new Date(2014, 6, 24, 8, 45, 0), UdalostInfo: '3.A, UC1', PopupInfo: 'nějaké informace' },
                            { ID: '1', UdalostNazev: 'ČJL (Český jazyk a literatura)', ObdobiDneOdNazev: '1.', ObdobiDneDoNazev: '2.', CasVyukyOd: new Date(2014, 6, 24, 8, 0, 0), CasVyukyDo: new Date(2014, 6, 24, 8, 45, 0), UdalostInfo: '3.A, UC1', PopupInfo: 'nějaké informace' },
                            { ID: '1', UdalostNazev: 'ČJL (Český jazyk a literatura)', ObdobiDneOdNazev: '1.', ObdobiDneDoNazev: '2.', CasVyukyOd: new Date(2014, 6, 24, 8, 0, 0), CasVyukyDo: new Date(2014, 6, 24, 8, 45, 0), UdalostInfo: '3.A, UC1', PopupInfo: 'nějaké informace' },
                            { ID: '1', UdalostNazev: 'ČJL (Český jazyk a literatura)', ObdobiDneOdNazev: '1.', ObdobiDneDoNazev: '2.', CasVyukyOd: new Date(2014, 6, 24, 8, 0, 0), CasVyukyDo: new Date(2014, 6, 24, 8, 45, 0), UdalostInfo: '3.A, UC1', PopupInfo: 'nějaké informace' },
                        ]
                    },
                    Stav: {
                        Kod: "OK",
                        Zprava: null
                    }
                };
        
                var deferred = $q.defer();
        
                var promise = deferred.promise;
        
        
                promise.success = function (fn) {
                    promise.then(function (response) {
                        fn(response);
                    });
        
                    return promise;
                }
        
                promise.error = function (fn) {
                    promise.then(null, function (response) {
                        fn(response);
                    });
        
                    return promise;
                };
        
        
                deferred.resolve(rozvrhData);
        
                return {
                    getByDatum: function (datum) {
                        $log.debug('RozvrhService - getByDatum');
                        return deferred.promise;
                    }
                }
        */

        var me = {};

        me.selectedUdalostID = null;
        me.selectedUdalostPoradi = null;
        me.selectedDatum = null;

        me.getByDatum = function(date) {
            $log.debug('RozvrhService - getByDatum');

            $log.debug(date);
            $log.debug(dateToIsoString(date));


            var url = NastaveniService.getApiURL() + 'RozvrhoveUdalosti' + '/' + dateToIsoString(date);

            $log.debug(url);
            $log.info(AuthorizationService.getAuthorizationHeader());

            $http.defaults.headers.common.Authorization = AuthorizationService.getAuthorizationHeader();

            return $http.get(url);
        };

        return me;
    }]);
})();


