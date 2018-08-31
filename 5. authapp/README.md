# Authapp

## Middleware para restringir acceso a páginas. (canActivate- AuthGuard)
Nota: Se está utilizando Auth0.
Supongamos que solo queremos entrar a la url `localhost/protegida` cuando se inicie sesión.
Para esconder la url hay que agregar un `*ngIf="isAuthenticated()"` con el método :
```typescript
  isAuthenticated(){
    return this._auth.isAuthenticated();
  }
```
Pero esto no es suficiente porque si el usuario conoce la url podría acceder.

Hay que crear un servicio:
```typescript
ng g s services/authGuard
```
Este servicio se tiene que importar en el `app.module.ts` en providers.

Ahora en el servicio hay que implementar una función que retorne verdadero o falso.
Hay que importar lo siguiente:
```typescript
import { Router,ActivatedRouteSnapshot,RouterStateSnapshot,CanActivate } from "@angular/router";
```
ahora hay que implementar el canActivate
```typescript
export class AuthGuardService implements CanActivate {

  constructor() { }

  canActivate(){
    return true;
  }
}
```
Ahora hay que utilizar el servicio de authService para ver si la persona esta autenticada, por lo que hay que importar este servcio.
```typescript
  canActivate(next:ActivatedRouteSnapshot,state:RouterStateSnapshot){
    console.log(next);
    if(this._auth.isAuthenticated()){
      console.log("Paso el Guard");
      return true;
    }else{
      console.log("Bloqueado por el Guard");
      return false;
    }
  }
```
Ahora como utilizar este Guard.
Hay que importar el servicio del authGuard en el archivo de rutas y colocar:
```typescript
    { 
        path: 'protegida',
        component: ProtegidaComponent,
        canActivate:[AuthGuardService]
     },
```
El canActivate se va a encargar de que si no se cumple todo lo que esta dentro del arreglo, no se pueda acceder al sitio, notar que se colocó AuthGuardService de una por que implementa la interfaz canActivate.