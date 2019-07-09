//Variablen

playerMessage = "";
var statusWait = true;
var arrFields = [0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0, 0,0,0, 0,0,0,0,0, 0,  0];
//var sentFields = [0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0, 0,0,0, 0,0,0,0,0, 0,  0];
var currentPlayer = 0;
var diceValue = 0;
var Dice1 = true;
var Dice1Value = 0;
var Dice2 = true;
var Dice2Value = 0;
var Dice3 = true;
var Dice3Value = 0;
var Selected = "rot1";
var FeldID;
var position = 0;
var fieldSet;

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
		
		//sentFields = [0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0, 0,0,0,0, 0,0,0, 0,0,0,0,0, 0,  0];
		//			  Reihe 1		    |Reihe 2		   |Reihe3		   	  |FehlV   |Totals|Bonus 	 |-P |Gesamt
		// ArrayFeld  0-8				 9-17				18-26			   27-30	31-33  34-38	  39  40
		document.getElementById ("Player").innerHTML = playerMessage;
		redraw ();
	}
	statusWait = false;
});

// Start

//addListener ('START', function (event) {
//	var stringFromServer = event.data;
//	var arr = stringFromServer.split (',');
//	playerMessage = arr [41];
//	document.getElementById ("Player").innerHTML = playerMessage;
//	if (arr[42] == "HOST") {
//		setVisible();
//	}
//	statusWait = false;
//});

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

// Feld initialisieren
function draw_spielfeld() {
//Hintergrund
	var c = document.getElementById("spielfeld_bg");
	var ctx = c.getContext("2d");
	var img = document.getElementById("spielfeld_img");
	ctx.drawImage(img,10,10);
	//Roter Wuerfel
	var w1 = document.getElementById("wuerfel_rot");
	var wtx1 = w1.getContext("2d");
	var img1 = document.getElementById("wuerfel1_img");
	wtx1.drawImage(img1,10,10);
	//Gelber Wuerfel
	var w2 = document.getElementById("wuerfel_gelb");
	var wtx2 = w2.getContext("2d");
	var img2 = document.getElementById("wuerfel2_img");
	wtx2.drawImage(img2,10,10);
	//Lila Wuerfel
	var w3 = document.getElementById("wuerfel_lila");
	var wtx3 = w3.getContext("2d");
	var img3 = document.getElementById("wuerfel3_img");
	wtx3.drawImage(img3,10,10);
}

//beim Laden der Seite das Spielfeld erstellen
window.onload = function() {
	draw_spielfeld();
	}

// Spiel Status Aktualisieren

function updateGameState () {
	statusWait = true;
	sendDataToServer (sentFields);
}

// Feld zuruecksetzen

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

// Spiel Schliessen

function closeGame () {
	sendDataToServer ("CLOSE");
}

// Wuerfeln

var wurf_count = 0;

function roll_dice () {
 //Nur beim ersten und zweiten Versuch wird das Skript ausgefuehrt
	if (wurf_count == 0 || wurf_count == 1){
		var c = document.getElementById("summe_wurf");
		var ctx = c.getContext("2d");
		var img = document.getElementById("white_img");
		ctx.drawImage(img,10,10);
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
		img = document.getElementById(diceValue + "_img");
		ctx.drawImage(img,10,10);
			  
		//Pop-Up fuer Wurf
		if (wurf_count == 0){
			var msg;
			var wurfbox = confirm("Rot: " + Dice1Value + "\r\nGelb: " + Dice2Value + "\r\nLila: " + Dice3Value + "\r\nGesamt: " + diceValue);
			//Erster Wurf bestaetigt
			if (wurfbox == true) {
				alert("Du kannst nun die Zahl " + diceValue + " einsetzen.");
				wurf_count += 2;
				//Zweitversuch  
			} else {
				wurf_count +=1;
				alert("Zweiter Versuch!");
				roll_dice ();
				alert("Rot: " + Dice1Value + "\r\nGelb: " + Dice2Value + "\r\nLila: " + Dice3Value + "\r\nGesamt: " + diceValue);
				wurf_count +=1;
			}
		}
			  
		//Pop-Up wenn bereits gewuerfelt wurde oder Zweitversuch stattgefunden hat  
		} else {
			alert("Du kannst nicht noch mal wuerfeln!");
		}	  
}

