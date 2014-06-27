'use strict';

/**
 * @ngdoc function
 * @name polymerChatApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the polymerChatApp
 */
angular.module('polymerChatApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
