import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private _auth:AuthService) {
    _auth.handleAuthentication();
   }

  ngOnInit() {
  }

  login(){
    this._auth.login();
  }

  logout(){
    this._auth.logout();
  }

  isAuthenticated(){
    return this._auth.isAuthenticated();
  }
}
