import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {
  usuario:Object = {
    nombre: null,
    apellido: null,
    correo: null,
    pais:"",
    sexo:null,
    terminos:false,
  }

  paises = [
    {
      codigo:"CHI",
      nombre:"Chile"
    },
    {
      codigo:"ARG",
      nombre:"Argentina"
    },
    {
      codigo:"BRA",
      nombre:"Brasil"
    }
  ];
  constructor() { }

  ngOnInit() {
  }

  guardar(forma:NgForm){
    console.log("formulario posteado");
    console.log("NgForm: ",forma);
    console.log("Valor: ",forma.value)
  }

}
