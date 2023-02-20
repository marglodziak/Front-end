let resetBtn = document.querySelector('#resetBtn');
let pass = document.querySelector('#password');
let repeat = document.querySelector('#repeat');
let errorDiv = document.querySelector('#errorMessage');
let lengthDiv = document.querySelector('.result.length');
let charsDiv = document.querySelector('.result.chars');
let capitalDiv = document.querySelector('.result.capital');
let digitsDiv = document.querySelector('.result.digits');
let eye1 = document.querySelector('#i1');
let eye2 = document.querySelector('#i2');

const properLength = "Hasło zawiera co najmniej 8 znaków.";
const properChars = "Hasło zawiera co najmniej 1 znak specjalny.";
const properCapital = "Hasło zawiera co najmniej jedną wielką i małą literę.";
const properDigits = "Hasło zawiera co najmniej jedną cyfrę.";


repeat.addEventListener('keyup', verifyPassword);
eye1.addEventListener('click', changeEye);
eye2.addEventListener('click', changeEye);
resetBtn.addEventListener('click', ResetForm);

function verifyPassword(event){
    if(event.key != "Enter")
        return;

    ResetStyle();
    event.preventDefault();
    if(pass.value !== (repeat.value || "")){
        showError("Hasła się nie zgadzają!");
        return;
    }

    if(pass.value.trim() == ""){
        showError("Hasło jest puste!");
        return;
    }

    errorDiv.innerHTML = '';
    CheckStrength();
}

function showError(msg){
    errorDiv.innerHTML = msg;
    repeat.setAttribute('style', 'border: 3px solid #ab0000');
    errorDiv.setAttribute('style', 'color: #ab0000');
}

function ResetStyle(){
    repeat.setAttribute('style', 'border: none;');
}

function CheckStrength(){
    let len = '<i class="icon-cancel"></i>';
    let cap = '<i class="icon-cancel"></i>';
    let special = '<i class="icon-cancel"></i>';
    let dig = '<i class="icon-cancel"></i>';

    if(pass.value.length > 8)
        len = '<i class="icon-ok"></i>';
    if(/[A-Z]+/.test(pass.value) && /[a-z]+/.test(pass.value))
        cap = '<i class="icon-ok"></i>';
    if(/[!@#$%^&*]+/.test(pass.value))
        special = '<i class="icon-ok"></i>';
    if(/[0-9]+/.test(pass.value))
        dig = '<i class="icon-ok"></i>';
    
    lengthDiv.innerHTML = len + properLength;
    capitalDiv.innerHTML = cap + properCapital;
    charsDiv.innerHTML = special + properChars;
    digitsDiv.innerHTML = dig + properDigits;
}

function IsNameValid(name){
    if(name === '' || name.trim() === ''){
        confirm('Nieprawidłowe nazwisko - brak danych.');
        return false;
    }

    if(/[^\p{L}\s-]/u.test(name.toLowerCase()))
    {
        confirm('Nieprawidłowe nazwisko - nieprawidłowe znaki.');
        return false;
    }

    let nameSplit = name.split(' ');
    for (const iterator of nameSplit) {
        if(iterator[0] !== iterator[0].toUpperCase())
        {
            confirm('Nieprawidłowe nazwisko - nie rozpoczyna się wielkimi literami.');
            return false;
        }
        
        if(iterator.includes('-')){
            let twoPartName = iterator.split('-');
            if(twoPartName[1].trim()[0] !== twoPartName[1].toUpperCase().trim()[0]){
                confirm('Nieprawidłowe nazwisko - drugi człon nazwiska nie rozpoczyna się wielką literą.');
                return false;
            }
        }
    }

    return true;
}

function IsPhoneValid(phone){
    phone = phone.replaceAll(/\s/g, '');
    if(/[^0-9\s+]+/.test(phone)){
        confirm('Nieprawidłowy format numeru - niepoprawne znaki.');
        return false;
    }

    if(!/^\+[0-9]{12}$/.test(phone) && !/^[0-9]{12}$/.test(phone) && !/^[0-9]{9}$/.test(phone)){
        confirm('Nieprawidłowa liczba cyfr.');
        return false;
    }    

    return true;
}

function ResetForm(){
    pass.value = '';
    repeat.value = '';
    errorDiv.innerHTML = '';

    ResetStyle();

    lengthDiv.innerHTML = '';
    capitalDiv.innerHTML ='';
    charsDiv.innerHTML = '';
    digitsDiv.innerHTML = '';
}

function changeEye(){
    if(this == eye1){
        if(eye1.className == "icon-eye-off"){
            eye1.className = 'icon-eye';
            pass.type = "password";
        }            
        else{
            eye1.className = 'icon-eye-off';
            pass.type = "text";
        }            
    }
    else{
        if(eye2.className == "icon-eye-off"){
            eye2.className = 'icon-eye';
            repeat.type = "password";
        }            
        else{
            eye2.className = 'icon-eye-off';
            repeat.type = "text";
        }            
    }    
}