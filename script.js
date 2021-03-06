/*
TODO
Animacja po kliknięciu przycisku (rozjaśnianie)
Wykonanie tego samego działania bo ponownym kliknięciu =
*/

function add(a, b) {
    return a+b;
}

function subtract(a, b) {
    return a-b;
}

function multiply(a, b) {
    return a*b;
}

function divide(a, b) {
    return a/b;
}

function operate(operator, a, b) {
    let result;
    if (operator === '+') result = add(a, b);
    else if (operator === '-') result = subtract(a, b);
    else if (operator === '*') result = multiply(a, b);
    else if (operator === '/') {
        if (b == 0) return "Error";
        result = divide(a, b);
    }
    result = Math.round(result * 100000) / 100000;
    console.log('result = ',result.toString());
    if (result.toString().length > 7) return result.toExponential(2);
    else return result;
}

function print(value, display) {
    display.textContent = value;
}


function clickC(display) {
    print("0", display);
}

function clickAC(display) {
    clickC(display);
    return [NaN, NaN, NaN, NaN]; // [first_value, second_value, operation, result]
}

function clickComma(display) {
    print(display.textContent + '.', display);
}

function readOperation(buttonText) {
    switch (buttonText) {
        case '+':
            return '+';
        case '−':
            return '-';
        case '×':
            return '*';
        case '÷':
            return '/';
    }
}

function setC() {
    const button = document.querySelector("#buttonAC");
    button.textContent = "C";
}

function setAC() {
    const button = document.querySelector("#buttonAC");
    button.textContent = "AC";
}

function toggleMinus(display) {
    if (display.textContent[0] != '-') print('-' + display.textContent, display);
    else print(display.textContent.substr(1), display);
}

function calculatePercent(display) {
    number = parseFloat(display.textContent);
    return number/100;
}

function clickOperation(button, display, first_value, second_value, operation, result) {
    if (isNaN(first_value) || isNaN(second_value)){
        first_value = parseFloat(display.textContent);
        operation = readOperation(button.textContent);
        result = NaN;
    }
    else {
        [first_value, second_value, operation, result] = clickEquals(display, first_value, second_value, operation, result);
        operation = readOperation(button.textContent);
    }
    return [first_value, second_value, operation, result];
}

function clickEquals(display, first_value, second_value, operation, result) {
    if (isNaN(first_value) == 0) {
        second_value = parseFloat(display.textContent);
        console.log(first_value, second_value, operation, result);
        result = operate(operation, first_value, second_value);
        print(result, display);
        first_value = result;
        second_value = NaN;
        operation = null;
        console.log(first_value, second_value, operation, result);
        return [first_value, second_value, operation, result];
    }
    else console.log("Error w clickEquals");
}

function handleClick(button, display, first_value, second_value, operation, result) {
    if ((button.className == 'button number' || button.className=="button button0 number") && display.textContent.length < 7) {
        if (operation == null && isNaN(result) == 0) {
            [first_value, second_value, operation, result] = clickAC(display);
            result = NaN;
        }
        if (isNaN(first_value) == 0 && isNaN(second_value) == 1) {
            second_value = button.textContent;
            result = NaN;
            clickC(display);
        }
        if (display.textContent == '0' || display.textContent == '-0') {
            print(button.textContent, display);
            if (display.textContent != "0")
            setC();
        }
        else print(display.textContent + button.textContent, display);
    }
    else if (button.id == "buttonAC") {
        if (button.textContent == "C") {
            clickC(display);
            setAC();
        }
        else [first_value, second_value, operation, result] = clickAC(display);
    }
    else if (button.className == "button button-orange operation") {
        [first_value, second_value, operation, result] = clickOperation(button, display, first_value, second_value, operation, result);
    }
    else if (button.className == "button button-orange equals" && isNaN(result) == 1 && isNaN(first_value) == 0) {
        [first_value, second_value, operation, result] = clickEquals(display, first_value, second_value, operation, result);
    }
    else if (button.id == "button.") {
        if (isNaN(result) != true) {
            clickC(display);
            result = NaN;
        }
        if (display.textContent.search(/\./) == -1)
            clickComma(display);
    }
    else if (button.id == "button+-") {
        toggleMinus(display);
    
    }
    
    else if (button.id == "button%") {
        print(calculatePercent(display), display);
    }

    return [first_value, second_value, operation, result];
}

function main() {
    const buttons = document.querySelectorAll('.button');
    const display = document.querySelector('.display');
    let first_value = NaN;
    let second_value = NaN;
    let operation = null;
    let result = NaN;

    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            [first_value, second_value, operation, result] = handleClick(button, display, first_value, second_value, operation, result);
        });
    });
}

main();