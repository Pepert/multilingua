angular.module('multilingua.services', [])
  .factory("Auth", function() {
    var config = {
      apiKey: "AIzaSyDNVWla-_zt8DTmCHOAqP0LeYUkzBTS8_c",
      authDomain: "mutlilingua.firebaseapp.com",
      databaseURL: "https://mutlilingua.firebaseio.com",
      storageBucket: "mutlilingua.appspot.com",
    };

    return firebase.initializeApp(config);
  });
