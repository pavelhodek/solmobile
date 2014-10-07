; (function () {
    "use strict";
    var module = angular.module('sol.services');

    module.factory('ZapisDochazkyService', ['$http', '$q', '$log', 'NastaveniService', 'AuthorizationService', 'RozvrhService', function ($http, $q, $log, NastaveniService, AuthorizationService, RozvrhService) {
        $log.debug('ZapisDochazkyService');

        //var dochazkaData = [
        //{ 'trida': '3.A', 'cvtv': '1', 'jmeno': 'Adamová Markéta', 'duvodAbsence': '', 'hodiny': ['-', ''] },
        //{ 'trida': '3.A', 'cvtv': '2', 'jmeno': 'Bořek Jaroslav', 'duvodAbsence': 'nějaký důvod', 'hodiny': ['/', '/'] },
        //{ 'trida': '3.A', 'cvtv': '3', 'jmeno': 'Cibulka Tomáš', 'duvodAbsence': '', 'hodiny': ['-', '/'] },
        //{ 'trida': '3.A', 'cvtv': '4', 'jmeno': 'Dálavská Miroslava', 'duvodAbsence': '', 'hodiny': ['-', '-'] },
        //{ 'trida': '3.A', 'cvtv': '5', 'jmeno': 'Fikus Jan', 'duvodAbsence': '', 'hodiny': ['/', '-'] },
        //{ 'trida': '3.A', 'cvtv': '6', 'jmeno': 'Gustava Roman', 'duvodAbsence': '', 'hodiny': ['/', '/'] },
        //{ 'trida': '3.A', 'cvtv': '7', 'jmeno': 'Hrubý Karel', 'duvodAbsence': '', 'hodiny': ['-', '-'] },
        //{ 'trida': '3.A', 'cvtv': '8', 'jmeno': 'Kalous Michal', 'duvodAbsence': '', 'hodiny': ['/', '-'] },
        //{ 'trida': '3.A', 'cvtv': '9', 'jmeno': 'Lacko Roman', 'duvodAbsence': '', 'hodiny': ['-', '-'] },
        //{ 'trida': '3.A', 'cvtv': '10', 'jmeno': 'Malá Jaroslava', 'duvodAbsence': '', 'hodiny': ['-', '-'] },
        //{ 'trida': '3.A', 'cvtv': '11', 'jmeno': 'Malý Richard', 'duvodAbsence': '', 'hodiny': ['-', '-'] },
        //{ 'trida': '3.A', 'cvtv': '12', 'jmeno': 'Novák Jan', 'duvodAbsence': '', 'hodiny': ['-', '-'] },
        //{ 'trida': '3.A', 'cvtv': '13', 'jmeno': 'Novotný Josef', 'duvodAbsence': '', 'hodiny': ['-', '-'] },
        //{ 'trida': '3.B', 'cvtv': '14', 'jmeno': 'Novosad Pavel', 'duvodAbsence': '', 'hodiny': ['-', '-'] },
        //{ 'trida': '3.B', 'cvtv': '15', 'jmeno': 'Opatrný Kamil', 'duvodAbsence': '', 'hodiny': ['-', '-'] },
        //{ 'trida': '3.B', 'cvtv': '16', 'jmeno': 'Patera Jindřich', 'duvodAbsence': '', 'hodiny': ['-', '-'] },
        //{ 'trida': '3.B', 'cvtv': '17', 'jmeno': 'Rázná Pavlína', 'duvodAbsence': '', 'hodiny': ['-', '-'] },
        //{ 'trida': '3.B', 'cvtv': '18', 'jmeno': 'Rychlý Petr', 'duvodAbsence': '', 'hodiny': ['-', '-'] },
        //{ 'trida': '3.B', 'cvtv': '19', 'jmeno': 'Stránská Jaroslava', 'duvodAbsence': '', 'hodiny': ['-', '-'] },
        //{ 'trida': '3.B', 'cvtv': '20', 'jmeno': 'Strákalová Květoslava', 'duvodAbsence': '', 'hodiny': ['-', '-'] },
        //{ 'trida': '3.B', 'cvtv': '21', 'jmeno': 'Tlustý Petr', 'duvodAbsence': '', 'hodiny': ['-', '-'] },
        //{ 'trida': '3.B', 'cvtv': '22', 'jmeno': 'Toulavá Lenka', 'duvodAbsence': '', 'hodiny': ['-', '-'] },
        //{ 'trida': '3.B', 'cvtv': '23', 'jmeno': 'Uhranulá Eva', 'duvodAbsence': '', 'hodiny': ['-', '-'] },
        //{ 'trida': '3.B', 'cvtv': '24', 'jmeno': 'Veselý Roman', 'duvodAbsence': '', 'hodiny': ['-', '-'] },
        //{ 'trida': '3.B', 'cvtv': '25', 'jmeno': 'Wágner Jaroslav', 'duvodAbsence': '', 'hodiny': ['-', '-'] },
        //{ 'trida': '3.B', 'cvtv': '', 'jmeno': '', 'duvodAbsence': '', 'hodiny': ['-', '-'] }
        //];

        //var deferred = $q.defer();

        //deferred.resolve(dochazkaData);

        //return {
        //    getByUdalostId: function (udalostID) {
        //        $log.debug('ZapisDochazkyService - getByUdalostId');
        //        return deferred.promise;
        //    }
        //}

        var me = {};

        me.getByRozvrhovaUdalost = function(udalostId, poradi) {
            me.selectedUdalostID = udalostId;
            me.selectedUdalostPoradi = poradi;

            $log.debug('ZapisDochazkyService - getByRozvrhovaUdalost');
            $log.debug(udalostId, poradi);


            var url = NastaveniService.getApiURL() + 'Dochazky' + '/' + udalostId + '/' + poradi;

            $log.debug(url);
            $log.info(AuthorizationService.getAuthorizationHeader());

            $http.defaults.headers.common.Authorization = AuthorizationService.getAuthorizationHeader();

            return $http.get(url);
        };


        me.save = function (udalostId, poradi, data) {

            var url = NastaveniService.getApiURL() + 'Dochazky' + '/' + udalostId + '/' + poradi;

            $log.debug(url);
            $log.info(AuthorizationService.getAuthorizationHeader());

            $http.defaults.headers.common.Authorization = AuthorizationService.getAuthorizationHeader();
            $log.debug(data);
            return $http.put(url, data);
        };

        return me;
    }]);
})();


