var firebaseConfig = {
  apiKey: "AIzaSyDL7QUKIX4MJm9WiK0PFtGHD6dX6QXrLvw",
  authDomain: "users-detail-app.firebaseapp.com",
  projectId: "users-detail-app",
  storageBucket: "users-detail-app.appspot.com",
  messagingSenderId: "840161591491",
  appId: "1:840161591491:web:b2a91f6a098a2d129c2276",
  measurementId: "G-Y5NYEKJ7Y8",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const dbRef = firebase.database().ref();
const usersRef = dbRef.child("users");

const userListUI = document.getElementById("userList");
usersRef.on("child_added", (snap) => {
  let user = snap.val();
  let $li = document.createElement("li");
  $li.innerHTML = user.name;
  $li.setAttribute("child-key", snap.key);
  $li.addEventListener("click", userClicked);
  userListUI.append($li);
});

function userClicked(e) {
  var userID = e.target.getAttribute("child-key");
  const userRef = dbRef.child("users/" + userID);
  const userDetailUI = document.getElementById("userDetail");
  userDetailUI.innerHTML = "";
  userRef.on("child_added", (snap) => {
    var $p = document.createElement("p");
    $p.innerHTML = snap.key + " - " + snap.val();
    userDetailUI.append($p);
  });
}

const addUserBtnUI = document.getElementById("add-user-btn");
addUserBtnUI.addEventListener("click", addUserBtnClicked);

function addUserBtnClicked() {
  const usersRef = dbRef.child("users");
  const addUserInputsUI = document.getElementsByClassName("user-input");
  // this object will hold the new user information
  let newUser = {};

  // loop through View to get the data for the model
  for (let i = 0, len = addUserInputsUI.length; i < len; i++) {
    let key = addUserInputsUI[i].getAttribute("data-key");
    newUser[key] = value;
    let value = addUserInputsUI[i].value;
  }

  usersRef.push(newUser);
}
