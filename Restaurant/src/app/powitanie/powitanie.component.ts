import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-powitanie',
  templateUrl: './powitanie.component.html',
  styleUrls: ['./powitanie.component.css']
})
export class PowitanieComponent {
  
  router: Router;

  constructor(private _router:Router){
    this.router = _router;
  }
  
  EkranGlowny(){
    this.router.navigate(['/dania']);
  }
}
