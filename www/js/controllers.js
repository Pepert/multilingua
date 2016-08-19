angular.module('multilingua.controllers', [])

.controller('LoadingCtrl', function($scope, $state, $ionicLoading) {
  $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });

  var user = window.localStorage.getItem('user');
  var language = window.localStorage.getItem('language');
  if(user) {
    if(language) {
      $ionicLoading.hide();
      $state.go("app.home");
    } else {
      $ionicLoading.hide();
      $state.go("language");
    }
  } else {
    $ionicLoading.hide();
    $state.go("login");
  }
})

.controller('AppCtrl', function($scope, $ionicModal) {

})

.controller('LoginCtrl', function($scope, $http, $state, Auth) {
  $scope.loginData = {};
  window.localStorage.clear();

  $scope.login = function() {
    $scope.problem = '';
    $scope.emailInputColor = '';
    $scope.passInputColor = '';
    var firebase = Auth;

    if(!$scope.loginData.email || !$scope.loginData.password) {
      if(!$scope.loginData.email) {
        $scope.emailInputColor = 'item-energized';
      }

      if(!$scope.loginData.password) {
        $scope.passInputColor = 'item-energized';
      }

      $scope.problem = 'Un pseudo et un mot de passe doivent être entrés';
      $scope.empty = true;
    } else {
      firebase.auth().signInWithEmailAndPassword($scope.loginData.email, $scope.loginData.password).then(function() {
        var user = firebase.auth().currentUser;

        if (user) {
          window.localStorage.setItem('user', user);
          window.localStorage.setItem('username', user.displayName);
          $state.go('language');
        } else {
          console.log('Un problème est survenu, essayez de vous reconnecter');
        }
      }).catch(function(error) {
        if(error.code === 'auth/user-not-found') {
          $scope.emailInputColor = 'item-energized';
          $scope.problem = 'Cet utilisateur n\'existe pas';
          $scope.$apply();
        }
        else if(error.code === 'auth/wrong-password') {
          $scope.passInputColor = 'item-energized';
          $scope.problem = 'Le mot de passe ne correspond pas';
          $scope.$apply();
        }
        else {
          $scope.problem = console.log(error.code + ' : ' + error.message);
          $scope.$apply();
        }
      });
    }
  };
})

.controller('LanguageCtrl', function($scope, $state) {
  $scope.setGerman = function() {
    window.localStorage.setItem('language', 'german');
    $state.go("app.home");
  };

  $scope.setEnglish = function() {
    window.localStorage.setItem('language', 'english');
    $state.go("app.home");
  };

  $scope.setSpanish = function() {
    window.localStorage.setItem('language', 'spanish');
    $state.go("app.home");
  };

  $scope.setPortuguese = function() {
    window.localStorage.setItem('language', 'portuguese');
    $state.go("app.home");
  };
})

.controller('HomeCtrl', function($scope, $state) {
  $scope.username = window.localStorage.getItem('username');

  $scope.dailyClass = function() {
    $state.go("app.dailyclass");
  };

  $scope.listClass = function() {
    $state.go("app.listclass");
  };

  $scope.setNewLanguage = function() {
    window.localStorage.removeItem('language');
    $state.go("language");
  };

  $scope.disconnect = function() {
    $state.go("login");
  };
})

.controller('ListClassCtrl', function($scope, $http) {
  $scope.items = getItems();

  $scope.addItem = function() {
    var name = prompt("Que devez-vous acheter?");
    if (name) {
      var postData = {
        "name": name
      };
      $http.post(url, postData).success(function(data) {
        $scope.items = getItems();
      });
    }
  };

  function getItems() {
    var items = [];
    $http.get(url).success(function(data) {
      angular.forEach(data, function(value, key) {
        var name = {name: value.name};
        items.push(name);
      });
    });

    return items;
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
