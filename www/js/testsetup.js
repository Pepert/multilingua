//Start of database settlements for one authentified user
user.updateProfile({
  displayName: "Pierre"
}).then(function() {
  console.log('done');
}, function(error) {
  console.log(error.message);
});

var ref = firebase.database().ref().child("users").child(user.uid).child("english");

ref.set({
  idmentor: '2'
});

ref.child("listedatevisio").set({
  datevisio1: '2016-08-29T20:00',
  datevisio2: '2016-08-31T20:00'
});

ref.child("listedateclass").set({
  dateclass1: '2016-09-02T20:00'
});

ref.child("class").set({
  nbclass: '3'
});

ref.child("exercice").set({
  nbexercice: '3'
});

ref.child("exercice").child("1").set({
  result: "1231231231",
  useranswers: "1211231211",
  score: "8"
});

ref.child("exercice").child("2").set({
  result: "3213213213213",
  useranswers: "2113113121122",
  score: "4"
});

ref.child("exercice").child("3").set({
  result: "1112223331112"
});

ref.child("exercice").child("4").set({
  result: "1321321321321"
});

ref.child("exercice").child("5").set({
  result: "1122331122331"
});



ref = firebase.database().ref().child("users").child(user.uid).child("spanish");

ref.set({
  idmentor: '3'
});

ref.child("listedatevisio").set({
  datevisio1: '2016-09-14T20:00',
  datevisio2: '2016-09-28T20:00'
});

ref.child("listedateclass").set({
  dateclass1: '2016-09-03T20:00',
  dateclass2: '2016-09-15T20:00',
  dateclass3: '2016-10-02T20:00'
});

ref.child("class").set({
  nbclass: '2'
});

ref.child("exercice").set({
  nbexercice: '2'
});

ref.child("exercice").child("1").set({
  result: "1231231231",
  useranswers: "1332311232",
  score: "5"
});

ref.child("exercice").child("2").set({
  result: "3213213213213"
});

ref.child("exercice").child("3").set({
  result: "1112223331112"
});

ref.child("exercice").child("4").set({
  result: "1321321321321"
});

ref.child("exercice").child("5").set({
  result: "1122331122331"
});




ref = firebase.database().ref().child("mentor");

ref.child("1").set({
  mentor: 'Louis Martin',
  email: 'lmartin@gmail.com',
  phone: '0033448957631'
});

ref.child("2").set({
  mentor: 'Jean Dupont',
  email: 'playpero@hotmail.com',
  phone: '0032483195068'
});

ref.child("3").set({
  mentor: 'Patrick Chirac',
  email: 'pchirac@aol.com',
  phone: '0033626610615'
});

console.log('update done');
//End of database settlements
