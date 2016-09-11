angular.module('multilingua.services', [])
  .factory("Auth", function() {
    var config = {
      apiKey: "AIzaSyALa-YbPk_wh5e7WfU_m8-ioqA8i-f873o",
      authDomain: "multilingua-f46ac.firebaseapp.com",
      databaseURL: "https://multilingua-f46ac.firebaseio.com",
      storageBucket: "multilingua-f46ac.appspot.com"
    };

    return firebase.initializeApp(config);
  });
