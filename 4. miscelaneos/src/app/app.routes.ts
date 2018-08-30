//se importa el router
import { Routes, RouterModule } from '@angular/router';
//se importa un componente a utilizar
import { HomeComponent } from "./components/home/home.component";
import { UsuarioComponent } from "./components/usuario/usuario.component";

//rutas hijas
import { USUARIO_ROUTES } from './components/usuario/usuario.routes';

//rutas hijas

/*
 En el path: se inidica el url que va a utilizar
 y en el component: el componente que utilizará ese path.
 En caso de que no se encuentre la ruta, se utiliza
 el path:'**' que va a redirigir al componente home.
 */
const APP_ROUTES: Routes = [
    { path: 'home', component: HomeComponent },
    {
        path:'usuario/:id',
        component: UsuarioComponent,
        children:USUARIO_ROUTES
    },
    { path: '**', pathMatch: 'full', redirectTo: 'home'}
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);