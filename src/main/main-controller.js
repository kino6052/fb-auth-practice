'use strict';

angular.module('patientory')
  .controller('MainCtrl', function ($rootScope, UserModel, FeedModel, Auth, $state) {
    
    
    var main = this;
    main.auth = Auth;
    main.currentUser = null;
    main.currentColor = 'blue';

    main.logout = function () {
      UserModel.logout();
      $state.go('login');
    };

    main.toggleMessagePopup = function(){
      FeedModel.toggleMessagePopup();
    };
    
    main.toggleSearchPopup = function(){
      FeedModel.toggleSearchPopup();
    };

    main.auth.$onAuth(function (authData) {
      if (authData) {
        UserModel.setCurrentUser(authData.uid);
        main.currentUser = authData.uid;
        UserModel.getUserData(authData.uid);
        
      } else {
        main.currentUser = null;
        main.logout();
      }
    });
    
    main.menuName = '';
    
    main.isNavEnabled = function(){
  		if ($state.$current.name === "feed" || $state.$current.name === "profile") { 
  			main.menuName = $state.$current.name;
  			return true;
  		}
  		else {
  			return false;
  		}
  	};
  });