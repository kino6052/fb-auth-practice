'use strict';

angular.module('patientory')
  .controller('ProfileCtrl', function ($scope, $rootScope, UserModel, FeedModel, Auth, $state) {
    var profile = this;

       var userId = UserModel.getCurrentUser().uid;
       UserModel.getUserData(userId);
       $scope.$on('userData', function(event, data){
        profile.user = data;
      });
    
  });