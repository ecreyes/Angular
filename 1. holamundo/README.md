# Fundamentos
```shell
/e2e #para pruebas unitarias
/node_modules #paquetes instalados del package.json -> npm_install
/src #aplicacion
README.md
package.json #dependencias a instalar
tsconfig.json #archivo de configuración de typescript
```

## Estructura del proyecto.
El contenido del proyecto se encontrará en la carpeta `src`.
En el archivo `index.html` se puede observar que hay un selector `<app-root></app-root>`, este selector sirve para indicar que en esa parte del html se va a insertar un código html de un componente.

Los componentes estan en la carpeta `src/app`.
En `app.component.ts` se declara el componente, aquí se puede ver lo siguiente:
```typescript=
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
}
```
* selector: indicará como se utilizara este componente en el html.
* templateUrl: El html que pertenece al componente, lo que se va a insertar en la página cuando se utilice el selector.
* styleUrls: el css a utilizar en el templateUrl.

En `class` se va a definir la lógica del componente, ya sea atributos, métodos etc.
### app.module.ts
Es uno de los archivos más importantes del proyecto,en este archivo se declaran:
* declarations: todos los componentes de la aplicación.
* imports: son como configuraciones a utilizar.
* providers(servicios): archivo compartido a lo largo de la aplicación
* bootstrap: la página que se va a iniciar al inicio
```=typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## Componentes

Crear componentes desde terminal:
```shell
ng g c nombreComponente
```
El comando significa `ng generate component nombreComponente`, tambien se podría dar una ubicacion `carpeta/nombreComponente`
Este comando crea los archivos de css,html,ts,spec y actualiza el app.module con el componente.


### ¿Cómo mostrar el contenido de un atributo en el html del componente?
Los atributos van a estar dentro de la class respectiva, por ejemplo:
```=typescript
export class NombreComponent{
    nombre:string = "Eduardo";
}

Si se desea mostrar esta variable en el html del componente se utiliza `{{nombre}}`
```