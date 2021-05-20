var startButtons = document.getElementsByClassName("start");
var startPage = document.getElementById("startPage");
var currPlayerName = document.getElementById("currPlayerName");
var secretNumber = (
	Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000
).toString();
var theme = document.getElementsByClassName("select");
theme[0].addEventListener("click", function () {
	console.log("selected");
	document.documentElement.style.setProperty(
		"--themeWallpaper",
		"url(./images/basic.jpg)"
	);
});
theme[1].addEventListener("click", function () {
	console.log("selected");
	document.documentElement.style.setProperty(
		"--themeWallpaper",
		"url(./images/scotland.jpg)"
	);
});
theme[2].addEventListener("click", function () {
	console.log("selected");
	document.documentElement.style.setProperty(
		"--themeWallpaper",
		"url(./images/nfs.jpg)"
	);
});
theme[3].addEventListener("click", function () {
	console.log("selected");
	document.documentElement.style.setProperty(
		"--themeWallpaper",
		"url(./images/mountains.jpg)"
	);
});
theme[4].addEventListener("click", function () {
	console.log("selected");
	document.documentElement.style.setProperty(
		"--themeWallpaper",
		"url(./images/space.jpg)"
	);
});
theme[5].addEventListener("click", function () {
	console.log("selected");
	document.documentElement.style.setProperty(
		"--themeWallpaper",
		"url(./images/magic.jpg)"
	);
});
theme[6].addEventListener("click", function () {
	console.log("selected");
	document.documentElement.style.setProperty(
		"--themeWallpaper",
		"url(./images/fantasy.jpg)"
	);
});
theme[7].addEventListener("click", function () {
	console.log("selected");
	document.documentElement.style.setProperty(
		"--themeWallpaper",
		"url(./images/dolphins.jpg)"
	);
});
theme[8].addEventListener("click", function () {
	console.log("selected");
	document.documentElement.style.setProperty(
		"--themeWallpaper",
		"url(./images/dino.jpg)"
	);
});
theme[9].addEventListener("click", function () {
	console.log("selected");
	document.documentElement.style.setProperty(
		"--themeWallpaper",
		"url(./images/city.jpeg)"
	);
});

var a = 10;
console.log(secretNumber);
Array.from(startButtons).forEach((mB) => {
	mB.addEventListener("click", print);
});
var matches = 1;

function setCurrPlayerNameAndIcon() {
	console.log(currPlayerName.value);
	if (currPlayerName.value != "") {
		// setting the name

		var playerName = document.getElementsByClassName("playerName");
		// for(i in playerName){
		//     playerName[0].innerText = currPlayerName.value;
		//     playerName[1].innerText = currPlayerName.value;
		// }
		for (var i = 0; i < 2; i++) {
			playerName[i].innerText = currPlayerName.value;
		}
		// setting the icon
		document.getElementsByClassName("profileIcon")[0].innerText =
			currPlayerName.value.charAt(0);
	}
}

function print(event) {
	var id = event.target.id;
	console.log(id);
	if (id == "singleMatch") {
		startButtons[1].style.opacity = 0.5;
		startButtons[0].style.opacity = 1;
		matches = 1;
	} else if (id == "tournament") {
		startButtons[0].style.opacity = 0.5;
		startButtons[1].style.opacity = 1;
		matches = 3;
	} else {
		startPage.style.animation = "bottomtotop 1.5s ease-in-out";
		setTimeout(function () {
			startPage.style.width = 0;
			startPage.style.height = 0;
		}, 1500);
	}
	setCurrPlayerNameAndIcon();
}

var themePage = document.getElementById("changeButton");
themePage.addEventListener("click", function () {
	console.log("ase");
	startPage1.style.animation = "toptobottom 1.5s ease-in-out";
	setTimeout(function () {
		// startPage1.style.width = 100+'vw';
		startPage1.style.height = 100 + "vh";
	}, 1500);
});
var startPage1 = document.getElementById("themePage");
document.getElementById("startMatch1").addEventListener("click", function () {
	console.log("asd");
	startPage1.style.animation = "bottomtotop 1.5s ease-in-out";
	setTimeout(function () {
		startPage1.style.height = 0;
	}, 1500);
});

