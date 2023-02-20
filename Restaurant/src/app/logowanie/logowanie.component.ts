import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AutentykacjaService } from '../autentykacja.service';


@Component({
  selector: 'app-logowanie',
  templateUrl: './logowanie.component.html',
  styleUrls: ['./logowanie.component.css']
})
export class LogowanieComponent {

  autho: AutentykacjaService;
  private router: Router;

  constructor(auth: AutentykacjaService, private _router:Router){  
    this.autho = auth;
    this.router = _router;
  }

  SprawdzDaneLogowania(event: any){
    let login: string = event.target.parentElement.querySelector("#login").value;
    let haslo: any = event.target.value;
    this.autho.login(login, haslo).subscribe(() => {alert("Zalogowano!"); this.router.navigate(['/dania'])});
  }
}
