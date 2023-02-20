let modal = document.querySelector('#modal');
let wyjdz = document.querySelector('#wyjdz');
let tresc = document.querySelector('#trescModala');

let images = document.getElementsByClassName('item');

wyjdz.addEventListener('click', SchowajModal);
modal.addEventListener('click', SchowajModal);
tresc.addEventListener('click', (event) => event.stopPropagation());

images[0].addEventListener('click', AktywujModal);
images[1].addEventListener('click', AktywujModal);
images[2].addEventListener('click', AktywujModal);
images[3].addEventListener('click', AktywujModal);


function AktywujModal(){    
    modal.setAttribute('style', 'display: flex');

    switch(this){
        case images[0]:
            tresc.innerHTML = "<img src='img/image-1.jpg'>";
            break;
        case images[1]:
            tresc.innerHTML = "<img src='img/image-2.jpg'>";
            break;
        case images[2]:
            tresc.innerHTML = "<img src='img/image-3.jpg'>";
            break;
        case images[3]:
            tresc.innerHTML = "<img src='img/image-4.jpg'>";
            break;

    } 
    
}

function SchowajModal(){   
    modal.setAttribute('style', 'display: none');
}