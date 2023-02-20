let submitBtn = document.querySelector('#submitBtn');
let entryName = document.querySelector('#name');
let phone = document.querySelector('#phone');
let entries = document.querySelector('#entries');

submitBtn.addEventListener('click', addEntry);

function addEntry(event){
    event.preventDefault();
    if(!IsNameValid(entryName.value)){
        return;
    }
    if(!IsPhoneValid(phone.value))
    {
        return;
    }

    addNewEntry();
    ResetForm();
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

function addNewEntry(){
    let newEntry = document.createElement('div');
    let data = document.createElement('div');
    let _name = document.createElement('h3');
    let _phone = document.createElement('p');
    let deleteEntry = document.createElement('button');

    newEntry.className = 'entry';
    data.className = 'entryData';
    deleteEntry.className = 'deleteBtn';

    deleteEntry.innerHTML = '<i class="icon-trash"></i>';
    deleteEntry.addEventListener('click', removeEntry);

    _name.textContent = entryName.value;
    _phone.textContent = phone.value;
    
    data.appendChild(_name);
    data.appendChild(_phone);

    newEntry.appendChild(data);
    newEntry.appendChild(deleteEntry);
    entries.appendChild(newEntry);
}

function ResetForm(){
    entryName.value = "";
    phone.value = "";
}

function removeEntry(){
    this.parentElement.remove();
}

