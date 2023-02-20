let poprz = document.querySelector('#poprz');
let nast = document.querySelector('#nast');
let wizytowki = document.getElementsByClassName('wizytowka');
let random = document.querySelector('#random');
let licznik = 0;

poprz.addEventListener('click', PoprzedniaWizytowka);
nast.addEventListener('click', NastepnaWizytowka);
random.addEventListener('click', ChooseRandomCard);

wizytowki[0].setAttribute('style', 'opacity:1');

function PoprzedniaWizytowka(){
    let poprzedni = wizytowki[Math.abs(licznik % wizytowki.length)];
    licznik -= 1;
    let nastepny = wizytowki[Math.abs(licznik % wizytowki.length)];
    poprzedni.style.transition = "opacity 0.5s ease-in-out";
    nastepny.style.transition = "opacity 0.5s ease-in-out 0.5s";
    nastepny.style.opacity = "1";
    poprzedni.style.opacity = '0';   
}
    

function NastepnaWizytowka(i){
    let poprzedni = wizytowki[Math.abs(licznik % wizytowki.length)];
    licznik += 1;
    let nastepny = wizytowki[Math.abs(licznik % wizytowki.length)];
    poprzedni.style.transition = "opacity 0.5s ease-in-out";
    nastepny.style.transition = "opacity 0.5s ease-in-out 0.5s";
    nastepny.style.opacity = "1";
    poprzedni.style.opacity = '0';

    return i + 1
    
}

function ChooseRandomCard(){
    let randomNumber = Math.round(Math.random()*3, 0);
    console.log(randomNumber);
    for (let i = 0; i < randomNumber; i++) {
        setTimeout(NastepnaWizytowka, i * 1000);
    }
}