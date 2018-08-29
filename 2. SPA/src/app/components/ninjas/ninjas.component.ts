import { Component, OnInit } from '@angular/core';
import { NinjasService } from "../../services/ninjas.service";

@Component({
  selector: 'app-ninjas',
  templateUrl: './ninjas.component.html'
})
export class NinjasComponent implements OnInit {
  ninjas:any[] = [];

  constructor(private _ninjasService: NinjasService) { }

  ngOnInit() {
    this.ninjas = this._ninjasService.getNinjas();
  }

}
