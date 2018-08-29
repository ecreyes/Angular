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
```typescript
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
```typescript
import { APP_ROUTING } from "./app.routes";
```
y en la sección imports colocar `APP_ROUTING`.

Para configurar las rutas de la aplicación deberemos crear una etiqueta `<router-outlet></router-outlet>`en el `app.component.html` donde queramos que se carguen las páginas que pidamos:
```typescript
<app-navbar></app-navbar>
<div class="container">
  <router-outlet></router-outlet>
</div>
```

## RouterLink y RouterLinkActive
El RouterLink reemplaza al href del html:
```typescript
<a class="nav-link" [routerLink]="['home']">Home</a>
```
El RouterLinkActive permite saber cual es la ruta activa, se coloca en un bloque padre de los links:
```typescript
<li class="nav-item" routerLinkActive="active">
    <a class="nav-link" [routerLink]="['home']">Home</a>
</li>
```

El `routerLink` va a recibir un arreglo que van a ser los parametros, por ejemplo si la ruta es /hola/1/2 deberia asignare ['hola','1','2'], estos nombres de la ruta vienen por el path del `app.routes.ts`

El `routerLinkActve` permite agregar algun parámetro a la class cuando la ruta está activa.

## Sub-rutas y router link.
Supongamos que se quiere generar la vista show de algun elemento, esta vista siempre se repite solo que cambia el contenido dependiendo del parametro de la url.
Por ejemplo `localhost/ninja/1`, aquí se ve que se esta pasando el parámetro id a la ruta.

Para lograr esto primero hay que generar un componente que va a tratar esta vista, luego hay que importar el componente en el `app.routes.ts` y se deberia agregar algo así:
```typescript
import { NombreComponent } from 'path';

{ path: 'ninja/:id', component: NombreComponent},
```
con esto ya tenemos el componente que va a responder a nuestras rutas del formato mencionado anteriormente.

Ahora se tiene que agregar un link donde este el elemento que se desea mostrar:
```typescript
<a [routerLink]="['/ninja',ninja.id]" class="btn btn-outline-dark btn-block">Ver más</a>
```
El `/` al comienzo de `/ninja` indica que la ruta va a comenzar desde ahi, si no se coloca ese / la ruta podria quedar algo asi `localhost/algo/ninja/1`, donde ese algo viene de la ruta del componente donde se esta mandando a llamar el link.

### Sub-rutas forma código.
se importa el router en el componente que maneja el "show" y se asigna en el constructor:
```typescript
import { Router } from "@angular/router";

constructor(private _router:Router)
```
Con esto ya se puede usar la variable `_router` en cualquier parte de la clase.
En la función llamada desde el html con eventos`()` va a utilizar el _router de la siguiente forma:
```typescript
this._router.navigate(['/ninja',id]);
```
El navigate recibe un arreglo de la misma forma que el router link, aqui se supone que el evento envía un id hacia la función y está función le pasa el valor al navigate.

## Recibir parámetros del URL.
Como se mencionó anteriormente va a existir un componente que va a ser como un show, este componente va a ser el encargado de recibir los parametros del url.

Para recibir los parametros se debe importar en el componente el `ActivatedRoute`:
```typescript
import { ActivatedRoute } from "@angular/router";
```
Para usar el ActivatedRoute al igual que los servicios, este se debe asignar en el constructor
```typescript
constructor(private _activatedRoute:ActivatedRoute)
```
Ahora para utilizar los parametros se debe escribir:
```typescript
    _activatedRoute.params.subscribe(params =>{
      console.log(params);
    });
```
El `params => {}` es una función de flecha, lo que interesa es el `params` que va a ser la variable que va a contener los parametros.

Al observar los parametros en el console.log se puede ver que está el atributo id,ahora solo hay que mostrarlo con `console.log(params.id)` o `console.log(params['id'])`, ambos dan el mismo resultado.

Este id se utiliza para recuperar el objeto,se debe implementar algun método getObjetoById(id:number),pasar el params.id a ese método y recuperar el objeto.
Obviamente este método tiene que estar en el servicio y el servicio debe ser importado en el componente...


## Servicios
Se debe crear una carpeta `services` en `app` y crear un servicio de la forma `nombreservicio.service.ts`,
dentro de este archivo debe ir lo siguiente:
```typescript
import { Injectable } from '@angular/core';

@Injectable()
export class NombreService {
    constructor(){
        console.log("servicio listo para usar!");
    }
}
```
Con esto el servicio esta creado pero aun no se utiliza.

Para que Angular reconozca que se creó un servicio hay que importarlo en el `app.module.ts` y agregarlo a `providers`
```typescript
import {NombreService} from "path";

  providers: [
    NombreService,
  ],
```
Los servicios son utilizados por `componentes` por lo que tienen que ser importados en el `component.ts` que desee usar el servicio.
```typescript
import { NombreService } from "path";
```
Luego de estar importado se tiene que usar,ya sea en el constructor() o en el ngOnInit() de la forma:
```typescript
constructor(private _nombreService: NombreService)
```
El constructor se ejecutará primero que el ngOnInit().

## Enviar parametros de inputs a funciones por eventos.
Si tuvieramos un input en html y nos gustaría agregar una referencia al input para luego obtener el valor se utiliza el `#nombre`.
Por ejemplo:
```typescript
<input class="form-control mr-sm-2" type="search" placeholder="Buscar Ninja" aria-label="Buscar" #Input>
```
En el ejemplo estamos referenciando en input con el #Input.
Ahora si quisieramos obtener el valor de este input se utiliza el `Input.value` ,notar que el Input.value viene del #Input, no del <input>.

ahora faltaría enviar ese parametro a una función, esto se hace con un evento de la siguiente forma:
```typescript
<input class="form-control mr-sm-2" type="search" placeholder="Buscar Ninja" aria-label="Buscar" (keyup.enter)="buscarNinja(Input.value)" #Input>
```
Notar que lo que interesa es el `(keyup.enter)="buscarNinja(Input.value)"`, el evento es `(keyup.enter)` y la funcion es `buscarNinja` que se le esta pasando como parametro el valor del input.

El evento (keyup.enter) es cuando se presiona enter en el teclado.
El evento (click) es cuando se hace click con el mouse.