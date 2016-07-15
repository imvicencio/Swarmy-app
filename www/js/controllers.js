angular.module('starter.controllers', ['ionic', 'ngCordova', 'ionic.rating'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.factory('Authorization', function() {

  authorization = {};
  authorization.nombreUsuario = "";  
  return authorization;
})


.controller('RegistroCtrl', function($scope, Authorization){
  $scope.input = Authorization;
})

.controller('ViewCtrl', function($scope, Authorization) {
  $scope.input = Authorization; 
})

.controller('ComunidadsCtrl', function($scope) {
  $scope.comunidads = [
    { title: 'Deportes Usach', id: 1 },
    { title: 'Estudio Cabros', id: 2 },
    { title: 'Quimica II', id: 3 },
    { title: 'Loleros', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Imprenta', id: 6 }
  ];
})

.controller('ComunidadCtrl', function($scope, $stateParams) {
})


.controller('RankingCtrl', function($scope) {
  
  $scope.rating = 4;
  $scope.data = {
    rating : 2,
    max: 5
  }
  
$scope.$watch('data.rating', function() {
  console.log('New value: '+$scope.data.rating);
});  
})

.controller('MapCtrl', function($scope, $state, $cordovaGeolocation) {
  var options = {timeout: 10000, enableHighAccuracy: true};
  $cordovaGeolocation.getCurrentPosition(options).then(function(position){
    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    var mapOptions = {
      center: latLng,
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
    google.maps.event.addListenerOnce($scope.map, 'idle', function(){
      var marker = new google.maps.Marker({
          map: $scope.map,
          animation: google.maps.Animation.BOUNCE,
          position: latLng
      });
      var infoWindow = new google.maps.InfoWindow({
          content: "Aqui estoy"
      });
      google.maps.event.addListener(marker, 'click', function () {
          infoWindow.open($scope.map, marker);
      });

    var pos1 =  new google.maps.LatLng(-33.4501078, -70.691244);
    var marca1 = new google.maps.Marker({
        map: $scope.map,
        animation: google.maps.Animation.DROP,
        position:pos1,       
    });
    var infoWindow1 = new google.maps.InfoWindow({
          content: '<h2>Estadio Usach</h2><img src="img/Estadio.png" /> <br><a href="#/app/estadio"> Mas info</a>'
          //content: "Estadio Usach"
      });
      google.maps.event.addListener(marca1, 'click', function () {
          infoWindow1.open($scope.map, marca1);
      });

    var pos2 =  new google.maps.LatLng(-33.4498482, -70.6876016);
    var marca2 = new google.maps.Marker({
        map: $scope.map,
        animation: google.maps.Animation.DROP,
        position:pos2      
    });
    var infoWindow2 = new google.maps.InfoWindow({
          content: "Kioscos de Informática"
      });
      google.maps.event.addListener(marca2, 'click', function () {
          infoWindow2.open($scope.map, marca2);
      });
      
    var pos3 =  new google.maps.LatLng(-33.4500630, -70.6862283);
    var marca3 = new google.maps.Marker({
        map: $scope.map,
        animation: google.maps.Animation.DROP,
        position:pos3       
    });
    var infoWindow3 = new google.maps.InfoWindow({
          content: "Casino Central"
      });
      google.maps.event.addListener(marca3, 'click', function () {
          infoWindow3.open($scope.map, marca3);
      });

    var pos4 =  new google.maps.LatLng(-33.4497676, -70.6842542);
    var marca4 = new google.maps.Marker({
        map: $scope.map,
        animation: google.maps.Animation.DROP,
        position:pos4       
    });
    var infoWindow4 = new google.maps.InfoWindow({
          content: "Centro Médico"
      });
      google.maps.event.addListener(marca4, 'click', function () {
          infoWindow4.open($scope.map, marca4);
      }); 

    var pos5 =  new google.maps.LatLng(-33.4510477, -70.6832778);
    var marca5 = new google.maps.Marker({
        map: $scope.map,
        animation: google.maps.Animation.DROP,
        position:pos5
    });
    var infoWindow5 = new google.maps.InfoWindow({
          content: '<h2>Pizzas Xl</h2><img src="img/pizzasxl.png" /> <br><a href="#/app/pizzaxl"> Mas info</a>'
      });
      google.maps.event.addListener(marca5, 'click', function () {
          infoWindow5.open($scope.map, marca5);
      }); 

                 
    })
  }, function(error){
    console.log("Could not get location");
  });
});


// Generated by CoffeeScript 1.9.1
(function() {
  angular.module('ionic.rating', []).constant('ratingConfig', {
    max: 5,
    stateOn: null,
    stateOff: null
  }).controller('RatingController', function($scope, $attrs, ratingConfig) {
    var ngModelCtrl;
    ngModelCtrl = {
      $setViewValue: angular.noop
    };
    this.init = function(ngModelCtrl_) {
      var max, ratingStates;
      ngModelCtrl = ngModelCtrl_;
      ngModelCtrl.$render = this.render;
      this.stateOn = angular.isDefined($attrs.stateOn) ? $scope.$parent.$eval($attrs.stateOn) : ratingConfig.stateOn;
      this.stateOff = angular.isDefined($attrs.stateOff) ? $scope.$parent.$eval($attrs.stateOff) : ratingConfig.stateOff;
      max = angular.isDefined($attrs.max) ? $scope.$parent.$eval($attrs.max) : ratingConfig.max;
      ratingStates = angular.isDefined($attrs.ratingStates) ? $scope.$parent.$eval($attrs.ratingStates) : new Array(max);
      return $scope.range = this.buildTemplateObjects(ratingStates);
    };
    this.buildTemplateObjects = function(states) {
      var i, j, len, ref;
      ref = states.length;
      for (j = 0, len = ref.length; j < len; j++) {
        i = ref[j];
        states[i] = angular.extend({
          index: 1
        }, {
          stateOn: this.stateOn,
          stateOff: this.stateOff
        }, states[i]);
      }
      return states;
    };
    $scope.rate = function(value) {
      if (!$scope.readonly && value >= 0 && value <= $scope.range.length) {
        ngModelCtrl.$setViewValue(value);
        return ngModelCtrl.$render();
      }
    };
    $scope.reset = function() {
      $scope.value = ngModelCtrl.$viewValue;
      return $scope.onLeave();
    };
    $scope.enter = function(value) {
      if (!$scope.readonly) {
        $scope.value = value;
      }
      return $scope.onHover({
        value: value
      });
    };
    $scope.onKeydown = function(evt) {
      if (/(37|38|39|40)/.test(evt.which)) {
        evt.preventDefault();
        evt.stopPropagation();
        return $scope.rate($scope.value + (evt.which === 38 || evt.which === 39 ? {
          1: -1
        } : void 0));
      }
    };
    this.render = function() {
      return $scope.value = ngModelCtrl.$viewValue;
    };
    return this;
  }).directive('rating', function() {
    return {
      restrict: 'EA',
      require: ['rating', 'ngModel'],
      scope: {
        readonly: '=?',
        onHover: '&',
        onLeave: '&'
      },
      controller: 'RatingController',
      template: '<ul class="rating" ng-mouseleave="reset()" ng-keydown="onKeydown($event)">' + '<li ng-repeat="r in range track by $index" ng-click="rate($index + 1)"><i class="icon" ng-class="$index < value && (r.stateOn || \'ion-ios-star\') || (r.stateOff || \'ion-ios-star-outline\')"></i></li>' + '</ul>',
      replace: true,
      link: function(scope, element, attrs, ctrls) {
        var ngModelCtrl, ratingCtrl;
        ratingCtrl = ctrls[0];
        ngModelCtrl = ctrls[1];
        if (ngModelCtrl) {
          return ratingCtrl.init(ngModelCtrl);
        }
      }
    };
  });

}).call(this);