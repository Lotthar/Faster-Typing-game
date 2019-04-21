// globalne promjenjive !!
var greska = new Audio("assets/errorSound.mp3");
var padanjeSpeed;
var pravljenjeRijeci;
var odbrojavanje;
var doKraja;
var rijecId;
var currentUser;
var currentUserResults = [];
var rijeci;
var vidjljiveRijeci = [];
var bojeRijeci = [
	"#22C626",
	"#007000",
	"#00A800",
	"#008A00",
	"#007300",
	"#00F000",
	"#00A800",
	"#348105",
	"#22C626",
	"#008A00",
	"#ACEE3E"
];
// efekat treperenja naslova
// -----------------------------------------------
setInterval(() => {
	let e = document.querySelector("header h1");
	e.classList.toggle("blink");
}, 1000);
// -----------------------------------------------
//Reload the page on logo
document.querySelector("header h1").addEventListener("click", () => {
	noviKorisnik();
	location.reload();
});
//Ucitavanje rijeci za igricu
function loadWords(callback) {
	let req = new XMLHttpRequest();
	let url = "../FasterTypingGame/assets/words.txt";
	req.open("GET", url, true);
	req.onreadystatechange = function() {
		if (this.status == 200 && this.readyState == 4) {
			callback(this.response);
		}
	};
	req.send();
}
loadWords(function(rez) {
	rijeci = rez.split("\n");
});
// -----------------------------------------------
//rezultat sa najvecim brojem bodova
function maxCurrentResult(nizRezultata) {
	let max = 0;
	for (let e of nizRezultata) {
		if (max < e) max = e;
	}
	return max;
}
// -----------------------------------------------
// slanje zahtjeva za unos novog korisnika

