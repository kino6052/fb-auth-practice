'use strict';

angular.module('patientory.common')
  .service('FeedModel', function ($rootScope, $state, $http, UserModel, CommentModel, ENDPOINT_URI) {
    var service = this;
    var messagePopup = false, commentPopup = false, searchPopup = false;
    
    service.messagePopup, service.commentPopup;
    
    service.toggleMessagePopup = function(){
      messagePopup = !messagePopup;
      service.messagePopup = messagePopup;
      $rootScope.$broadcast("messagePopupUpdate");
    };
    
    service.toggleSearchPopup = function(){
      searchPopup = !searchPopup;
      service.searchPopup = searchPopup;
      $rootScope.$broadcast("searchPopupUpdate");
    };
    
    service.toggleCommentPopup = function(){
      commentPopup = !commentPopup;
      service.commentPopup = commentPopup;
      $rootScope.$broadcast("commentPopupUpdate");
    };
    
    service.convertToArray = function(items) {
        var array = [];
        for (var item in items){
            var object = {};
            object[item] = items[item];
            array.unshift(object);
        }
        return array;
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
    };

    service.destroy = function (messageId) {
      return $http.delete(getUrlForId(messageId)).then(extract);
    };
    
    service.searchMessagesWithTag = function(query) {
      service.toggleSearchPopup();
      $state.go("feed", {tag: query});
    };
  });