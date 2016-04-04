'use strict';

// GET USER OBJECT BY USER ID: https://torrid-torch-3843.firebaseio.com/users.json?orderBy=%22userData/uid%22&equalTo=%22db55c713-12ab-44f4-907a-97bdd0bf68fb%22

angular.module('patientory.common')
  .service('UserModel', function ($http, $rootScope, Auth, ENDPOINT_URI) {
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
    
    service.createFromId = function (id, user) {
      return $http.post(getUrlForId(id), user).catch(function(err){console.log(err);}).then(extract);
    };

    service.saveUserInfo = function(user){
      service.create(user);  
    };
    
    service.getEmail = function(userObject) {
      // TODO: Implement Safe Search of the Properties
      var ref = new Firebase(ENDPOINT_URI);
      var authData = ref.getAuth();
      try {
        return authData.password.email;
      }
      catch (err) {
        return;
      }
      
    };
    
    service.userData = {};
    
    service.getUserData = function (userId) {
      // TODO: Implement Safe Search of the Properties
      return $http.get(ENDPOINT_URI + 'users.json?orderBy=' + JSON.stringify("userData/uid") + '&equalTo=' + JSON.stringify(userId)).then(function(response){service.userData = response.data; $rootScope.$broadcast("userData")})
    }
    
    service.getCurrentUser = function () {
      // TODO: Implement Safe Search of the Properties
      var ref = new Firebase(ENDPOINT_URI);
      var authData = ref.getAuth();
      try {
        return authData.uid;
      }
      catch (err) {
        return;
      }
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
