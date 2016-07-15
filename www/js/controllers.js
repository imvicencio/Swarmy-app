angular.module('starter.controllers', ['ionic', 'ngCordova','ngSails', 'ionic.rating'])

.config(['$sailsProvider', function ($sailsProvider) {
    $sailsProvider.url = 'https://swarmy-server.herokuapp.com';
}])

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

.factory('CreateComunidad', function() {



  crearComunidad = {};
  crearComunidad.nombreComunidad = "";
  crearComunidad.descripcionComunidad = "";
  return crearComunidad;
})

.factory('CreateNotificacion', function() {

  crearNotificacion = {};
  crearNotificacion.nombreNotificacion = "";
  crearNotificacion.descripcionNotificacion= "";
  return crearNotificacion;
})

.controller('RegistroCtrl', function($scope, Authorization){
  $scope.input = Authorization;
})

.controller('ViewCtrl', function($scope, Authorization) {
  $scope.input = Authorization;
})

.controller('CrearComunidadCtrl',function($scope, $http, CreateComunidad){
  $scope.input = CreateComunidad;


  $scope.sendData = function(){

  $http.post('http://swarmy-server.herokuapp.com/comunidad', 
    {nombre: $scope.input.nombreComunidad, detalle: $scope.input.descripcionComunidad})
    .success(function(data, status, headers, config) {
      console.log('hola');
    })
    .error(function(data, status, headers, config) {
      console.log('error', status, data);
    });
}
})

.controller('CrearNotificacionCtrl',function($scope, $http,CreateNotificacion){
  $scope.input = CreateNotificacion;

   $scope.sendData = function(){

  $http.post('http://swarmy-server.herokuapp.com/notificaciones', 
    {titulo: $scope.input.nombreNotificacion, contenido: $scope.input.descripcionNotificacion})
    .success(function(data, status, headers, config) {
      console.log('hola');
    })
    .error(function(data, status, headers, config) {
      console.log('error', status, data);
    });
}
})

.controller('ComunidadsCtrl', function($scope, $sails, CreateComunidad) {
/*  $scope.comunidads = [
    {  title: 'Deportes Usach', id: 1 },
    { title: 'Estudio Cabros', id: 2 },
    { title: 'Quimica II', id: 3 },
    { title: 'Loleros', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Imprenta', id: 6 }
  ];*/

  $scope.input = CreateComunidad;
  $scope.comunidads = [];

  $sails.get("/comunidad")
    .then(function(resp){
      $scope.comunidads = resp.data;
      console.log(resp.data);
    }, function(resp){
    alert('Houston, we got a problem!');
  });

})

.controller('notificacionCtrl', function($scope, $sails, CreateNotificacion) {

  $scope.input = CreateNotificacion;
  $scope.notificacionData = [];

$sails.get("/notificaciones")
    .then(function(resp){
        $scope.notificacionData = resp.data;
        console.log(resp.data);
    }, function(resp){
      //alert('Houston, we got a problem!');
    });

})


