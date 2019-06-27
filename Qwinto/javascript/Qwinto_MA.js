//Variablen

playerMessage = "";
var statusWait = true;
var arrFields = [0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0, 0,0,0, 0,0,0,0,0, 0,  0];
var sentFields = [0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0, 0,0,0, 0,0,0,0,0, 0,  0];
var currentPlayer = 0;
var diceValue = 0;
var Dice1 = true;
var Dice1Value = 0;
var Dice2 = true;
var Dice2Value = 0;
var Dice3 = true;
var Dice3Value = 0;
var xImg = "/Qwinto/images/x.jpg";
var 1Img = "/Qwinto/images/x.jpg";

// Standard Event

addListener ('standardEvent', function (event) {
	var stringFromServer = event.data;
	var arr = stringFromServer.split (',');
	
	if (arr.length == 43) {
		for (var i = 0; i < 41; i++) {
			arrFields [i] = +arr [i];
		}
		playerMessage = arr [41];
		
		var string = arr [42];        //Art des Spielers; Host anzeigen
		if (string == "HOST") {
			setVisible();
		}
		
		sentFields = [0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0, 0,0,0, 0,0,0,0,0, 0,  0];
		//			  Reihe 1		    |Reihe 2		   |Reihe3		   	  |FehlV   |Totals|Bonus 	 |-P |Gesamt
		// ArrayFeld  0-8				 9-17				18-26			   27-30	31-33  34-38	  39  40
		document.getElementById ("Player").innerHTML = playerMessage;
		redraw ();
	}
	statusWait = false;
});

// Start

addListener ('START', function (event) {
	var stringFromServer = event.data;
	var arr = stringFromServer.split (',');
	playerMessage = arr [41];
	document.getElementById ("Player").innerHTML = playerMessage;
	if (arr[42] == "HOST") {
		setVisible();
	}
	statusWait = false;
});

// Playerleft

addListener ('PLAYERLEFT', function (event) {
	var stringFromServer = event.data;
	playerMessage = stringFromServer;
	document.getElementById ("Player").innerHTML = playerMessage;
});

// Close

addListener ('CLOSE', function (event) {
	document.getElementById ("Player").innerHTML = "Spiel wurde vom Host beendet!";
});

// Feld initialisieren             TO DO!
window.onload = initFields;

function initFields () {
	var parent = document.getElementById ("spielfeld");
	for (var i = 0; i < 41; i++) {
		var img = doument.createElement ("img");
	}
}

// Spiel Status Aktualisieren

function updateGameState () {
	statusWait = true;
	sendDataToServer (sentFields);
}

// Feld zur�cksetzen

function redraw () {
	for ( var i = 0; i < 41; i++) {
		var img = document.getElementById ('img' + i);
		img.src = getImg (arrFields [i]);
	}
}

// Neustart

function restart () {
	statusWait = true;
	sendDataToServer ("RESTART");
}

// Sichtbarkeit

function setVisible () {
	document.getElementById ("restartButton").style.visibility = "visible";
	document.getElementById ("closeButton").style.visibility = "visible";
}

// Spiel Schlie�en

function closeGame () {
	sendDataToServer ("CLOSE");
}




// W�rfeln