var mainButtons = document.getElementsByClassName("main");
Array.from(mainButtons).forEach((mB) => {
	mB.addEventListener("click", print1);
});

document.addEventListener("keydown", function (event) {
	if (event.keyCode == 13) {
		mainButtons[0].click();
	}
});
var i = 0;
function print1(event) {
	var which = event.target.id;
	var currNumber = document.getElementById("number");

	if (which == "enter") {
		currNumber.onblur = "this.focus()";
		if (currNumber.value > 999 && currNumber.value <= 9999) {
			var number = currNumber.value.toString();
			numberProcessing(number);
			currNumber.value = "";
		}
	} else if (which == "endMatch") {
		matchEnd();
	} else {
		console.log("pressed with force");
		hint(currNumber, i);
		i++;
	}
}
var player = {
	name: currPlayerName.value,
	totalMatchs: 0,
	matchWon: 0,
	matchLost: 0,
	matchDraw: 0,
	totalAttempt: 0,
	bestScorre: 1000,
	current: {
		currAttemptNumber: 0,
		bestAttempt: 0,
		bestGuess: "",
		lastAttempt: 0,
		lastGuess: "",
		bestBulls: 0,
		bestCows: 0,
	},
};
function numberProcessing(number) {
	var bulls = 0;
	var cows = 0;
	var numberCopy = number;
	var secretNumberCopy = secretNumber;
	for (let i = 0; i < number.length; i++) {
		if (secretNumberCopy.charAt(i) == number.charAt(i)) {
			number = number.replace(number.charAt(i), "");
			secretNumberCopy = secretNumberCopy.replace(
				secretNumberCopy.charAt(i),
				""
			);
			bulls = bulls + 1;
			console.log(i + " " + number + " " + secretNumberCopy);
			i--;
		}
	}
	if (bulls != 4) {
		for (let i = 0; i < number.length; i++) {
			for (let j = 0; j < secretNumberCopy.length; j++) {
				if (number.charAt(j) == secretNumberCopy.charAt(i) && i != j) {
					secretNumberCopy = secretNumberCopy.replace(
						secretNumberCopy.charAt(j),
						"a"
					);
					cows++;
					break;
				}
			}
		}
	}

	player.current.currAttemptNumber++;
	if (bulls > player.current.bestBulls) {
		player.current.bestBulls = bulls;
		player.current.bestCows = cows;
		player.current.bestAttempt = numberCopy;
		player.current.bestGuess = bulls + "B|" + cows + "C";
	} else if (
		bulls == player.current.bestBulls &&
		cows > player.current.bestCows
	) {
		player.current.bestCows = cows;
		player.current.bestAttempt = numberCopy;
		player.current.bestGuess = bulls + "B" + cows + "C";
	}
	player.current.lastAttempt = numberCopy;
	player.current.lastGuess = bulls + "B|" + cows + "C";

	updateInfo();
	updateHistory();
	if (bulls == 4) {
		console.log(bulls + " bulls " + cows + " cows");
		console.log("acd");
		matchEnd();
	}
}

function updateInfo() {
	var toUpdate = document
		.getElementById("dataContainer")
		.getElementsByClassName("value");
	toUpdate[1].innerText = player.current.currAttemptNumber;
	toUpdate[2].innerText = player.current.bestAttempt;
	toUpdate[3].innerText = player.current.bestGuess;
	toUpdate[4].innerText = player.current.lastAttempt;
	toUpdate[5].innerText = player.current.lastGuess;
}

function updateHistory() {
	var toUpdateNumber = document
		.getElementById("historyContainer")
		.getElementsByClassName("type");
	var toAddLightEffect = document
		.getElementById("historyContainer")
		.getElementsByClassName("line");
	var toUpdateScore = document
		.getElementById("historyContainer")
		.getElementsByClassName("value");
	for (var i = 0; i < 12; i++) {
		toUpdateNumber[i].innerText = toUpdateNumber[i + 1].innerText;
	}
	for (var i = 0; i < 12; i++) {
		toUpdateScore[i].innerText = toUpdateScore[i + 1].innerText;
	}
	toUpdateNumber[12].innerText = player.current.lastAttempt;
	toUpdateScore[12].innerText = player.current.lastGuess;

	toAddLightEffect[12].scrollIntoView();
	toAddLightEffect[12].style.animation = "light 2s ease-in-out";
}

