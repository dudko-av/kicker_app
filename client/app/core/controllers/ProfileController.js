(function () {
    'use strict';

    angular
        .module('kicker_app')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['$rootScope', 'profileService'];

    function ProfileController($rootScope, profileService) {
        var ctrl = this;
        angular.extend(ctrl, {
            update: update
        });

        init();

        function init() {
            ctrl.profile = {
                displayName: $rootScope.user.displayName,
                image: $rootScope.user.image
            };
        }

        function update(profile) {
            profileService.update(profile).then(function (profile) {
                $rootScope.user = profile;
            });
        }
    }

})();
