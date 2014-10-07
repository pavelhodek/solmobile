; (function () {
    "use strict";
    var module = angular.module('sol.services');

    module.factory('AuthorizationService', ['$http', '$q', '$log', 'NastaveniService', function ($http, $q, $log, NastaveniService) {
        var me = {};

        me.setAuthorizationHeader = function () {
            $http.defaults.headers.common.Authorization = me.getAuthorizationHeader();
        }

        me.getAuthorizationHeader = function () {

            var username = me.getUsername();
            var password = me.getPassword();


            var basicAuthHash = base64.encode(username + ":" + password); // window.btoa("ada:xx");

            console.log('getAuthorizationHeader login: ' + username + " / " + password);

            return 'Basic ' + basicAuthHash;
        }

        me.getStoredCredentials = function () {
            if (me.getRemember()) {
                var username = me.getUsername();
                var password = me.getPassword();

                if ($.trim(username) != "" && $.trim(password) != "") {
                    return { username: username, password: password };
                }
            }

            return null;
        }

        me.getUsername = function () {
            return localStorage.getItem("login.username");
        }

        me.getPassword = function () {
            return localStorage.getItem("login.password");
        }

        me.getRemember = function () {
            return !!JSON.parse(localStorage.getItem("login.remember"));
        }


        me.setUsername = function (value) {
            $log.info("SET USERNAME")
            localStorage.setItem("login.username", value);
        }

        me.setPassword = function (value) {
            $log.info("SET PASSWORD")
            localStorage.setItem("login.password", value);
        }

        me.setRemember = function (value) {
            $log.info("SET REMEMBER")
            localStorage.setItem("login.remember", value);
        }

        me.logout = function () {
            $log.info("LOGOUT")
            localStorage.removeItem("login.remember");
            localStorage.removeItem("login.username");
            localStorage.removeItem("login.password");
            $http.defaults.headers.common.Authorization = "";
        }

        //me.checkAuthorizationIsValid = function (username, password) {
        me.checkAuthorizationIsValid = function () {
            //if (username && password) {
                var url = NastaveniService.getApiURL() + 'AuthorizationStatus';

                $log.debug(url);
                $http.defaults.headers.common.Authorization = me.getAuthorizationHeader();

                return $http.get(url);
            //} else {
            //    var deferred = $q.defer();
            //    deferred.resolve(false);
            //    return deferred.promise;
            //}
        }

        me.storeLogin = function (username, password) {
            $log.info("STORE LOGIN")
            localStorage.setItem("login.username", username);
            localStorage.setItem("login.password", password);

            setAuthorizationHeader();
        }

        return me;
    }]);
})();


