# Fundamentos

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

## Componentes

### ¿Cómo mostrar el contenido de un atributo en el html del componente?
Los atributos van a estar dentro de la class respectiva, por ejemplo:
```=typescript
export class NombreComponent{
    nombre:string = "Eduardo";
}

Si se desea mostrar esta variable en el html del componente se utiliza `{{nombre}}`
```