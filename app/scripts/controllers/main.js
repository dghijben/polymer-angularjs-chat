'use strict';

/**
 * @ngdoc function
 * @name polymerChatApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the polymerChatApp
 */
angular.module('polymerChatApp')
  .controller('MainCtrl', function ($scope, $firebase, $location, $anchorScroll, $route) {
    $scope.showLogin = false;
    $scope.showChat = false;

    var chatRef = new Firebase('https://polymer-chat.firebaseio.com');
    
    var messagesRef = new Firebase('https://polymer-chat.firebaseio.com/messages');
    $scope.messages = $firebase(messagesRef);

    var auth = new FirebaseSimpleLogin(chatRef, function(error, user) {
      if (error) {
        console.log(error);
      } else if (user) {
        $scope.$apply(function(){
          $scope.user = user;
          $scope.showChat = true;
          $scope.showLogin = false;
        });
        console.log('User ID: ' + user.uid + ', Provider: ' + user.provider);
      } else {
        console.log('not logged In');
        $scope.$apply(function(){
          $scope.user = false;
          $scope.showLogin = true;  
        });
      }
    });  
      
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.authGoogle = function() {
      auth.login('google', {
        rememberMe: true,
        scope: 'https://www.googleapis.com/auth/plus.login'
      });      
    };

    $scope.submitMessage = function() {
      var message = {
        content: getInputValue(),
        user: $scope.user
      };

      $scope.messages.$add(message);

      resetInputValue();
    };

    // Auto-scroll down on each new message
    $scope.messages.$on("change", function() {
        $location.hash('bottom');
        $anchorScroll();
    });    

    $scope.logout = function() {
      console.log('Logging out');
      auth.logout();
      $route.reload();
    }

    function getInputValue() {
      var input = angular.element('paper-input')[0];
      return input.value;
    }

    function resetInputValue() {
      var input = angular.element('paper-input')[0];
      input.value = '';
    }
  });