.controller('ComunidadCtrl', function($scope,$stateParams, $sails, $timeout , Authorization) {

  $scope.datos = [];
  $scope.messages = [];
  $scope.connected = true
  $scope.input = Authorization;

  //var paramValue = $route.current.$$route.paramExample;
  //alert($stateParams.id);
/*
  console.log($stateParams);
  $sails.get("/comunidad/"+$stateParams.id)
      .then(function(resp){
          $scope.datos = resp.data;
        //  console.log(resp.data);
      }, function(resp){
        alert('Houston, we got a problem!');
      });

*/
  <!--      -->

    $scope.messages = [];
    $scope.connected = true

    $sails.get('/chat/addMessage/').then(
      function (resp) {
        $scope.messages = resp.data;
        $sails.on('connect',function() {

          $sails.on('chat', function(obj){
            console.log(obj);
            //Check whether the verb is created or not
            if(obj.verb === 'created') {

                addMessageToList(username, true, obj.data.message);

            }
          });

          // On login display welcome message
          $sails.on('login', function (data) {
            //Set the value of connected flag
            $scope.connected = true
            $scope.peopleQtyMessage = message_string(data.numUsers);
          });

          // Whenever the server emits 'user joined', log it in the chat body
          $sails.on('user_joined', function (data) {
            if (data.user && (data.user.name != $rootScope.user.name)) {
              addMessageToList("", false, data.user.name + " joined");
            }
            $scope.peopleQtyMessage = message_string(data.numUsers);
          });

          // Whenever the server emits 'user left', log it in the chat body
          $sails.on('user_left', function (data) {
            if (data.user && (data.user.name != $rootScope.user.name)) {
              addMessageToList("", false, data.name +" left")
            }
            $scope.peopleQtyMessage = message_string(data.numUsers);
          });

          //Whenever the server emits 'typing', show the typing message
          $sails.on('typing', function (data) {
            addChatTyping(data);
          });

          // Whenever the server emits 'stop typing', kill the typing message
          $sails.on('stop_typing', function (data) {
            removeChatTyping(data.name);
          });
        })
      }
    )
    console.log("comunidad " + $stateParams.id);

    //function called when user hits the send button
    $scope.sendMessage = function() {
      if ($scope.message) {
        console.log($scope.message);
        $sails.post('/chat/addMessage/',{message: $scope.message, time: new Date(), user: $rootScope.user.id});
        $sails._raw.emit('stop typing');
        $scope.message = "";
      }
    }

    function addMessageToList(username, style_type, message){
      $scope.messages.push({content: message, style:style_type, username:username})  // Push the messages to the messages list.
      $ionicScrollDelegate.resize();
      $ionicScrollDelegate.scrollBottom(true); // Scroll to bottom to read the latest
    }

    // Return message string depending on the number of users
    function message_string(number_of_users) {
      return number_of_users === 1 ? "Hay un participante conectado":"Hay " + number_of_users + " participantes"
    }

  <!--      -->

})

.controller('RankingCtrl', function($scope,Authorization) {
   $scope.input = Authorization;

  $scope.rating = 4;
  $scope.data = {
    rating : 2,
    max: 5
  }

$scope.$watch('data.rating', function() {
  console.log('New value: '+$scope.data.rating);
});
})


.controller('StarsCtrl', ['$scope', function($scope) {

      $scope.ratingsObject = {
        iconOn : 'ion-ios-star',
        iconOff : 'ion-ios-star-outline',
        iconOnColor: 'rgb(200, 200, 100)',
        iconOffColor:  'rgb(200, 100, 100)',
        rating:  2,
        minRating:1,
        callback: function(rating) {
          $scope.ratingsCallback(rating);
        }
      };

      $scope.ratingsCallback = function(rating) {
        console.log('Selected rating is : ', rating);
      };

}])

.controller('MapCtrl', function($scope, $state, $cordovaGeolocation, $sails, $timeout) {

  $scope.puntos = [];

  $sails.get("/mapa")
      .then(function(resp){
          $scope.puntos = resp.data;
          console.log(resp.data);


          var options = {timeout: 1000, enableHighAccuracy: true};
          $cordovaGeolocation.getCurrentPosition(options).then(function(position){
            var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            var mapOptions = {
              center: latLng,
              zoom: 10,
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

            //  $timeout(callAtTimeout, 5000);

        //      function callAtTimeout() {
        //    console.log("Timeout occurred");
        //  }

          //  google.maps.event.trigger($scope.map, 'resize');

              for (var i = 0; i < $scope.puntos.length; i++) {
                //alert($scope.puntos.length);
                //console.log($scope.puntos.length);
                var record = $scope.puntos[i];
                //alert(record.nombre);
                var markerPos = new google.maps.LatLng(record.lat, record.lng);

                // Add the markerto the map
                var marker2 = new google.maps.Marker({
                    map: $scope.map,
                    animation: google.maps.Animation.DROP,
                    position: markerPos,
                    title: record.nombre
                });


               var infoWindowContent = new google.maps.InfoWindow({
                    content: "<h4>" + record.nombre + "</h4>"
                });
                google.maps.event.addListener(marker2, 'click', function () {
                    infoWindowContent.open($scope.map, marker2);
                });


              }

        /*
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
        */

            })
          }, function(error){
            console.log("Could not get location");
          });




      }, function(resp){
        alert('Houston, we got a problem!');
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


