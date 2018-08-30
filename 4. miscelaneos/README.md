# Miscelaneos

## ngStyle
Esta directiva permite cambiar el `style` de un atributo html.
La forma de usar es la siguiente:
```typescript
<p [ngStyle]="{'font-size':'20px'}"></p>
```
Tambien si es que existiera una variable de tipo number y se quiere concatenar:
```typescript
<p [ngStyle]="{'font-size':variable+'px'}"></p>
```
igualmente se podria agregar mas de un campo...
```typescript
<p [ngStyle]="{'font-size':'20px','color':'red'}"></p>
```

## ngClass
El ngClass permite modificar la class de un atribulo html, la sintaxis es la siguiente:
```typescript
//esto obviamente va dentro de algun div,p,h1 etc
[ngClass]="codigo js"
```
Suponiendo que hay una variable `alerta:string = "alert-danger";` en el componente:
```typescript
<div [ngClass]="alerta" class="alert" role="alert">
    A simple primary alert—check it out!
</div>
<button class="btn btn-success"(click)="alerta = 'alert-success'">Success</button>
<button class="btn btn-danger" (click)="alerta = 'alert-danger'">Danger</button>
```
Tambien se puede utilizar ngClass con objetos de la forma:
```typescript
[ngClass]="{'class': true}"
```
si es true se va a añadir la class, si es false no.

Suponiendo que hay `valor:boolean = true` en el componente:
```typescript
<h3 [ngClass]="{'text-danger': valor,'text-info':!valor}">
  Hola mundo
</h3>
<button class="btn" (click)="valor=!valor" [ngClass]="{'btn-danger': valor,'btn-info':!valor}">Cambiar</button>
```

## Procesos Asincronos.
En el componente tenemos:
```typescript
loading:boolean = false;

ejecutar(){
    this.loading = true;
    setTimeout(()=>{
      this.loading = false;
    },3000);
  }
```
En la vista:
```typescript
<h3>
  Proceso Asíncrono
</h3>
<button class="btn btn-primary" (click)="ejecutar()" [ngClass]="{'disabled': loading}">
  <i class="fa" [ngClass]="{'fa-save': !loading,'fa-refresh fa-spin':loading}"></i>
  <span *ngIf="!loading">Guardar cambios</span>
  <span *ngIf="loading">Espere por favor</span>
</button>
```

## Directivas personalizadas.
En app se crea una nueva carpeta llamada `directives`,ahora usando el AngularCLI:
```shell
ng g d directives/nombre
```
La directiva se trabaja en el `nombre.directive.ts`, su contenido es:
```typescript
import { Directive } from '@angular/core';

@Directive({
  selector: '[appNombre]'
})
export class NombreDirective {

  constructor() { 
    console.log("Directiva llamada");
  }

}
```
y ahora en el atributo se agrega el `appNombre`,por ejemplo:
```typescript
    <p appNombre>
        Hola mundo!
    </p>
```
Para trabajar el atributo html, en este caso el `p` y todo su contenido, hay que importar el `ElementRef` y asignarlo en el constructor:
```typescript
import { Directive,ElementRef } from '@angular/core';

@Directive({
  selector: '[appNombre]'
})
export class NombreDirective {

  constructor(private _el:ElementRef) { 
    console.log("Directiva llamada");
  }

}
```
El `_el` se va a encargar de manejar este atributo que contiene la directiva, si se desea cambiar el color por ejemplo:
```typescript
import { Directive,ElementRef } from '@angular/core';

@Directive({
  selector: '[appNombre]'
})
export class NombreDirective {

  constructor(private _el:ElementRef) { 
    console.log("Directiva llamada");
    //_el.nativeElement.style.backgroundColor = "Yellow";
  }

}
```

Ahora para estar pendiente de lo que pasa con este atributo hay que importar el `HostListener`, este no hay que asignarlo en el constructor, hay que usar un método:
```typescript
import { Directive,ElementRef,HostListener } from '@angular/core';
//dentro del '' hay que colocar lo que se quiere escuchar
//luego se le puede colocar un alias mouseEntro
@HostListener('mouseenter') mouseEntro(){
  this._el.nativeElement.style.backgroundColor = "Yellow";
}
@HostListener('mouseleave') mouseSalir(){
  this._el.nativeElement.style.backgroundColor = "";
}
```