function noviKorisnik() {
	if (!currentUser) return;
	let rezultat = "" + maxCurrentResult(currentUserResults);
	let vrijeme = parseInt(document.querySelector("#vrijemeIgre").value) / 1000;
	vrijeme = "" + vrijeme + " sec";
	let req = new XMLHttpRequest();
	let url =
		"../FasterTypingGame/php/api.php?method=newPlayer&naziv=" +
		currentUser +
		"&rezultat=" +
		rezultat +
		"&vrijeme=" +
		vrijeme;
	req.open("POST", url, true);
	req.send();
	currentUserResults = [];
}
// -----------------------------------------------
// kreiranje blank panela nakon unosa korisnika
function blankPanel() {
	let gamePanel = document.querySelector(".game-panel");
	let controlPanel = document.querySelector("#controlPanel");
	gamePanel.innerHTML = "";
	gamePanel.style.height = "66vh";
	gamePanel.style.backgroundColor = "black";
	controlPanel.classList.remove("hidden");
	controlPanel.classList.add("control-panel");
}
// -----------------------------------------------
// *****************NOVA IGRA ********************
// Nije unijet korisnik
function alertModal() {
	let alertModalContainer = document.querySelector("#alertModalContainer");
	alertModalContainer.classList.remove("hidden");
	alertModalContainer.classList.add("modal-container");
}
// kreiranje panela za igru nakon klika na novu igru
document.querySelector("#novaIgra").addEventListener("click", () => {
	let nazivIgraca = document.querySelector(".user-data input").value;
	currentUser = nazivIgraca;
	if (!nazivIgraca) {
		alertModal(); //zamijeniti modalom
		return;
	}
	blankPanel();
	padajuceRijeci();
});
// -----------------------------------------------
// funkcija za padajuce rijeci
function padajuceRijeci() {
	let gamePanel = document.querySelector(".game-panel");
	gamePanel.innerHTML = "";
	gamePanel.style.backgroundColor = "black";
	let wordContainer = document.createElement("div");
	wordContainer.classList.add("word-container");
	gamePanel.appendChild(wordContainer);
	doKraja = document.querySelector("#vrijemeIgre").value;
	doKraja = parseInt(doKraja) / 1000;
	let odabranaBrzina = document.querySelector("#brzinaPad").value;
	rijecId = 1;
	padanjeSpeed = 600;
	odbrojavanje = setInterval(tajming, 1000);
	pravljenjeRijeci = setInterval(() => {
		let novaRijec = document.createElement("div");
		novaRijec.classList.add("word");
		novaRijec.classList.add("word-animation");
		switch (odabranaBrzina) {
			case "12":
				novaRijec.classList.add("sec12");
				break;
			case "9":
				novaRijec.classList.add("sec9");
				break;
			case "6":
				novaRijec.classList.add("sec6");
				break;
			case "3":
				novaRijec.classList.add("sec3");
				break;
			default:
				novaRijec.classList.add("sec12");
				break;
		}
		novaRijec.setAttribute("id", rijecId++);
		novaRijec.addEventListener("animationend", rijecRemove, false);
		let sirinaContainer = gamePanel.offsetWidth - 80;
		let dostupnaSirina = Math.abs(Math.round(Math.random() * sirinaContainer));
		let indexRijec = Math.round(Math.random() * 1000);
		let indexBoja = Math.round(Math.random() * 8);
		let boja = bojeRijeci[indexBoja];
		novaRijec.style.color = boja; //boja rijeci je random rijec iz niza
		let rijecTekst = rijeci[indexRijec]; //tekst je random tekst iz niza
		vidjljiveRijeci.push(novaRijec); //pamtimo koje su rijeci trenutno vidljive
		novaRijec.innerHTML = rijecTekst; //stavljamo tekst rijeci
		novaRijec.style.left = dostupnaSirina + "px"; //polozaj rijeci na ekranu
		wordContainer.appendChild(novaRijec);
	}, 600);
}
// --------------------------------------------------------------
// f-ja za brisanje vidljivih rijeci kada dodju do kraja ekrana
function rijecRemove(event) {
	let elem = document.getElementById(event.target.id);
	try {
		elem.parentNode.removeChild(elem);
		let indeksVidljiv = vidjljiveRijeci.indexOf(elem);
		vidjljiveRijeci.splice(indeksVidljiv, 1);
	} catch {
		greska.play();
	}
}
// --------------------------------------------------------------
//*************** */tajmer za odbrojavanje partije***********
function tajming() {
	let tajmer = document.querySelector("#vrijeme");
	if (doKraja == 0) {
		clearInterval(pravljenjeRijeci);
		clearInterval(odbrojavanje);
		tajmer.innerHTML =
			parseInt(document.querySelector("#vrijemeIgre").value) / 1000;
		tajmer.style.color = "#77c977";
		// pozvati f-ju nakon kraja igre da vrati modal koji ce
		// bude tabela rezultata sa iz baze
		document.querySelector(".game-panel").innerHTML = "";
		//da se prvo ucitaju u listu pa da se tek onda izabere
		let newRezultat = document.querySelector("#rezultat").textContent;
		currentUserResults.push(parseInt(newRezultat));
		document.querySelector("#currentBestScore").textContent = maxCurrentResult(
			currentUserResults
		);
	} else {
		if (doKraja <= 5) {
			tajmer.style.color = "red";
		}
		tajmer.innerHTML = doKraja;
		doKraja--;
	}
}
// --------------------------------------------------------------
// f-ja za restartovanje partije
function restartGame() {
	clearInterval(odbrojavanje);
	clearInterval(pravljenjeRijeci);
	vidjljiveRijeci = [];
	document.querySelector("#vrijeme").style.color = "#77c977";
	document.querySelector("#rezultat").textContent = "0";
	padajuceRijeci();
}
//dugme za restart partije
document.querySelector(".btn-restart").addEventListener("click", restartGame);
//restartovanje partije na promjenu vrijednosti brzine i trajanja partije
document.querySelector("#brzinaPad").addEventListener("change", restartGame);
document.querySelector("#vrijemeIgre").addEventListener("change", restartGame);
// --------------------------------------------------------------
// ----------** racunanje rezultata **---------------------------
document.querySelector("#unos").addEventListener("keypress", event => {
	if (event.keyCode === 13) {
		let unos = document.querySelector("#unos");
		let ispravanUnos = 0;
		let uneseniTekst = unos.value;
		let nizRijec;
		for (let indeks = 0; indeks < vidjljiveRijeci.length; indeks++) {
			nizRijec = vidjljiveRijeci[indeks];
			try {
				if (
					nizRijec.textContent.trim().toLowerCase() ==
					uneseniTekst.trim().toLowerCase()
				) {
					ispravanUnos = 1;
					let elem = document.getElementById(nizRijec.id);
					elem.classList.add("score-effect");
					elem.style.color = "yellow";
					setTimeout(() => {
						elem.parentNode.removeChild(elem);
					}, 200);
					padanjeSpeed += 50 + nizRijec.textContent.length;
					// elem.parentNode.removeChild(elem);
					vidjljiveRijeci.splice(indeks, 1);
					updateRezultat(uneseniTekst);
				}
			} catch {}
		}
		if (ispravanUnos === 0) greska.play();
		unos.value = "";
	}
});
// Azuriranje rezultata ako smo dobro ukucali rijec
function updateRezultat(uneseniTekst) {
	let rezultatContainer = document.querySelector("#rezultat");
	let rezultat = parseInt(rezultatContainer.textContent);
	rezultat += uneseniTekst.length;
	rezultatContainer.textContent = rezultat;
}
// --------------------------------------------------------------
// Cuvanje rezultata i stampanje

