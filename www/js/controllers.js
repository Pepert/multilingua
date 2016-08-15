angular.module('multilingua.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal) {
  
})

.controller('LoginCtrl', function($scope, $http, $state) {
  $scope.empty = false;

  $scope.validLogin = function() {
    $scope.pseudoInputColor = '';
    $scope.passInputColor = '';
    if(!$scope.loginData.username || !$scope.loginData.password) {
      if(!$scope.loginData.username) {
        $scope.pseudoInputColor = 'item-energized';
      }

      if(!$scope.loginData.password) {
        $scope.passInputColor = 'item-energized';
      }

      $scope.empty = true;
    } else {
      $scope.empty = false;
      var user = $scope.loginData.username;
      var url = 'https://mutlilingua.firebaseio.com/member/' + user + '/pass.json';

      var password = '';
      $http.get(url).then(function(data) {
        if(data.data) {
          password = data.data;

          if($scope.loginData.password === password) {
            $state.go("app.home");
          } else {
            console.log("erreur : le mot de passe ne correspond pas");
            $scope.passInputColor = 'item-energized';
          }

        } else {
          console.log("erreur : cet utilisateur n'existe pas");
          $scope.pseudoInputColor = 'item-energized';
        }
      });
    }
  }
})

.controller('HomeCtrl', function($scope, $state) {
  $scope.dailyClass = function() {
    $state.go("app.dailyclass");
  }
})

.controller('AgendaCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
