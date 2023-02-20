import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DanieComponent } from './danie/danie.component';
import { FiltryComponent } from './filtry/filtry.component';
import { KoszykComponent } from '../koszyk/koszyk.component';
import { StronaGlownaComponent } from './strona-glowna/strona-glowna.component';

import { AngularFireModule } from "@angular/fire/compat"
import { environment } from 'src/environments/environment';
import { AngularFireDatabaseModule } from "@angular/fire/compat/database"

import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { LogowanieComponent } from './logowanie/logowanie.component';
import { FirebaseApp, FirebaseAppModule, FirebaseApps } from '@angular/fire/app';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';
import { PowitanieComponent } from './powitanie/powitanie.component';


const appRoutes: Routes = [
  { path: 'powitanie', component: PowitanieComponent},
  { path: 'dania', component: StronaGlownaComponent },
  { path: 'koszyk', component: KoszykComponent },
  { path: 'logowanie', component: LogowanieComponent },
  { path: '', redirectTo: 'powitanie', pathMatch:"full"},
  { path: '**', redirectTo: '', pathMatch:"full" }];

@NgModule({
  declarations: [
    AppComponent,
    DanieComponent,
    FiltryComponent,
    KoszykComponent,
    StronaGlownaComponent,
    LogowanieComponent,
    PowitanieComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FirebaseAppModule,
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
