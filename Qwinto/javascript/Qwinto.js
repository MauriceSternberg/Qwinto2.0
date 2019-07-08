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
var Selected = "rot1";
var FeldID;
var xImg = "/Qwinto/images/x.png";
var iImg = "/Qwinto/images/i.png";
var Img1 = "/Qwinto/images/1.png";
var Img2 = "/Qwinto/images/2.png";
var Img3 = "/Qwinto/images/3.png";
var Img4 = "/Qwinto/images/4.png";
var Img5 = "/Qwinto/images/5.png";
var Img6 = "/Qwinto/images/6.png";
var Img7 = "/Qwinto/images/7.png";
var Img8 = "/Qwinto/images/8.png";
var Img9 = "/Qwinto/images/9.png";
var Img10 = "/Qwinto/images/10.png";
var Img11 = "/Qwinto/images/11.png";
var Img12 = "/Qwinto/images/12.png";
var Img13 = "/Qwinto/images/13.png";
var Img14 = "/Qwinto/images/14.png";
var Img15 = "/Qwinto/images/15.png";
var Img16 = "/Qwinto/images/16.png";
var Img17 = "/Qwinto/images/17.png";
var Img18 = "/Qwinto/images/18.png";

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

// Feld initialisieren             TO DO!
window.onload = initFields;

function initFields () {
	var parent = document.getElementById ("spielfeld");
	
	for (var i = 0; i < 41; i++) {
		var img = document.createElement ("img");
	}
}

function draw_spielfeld() {
//Hintergrund
	var c = document.getElementById("spielfeld_bg");
	var ctx = c.getContext("2d");
	var img = document.getElementById("spielfeld_img");
	ctx.drawImage(img,10,10);
	//Roter Würfel
	var w1 = document.getElementById("wuerfel_rot");
	var wtx1 = w1.getContext("2d");
	var img1 = document.getElementById("wuerfel1_img");
	wtx1.drawImage(img1,10,10);
	//Gelber Würfel
	var w2 = document.getElementById("wuerfel_gelb");
	var wtx2 = w2.getContext("2d");
	var img2 = document.getElementById("wuerfel2_img");
	wtx2.drawImage(img2,10,10);
	//Lila Würfel
	var w3 = document.getElementById("wuerfel_lila");
	var wtx3 = w3.getContext("2d");
	var img3 = document.getElementById("wuerfel3_img");
	wtx3.drawImage(img3,10,10);
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
 //Nur beim ersten und zweiten Versuch wird das Skript ausgeführt
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
			  
		//Pop-Up für Wurf
		if (wurf_count == 0){
			var msg;
			var wurfbox = confirm("Rot: " + Dice1Value + "\r\nGelb: " + Dice2Value + "\r\nLila: " + Dice3Value + "\r\nGesamt: " + diceValue);
			//Erster Wurf bestätigt
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
			  
		//Pop-Up wenn bereits gewürfelt wurde oder Zweitversuch stattgefunden hat  
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
			var c = document.getElementById("wuerfel_rot");
			var ctx = c.getContext("2d");
			var img = document.getElementById("grau_img");
		  	ctx.drawImage(img,10,10);
		} else if (Dice1 == false) {
			Dice1 = true;
			var c = document.getElementById("wuerfel_rot");
			var ctx = c.getContext("2d");
			var img = document.getElementById("rot_img");
		  	ctx.drawImage(img,10,10);
		}
	} else if (DiceID == "wuerfel_gelb") {
		if (Dice2 == true) {
			Dice2 = false;
			Dice2Value = 0;
			var c = document.getElementById("wuerfel_gelb");
			var ctx = c.getContext("2d");
			var img = document.getElementById("grau_img");
			ctx.drawImage(img,10,10);
		} else if (Dice2 == false) {
			Dice2 = true;
			var c = document.getElementById("wuerfel_gelb");
			var ctx = c.getContext("2d");
			var img = document.getElementById("gelb_img");
		  	ctx.drawImage(img,10,10);
		}
	} else if (DiceID == "wuerfel_lila") {
		if (Dice3 == true) {
			Dice3 = false;
			Dice3Value = 0;
			var c = document.getElementById("wuerfel_lila");
			var ctx = c.getContext("2d");
			var img = document.getElementById("grau_img");
		  	ctx.drawImage(img,10,10);
		} else if (Dice3 == false) {
			Dice3 = true;
			var c = document.getElementById("wuerfel_lila");
			var ctx = c.getContext("2d");
			var img = document.getElementById("lila_img");
			ctx.drawImage(img,10,10);
		}
	}
}

// Eingabe Bestaetigen

function confirmInput () {
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
	Selected = "t";
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

// Feld setzen

function setField (x, y) {
	sentFields [x] = y;
}

// Bild/Zahl

function getImg (x) {
	if ( x == -1) {
		return xImg;
	} else if (x == 1) {
		return Img1;
	} else if (x == 2) {
		return Img2;
	} else if (x == 3) {
		return Img3;
	} else if (x == 4) {
		return Img4;
	} else if (x == 5) {
		return Img5;
	} else if (x == 6) {
		return Img6;
	} else if (x == 7) {
		return Img7;
	} else if (x == 8) {
		return Img8;
	} else if (x == 9) {
		return Img9;
	} else if (x == 10) {
		return Img10;
	} else if (x == 11) {
		return Img11;
	} else if (x == 12) {
		return Img12;
	} else if (x == 13) {
		return Img13;
	} else if (x == 14) {
		return Img14;
	} else if (x == 15) {
		return Img15;
	} else if (x == 16) {
		return Img16;
	} else if (x == 17) {
		return Img17;
	} else if (x == 18) {
		return Img18;
	}
}
