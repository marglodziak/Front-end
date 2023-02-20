import { Component, OnInit } from '@angular/core';
import { DaneDoKoszykaService } from '../dane-do-koszyka.service';
import { OdczytZBazyService } from '../odczyt-zbazy.service'
import { DanieComponent } from '../danie/danie.component';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-strona-glowna',
  templateUrl: './strona-glowna.component.html',
  styleUrls: ['./strona-glowna.component.css']
})
export class StronaGlownaComponent{
  title = 'Restauracja';
  przelicznik = 1 / 4.4;
  waluta = "$";
  USDNieaktywne = true;
  EURNieaktywne = false;

  maxCena = 150;
  minCena = 0;
  ocena = -1;
  sumaDan: number[] = [];
  daniaWKoszyku: DanieComponent[] = [];
  brakProduktow = false;
  daneZBazy: DanieComponent[] | undefined;
  odczytaneDania: DanieComponent[] = [];
  dataFiltered = this.odczytaneDania;
  baza: OdczytZBazyService;
  //canActivate =  [AuthGuard] (implements CanActive, własna metoda zwracająca True, False)

  constructor(private danieDoKoszyka:DaneDoKoszykaService, bazaDanych: OdczytZBazyService){
    this.baza = bazaDanych;
    this.baza.serwis.subscribe(d => {
      this.odczytaneDania = d;
      this.maxCena = d.map(d => d.cena).reduce((a,b) => Math.max(a,b));
      this.minCena = d.map(d => d.cena).reduce((a,b) => Math.min(a,b));    
    });
  };

  setCurrency(currency:string){
    if(currency == "USD"){
      this.przelicznik = 1 / 4.4;
      this.waluta = "$";
      this.USDNieaktywne = true;
      this.EURNieaktywne = false;
    }
    else{
      this.przelicznik = 1 / 4.7;
      this.waluta = "€";
      this.EURNieaktywne = true;
      this.USDNieaktywne = false;
    }
  }

  ZwiekszLiczbeDan(danie: DanieComponent){
    if(this.daniaWKoszyku.filter(d => d.nazwa == danie.nazwa).length > 0){
      let index = this.daniaWKoszyku.findIndex(d => d.nazwa==danie.nazwa);
      this.sumaDan[index] += danie.liczbaZamowionych;
    }
    else{
      this.daniaWKoszyku.push(danie);
      this.sumaDan.push(danie.liczbaZamowionych);
    }    
  }

  WyslijDania(){
    this.danieDoKoszyka.DodajDanie(this.daniaWKoszyku, this.sumaDan);
  }

  UsunDanie(target:DanieComponent){
    this.baza.UsunDanie(target);
  }

  AktualizujFiltry(parametry: any[]){
    this.dataFiltered = this.odczytaneDania.filter(danie =>
           danie.cena <= (parametry[0] != 0 ? parametry[0] : this.maxCena)
        && danie.kuchnia == (parametry[1] != "wszystkie" ? parametry[1] : danie.kuchnia)
        && danie.typ == (parametry[2] != "wszystkie" ? parametry[2] : danie.typ)
        && (parametry[3].length > 0 ? parametry[3].includes(danie.ocena) : true)
        );

    this.brakProduktow = this.dataFiltered.length == 0;
    
    if(!this.brakProduktow){
      this.maxCena = this.dataFiltered.map(d => d.cena).reduce((a,b) => Math.max(a,b));
      this.minCena = this.dataFiltered.map(d => d.cena).reduce((a,b) => Math.min(a,b));
    }
  }
}
