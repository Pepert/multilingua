// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('multilingua', ['ionic', 'firebase', 'multilingua.controllers', 'multilingua.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('loading', {
      url: '/loading',
      templateUrl: 'templates/loading.html',
      controller: 'LoadingCtrl'
    })

    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'
    })

    .state('language', {
      cache: false,
      url: '/language',
      templateUrl: 'templates/language.html',
      controller: 'LanguageCtrl'
    })

    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'AppCtrl'
    })

    .state('app.home', {
      cache: false,
      url: '/home',
      views: {
        'menuContent': {
          templateUrl: 'templates/home.html',
          controller: 'HomeCtrl'
        }
      }
    })

    .state('app.dailyclass', {
      url: '/dailyclass',
      views: {
        'menuContent': {
          templateUrl: 'templates/cours/dailyclass.html'
        }
      }
    })

    .state('app.listclass', {
      url: '/listclass',
      views: {
        'menuContent': {
          templateUrl: 'templates/cours/listclass.html',
          controller: 'ListClassCtrl'
        }
      }
    })


    .state('app.exercice', {
        url: '/exercice',
        views: {
          'menuContent': {
            templateUrl: 'templates/exercice.html'
          }
        }
      })

    .state('app.agenda', {
      url: '/agenda',
      views: {
        'menuContent': {
          templateUrl: 'templates/agenda.html',
          controller: 'AgendaCtrl'
        }
      }
    })

    .state('app.contact', {
      url: '/contact',
      views: {
        'menuContent': {
          templateUrl: 'templates/contact.html'
        }
      }
    })

    .state('app.single', {
      url: '/playlists/:playlistId',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlist.html',
          controller: 'PlaylistCtrl'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/loading');
});
