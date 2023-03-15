//
// basic calculator functionality
//
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
//
// operate function
//
const operate = (operator, a, b) => {
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        default:
        // return original inputs
    }
}
//
// display function
//
// helper function to display valueA
function displayA() {
    display.textContent = valueA;
}
// helper function to display temporary values
function displayTemporary() {
    display.textContent = displayTemp;
}
// create a display value
let displayTemp = "";
let valueA = "";
let valueB = "";
let operator = "";
// grab the display text area
let display = document.querySelector("#screen");
// display update function
const updateDisplay = (e) => {
    const keyPressed = e.target.textContent;
    // if a number character is entered, add to temporary display then update display
    if (keyPressed.charCodeAt(0) > 47 && keyPressed.charCodeAt(0) < 58) {
        displayTemp += keyPressed;
        displayTemporary();
    } else if (keyPressed === ".") {
        if (displayTemp.indexOf(".") === -1) {
            displayTemp += keyPressed;
            displayTemporary();
        }
    } else if ((keyPressed === "/") || (keyPressed === "*") || (keyPressed === "-") || (keyPressed === "+") || (keyPressed === "enter") || (keyPressed === "=")) {
        if (valueA === "") {
            valueA = parseFloat(displayTemp);
            if ((keyPressed === "/") || (keyPressed === "*") || (keyPressed === "-") || (keyPressed === "+")) {
                operator = keyPressed;
            }
            displayTemp = "";
            displayA();
        } else if (displayTemp != "") {
            valueB = parseFloat(displayTemp);
            valueA = operate(operator, valueA, valueB);
            displayA();
            displayTemp = "";
            valueB = "";
            if ((keyPressed === "/") || (keyPressed === "*") || (keyPressed === "-") || (keyPressed === "+")) {
                operator = keyPressed;
            } else {
                displayA();
                operator = "";
            }
        } else if (displayTemp === "" && operator === "") { 
            operator = keyPressed;
        }
    } else if (keyPressed === "clear") {
        valueA = "";
        valueB = "";
        displayTemp = "";
        displayTemporary();
    }
}
// gather all buttons
const allButtons = document.querySelectorAll("div.grid-wrapper>button");
// assign function to buttons to update display on click
allButtons.forEach(eachButton => {
    eachButton.addEventListener('click', updateDisplay);
});