var config = {
    apiKey: "AIzaSyDY97uW202INfcJUgftVa0OCVDInDmRAgs",
    authDomain: "project-invoice-c9c15.firebaseapp.com",
    databaseURL: "https://project-invoice-c9c15.firebaseio.com",
    projectId: "project-invoice-c9c15",
    storageBucket: "project-invoice-c9c15.appspot.com",
    messagingSenderId: "531611377260"
};
firebase.initializeApp(config);

var db = firebase.database();

//create

var reviewForm = document.getElementById('reviewForm');
var fullname = document.getElementById('fullname');
var message = document.getElementById('message');
var hiddenId = document.getElementById('hiddenId');

reviewForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!fullname.value || !message.value) return null
    var id = hiddenId.value || Date.now;

    db.ref('reviews' / +id).set({
        fullname: fullname.value,
        message: message.value
    });

    fullname.value = '';
    message.value = '';
    hiddenId.value = '';
});