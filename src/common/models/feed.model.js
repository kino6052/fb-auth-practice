'use strict';

angular.module('patientory.common')
  .service('FeedModel', function ($rootScope, $http, UserModel, CommentModel, ENDPOINT_URI) {
    var service = this;
    var messagePopup = false, commentPopup = false;
    service.messagePopup, service.commentPopup;
    
    service.toggleMessagePopup = function(){
      messagePopup = !messagePopup;
      service.messagePopup = messagePopup;
      $rootScope.$broadcast("messagePopupUpdate");
    };
    
    service.toggleCommentPopup = function(){
      commentPopup = !commentPopup;
      service.commentPopup = commentPopup;
      $rootScope.$broadcast("commentPopupUpdate");
    };
    
    function extract(result) {
      return result.data;
    }

    function getUrl() {
      return ENDPOINT_URI + 'messages.json';
    }

    function getUrlForId(messageId) {
      return ENDPOINT_URI + 'messages/' + messageId + '.json';
    }

    service.all = function () {
      return $http.get(getUrl()).then(extract);
    };
    
    service.equalTo = function (parameter) {
      if (parameter) {
        return $http.get(getUrl() + '?orderBy=' + JSON.stringify("tag") + '&equalTo=' + JSON.stringify(parameter)).then(extract);
      } 
      else  return $http.get(getUrl()).then(extract);
    };

    service.fetch = function (messageId) {
      return $http.get(getUrlForId(messageId)).then(extract);
    };

    service.create = function (message) {
      return $http.post(getUrl(), message).then(extract);
    };

    service.update = function (messageId, message) {
      return $http.put(getUrlForId(messageId), message).then(extract);
    };
    
    service.comment = function(messageId, comment) {
      return CommentModel.create(messageId, comment);
    }

    service.destroy = function (messageId) {
      return $http.delete(getUrlForId(messageId)).then(extract);
    };
  });