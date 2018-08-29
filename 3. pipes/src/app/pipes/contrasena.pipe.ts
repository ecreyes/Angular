import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'contrasena'})
export class ContrasenaPipe implements PipeTransform {
    transform(value: any,arg:boolean=true): any {
        if(arg){
            let texto:string = "";
            for(let i of value){
                texto = texto + "*";
            }
            return texto;
        }else{
            return value;
        }
    }
}