let firstOperand = ''
let secondOperand = ''
let currentOperation = null
let shouldResetDisplay = false

const operatorBtns = document.querySelectorAll('.operators')
const digitBtns = document.querySelectorAll('.digits')
const clearBtns = document.getElementById('clear')
const deleteBtn = document.getElementById('delete')
const equalsBtn = document.getElementById('equals')
const decimalBtn = document.getElementById('decimal')
const positiveNegativeBtn = document.getElementById('positiveNegative')
const pastOperationDisplay = document.getElementById('pastOperation')
const currentOperationDisplay = document.getElementById('currentOperation')

window.addEventListener('keydown', handleKeyboardInput)
clearBtns.addEventListener('click', clear)
deleteBtn.addEventListener('click', deleteInput)
decimalBtn.addEventListener('click', appendPoint)
equalsBtn.addEventListener('click', calculate)
positiveNegativeBtn.addEventListener('click', switchPositiveNegative)

digitBtns.forEach((button) =>
    button.addEventListener(
        'click', ()=> appendDigit(button.textContent)
    )
)

operatorBtns.forEach((button) =>
    button.addEventListener(
        'click', ()=> setOperation(button.textContent)
    )
)

function appendDigit(number) {
    if (currentOperationDisplay === '0' || shouldResetDisplay) {
        resetDisplay()
    }
    currentOperationDisplay.textContent += number 
}


function resetDisplay() {
    currentOperationDisplay.textContent = ''
    shouldResetDisplay = false
}
  
function clear() {
    currentOperationDisplay.textContent = null
    pastOperationDisplay.textContent = ''
    firstOperand = ''
    secondOperand = ''
    currentOperation = null
}
  
function appendPoint() {
    if (shouldResetDisplay) 
        resetResult()
    if (currentOperationDisplay.textContent === '')
        currentOperationDisplay.textContent = '0'
    if (!currentOperationDisplay.textContent.includes('.')) 
        return currentOperationDisplay.textContent += '.'
}
  
function deleteInput() {
    currentOperationDisplay.textContent = currentOperationDisplay.textContent
        .toString()
        .slice(0, -1)
}

function switchPositiveNegative() {
    let numberStr = currentOperationDisplay.textContent
    if (numberStr.length == 0) {
        currentOperationDisplay.textContent = '-'
    }
    else if (numberStr.includes('-')) {
        currentOperationDisplay.textContent = numberStr.replace('-', '')
    }
    else currentOperationDisplay.textContent = convertToNegative(numberStr) 
}

function convertToNegative(str) {
    return '' + -Math.abs(Number(str))
}

  
function setOperation(operator) {
      if (currentOperation !== null) calculate()
      
      firstOperand = currentOperationDisplay.textContent
      currentOperation = operator
      pastOperationDisplay.textContent = `${firstOperand} ${currentOperation}`
      shouldResetDisplay = true
}
  
function calculate() {
    if (currentOperation === '!') {
        resetDisplay()
        shouldResetDisplay = false
        if (firstOperand.includes('.')) {
            currentOperationDisplay.textContent = 'ERROR'
            pastOperationDisplay.textContent = 'ERROR: NO DECIMAL POINT IN FACTORIAL'
        }
        else {
            currentOperationDisplay.textContent = factorialize(firstOperand)
            pastOperationDisplay.textContent = `${firstOperand} ${currentOperation} =`
        }
    }

    else if (currentOperation === null || shouldResetDisplay) return

    else if (currentOperation === '÷' && firstOperand === '0') {
        currentOperationDisplay.textContent = 'ERROR'
        pastOperationDisplay.textContent = 'ERROR: DIVISION BY ZERO'
    }

    else if (
        currentOperation === '!' && 
        (!firstOperand.includes('.'))
        ) {
            shouldResetDisplay = false
            currentOperationDisplay.textContent += factorialize(firstOperand)
            pastOperationDisplay.textContent = `${firstOperand} ${currentOperation} =`
    }

    else {
        secondOperand = currentOperationDisplay.textContent
        currentOperationDisplay.textContent = roundResult(
            operate(currentOperation, firstOperand, secondOperand)
            )
        pastOperationDisplay.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`
    }
    currentOperation = null
}

function roundResult(number) {
      return Math.round(number * 10000) / 10000
}

function handleKeyboardInput(e) {
    if (e.key >= 0 && e.key <= 9) appendDigit(e.key)
    if (e.key === '.') appendPoint()
    if (e.key === '=' || e.key === 'Enter') calculate()
    if (e.key === 'Backspace') deleteInput()
    if (e.key === 'Escape') clear()
    if (
        e.key === '+' || 
        e.key === '-' || 
        e.key === '*' || 
        e.key === '/' ||
        e.key === '^' ||
        e.key === '%' ||
        e.key === '!' 
        )
      setOperation(convertOperator(e.key))
}
  
function convertOperator(keyboardOperator) {
    if (keyboardOperator === '/') return '÷'
    if (keyboardOperator === '*') return '×'
    if (keyboardOperator === '-') return '−'
    if (keyboardOperator === '+') return '+'
    if (keyboardOperator === '%') return '%'
    if (keyboardOperator === '^') return '**'
    if (keyboardOperator === '!') return '!'
}

function add(a, b) {
    return a + b
}
  
function substract(a, b) {
    return a - b
}
  
function multiply(a, b) {
    return a * b
}
  
function divide(a, b) {
    return a / b
}

function modulo(a, b) {
    return a % b
}

function exponent(a, b) {
    return Math.pow(a, b)
}

function factorialize(a) {
    if (a < 0) return -1
    else if (a === 0) return 1
    else return (a * factorialize(a-1))
}

  
function operate(operator, a, b) {
    a = Number(a)
    b = Number(b)
    switch (operator) {
        case '+':
            return add(a, b)
        case '−':
            return substract(a, b)
        case '×':
            return multiply(a, b)
        case '÷':
            if (b === 0) return null
            else return divide(a, b)
        case '%':
            return modulo(a, b)
        case '**':
            return exponent(a, b)
        default:
            return null
    }
}


