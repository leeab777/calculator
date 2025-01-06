const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
};

function updateDisplay() {
    //select the element with class of 'calculator-screen'
    const display = document.querySelector('.calculator-screen');
    //update the value of the element with the contents of 'displayValue'
    display.value = calculator.displayValue;
}

updateDisplay();

const keys= document.querySelector('.calculator-keys');
keys.addEventListener('click', (event) => {
    //acces the clicked element
    const {target} = event;

    //check if clicked element is a button.
    //if not, exit from the function
    if (!target.matches('button')) {
        return;
    }

    const value=target.value;

    switch (value) {
        case '+':
        case '-':
        case '*':
        case '/':
        case '=':
          handleOperator(value);
          break;
        case '.':
          inputDecimal(value);
          break;
        case 'all-clear':
          resetCalculator();
          break;
        default:
          // check if the key is an integer
          if (Number.isInteger(parseFloat(value))) {
            inputDigit(value);
          }
          break;
      }
    
      updateDisplay();
});

function inputDigit(digit) {
    const { displayValue, waitingForSecondOperand } = calculator;

    // Overwrite 'displayValue' if the current value is '0', otherwise append to it
    if (waitingForSecondOperand === true) {
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false;
    } else {
        calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }

    console.log(calculator);
}

function inputDecimal(dot) {
    if (calculator.waitingForSecondOperand === true) {
        calculator.displayValue = '0.'
      calculator.waitingForSecondOperand = false;
      return
    }
    //if the 'displayValue' property does not contain a decimal point
    if (!calculator.displayValue.includes(dot)) {
        //append the decimal point
        calculator.displayValue += dot;
    }
}

function handleOperator(nextOperator) {
    const { firstOperand, displayValue, operator } = calculator;
    const inputValue = parseFloat(displayValue);

    // Handle the case when the `=` button is clicked
    if (nextOperator === "=") {
        if (operator && calculator.waitingForSecondOperand) {
            calculator.operator = nextOperator;
            return; // Just return if there's nothing to calculate
        }

        // Perform the calculation if the operator exists
        if (operator && firstOperand !== null) {
            const result = calculate(firstOperand, inputValue, operator);
            calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
            calculator.firstOperand = result; // Store the result as first operand for further operations
        }

        // Reset the waiting flag after calculation
        calculator.waitingForSecondOperand = false;
        calculator.operator = null; // Reset operator for next input
    } else {
        // Handle other operators (+, -, *, /)
        if (firstOperand === null) {
            calculator.firstOperand = inputValue;
        } else if (operator) {
            const result = calculate(firstOperand, inputValue, operator);
            calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
            calculator.firstOperand = result; // Store the result as first operand for further operations
        }

        // Set the operator and prepare for next operand
        calculator.waitingForSecondOperand = true;
        calculator.operator = nextOperator;
    }
}


function calculate(firstOperand, secondOperand, operator) {
    if (operator === '+') {
      return firstOperand + secondOperand;
    } else if (operator === '-') {
      return firstOperand - secondOperand;
    } else if (operator === '*') {
      return firstOperand * secondOperand;
    } else if (operator === '/') {
      return firstOperand / secondOperand;
    }
  
    return secondOperand;
  }

  function resetCalculator() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
    console.log(calculator);
  }