import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clases',
  templateUrl: './clases.component.html',
  styleUrls: ['./clases.component.css']
})
export class ClasesComponent implements OnInit {
  alerta:string = "alert-danger";
  valor:boolean = true;
  loading:boolean = false;
  disabled:any = "";
  constructor() { }

  ngOnInit() {
  }

  ejecutar(){
    this.loading = true;
    setTimeout(()=>{
      this.loading = false;
    },3000);
  }

}
