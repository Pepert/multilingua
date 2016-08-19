user.updateProfile({
  displayName: "Pierre"
}).then(function() {
  console.log('done');
}, function(error) {
  console.log(error.message);
});


firebase.database().ref().child("users").child(user.uid).set({
  mentor: 'Jean Dupont'
});

console.log('update done');

firebase.database().ref().child("users").child(user.uid).once('value', function (data) {
  var mentor = data.val().mentor;
  console.log(mentor);
});
