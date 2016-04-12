'use strict';

angular.module('patientory')
  .controller('LoginCtrl', function (UserModel, $state) {
    var login = this;

    login.loading = false;

    login.user = {
      email: '',
      dob: '',
      firstName: '',
      lastName: '',
      vision: '',
      height: '',
      password: ''
    };

    function register() {
      UserModel.register({
          email: login.user.email,
          password: login.user.password,
      })
      .then(onRegister)
      .then(onSuccess)
      .catch(onError)
      .finally();
    }

    function onLogin() {
      console.log("onLogin in the Login Controller");
      UserModel.login({
          email: login.user.email,
          password: login.user.password
      })
      .then(onSuccess)
      .catch(onError)
      .finally(onCompletion);
    }
    
    function onRegister() {
      console.log("onRegister in the Login Controller");
      UserModel.login({
          email: login.user.email,
          password: login.user.password
      })
      .then(function(result){
        console.log("RESULT");
        console.log(result);
        UserModel.saveUserInfo(UserModel.getCurrentUser().uid, login.user)
          .then(function(response){
            UserModel.getUserData(UserModel.getCurrentUser().uid);
          });
      })
      .catch(onError)
      .finally(onCompletion);
    }

    function onSuccess(result) {
      console.log("onSuccess in the Login Controller");
      console.log("RESULTS: " + JSON.stringify(result));
      console.log("onRegistrationCompletion");
      //login.user.uid = UserModel.userObject.uid;
      //UserModel.create(login.user);
      $state.go('feed');
    }

    function onError(reason) {
      login.error = reason.message;
    }

    function onCompletion() {
      login.reset();
    }
    

    login.submit = function (user, isValid, isRegistering) {
      if (isValid) {
        login.loading = true;

        if (isRegistering) {
          register();
        } else {
          onLogin();
        }
      }
    };

    login.reset = function () {
      login.loading = false;
      login.user = {
        email: '',
        password: '',
        register: false
      };
    };
  });