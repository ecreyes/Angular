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