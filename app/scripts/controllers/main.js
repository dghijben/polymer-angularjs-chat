'use strict';

/**
 * @ngdoc function
 * @name polymerChatApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the polymerChatApp
 */
angular.module('polymerChatApp')
  .controller('MainCtrl', function ($scope, $firebase, $location, $anchorScroll, $route, $sce) {
    
    $scope.trustSrc = function(src) {
      return $sce.trustAsResourceUrl(src);
    };

    $scope.showLogin = false;
    $scope.showChat = false;

    // Attach this applications realtime database
    var chatRef = new Firebase('https://polymer-chat.firebaseio.com');
    
    // Storing messages in a different node
    var messagesRef = new Firebase('https://polymer-chat.firebaseio.com/messages');

    // Limit lenght message
    var limitLen = 50;

    // Get our messages in real-time
    $scope.messages = $firebase(messagesRef);

    // Auth flow. Everything is handled by firebase
    var auth = new FirebaseSimpleLogin(chatRef, function(error, user) {
      if (error) {
        // TODO: handle errors
      } else if (user) {
        
        // Get a universal picture attribute for all providers
        user.picture = getUserAvatar(user);

        $scope.$apply(function(){
          $scope.user = user;
          
          $scope.showChat = true;
          $scope.showLogin = false;

          notify('You are logged in, ' + user.displayName + '!');
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

    $scope.authGithub = function() {
      auth.login('github', {
        rememberMe: true,
        scope: ''
      });      
    };

     $scope.sendMessage = function (event){
      if (event.keyCode === 13) {
        $scope.submitMessage();
      }
    };

    $scope.submitMessage = function() {
      var msg = getInputValue();

      if(isValid(msg)) {
        var message = {
          content: getInputValue(),
          user: $scope.user
        };
        $scope.messages.$add(message);
        resetInputValue();
      } else {
        notify('Message Invalid. Max characters: ' + limitLen);
      }
    };

    // Auto-scroll down on each new message
    $scope.messages.$on('change', function() {
        $location.hash('bottom');
        $anchorScroll();
    });    

    $scope.logout = function() {
      console.log('Logging out');
      auth.logout();
      $route.reload();
    };

    function notify(msg) {
      var toast = angular.element('#toast')[0];
      $scope.statusMessage = msg;
      toast.show();      
    }

    function getInputValue() {
      var input = angular.element('paper-input')[0];
      return input.value;
    }

    function resetInputValue() {
      var input = angular.element('paper-input')[0];
      input.value = '';
    }

    function isValid( str ) {
      return str.trim().length > 0 && str.trim().length <= limitLen;
    }

    function getUserAvatar(user) {
      if(user.provider === 'github'){
        return user.thirdPartyUserData.avatar_url;
      }
      if(user.provider === 'google'){
        return user.thirdPartyUserData.picture;
      }
    }


  });
