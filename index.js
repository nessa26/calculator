const input = document.getElementById("historical");
let operationsHistory = [];
let resultsHistory = [];
let operationArray = [""];
let result, operation;
let c; // meter historical
let valueId;

function toShow() {
    document.getElementById("result").value = resultsHistory[resultsHistory.length-c-1];
}

function toEnter() {
    operationsHistory.push(operation);
    resultsHistory.push(result);
    console.log(operationsHistory);
    console.log(resultsHistory);
    c = 0;
    document.getElementById("historical").value = ""; 
    operationArray = [];
    toShow();
}

function toGoDown() {
    c--; 
    document.getElementById("historical").value = operationsHistory[operationsHistory.length-c-1];     
    toShow();  
}

function toGoUp() {
    c++;
    document.getElementById("historical").value = operationsHistory[operationsHistory.length-c-1]; 
    toShow();
    
}

input.addEventListener('keyup', logKey);

function logKey(e) {
    if (e.key == 'Enter') {
        operation = e.target.value; 
        result = eval(e.target.value);
        toEnter();
    }
    //  console.log(e);
    else if (e.key == 'ArrowUp' || e.key == 'ArrowDown') {
        if (e.key == 'ArrowDown' && c<=operationsHistory.length && c>0) {
            toGoDown();     
        }else if (e.key == 'ArrowUp' && c>=0 && c<(operationsHistory.length-1)) {
            toGoUp();
        }else{
            document.getElementById("historical").value = ""; 
        }   
    }
}

function perScreen() {
    let operationImm;
    let operationJoin;
    operationImm = document.getElementById(`${valueId}`).value;
    if (operationImm == 'up' && c>=0 && c<(operationsHistory.length-1)) {
        toGoUp();    
    }else if (operationImm == 'down' && c<=operationsHistory.length && c>0) {
        toGoDown();
    }
    

    if (operationImm == "=") {
        operationJoin = operationArray.join('');
        operation = operationJoin;
        result = eval(operation);
        console.log(operation);
        toEnter();
        
    }else{
        operationArray.push(operationImm);
        operationJoin = operationArray.join('');

    }
        
    if (operationImm !== "up" && operationImm !== "down") {
        document.getElementById("historical").value = operationJoin;
    }
    
}

function idValue() {
    let clickScreen = document.querySelectorAll('.key');
    for(let i = 0; i<clickScreen.length; i++){
        clickScreen[i].addEventListener("click",function () {
            valueId = this.id;
            perScreen(); 
        })
    }
}
idValue();