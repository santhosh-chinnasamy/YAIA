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
var amount = document.getElementById('amount');
// var desc = document.getElementById('desc');
var hiddenId = document.getElementById('hiddenId');

reviewForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!fullName.value || !issue.value || !cheque.value || !expiry.value || !amount.value) return "fill details";

    var id = hiddenId.value || Date.now();

    db.ref('cheques/' + id).set({
        fullName: fullName.value,
        cheque: cheque.value,
        issue: issue.value,
        expiry: expiry.value,
        amount: amount.value
        // desc: desc.value
    });

    fullName.value = '';
    cheque.value = '';
    issue.value = '';
    expiry.value = '';
    // desc.value = '';
    amount.value = '';
    hiddenId.value = '';
});

// READ REVEIWS

var cheques = document.getElementById('cheques');
var chequesRef = db.ref('/cheques');

chequesRef.on('child_added', (data) => {
    var li = document.createElement('tr');
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
    var reviewNode = e.target.parentNode;

    // UPDATE REVEIW
    if (e.target.classList.contains('edit')) {
        fullName.value = reviewNode.querySelector('.name').innerText;
        cheque.value = reviewNode.querySelector('.cheque').innerText;
        issue.value = reviewNode.querySelector('.issue').innerText;
        expiry.value = reviewNode.querySelector('.expire').innerText;
        // desc.value = reviewNode.querySelector('.desc').innerText;
        amount.value = reviewNode.querySelector('.amount').innerText;
        hiddenId.value = reviewNode.id;
    }

    // DELETE REVEIW
    if (e.target.classList.contains('delete')) {
        var id = reviewNode.id;
        db.ref('cheques/' + id).remove();
    }
});

function reviewTemplate({
    fullName,
    cheque,
    issue,
    expiry,
    amount
    // desc
}) {
    return `
    <td class="name">${fullName}</td>
    <td class="cheque">${cheque}</td>
    <td class="issue">${issue}</td>
    <td class="expire">${expiry}</td>
    <td class="amount">${amount}</td>
    <button class='btn btn-warning edit mb-3'>Edit</button>
    <button class='btn btn-danger delete mb-3'>Delete</button>
    `;

};

/*
<label>Name: </label> <div class='name'>${fullName}</div>
    <label>Cheque No:</label> <div class='cheque'>${cheque}</div>
    <label>Issued on:</label><div class='issue'>${issue}</div>
    <label>Expire On:</label> <div class='expire'>${expiry}</div>
    <label>Amount:</label><div class='amount'>${amount}</div>
    <button class='btn btn-warning edit mb-2'>Edit</button>
    <button class='btn btn-danger delete mb-2'>Delete</button>
    `
*/

/*
    <td class="name">${fullName}</td>
    <td class="cheque">${cheque}</td>
    <td class="issue">${issue}</td>
    <td class="expire">${expiry}</td>
    <td class="amount">${amount}</td>
    <td><button class='btn btn-warning edit mb-2'>Edit</button></td>
    <td><button class='btn btn-danger delete mb-2'>Delete</button></td>
*/