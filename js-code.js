
let firstOperator = ""
let secondOperator = ""
let lastResult = 0
let shouldClearScreen = true

let firstNumber = 0
let secondNumber = 0


///Flag to known if last number can be removed from the screen
let isDeleteable = false

const numberBtn = document.querySelectorAll('[data-number]')
const operatorBtn = document.querySelectorAll('[data-operator]')
const clearBtn = document.getElementById('clearBtn')
const deleteBtn = document.getElementById('deleteBtn')
const equalBtn = document.getElementById("equalBtn")
const operationScreen = document.getElementById('operationScreen')
const resultScreen = document.getElementById('resultScreen')






///NUMERAL BUTTONS
numberBtn.forEach((button) =>
    button.addEventListener('click', () => appendNumber(button.textContent))
)

function appendNumber(number){
    if(shouldClearScreen) clearResultScreen()
    resultScreen.textContent += number
    isDeleteable = true
}

///OPERATOR BUTTONS
operatorBtn.forEach((button) => 
    button.addEventListener('click', () => addOperator(button.textContent))
)

function addOperator(operator){
    
    

    if(firstOperator == ""){
        firstOperator = operator
        lastResult = parseInt(resultScreen.textContent)
        operationScreen.textContent = lastResult + " " + operator
        shouldClearScreen = true
    }
    else{
        lastResult= operate(firstOperator,lastResult,parseInt(resultScreen.textContent))
        resultScreen.textContent = lastResult
        isDeleteable = false
        
        firstOperator = operator
        operationScreen.textContent = lastResult + " " + operator
        shouldClearScreen = true
    }
    
}



///EQUAL BUTTON
equalBtn.addEventListener('click', equal)

function equal(){
    firstNumber = lastResult
    secondNumber = parseInt(resultScreen.textContent)
    lastResult= operate(firstOperator,firstNumber,secondNumber)

    resultScreen.textContent = lastResult
    isDeleteable =  false

    operationScreen.textContent = firstNumber + " " + firstOperator + " " + secondNumber + " = "
    
    shouldClearScreen = true
    firstOperator = ""
}





///DELETE BUTTON

deleteBtn.addEventListener('click' , deleteLastNumber)

function deleteLastNumber(){
    
    if(!isDeleteable) return
    resultScreen.textContent = resultScreen.textContent.slice(0,-1)
    if(resultScreen.textContent!="") return
    resultScreen.textContent = "0"
    shouldClearScreen = true
}


///CLEAR BUTTON

clearBtn.addEventListener('click' , resetCalculatorValues)

function resetCalculatorValues(){
    firstOperator = ""
    secondOperator = ""
    lastResult =
    firstNumber = 0
    secondNumber = 0

    resultScreen.textContent = "0"
    operationScreen.textContent = ""
    shouldClearScreen = true
}





function clearResultScreen(){
    resultScreen.textContent = ""
    shouldClearScreen = false
}



function add(a,b){
    return a + b
}

function subtract(a,b){
    return a - b
}

function multiply(a,b){
    return a * b
}

function divide(a, b){
    return a / b
}


function operate(operator, a,b){
    switch(operator){
        case "+":
            return add(a,b)
        case "-":
            return subtract(a,b)
        case "*":
            return multiply(a,b)
        case "/":
            if(b===0) return "UnU"
            else return divide(a,b)
    }
}