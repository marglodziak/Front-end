let mPopLangDiv = document.querySelector('#maxJezyk');
let lPopLangDiv = document.querySelector('#minJezyk');
let currencyDiv = document.querySelector('#waluta');
let categoryDiv = document.querySelector('#wybranaKategoria');
let dataDiv = document.querySelector('#obliczoneWyniki');

const mostLangCategory = "10 najbardziej popularnych języków na świecie";
const leastLangCategory = "10 najmniej popularnych języków na świecie";
const currCategory = "5 najpopularniejszych walut na świecie";
const mostPopular = 'm';
const leastPopular = 'l';

mPopLangDiv.addEventListener('click', showMostPopularLanguages);
lPopLangDiv.addEventListener('click', showLeastPopularLanguages);
currencyDiv.addEventListener('click', showMostPopularCurrencies);


function showMostPopularLanguages(){
    categoryDiv.textContent = mostLangCategory;
    showLanguages(mostPopular);
}

function showLeastPopularLanguages(){
    categoryDiv.textContent = leastLangCategory;
    showLanguages(leastPopular);
}

function showMostPopularCurrencies(){
    categoryDiv.textContent = currCategory;
    showCurrencies();
}

function showLanguages(mode){
    dataDiv.innerHTML = '';

    let langCounter = [];
    let extractedLangs;
    let languages = countries.map(c => c.languages);    
    
    for (const langList of languages)
        for (const lang of langList)
            langCounter[lang] = languages.filter(c => c.includes(lang)).length;

    if(mode === mostPopular) 
        extractedLangs = Object.entries(langCounter).sort(([, c1], [, c2]) => c2-c1).slice(0, 10);
    else
        extractedLangs = Object.entries(langCounter).sort(([, c1], [, c2]) => c1-c2).slice(0, 10);

    PrepareProgressBar(extractedLangs);
}

function showCurrencies(){
    dataDiv.innerHTML = '';

    let currCounter = [];
    let extractedCurrencies;
    let currencies = countries.map(c => c.currency.split(' ').at(-1).toLowerCase());
    
    for (const currency of currencies)
        currCounter[currency] = countries.filter(c => c.currency.toLowerCase().endsWith(currency)).length;

    extractedCurrencies = Object.entries(currCounter).sort(([, c1], [, c2]) => c2-c1).slice(0, 5);

    PrepareProgressBar(extractedCurrencies);
}

function PrepareProgressBar(dane){
    let maksymalnaLiczbaWystapien = dane.map(c => c[1])[0];

    for (const jezyk of dane) {
        let nowyElement = document.createElement('div');
        let nazwaElementu = document.createElement('p');
        let calyPasekPostepu = document.createElement('div');
        let obliczonyPasekPostepu = document.createElement('div');
        let statystyka = document.createElement('p');
        let szerokoscPaska = jezyk[1] / maksymalnaLiczbaWystapien * 100;
        
        nowyElement.className = 'elementZPaskiem';
        nazwaElementu.className = 'etykieta';
        calyPasekPostepu.className = 'maksymalnyPasekPostepu';
        obliczonyPasekPostepu.className = 'pasekPostepu';
        statystyka.className = 'etykieta';

        nazwaElementu.textContent = jezyk[0];
        statystyka.textContent = jezyk[1];
        obliczonyPasekPostepu.setAttribute('style', 'width:'+szerokoscPaska+'%;');

        calyPasekPostepu.appendChild(obliczonyPasekPostepu);

        nowyElement.appendChild(nazwaElementu);
        nowyElement.appendChild(calyPasekPostepu);
        nowyElement.appendChild(statystyka);

        dataDiv.appendChild(nowyElement);
    }
}
