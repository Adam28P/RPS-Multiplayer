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
    

    playerOneRef.on("value", function(snapshot){
		if(snapshot.val().name!="undefined"){
			$("#playerOneH1").text(snapshot.val().name);
			$("#playerOneH3").text("WINS: " + snapshot.val().wins + " LOSES: " + snapshot.val().loses);
		}
		else{
			$("#playerOneH1").empty();
			$("#playerOneH2").empty();
			$("#playerOneH3").empty();
			$("#playerOneH4").empty();
			$("#playerOneH5").empty();	
		}
    });
    
    playerTwoRef.on("value", function(snapshot){
		if(snapshot.val().name!="undefined"){
			$("#playerTwoH1").text(snapshot.val().name);
			$("#playerTwoH3").text("WINS: " + snapshot.val().wins + " LOSES: " + snapshot.val().loses);
		}
		else{
			$("#playerTwoH1").empty();
			$("#playerTwoH2").empty();
			$("#playerTwoH3").empty();
			$("#playerTwoH4").empty();
			$("#playerTwoH5").empty();
		}
    });
    
    $("#refresh").on("click", function(){
		playerTwoRef.set({
			choice: "undefined",
			loses: 0,
			wins: 0,
			name: "undefined"
		});

		playerOneRef.set({
			choice: "undefined",
			loses: 0,
			wins: 0,
			name: "undefined"
		});		

		turnRef.set({
			turn: 0
		});

		curWin.set({
			currentWin: -1
		});

		totalPlayerRef.set({
			totalPlayers: 0
		});
		sessionStorage.removeItem("playerName");
		location.reload(true);
	});
});