import { Directive,ElementRef,HostListener,Input } from '@angular/core';

@Directive({
  selector: '[appResaltado]'
})
export class ResaltadoDirective {
  @Input("appResaltado") parametro:string;

  constructor(private _el:ElementRef) { 
    console.log("Directiva llamada");
    //_el.nativeElement.style.backgroundColor = "Yellow";
  }

  @HostListener('mouseenter') mouseEntro(){
    this._el.nativeElement.style.backgroundColor = this.parametro;
  }

  @HostListener('mouseleave') mouseSalir(){
    this._el.nativeElement.style.backgroundColor = "";
  }


}
