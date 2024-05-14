// get the div that small squares reside in
const containerDiv = document.querySelector(".container");


// user choose the number of grid (x by x)
// container length / number of grid is the size of small div (pixel)
let containerWidth = 750;
let colorPicker;
let pixelPicker;
const defaultColor = "#1BE5F3";
let pixelColor;

function generateSquares(numberSquares) {
    // we need to know the width/height of pixels
    let pixelWidth = containerWidth / numberSquares;
    console.log(pixelWidth);
    for (let i = 0; i < numberSquares; i++) {
        for (let j = 0; j < numberSquares; j++) {
            const pixelSquare = document.createElement("div");
            pixelSquare.style.height = `${pixelWidth}px`;
            pixelSquare.style.width = `${pixelWidth}px`;
            pixelSquare.style.border = "black solid 0.2px"
            pixelSquare.className = "pixel";
            containerDiv.appendChild(pixelSquare);
        }    
    }
}

function attachListeners(pixel) {
    pixel.addEventListener("mouseover", (event) => {
        paint(event);
    });
}

function paint(event) {
    const target = event.target;
    target.style.backgroundColor = pixelColor;
}

generateSquares(64);
const pixelDivs = document.querySelectorAll(".pixel");
// console.log(pixelDivs);
pixelDivs.forEach(pixel => attachListeners(pixel));

window.addEventListener("load", startup, false);

function startup() {
    colorPicker = document.querySelector("#color-picker");
    colorPicker.value = defaultColor;
    pixelColor = defaultColor;
    colorPicker.addEventListener("input", updateFirst, false);
    colorPicker.addEventListener("change", updateAll, false);
    colorPicker.select();
}

function updateFirst(event) {
    pixelColor = event.target.value;
}

function updateAll(event) {
    pixelColor = event.target.value;
}