import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { BehaviorSubject } from 'rxjs';
import { DanieComponent } from './danie/danie.component';

@Injectable({
  providedIn: 'root'
})
export class OdczytZBazyService {

  daneOdczytane: DanieComponent[] = [];
  daneFiltr: DanieComponent[] = [];
  serwis: BehaviorSubject<DanieComponent[]>;
  baza: AngularFireDatabase;
  refki: AngularFireList<DanieComponent>;

  constructor(private db: AngularFireDatabase) {
    this.baza = db;
    this.serwis = new BehaviorSubject(this.daneOdczytane);

    this.refki = db.list('dania');
    this.refki.valueChanges().subscribe(d => {this.serwis.next(d); this.daneOdczytane=d; this.daneFiltr = d});
  }

  FiltrujBaze(parametry: Array<any>){    
    this.serwis.next(this.daneFiltr.filter(d => d.cena <= parametry[0]));
  }

  UsunDanie(target:DanieComponent){
    if(confirm("Chcesz usunąć danie: "+target.nazwa+"?"))
      this.refki.remove(target.nazwa);      
  }

  SprawdzDaneLogowania(){
    
  }
}
