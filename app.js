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

// CREATE REWIEW

var reviewForm = document.getElementById('reviewForm');
var fullName = document.getElementById('name');
var cheque = document.getElementById('cheque');
var issue = document.getElementById('issue');
var expiry = document.getElementById('expire');
var desc = document.getElementById('desc');
var hiddenId = document.getElementById('hiddenId');

reviewForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!fullName.value || !issue.value || !cheque.value || !expiry.value || !desc.value) return null

    var id = hiddenId.value || Date.now()

    db.ref('cheques/' + id).set({
        fullName: fullName.value,
        cheque: cheque.value,
        issue: issue.value,
        expiry: expiry.value,
        desc: desc.value
    });

    fullName.value = '';
    cheque.value = '';
    issue.value = '';
    expiry.value = '';
    desc.value = '';
    hiddenId.value = '';
});

// READ REVEIWS

var cheques = document.getElementById('cheques');
var chequesRef = db.ref('/cheques');

chequesRef.on('child_added', (data) => {
    var li = document.createElement('li');
    li.id = data.key;
    li.innerHTML = reviewTemplate(data.val());
    cheques.appendChild(li);
});

chequesRef.on('child_changed', (data) => {
    var reviewNode = document.getElementById(data.key);
    reviewNode.innerHTML = reviewTemplate(data.val());
});

chequesRef.on('child_removed', (data) => {
    var reviewNode = document.getElementById(data.key);
    reviewNode.parentNode.removeChild(reviewNode);
});

cheques.addEventListener('click', (e) => {
    var reviewNode = e.target.parentNode

    // UPDATE REVEIW
    if (e.target.classList.contains('edit')) {
        fullName.value = reviewNode.querySelector('.name').innerText;
        cheque.value = reviewNode.querySelector('.cheque').innerText;
        issue.value = reviewNode.querySelector('.issue').innerText;
        expiry.value = reviewNode.querySelector('.expire').innerText;
        desc.value = reviewNode.querySelector('.desc').innerText;
        hiddenId.value = reviewNode.id;
    }

    // DELETE REVEIW
    if (e.target.classList.contains('delete')) {
        var id = reviewNode.id;
        db.ref('cheques/' + id).remove();
    }
});

function reviewTemplate({fullName,cheque,issue,expiry,desc}) {
    return `
    <div class='name'>${fullName}</div>
    <div class='cheque'>${cheque}</div>
    <div class='issue'>${issue}</div>
    <div class='expire'>${expiry}</div>
    <div class='desc'>${desc}</div>
    <button class='btn btn-warning edit mb-2'>Edit</button>
    <button class='btn btn-danger delete mb-2'>Delete</button>
    `




};