Ahora suponiento que se desea enviar un parámetro desde el p:
```typescript
    <p [appNombre]="'orange'">
        Hola mundo!
    </p>
```
Para recibir este parámetro hay que hacer otro import:
```typescript
import { Directive,ElementRef,HostListener,Input } from '@angular/core';
```
El input tampoco se declara en el constructor.
```typescript
//de la directiva va a venir un parametro de tipo string, parametro va a ser la variable que guardará el orange.
@Input("appNombre") parametro:string;
```
Generalmente los input se declaran arriba del constructor.
De esta forma se asigna en:
```typescript
  @HostListener('mouseenter') mouseEntro(){
    this._el.nativeElement.style.backgroundColor = this.parametro;
  }
```

## Rutas y rutas hijas.
Supongamos que se tiene el ruteo tradicional:
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
Ahora se quiere generar un componente que va a tratar todas las rutas de tipo `usuario/:id`, esto es bastante sencillo ya que solamente se agrega el path y el componente que trata el path.

Pero que pasaría si ahora se quiere generar nuevos componentes que van a surgir a traver de la ruta `usuario/:id`, por ejemplo:
* `usuario/:id/nuevo`
* `usuario/:id/editar`
* `usuario/:id/detalle`
esas tres rutas se activan dentro de la ruta `usuario/:id` con botones...
### ¿Entonces cómo indicar que estas rutas hijas vienen de `usuario/:id` en el router?
Nota: Se tiene que crear el componente padre y luego los componentes hijos dentro de la carpeta del componente padre, es decir:
* components/usuario: padre
* components/usuario/usuarioNuevo: hijo
* components/usuario/usuarioEditar: hijo
* components/usuario/usuarioDetalle: hijo
Ahora cómo indicar las rutas hijas?
Esto se hace mediante el `children: []`
```typescript
const APP_ROUTES: Routes = [
    { path: 'home', component: HomeComponent },
    {
        path:'usuario/:id',
        component: UsuarioComponent,
        children:[
            { path: 'nuevo', component: UsuarioNuevoComponent },
            { path: 'editar', component: UsuarioEditarComponent },
            { path: 'detalle', component: UsuarioDetalleComponent },
            { path: '**', pathMatch: 'full', redirectTo: 'nuevo'}
        ]
    },
    { path: '**', pathMatch: 'full', redirectTo: 'home'}
];
```
Ahora dentro de la vista de `usuario:id`:
```typescript
<div class="row">
  <div class="col-md-12 text-center">
    <div class="btn-group" role="group" aria-label="Basic example">
      <button
       type="button" class="btn btn-outline-success" routerLinkActive="active"
        [routerLink]="['nuevo']"> Nuevo</button>
      <button type="button" class="btn btn-outline-success" routerLinkActive="active"
       [routerLink]="['editar']">Editar</button>
      <button type="button" class="btn btn-outline-success" routerLinkActive="active"
       [routerLink]="['detalle']">Detalle</button>
    </div>
  </div>
</div>
<router-outlet></router-outlet>
```
En el código anterior se puede ver la vista de `usuario/:id` que básicamente esta va a contener los botones para cambiar a vistas de componentes hijos,¿dónde se van a rederizar estas vistas?, abajo en el `<router-outlet></router-outlet>` 

### PROBLEMA--->separar rutas hijas.
Si el proyecto crece, este va a tener demasiadas rutas en un solo archivo y no es lo ideal, lo mejor es separar las rutas de los hijos en un nuevo archivo dentro del componente padre.

Se crea el archivo `usuario.routes.ts` dentro del componente(carpeta) `usuario`,este archivo debe contener:
```typescript
//se importa el router
import { Routes} from '@angular/router';
//se importa un componente a utilizar
import { UsuarioNuevoComponent } from "./usuario-nuevo/usuario-nuevo.component";
import { UsuarioEditarComponent } from "./usuario-editar/usuario-editar.component";
import { UsuarioDetalleComponent } from "./usuario-detalle/usuario-detalle.component";

export const USUARIO_ROUTES: Routes = [
    { path: 'nuevo', component: UsuarioNuevoComponent },
    { path: 'editar', component: UsuarioEditarComponent },
    { path: 'detalle', component: UsuarioDetalleComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'nuevo'}
];
```
Basicamente es lo mismo que estaba en el children del routes global.
Ahora en el `app.routes.ts` se importan estas rutas y se asigna en el children:
```typescript
import { USUARIO_ROUTES } from './components/usuario/usuario.routes';
const APP_ROUTES: Routes = [
    { path: 'home', component: HomeComponent },
    {
        path:'usuario/:id',
        component: UsuarioComponent,
        children:USUARIO_ROUTES
    },
    { path: '**', pathMatch: 'full', redirectTo: 'home'}
];
```
Bastante fácil.
