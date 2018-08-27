# SPA

## Componentes
Crear una carpeta `components` en app.
Dentro de components crear una carpeta `shared` que va a contener las cosas que van a compartir los componentes por ejemplo: footer,navbar etc.
Por ejemplo:
```shell
ng g c components/shared/navbar
ng g c components/home
```

## Rutas
Las rutas servirán para navegar entre diferentes componentes o páginas sin refrescar el navegador web.
En la carpeta raiz de `app` hay que crear un archivo llamado `app.routes.ts` con el siguiente código:
```typescript=
//se importa el router
import { Routes, RouterModule } from '@angular/router';
//se importa un componente a utilizar
import { HomeComponent } from "./components/home/home.component";

/*
 En el path: se inidica el url que va a utilizar
 y en el component: el componente que utilizará ese path.
 En caso de que no se encuentre la ruta, se utiliza
 el path:'**' que va a redirigir al componente home.
 */
const APP_ROUTES: Routes = [
    { path: 'home', component: HomeComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'home'}
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
```
Luego de crear este archivo se debe importar en el `app.module.ts`
```typescript=
import { APP_ROUTING } from "./app.routes";
```
y en la sección imports colocar `APP_ROUTING`.

Para configurar las rutas de la aplicación deberemos crear una etiqueta `<router-outlet></router-outlet>`en el `app.component.html` donde queramos que se carguen las páginas que pidamos:
```typescript=
<app-navbar></app-navbar>
<div class="container">
  <router-outlet></router-outlet>
</div>
```

## RouterLink y RouterLinkActive
El RouterLink reemplaza al href del html:
```html
<a class="nav-link" [routerLink]="['home']">Home</a>
```
El RouterLinkActive permite saber cual es la ruta activa, se coloca en un bloque padre de los links:
```htmlmixed
<li class="nav-item" routerLinkActive="active">
    <a class="nav-link" [routerLink]="['home']">Home</a>
</li>
```

El `routerLink` va a recibir un arreglo que van a ser los parametros, por ejemplo si la ruta es /hola/1/2 deberia asignare ['hola','1','2'], estos nombres de la ruta vienen por el path del `app.routes.ts`

El `routerLinkActve` permite agregar algun parámetro a la class cuando la ruta está activa.
