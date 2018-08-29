import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { NinjasService } from "../../services/ninjas.service";

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html'
})
export class BuscarComponent implements OnInit {
  ninjas:any[] = [];
  texto:string;
  constructor(private _activatedRoute:ActivatedRoute,
              private _ninjasService:NinjasService) {
    _activatedRoute.params.subscribe(params =>{
      this.ninjas = _ninjasService.buscarNinja(params.texto);
      this.texto = params.texto;
    });
   }

  ngOnInit() {
  }

}