// Wuerfel waehlen

function selectDice (Dice) {
	var DiceID = Dice.id;
	
	if (DiceID == "wuerfel_rot") {
		if (Dice1 == true) {
			Dice1 = false;
			Dice1Value = 0;
			var zhl = 1;
			var c = document.getElementById("wuerfel_rot");
			var ctx = c.getContext("2d");
			var img = document.getElementById("grau_img");
		  	ctx.drawImage(img,10,10);
		    //Farbe sperren
			while (zhl < 10){
				document.getElementById("rot" + zhl).style.zIndex = 0;
				zhl++;
			}
		} else if (Dice1 == false) {
			Dice1 = true;
			var zhl = 1;
			var c = document.getElementById("wuerfel_rot");
			var ctx = c.getContext("2d");
			var img = document.getElementById("rot_img");
		  	ctx.drawImage(img,10,10);
		    //Farbe entsperren
			while (zhl < 10){
				document.getElementById("rot" + zhl).style.zIndex = 1;
				zhl++;
			}
		}
	} else if (DiceID == "wuerfel_gelb") {
		if (Dice2 == true) {
			Dice2 = false;
			Dice2Value = 0;
			var zhl = 1;
			var c = document.getElementById("wuerfel_gelb");
			var ctx = c.getContext("2d");
			var img = document.getElementById("grau_img");
			ctx.drawImage(img,10,10);
			//Farbe sperren
			while (zhl < 10){
				document.getElementById("gelb" + zhl).style.zIndex = 0;
				zhl++;
			}
		} else if (Dice2 == false) {
			Dice2 = true;
			var zhl = 1;
			var c = document.getElementById("wuerfel_gelb");
			var ctx = c.getContext("2d");
			var img = document.getElementById("gelb_img");
		  	ctx.drawImage(img,10,10);
		  	//Farbe entsperren
			while (zhl < 10){
				document.getElementById("gelb" + zhl).style.zIndex = 1;
				zhl++;
			}
		}
	} else if (DiceID == "wuerfel_lila") {
		if (Dice3 == true) {
			Dice3 = false;
			Dice3Value = 0;
			var zhl = 1;
			var c = document.getElementById("wuerfel_lila");
			var ctx = c.getContext("2d");
			var img = document.getElementById("grau_img");
		  	ctx.drawImage(img,10,10);
		    //Farbe sperren
			while (zhl < 10){
				document.getElementById("lila" + zhl).style.zIndex = 0;
				zhl++;
			}
		} else if (Dice3 == false) {
			Dice3 = true;
			var zhl = 1;
			var c = document.getElementById("wuerfel_lila");
			var ctx = c.getContext("2d");
			var img = document.getElementById("lila_img");
			ctx.drawImage(img,10,10);
			//Farbe entsperren
			while (zhl < 10){
				document.getElementById("lila" + zhl).style.zIndex = 1;
				zhl++;
			}
		}
	}
}

// Eingabe Bestaetigen

function confirmInput () {
	setPosition();
	setField();
	if (fieldSet == true) {
		var c = document.getElementById(Selected);
		var ctx = c.getContext("2d");
		if (Selected == "rot2" || Selected == "rot5" || Selected == "gelb7" || Selected == "lila3" || Selected == "lila9") {
			var img = document.getElementById("whitep_img");
		} else {
			var img = document.getElementById("whitec_img");
		}
		ctx.drawImage(img,10,10);
		var img = document.getElementById(diceValue + "_img");
		ctx.drawImage(img,10,10);
		document.getElementById(Selected + "_locked").style.zIndex = 2;
		Selected = "t";
	}
	for (var i = 0; i < arrFields.length; i++) {
		console.log(i);
	}
}

