import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ng-style',
  templateUrl: './ng-style.component.html'
})
export class NgStyleComponent implements OnInit {
  tamano:number = 40;
  constructor() { }

  ngOnInit() {
  }

  aumentar(){
    this.tamano = this.tamano +3;
  }
  disminuir(){
    this.tamano = this.tamano -3;
  }

}
