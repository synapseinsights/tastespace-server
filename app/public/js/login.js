/* eslint-disable */
// This script is sourced and used by login.html
// It mostly just sets up firebase on the client side for authorization and defined some helpers and handlers

 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyDzorYU4RbfkupLNPFDHIRuXj1Sq5d57fo",
    authDomain: "tastespace-185c5.firebaseapp.com",
    databaseURL: "https://tastespace-185c5.firebaseio.com",
    projectId: "tastespace-185c5",
    storageBucket: "tastespace-185c5.appspot.com",
    messagingSenderId: "541349918712"
};
firebase.initializeApp(config);

// Login
function toggleSignIn() {
    if (!firebase.auth().currentUser) {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
        .then(function (result) {
            var token = result.credential.accessToken;
            var user = result.user;
            document.getElementById('quickstart-oauthtoken').textContent = token;
        }).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
            if (errorCode === 'auth/account-exists-with-different-credential') {
                alert('You have already signed up with a different auth provider for that email.');
            } else {
                console.error(error);
            }
        });
    } else {
        firebase.auth().signOut();
    }
    document.getElementById('quickstart-sign-in').disabled = true;
}

function initApp() {
    // Watch for user sign-in/out change and register some event handlers
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            window.location = 'api/hello';
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;
            document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
            document.getElementById('quickstart-sign-in').textContent = 'Sign out';
            document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');
        } else {
            // User is signed out.
            // window.location = '/';
            document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
            document.getElementById('quickstart-sign-in').textContent = 'Sign in with Google';
            document.getElementById('quickstart-account-details').textContent = 'null';
            document.getElementById('quickstart-oauthtoken').textContent = 'null';
        }
        document.getElementById('quickstart-sign-in').disabled = false;
    });
    document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
}
window.onload = function () {
    initApp();
};