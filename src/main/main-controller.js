'use strict';

angular.module('patientory')
  .controller('MainCtrl', function (UserModel, Auth, $state) {
    var main = this;
    main.auth = Auth;
    main.currentUser = null;
    main.currentColor = 'blue';

    main.logout = function () {
      UserModel.logout();
      $state.go('login');
    };

    main.auth.$onAuth(function (authData) {
      if (authData) {
        UserModel.setCurrentUser(authData.uid);
        main.currentUser = authData.uid;
      } else {
        main.currentUser = null;
      }
    });
  });