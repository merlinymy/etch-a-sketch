// get the div that small squares reside in
const containerDiv = document.querySelector(".container");


// user choose the number of grid (x by x)
// container length / number of grid is the size of small div (pixel)
let containerWidth = 750;
let colorPicker;
let pixelPicker;
const defaultColor = "#1BE5F3";
let pixelColor;
let pixelCount = 16;

function generateSquares(numberSquares) {
    // we need to know the width/height of pixels
    const pixelContainer = document.querySelector(".container");
    pixelContainer.replaceChildren();
    let pixelWidth = containerWidth / numberSquares;
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

function updatePixels(pixelCount) {
    generateSquares(pixelCount);
    setupPixelDivs();
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

function setupPixelDivs() {
    const pixelDivs = document.querySelectorAll(".pixel");
    // console.log(pixelDivs);
    pixelDivs.forEach(pixel => attachListeners(pixel));
}

function onStartup() {
    updatePixels(pixelCount)
    setupColorPicker();
    displayPixelCountsOnStartup(pixelCount);
}

function setupColorPicker() {
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

function displayPixelCountsOnStartup(pixelCount) {
    const pixelSlider = document.querySelector(".pixel-slider");
    pixelSlider.value = pixelCount;
    const pixelP = document.querySelector(".pixel-output");
    pixelP.textContent = `${pixelCount} x ${pixelCount}`;
}

function displayPixelCounts(pixelCount) {
    const pixelP = document.querySelector(".pixel-output");
    const pixelInputBox = document.querySelector("#pixel-count");
    pixelInputBox.value = pixelCount;
    pixelP.textContent = `${pixelCount} x ${pixelCount}`;
}

function onChangeSlider(pixelCount) {
    displayPixelCounts(pixelCount);
    updatePixels(pixelCount);
}

window.addEventListener("load", onStartup, false);
const pixelSlider = document.querySelector(".pixel-slider");
const pixelInputBox = document.querySelector("#pixel-count");

pixelSlider.addEventListener("input", (event) => {
    onChangeSlider(event.target.value);
});

pixelInputBox.addEventListener("input", (event) => {
    const pixelDiv = document.querySelector(".pixel-amount");
    const previousWarning = document.querySelector(".pixel-amount .warning");
    if (previousWarning !== null ) {
        pixelDiv.removeChild(previousWarning);
    }
    const warningMsg = document.createElement("p");
    warningMsg.className = "warning";
    warningMsg.textContent = "Please enter a value between 16 and 128";
    let inputVal = event.target.value;
    if (inputVal === '') {
        const pixelP = document.querySelector(".pixel-output");
        pixelP.textContent = '';
        return;
    }
    if (inputVal < 16 || inputVal > 128) {
        pixelDiv.appendChild(warningMsg);
        return;
    }
    onChangeSlider(inputVal);
});

