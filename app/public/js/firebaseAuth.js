/* eslint-disable */
function checkIfLoggedIn() {
    // Check if a user is logged into firebase using its authorization-state-change watcher
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log("user logged in")
            document.getElementById('google-signin').setAttribute('style', 'display: none; visibility: hidden');
            document.getElementById('google-signout').setAttribute('style', 'display: inline-block; visibility: visible');
            document.getElementById("google-name").innerHTML = user.displayName;
            document.getElementById("google-email").textContent = user.email;
            document.getElementById("google-pic").setAttribute('src', user.photoURL);
        } else {
            console.log("user logged out")
            document.getElementById('google-signin').setAttribute('style', 'display: inline-block; visibility: visible');
            document.getElementById('google-signout').setAttribute('style', 'display: none; visibility: hidden');
            document.getElementById("google-name").innerHTML = ''
            document.getElementById("google-email").textContent = '' 
            document.getElementById("google-pic").setAttribute('src','');
        }
    })
    var user = firebase.auth().currentUser;
    console.log(user);
}
window.onload = function () {
    // Run this function as soon as the window loads
    checkIfLoggedIn()
}

function signOutWithGoogle() {
    // For sign out button
    firebase.auth().signOut()
    document.getElementById('google-pic')
        .setAttribute('src', '')
}

function signInWithGoogle() {
    // For sign in button
    // User firebase methods to login with google
    // Using old JS style for browser compatibility
    var googleAuthProvider = new firebase.auth.GoogleAuthProvider;
    firebase.auth().signInWithPopup(googleAuthProvider)
        .then(function (data) {
            document.getElementById("google-name").innerHTML = data.user.displayName;
            document.getElementById("google-email").textContent = data.user.email;
            document.getElementById("google-pic").setAttribute('src', data.user.photoURL);
        })
        .catch(function (error) {
            console.log(error);
        })
}