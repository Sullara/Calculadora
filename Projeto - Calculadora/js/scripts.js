const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");

class Calculator {
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText;
        this.currentOperationText = currentOperationText;
        this.currentOperation = "";
    }
    
    //Insere um número na tela da calculadora
    addDigit(digit) {
        //Verifica se a operação atual já possui um ponto
        if(digit === "." && this.currentOperationText.innerText.includes(".")) {
            return;
        }

        this.currentOperation = digit
        this.updateScreen()
    }

    //Processa todas as operações da calculadora
    processOperation(operation) {
        //Verifica se o valor atual está vazio
        if(this.currentOperationText.innerText === "" && operation !== "C") {
            //Muda a operação
            if(this.previousOperationText.innerText !== "") {
                this.changeOperation(operation);
            }
            return;
        }

        //Acessa valores atuais e anteriores
        let operationValue;
        const previous = +this.previousOperationText.innerText.split(" ")[0];
        const current = +this.currentOperationText.innerText;

        switch(operation) {
            case "+":
                operationValue = previous + current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "-":
                operationValue = previous - current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "/":
                operationValue = previous / current;
                this.updateScreen(operationValue, operation, current, previous);
                break;    
            case "*":
                operationValue = previous * current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "*":
                operationValue = previous * current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "DEL":
                this.processDelOperator();
                break;
            case "CE":
                this.processClearCurrentOperation();
                break;
            case "C":
                this.processClearOperation();
                break;
            case "=":
                this.processEqualsOperator();
                break;
            default:
                return;
        }
    }

    //Muda os valores na tela da calculadora
    updateScreen(operationValue = null, operation = null, current = null, previous = null) {
        
        if(operationValue === null) {
            this.currentOperationText.innerText += this.currentOperation;
        } else {
            //Verifica de o valor é zero, se for insere ao valor atual
            if(previous === 0) {
                operationValue = current;
            }

            //Insere o valor atual ao valor anterior
            this.previousOperationText.innerText = `${operationValue} ${operation}`;
            this.currentOperationText.innerText = "";
        }
    }

    //Muda as operações matemáticas
    changeOperation(operation) {
        const mathOperations = ["*", "/", "+", "-"];

        if(!mathOperations.includes(operation)) {
            return;
        }

        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation;
    }

    //Exclui o último digito
    processDelOperator() {
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1);
    }

    //Exclui todos os dígitos atuais
    processClearCurrentOperation() {
        this.currentOperationText.innerText = "";
    }

    //Exclui tudo na tela
    processClearOperation() {
        this.currentOperationText.innerText = "";
        this.previousOperationText.innerText = "";
    }

    //Processa uma operação
    processEqualsOperator() {
        const operation = previousOperationText.innerText.split(" ")[1];
        this.processOperation(operation);
    }
}

const calc = new Calculator(previousOperationText, currentOperationText);

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;
        
        if(+value >= 0 || value === ".") {
            calc.addDigit(value);
        } else {
            calc.processOperation(value);
        }
    })
})