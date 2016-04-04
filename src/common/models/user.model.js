'use strict';

angular.module('patientory.common')
  .service('UserModel', function ($http, Auth, ENDPOINT_URI) {
    var service = this;
    var currentUser = null;
    var userObject = {};

    function extract(result) {
      return result.data;
    }

    function getUrl() {
      return ENDPOINT_URI + 'users.json';
    }

    function getUrlForId(userId) {
      return ENDPOINT_URI + 'users/' + userId + '.json';
    }

    service.all = function () {
      return $http.get(getUrl()).then(extract);
    };

    service.fetch = function (userId) {
      return $http.get(getUrlForId(userId)).then(extract);
    };

    service.create = function (user) {
      return $http.post(getUrl(), user).then(extract);
    };

    service.saveUserInfo = function(user){
      service.create(user);  
    };
    
    service.getEmail = function(userObject) {
      // TODO: Implement Safe Search of the Properties
      return userObject.password.email;
    };
    
    service.getCurrentUser = function (userObject) {
      // TODO: Implement Safe Search of the Properties
      return userObject.uid;
    };

    service.setCurrentUser = function (user) {
      currentUser = user;
    };

    service.login = function (user) {
      console.log("USERMODEL -> LOGIN");
      return Auth.$authWithPassword({
        email: user.email,
        password: user.password
      });
    };

    service.register = function (user) {
      return Auth.$createUser({
        email: user.email,
        password: user.password
      });
    };

    service.logout = function () {
      console.log('LOGOUT FIRED!');
      Auth.$unauth();
      currentUser = null;
    };
  });
