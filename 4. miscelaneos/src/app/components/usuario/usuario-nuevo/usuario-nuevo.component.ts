import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-usuario-nuevo',
  templateUrl: './usuario-nuevo.component.html'
})
export class UsuarioNuevoComponent implements OnInit {

  constructor(private _activatedRoute:ActivatedRoute) { 
      _activatedRoute.parent.params.subscribe(params =>{
        console.log(params);
      });
  }

  ngOnInit() {
  }



}
