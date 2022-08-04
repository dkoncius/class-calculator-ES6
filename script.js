"use strict";

var numberButtons = document.querySelectorAll("[data-number]");
var operationsButtons = document.querySelectorAll("[data-operation]");
var equalsButton = document.querySelector("[data-equals]");
var deleteButton = document.querySelector("[data-delete]");
var allClearButton = document.querySelector("[data-all-clear]");
var previousOperandTextElement = document.querySelector("[data-previous-operand]");
var currentOperandTextElement = document.querySelector("[data-current-operand]");

class Calculator {
    constructor(currentOperandTextElement, previousOperandTextElement){
        this.currentOperandTextElement = currentOperandTextElement;
        this.previousOperandTextElement = previousOperandTextElement;
        this.clear();
    }

   // Ištrina visas vertes iš objekto
    clear() {
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = undefined;
    }

    // Ištrina skaičius iš display nuo galo
    delete(){
        this.currentOperand = this.currentOperand.slice(0, -1);
    }

    appendNumber(number){
        // Sąlyga neleis daugiau nei vieno taško padėti, jeigu jau yra vienas
        if(number === "." && this.currentOperand.includes(".")) return;
        this.currentOperand = this.currentOperand + number;
    }

    getDisplayNumber(number){
        var stringNumber = number.toString();
        var integerDigits = parseFloat(stringNumber.split('.')[0]);
        var decimalDigits = stringNumber.split(".")[1];
        if(isNaN(integerDigits)){
            integerDigits = "";
        }  else {
             integerDigits = integerDigits.toLocaleString("en");
        }

        if (decimalDigits != null){
            return `${integerDigits}.${decimalDigits}`
        }
        
        return integerDigits;
    }

    updateDisplay(){
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
        if(this.operation !== undefined) {
             this.previousOperandTextElement.innerText = 
        `${this.previousOperand} ${this.operation}`;
        } else {
            this.previousOperandTextElement.innerText = "";
        }
    }

    chooseOperation(operation){
        if(this.currentOperand === "") {
            return this.operation = operation;
        }
        if(this.previousOperand !== ""){
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }

    // Skaičiavimas
    compute(){
        var computation;
        var current = parseFloat(this.currentOperand);
        var prev = parseFloat(this.previousOperand);
            if (isNaN(prev) || isNaN(current)) return;

        switch (this.operation){
            case "+": computation = prev + current;
            break;
            case "-": computation = prev - current
            break;
            case "*": computation = prev * current;
            break;
            case "÷": computation = prev / current;
            break;
            default: return;
        }
        this.currentOperand = computation;
        this.previousOperand = "";
        this.operation = undefined;
        console.log(computation);
    }
}

var calculator = new Calculator(
    currentOperandTextElement, previousOperandTextElement 
);


numberButtons.forEach(button => {
    button.addEventListener("click", function(){
        calculator.appendNumber(this.innerText);
        calculator.updateDisplay();
    });
});

operationsButtons.forEach(button => {
    button.addEventListener("click", function(){
        calculator.chooseOperation(this.innerText);
        calculator.updateDisplay();
    });
});

equalsButton.addEventListener("click", function(){
        calculator.compute();
        calculator.updateDisplay();
});



allClearButton.addEventListener("click", function(){
        calculator.clear();
        calculator.updateDisplay();
});


deleteButton.addEventListener("click", function(){
        calculator.delete();
        calculator.updateDisplay();
});




