let treeUl = document.querySelector('#tree');
let listDiv = document.querySelector('#list');
let categories = [];
let itemsToShow = [];

fetch('http://localhost:3000/Produkty')
    .then(response => {
        if(response.ok)
            return response.json();
        return 'Bląd pliku Wejscie1';
    })
    .then(data => {
        CreateTree(data);
    });

fetch('http://localhost:3001/Produkty')
    .then(response => {
        if(response.ok)
            return response.json();
        return 'Bląd pliku Wejscie2';
    })
    .then(data => {
        CreateTree(data);
    });


function CreateTree(data){
    let UlToBeChanged;

    for (const category in data) {
        if(!treeUl.querySelector('#'+category)){
            categories.push(category);
            let capitalised = category[0].toUpperCase() + category.slice(1,);
            UlToBeChanged = CreateUl(capitalised);           
        }
        else{           
            UlToBeChanged = document.querySelector('#'+category);
        }

        for (const item of data[category])
            if(!(UlToBeChanged.querySelector('#'+item)))
                UlToBeChanged.appendChild(CreateLi(item))

        treeUl.appendChild(UlToBeChanged);   
    }
}

function CreateUl(name){
    let ul = document.createElement('ul');
    let wrapper = document.createElement('div');
    let iconDiv = document.createElement('div');
    let icon = document.createElement('i');
    let input = document.createElement('input');
    let text = document.createElement('span');
    
    ul.className = 'treeUl';
    ul.id = name.toLowerCase();
    wrapper.className = 'iconWrapper';
    iconDiv.className = "iconDiv";
    icon.className='icon-down-dir';
    input.type='checkbox';
    input.className = 'mainCheckBox';
    text.className = 'mainCategory'; 
    text.textContent = name;

    iconDiv.addEventListener('click', ShowSublists);
    input.addEventListener('change', CheckMajorSelection);

    iconDiv.appendChild(icon);
    wrapper.appendChild(iconDiv);
    wrapper.appendChild(input);
    wrapper.appendChild(text);

    ul.appendChild(wrapper);

    return ul;
}

function CreateLi(item){
    let li = document.createElement('li');
    let input = document.createElement('input');
    let text = document.createElement('span');

    li.className = 'treeLi';
    li.id = item;
    input.type = 'checkbox';
    input.className = 'checkbox';
    text.className = 'itemName'; 
    text.textContent = item;

    input.addEventListener('change', CheckMinorSelection);

    li.appendChild(input);
    li.appendChild(text);

    return li;
}

function ShowSublists(event){
    if(event.currentTarget.style.rotate == '-90deg' || !event.currentTarget.style.rotate){
        event.currentTarget.style.rotate = '0deg';
        let liNodes = event.currentTarget.parentNode.parentNode;

        for (const child of liNodes.children)
            if(child.nodeName !== 'DIV')
                child.style.display = 'block';               
    }        
    else{
        event.currentTarget.style.rotate = '-90deg';
        let liNodes = event.currentTarget.parentNode.parentNode;

        for (const child of liNodes.children)
            if(child.nodeName !== 'DIV')
                child.style.display = 'none';
    }        
}

function CheckMajorSelection(event){
    let ul = event.currentTarget.parentNode.parentNode;
    let value = this.checked;
    let children = ul.getElementsByClassName('checkbox');
    let names = ul.getElementsByClassName('itemName');

    for (const child of children)
        child.checked = value;

    for (const name of names) {
        if(value)
            itemsToShow.push(name);
        else
            itemsToShow = itemsToShow.filter(i => i != name);            
    }
    ShowItems();
}

function CheckMinorSelection(event){
    let ul = event.currentTarget.parentNode.parentNode;
    let child = ul.querySelector('.mainCheckBox');
    let childrenCheckboxes = [].slice.call(ul.getElementsByClassName('checkbox'));
    let name = event.currentTarget.parentNode.querySelector('.itemName');


    let res1 = childrenCheckboxes.every(c => c.checked == true);
    let res2 = childrenCheckboxes.every(c => c.checked == false);

    if(res1){
        child.indeterminate = false;
        child.checked = true;
    }
        
    else if(res2){
        child.indeterminate = false;
        child.checked = false;
    }
        
    else
        child.indeterminate = true;

    if(event.currentTarget.checked){
        itemsToShow.push(name);
    }
        
    else
        itemsToShow = itemsToShow.filter(i => i != name);
    
    ShowItems();
}

function ShowItems(){
    listDiv.innerHTML = '';
    itemsToShow = itemsToShow.filter((a,i,x) => x.indexOf(a) == i);
    let itemsToPrint = itemsToShow.map(i => i.textContent);
    
    for (const item of itemsToPrint) {
        let p = document.createElement('p');
        p.className = 'listItem';
        p.textContent = item;

        listDiv.appendChild(p);
    }
}