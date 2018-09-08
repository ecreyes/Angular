# Formularios
Pueden ser de dos tipos:
* Template
* Data
Para empezar hay que importar en el `app.module.ts`:
```typescript
import { FormsModule } from "@angular/forms";

imports: [
    BrowserModule,
    FormsModule
  ],
```

## Template
Se tiene que crear un componente `components/template` con el CLI.

### NgModel NgSubmit y referencias a elementos html.
Si se quiere usar el ngModel en un input dentro de un formulario hay que si o si poner la propiedad `name=algo` en el input.
Tambien se puede poner el atributo `required`,todo se veria asi:
```typescript
<input
  type="text"
  class="form-control"
  placeholder="Nombre"
  ngModel 
  name="nombre" 
  minlength="5"
  required>
```
Si se llegase a mostrar un mensaje de html:5 de campo requerido, este se puede desactivar agregando en el form lo siguiente:
```typescript
<form novalidate="">
```
clases que se agregaron al input al colocar ngModel y el name:
* ng-untouched: el usuario no ha tocado la caja.
* ng-pristine: el input esta con su valor por defecto.
* ng-valid: Esta pasando todas las reglas de validación impuestas en el componente.
* ng-dirty: se modifico el input
* ng-touched: se movio el cursor a otro lado y se dejo de tocar el input.
* ng-invalid: no cumple las reglas de validacion.

El ngSubmit es el posteo, el como enviar los datos a algun lado,para esto se agrega en el form:
```typescript
<form (ngSubmit)="guardar()" novalidate="">
```
este evento podria llamar a una funcion en el componente para enviar los datos.
Hay un problema, este evento se va a llamar siempre que se presione enter en algun input...

### Obteniendo información del formulario.
¿Cómo obtener la data y el formulario completo?
Hay que hacer una referencia local al formulario:
```typescript
<form (ngSubmit)="guardar(forma)" #forma="ngForm" novalidate="">
```
se puede ver lo que se envio en el componente con:
```typescript
import { NgForm } from "@angular/forms";

guardar(forma:NgForm){
  console.log("formulario posteado");
  console.log("NgForm: ",forma);
  console.log("Valor: ",forma.value)
}
```

Suponiendo que se quiere cargar data por defecto, se crea un objeto en el componente:
```typescript
  usuario:Object = {
    nombre: "nombreDefecto",
    apellido: "apellidoDefecto",
    correo: "correoDefecto"
  }
```
Ahora para utilizar este objeto hay que cambiar los ngModel, quedando:
```typescript
  <input
    type="text"
    class="form-control"
    placeholder="Nombre"
    [(ngModel)]= "usuario.nombre"
    name="nombre" 
    minlength="5"
    required>
```
hay que hacer los cambios de ngModel en todos los input asociados...
Cuando se coloca `[ngModel] = "usuario.nombre"`, solo se esta recibiendo la información del objeto usuario.
Si se coloca `[(ngModel)]="usuario.nombre"` significa que cuando escriba en el input voy a alterar el objeto usuario del componente.

### Validaciones independientes y cambios de estilos.
Para validar algun campo se puede usar `pattern` y escribir una expresion regular, por ejemplo para el correo:
```typescript
    <div class="form-group row">
        <label class="col-2 col-form-label">Correo</label>
        <div class="col-8">
          <input 
          type="text" 
          class="form-control" 
          placeholder="Correo electrónico"
          [(ngModel)]= "usuario.correo"
          name="correo"
          pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
          required>
        </div>
    </div>
```

al enviar los datos del tipo ngForm, en controls se puede ver el name asociado a cada input, en correo y error se puede ver cual fue el motivo del error.
Esto sirve para ver que errores tiene el usuario, pero ¿cómo hacer para modificar el html y mostrar el tipo de error?

En el style del componente hacer lo siguiente:
```typescript
//una vez que son invalidos y son tocados pero que no afecte al tag form.
.ng-invalid.ng-touched:not(form){
    border: 1px solid red;
}
```
Ahora ¿cómo mostrar el error?
Se agrega una referencia local y se iguala a ngModel, por ejemplo:
```typescript
<input
  type="text"
  class="form-control"
  placeholder="Nombre"
  [(ngModel)]= "usuario.nombre"
  name="nombre" 
  minlength="5"
  required
  #nombre="ngModel">
```
Esto me permite trabajar directamente como si estuviera trabajando con el objeto:`NgForm.controls.nombre`,el .nombre viene por el name, entonces la referencia `#nombre` es lo mismo que `NgForm.controls.nombre`

