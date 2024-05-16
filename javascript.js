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
    pixel.addEventListener("mouseenter", (event) => {
        paint(event);
    });
}

function paint(event) {
    const target = event.target;

    if (isRandomColor) {
        target.style.backgroundColor = selectRandomColor();
    } else {
        target.style.backgroundColor = pixelColor;
    }

    if (isDarken) {
        isEraser = true;
        updateEraser();
        // if target does not have overlay div
        if (!target.hasChildNodes()) {
            const overlay = document.createElement("div");
            target.appendChild(overlay);
        }
        // create one
        let darkenCount;
        const overlay = target.firstChild;
        if (!overlay.getAttribute("darken")) {
            overlay.setAttribute("darken", "0");
        }
        darkenCount = +overlay.getAttribute("darken");
        if (darkenCount <= 10) {
            darkenCount += 1;
            overlay.style = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, ${(darkenCount - 1)/10});
            `
            overlay.setAttribute("darken", `${darkenCount}`);
        }
    } else {
        target.textContent = '';
    }
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
    // the states here are inverted because
    // the states will be fliped in update function
    isEraser = true;
    isBrush = false;
    isRandomColor = true;
    updateEraser();
    updateBrushBtn();
    updateRandomBtn();
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

function onChangeSlider(pixels) {
    pixelCount = pixels;
    displayPixelCounts(pixels);
    updatePixels(pixels);
}

function updateEraser() {
    isEraser = !isEraser;
    colorPicker = document.querySelector("#color-picker");
    if (isEraser) {
        pixelColor = "white";
        eraserBtn.classList.add("highlight-button");
    } else {
        pixelColor = colorPicker.value;
        eraserBtn.classList.remove("highlight-button");
    }
}

function updateBrushBtn() {
    isBrush = !isBrush;
    colorPicker = document.querySelector("#color-picker");
    if (isBrush) {
        pixelColor = colorPicker.value;
        brushBtn.classList.add("highlight-button");
    } else {
        pixelColor = "white";
        brushBtn.classList.remove("highlight-button");
    }
}
window.addEventListener("load", onStartup, false);
const pixelSlider = document.querySelector(".pixel-slider");
const pixelInputBox = document.querySelector("#pixel-count");

// all the buttons
const randomColorBtn = document.querySelector(".random-color-button");
const darkenBtn = document.querySelector(".darken-button");
const borderBtn = document.querySelector(".show-border-button");

// button states
let isRandomColor = false;
let isDarken = false;
let isBorder = true;

borderBtn.addEventListener("click", ()=>{
    if (isBorder) {
        [...containerDiv.children].forEach(child => {
            child.style.border = '';
        });
    } else {
        [...containerDiv.children].forEach(child => {
            child.style.border = 'solid black 0.2px';
        });
    }
    isBorder = !isBorder;
});

darkenBtn.addEventListener("click", ()=> {
    isEraser = true;
    updateEraser();
    isBrush = false;
    updateBrushBtn();
    updatedarkenBtn();
});

function updatedarkenBtn() {
    isDarken = !isDarken;
    if (isDarken) {
        darkenBtn.classList.add("highlight-button");
    } else {
        darkenBtn.classList.remove("highlight-button");
    }
}

randomColorBtn.addEventListener("click", () => {
    isEraser = true;
    isBrush = false;
    updateRandomBtn();
    updateBrushBtn();
    updateEraser();
});

function updateRandomBtn() {
    isRandomColor = !isRandomColor;
    colorPicker = document.querySelector("#color-picker");
    if (isRandomColor) {
        randomColorBtn.classList.add("highlight-button");
    } else {
        randomColorBtn.classList.remove("highlight-button");
    }
}

function selectRandomColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}


const eraserBtn = document.querySelector(".eraser-button");
const brushBtn = document.querySelector(".brush-button");
const reloadBtn = document.querySelector(".reload-button");

// button states
let isEraser = false;
let isBrush = true;

eraserBtn.addEventListener("click", () => {
    updateBrushBtn();
    updateEraser();
    isRandomColor = true;
    updateRandomBtn();
    isDarken = true;
    updatedarkenBtn();
});

brushBtn.addEventListener("click", () => {
    isEraser = true;
    isBrush = false;
    updateBrushBtn();
    updateEraser();
});

reloadBtn.addEventListener("click", () => {
    updatePixels(pixelCount);
});

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

