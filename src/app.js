'use strict';

angular.module('patientory', [
  'ui.router',
  'firebase',
  'patientory.common'
])
  .constant('ENDPOINT_URI', 'https://torrid-torch-3843.firebaseio.com/')
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/feed');

    $stateProvider
      .state('login', {
        url:'/login',
        templateUrl: 'login/login.tmpl.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .state('feed', {
        url:'/feed',
        templateUrl: 'feed/feed.tmpl.html',
        
        resolve: {
          'currentUser': ['Auth', function (Auth) {
            return Auth.$requireAuth();
          }]
        }
      })
    ;
  })
  .run(function ($rootScope, $state) {
    $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
      event.preventDefault();
      if (error === 'AUTH_REQUIRED') {
        $state.go('login');
      }
    });
  })
;