Ahora para mostrar el error simplemente hay que hacer:
```typescript
<div *ngIf="nombre.errors?.required">Este campo es requerido.</div>
<div *ngIf="nombre.errors?.minlength">
  Por lo menos {{nombre.errors.minlength.requiredLength}} caracteres.
</div>
```
el `nombre.errors?` sirve para hacer una condicion, es decir, si existe el objeto nombre.errors va a pedir el required.
### Omitiendo el css anterior.
Tambien se puede eliminar el css anterior y utilizar lo siguiente con bootstrap:
```typescript
<input
type="text"
class="form-control"
[ngClass]="{'is-invalid': nombre.errors?.required || nombre.errors?.minlength,'is-valid':!nombre.invalid}"
placeholder="Nombre"
[(ngModel)]= "usuario.nombre"
name="nombre" 
minlength="5"
required
#nombre="ngModel">

<div *ngIf="nombre.errors?.required" class="invalid-feedback">Este campo es requerido.</div>
<div *ngIf="nombre.errors?.minlength" class="invalid-feedback">
  Por lo menos {{nombre.errors.minlength.requiredLength}} caracteres.
</div>
```

## Data
Aquí la idea es no sobre cargar el html con código, sino que ir utilizando el código en el component.ts
Para empezar a trabajar hay que importar lo siguiente en el component:
```typescript
import { FormGroup,FormControl,Validators } from "@angular/forms";
```
En el `app.module.ts` hay que importar lo siguiente:
```typescript
import { FormsModule,ReactiveFormsModule } from "@angular/forms";

imports: [
  BrowserModule,
  FormsModule,
  ReactiveFormsModule
],
```

Ahora en el `data.component.ts` se debe crear un atributo para manejar el formulario y en el constructor se define toda la lógica:
```typescript
forma:FormGroup;

constructor() {
  this.forma = new FormGroup({
    'nombre': new FormControl('Eduardo'),
    'apellido': new FormControl(),
    'correo': new FormControl()
  });
}

guardarCambios(){
  console.log(this.forma);
  console.log(this.forma.value);
}


```
Los parámetros del FormGroup son:
* new FormGroup(valor a colocar en el input,[validaciones1,validaciones2],[validaciones asincronas,as2])

Ahora para vincular lo que se escribió en el component con el html, hay que colocar:
```typescript
<form [formGroup]="forma" (ngSubmit)="guardarCambios()">
```

### Enlazando el input a propiedades del formGroup y validaciones.
Hay que agregar el atributo `formControlName` que se debe llamar igual a los campos de `this.forma`, por ejemplo para el input del nombre:
```typescript
<div class="form-group row">
  <label class="col-2 col-form-label">Nombre</label>
  <div class="col-8">
    <input 
    type="text" 
    class="form-control" 
    placeholder="Nombre"
    formControlName = "nombre"
    >
  </div>
</div>
```
Ahora agregando validaciones:
```typescript
  constructor() {
    this.forma = new FormGroup({
      'nombre': new FormControl('',Validators.required),
      'apellido': new FormControl('',Validators.required),
      'correo': new FormControl('',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")])
    });
  }
```
ahora mostrando en el html(debajo del button):
```typescript
{{forma.valid}}
```

agregando validaciones con bootstrap4:
```typescript
    <div class="form-group row">
      <label class="col-2 col-form-label">Nombre</label>
      <div class="col-8">
        <input 
        type="text" 
        class="form-control" 
        [ngClass]="{'is-invalid': !forma.controls.nombre.valid && forma.controls.nombre.touched,'is-valid':forma.controls.nombre.valid}"
        placeholder="Nombre"
        formControlName = "nombre"
        >
        <div *ngIf="forma.controls.nombre.errors?.required" class="invalid-feedback">
          El nombre es necesario
        </div>
        <div *ngIf="forma.controls.nombre.errors?.minlength" class="invalid-feedback">
          Como mínimo 5 carácteres
        </div>
      </div>
    </div>
```

### Agrupaciones de los objetos FormGroupName.
Hasta ahora el json que entrega el formulario es el del tipo:
```typescript
{
  nombre:"valor",
  apellido:"valor",
  correo:"valor"
}
```
Pero supongamos que queremos recibir los datos del formulario en el siguiente formato json:
```typescript
{
  nombrecompleto:{
    nombre:"valor",
    apellido:"valor"
  },
  correo:"valor"
}
```
Para esto seria util usar el FormGroupName, donde agrupariamos el nombre y apellido dentro del nombre completo y el correo quedaria de forma independiente.

¿Cómo se hace?
Supongamos que este es el objeto en el componente:
```typescript
  usuario:any = {
    nombrecompleto:{
      nombre:"ragzer",
      apellido:"rtcw"
    },
    correo:"test@gmail.com"
  }
```
Lo primero que hay que hacer, es modificar en el constructor la asignacion del this.forma para que quede de forma similar al objeto usuario:
```typescript
constructor() {
  this.forma = new FormGroup({
    'nombrecompleto':new FormGroup({
      'nombre': new FormControl('',[Validators.required,Validators.minLength(5)]),
      'apellido': new FormControl('',Validators.required)
    }),
    'correo': new FormControl('',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")])
  });
}
```
Ahora en el formulario hay que agrupar los campos, en este caso nombre y apellido, dentro de un mismo div con la siguiente propiedad:
```typescript
<div formGroupName="nombrecompleto">
    //div del nombre...

    //div del apellido...
</div>
```
Al hacer esto va a generar un error si es que hay validaciones... lo mejor será comentarlas para ver si quedo bien.

