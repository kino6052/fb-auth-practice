'use strict';
angular.module('patientory.common')
  .service('CommentModel', function ($http, UserModel, ENDPOINT_URI) {
    var service = this;

    function extract(result) {
      return result.data;
    }
    
    function onError(reason) {
        console.log(reason);
    }

    function getUrlForId(messageId) {
      return ENDPOINT_URI + 'messages/' + messageId + '/comments.json';
    }

    service.all = function () {
      return $http.get(getUrl()).then(extract);
    };

    service.fetch = function (commentId) {
      return $http.get(getUrlForId(commentId)).then(extract);
    };

    service.create = function (messageId, comment) {
      return $http.post(getUrlForId(messageId), comment).catch(onError).then(extract);
    };

    
  });