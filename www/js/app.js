// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ngSails'])


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

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('splash', {
    url: '/splash',
    templateUrl: 'templates/splash.html'//,
    //controller: 'AppCtrl'
  })

  .state('app.comunidades', {
    url: '/comunidades',
    views: {
      'menuContent': {
        templateUrl: 'templates/comunidades.html',
        controller: 'ComunidadCtrl'
      }
    }
  })

.state('app.estadio', {
    url: '/estadio',
    views: {
      'menuContent': {
        templateUrl: 'templates/estadio.html'
      }
    }
  })

  .state('app.servicios', {
      url: '/servicios',
      views: {
        'menuContent': {
          templateUrl: 'templates/servicios.html'
        }
      }
    })

  .state('app.mapa', {
      url: '/mapa',
      views: {
        'menuContent': {
          templateUrl: 'templates/mapa.html'
        }
      }
    })

    .state('app.inicio', {
      url: '/inicio',
      views: {
        'menuContent': {
          templateUrl: 'templates/inicio.html'//,
          //controller: 'PlaylistsCtrl'
        }
      }
    })

    .state('app.tab-map', {
      url: '/tab-map',
      views: {
        'menuContent': {
          templateUrl: 'templates/tab-map.html',
          controller: 'MapCtrl'
        }
      }
    })

    .state('app.search', {
      url: '/search',
      views: {
        'menuContent': {
          templateUrl: 'templates/search.html'//,
          //controller: 'PlaylistsCtrl'
        }
      }
    })

    .state('app.comunidads', {
      url: '/comunidads',
      views: {
        'menuContent': {
          templateUrl: 'templates/comunidads.html',
          controller: 'ComunidadsCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/comunidads/:comunidadId',
    views: {
      'menuContent': {
        templateUrl: 'templates/comunidad.html',
        controller: 'ComunidadCtrl'
      }
    }
  });


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/splash');
});
