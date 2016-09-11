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


  .controller('LoginCtrl', function($scope, $http, $state, Auth, $cordovaLocalNotification, $ionicLoading, $timeout) {
    $scope.loginData = {};
    var today = window.localStorage.getItem('today');
    var data = window.localStorage.getItem('data');
    var userId = window.localStorage.getItem('user');
    window.localStorage.clear();

    if(today) {
      window.localStorage.setItem('today', today);
    }
    if(data) {
      window.localStorage.setItem('data', data);
    }
    if(userId) {
      window.localStorage.setItem('user', userId);
    }

    $scope.login = function() {
      $scope.problem = '';
      $scope.emailInputColor = '';
      $scope.passInputColor = '';
      var languages = ["german", "english", "spanish", "portuguese"];
      var firebase = Auth;

      if(!$scope.loginData.email || !$scope.loginData.password) {
        if(!$scope.loginData.email) {
          $scope.emailInputColor = 'item-energized';
        }

        if(!$scope.loginData.password) {
          $scope.passInputColor = 'item-energized';
        }

        $scope.problem = 'Une adresse email et un mot de passe doivent être entrés';
        $scope.empty = true;
      } else {
        firebase.auth().signInWithEmailAndPassword($scope.loginData.email, $scope.loginData.password).then(function() {
          var user = firebase.auth().currentUser;

          if (user) {
            $ionicLoading.show({
              content: 'Loading',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0
            });

            window.localStorage.setItem('user', user.uid);
            window.localStorage.setItem('username', user.displayName);

            if(data) {
              var dataTemp = {};
              var i = 0;

              if(userId === user.uid) {
                firebase.database().ref().child("users/" + user.uid).once('value', function (snapshot) {
                  dataTemp = snapshot.val();
                  data = JSON.parse(data);

                  angular.forEach(languages, function(language) {
                    if(data[language]) {
                      data[language].listedateclass = dataTemp[language].listedateclass;
                      data[language].listedatevisio = dataTemp[language].listedatevisio;

                      angular.forEach(data[language].listedateclass, function(value) {
                        var date = new Date(value);
                        i++;
                        date.setHours(date.getHours() - 3);
                        if(date >= new Date()) {
                          $cordovaLocalNotification.schedule({
                            id: Number(i),
                            title: 'Multilingua',
                            text: 'Rendez-vous dans une heure !',
                            at: date
                          }).then(function (result) {
                            // ...
                          });
                        }
                      });
                      angular.forEach(data[language].listedatevisio, function(value) {
                        var date = new Date(value);
                        i++;
                        date.setHours(date.getHours() - 3);
                        if(date >= new Date()) {
                          $cordovaLocalNotification.schedule({
                            id: Number(i),
                            title: 'Multilingua',
                            text: 'Rendez-vous dans une heure !',
                            at: date
                          }).then(function (date) {
                            // ...
                          });
                        }
                      });
                    }
                  });

                  firebase.database().ref().child("users/" + user.uid).set(data);
                  window.localStorage.setItem('data', JSON.stringify(data));
                });
              } else {
                firebase.database().ref().child("users/" + userId).once('value', function (snapshot) {
                  dataTemp = snapshot.val();
                  data = JSON.parse(data);

                  angular.forEach(languages, function(language) {
                    if(data[language]) {
                      data[language].listedateclass = dataTemp[language].listedateclass;
                      data[language].listedatevisio = dataTemp[language].listedatevisio;

                      angular.forEach(data[language].listedateclass, function(value) {
                        var date = new Date(value);
                        var notifId = i+1;
                        date.setHours(date.getHours() - 2);
                        if(date >= new Date()) {
                          $cordovaLocalNotification.schedule({
                            id: Number(notifId),
                            title: 'Multilingua',
                            text: 'Rendez-vous dans une heure !',
                            at: date
                          }).then(function (result) {
                            // ...
                          });
                        }
                      });
                      angular.forEach(data[language].listedatevisio, function(value) {
                        var date = new Date(value);
                        var notifId = i+1;
                        date.setHours(date.getHours() - 2);
                        if(date >= new Date()) {
                          $cordovaLocalNotification.schedule({
                            id: Number(notifId),
                            title: 'Multilingua',
                            text: 'Rendez-vous dans une heure !',
                            at: date
                          }).then(function (date) {
                            // ...
                          });
                        }
                      });
                    }
                  });

                  firebase.database().ref().child("users/" + userId).set(JSON.parse(data));
                  firebase.database().ref().child("users/" + user.uid).once('value', function (snapshot) {
                    data = snapshot.val();
                    window.localStorage.setItem('data', JSON.stringify(data));
                  });
                });
              }
            } else {
              firebase.database().ref().child("users/" + user.uid).once('value', function (snapshot) {
                data = snapshot.val();
                window.localStorage.setItem('data', JSON.stringify(data));
              });
            }

            firebase.database().ref().child("mentor").once('value', function (snapshot) {
              var mentor = snapshot.val();
              window.localStorage.setItem('mentor', JSON.stringify(mentor));
            });

            $timeout(function() {
              $ionicLoading.hide();
              $state.go("language");
            }, 2000);
          } else {
            $scope.problem = 'Un problème est survenu, essayez de vous reconnecter';
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
            $scope.problem = error.code + ' : ' + error.message;
            $scope.$apply();
          }
        });
      }
    };
  })


  .controller('LanguageCtrl', function($scope, $state) {
    var data = JSON.parse(window.localStorage.getItem('data'));
    var user = window.localStorage.getItem('user');

    function setlanguage(text) {
      if(data[text]) {
        window.localStorage.setItem('language', text);
        $state.go("app.home");
      } else {
        $scope.status = "Vous n'êtes pas habilité à suivre les cours pour cette langue";
      }
    }

    $scope.setGerman = function() {
      setlanguage('german');
    };

    $scope.setEnglish = function() {
      setlanguage('english');
    };

    $scope.setSpanish = function() {
      setlanguage('spanish');
    };

    $scope.setPortuguese = function() {
      setlanguage('portuguese');
    };
  })


  .controller('HomeCtrl', function($scope, $state) {
    var data = JSON.parse(window.localStorage.getItem('data'));
    var language = window.localStorage.getItem('language');

    if(window.localStorage.getItem('today')) {
      if(new Date().toDateString() !== window.localStorage.getItem('today')) {
        window.localStorage.setItem('today', new Date().toDateString());
        data[language].class.nbclass ++;
        window.localStorage.setItem('data', JSON.stringify(data));
      }
    } else {
      window.localStorage.setItem('today', new Date().toDateString());
      window.localStorage.setItem('data', JSON.stringify(data));
    }

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


  .controller('DailyClassCtrl', function($scope, $state, $stateParams, $cordovaNetwork, $ionicPopup) {
    var data = JSON.parse(window.localStorage.getItem('data'));
    var language = window.localStorage.getItem('language');
    $scope.player = false;
    var src = "";
    var media;

    if($stateParams.class_id) {
      $scope.contenu = language + "/class" + $stateParams.class_id;
    } else {
      $scope.contenu = language + "/class" + data[language].class.nbclass;
    }

    $scope.audioClass = function() {
      if($cordovaNetwork.isOnline()) {
        if($cordovaNetwork.getNetwork() !== Connection.WIFI && $cordovaNetwork.getNetwork() !== Connection.ETHERNET) {
          function showConfirm() {
            var confirmPopup = $ionicPopup.confirm({
              title: 'Connection abonnée',
              template: 'Il semble que vous soyez connecté via avec votre abonnement mobile. Souhaitez-vous continuer ' +
              'tout de même ?'
            });

            confirmPopup.then(function(res) {
              if(res) {
                $scope.player = true;
              }
            });
          }

          showConfirm();
        } else {
          $scope.player = true;
        }
      } else {
        function showAlert() {
          $ionicPopup.alert({
            title: 'Pas de connexion',
            template: 'Merci de vous connecter pour pouvoir écouter le cours audio'
          });
        }

        showAlert();
      }
    };

    $scope.play = function() {
      media.play();
    };

    $scope.stop = function() {
      media.pause();
    };

    $scope.goExercice = function() {
      $state.go("app.dailyexercice");
    };

    $scope.init = function() {
      src = document.getElementById("media").textContent;
      media = new Media(src);
    };

    $scope.$on('$ionicView.beforeLeave', function(){
      media.stop();
    });
  })


  .controller('ListClassCtrl', function($scope, $state) {
    var data = JSON.parse(window.localStorage.getItem('data'));
    var language = window.localStorage.getItem('language');
    var nbClass = data[language].class.nbclass;
    var element = document.getElementById('boutons');

    for(var i = 1; i <= nbClass; i ++) {
      var button = document.createElement('button');
      button.setAttribute('class', 'button button-block button-positive');
      button.setAttribute('id', i.toString());
      button.innerHTML = 'Cours n°' + i;
      button.onclick = function(e) {
        $state.go("app.dailyclass", {class_id: e.target.getAttribute('id')});
      };
      element.appendChild(button);
    }
  })


  .controller('ExerciceCtrl', function($scope, $state) {
    var data = JSON.parse(window.localStorage.getItem('data'));
    var language = window.localStorage.getItem('language');

    if(window.localStorage.getItem('today')) {
      if(new Date().toDateString() !== window.localStorage.getItem('today')) {
        window.localStorage.setItem('today', new Date().toDateString());
        data[language].exercice.nbexercice ++;
        window.localStorage.setItem('data', JSON.stringify(data));
      }
    } else {
      window.localStorage.setItem('today', new Date().toDateString());
      data[language].exercice.nbexercice ++;
      window.localStorage.setItem('data', JSON.stringify(data));
    }

    $scope.dailyExercice = function() {
      $state.go("app.dailyexercice");
    };

    $scope.listExercices = function() {
      $state.go("app.listexercice");
    };
  })


  .controller('DailyExerciceCtrl', function($scope, $state, $stateParams) {
    var data = JSON.parse(window.localStorage.getItem('data'));
    var language = window.localStorage.getItem('language');
    $scope.question = {};
    $scope.answered = false;
    $scope.notanswered = false;
    $scope.disability = false;
    $scope.score = 0;

    var id;
    if($stateParams.exercice_id) {
      id = $stateParams.exercice_id;
    } else {
      id = data[language].exercice.nbexercice;
    }
    $scope.contenu = language + "/exercice" + id;

    var answers = data[language].exercice[id];

    $scope.init = function(){
      if(data[language].exercice[id].score) {
        $scope.disability = true;
        $scope.answered = true;
        $scope.score = data[language].exercice[id].score;

        for(var i = 0; i < answers.result.length; i ++) {
          var idElement = "question" + (i+1).toString() + "answer" + answers.useranswers.toString().charAt(i);
          var idGoodAnswer = "question" + (i+1).toString() + "answer" + answers.result.charAt(i);

          if(answers.useranswers.toString().charAt(i) === answers.result.charAt(i)) {
            document.getElementById(idElement).setAttribute('class', 'good-answer');
          }
          else {
            document.getElementById(idElement).setAttribute('class', 'wrong-answer');
            document.getElementById(idGoodAnswer).setAttribute('class', 'good-answer');
          }
        }
      } else {
        $scope.notanswered = true;
        var score = 0;
        var userAnswer = "";

        $scope.validAnswer = function() {
          for(var i = 0; i < answers.result.length; i ++) {
            var idQuestion = "question" + (i+1).toString();
            userAnswer = userAnswer + $scope.question[idQuestion].toString();
            if($scope.question[idQuestion].toString() === answers.result.charAt(i)) {
              score ++;
            }
          }

          data[language].exercice[id].score = score.toString();
          data[language].exercice[id].useranswers = userAnswer;
          window.localStorage.setItem('data', JSON.stringify(data));
          window.location.reload();
        };
      }
    };

    $scope.goClass = function() {
      $state.go("app.dailyclass", {class_id: id});
    };
  })


  .controller('ListExerciceCtrl', function($scope, $state) {
    var data = JSON.parse(window.localStorage.getItem('data'));
    var language = window.localStorage.getItem('language');
    var nbExercice = data[language].exercice.nbexercice;
    var element = document.getElementById('boutons');

    for(var i = 1; i <= nbExercice; i ++) {
      var button = document.createElement('button');
      button.setAttribute('class', 'button button-block button-positive');
      button.setAttribute('id', i.toString());
      button.innerHTML = 'Exercice n°' + i;
      button.onclick = function(e) {
        $state.go("app.dailyexercice", {exercice_id: e.target.getAttribute('id')});
      };
      element.appendChild(button);
    }
  })


  .controller('AgendaCtrl', function($scope, $timeout) {
    var data = JSON.parse(window.localStorage.getItem('data'));
    var language = window.localStorage.getItem('language');
    var myHighlights = [];

    var rdvActivated = false;
    var visioActivated = false;
    $scope.nextrdv = "";
    $scope.nextvisio = "";

    angular.forEach(data[language].listedateclass, function(value) {
      var savedDate = new Date(value);
      if(!rdvActivated && (savedDate >= new Date())) {
        $scope.nextrdv = "Votre prochain rendez-vous est prévu le " + savedDate.toLocaleDateString("fr-FR");
        rdvActivated = true;
      }
      myHighlights.push(
        {
          date: savedDate,
          color: '#054a29'
        }
      );
    });

    if(!rdvActivated) {
      $scope.nextrdv = "Vous n'avez pas de rendez-vous prévu pour l'instant";
    }

    angular.forEach(data[language].listedatevisio, function(value) {
      var savedDate = new Date(value);
      if(!visioActivated && (savedDate >= new Date())) {
        $scope.nextvisio = "Votre prochaine visioconférence est prévue le " + savedDate.toLocaleDateString("fr-FR");
        visioActivated = true;
      }
      myHighlights.push(
        {
          date: savedDate,
          color: '#5bba6f'
        }
      );
    });

    if(!visioActivated) {
      $scope.nextrdv = "Vous n'avez pas de visioconférence prévue pour l'instant";
    }

    var date = new Date();

    $scope.onezoneDatepicker = {
      date: date,
      daysOfTheWeek: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
      months: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
      mondayFirst: true,
      showDatePicker: true,
      calendarMode: true,
      highlights: myHighlights
    };


    $timeout(function() {
      document.getElementById('calendar').click();
    }, 10);
  })


  .controller('ContactCtrl', function($cordovaSocialSharing, $scope, $cordovaSms, $ionicPopup) {
    var data = JSON.parse(window.localStorage.getItem('data'));
    var dataMentors = JSON.parse(window.localStorage.getItem('mentor'));
    var language = window.localStorage.getItem('language');
    var idMentor = data[language].idmentor;
    var mentor = dataMentors[idMentor];

    $scope.mentorName = mentor.mentor;

    $scope.sendEmail = function() {
      $cordovaSocialSharing
        .shareViaEmail(window.localStorage.getItem('username') + " cherche à vous contacter", "Message Multilingua", mentor.email);
    };

    $scope.sendSms = function() {
      document.addEventListener("deviceready", function () {
        $cordovaSms
          .send(mentor.phone, 'Bonjour, ' + window.localStorage.getItem('username') + ' cherche à vous contacter')
          .then(function() {
            function showAlert() {
              $ionicPopup.alert({
                title: 'SMS envoyé',
                template: 'Votre SMS a bien été envoyé'
              });
            }

            showAlert();
          }, function() {
            function showAlert() {
              $ionicPopup.alert({
                title: 'SMS non envoyé',
                template: 'Un problème est survenu'
              });
            }

            showAlert();
          });
      });
    };
  });
