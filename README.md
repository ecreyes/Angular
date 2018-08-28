# Angular

## Instalaciones.
Lo primero es instalar NodeJs para obtener el npm en la cmd de windows, una vez instalado se puede instalar TypeScript y Angular-Cli por npm.
* [NodeJs](https://nodejs.org/es/)
* [TypeScript](https://www.typescriptlang.org/)
* [Angular-Cli](https://cli.angular.io/)

Version de AngularCli:
```shell
ng -v
```
Version de NPM:
```shell
npm -v
```
Version Typescript:
```shell
tsc -v
```

## Creación del proyecto.
```shell
ng new my-app #crea una aplicación con AngularCli
ng serve #monta el servidor
```
En caso de mostrar algunas vulnerabilidades al crear la aplicación con AngularCli hacer:
```shell
npm audit fix
npm audit fix --force #cuando se termine el anterior
```

## Actualización de vulnerabilidades en package.json
En el package.json se debe añadir ` "hoek": "^5.0.3",` en la sección de dependencies.
Se debe ver así:
```typescript=
  "dependencies": {
    "@angular/animations": "^6.0.3",
    "@angular/common": "^6.0.3",
    "@angular/compiler": "^6.0.3",
    "@angular/core": "^6.0.3",
    "@angular/forms": "^6.0.3",
    "@angular/http": "^6.0.3",
    "@angular/platform-browser": "^6.0.3",
    "@angular/platform-browser-dynamic": "^6.0.3",
    "@angular/router": "^6.0.3",
    "core-js": "^2.5.4",
    "hoek": "^5.0.3",
    "rxjs": "^6.0.0",
    "zone.js": "^0.8.26"
  },
```
Luego hacer un npm install en la aplicación.

# Sintaxis.

## Variables.
En javascript las variables empezaban con `var`, pero en typescript se utiliza `let`, la ventaja de usar let es que la declaración de la variable es solo perteneciente al ambito o al scope.
```typescript
let nombre:string = "Eduardo";
let numero:number = 10;
let condicion:boolean = true;
let cualquiera:any; #podria ser number,boolean,string,array etc.
let arreglo:string[] = ["Hola","Mundo"];
let numeros:number[] = [1,2,3,4,5];
```
Para acceder a un arreglo hay que utilizar los indices, `arreglo[0],arreglo[1]` etc.

### Objetos.
Los objetos se declaran de la siguiente forma:
```typescript
let persona = {
  nombre: "Eduardo",
  apellido: "Reyes",
  pais: "Chile"
}
```
La forma de acceder a una propiedad de un objeto es:
```typescript
persona.nombre;
persona.apellido;
persona.pais;
```

### Concatenación de variables
```typescript
let nombre:string = "Eduardo";
let apellido:string = "Reyes";
let edad:number = 23;

let texto:string = `hola,${nombre} ${apellido}, su edad es: ${edad}`;
```
La ventaja de usar el `${}` es que permite ejecutar código dentro, podria utilizar un getNombe() y funcionaría, o hacer un 1+1.

## Funciones.
Recomendación, usar funciones de flecha.
```typescript
function activar(nombre:string){
  let mensaje:string;
  mensaje = `${nombre} activó la función`;
  console.log(mensaje)
}

activar("Eduardo");

function sumar(a:number,b:number){
  return a+b;
}
let numero:number = sumar(1,2);
console.log(numero);


let sum:number = function(a:number,b:number){
  return a+b;
}
console.log(sum(1,2));

let mensaje:string = function(texto:string){
  texto = texto.toUpperCase();
  return texto;
}

let mensaje2:string = (text:string) => {
  text = text.toUpperCase();
  return text;
}
```

## Interfaces

```typescript
interface Persona{
  nombre:string,
  apellido:string
}

let p1:Persona = {
  nombre = "Eduardo",
  apellido = "Reyes"
}

function enviarObjeto(obj:Persona){
  console.log(obj.nombre);
  console.log(obj.apellido);
}

enviarObjeto(p1);
```

