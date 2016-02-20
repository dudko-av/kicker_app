(function () {
    'use strict';

    angular
        .module('kicker_app')
        .factory('authInterceptor', authInterceptorFactory);

    authInterceptorFactory.$inject = ['$q', '$injector'];

    function authInterceptorFactory($q, $injector) {
        var auth = null;
        return {
            responseError: function (err) {
                if (err.status === 401)  {
                    auth = auth || $injector.get('auth');
                    auth.logout();
                }
                return $q.reject(err);
            }
        };
    }

})();