function roll_dice () {
	if (Dice1 && !Dice2 && !Dice3) {
		Dice1Value=Math.floor(Math.random() * (6 - 1 + 1)) + 1;
	}else if (Dice1 && Dice2 && !Dice3) {
		Dice1Value=Math.floor(Math.random() * (6 - 1 + 1)) + 1;
		Dice2Value=Math.floor(Math.random() * (6 - 1 + 1)) + 1;
	}else if (Dice1 && !Dice2 && Dice3) {
		Dice1Value=Math.floor(Math.random() * (6 - 1 + 1)) + 1;
		Dice3Value=Math.floor(Math.random() * (6 - 1 + 1)) + 1;
	}else if (!Dice1 && Dice2 && !Dice3) {
		Dice2Value=Math.floor(Math.random() * (6 - 1 + 1)) + 1;
	}else if (!Dice1 && Dice2 && Dice3) {
		Dice2Value=Math.floor(Math.random() * (6 - 1 + 1)) + 1;
		Dice3Value=Math.floor(Math.random() * (6 - 1 + 1)) + 1;
	}else if (!Dice1 && !Dice2 && Dice3) {
		Dice3Value=Math.floor(Math.random() * (6 - 1 + 1)) + 1;
	}else if (Dice1 && Dice2 && Dice3) {
		Dice1Value=Math.floor(Math.random() * (6 - 1 + 1)) + 1;
		Dice2Value=Math.floor(Math.random() * (6 - 1 + 1)) + 1;
		Dice3Value=Math.floor(Math.random() * (6 - 1 + 1)) + 1;
	}
	diceValue=Dice1Value+Dice2Value+Dice3Value;
}

// Würfel wählen

function select_dice(){
	var isRedDie_checked = document.getElementById("wuerfel_rot").checked;
	var isYellowDie_checked = document.getElementById("wuerfel_gelb").checked;
	var isPurpleDie_checked = document.getElementById("wuerfel_lila").checked;
	console.log(isRedDie_checked);
	console.log(isYellowDie_checked);
	console.log(isPurpleDie_checked);
	
}

//Würfel-Counter

var try_count = 0;

// Würfelfunktion

function dice_roll() {
	//Würfelauswahl
//	var redDie = false;
//	var yellowDie = false;
//	var purpleDie = false;
	
	var redDie_value = 0;
	var yellowDie_value = 0;
	var purpleDie_value = 0;
	
	var sum_dice = 0;
	
	//Augenzahlen der Würfel
	if(try_count == 0 || try_count == 1){
		
		if (redDie == true) {
			redDie_value = (int)(Math.random() * 6) + 1; 
		} else {
			redDie_value = 0;
		}
		if (yellowDie == true) {
			yellowDie_value = (int)(Math.random() * 6) + 1; 
		} else {
			yellowDie_value = 0;
		}
		if (purpleDie == true) {
			purpleDie_value = (int)(Math.random() * 6) + 1; 
		} else {
			purpleDie_value = 0;
		}
		try_count += 1;
		//Summe der Würfel
		var sum_dice = redDie_value + yellowDie_value + purpleDie_value;
		
	} else {
		alert('Du kannst nicht noch einmal würfeln!');
	}
	
	
}

// 2. Wurf

function secondTry() {
	if (try_count == 1){
		//TODO:Würfel resetten
		
		dice_roll();
	}
	
}

// Eingabe Best�tigen

function confirmInput () {
	sendDataToServer ("CONFIRM");
}

// Feld setzen

function setField (x, y) {
	sentFields [x] = y;
}

// Bild/Zahl

function getImg (x) {
	if ( x == -1) {
		return xImg;
	} else if (x == 1) {
		return 1Img;
	} else if (x == 2) {
		return 2Img;
	} else if (x == 3) {
		return 3Img;
	} else if (x == 4) {
		return 4Img;
	} else if (x == 5) {
		return 5Img;
	} else if (x == 6) {
		return 6Img;
	} else if (x == 7) {
		return 7Img;
	} else if (x == 8) {
		return 8Img;
	} else if (x == 9) {
		return 9Img;
	} else if (x == 10) {
		return 10Img;
	} else if (x == 11) {
		return 11Img;
	} else if (x == 12) {
		return 12Img;
	} else if (x == 13) {
		return 13Img;
	} else if (x == 14) {
		return 14Img;
	} else if (x == 15) {
		return 15Img;
	} else if (x == 16) {
		return 16Img;
	} else if (x == 17) {
		return 17Img;
	} else if (x == 18) {
		return 18Img;
	}
}