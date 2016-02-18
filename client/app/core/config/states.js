(function () {
    'use strict';

    angular
        .module('kicker_app')
        .config(config)
        .run(run);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.when('/', '/tournaments');

        $stateProvider
            .state('index', {
                url: '',
                views: {
                    header: {
                        templateUrl: 'app/core/views/header.html'
                    },
                    content: {
                        template: '<div class="container">' +
                        '<div class="row"><div class="col-lg-12"><h2>Welcome! {{$root.user.displayName}}</h2></div>' +
                        '</div></div>'
                    }
                },
                resolve: {
                    user: ['$rootScope', '$state', '$q', 'auth', function ($rootScope, $state, $q, auth) {
                        $q.when($rootScope.user || function () {
                                return auth.user().then(function (user) {
                                    return $rootScope.user = user;
                                }, function () {
                                    $state.go('login');
                                });
                            }());

                    }]
                }
            })
            .state('index.tournaments', {
                url: '/tournaments',
                views: {
                    'content@': {
                        template: '<tournaments></tournaments>'
                    }
                },
                resolve: {
                    auth: ['user', function (user) {
                        return user;
                    }]
                }
            })
            .state('index.games', {
                url: '/games',
                views: {
                    'content@': {
                        template: '<games></games>'
                    }
                },
                resolve: {
                    auth: ['user', function (user) {
                        return user;
                    }]
                }
            })
            .state('login', {
                url: '/login',
                views: {
                    content: {
                        template: '<login></login>'
                    }
                }
            });
    }

    run.$inject = ['$rootScope', '$log'];

    function run($rootScope, $log) {
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, options) {

        });

        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {

        });

        $rootScope.$on('$stateNotFound', function (event, unfoundState, fromState, fromParams) {

        });

        $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
            $log.error(error);
        });
    }

})();
