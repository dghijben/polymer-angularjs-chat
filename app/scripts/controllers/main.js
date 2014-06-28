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

    // Attach this applications realtime database
    var chatRef = new Firebase('https://polymer-chat.firebaseio.com');
    
    // Storing messages in a different node
    var messagesRef = new Firebase('https://polymer-chat.firebaseio.com/messages');

    // Get our messages in real-time
    $scope.messages = $firebase(messagesRef);

    // Auth flow. Everything is handled by firebase
    var auth = new FirebaseSimpleLogin(chatRef, function(error, user) {
      if (error) {
        // TODO: handle errors
      } else if (user) {
        $scope.$apply(function(){
          $scope.user = user;
          $scope.showChat = true;
          $scope.showLogin = false;
        });
      } else {
        console.log('not logged In');
        $scope.$apply(function(){
          $scope.user = false;
          $scope.showLogin = true;  
        });
      }
    });  
      
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
