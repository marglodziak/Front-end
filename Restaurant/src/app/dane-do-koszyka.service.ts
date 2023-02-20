import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DanieComponent } from './danie/danie.component';

@Injectable({
  providedIn: 'root'
})
export class DaneDoKoszykaService {

  daniaDoKoszyka: DanieComponent[] = [];
  serwis: BehaviorSubject<DanieComponent[]>;

  constructor() {
    this.serwis = new BehaviorSubject(this.daniaDoKoszyka);    
  }

  DodajDanie(dania: DanieComponent[], liczbyZamowionych: number[]){
    dania = dania.filter((x,i,a) => x.liczbaZamowionych = liczbyZamowionych[i]);
    this.daniaDoKoszyka = dania;
  }
}
