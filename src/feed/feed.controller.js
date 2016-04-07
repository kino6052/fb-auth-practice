'use strict';

angular.module('patientory')
  .controller('FeedCtrl', function ($rootScope, $scope, $stateParams, FeedModel, UserModel, CommentModel, ENDPOINT_URI) {
    var ctrl = this;
    ctrl.stateParams = $stateParams;
    ctrl.tag=ctrl.stateParams.tag;
    ctrl.messagePopup = FeedModel.messagePopup;
    ctrl.loading = false;
    
    var userId   = UserModel.getCurrentUser();
    
    function getValue(object){
      for (var key in object){
        return object[key];
      }
    }
    
    var firebaseRef = new Firebase(ENDPOINT_URI + 'messages');
    firebaseRef.on('value', function(){
      ctrl.getFeed();
    });
    
    $scope.$on("userData", function(){
      console.log(UserModel.userData);
      ctrl.newMessage.user = UserModel.userData; 
    });
    
    $scope.$on("messagePopupUpdate", function(){
      console.log("messagePopupUpdate")
      ctrl.messagePopup = FeedModel.messagePopup;
    });
    
    $scope.$on("searchPopupUpdate", function(){
      console.log("searchPopupUpdate")
      ctrl.searchPopup = FeedModel.searchPopup;
    });

    $scope.$on('updateFeed', function() {
      ctrl.getFeed();
      //console.log("COMMENT POSTED EVENT");
    });
    
    ctrl.toggleMessagePopup = function() {
      FeedModel.toggleMessagePopup();
    };
    
    ctrl.toggleSearchPopup = function() {
      FeedModel.toggleSearchPopup();
    };
    
    ctrl.userStuff = UserModel.getUserData(userId);
    
    ctrl.newMessage = {
      userId: userId,
      user: {},
      userEmail: UserModel.getEmail(),
      text: '',
      isPublic: false
    };
    
    ctrl.searchMessagesWithTag = function (query){
      FeedModel.searchMessagesWithTag(query);
    };
    
    ctrl.resetForm = function () {
      ctrl.loading = false;
      ctrl.newBoard = {
        email: UserModel.getEmail(),
        uid: UserModel.getCurrentUser(),
        text: ''
      };
    };

    ctrl.getFeed = function () {
      FeedModel.equalTo(ctrl.tag)
        .then(function (result) {
          ctrl.feed = (result !== 'null') ? result : {};
          ctrl.feed = FeedModel.convertToArray(ctrl.feed);
        }, function () {
          ctrl.resetForm();
        });
    };

    ctrl.postMessage = function (message, isValid) {
      if (isValid) {
        ctrl.loading = true;

        FeedModel.create(message)
          .then(function (result) {
            ctrl.getFeed();
          })
          .catch(function (reason) {
            //
          })
          .finally(function () {
            ctrl.resetForm();
          });
      }
    };
    
    ctrl.getFeed();
  });
