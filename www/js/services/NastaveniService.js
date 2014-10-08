; (function () {
    "use strict";
    var module = angular.module('sol.services');

    module.factory('NastaveniService', ['$http', function ($http) {
        var me = {};

        me.timeFormat = "HH:mm";
        me.dateFormat = "EEEE d.M.yyyy";

        // localhost: "http://localhost/SOLWebApi/api/";
        // localhost (cordova): "http://10.0.2.2/SOLWebApi/api/";
        // server: "http://172.20.2.26/SOLWebApi/api/";

        //me.apiURL = "http://localhost/SOLWebApi/api/";
        var defaultApiUrl = "https://sol.cca.cz/SOLWebApi/api/";

        me.getApiURL = function () {
            return localStorage.getItem("nastaveni.apiURL") || defaultApiUrl;
        }

        me.setApiURL = function (value) {
            return localStorage.setItem("nastaveni.apiURL", value);
        }

        return me;
    }]);
})();