data = fetch('http://localhost:3000/cities')
    .then(response => {
        if(response.ok)
            return response.json();
        return 'Bląd';
    })
    .then(data => {
        let malopolska = data.filter(c => c.province == 'małopolskie').map(c => ' '+c.name);
        let dwaA = data.filter(c => (c.name.toLowerCase().match(new RegExp("a", "g")) || []).length == 2).map(c => ' '+c.name);
        let gestosc = data.sort((c1, c2) => c2.density - c1.density).map(c => c.name + ", gęstość: " + c.density)[4];
        let duze = data.filter(c => c.people >= 100000).sort((m1, m2) => m2.people-m1.people).map(c => ' ' + c.name+' City-' + c.people);
        let over80K = data.filter(c => c.people > 80000).map(c => c.name).length;
        let below80K = data.filter(c => c.people <= 80000).map(c => c.name).length;
        let wiecej80k = (over80K > below80K) + " " + over80K + "/" + below80K;
        let citiesP = data.filter(c => c.township.startsWith('P'));
        let avgArea = citiesP.map(c => c.area).reduce((a,b) => a+b) / citiesP.length;
        let powierzchnia = citiesP.map(c => ' '+c.name + ", powiat: " + c.township + " - " + c.area) + ", <p>średnia powierzchnia: " + avgArea + "<p>";
        let pomorskie = data.filter(c => c.province == 'pomorskie');
        let pomorskieOver5k = pomorskie.filter(c => c.people > 5000);
        let pomorskieLiczba = (pomorskieOver5k.length == pomorskie.length) + ", " + pomorskieOver5k.length + ' / ' + pomorskie.length;

        document.querySelector('#malopolskie').innerHTML ="<h3>Miasta w Małopolsce</h3>" + malopolska;
        document.querySelector('#dwaA').innerHTML = "<h3>Miasta z dwoma literami 'a'</h3>" + dwaA;
        document.querySelector('#piateGestosc').innerHTML = "<h3>Gęstość zaludnienia - piąte miasto</h3>" + gestosc;
        document.querySelector('#duzeMiasta').innerHTML = "<h3>Miasta powyżej 100 000 mieszkańców</h3>" + duze;
        document.querySelector('#miasta80k').innerHTML = "<h3>Liczby miast</h3>" + "Czy więcej powyżej 80000 mieszkańców: "+ wiecej80k;        
        document.querySelector('#sredniaPowierzchnia').innerHTML = "<h3>Miasta w powiatach na 'P'</h3>" + powierzchnia;
        document.querySelector('#pomorskie').innerHTML = "<h3>Pomorskie</h3>" + "Czy wszystkie miasta większe niż 5000: " + pomorskieLiczba;
    });