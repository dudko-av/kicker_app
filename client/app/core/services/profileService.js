(function () {
    'use strict';

    angular
        .module('kicker_app')
        .service('profileService', profileService);

    profileService.$inject = ['$http'];

    function profileService($http) {
        var service = this;
        angular.extend(service, {
            update: update
        });

        function update(profile) {
            return $http.post('/users/profile/update', profile).then(function (res) {
                return res.data;
            });
        }
    }

})();
