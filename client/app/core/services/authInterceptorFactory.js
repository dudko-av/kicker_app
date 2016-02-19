(function () {
    'use strict';

    angular
        .module('ekasud.core')
        .factory('authInterceptor', authInterceptorFactory)
        .value('SESSION_ERROR', 'com.ibm.websphere.servlet.session.UnauthorizedSessionRequestException');

    authInterceptorFactory.$inject = ['$q', 'auth', 'SESSION_ERROR'];

    function authInterceptorFactory($q, auth, SESSION_ERROR) {
        return {
            responseError: function (err) { //debugger
                if (err.status === 401)  {
                    auth.logout();
                }
                return $q.reject(err);
            }
        };
    }

})();
