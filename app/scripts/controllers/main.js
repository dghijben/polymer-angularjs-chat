'use strict';

/**
 * @ngdoc function
 * @name polymerChatApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the polymerChatApp
 */
angular.module('polymerChatApp')
  .controller('MainCtrl', function ($scope) {
    $scope.show_login = false;
    $scope.show_chat = true;

    var chatRef = new Firebase('https://polymer-chat.firebaseio.com');

    $scope.messages = [{
      content: "lalalalalalala",
      user: {
        name: "Hugo",
        email: "hugo.victor.dias.teodoro@gmail.com",
        picture: "http://placehold.it/80"
      }
    },
    {
      content: "lelelelelelelellele",
      user: {
        name: "Hugo",
        email: "hugo.victor.dias.teodoro@gmail.com",
        picture: "http://placehold.it/80"
      }
    }]

    // var auth = new FirebaseSimpleLogin(chatRef, function(error, user) {
    //   if (error) {
    //     console.log(error);
    //   } else if (user) {
    //     $scope.$apply(function(){
    //       $scope.user = user;
    //       $scope.show_chat = true;
    //     });
    //     console.log('User ID: ' + user.uid + ', Provider: ' + user.provider);
    //   } else {
    //     console.log('not logged In');
    //     $scope.user = false;
    //     $scope.show_login = true;
    //   }
    // });  
      
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.login_google = function() {
      auth.login('google', {
        rememberMe: true,
        scope: 'https://www.googleapis.com/auth/plus.login'
      });      
    }

    $scope.submit_message = function() {
      var message = {
        content: getInputValue(),
        user: {
          name: "Hugo",
          email: "hugo.victor.dias.teodoro@gmail.com",
          picture: "http://placehold.it/80"
        }        
      }

      $scope.messages.push(message);
      resetInputValue();
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
