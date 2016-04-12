'use strict';

angular.module('patientory', [
  'ui.router',
  'firebase',
  'patientory.common'
])
  .constant('ENDPOINT_URI', 'https://torrid-torch-3843.firebaseio.com/')
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/landing');

    $stateProvider
      .state('landing', {
        url:'/landing',
        templateUrl: 'landing/landing.tmpl.html'
      })
      .state('register', {
        url:'/register',
        templateUrl: 'login/register.tmpl.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .state('login', {
        url:'/login',
        templateUrl: 'login/login.tmpl.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .state('search', {
        url:'/search',
        templateUrl: 'feed/search.tmpl.html',
        controller: 'PostCtrl',
        controllerAs: 'post'
      })
      .state('post', {
        url:'/post',
        templateUrl: 'feed/post.tmpl.html',
        controller: 'PostCtrl',
        controllerAs: 'post'
      })
      .state('comment', {
        url:'/comment',
        templateUrl: 'feed/comment.tmpl.html',
        controller: 'PostCtrl',
        controllerAs: 'post'
      })
      .state('feed', {
        url:'/feed?tag',
        templateUrl: 'feed/feed.tmpl.html',
        controller: 'FeedCtrl',
        controllerAs: 'ctrl',
        resolve: {
          'currentUser': ['Auth', function (Auth) {
            return Auth.$requireAuth();
          }]
        }
      })
      .state('profile', {
        url:'/profile',
        templateUrl: 'profile/profile.tmpl.html',
        controller: 'ProfileCtrl',
        controllerAs: 'profile',
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