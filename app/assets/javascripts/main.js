(function () {
    'use strict';

    angular.module('app', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'firebase'])
        .config(function ($routeProvider) {
            $routeProvider
                .when('/', {
                    controller: 'HomeController',
                    controllerAs: 'home',
                    templateUrl: 'assets/views/home.html'
                });
        });
}());
