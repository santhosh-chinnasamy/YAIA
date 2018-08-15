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

//read

var reviews = document.getElementById('reviews');
var reviewsRef = db.ref('/reviews');

reviewsRef.on('child_added', (data) => {
    var li = data.key;
    li.innerHTML = reviewTemplate(data.val())
    reviews.appendChild(li);
});

reviewsRef.on('child_changed', (data) => {
    var reviewNode = document.getElementById(data.key);
    reviewNode.innerHTML = reviewTemplate(data.val());
});

reviewsRef.on('child_removed', (data) => {
    var reviewNode = document.getElementById(data.key);
    reviewNode.parentNode.removeChild(reviewNode);
});

reviews.addEventListener('click', (e) => {
    var reviewNode = e.target.parentNode

    //update
    if (e.target.classList.contains('edit')) {
        fullname.value = reviewNode.querySelector('.fullname').innerText;
        message.value = reviewNode.querySelector('.message').innerText;
        hiddenId.value = reviewNode.id;
    }

    //delete

    if (e.target.classList.contains('delete')) {
        var id = reviewNode.id;
        db.ref('reviews/'+id).remove;
    }
});

//review template

function reviewTemplate({fullname,message}){
    return
    <div class='fullname'>${fulname}</div>
    <div class='message'>${message}</div>
    <button class='btn btn-warning edit'>Edit</button>
    <button class='btn btn-danger delete'>Delete</button>
};