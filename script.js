var index = 0;
var style = document.createElement("style");
style.innerHTML = ".people6{display:none}";
var players = getParamIfAvailabe("players", false)
	? getParamIfAvailabe("players", false)
	: JSON.parse(getParamIfAvailabe("playersJSON", true));
var team = getParamIfAvailabe("teamsJSON", false);
var step = 0;

if ((players.length - 2) * (players.length - 6) <= 0 && !team) {
	//find step -- step is 0-based!
	step = getParamIfAvailabe("step", false)
		? getParamIfAvailabe("step", false)
		: 0;
}

Object.values(document.getElementById("forms").children).forEach(function (
	element,
) {
	//add basic classes based on step
	if (index == step) {
		element.className += " current";
	}

	if (index < step) {
		element.className += " past";
	}

	if (index < step + 1) {
		element.className += " enabled";
	} else {
		element.className += " disabled";
	}

	++index;
});

Object.values(document.getElementsByClassName("disabled")).forEach(function (
	elements,
) {
	//add attribute to input elements
	Object.values(elements.getElementsByTagName("input")).forEach(function (
		element,
	) {
		element.setAttribute("disabled", "");
	});
});

switch (
	step //main actions for each case
) {
	case 1: //try to auto-set teams; passes player names to step 2
		players.forEach(function (player, index, array) {
			//remove undefined players
			if (player == "" || player == undefined || player == null) {
				array.splice(index, 1);
			}
		});

		switch (players.length) {
			case 2:
			case 3:
			case 5:
				//location.href = "first_scores.html?step=3&teams=" + JSON.stringify(players);
				alert("h");
				break;
			case 4:
				break;
			case 6:
				style.innerHTML = ".people4{display:none}";
				break;
			default:
				alert("An error occured.");
				location.href = "players.html";
				break;
		}

		document
			.getElementById("players")
			.setAttribute("value", JSON.stringify(players)); //passes player names to step 2

		break;
	case 2: //add player names and classes to drag-and-drop blocks
		Object.values(
			document
				.getElementById("dragForm")
				.getElementsByClassName("draggable"),
		).forEach(function (element) {
			element.setAttribute("draggable", "true"); //allow drag
			element.setAttribute("ondragstart", "drag(event)"); //sets the data being transferred
		});

		Object.values(
			document
				.getElementById("dragForm")
				.getElementsByClassName("dropTarget"),
		).forEach(function (element) {
			element.setAttribute("ondrop", "drop(event)"); //moves data to drop location
			element.setAttribute("ondragover", "allowDrop(event)"); //allow drop
		});

	//ADD following what's specified in s2
}

switch (
	step //actions that apply to multiple cases
) {
	case 2:
	case 3:
		//ADD filling in drag-drop blocks & input blocks automatically
		break;
}

document.head.appendChild(style);

function allowDrop(element) {
	//allow drop
	element.preventDefault();
}

function drag(element) {
	//sets data being transferred
	element.dataTransfer.setData("text", element.target.id);
}

function drop(element) {
	//drop
	element.preventDefault(); //allow drop
	var target = element.target.getAttribute("draggable")
		? element.target.parentElement
		: element.target; //prevent dropping in <p></p>; force dripping in <div></div>
	target.appendChild(
		document.getElementById(element.dataTransfer.getData("text")),
	); //drop
}

function getParamIfAvailabe(param, s) {
	if (new URLSearchParams(location.search).has(param)) {
		return s
			? new URLSearchParams(location.search).get(param)
			: new URLSearchParams(location.search).getAll(param);
	}
}
