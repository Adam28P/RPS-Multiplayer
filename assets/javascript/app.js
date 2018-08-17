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

    var playerSlot = 0

    $('#wins-losses-1').css("display", "none");
    $('#wins-losses-2').css("display", "none");

    $("#join-button").on("click", function () {
        database.ref('/players').once('value', function (snapshot) {
            if (snapshot.hasChild('1')) {
                var name = $("#name-input").val().trim();
                database.ref('/players').child('2').set({
                    name: name,
                    losses: 0,
                    wins: 0,
                })
                playerSlot = 2
                $("#name-join").html("");
            } else {
                var name = $("#name-input").val().trim();
                database.ref('/players').child('1').set({
                    name: name,
                    losses: 0,
                    wins: 0,
                })
                playerSlot = 1
                $("#player-slot").html("You are player 1. Give your opponent this URL to join the game");
                $("#name-join").html("");
            }
        });
    });


    database.ref('/players').on('value', function (snapshot) {
        if (snapshot.hasChild('1')) {
            database.ref('/players').child('1').on('value', function (snap) {
                $("wins-losses-1").css("display", "block");
                $("player-1-name").html(snap.val().name);
                $("player-1-wins").html(snap.val().wins);
                $("player-1-losses").html(snap.val().losses);
            });
        }
    });


    database.ref('/players').on('value', function (snapshot) {
        if (snapshot.hasChild('2')) {
            database.ref('/players').child('2').on('value', function (snap) {
                $("wins-losses-2").css("display", "block");
                $("player-2-name").html(snap.val().name);
                $("player-2-wins").html(snap.val().wins);
                $("player-2-losses").html(snap.val().losses);
            });
        }
    });

    
    $("#reset-button").on("click", function () {
        database.ref('/players').child('1').remove();
        database.ref('/players').child('2').remove();
        location.reload();
      });

});