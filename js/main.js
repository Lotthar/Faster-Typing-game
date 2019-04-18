// globalne promjenjive !!
var pravljenjeRijeci;
var cistiPreskoceno;
var odbrojavanje;
var doKraja;
var rijecId;
var currentUser;
var rijeci;
var vidjljiveRijeci = [];
var bojeRijeci = [
	"#22C626",
	"#007000",
	"#2B2B2B",
	"#2B2B2B",
	"#007300",
	"#00F000",
	"#00A800",
	"#348105",
	"#22C626"
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
// -----------------------------------------------
// slanje zahtjeva za unos novog korisnika
function noviKorisnik(naziv) {
	let req = new XMLHttpRequest();
	let url = "../FasterTypingGame/php/api.php?method=newPlayer&naziv=" + naziv;
	req.open("POST", url, true);
	req.onreadystatechange = function() {
		if (this.status == 200 && this.readyState == 4) {
			console.log("Uspjesno dodat korisnik!");
		}
	};
	req.send();
}
// -----------------------------------------------
// kreiranje blank panela nakon unosa korisnika
function blankPanel(nazivIgraca) {
	let gamePanel = document.querySelector(".user-data");
	let controlPanel = document.querySelector("#controlPanel");
	gamePanel.innerHTML = "";
	gamePanel.style.backgroundColor = "black";
	controlPanel.classList.remove("hidden");
	controlPanel.classList.add("control-panel");
	noviKorisnik(nazivIgraca);
	loadWords(function(rez) {
		rijeci = rez.split("\n");
	});
}
// -----------------------------------------------
// *****************NOVA IGRA ********************
// kreiranje panela za igru nakon klika na novu igru
document.querySelector("#novaIgra").addEventListener("click", () => {
	let nazivIgraca = document.querySelector(".user-data input").value;
	currentUser = nazivIgraca;
	if (!nazivIgraca) {
		alert("Niste unijeli ime igraca!"); //zamijeniti modalom
		location.reload();
	}
	blankPanel(currentUser);
	padajuceRijeci();
});
// -----------------------------------------------
// funkcija za padajuce rijeci
function padajuceRijeci() {
	let gamePanel = document.querySelector(".game-panel");
	gamePanel.innerHTML = "";
	let wordContainer = document.createElement("div");
	wordContainer.classList.add("word-container");
	gamePanel.appendChild(wordContainer);
	doKraja = document.querySelector("#vrijemeIgre").value;
	let odabranaBrzina = document.querySelector("#brzinaPad").value;
	let tajmer = document.querySelector("#vrijemeIgre");
	tajmer.innerHTML = parseInt(doKraja / 1000);
	rijecId = 1;
	odbrojavanje = setInterval(tajming, 1000);
	setTimeout(rijecRemove, odabranaBrzina * 1000);
	pravljenjeRijeci = setInterval(() => {
		let novaRijec = document.createElement("div");
		novaRijec.classList.add("word");
		novaRijec.classList.add("word-animation");
		novaRijec.classList.add("sec12");
		novaRijec.setAttribute("id", rijecId++);
		let sirinaContainer = gamePanel.offsetWidth - 60;
		let dostupnaSirina = Math.abs(Math.round(Math.random() * sirinaContainer));
		let indexRijec = Math.round(Math.random() * 1000);
		let indexBoja = Math.round(Math.random() * 8);
		let boja = bojeRijeci[indexBoja];
		novaRijec.style.color = boja;
		let rijecTekst = rijeci[indexRijec];
		vidjljiveRijeci.push(rijecTekst); //pamtimo koje su rijeci trenutno vidljive
		novaRijec.innerHTML = rijecTekst;
		novaRijec.style.left = dostupnaSirina + "px";
		wordContainer.appendChild(novaRijec);
		// console.log(wordContainer.childNodes);
	}, 3000);
}

// f-ja za brisanje vidljivih rijeci kada dodju do kraja ekrana
function rijecRemove() {
	cistiPreskoceno = setInterval(() => {
		let wordContainer = document.querySelectorAll(".word-container *");
		let containerRemove = document.querySelector(".word-container");
		for (let word of wordContainer) {
			console.log(parseInt(word.id) == rijecId);
		}
	}, 3000);
}
//tajmer za odbrojavanje partije
function tajming() {
	let tajmer = document.querySelector("#vrijemeIgre");
	doKraja = parseInt(doKraja) / 1000;
	console.log(doKraja);
	if (doKraja == 0) {
		clearInterval(odbrojavanje);
		clearInterval(pravljenjeRijeci);
		clearInterval(cistiPreskoceno);
		tajmer.innerHTML = "";
		document.querySelector(".game-panel").innerHTML = "";
	} else {
		tajmer.innerHTML = doKraja;
		doKraja--;
		console.log(doKraja);
	}
}
