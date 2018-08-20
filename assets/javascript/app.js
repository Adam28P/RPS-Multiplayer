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

    // Update database when player refreshes the page
	if(sessionStorage.getItem("playerNumber") == "1"){
		$("#game-stat").empty();
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


		playerTwoRef.once("value", function(snap){
			if(snap.val().name!="undefined"){
				$("#playerTwoH1").text(snap.val().name);
				$("#playerTwoH3").text("WINS: " + snap.val().wins + " LOSES: " + snap.val().loses);
			}
		});
		
		
		if(sessionStorage.getItem("playerName")!==null){
			sessionStorage.removeItem("playerName");
			var totalplayerscount = totalPlayerRef.child('totalPlayers');

			totalplayerscount.transaction(function(currentplayer) {
   				return currentplayer - 1;
			});
		}
		
	} else if(sessionStorage.getItem("playerNumber") == "2"){
		$("#game-stat").empty();
		playerTwoRef.set({
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

		playerOneRef.once("value", function(snap){
			if(snap.val().name!="undefined"){
				$("#playerOneH1").text(snap.val().name);
				$("#playerOneH3").text("WINS: " + snap.val().wins + " LOSES: " + snap.val().loses);
			}
		});

		if(sessionStorage.getItem("playerName")!==null){
			sessionStorage.removeItem("playerName");
			var totalplayerscount = totalPlayerRef.child('totalPlayers');
			totalplayerscount.transaction(function(currentplayer) {
   				return currentplayer - 1;
			});
		}
	}
    
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
    

    // This event occurs when player starts game by clicking start button
	$("#startButton").on("click", function(){

		totalPlayerRef.once('value', function(snap) {
			let totalPlayersCount = snap.val().totalPlayers;
   			if (totalPlayersCount!=2){
		   		playerName = $("#playerName").val().trim();		
		   		sessionStorage.setItem("playerName",playerName);
		   		if($("#playerOneH1").text()==""){
		   			$("#playerOneH1").text(playerName);
		   			sessionStorage.setItem("playerNumber","1");
		   			playerOneRef.set({
						choice: "undefined",
						loses: 0,
						wins: 0,
						name: playerName
					});
		   		}else{
		   			$("#playerTwoH1").text(playerName);
		   			sessionStorage.setItem("playerNumber","2");
		   			playerTwoRef.set({
						choice: "undefined",
						loses: 0,
						wins: 0,
						name: playerName
					});
		   		}
		   		$("#playerName").val("");
		   		$("#startNewGame").hide();
		   		$("#game-msg-1").html("<h1>Hi " + playerName + "! You are Player " + sessionStorage.getItem("playerNumber") + "!");
		   		$("#sendMessage").attr("disabled",false);
		   		$("#game-msg-2-h1").empty();
		   		totalPlayersCount++;
		   		totalPlayerRef.set({
		   			totalPlayers: totalPlayersCount
		   		});

		   		if (totalPlayersCount==2){
		   			turnRef.update({
		   				turn: 1
		   			});
		   		}

			}else{
				$("#game-msg-2-h1").text("Sorry! The game is already being played by 2 players. Please try again later!!");
		}	

		});
    });


    turnRef.on("value" , function(snap){
		if(snap.val().turn==1){
			if(sessionStorage.getItem("playerNumber")==1){
		   		$("#game-msg-2-h1").text("It's your turn");
		   		$("#playerOneH2").text("Rock");
		   		$("#playerOneH2").addClass("choices");
		   		$("#playerOneH4").text("Paper");
		   		$("#playerOneH4").addClass("choices");
		   		$("#playerOneH5").text("Scissors");
		   		$("#playerOneH5").addClass("choices");
		   		$("#player-1").css("border", "2px solid yellow");
		   		$("#player-2").css("border", "2px solid green");
		   		$("#game-stat").empty();
		   		$("#playerTwoH2").text("");
		   		$("#playerTwoH4").text("");
		   		$("#playerTwoH5").text("");
		   	}else{
		   		$("#game-msg-2-h1").text("Waiting for " + $("#playerOneH1").text() + " to choose.");
		   		$("#player-1").css("border", "2px solid yellow");
		   		$("#game-stat").empty();
		   		$("#playerTwoH2").text("");
		   		$("#playerTwoH4").text("");
		   		$("#playerTwoH5").text("");
		   		$("#playerOneH2").text("");
		   		$("#playerOneH4").text("");
		   		$("#playerOneH5").text("");
		   	}
		}
		else if(snap.val().turn==2){
			if(sessionStorage.getItem("playerNumber")==2){
		   		$("#game-msg-2-h1").text("It's your turn");
		   		$("#playerTwoH2").text("Rock");
		   		$("#playerTwoH2").addClass("choices");
		   		$("#playerTwoH4").text("Paper");
		   		$("#playerTwoH4").addClass("choices");
		   		$("#playerTwoH5").text("Scissors");
		   		$("#playerTwoH5").addClass("choices");
		   		$("#player-2").css("border", "2px solid yellow");
		   		$("#player-1").css("border", "2px solid green");
		   	}else{
		   		$("#game-msg-2-h1").text("Waiting for " + $("#playerTwoH1").text() + " to choose.");
		   		$("#player-2").css("border", "2px solid yellow");
		   	}	
		}
	});
    
});