import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//pipes
import { CapitalizadoPipe } from "./pipes/capitalizado.pipe";
import { ContrasenaPipe } from "./pipes/contrasena.pipe";

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    CapitalizadoPipe,
    ContrasenaPipe,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
