import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from "@angular/forms";
import { Observable } from 'rxjs';


@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {
  forma:FormGroup;
  usuario:any = {
    nombrecompleto:{
      nombre:"ragzer",
      apellido:"rtcw"
    },
    correo:"test@gmail.com",
    password1:"hola",
    password2:"hola"
  }

  constructor() {
    this.forma = new FormGroup({
      'nombrecompleto':new FormGroup({
        'nombre': new FormControl('',[Validators.required,Validators.minLength(5)]),
        'apellido': new FormControl('',[Validators.required,this.noHerrera])
      }),
      'usuario': new FormControl('',Validators.required,this.existeUsuario),
      'correo': new FormControl('',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      'password1':new FormControl('',Validators.required),
      'password2':new FormControl('')
    });

    this.forma.controls['password2'].setValidators([Validators.required,this.passwordiguales.bind(this.forma)]);
    //this.forma.setValue(this.usuario);
  }

  noHerrera(control:FormControl):{[s:string]:boolean}{
    if(control.value === "herrera"){
      return {
        noherrera:true
      };
    }else{
      return null;
    }
  }

  passwordiguales(control:FormControl):{[s:string]:boolean}{
    let forma:any = this;
    if(control.value !== forma.controls['password1'].value){
      return {passwordiguales:true};
    }
    return null;
  }

  existeUsuario(control:FormControl):Promise<any>|Observable<any>{
    let promesa = new Promise(
      (resolve,reject)=>{
        setTimeout(()=>{
          if(control.value==="ragzer"){
            resolve({existe:true});
          }else{
            resolve(null);
          }
        },1500);
      }
    );

    return promesa;
  }




  ngOnInit() {
  }

  guardarCambios(){
    console.log(this.forma);
    console.log(this.forma.value);

    /*
    this.forma.reset({
      nombrecompleto:{
        nombre:"",
        apellido:""
      },
      correo:""
    });
    */
  }

}
