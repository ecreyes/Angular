import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//routes
import { APP_ROUTING } from "./app.routes";

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { NinjasComponent } from './components/ninjas/ninjas.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AboutComponent,
    NinjasComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTING 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