function matchEnd() {
	i = 0;
	var matchEndPage = document.getElementById("matchOver");
	var matchResult = document.getElementById("matchResult");
	var bulls = player.current.bestBulls;
	var cows = player.current.bestCows;
	console.log(bulls + " " + cows);
	player.totalAttempt =
		player.totalAttempt + player.current.currAttemptNumber;
	player.totalMatchs++;
	player.current.bestBulls = 0;
	player.current.bestCows = 0;
	if (player.current.currAttemptNumber < player.bestScorre) {
		player.bestScorre = player.current.currAttemptNumber;
	}
	if (bulls == 4) {
		player.matchWon++;
		matchResult.innerText =
			"Congratulations " +
			currPlayerName.value +
			" You Won " +
			" In Just " +
			player.current.currAttemptNumber +
			" Attempts";
	} else {
		player.matchDraw++;
		matchResult.innerText =
			currPlayerName.value +
			" Final Score is " +
			bulls +
			" Bulls and " +
			cows +
			" Cows";
	}
	updatePlayerInfo();
	matchEndPage.style.animation = "toptobottom 1.5s ease-in-out";
	setTimeout(function () {
		matchEndPage.style.height = "100vh";
	}, 1500);
	a = 10;
	ifTournament(matches, a);
}

function updatePlayerInfo() {
	var statics = document
		.getElementById("statics")
		.getElementsByClassName("value");
	statics[0].innerText = player.totalMatchs;
	statics[1].innerText = player.matchWon;
	statics[2].innerText = player.matchLost;
	statics[3].innerText = player.matchDraw;
	statics[4].innerText = player.totalAttempt;
	statics[5].innerText = player.bestScorre;
}

function hint(currNumber, i) {
	console.log("responed");
	var hintTillNow = secretNumber.substring(0, i + 1);
	currNumber.value = hintTillNow;
}
var automaticMatchStart;
var abc;
function ifTournament(matches, a) {
	if (a != 10) {
		clearInterval(abc);
	}
	a = 10;
	console.log("entered", matches);
	if (matches > 1) {
		automaticMatchStart = document.getElementById("forTournament");
		abc = setInterval(counter, 1000, automaticMatchStart);
	}
}

function counter(automaticMatchStart) {
	automaticMatchStart.innerText = "Starting New Match In " + a + " Seconds";
	if (a < 1) {
		clearInterval(abc);
		newMatchStarted();
		return;
	}
	a--;
}

var startNewMatch = document.getElementById("startNewMatch");
startNewMatch.addEventListener("click", newMatchStarted);
function newMatchStarted() {
	clearInterval(abc);
	player.current.currAttemptNumber = 0;
	player.current.bestAttempt = "0000";
	player.current.bestGuess = "0B|0C";
	player.current.lastAttempt = "0000";
	player.current.lastGuess = "0B|0C";
	player.current.bestBulls = 0;
	player.current.bestCows = 0;
	updateInfo();
	// for hint
	var i = 0;
	secretNumber = (
		Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000
	).toString();
	var toUpdateNumber = document
		.getElementById("historyContainer")
		.getElementsByClassName("type");
	var toUpdateScore = document
		.getElementById("historyContainer")
		.getElementsByClassName("value");
	for (var i = 0; i < 13; i++) {
		toUpdateNumber[i].innerText = "0000";
	}
	for (var i = 0; i < 13; i++) {
		toUpdateScore[i].innerText = "0B|0C";
	}
	var matchEndPage = document.getElementById("matchOver");

	matchEndPage.style.animation = "bottomtotop 1.5s ease-in-out";
	setTimeout(function () {
		matchEndPage.style.width = 0;
		matchEndPage.style.height = 0;
	}, 1500);
}
