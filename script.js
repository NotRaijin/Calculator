const numberButtons = document.querySelectorAll(".numbers");
const operatorButtons = document.querySelectorAll(".operators");
const clearButton = document.getElementById("btn-clear");
const negateButton = document.getElementById("btn-negate");
const decimalButton = document.getElementById("btn-decimal");
const equalButton = document.getElementById("btn-equal");
const input = document.getElementById("input");
const output = document.getElementById("output");

let firstNumber = 0;
let secondNumber = 0;
let operator = '';
let decimalAdded = false;

const operate = () => {
    switch (operator){
        case "%":
            percentage();
            break;
        case "/":
            divide();
            break;
        case "x":
            multiply();
            break;
        case "-":
            subtract();
            break;
        case "+":
            add();
            break;
    }
};

const percentage = () => {
    let result = (firstNumber / 100) * secondNumber;
    input.textContent = `${firstNumber} % ${secondNumber}`;
    output.textContent = Math.ceil(result); 
};

const divide = () => {
    let result = firstNumber / secondNumber;
    output.textContent = result.toFixed(10);
}

const multiply = () => {
    let result = firstNumber * secondNumber;
    output.textContent = result;
};

const subtract = () => {
    let result = firstNumber - secondNumber;
    output.textContent = result;
};

const add = () => {
    let result = firstNumber + secondNumber;
    output.textContent = result;
};

numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        const number = button.textContent;
        if (operator === '') {
            if (!decimalAdded || !firstNumber.toString().includes(".")) {
                if (decimalAdded) {
                    firstNumber = parseFloat(firstNumber.toString() + "." + number);
                } else {
                    firstNumber = parseFloat(firstNumber.toString() + number);
                }
                output.textContent = firstNumber;
                decimalAdded = false;
            }
        } else {
            if (!decimalAdded || !secondNumber.toString().includes(".")) {
                if (decimalAdded) {
                    secondNumber = parseFloat(secondNumber.toString() + "." + number);
                } else {
                    secondNumber = parseFloat(secondNumber.toString() + number);
                }
                output.textContent = secondNumber;
                decimalAdded = false;
            }
        }
    });
});



operatorButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (firstNumber !== 0 && secondNumber !== 0 && operator !== '') {
            operate();
            firstNumber = parseFloat(output.textContent);
            secondNumber = 0;
            operator = button.textContent;
            input.textContent = `${firstNumber} ${operator}`;
        } else {
            operator = button.textContent;
            input.textContent = `${firstNumber} ${operator}`;
        }
    });
});

clearButton.addEventListener("click", () => {
    firstNumber = 0;
    secondNumber = 0;
    operator = '';
    input.textContent = "0";
    output.textContent = "0";
    decimalAdded = false;
});


negateButton.addEventListener("click", () => {
    let number = output.textContent;
    firstNumber = parseFloat(number) * (-1);
    output.textContent = firstNumber;
    input.textContent = `negate(${firstNumber})`;
});

decimalButton.addEventListener("click", () => {
    if (!decimalAdded) {
        output.textContent += ".";
        decimalAdded = true;
    }
});

equalButton.addEventListener("click", () => {
    if (operator !== '') {
        input.textContent = `${firstNumber} ${operator} ${secondNumber} =`;
        operate();
    }
});
