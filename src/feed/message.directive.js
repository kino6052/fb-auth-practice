angular.module('patientory')
  .directive('message', function($rootScope, FeedModel, UserModel){
    var controller = function() {
      var ctrl = this;
      ctrl.commentPopup = false;
      ctrl.loading = false;
      ctrl.likes = {};
      
      ctrl.extractLikes = function(messageId){
        FeedModel.extractLikes(messageId).then(function(data){
          ctrl.likes[messageId] = data;
        });
      };
      
      ctrl.getFirstName = function () {
        return UserModel.userData.firstName;
      };
      
      ctrl.getLastName = function () {
        return UserModel.userData.lastName;
      };
      
      ctrl.postComment = function (messageId, commentObject) {
        FeedModel.comment(messageId, commentObject)
          .then(function(result){
            $rootScope.$broadcast('updateFeed');
          });
      };
      
      ctrl.like = function(messageId) {
        FeedModel.like(messageId, UserModel.getCurrentUser().uid);
      };
      
      ctrl.toggleCommentPopup = function(){
        console.log("toggled");
        ctrl.commentPopup = !ctrl.commentPopup;
      };
      
      ctrl.convertToArray = function(object) {
        return FeedModel.convertToArray(object);
      };

      ctrl.updateMessage = function (messageId, message) {
        ctrl.loading = true;
        FeedModel.update(messageId, message)
          .then(function (result) {
            console.log('result', result);
          })
          .catch(function (reason) {
            console.log(reason);
          })
          .finally(function () {
            ctrl.loading = false;
          });
      };

      ctrl.deleteMessage = function (messageId) {
        ctrl.remove({messageId:messageId});
      };
    };

    return {
      scope: {
        messageId:'@',
        message:'=',
        remove:'&'
      },
      templateUrl: 'feed/message.tmpl.html',
      controller: controller,
      controllerAs: 'ctrl',
      bindToController: true
    };
  })
;