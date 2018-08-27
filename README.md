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