//se importa el router
import { Routes, RouterModule } from '@angular/router';
//se importa un componente a utilizar
import { HomeComponent } from "./components/home/home.component";
import { AboutComponent} from "./components/about/about.component";
import { NinjasComponent} from "./components/ninjas/ninjas.component";
import { NinjaComponent } from './components/ninja/ninja.component';
import { BuscarComponent } from "./components/buscar/buscar.component";

/*
 En el path: se inidica el url que va a utilizar
 y en el component: el componente que utilizará ese path.
 En caso de que no se encuentre la ruta, se utiliza
 el path:'**' que va a redirigir al componente home.
 */
const APP_ROUTES: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'ninjas', component: NinjasComponent },
    { path: 'ninja/:id', component: NinjaComponent},
    { path: 'buscar/:texto', component: BuscarComponent},
    { path: '**', pathMatch: 'full', redirectTo: 'home'}
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);