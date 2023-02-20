let zolty = document.querySelector('#zolty');
let czerwony = document.querySelector('#czerwony');
let niebieski = document.querySelector('#niebieski');
let logs = document.querySelector('#logs');
let propagation = document.querySelector('#propagation');
let resetBtn = document.querySelector('#reset');
let counterDiv = document.querySelector('#counter');
let apply = document.querySelector('#start');

const zewnetrzny = 'z';
const centralny = 'c';
const wewnetrzny = 'w';
let counter = 0;
let stoppedPropagation = 0;
let changedDirection = 0;

apply.addEventListener('click', applySettings);
propagation.addEventListener('click', stopPropagation);
resetBtn.addEventListener('click', resetCounter);

function applySettings(){
    ResetSettings();
    
    let value = document.querySelector('input[name="order"]:checked').value;

    switch(value){
        case '123':
            zolty.addEventListener('click', clickedIn);
            czerwony.addEventListener('click', clickedCen, true);
            niebieski.addEventListener('click', clickedOut, true);
            break;
        case '132':
            zolty.addEventListener('click', clickedIn);
            czerwony.addEventListener('click', clickedCen);
            niebieski.addEventListener('click', clickedOut, true);
            break;
        case '231':
            zolty.addEventListener('click', clickedIn);
            czerwony.addEventListener('click', clickedCen, true);
            niebieski.addEventListener('click', clickedOut);
            break;
        case '321':
            zolty.addEventListener('click', clickedIn);
            czerwony.addEventListener('click', clickedCen);
            niebieski.addEventListener('click', clickedOut);
            break;
    }
}

function ResetSettings(){
    zolty.removeEventListener('click', clickedIn);
    czerwony.removeEventListener('click', clickedCen);
    niebieski.removeEventListener('click', clickedOut);
    
    zolty.removeEventListener('click', clickedIn, true);
    czerwony.removeEventListener('click', clickedCen, true);
    niebieski.removeEventListener('click', clickedOut, true);

}

function clickedIn(event){
    if(stoppedPropagation){
        event.stopPropagation();
    }

    CreateLogUpdateCounter(wewnetrzny);
    CheckCounterValue();        
}

function clickedCen(event){
    if(stoppedPropagation){
        event.stopPropagation();
    }

    CreateLogUpdateCounter(centralny);
    CheckCounterValue();
        
}

function clickedOut(event){
    if(stoppedPropagation){
        event.stopPropagation();
    }

    CreateLogUpdateCounter(zewnetrzny);
    CheckCounterValue();
}

function stopPropagation(){
    if(stoppedPropagation==0){
        propagation.textContent = 'PROPAGACJA ZATRZYMANA';
        stoppedPropagation = 1;
    }
    else {
        propagation.textContent = "PROPAGACJA AKTYWNA";
        stoppedPropagation = 0;
    }
}

function resetCounter(){
    counter = 0;
    ResetSettings();
    showCounter();
    logs.innerHTML = '<h3>LOGI</h3>';
    zolty.setAttribute('style', 'background-color: #ffff00');
    czerwony.setAttribute('style', 'background-color: #ff0000');
    stoppedPropagation=0;
    propagation.textContent = "PROPAGACJA AKTYWNA";
}

//#region Helpers

function CreateLogUpdateCounter(mode){
    let newItem = document.createElement('p');

    switch(mode){
        case zewnetrzny:{
                newItem.textContent = "Naciśnięto niebieski o wartości 1";
                counter += 1;
                break;
        }
        case centralny:{
                newItem.textContent = "Naciśnięto czerwony o wartości 2";
                counter += 2;
                break;
        }
        case wewnetrzny:{
                newItem.textContent = "Naciśnięto żółty o wartości 5";
                counter += 5;
                break;
        }
    }

    logs.appendChild(newItem);
    showCounter();
}

function CheckCounterValue(){
    if(counter > 30){
        czerwony.removeEventListener('click', clickedCen);
        czerwony.setAttribute('style', 'background-color: #ff000044');
    }

    if(counter > 50){
        zolty.removeEventListener('click', clickedIn);
        zolty.setAttribute('style', 'background-color: #ffff0044');
    }
}

function showCounter(){
    counterDiv.textContent = counter;
}

//#endregion