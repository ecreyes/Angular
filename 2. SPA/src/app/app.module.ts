import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//routes
import { APP_ROUTING } from "./app.routes";

//servicios
import {NinjasService} from "./services/ninjas.service";

//Componentes
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { NinjasComponent } from './components/ninjas/ninjas.component';
import { NinjaComponent } from './components/ninja/ninja.component';
import { BuscarComponent } from './components/buscar/buscar.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AboutComponent,
    NinjasComponent,
    NinjaComponent,
    BuscarComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTING 
  ],
  providers: [
    NinjasService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
