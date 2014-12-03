; (function () {
    "use strict";
    var module = angular.module('sol.services');

    module.factory('NastaveniService', ['$http', function ($http) {
        var me = {};

        me.timeFormat = "H:mm";
        me.dateFormat = "EEEE d.M.yyyy";

        // localhost: "http://localhost/SOLWebApi/api/";
        // localhost (cordova): "http://10.0.2.2/SOLWebApi/api/";
        // prod server: "http://172.20.2.26/SOLWebApi/api/";
        // test server: "https://sol.cca.cz/SOLWebApi/api/";

        var defaultApiUrl = "https://sol.cca.cz/SOLWebApi/api/";

        me.getApiURL = function () {
            return localStorage.getItem("nastaveni.apiURL") || defaultApiUrl;
        }

        me.setApiURL = function (value) {
            if (value && value.slice(-1) != "/")
                value = value + "/";

            return localStorage.setItem("nastaveni.apiURL", value);
        }

        return me;
    }]);
})();