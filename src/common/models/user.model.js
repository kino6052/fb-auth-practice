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
    
    service.getEmail = function() {
      console.log(email);
      return email;
    };
    
    service.getCurrentUser = function () {
      return currentUser;
    };

    service.setCurrentUser = function (user) {
      currentUser = user;
    };

    service.login = function (user) {
      console.log("USERMODEL -> LOGIN");
      return Auth.$authWithPassword({
        email: user.email,
        password: user.password
      }, function(error, authData) {
        
        if (error) {
          currentUser = null;
          console.error('Authentication failed:', error);
        } else {
          currentUser = authData.uid;
          console.log('Logged in as:', authData.uid);
        }
      });
    };

    service.register = function (user) {
      return Auth.$createUser({
        email: user.email,
        password: user.password
      }, function(error, authData) {
        if(error){
          console.error('Error: ', error);
          return error;
        } else {
          
          
        }
      });
    };

    service.logout = function () {
      console.log('LOGOUT FIRED!');
      Auth.$unauth();
      currentUser = null;
    };
  });
