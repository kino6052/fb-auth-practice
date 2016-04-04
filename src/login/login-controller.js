'use strict';

angular.module('patientory')
  .controller('LoginCtrl', function (UserModel, $state) {
    var login = this;

    login.loading = false;

    login.user = {
      email: '',
      password: '',
      register: false
    };

    function register() {
      UserModel.register({
          email: login.user.email,
          password: login.user.password
      })
      .then(onLogin)
      .catch(onError)
      .finally(onCompletion);
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

    function onSuccess(result) {
      console.log("onSuccess in the Login Controller");
      console.log("RESULTS: " + JSON.stringify(result));
      UserModel.userObject = result;
      UserModel.saveUserInfo(result);
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
          alert("Registering...")
          register();
        } else {
          alert("Loging in...")
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