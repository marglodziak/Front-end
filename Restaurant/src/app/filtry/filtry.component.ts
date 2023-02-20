import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DanieComponent } from '../danie/danie.component';
import { OdczytZBazyService } from '../odczyt-zbazy.service';

@Component({
  selector: 'app-filtry',
  templateUrl: './filtry.component.html',
  styleUrls: ['./filtry.component.css']
})

export class FiltryComponent implements OnInit{
  daneDoFiltrowania: DanieComponent[] = [];
  @Input() przelicznik:number = 0;
  @Output() filtrEvent = new EventEmitter();

  danePrzefiltrowane = this.daneDoFiltrowania;
  ceny: number[] = [];
  kuchnie: string[] = [];
  kategorie: string[] = [];
  oceny: number[] = [];
  cena: number = 0;
  kuchnia: string = "wszystkie";
  kategoria: string = "wszystkie";
  bazaDanych: OdczytZBazyService;

  constructor(bazaDanych: OdczytZBazyService){  
    this.bazaDanych = bazaDanych;
  }

  ngOnInit(): void {
    this.bazaDanych.serwis.subscribe(d => {
      this.daneDoFiltrowania = d;
      this.danePrzefiltrowane = d;
      this.ceny = this.AktualizujCeny();
      this.kuchnie = this.AktualizujKuchnie();
      this.kategorie = this.AktualizujKategorie();});    
  }  

  FiltrujCene(event:any){
    this.cena = this.ceny[event.target.value-1];
    this.kuchnie = this.AktualizujKuchnie();
    this.kategorie = this.AktualizujKategorie();
    this.SendEvent();
  }

  FiltrujKuchnie(event:any){
    this.kuchnia = event.target.value;
    this.ceny = this.AktualizujCeny();
    this.kategorie = this.AktualizujKategorie();
    this.SendEvent();
  }

  FiltrujKategorie(event:any){
    this.kategoria = event.target.value;
    this.ceny = this.AktualizujCeny();
    this.kuchnie = this.AktualizujKuchnie();
    this.SendEvent();
  }  

  FiltrujOcene(event:any){
    if(event.target.checked){
      this.oceny.push(Number(event.target.value));
    }
    else{
      this.oceny = this.oceny.filter(d => d != event.target.value);
    }
    
    this.SendEvent();
  }  

  SendEvent(){
    let parametry = [this.cena, this.kuchnia, this.kategoria, this.oceny];
    this.bazaDanych.FiltrujBaze(parametry);
    this.filtrEvent.emit(parametry);
  }

  AktualizujCeny(){
    return this.daneDoFiltrowania
      .filter(d =>
              d.kuchnia == this.AktualnaKuchnia(d.kuchnia)
           && d.typ == this.AktualnaKategoria(d.typ)
           && (this.oceny.length > 0 ? this.oceny.includes(d.ocena) : true))
      .map(d => d.cena)
      .sort((a,b) => a-b);    
  }

  AktualizujKuchnie(){
    return this.Unique(this.daneDoFiltrowania
      .filter(d =>
              d.cena <= this.cena
           && d.typ == this.AktualnaKategoria(d.typ)
           && (this.oceny.length > 0 ? this.oceny.includes(d.ocena) : true))
      .map(d => d.kuchnia));
  }

  AktualizujKategorie(){
    return this.Unique(this.daneDoFiltrowania
      .filter(d =>
              d.cena <= this.cena
           && d.kuchnia == this.AktualnaKuchnia(d.kuchnia)
           && (this.oceny.length > 0 ? this.oceny.includes(d.ocena) : true))
      .map(d => d.typ));
  }

  Unique(tablica: any[]){
    return tablica.filter((x,i,a) => a.indexOf(x) === i)
  }

  AktualnaKuchnia(kuchnia:string) : string{
    return this.kuchnia != "wszystkie" ? this.kuchnia : kuchnia;
  }

  AktualnaKategoria(kategoria:string) : string{
    return this.kategoria != "wszystkie" ? this.kategoria : kategoria;
  }
}