// **********MODAL TABELA************************
function najboljiRezultati() {
	let scoreModalContainer = document.querySelector("#scoreModalContainer");
	scoreModalContainer.classList.remove("hidden");
	scoreModalContainer.classList.add("modal-container");
}
// otvaranje modala
document.querySelector("#tabelaRezultata").addEventListener("click", () => {
	najboljiRezultati();
});
// uklanjanje modala na klik
document.querySelector("#scoreModalContainer").addEventListener("click", () => {
	let scoreModalContainer = document.querySelector("#scoreModalContainer");
	scoreModalContainer.classList.remove("modal-container");
	scoreModalContainer.classList.add("hidden");
});
document.querySelector("#alertModalContainer").addEventListener("click", () => {
	let alertModalContainer = document.querySelector("#alertModalContainer");
	alertModalContainer.classList.remove("modal-container");
	alertModalContainer.classList.add("hidden");
});
// Ucitavanje podtaka u tabelu Modal
//dovlaci asinhrono sve najbolje rezultate
function sviNajboljiRez(callback) {
	let zahtjev = new XMLHttpRequest();
	let url = "../FasterTypingGame/php/api.php?method=bestScores";
	zahtjev.open("GET", url, true);
	zahtjev.onreadystatechange = function() {
		if (this.status == 200 && this.readyState == 4) {
			callback(JSON.parse(this.responseText));
		}
	};
	zahtjev.send();
}
// Ucitava modale nakon dom-loada
document.addEventListener(
	"DOMContentLoaded",
	() => {
		sviNajboljiRez(function(bestScores) {
			let playerNames = document.querySelector(".player-names");
			let playerScores = document.querySelector(".player-score");
			let playerSpeed = document.querySelector(".player-speed");
			for (let player of bestScores) {
				//dodaje ime igraca
				let ime = document.createElement("h3");
				ime.textContent = player.ime;
				playerNames.appendChild(ime);

				//dodaje rezultat igraca
				let rezultat = document.createElement("h3");
				rezultat.textContent = player.rezultat;
				playerScores.appendChild(rezultat);

				// dodaje vrijeme igranja
				let vrijeme = document.createElement("h3");
				vrijeme.textContent = player.vrijeme;
				playerSpeed.appendChild(vrijeme);
			}
		});
	},
	false
);
