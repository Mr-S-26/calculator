//basic math functions
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => b === 0 ? "Error: Division by 0" : a / b;

//varaibles for operation
let firstNumber = null;
let operator = null;
let secondNumber = null;

//operate function
const operate = (operator, a, b) => {
    switch (operator) {
        case '+': return add(a, b);
        case '-': return subtract(a, b);
        case '*': return multiply(a, b);
        case '/': return divide(a, b);
        default: return null;
    }
};

//populate display
const display = document.querySelector('.display');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const clearButton = document.querySelector('.clear');
const equalButton = document.querySelector('.equal');
const backspaceButton = document.querySelector('.backspace');
const decimalButton = document.querySelector('.decimal');

let currentInput = '';
let result = null;

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (currentInput.length < 10) {
            currentInput += button.dataset.number;
            updateDisplay(currentInput);
        }
    });
});

const updateDisplay = (text) => {
    display.textContent = text || '0';
};

//make the calculator work
operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (firstNumber === null && currentInput) {
            firstNumber = parseFloat(currentInput);
            operator = button.dataset.operator;
            currentInput = '';
        } else if (currentInput && operator) {
            secondNumber = parseFloat(currentInput);
            result = operate(operator, firstNumber, secondNumber);
            firstNumber = result;
            operator = button.dataset.operator;
            updateDisplay(result);
            currentInput = '';
        }
    });
});

equalButton.addEventListener('click', () => {
    if (firstNumber !== null && operator && currentInput) {
        secondNumber = parseFloat(currentInput);
        result = operate(operator, firstNumber, secondNumber);
        updateDisplay(result.toFixed(2)); // Round to 2 decimal places
        firstNumber = result;
        operator = null;
        currentInput = '';
    }
});

clearButton.addEventListener('click', () => {
    firstNumber = null;
    secondNumber = null;
    operator = null;
    currentInput = '';
    result = null;
    updateDisplay('0');
});

backspaceButton.addEventListener('click', () => {
    currentInput = currentInput.slice(0, -1);
    updateDisplay(currentInput);
});

decimalButton.addEventListener('click', () => {
    if (!currentInput.includes('.')) {
        currentInput += '.';
        updateDisplay(currentInput);
    }
});
