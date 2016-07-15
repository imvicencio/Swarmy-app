angular.module('starter.controllers', ['ionic', 'ngCordova','ngSails'])

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

.controller('ComunidadsCtrl', function($scope) {
  $scope.comunidads = [
    {  title: 'Deportes Usach', id: 1 },
    { title: 'Estudio Cabros', id: 2 },
    { title: 'Quimica II', id: 3 },
    { title: 'Loleros', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Imprenta', id: 6 }
  ];
})

.controller('ComunidadCtrl', function($scope, $stateParams) {
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
      }, function(resp){
        alert('Houston, we got a problem!');
      });


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

      function callAtTimeout() {
    console.log("Timeout occurred");
}

  //  google.maps.event.trigger($scope.map, 'resize');

      for (var i = 0; i < $scope.puntos.length; i++) {
        //alert($scope.puntos.length);
        //console.log($scope.puntos.length);
        var record = $scope.puntos[i];
        //alert(record.nombre);
        var markerPos = new google.maps.LatLng(record.lat, record.lng);

        // Add the markerto the map
        var marker = new google.maps.Marker({
            map: $scope.map,
            animation: google.maps.Animation.DROP,
            position: markerPos,
            title: record.nombre
        });


/*        var infoWindowContent = new google.maps.InfoWindow({
            content: "<h4>" + record.nombre + "</h4>"
        });
        google.maps.event.addListener(marker, 'click', function () {
            infoWindowContent.open($scope.map, marker);
        });
*/

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
          content: "Pizzas XL"
      });
      google.maps.event.addListener(marca5, 'click', function () {
          infoWindow5.open($scope.map, marca5);
      });
*/

    })
  }, function(error){
    console.log("Could not get location");
  });
});
