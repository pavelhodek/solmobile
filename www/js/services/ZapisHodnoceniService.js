; (function () {
    "use strict";
    var module = angular.module('sol.services');

    module.factory('ZapisHodnoceniService', ['$http', '$q', '$log', 'NastaveniService', 'AuthorizationService',
        function ($http, $q, $log, NastaveniService, AuthorizationService) {
        $log.debug('ZapisHodnoceniService');

        var hodnoceniData = [
            { cvtv: '1', jmeno: 'Adamová Markéta', znamka: '1', slovniHodnoceni: 'super' },
            { cvtv: '2', jmeno: 'Bořek Jaroslav', znamka: '2', slovniHodnoceni: '' },
            { cvtv: '3', jmeno: 'Cibulka Tomáš', znamka: '3', slovniHodnoceni: '' },
            { cvtv: '4', jmeno: 'Dálavská Miroslava', znamka: '-', slovniHodnoceni: 'pracovala velmi dobře' },
            { cvtv: '5', jmeno: 'Fikus Jan', znamka: '5', slovniHodnoceni: '' },
            { cvtv: '6', jmeno: 'Gustava Roman', znamka: '2', slovniHodnoceni: '' },
            { cvtv: '7', jmeno: 'Hrubý Karel', znamka: '5', slovniHodnoceni: '' },
            { cvtv: '8', jmeno: 'Kalous Michal', znamka: '2', slovniHodnoceni: '' },
            { cvtv: '9', jmeno: 'Lacko Roman', znamka: '-', slovniHodnoceni: '' },
            { cvtv: '10', jmeno: 'Malá Jaroslava', znamka: '2', slovniHodnoceni: '' },
            { cvtv: '11', jmeno: 'Malý Richard', znamka: '1', slovniHodnoceni: '' },
            { cvtv: '12', jmeno: 'Novák Jan', znamka: '1', slovniHodnoceni: '' },
            { cvtv: '13', jmeno: 'Novotný Josef', znamka: '', slovniHodnoceni: 'velmi šikovný' },
            { cvtv: '14', jmeno: 'Novosad Pavel', znamka: '', slovniHodnoceni: '' },
            { cvtv: '15', jmeno: 'Opatrný Kamil', znamka: '', slovniHodnoceni: '' },
            { cvtv: '16', jmeno: 'Patera Jindřich', znamka: '', slovniHodnoceni: '' },
            { cvtv: '17', jmeno: 'Rázná Pavlína', znamka: '', slovniHodnoceni: '' },
            { cvtv: '18', jmeno: 'Rychlý Petr', znamka: '', slovniHodnoceni: '' },
            { cvtv: '19', jmeno: 'Stránská Jaroslava', znamka: '', slovniHodnoceni: 'pracovala výborně' },
            { cvtv: '20', jmeno: 'Strákalová Květoslava', znamka: '', slovniHodnoceni: '' },
            { cvtv: '21', jmeno: 'Tlustý Petr', znamka: '', slovniHodnoceni: '' },
            { cvtv: '22', jmeno: 'Toulavá Lenka', znamka: '', slovniHodnoceni: '' },
            { cvtv: '23', jmeno: 'Uhranulá Eva', znamka: '', slovniHodnoceni: '' },
            { cvtv: '24', jmeno: 'Veselý Roman', znamka: '', slovniHodnoceni: '' },
            { cvtv: '25', jmeno: 'Wágner Jaroslav', znamka: '', slovniHodnoceni: '' },
            { cvtv: '', jmeno: '', znamka: '', slovniHodnoceni: '' }
        ];

        var deferred = $q.defer();

        deferred.resolve(hodnoceniData);



        var me = {};

        me.selectedUdalostID = null;
        me.selectedUdalostPoradi = null;

        me.getByUdalostId = function () {
            $log.debug('ZapisHodnoceniService - getByUdalostId');
            return deferred.promise;
        };

        me.getByRozvrhovaUdalost = function (udalostID, poradi) {
            me.selectedUdalostID = udalostID;
            me.selectedUdalostPoradi = poradi;

            $log.debug('ZapisHodnoceniService - getByRozvrhovaUdalost');
            $log.debug(udalostID, poradi);


            var url = NastaveniService.getApiURL() + 'ZapisyHodnoceni' + '/' + udalostID + '/' + poradi;

            $log.debug(url);
            $log.info(AuthorizationService.getAuthorizationHeader());

            $http.defaults.headers.common.Authorization = AuthorizationService.getAuthorizationHeader();

            return $http.get(url);
        };





        return me;
    }]);
})();

