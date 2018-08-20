$(document).ready(function () {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyBjZDHlKAtCCZkG7o1WTNLn7xDtw4yLnes",
        authDomain: "rps-multiplayer-9b274.firebaseapp.com",
        databaseURL: "https://rps-multiplayer-9b274.firebaseio.com",
        projectId: "rps-multiplayer-9b274",
        storageBucket: "",
        messagingSenderId: "428674838353"
    };

    firebase.initializeApp(config);

    var database = firebase.database();

    // Firebase reference
    rootRef = database.ref();
	chatRef = rootRef.child("/chat")
	playerRef = rootRef.child("/players");
	playerOneRef = playerRef.child("/1");
	playerTwoRef = playerRef.child("/2");
	totalPlayerRef = rootRef.child("/totalPlayers");
	turnRef = rootRef.child("/turn");
	curWin = rootRef.child("/currentWin");

    // Set initial chat area value
	chatArea = $("#chatArea");
	chatArea.val(" -Chat messages will appear here-");


});