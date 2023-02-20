import { Component, OnInit, Output } from '@angular/core';
import { DaneDoKoszykaService } from '../app/dane-do-koszyka.service';
import { DanieComponent } from '../app/danie/danie.component';

@Component({
  selector: 'app-koszyk',
  templateUrl: './koszyk.component.html',
  styleUrls: ['./koszyk.component.css']
})
export class KoszykComponent implements OnInit {

  daniaWKoszyku: DanieComponent[] = [];
  kosztCalkowity = 0;
  lista = [[1,2,3], [3,4,6], [5,6,7]];
  ukryjModal = true;

  constructor(private daneDoKoszyka: DaneDoKoszykaService){ }
  
  ngOnInit(): void {
    this.daniaWKoszyku = this.daneDoKoszyka.daniaDoKoszyka;
    this.AktualizujKosztCalkowity();
  }

  UsunDanie(nazwa: string){
    let index = this.daniaWKoszyku.findIndex(d => d.nazwa == nazwa);
    console.log(index);
    this.daniaWKoszyku.splice(index, 1);
    this.AktualizujKosztCalkowity();
  }

  ZlozZamowienie(){
    this.ukryjModal = false;

    // Wyślij do bazy, aktualizacja historii, zmiana danych dostępnych dań
  }

  SchowajModal(){
    console.log("schowalem modal");
    this.ukryjModal = true;
  }

  AktualizujKosztCalkowity(){
    if(this.daniaWKoszyku.length == 0){
      this.kosztCalkowity = 0;
      return;
    }
    this.kosztCalkowity = this.daniaWKoszyku.map(d => this.Zaokraglij(d.cena, d.przelicznik, d.liczbaZamowionych)).reduce((a,b) => a+b);
  }

  Zaokraglij(cena: number, przelicznik: number, liczbaZamowionych: number){
    let cenaPrzeliczona = Number((cena*przelicznik).toFixed(2));
    return Number((cenaPrzeliczona*liczbaZamowionych).toFixed(2));
  }

}
