# Pipes
En la documentación de Angular se pueden encontrar los pipes,en la siguiente url esta la Api de angular y se pueden filtrar los pipes.
[AngularAPI](Angular Apihttps://angular.io/api)

Los pipes sirven para modificar la vista de las variables sin entrar en mayor código.
La sintaxis para usar un pipe es:
```typescript
{{variable | pipe}}
```
Tambíen a los pipes se les puede pasar parametros:
```typescript
{{variable | pipe:params}}
```

## uppercase y lowercase
```typescript
{{variable | uppercase}}
{{variable | lowercase}}
```

## slice (cortar cosas)
`slice:comienzo:fin` el fin es opcional.
Funciona con variables,arreglos,etc.
```typescript
{{variable | slice:3}} #que muestre del 4 en adelante
{{variable | slice:0:3}} #que muestre del 0 al 2
```
También se puede usar en el ciclo for:
```typescript
<ul>
    <li *ngFor="let item of arreglo | slice:5:20">{{item}}</li>
</ul>
```

## decimal
Se encarga de entregar un formato a los números.
El formato es el siguiente `{minIntegerDigits}.{minFractionDigits}-{maxFractionDigits}.`, tiene que ser un string por ejemplo `'2.1-4'`
* minIntegerDigits: The minimum number of integer digits before the decimal point. Default is 1.
* minFractionDigits: The minimum number of digits after the decimal point. Default is 0.
* maxFractionDigits: The maximum number of digits after the decimal point. Default is 3.

se utiliza como:
```typescript
{{variable | number:num.num--num}}
```
si se utiliza solo:
```typescript
{{variable | number}}
```
se muestra con 3 digitos despues de la coma.

## Json
Para mostrar un json simplemente se hace los siguiente:
```
<pre>
{{variable| json}}
</pre>
```

## ¿Cómo hacer un pipe?
Dentro de la carpeta `app` se debe crear una nueva carpeta llamada `pipes`.
Ahora dentro de esta carpeta los archivos deben ser del siguiente formato: `nombre.pipe.ts`
Dentro del archivo se ingresa este código (generado con ngpipe->tab)
```typescript
import { Pipe, PipeTransform } from '@angular/core';
//nombre del pipe
@Pipe({name: 'name'})
export class NamePipe implements PipeTransform {
    /*función que retorna el valor aplicado el pipe.
    value es la variable que esta utilizando el pipe
    {{variable || NamePipe}},lo que se esta pasando es variable*/
    transform(value: any): any {
        return "algo";
    }
    /* si se llegase a utilizar parametros en el pipe
    del estilo NamePipe:1:2
    se tendria que agregar args dependiendo del numero de parametros
    transform(value: any,arg1,arg2): any {
        return "algo";
    }
    */
}
```
Obviamente la lógica del pipe esta dentro del transform....

Ahora hay que decirle a angular que hemos creado un pipe, esto se hace en el `app.module.ts`
Primero se importa:
```typescript
import { NombrePipe } from "path";
```
y luego se agrega en `declarations` junto a los componentes.
```typescript
  declarations: [
    AppComponent,
    NombrePipe,
  ],
```