// Variables

let colorPicker = document.querySelector("#colorPicker");
let backgroundSetter = document.querySelector("#backgroundSetter")

let sizeSlider = document.querySelector("#sizeSlider");
let sizeText = document.querySelector("#sizeText");
let sizeValue;

let grid = document.querySelector("#grid");
let cell = document.querySelectorAll(".cell");

let isDragging = false;
let activeCell;

let clearBtn = document.querySelector("#clearBtn");
let eraserBtn = document.querySelector("#eraserBtn");
let bordersBtn = document.querySelector("#bordersBtn");

let eraser = false;
let borders = true;

let div;
let backgroundColor = "inherit";

grid.addEventListener("touchstart", function(e) {
  isDragging = true;
  activeCell = e.target;
  activeCell.style.background = colorPicker.value;
});

grid.addEventListener("touchend", function() {
  isDragging = false;
  document.body.style.overflow = "auto";
});

grid.addEventListener("touchmove", function(e) {
  if (isDragging) {
    let touch = e.touches[0];
    let cell = document.elementFromPoint(touch.clientX, touch.clientY);
    if (cell.classList.contains("cell")) {
      cell.style.background = colorPicker.value;
    };
    document.body.style.overflow = "hidden";
  }
});

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
			element.style.background = colorPicker.value;
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

clearBtn.onclick = () => {
	clearGrid();
}