import { Component } from '@angular/core';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html'
})
export class BodyComponent {
  mostrar:boolean = false;
  frase:any = {
    mensaje: "Hola mundo!",
    autor: "Angular6"
  };

  personajes:string[] = ["Naruto","Sasuke","Minato","Kakashi"];
}
