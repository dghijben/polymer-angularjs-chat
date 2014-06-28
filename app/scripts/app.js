'use strict';

/**
 * @ngdoc overview
 * @name polymerChatApp
 * @description
 * # polymerChatApp
 *
 * Main module of the application.
 */
angular
  .module('polymerChatApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'firebase'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