// Feld waehlen

function select (Feld) {
	if (Selected == "rot2" || Selected == "rot5" || Selected == "gelb7" || Selected == "lila3" || Selected == "lila9") {
	 	var c = document.getElementById(Selected);
		var ctx = c.getContext("2d");
	  	var img = document.getElementById("whitep_img");
	  	ctx.drawImage(img,10,10);
	} else if (Selected == "t") {
	  	var img = document.getElementById("transparent_img");
	} else {
	  	var img = document.getElementById("whitec_img");
	  	var c = document.getElementById(Selected);
	 	var ctx = c.getContext("2d");
	 	ctx.drawImage(img,10,10);
	}
	var FeldID = Feld.id;
	c = document.getElementById(FeldID);
	ctx = c.getContext("2d");
	if (FeldID == "rot2" || FeldID == "rot5" || FeldID == "gelb7" || FeldID == "lila3" || FeldID == "lila9") {
	 	img = document.getElementById("selectp_img");
	} else {
	  	img = document.getElementById("selectc_img");
	}
	ctx.drawImage(img,10,10);
	Selected = FeldID;
	
}

// Position

function setPosition () {
	if (Selected == "rot1") {
		position = 0;
	} else if (Selected == "rot2") {
		position = 1;
	} else if (Selected == "rot3") {
		position = 2;
	} else if (Selected == "rot4") {
		position = 3;
	} else if (Selected == "rot5") {
		position = 4;
	} else if (Selected == "rot6") {
		position = 5;
	} else if (Selected == "rot7") {
		position = 6;
	} else if (Selected == "rot8") {
		position = 7;
	} else if (Selected == "rot9") {
		position = 8;
	} else if (Selected == "gelb1") {
		position = 9;
	} else if (Selected == "gelb2") {
		position = 10;
	} else if (Selected == "gelb3") {
		position = 11;
	} else if (Selected == "gelb4") {
		position = 12;
	} else if (Selected == "gelb5") {
		position = 13;
	} else if (Selected == "gelb6") {
		position = 14;
	} else if (Selected == "gelb7") {
		position = 15;
	} else if (Selected == "gelb8") {
		position = 16;
	} else if (Selected == "gelb9") {
		position = 17;
	} else if (Selected == "lila1") {
		position = 18;
	} else if (Selected == "lila2") {
		position = 19;
	} else if (Selected == "lila3") {
		position = 20;
	} else if (Selected == "lila4") {
		position = 21;
	} else if (Selected == "lila5") {
		position = 22;
	} else if (Selected == "lila6") {
		position = 23;
	} else if (Selected == "lila7") {
		position = 24;
	} else if (Selected == "lila8") {
		position = 25;
	} else if (Selected == "lila9") {
		position = 26;
	}
}

// Feld setzen

