// Variables

let colorPicker = document.querySelector("#colorPicker");
let backgroundSetter = document.querySelector("#backgroundSetter")

let sizeSlider = document.querySelector("#sizeSlider");
let sizeText = document.querySelector("#sizeText");
let sizeValue;

let grid = document.querySelector("#grid");
let cell = document.querySelectorAll(".cell");

let clearBtn = document.querySelector("#clearBtn");
let eraserBtn = document.querySelector("#eraserBtn");
let bordersBtn = document.querySelector("#bordersBtn");

let eraser = false;
let borders = true;

let div;
let backgroundColor = "inherit";


// Functions 

function addCells() {
	for (i=1; i<=sizeValue*sizeValue; i++) {
		div = document.createElement("div");
		div.classList.add("cell");
		grid.appendChild(div);
	}
}

function updateSliderInfo() {
	sizeText.textContent = `${sizeSlider.value} x ${sizeSlider.value}`;
	sizeValue = parseInt(sizeSlider.value);
}

function resetGrid() {
	grid.innerHTML = "";
	addCells();
}

function updateGrid() {
	cell = document.querySelectorAll(".cell");

	cell.forEach(element => {
		if (borders==false) {
			element.style.cssText += `
			width: calc(100% / ${sizeValue});
			height: calc(100% / ${sizeValue});
			border:none`;
		}

		else if (borders==true) {
			element.style.cssText += `
			width: calc(100% / ${sizeValue} - 1px);
			height: calc(100% / ${sizeValue} - 1px);
			border-top: white solid 1px;
			border-left: white solid 1px;`;
		}

		element.onmouseover = () => {
			if (eraser == false) {
				element.style.background = colorPicker.value;
			}
			else if (eraser == true) {
				element.style.background = backgroundColor;
			}
		}
	})
}

function updateBackground() {
	cell = document.querySelectorAll(".cell");

	cell.forEach(element => {
		element.style.cssText += `
		background:${backgroundColor};`;
	})
}

function clearGrid() {
	cell.forEach(element => {
		element.style.background = backgroundColor;
	})
}


// Initial Value

updateSliderInfo();
resetGrid();
updateGrid();


// Events

sizeSlider.oninput = () => {
	updateSliderInfo();
	resetGrid();
	updateGrid();
	updateBackground();
}

backgroundSetter.onclick = () => {
	backgroundColor = colorPicker.value;
	updateGrid();
	updateBackground();
}

bordersBtn.onclick = () => {
	if (borders==true) {
		borders = false;
		bordersBtn.classList.add("inactive");
		updateGrid();
	}
	else if (borders==false) {
		borders = true;
		bordersBtn.classList.remove("inactive");
		updateGrid();
	}
}

eraserBtn.onclick = () => {
	if (eraser==false) {
		eraser = true;
		eraserBtn.classList.add("active");
	}
	else if (eraser=true) {
		eraser = false;
		eraserBtn.classList.remove("active");
	}
}

clearBtn.onclick = () => {
	clearGrid();
}