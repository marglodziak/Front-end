import { NgIfContext } from '@angular/common';
import { Component, EventEmitter, Input, Output} from '@angular/core';
import { DaneDoKoszykaService } from '../dane-do-koszyka.service';

@Component({
  selector: 'app-danie',
  templateUrl: './danie.component.html',
  styleUrls: ['./danie.component.css']
})

export class DanieComponent{
  @Input() nazwa: string = "";
  @Input() kuchnia = "";
  @Input() typ = "";
  @Input() skladniki: string[] = [];
  @Input() liczba = 0;
  @Input() cena = 0;
  @Input() opis = "";
  @Input() zdjecia: string[] = [];
  @Input() liczbaZamowionych = 0;
  @Input() przelicznik = 0;
  @Input() waluta = "";
  @Input() minCena = 0;
  @Input() maxCena = 0;
  @Input() ocena = -1;

  @Output() dodajDoKoszykaEvent = new EventEmitter();
  @Output() usunDanieEvent = new EventEmitter();

  zwiekszNieaktywny = false;
  zmniejszNieaktywny = true;

  constructor(private danieDoKoszyka:DaneDoKoszykaService){};

  IncreaseOrderNumber(): void{
    this.liczba -= 1;
    this.liczbaZamowionych += 1;

    if(this.liczba == 0)
      this.zwiekszNieaktywny = !this.zwiekszNieaktywny;

    if(this.liczbaZamowionych > 0)
      this.zmniejszNieaktywny = false;
    
  }

  DecreaseOrderNumber(): void{
    this.liczba += 1;
    this.liczbaZamowionych -= 1;

    if(this.liczba > 0)
      this.zwiekszNieaktywny = false;

    if(this.liczbaZamowionych == 0)
      this.zmniejszNieaktywny = true;
  }

  DodajDoKoszyka(){
    this.dodajDoKoszykaEvent.emit(this);
    this.liczbaZamowionych = 0;
  }

  UsunDanie(){
    this.usunDanieEvent.emit(this);
  }
}