Ahora revisando el console.log generado se puede observar que se creó otro campo FormGroup que es `nombrecompleto` y a su vez este tiene en sus controls `nombre` y `apellido`.

Para arreglar los errores de las validaciones hay que cambiar las variables... por ejemplo:
Antes:
```typescript
<div *ngIf="forma.controls.nombre.errors?.required">
  El nombre es necesario.
</div>
```
Después:
```typescript
<div *ngIf="forma.controls.nombrecompleto.controls.nombre.errors?.required">
    El nombre es necesario.
</div>
```
Quedo bastante largo, pero se puede arreglar con el método get que accede a los controls:
```typescript
<div *ngIf="forma.get('nombrecompleto.nombre').errors?.required">
    El nombre es necesario.
</div>
```
Quedando mucho mejor :)

### DataReset y Carga de datos en el formulario.
Supongamos que se quiere editar una seccion y aparece un formulario, algo tipico como `localhost:4200/ver/3` por dar un ejemplo, y cargaria en el formulario los datos del id 3.

En resumen para cargar los datos de forma rapida al form, es pasar un objeto que sea de la misma estructura que el formulario.

supongamos que se tiene:
```typescript
  forma:FormGroup;
  usuario:any = {
    nombrecompleto:{
      nombre:"ragzer",
      apellido:"rtcw"
    },
    correo:"test@gmail.com"
  }

  constructor() {
    this.forma = new FormGroup({
      'nombrecompleto':new FormGroup({
        'nombre': new FormControl('',[Validators.required,Validators.minLength(5)]),
        'apellido': new FormControl('',Validators.required)
      }),
      'correo': new FormControl('',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")])
    });
  }
```
Y se quiere cargar los datos del objeto usuario en el formulario, primero hay que ver q el formulario y el objeto son de la misma forma, asi que todo anda bien.
Ahora solo hay que agregar en el constructor:
```typescript
  constructor() {
    this.forma = new FormGroup({
      'nombrecompleto':new FormGroup({
        'nombre': new FormControl('',[Validators.required,Validators.minLength(5)]),
        'apellido': new FormControl('',Validators.required)
      }),
      'correo': new FormControl('',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")])
    });
    this.forma.setValue(this.usuario);
  }
```
bastante fácil y bonito.

Ahora supongamos que al guardar los datos, ya se editaron correctamente y se quiere mostrar el formulario vacio pero como si recien se hubiera creado, es decir con todos los ng por default, esto se hace con:
```typescript
  guardarCambios(){
    console.log(this.forma);
    console.log(this.forma.value);

    this.forma.reset({
      nombrecompleto:{
        nombre:"",
        apellido:""
      },
      correo:""
    });
  }
```
El reset va a recibir un objeto de la misma forma del formulario pero hay que dejarlo en vacio, obviamente.

### Validaciones personalizadas.
Un ejemplo de hacer una validación es el siguiente:
```typescript
noHerrera(control:FormControl):{[s:string]:boolean}{
  if(control.value === "herrera"){
    return {noherrera:true};
  }else{
    return null;
  }
}
```
El ejemplo es bastante básico pero ilustrativo, ahora solo hay que agregarlo al campo de apellido:
```typescript
constructor() {
  this.forma = new FormGroup({
    'nombrecompleto':new FormGroup({
      'nombre': new FormControl('',[Validators.required,Validators.minLength(5)]),
      'apellido': new FormControl('',[Validators.required,this.noHerrera])
    }),
    'correo': new FormControl('',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")])
  });
  this.forma.setValue(this.usuario);
}
```
Para ver los cambios habria que comentar el this.forma.reset en el guardar cambios.

Caso complicado, comparar dos password sean iguales:
```typescript
constructor() {
  this.forma = new FormGroup({
    'nombrecompleto':new FormGroup({
      'nombre': new FormControl('',[Validators.required,Validators.minLength(5)]),
      'apellido': new FormControl('',[Validators.required,this.noHerrera])
    }),
    'correo': new FormControl('',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
    'password1':new FormControl('',Validators.required),
    'password2':new FormControl('')
  });

  this.forma.controls['password2'].setValidators([Validators.required,this.passwordiguales.bind(this.forma)]);
  //this.forma.setValue(this.usuario);
}




  passwordiguales(control:FormControl):{[s:string]:boolean}{
    let forma:any = this;
    if(control.value !== forma.controls['password1'].value){
      return {passwordiguales:true};
    }
    return null;
  }
```

### Validaciones asincronas.
Primero hay que importar el observable:
```typescript
import { Observable } from 'rxjs';
```
Supongamos el caso del usuario:
```typescript
'usuario': new FormControl('',Validators.required,this.existeUsuario),
```
Ahora la funcion:
```typescript
existeUsuario(control:FormControl):Promise<any>|Observable<any>{
  let promesa = new Promise(
    (resolve,reject)=>{
      setTimeout(()=>{
        if(control.value==="ragzer"){
          resolve({existe:true});
        }else{
          resolve(null);
        }
      },3000);
    }
  );
```