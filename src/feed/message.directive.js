angular.module('patientory')
  .directive('message', function($rootScope, FeedModel, UserModel){
    var controller = function() {
      var ctrl = this;

      ctrl.loading = false;
      ctrl.getFirstName = function () {
        return UserModel.userData.firstName;
      };
      ctrl.getLastName = function () {
        return UserModel.userData.lastName;
      };
      ctrl.postComment = function (messageId, commentObject) {
        alert("postComment(" + messageId + ', ' + commentObject);
        FeedModel.comment(messageId, commentObject)
          .then(function(result){
            $rootScope.$broadcast('updateFeed');
          });
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
    }
  })
;