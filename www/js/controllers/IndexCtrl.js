; (function () {
    "use strict";
    angular.module('sol.controllers')

        .controller('IndexCtrl', ['$scope', '$rootScope', '$log', 'AuthorizationService', function ($scope, $rootScope, $log, AuthorizationService) {
            $log.debug('IndexCtrl');


            $scope.redirectToLogin = function () {
                //$.mobile.pageContainer.pagecontainer("change", "#login");
                $.mobile.changePage('#login');
            }

            var redirectTo = '#login';
            var isLoginRemember = AuthorizationService.getRemember();
            if (isLoginRemember) {

                var credentials = AuthorizationService.getStoredCredentials();
                //$log.debug("credentials", credentials);
                if (credentials != null) {
                    //var username = AuthorizationService.getUsername();
                    //var password = AuthorizationService.getPassword();

                    //var result = AuthorizationService.checkAuthorizationIsValid(username, password);
                    var result = AuthorizationService.checkAuthorizationIsValid();
                    //$log.debug(result);

                    result.success(function (data, status, headers, config) {
                        //$log.debug("data: ", data);
                        //$log.debug("status: ", status);

                        if (data.Data) {
                            //$.mobile.changePage('#rozvrh');
                            setTimeout(function () { $.mobile.changePage('#rozvrh'); }, 0);
                            //redirectTo = '#rozvrh';
                        } else {
                            //$.mobile.changePage('#login');
                            setTimeout(function () { $.mobile.changePage('#login'); }, 0);
                            //redirectTo = '#login';
                        }
                    });
                } else {
                    setTimeout(function () { $.mobile.changePage('#login'); }, 0);
                }
            } else {
                setTimeout(function () { $.mobile.changePage('#login'); }, 0);                
            }


            //$.mobile.pageContainer.pagecontainer("change", "#login");

            //setTimeout(function () { $.mobile.changePage(redirectTo); }, 0);


            //$.mobile.changePage('#login');


            


            //$.mobile.changePage('#login', { reloadPage: true });
            //$.mobile.changePage('#login');

            //$(":mobile-pagecontainer").pagecontainer("change", "#login");
            //$.mobile.pageContainer.pagecontainer("change", "#login", {  });

            
            

            /*
            var isLoginRemember = AuthorizationService.getRemember();
            if (isLoginRemember) {

                var username = AuthorizationService.getUsername();
                var password = AuthorizationService.getPassword();

                $log.info("credentials: ", isLoginRemember, username, password);



            }

            $log.debug(username, password);

            if (username && password) {
                $.mobile.changePage('#rozvrh', 'slide', true, true);
            } else {
                $.mobile.changePage('#login', 'slide', true, true);
            }
            */





            /*
            $rootScope.currentUser = null;

            var credentials = AuthorizationService.getStoredCredentials();
            $log.debug("credentials: ", credentials);
            if (credentials == null) {
                $log.info("redirect to #login");
                $.mobile.changePage('#login', 'slide', true, true);
            } else {
                var result = AuthorizationService.checkAuthorizationIsValid(credentials.username, credentials.password);

                //$log.debug(result);

                result.success(function (data, status, headers, config) {
                    //$log.debug(data);
                    //$log.debug(status);

                    if (data.Data) {
                        $rootScope.currentUser = credentials.username;
                        $log.info("redirect to #rozvrh");
                        $.mobile.changePage('#rozvrh', 'slide', true, true);
                    } else {
                        $log.info("redirect to #login");
                        $.mobile.changePage('#login', 'slide', true, true);
                    }
                });
            }
             
             */

        }]);
})();