function setField () {
	fieldSet = false;
	var row = true;
	if (0 <= position && position <= 8) {
		for (var i = 0; i <= 8; i++) {
			if (arrFields[i] >= diceValue && i < position) {
				alert("Die Zahl ist zu niedrig!");
				row = false;
				break;
			} else if (arrFields[i] != 0 && arrFields[i] <= diceValue && i > position) {
				alert("Die Zahl ist zu hoch!");
				row = false;
				break;
			}
		}
	} else if (9 <= position && position <= 17) {
		for (var i = 9; i <= 17; i++) {
			if (arrFields[i] >= diceValue && i < position) {
				alert("Die Zahl ist zu niedrig!");
				row = false;
				break;
			} else if (arrFields[i] != 0 && arrFields[i] <= diceValue && i > position) {
				alert("Die Zahl ist zu hoch!");
				row = false;
				break;
			}
		}
	} else if (18 <= position && position <= 26) {
		for (var i = 18; i <= 26; i++) {
			if (arrFields[i] >= diceValue && i < position) {
				alert("Die Zahl ist zu niedrig!");
				row = false;
				break;
			} else if (arrFields[i] != 0 && arrFields[i] <= diceValue && i > position) {
				alert("Die Zahl ist zu hoch!");
				row = false;
				break;
			}
		}
	}
	if (row == true) {
		if (position == 8 || position == 18) {									 							 //Spalten 1 und 12 / Felder 9 und 19
			arrFields[position] = diceValue;
			fieldSet = true;
		} else if (position == 9 || position == 7) {														 //Spalten 2 und 11 / Felder 8 und 10
			if (arrFields[position + 10] != diceValue) {
				arrFields[position] = diceValue;
				fieldSet = true;
			} else {
				alert("Zahl ist bereits in dieser Spalte vorhanden!");
			}
		} else if (position == 19 || position == 17) {														 //Spalten 2 und 11 / Felder 18 und 20
			if (arrFields[position - 10] != diceValue) {
				arrFields[position] = diceValue;
				fieldSet = true;
			} else {
				alert("Zahl ist bereits in dieser Spalte vorhanden!");
			}
		} else if (position == 0 || position == 1 || position == 4 || position == 5 || position == 6)	{	 //Spalten 3, 4, 8, 9, 10 / Felder 1, 2, 5, 6, 7
			if (arrFields[position + 10] != diceValue && arrFields[position + 20] != diceValue) {
				arrFields[position] = diceValue;
				fieldSet = true;
			} else {
				alert("Zahl ist bereits in dieser Spalte vorhanden!");
			}
		} else if (position == 10 || position == 11 || position == 14 || position == 15 || position == 16) { //Spalten 3, 4, 8, 9, 10 / Felder 11, 12, 15, 16, 17
			if (arrFields[position - 10] != diceValue && arrFields[position + 10] != diceValue) {
				arrFields[position] = diceValue;
				fieldSet = true;
			} else {
				alert("Zahl ist bereits in dieser Spalte vorhanden!");
			}
		} else if (position == 20 || position == 21 || position == 24 || position == 25 || position == 26) { //Spalten 3, 4, 8, 9, 10 / Felder 21, 22, 25, 26, 27
			if (arrFields[position - 10] != diceValue && arrFields[position - 20] != diceValue) {
				arrFields[position] = diceValue;
				fieldSet = true;
			} else {
				alert("Zahl ist bereits in dieser Spalte vorhanden!");
			}
		} else if (position == 2 || position == 13) {														 //Spalten 5 und 6 / Felder 3 und 14
			if (arrFields[position + 10] != diceValue) {
				arrFields[position] = diceValue;
				fieldSet = true;
			} else {
				alert("Zahl ist bereits in dieser Spalte vorhanden!");
			}
		} else if (position == 12 || position == 22) {														  //Spalten 5 und 6 / Felder 13 und 23
			if (arrFields[position - 10] != diceValue) {
				arrFields[position] = diceValue;
				fieldSet = true;
			} else {
				alert("Zahl ist bereits in dieser Spalte vorhanden!");
			}
		} else if (position == 3) {																			   //Spalte 7 / Feld 4
			if (arrFields[position + 20] != diceValue) {
				arrFields[position] = diceValue;
				fieldSet = true;
			} else {
				alert("Zahl ist bereits in dieser Spalte vorhanden!");
			}
		} else if (position == 23) {																			//Spalte 7 / Feld 24
			if (arrFields[position - 20] != diceValue) {
				arrFields[position] = diceValue;
				fieldSet = true;
			} else {
				alert("Zahl ist bereits in dieser Spalte vorhanden!");
			}
		}
	}
}

//		Array																	Felder
//           0   1   2   x   3   4   5   6   7   8									 1    2    3    x    4    5    6    7    8    9
//       9  10  11  12  13   x  14  15  16  17  							   10   11   12   13   14    x   15   16   17   18
//  18  19  20  21   x  22  23  24  25  26 								  19   20   21   22    x   23   24   25   26   27
//