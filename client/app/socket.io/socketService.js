(function () {
    'use strict';

    angular
        .module('socket.io')
        .provider('socket', socketProvider);

    function socketProvider() { debugger
        var provider = this;
        angular.extend(provider, {
            $get: ['$injector', function ($injector) {
                return $injector.instantiate(socketService);
            }]
        });
        var socket = io('http://localhost:3333');

        socketService.$inject = ['$q'];

        function socketService($q) { debugger
            var service = this;
            angular.extend(service, {
                on: on
            });

            function on(eventName) { debugger
                var deferred = $q.defer();
                socket.on(eventName, function (data) { debugger
                    deferred.resolve(data);
                });
                return deferred.promise;
            }
        }
    }

})();
