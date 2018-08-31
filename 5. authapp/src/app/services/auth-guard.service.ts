import { Injectable } from '@angular/core';
import { Router,ActivatedRouteSnapshot,RouterStateSnapshot,CanActivate } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private _auth:AuthService) { }

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
}
