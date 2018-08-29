import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { NinjasService } from "../../services/ninjas.service";

@Component({
  selector: 'app-ninja',
  templateUrl: './ninja.component.html'
})
export class NinjaComponent implements OnInit {
  private ninja:any = {};
  constructor(private _activatedRoute: ActivatedRoute,
    private _ninjasService: NinjasService) {
    _activatedRoute.params.subscribe(params => {
      this.ninja = _ninjasService.getNinjaById(params.id);
    });
  }

  ngOnInit() {
  }

  getNinja(){
    return this.ninja;
  }

}
