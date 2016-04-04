angular.module('patientory')
  .directive('message', function(FeedModel){
    var controller = function() {
      var ctrl = this;

      ctrl.loading = false;

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